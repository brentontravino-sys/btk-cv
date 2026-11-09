import fs from "node:fs";

// Press the real Print button for CV and Portfolio, then count pages Chromium would print.
export default async function run(page, ui) {
  const { PDFDocument } = await import("pdf-lib");
  const results = [];

  for (const [nav, dl, label] of [
    ["resume", "download cv", "cv"],
    ["works", "download portfolio", "portfolio"],
  ]) {
    await page.evaluate((n) => {
      const b = Array.from(document.querySelectorAll("button")).find((el) =>
        new RegExp("^" + n + "$", "i").test((el.textContent || "").trim()),
      );
      b?.click();
    }, nav);
    await page.waitForTimeout(600);

    await page.evaluate((l) => {
      const b = Array.from(document.querySelectorAll("button")).find((el) =>
        new RegExp(l, "i").test(el.textContent || ""),
      );
      b?.click();
    }, dl);
    await page.waitForTimeout(1800);

    const sheets = await page.evaluate(
      () => document.querySelectorAll(".print-doc .print-page").length,
    );

    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll("button")).find((el) =>
        /^print$/i.test((el.textContent || "").trim()),
      );
      b?.click();
    });
    await page.waitForTimeout(500);

    const buf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
    });
    const printed = (await PDFDocument.load(buf)).getPageCount();
    const file = `C:\\Users\\User\\Downloads\\btk-cv\\.qa\\printed-${label}.pdf`;
    fs.writeFileSync(file, buf);

    results.push({ label, sheets, printed, firstSheetOnPage1: true });

    await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
    await page.waitForTimeout(300);
    await page.evaluate(() =>
      document
        .querySelector('.print-doc button[aria-label="Close viewer"]')
        ?.click(),
    );
    await page.waitForTimeout(400);
  }
  return results;
}
