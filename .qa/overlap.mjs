// Find genuine overlapping siblings inside print pages (layout breakage).
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

  for (const fs of ["16.5px", "13px"]) {
    await page.evaluate((f) => {
      document.documentElement.style.fontSize = f;
    }, fs);
    await page.waitForTimeout(250);
    const res = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll(".print-doc article *").forEach((el) => {
        const s = el.nextElementSibling;
        if (!s) return;
        if (
          getComputedStyle(el).position === "absolute" ||
          getComputedStyle(s).position === "absolute"
        )
          return;
        const a = el.getBoundingClientRect(),
          b = s.getBoundingClientRect();
        if (a.bottom - b.top > 4 && a.width > 60 && b.width > 60) {
          bad.push({
            parent: el.parentElement
              ? el.parentElement.className.toString().slice(0, 70)
              : "",
            el: el.tagName + " [" + String(el.className).slice(0, 50) + "]",
            next: s.tagName + " [" + String(s.className).slice(0, 50) + "]",
            dy: Math.round(a.bottom - b.top),
          });
        }
      });
      return bad.slice(0, 8);
    });
    // one screenshot per font size of the cover page
    await page.screenshot({
      path: "C:\\Users\\User\\Downloads\\btk-cv\\.qa\\cover-" + fs + ".png",
      fullPage: false,
    });
    console.log("FONTSIZE " + fs + " " + JSON.stringify(res));
  }
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "";
  });
  await page.emulateMedia({ media: "screen" });
  return "done";
}
