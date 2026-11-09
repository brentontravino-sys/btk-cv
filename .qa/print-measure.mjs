// Build the print root like printDocument() does, then measure each sheet in mm.
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
  await page.waitForTimeout(400);

  const info = await page.evaluate(() => {
    const mm = (px) => +(px / (96 / 25.4)).toFixed(1);
    const pages = Array.from(
      document.querySelectorAll("#btk-print-root .print-page"),
    );
    return {
      rootFont: getComputedStyle(document.documentElement).fontSize,
      hostFont: getComputedStyle(document.getElementById("btk-print-host"))
        .fontSize,
      printableHeightMm: 297 - 20,
      pages: pages.map((p, i) => ({
        i: i + 1,
        hMm: mm(p.getBoundingClientRect().height),
        wMm: mm(p.getBoundingClientRect().width),
      })),
      // Which elements sit below the first printable sheet?
      overflow: pages.map((p) => {
        const limit = 277 * (96 / 25.4);
        const top = p.getBoundingClientRect().top;
        const last = Array.from(p.querySelectorAll("*"))
          .filter((el) => el.getBoundingClientRect().height > 0)
          .pop();
        return last ? mm(last.getBoundingClientRect().bottom - top) : 0;
      }),
      bodyScrollMm: mm(document.body.scrollHeight),
    };
  });
  await page.screenshot({
    path: "C:\\Users\\User\\Downloads\\btk-cv\\.qa\\print-root.png",
    fullPage: true,
  });
  return info;
}
