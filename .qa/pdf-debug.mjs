// Debug the CV export: capture console + errors while clicking Download CV.
export default async function run(page, ui) {
  const logs = [];
  page.on('console', (m) => logs.push(m.type() + ': ' + m.text()));
  page.on('pageerror', (e) => logs.push('pageerror: ' + String(e)));

  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find((el) => /^resume$/i.test((el.textContent || '').trim()));
    b?.click();
  });
  await page.waitForTimeout(600);

  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find((el) => /download cv/i.test(el.textContent || ''));
    b?.click();
  });

  await page.waitForTimeout(20000);

  const overlay = await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find((el) => /download/i.test(el.textContent || ''));
    return {
      label: b ? b.textContent.trim() : null,
      modalOpen: !!document.querySelector('.print-doc'),
      printPages: document.querySelectorAll('.print-doc .print-page').length,
    };
  });

  // Try the export directly to get the thrown error message.
  const direct = await page.evaluate(async () => {
    const el = document.querySelector('.print-doc .print-page');
    if (!el) return 'no page element';
    try {
      const h2c = (await import('/node_modules/.vite/deps/html2canvas.js')).default;
      return typeof h2c;
    } catch (e) {
      return 'import fail: ' + String(e);
    }
  });

  return { overlay, direct, logs: logs.slice(-40) };
}
