import fs from "node:fs";

// Trigger the real Print button, then render the print root through Chromium's
// print pipeline to confirm what the printer / "Save as PDF" would receive.
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
  await page.waitForTimeout(1800);

  // Stub print so the call is recorded, then press Print.
  await page.evaluate(() => {
    window.__printed = 0;
    window.print = () => {
      window.__printed += 1;
    };
  });
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^print$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(400);

  const state = await page.evaluate(() => ({
    printed: window.__printed,
    host: !!document.getElementById("btk-print-host"),
    bodyClass: document.body.className,
    pages: document.querySelectorAll("#btk-print-root .print-page").length,
  }));

  const pdfBuf = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });
  fs.writeFileSync(
    "C:\\Users\\User\\Downloads\\btk-cv\\.qa\\printed-cv.pdf",
    pdfBuf,
  );

  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.waitForTimeout(300);
  const cleaned = await page.evaluate(() => ({
    host: !!document.getElementById("btk-print-host"),
    bodyClass: document.body.className,
  }));

  return { state, cleaned, pdfBytes: pdfBuf.length };
}
