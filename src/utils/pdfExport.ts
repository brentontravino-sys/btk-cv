import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  status: "rendering" | "compiling" | "saving" | "done" | "error";
}

/*
 * PDF generation notes
 * --------------------
 * The former html2canvas + jsPDF pipeline rasterised the DOM, which throws on the
 * modern `oklab()` colours emitted by our Tailwind theme, producing CSS strings with
 * literal "&bull;" entities and cropping pages taller than 297mm instead of flowing
 * them. Rebuilding the document as text in PDF gives selectable, searchable, vector
 * output that always fits the page.
 */

const PAGE_W = 595.28; // A4, points
const PAGE_H = 841.89;
const MARGIN_X = 46;
const MARGIN_TOP = 46;
const MARGIN_BOTTOM = 48;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const INK = rgb(0.035, 0.035, 0.043);
const MUTED = rgb(0.32, 0.32, 0.36);
const FAINT = rgb(0.47, 0.47, 0.52);
const RULE = rgb(0.82, 0.82, 0.85);

const BULLET = "\u2022";
// Standard (WinAnsi) fonts have no check mark glyph; the bullet is the safe equivalent.
const CHECK = BULLET;
const DASH = "\u2014";
const BULLET_PREFIX = "[BULLET]";

const WIN_ANSI_FALLBACKS: Record<string, string> = {
  "\u2018": "'",
  "\u2019": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u2013": "-",
  "\u2014": "-",
  "\u2026": "...",
  "\u00a0": " ",
  "\u00ae": "(R)",
  "\u2122": "(TM)",
  "\u00a9": "(C)",
};

/** Standard fonts are WinAnsi-only: swap entity leftovers and unsupported glyphs. */
function sanitize(text: string): string {
  let out = text
    .replace(/&bull;/g, BULLET)
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, DASH)
    .replace(/&ndash;/g, "-")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\u00a0/g, " ");

  out = out.replace(/\u2022/g, BULLET_PREFIX);

  return out.replace(/[^\u0000-\u00ff]/g, (ch) => WIN_ANSI_FALLBACKS[ch] ?? "");
}

class DocBuilder {
  private pdf!: PDFDocument;
  private regular!: PDFFont;
  private bold!: PDFFont;
  private mono!: PDFFont;
  private page!: PDFPage;
  private y = 0;
  private pageIndex = 0;

  static async create() {
    const builder = new DocBuilder();
    builder.pdf = await PDFDocument.create();
    builder.pdf.setTitle("Brenton T. Kandhai");
    builder.pdf.setCreator("BTK Portfolio");
    builder.regular = await builder.pdf.embedFont(StandardFonts.Helvetica);
    builder.bold = await builder.pdf.embedFont(StandardFonts.HelveticaBold);
    builder.mono = await builder.pdf.embedFont(StandardFonts.Courier);
    return builder;
  }

  get pageCount() {
    return this.pdf.getPageCount();
  }

  private addPage() {
    this.page = this.pdf.addPage([PAGE_W, PAGE_H]);
    this.pageIndex += 1;
    this.y = PAGE_H - MARGIN_TOP;
  }

  /** Start a fresh page only when the next block would not fit. */
  newPage() {
    this.addPage();
  }

  ensure(space: number) {
    if (!this.page || this.y - space < MARGIN_BOTTOM) this.addPage();
  }

  private wrap(
    text: string,
    font: PDFFont,
    size: number,
    maxWidth: number,
  ): string[] {
    const lines: string[] = [];
    for (const paragraph of text.split("\n")) {
      const words = paragraph.split(/\s+/).filter(Boolean);
      if (words.length === 0) {
        lines.push("");
        continue;
      }
      let line = "";
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
          line = candidate;
        } else {
          if (line) lines.push(line);
          line = word;
        }
      }
      if (line) lines.push(line);
    }
    return lines;
  }

  text(
    raw: string,
    opts: {
      size?: number;
      bold?: boolean;
      mono?: boolean;
      color?: ReturnType<typeof rgb>;
      lineHeight?: number;
      indent?: number;
      gapAfter?: number;
      align?: "left" | "right";
    } = {},
  ) {
    const size = opts.size ?? 10;
    const font = opts.mono ? this.mono : opts.bold ? this.bold : this.regular;
    const lh = opts.lineHeight ?? size * 1.45;
    const indent = opts.indent ?? 0;
    const clean = sanitize(raw);

    // A "\u2022" inside a sentence is drawn as a real glyph, not a layout marker.
    const segments = clean.split(BULLET_PREFIX);
    type Line = { text: string; offset: number; marker: boolean };
    const lines: Line[] = [];
    segments.forEach((segment, i) => {
      // Every segment after the first is bulleted; keep the space that followed it.
      const body = i > 0 ? segment.replace(/^\s+/, "") : segment;
      const shift = i > 0 && segment !== body ? 1 : 0;
      const wrapped = this.wrap(body, font, size, CONTENT_W - indent - shift);
      wrapped.forEach((text, j) =>
        lines.push({ text, offset: shift, marker: i > 0 && j === 0 }),
      );
    });

    for (const line of lines) {
      this.ensure(lh);
      const baseX = MARGIN_X + indent;
      if (line.marker) {
        this.page.drawText(BULLET, {
          x: baseX + 2,
          y: this.y - size,
          size,
          font,
          color: opts.color ?? INK,
        });
      }
      const x =
        opts.align === "right"
          ? PAGE_W - MARGIN_X - font.widthOfTextAtSize(line.text, size)
          : baseX + line.offset;
      this.page.drawText(line.text, {
        x,
        y: this.y - size,
        size,
        font,
        color: opts.color ?? INK,
      });
      this.y -= lh;
    }

    if (opts.gapAfter) this.space(opts.gapAfter);
  }

  bullets(
    items: string[],
    opts: { size?: number; color?: ReturnType<typeof rgb> } = {},
  ) {
    const size = opts.size ?? 9.5;
    const lh = size * 1.5;
    for (const item of items) {
      const wrapped = this.wrap(
        sanitize(item),
        this.regular,
        size,
        CONTENT_W - 14,
      );
      wrapped.forEach((line, i) => {
        this.ensure(lh);
        if (i === 0) {
          this.page.drawText(sanitize(BULLET), {
            x: MARGIN_X + 2,
            y: this.y - size,
            size,
            font: this.regular,
            color: FAINT,
          });
        }
        this.page.drawText(line, {
          x: MARGIN_X + 14,
          y: this.y - size,
          size,
          font: this.regular,
          color: opts.color ?? MUTED,
        });
        this.y -= lh;
      });
    }
  }

  checks(items: string[], size = 9.5) {
    for (const item of items) {
      const wrapped = this.wrap(
        sanitize(item),
        this.regular,
        size,
        CONTENT_W - 14,
      );
      wrapped.forEach((line, i) => {
        this.ensure(size * 1.5);
        if (i === 0) {
          this.page.drawText(sanitize(CHECK), {
            x: MARGIN_X + 1,
            y: this.y - size,
            size,
            font: this.regular,
            color: FAINT,
          });
        }
        this.page.drawText(line, {
          x: MARGIN_X + 14,
          y: this.y - size,
          size,
          font: this.regular,
          color: MUTED,
        });
        this.y -= size * 1.5;
      });
    }
  }

  space(h: number) {
    this.y -= h;
  }

  rule(gap = 8) {
    this.ensure(gap * 2);
    this.page.drawLine({
      start: { x: MARGIN_X, y: this.y },
      end: { x: PAGE_W - MARGIN_X, y: this.y },
      thickness: 0.6,
      color: RULE,
    });
    this.y -= gap;
  }

  /** Accent heading used at the top of each logical section. */
  sectionTitle(kicker: string, title: string) {
    this.ensure(58);
    this.text(kicker.toUpperCase(), {
      size: 7.5,
      mono: true,
      color: FAINT,
      lineHeight: 12,
    });
    this.text(title, { size: 15, bold: true, lineHeight: 20 });
    this.rule(12);
  }

  metaRow(left: string, right: string, sub?: string) {
    const size = 10;
    const rightW = this.mono.widthOfTextAtSize(sanitize(right), 8);
    this.ensure(30);
    this.page.drawText(sanitize(left), {
      x: MARGIN_X,
      y: this.y - size,
      size,
      font: this.bold,
      color: INK,
      maxWidth: CONTENT_W - rightW - 16,
    });
    this.page.drawText(sanitize(right), {
      x: PAGE_W - MARGIN_X - rightW,
      y: this.y - size,
      size: 8,
      font: this.mono,
      color: FAINT,
    });
    this.y -= size * 1.45;
    if (sub) this.text(sub, { size: 8.5, color: FAINT, lineHeight: 12 });
  }

  pillRow(items: string[], size = 7.5) {
    let x = MARGIN_X;
    const h = size + 6;
    this.ensure(h + 4);
    const rowTop = this.y;
    for (const item of items) {
      const label = sanitize(item);
      const w = this.mono.widthOfTextAtSize(label, size) + 10;
      if (x + w > PAGE_W - MARGIN_X) {
        x = MARGIN_X;
        this.y -= h + 4;
        this.ensure(h + 4);
      }
      this.page.drawRectangle({
        x,
        y: this.y - h,
        width: w,
        height: h,
        borderColor: RULE,
        borderWidth: 0.5,
      });
      this.page.drawText(label, {
        x: x + 5,
        y: this.y - h + 3.5,
        size,
        font: this.mono,
        color: MUTED,
      });
      x += w + 4;
    }
    this.y = Math.min(this.y, rowTop) - (h + 4);
  }

  /** Two-column key/value grid (skills matrices). */
  labeledGrid(rows: { label: string; value: string }[], colSize = 9) {
    const halfW = CONTENT_W / 2 - 8;
    for (let i = 0; i < rows.length; i += 2) {
      const pair = [rows[i], rows[i + 1]].filter(Boolean);
      const lh = colSize * 1.55;
      this.ensure(lh);
      pair.forEach((row, col) => {
        const x = MARGIN_X + col * (halfW + 16);
        const label = sanitize(row.label);
        const valueRoom =
          this.mono.widthOfTextAtSize(sanitize(row.value), 6.5) + 14;
        this.page.drawText(label, {
          x,
          y: this.y - colSize,
          size: colSize,
          font: this.regular,
          color: MUTED,
          maxWidth: halfW - valueRoom,
        });
        const val = sanitize(row.value);
        this.page.drawText(val || "", {
          x: x + halfW - this.mono.widthOfTextAtSize(val, 6.5),
          y: this.y - colSize,
          size: 6.5,
          font: this.mono,
          color: FAINT,
        });
      });
      this.y -= lh;
    }
  }

  footer(label: string) {
    this.pdf.getPages().forEach((page, i) => {
      const left = sanitize(label);
      page.drawText(left, {
        x: MARGIN_X,
        y: 28,
        size: 7,
        font: this.mono,
        color: FAINT,
      });
      const right = sanitize(`PAGE ${i + 1} / ${this.pageCount}`);
      page.drawText(right, {
        x: PAGE_W - MARGIN_X - this.mono.widthOfTextAtSize(right, 7),
        y: 28,
        size: 7,
        font: this.mono,
        color: FAINT,
      });
    });
  }

  async toBlob(): Promise<Blob> {
    const bytes = await this.pdf.save();
    // bytes is a Uint8Array which is a valid BlobPart
    return new Blob([bytes as BlobPart], { type: "application/pdf" });
  }
}

function saveBlob(blob: Blob, filename: string): void {
  const name = filename.toLowerCase().endsWith(".pdf")
    ? filename
    : `${filename}.pdf`;
  
  // Validate blob
  if (!blob || blob.size === 0) {
    console.error('saveBlob: Cannot save empty blob, size:', blob?.size);
    throw new Error('Failed to generate PDF: empty or invalid blob');
  }
  
  // Validate blob type
  if (blob.type !== "application/pdf") {
    console.warn('saveBlob: Blob type is not PDF, got:', blob.type);
  }
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.rel = "noopener nofollow";
  link.style.display = "none";
  link.style.visibility = "hidden";
  link.style.opacity = "0";
  link.style.position = "absolute";
  link.style.top = "0";
  link.style.left = "0";
  
  // Append to body and trigger download
  document.body.appendChild(link);
  
  // Use setTimeout to ensure the link is properly added to the DOM
  // before we try to click it (required in some browsers)
  setTimeout(() => {
    try {
      // Some browsers require user interaction to trigger downloads
      // Check if we can trigger the click
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      
      link.dispatchEvent(clickEvent);
      
      // Also try direct click as fallback
      if (!clickEvent.defaultPrevented) {
        link.click();
      }
      
      // Clean up after download should have started
      // Use a longer timeout for larger PDFs
      const cleanupTimeout = setTimeout(() => {
        try {
          link.remove();
          URL.revokeObjectURL(url);
        } catch (cleanupErr) {
          console.warn('Error during cleanup:', cleanupErr);
        }
      }, 5000);
      
      // Also listen for when the link is removed from the DOM
      const observer = new MutationObserver((mutations) => {
        if (!document.body.contains(link)) {
          clearTimeout(cleanupTimeout);
          URL.revokeObjectURL(url);
          observer.disconnect();
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Add a safety net
      setTimeout(() => {
        clearTimeout(cleanupTimeout);
        try {
          observer.disconnect();
          link.remove();
          URL.revokeObjectURL(url);
        } catch {
          // Ignore
        }
      }, 10000);
      
    } catch (err) {
      link.remove();
      URL.revokeObjectURL(url);
      console.error('saveBlob: Failed to trigger download:', err);
      throw new Error('Download failed: ' + (err as Error).message);
    }
  }, 50);
}

export interface CvPdfData {
  name: string;
  title: string;
  location: string;
  phones: string[];
  email: string;
  summary: string;
  highlights: string[];
  stacks: string[];
  ecosystem: { title: string; category: string }[];
  experiences: {
    company: string;
    role: string;
    period: string;
    focus: string;
    responsibilities: string[];
    tags: string[];
  }[];
  skillCategories: {
    title: string;
    skills: { name: string; level?: string }[];
  }[];
  credentials: {
    title: string;
    details: string;
    issuer: string;
    year: string;
  }[];
  availability: string;
}

export interface PortfolioPdfData {
  name: string;
  title: string;
  location: string;
  phones: string[];
  email: string;
  headline: string;
  summary: string;
  kpis: { label: string; value: string }[];
  ecosystem: { title: string; category: string }[];
  systems: { title: string; summary: string; scope: string; tags: string[] }[];
  clients: { name: string; category: string; summary: string }[];
  experiences: {
    company: string;
    role: string;
    period: string;
    focus: string;
    responsibilities: string[];
    tags: string[];
  }[];
  skillCategories: {
    title: string;
    skills: { name: string; level?: string }[];
  }[];
  credentials: {
    title: string;
    details: string;
    issuer: string;
    year: string;
  }[];
}

/** Builds the Curriculum Vitae PDF from the same data the on-screen document renders. */
export async function exportCvAsPdf(
  data: CvPdfData,
  filename: string,
  onProgress?: (progress: PdfExportProgress) => void,
): Promise<void> {
  onProgress?.({ currentPage: 1, totalPages: 1, status: "rendering" });
  const doc = await DocBuilder.create();
  doc.newPage();
  const FOOTER = "CURRICULUM VITAE  |  BRENTON T. KANDHAI";

  // Masthead
  doc.text(data.name.toUpperCase(), { size: 24, bold: true, lineHeight: 28 });
  doc.text(`${data.title} ${BULLET} 15+ YEARS VERIFIED EXPERIENCE`, {
    size: 9,
    mono: true,
    color: MUTED,
    lineHeight: 14,
  });
  doc.space(3);
  doc.text(
    `${data.location}    |    ${data.phones.join("  |  ")}    |    ${data.email}`,
    { size: 8.5, color: FAINT, lineHeight: 12 },
  );
  doc.rule(14);

  // Profile
  doc.sectionTitle("Professional profile", "Executive Summary");
  doc.text(data.summary, {
    size: 9.5,
    color: MUTED,
    lineHeight: 14,
    gapAfter: 6,
  });

  doc.space(4);
  doc.rule(10);
  data.highlights.forEach((h) =>
    doc.text(h, { size: 8.5, mono: true, color: MUTED, lineHeight: 13 }),
  );
  doc.space(6);

  doc.sectionTitle("Capabilities", "Core Dev Stacks & Technical Capabilities");
  doc.checks(data.stacks, 9);
  doc.space(6);

  doc.text(`CORE ECOSYSTEM ${BULLET} PLATFORMS & MARKETING SUITES`, {
    size: 7.5,
    mono: true,
    color: FAINT,
    lineHeight: 12,
  });
  doc.text(
    data.ecosystem.map((b) => `${b.title} (${b.category})`).join(` ${BULLET} `),
    {
      size: 8,
      color: MUTED,
      lineHeight: 12,
      gapAfter: 4,
    },
  );

  doc.newPage();
  doc.sectionTitle("Chronology", "Professional Experience & Positions Held");
  data.experiences.forEach((exp) => {
    doc.ensure(70);
    doc.metaRow(exp.company, exp.period, `${exp.role} ${BULLET} ${exp.focus}`);
    doc.space(3);
    doc.bullets(exp.responsibilities, { size: 9 });
    doc.space(3);
    doc.pillRow(exp.tags);
    doc.space(12);
  });

  doc.newPage();
  doc.sectionTitle(
    "Expertise matrix",
    "Detailed Technical Disciplines & Proficiencies",
  );
  data.skillCategories.forEach((cat) => {
    doc.ensure(46);
    doc.text(cat.title, { size: 10, bold: true, lineHeight: 16 });
    doc.space(2);
    doc.labeledGrid(
      cat.skills.map((s) => ({ label: s.name, value: s.level ?? "" })),
    );
    doc.space(12);
  });

  doc.space(2);
  doc.sectionTitle("Credentials", "Education, Certifications & Availability");
  data.credentials.forEach((cert) => {
    doc.metaRow(
      cert.title,
      cert.year,
      `${cert.details} ${BULLET} ${cert.issuer}`,
    );
    doc.space(8);
  });
  doc.space(4);
  doc.rule(10);
  doc.text("COMMERCIAL ENGAGEMENTS", {
    size: 7.5,
    mono: true,
    color: FAINT,
    lineHeight: 12,
  });
  doc.text(data.availability, { size: 9, color: MUTED, lineHeight: 13 });

  doc.footer(FOOTER);
  onProgress?.({
    currentPage: doc.pageCount,
    totalPages: doc.pageCount,
    status: "saving",
  });
  saveBlob(await doc.toBlob(), filename);
  onProgress?.({
    currentPage: doc.pageCount,
    totalPages: doc.pageCount,
    status: "done",
  });
}

/** Builds the Selected Works Portfolio PDF from the on-screen document's data. */
export async function exportPortfolioAsPdf(
  data: PortfolioPdfData,
  filename: string,
  onProgress?: (progress: PdfExportProgress) => void,
): Promise<void> {
  onProgress?.({ currentPage: 1, totalPages: 1, status: "rendering" });
  const doc = await DocBuilder.create();
  doc.newPage();
  const FOOTER = "OFFICIAL PORTFOLIO  |  BRENTON T. KANDHAI";

  doc.text("SELECTED WORKS PORTFOLIO", {
    size: 8,
    mono: true,
    color: FAINT,
    lineHeight: 12,
  });
  doc.text(data.name.toUpperCase(), { size: 24, bold: true, lineHeight: 28 });
  doc.text(`${data.title} ${BULLET} 15+ YEARS VERIFIED EXPERIENCE`, {
    size: 9,
    mono: true,
    color: MUTED,
    lineHeight: 14,
  });
  doc.space(3);
  doc.text(
    `${data.location}    |    ${data.phones.join("  |  ")}    |    ${data.email}`,
    {
      size: 8.5,
      color: FAINT,
      lineHeight: 12,
    },
  );
  doc.rule(14);

  doc.sectionTitle("Executive overview", data.headline);
  doc.text(data.summary, {
    size: 9.5,
    color: MUTED,
    lineHeight: 14,
    gapAfter: 6,
  });
  doc.space(2);
  doc.text(data.kpis.map((k) => `${k.label}: ${k.value}`).join("     "), {
    size: 8.5,
    mono: true,
    color: INK,
    lineHeight: 13,
    gapAfter: 6,
  });
  doc.text(`CORE ECOSYSTEM ${BULLET} PLATFORMS & MARKETING SUITES`, {
    size: 7.5,
    mono: true,
    color: FAINT,
    lineHeight: 12,
  });
  doc.text(
    data.ecosystem.map((b) => `${b.title} (${b.category})`).join(` ${BULLET} `),
    {
      size: 8,
      color: MUTED,
      lineHeight: 12,
    },
  );

  doc.newPage();
  doc.sectionTitle(
    "Systems architecture",
    "Technical Architecture & Systems Engineering",
  );
  data.systems.forEach((system) => {
    doc.ensure(70);
    doc.text(system.title, { size: 11, bold: true, lineHeight: 16 });
    doc.text(system.summary, { size: 9, color: MUTED, lineHeight: 13 });
    doc.text(`Scope: ${system.scope}`, {
      size: 9,
      color: MUTED,
      lineHeight: 13,
    });
    doc.space(2);
    doc.pillRow(system.tags);
    doc.space(12);
  });

  doc.newPage();
  doc.sectionTitle(
    "Live client web systems",
    "Production Platforms & Commercial Launches",
  );
  data.clients.forEach((client) => {
    doc.ensure(58);
    doc.metaRow(client.name, client.category);
    doc.space(2);
    doc.text(client.summary, {
      size: 9,
      color: MUTED,
      lineHeight: 13,
      gapAfter: 10,
    });
  });

  doc.newPage();
  doc.sectionTitle(
    "Verified history",
    "Professional Timeline & Verified Credentials",
  );
  data.experiences.forEach((exp) => {
    doc.ensure(66);
    doc.metaRow(exp.company, exp.period, `${exp.role} ${BULLET} ${exp.focus}`);
    doc.space(2);
    doc.bullets(exp.responsibilities, { size: 8.5 });
    doc.space(10);
  });

  doc.space(4);
  data.credentials.forEach((cert) => {
    doc.metaRow(
      cert.title,
      cert.year,
      `${cert.details} ${BULLET} ${cert.issuer}`,
    );
    doc.space(4);
  });

  doc.newPage();
  doc.sectionTitle("Expertise matrix", "Full Technical Stack & Proficiencies");
  data.skillCategories.forEach((cat) => {
    doc.ensure(46);
    doc.text(cat.title, { size: 10, bold: true, lineHeight: 16 });
    doc.space(2);
    doc.labeledGrid(
      cat.skills.map((s) => ({ label: s.name, value: s.level ?? "" })),
    );
    doc.space(12);
  });

  doc.footer(FOOTER);
  onProgress?.({
    currentPage: doc.pageCount,
    totalPages: doc.pageCount,
    status: "saving",
  });
  saveBlob(await doc.toBlob(), filename);
  onProgress?.({
    currentPage: doc.pageCount,
    totalPages: doc.pageCount,
    status: "done",
  });
}

/**
 * Prints only the given document.
 *
 * The on-screen modal is cloned into a standalone print root, so the site shell can
 * never leak into the output, no `:has()`/`:not()` selector has to guess what to
 * hide, and opening the browser's print dialog from an iframe preview is reliable.
 * The root is removed again once the dialog closes.
 */
export function printDocument(
  documentRoot: HTMLElement | null,
  title: string,
): boolean {
  if (!documentRoot) return false;

  // Check if we're in a sandboxed iframe where print might be blocked
  try {
    if (window.self !== window.top) {
      // We're in an iframe - check if we can access window.print
      // In sandboxed iframes, this will throw a SecurityError
      void window.print;
    }
  } catch (err) {
    console.warn("Cannot access window.print - likely sandboxed iframe:", err);
    return false;
  }

  // Safari's `onbeforeprint` fires before layout, so build the copy up front.
  const root = document.createElement("div");
  root.id = "btk-print-root";
  Array.from(documentRoot.children).forEach((child) => {
    root.appendChild(child.cloneNode(true));
  });
  root.querySelectorAll(".print-hide").forEach((el) => el.remove());

  const host = document.createElement("div");
  host.id = "btk-print-host";
  host.dataset.title = title;
  host.appendChild(root);
  document.body.appendChild(host);
  document.body.classList.add("printing-document");

  let done = false;
  const cleanup = () => {
    if (done) return;
    done = true;
    try {
      window.removeEventListener("afterprint", cleanup);
    } catch {
      // Ignore errors during cleanup
    }
    try {
      document.body.classList.remove("printing-document");
    } catch {
      // Ignore
    }
    try {
      host.remove();
    } catch {
      // Ignore
    }
  };

  try {
    window.addEventListener("afterprint", cleanup);
  } catch (err) {
    console.warn("Failed to add afterprint listener:", err);
    // Still try to print, but use timeout cleanup
  }

  // Fallback cleanup for browsers that never emit afterprint
  const timeoutId = setTimeout(cleanup, 120000);

  // Clear the timeout when cleanup happens normally
  const cleanupWithTimeout = () => {
    clearTimeout(timeoutId);
    cleanup();
  };

  // Re-add the listener with the new cleanup
  try {
    window.removeEventListener("afterprint", cleanup);
    window.addEventListener("afterprint", cleanupWithTimeout);
  } catch {
    // Ignore
  }

  try {
    const printResult = window.print();
    // window.print() returns false if it was cancelled, but we still consider it successful
    // if the dialog opened
    return true;
  } catch (err) {
    console.warn(
      "window.print() was blocked by the browser or iframe sandbox:",
      err,
    );
    cleanupWithTimeout();
    return false;
  }
}
