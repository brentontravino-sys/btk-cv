// How much does CV sheet 2 need to shrink? Measure room on the page it starts on.
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

  const results = [];
  for (const scale of [1, 0.97, 0.95, 0.93, 0.9]) {
    await page.evaluate((s) => {
      document.querySelectorAll("#btk-print-root .print-page").forEach((el) => {
        el.style.zoom = s === 1 ? "" : String(s);
      });
    }, scale);
    await page.waitForTimeout(250);
    const heights = await page.evaluate(() => {
      const mm = (px) => +(px / (96 / 25.4)).toFixed(1);
      return Array.from(
        document.querySelectorAll("#btk-print-root .print-page"),
      ).map((p) => mm(p.getBoundingClientRect().height));
    });
    results.push({ scale, printed: await count(), sheetHeights: heights });
  }
  return results;
}
