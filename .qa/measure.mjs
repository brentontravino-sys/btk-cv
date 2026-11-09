// Measure each print page at the actual printed font-size (16px root) to see
// which sheets overflow the A4 printable area.
export default async function run(page, ui) {
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^portfolio$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download portfolio/i.test(el.textContent || ""),
    );
    b?.click();
  });
  await page.waitForTimeout(1500);
  await page.emulateMedia({ media: "print" });

  const measure = async () =>
    page.evaluate(() => {
      const px2mm = (p) => +(p / (96 / 25.4)).toFixed(1);
      const root = getComputedStyle(document.documentElement).fontSize;
      // Two overlapping float columns: an element whose next sibling overlaps it.
      const overlaps = [];
      document.querySelectorAll(".print-doc article *").forEach((el) => {
        const s = el.nextElementSibling;
        if (!s) return;
        const a = el.getBoundingClientRect(),
          b = s.getBoundingClientRect();
        if (
          a.bottom - b.top > 2 &&
          a.width > 40 &&
          b.width > 40 &&
          a.height > 10
        ) {
          overlaps.push({
            el: el.tagName + "." + String(el.className).slice(0, 40),
            dy: Math.round(a.bottom - b.top),
          });
        }
      });
      return {
        rootFont: root,
        pageHeightsMm: Array.from(
          document.querySelectorAll(".print-doc .print-page"),
        ).map((p) => px2mm(p.getBoundingClientRect().height)),
        overflowElements: overlaps.slice(0, 6),
      };
    });

  const asIs = await measure();
  // Simulate the print font-size rule we plan to add (13px root, 85% scale).
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "13px";
  });
  await page.waitForTimeout(200);
  const at13 = await measure();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "12px";
  });
  await page.waitForTimeout(200);
  const at12 = await measure();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "";
  });
  await page.emulateMedia({ media: "screen" });
  return { asIs, at13, at12 };
}
