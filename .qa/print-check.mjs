// Check the print stylesheet: what actually prints, and whether page 1 fits one sheet.
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

  await page.emulateMedia({ media: "print" });
  await page.waitForTimeout(400);

  // Do print() and also screenshot with print emulation.
  await page.screenshot({
    path: "C:\\Users\\User\\Downloads\\btk-cv\\.qa\\print-preview.png",
    fullPage: true,
  });

  const info = await page.evaluate(() => {
    const vis = (el) => {
      const cs = getComputedStyle(el);
      return (
        cs.display !== "none" &&
        cs.visibility !== "hidden" &&
        el.getBoundingClientRect().height > 0
      );
    };
    const pages = Array.from(
      document.querySelectorAll(".print-doc .print-page"),
    );
    const mm = (px) => +(px / (96 / 25.4)).toFixed(1);
    return {
      bodyClasses: document.body.className,
      docDisplay: getComputedStyle(document.querySelector(".print-doc"))
        .display,
      pages: pages.map((p, i) => ({
        i: i + 1,
        hMm: mm(p.getBoundingClientRect().height),
        wMm: mm(p.getBoundingClientRect().width),
      })),
      navVisible: vis(document.querySelector("header")),
      mainVisible: vis(document.querySelector("main")),
      footerVisible: vis(document.querySelector("footer")),
      totalHeightMm: mm(document.body.scrollHeight),
    };
  });
  await page.emulateMedia({ media: "screen" });
  return info;
}
