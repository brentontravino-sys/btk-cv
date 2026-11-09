import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const OUT = "C:\\Users\\User\\Downloads\\btk-cv\\.qa";

function pdfInfo(file) {
  const buf = fs.readFileSync(file);
  const raw = buf.toString("latin1");
  const pageObjects = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
  // Extract text from FlateDecode content streams.
  let text = "";
  const re = /stream\r?\n/g;
  let m;
  while ((m = re.exec(raw))) {
    const start = m.index + m[0].length;
    const end = raw.indexOf("endstream", start);
    if (end < 0) continue;
    const chunk = buf.subarray(start, end);
    try {
      const infl = zlib.inflateSync(chunk).toString("latin1");
      const parts = [...infl.matchAll(/\((?:[^()\\]|\\.)*\)\s*Tj/g)].map(
        (x) => x[0],
      );
      for (const p of parts) text += p.slice(1).replace(/\)\s*Tj$/, "") + "\n";
    } catch {
      /* not a flate stream */
    }
  }
  return {
    file: path.basename(file),
    bytes: buf.length,
    header: raw.slice(0, 5),
    pages: pageObjects,
    textChars: text.length,
    containsName: /BRENTON/i.test(text),
    containsWits: /Wits/i.test(text),
    containsEntity: /&bull;|&amp;/.test(text),
    sample: text.slice(0, 220).replace(/\n+/g, " | "),
  };
}

export default async function run(page, ui) {
  const out = [];
  for (const [nav, dlLabel, name] of [
    ["resume", "download cv", "cv"],
    ["works", "download portfolio", "portfolio"],
  ]) {
    await page.evaluate((n) => {
      const b = Array.from(document.querySelectorAll("button")).find((el) =>
        new RegExp("^" + n + "$", "i").test((el.textContent || "").trim()),
      );
      b?.click();
    }, nav);
    await page.waitForTimeout(500);
    const dlPromise = page.waitForEvent("download", { timeout: 20000 });
    await page.evaluate((l) => {
      const b = Array.from(document.querySelectorAll("button")).find((el) =>
        new RegExp(l, "i").test(el.textContent || ""),
      );
      b?.click();
    }, dlLabel);
    const dl = await dlPromise;
    const file = path.join(OUT, `final-${name}.pdf`);
    await dl.saveAs(file);
    out.push({ ...pdfInfo(file), suggested: dl.suggestedFilename() });
    // close modal
    await page.evaluate(() =>
      document
        .querySelector('.print-doc button[aria-label="Close viewer"]')
        ?.click(),
    );
    await page.waitForTimeout(400);
  }
  return out;
}
