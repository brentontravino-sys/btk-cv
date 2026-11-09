export default async function run(page, ui) {
  await page.waitForTimeout(800);

  const measure = () =>
    page.evaluate(() => {
      const root = getComputedStyle(document.documentElement).fontSize;
      const body = getComputedStyle(document.body).fontSize;
      const h1 = document.querySelector("#hero h1");
      const p = document.querySelector("#hero p");
      const small = document.querySelector("#hero span");
      const px = (el) => (el ? getComputedStyle(el).fontSize : null);
      return {
        root,
        body,
        h1: px(h1),
        heroP: px(p),
        heroSpan: px(small),
        h1Left: h1 ? Math.round(h1.getBoundingClientRect().left) : null,
        docWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      };
    });

  const home = await measure();
  await page.screenshot({ path: "qa-type-home.png" });

  // Check a couple of other pages for overflow
  const results = { home };
  for (const [name, label] of [
    ["portfolio", "WORKS"],
    ["resume", "RESUME"],
    ["skills", "EXPERTISE"],
    ["contact", "INQUIRIES"],
  ]) {
    const link = page.getByRole("button", { name: label, exact: true }).first();
    if (await link.count()) {
      await link.click();
      await page.waitForTimeout(700);
      results[name] = await page.evaluate(() => ({
        docWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        body: getComputedStyle(document.body).fontSize,
      }));
    }
  }
  await page.screenshot({ path: "qa-type-last.png" });
  return results;
}
