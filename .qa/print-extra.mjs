// Find what generates the extra printed page: bisect via break-after height.
export default async function run(page, ui) {
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^resume$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download cv/i.test(el.textContent || ""),
    );
    b?.click();
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    const src = document.querySelector(".print-doc .print-scroll > div");
    const root = document.createElement("div");
    root.id = "btk-print-root";
    Array.from(src.children).forEach((c) =>
      root.appendChild(c.cloneNode(true)),
    );
    const host = document.createElement("div");
    host.id = "btk-print-host";
    host.appendChild(root);
    document.body.appendChild(host);
    document.body.classList.add("printing-document");
  });
  await page.emulateMedia({ media: "print" });
  await page.waitForTimeout(300);

  const styles = await page.evaluate(() => {
    const out = {};
    const probe = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        display: s.display,
        height: s.height,
        overflow: s.overflow,
        maxH: s.maxHeight,
        position: s.position,
      };
    };
    out.host = probe("#btk-print-host");
    out.root = probe("#btk-print-root");
    out.article = probe("#btk-print-root .print-page");
    out.firstChild = probe("#btk-print-root .print-page > *");
    out.rule = probe("#btk-print-root .print-page");
    return out;
  });

  const pdfAll = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });

  // Try: no break/avoid rules at all, to see if the extra page comes from a rule.
  await page.addStyleTag({
    content: `@media print { #btk-print-root .print-page { break-after: auto !important; page-break-after: auto !important; } }`,
  });
  await page.waitForTimeout(200);
  const pdfNoBreak = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });

  const pagesOf = async (buf) => {
    const { PDFDocument } = await import("pdf-lib");
    return (await PDFDocument.load(buf)).getPageCount();
  };

  return {
    styles,
    pagesNormal: await pagesOf(pdfAll),
    pagesWithoutBreak: await pagesOf(pdfNoBreak),
  };
}
