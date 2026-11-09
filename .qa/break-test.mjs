import fs from "node:fs";

// Isolate which print CSS rule produces the phantom page.
export default async function run(page, ui) {
  const { PDFDocument } = await import("pdf-lib");
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^resume$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(500);
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

  const count = async () =>
    (
      await PDFDocument.load(
        await page.pdf({ printBackground: true, preferCSSPageSize: true }),
      )
    ).getPageCount();
  const out = {};

  out.current = await count();

  // A: nothing on the document root
  await page.addStyleTag({
    content:
      "@media print { #btk-print-root, #btk-print-root > * { display: none !important; } }",
  });
  out.emptyRoot = await count();

  await page.reload();
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^resume$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(500);
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

  await page.addStyleTag({
    content:
      "@media print { #btk-print-root .print-page { break-before: auto !important; page-break-before: auto !important; break-after: page !important; page-break-after: always !important; } #btk-print-root .print-page:last-child { break-after: auto !important; page-break-after: auto !important; } }",
  });
  await page.waitForTimeout(300);
  out.breakAfterStyle = await count();

  await page.reload();
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^resume$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(500);
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
  await page.addStyleTag({
    content:
      "@media print { #btk-print-root .print-page { border: 1px solid red !important; } }",
  });
  await page.waitForTimeout(300);
  out.withBorderDebug = await count();

  const buf = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });
  fs.writeFileSync(
    "C:\\Users\\User\\Downloads\\btk-cv\\.qa\\cv-debug.pdf",
    buf,
  );
  return out;
}
