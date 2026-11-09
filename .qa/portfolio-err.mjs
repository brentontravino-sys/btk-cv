export default async function run(page, ui) {
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^works$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download portfolio/i.test(el.textContent || ""),
    );
    b?.click();
  });
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download/i.test(el.textContent || ""),
    );
    return { label: b ? b.textContent.trim() : null };
  });
}
