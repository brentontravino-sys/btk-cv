// Which CV sheet (and which block) spills over the 277mm printable height?
export default async function run(page, ui) {
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

  return page.evaluate(() => {
    const mm = (px) => +(px / (96 / 25.4)).toFixed(1);
    const sheets = Array.from(
      document.querySelectorAll("#btk-print-root .print-page"),
    );
    return sheets.map((s, i) => {
      const top = s.getBoundingClientRect().top;
      const blocks = Array.from(s.children).map((c) => ({
        tag: c.tagName,
        cls: String(c.className).slice(0, 44),
        bottomMm: mm(c.getBoundingClientRect().bottom - top),
      }));
      return {
        sheet: i + 1,
        heightMm: mm(s.getBoundingClientRect().height),
        blocks,
      };
    });
  });
}
