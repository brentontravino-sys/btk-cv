import fs from 'node:fs';
import path from 'node:path';

const OUT = 'C:\\Users\\User\\Downloads\\btk-cv\\.qa';

async function clickDownload(page, docLabel) {
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find((el) => /^resume$/i.test((el.textContent || '').trim()));
    b?.click();
  });
  await page.waitForTimeout(500);
  const clicked = await page.evaluate((label) => {
    const b = Array.from(document.querySelectorAll('button')).find(
      (el) => new RegExp(label, 'i').test(el.textContent || '')
    );
    if (b) { b.click(); return b.textContent.trim(); }
    return null;
  }, docLabel);
  return clicked;
}

export default async function run(page, ui) {
  const result = { downloads: [] };

  for (const [label, area] of [['download cv', 'cv'], ['download portfolio', 'portfolio']]) {
    // Navigate back to the resume page between documents.
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find((el) => /^resume$/i.test((el.textContent || '').trim()));
      b?.click();
    });
    await page.waitForTimeout(400);

    const clicked = await page.evaluate((l) => {
      const b = Array.from(document.querySelectorAll('button')).find((el) => new RegExp(l, 'i').test(el.textContent || ''));
      if (b) { b.click(); return b.textContent.trim(); }
      return null;
    }, label);

    let err = null;
    let dl = null;
    try {
      dl = await page.waitForEvent('download', { timeout: 20000 });
    } catch (e) {
      err = String(e).split('\n')[0];
    }

    if (dl) {
      const file = path.join(OUT, 'out-' + dl.suggestedFilename());
      await dl.saveAs(file);
      const buf = fs.readFileSync(file);
      result.downloads.push({
        area,
        clicked,
        file: path.basename(file),
        bytes: buf.length,
        header: buf.subarray(0, 5).toString('latin1'),
        pages: (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length,
      });
    } else {
      result.downloads.push({ area, clicked, error: err });
    }

    // Close the modal before the next round.
    await page.evaluate(() => {
      const b = document.querySelector('.print-doc button[aria-label="Close viewer"]');
      b?.click();
    });
    await page.waitForTimeout(300);
  }

  return result;
}
