import fs from "node:fs";

export default async function run(page, ui) {
  const out = { steps: [] };

  // 1. Navigate to the Resume page via the nav.
  const snap = await ui.snapshot();
  out.initialSnapshot = snap.slice(0, 1500);

  // Print emulation: does the CV print stylesheet hide the rest of the site?
  const goResume = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button, a"));
    const b = btns.find((el) => /resume|cv/i.test(el.textContent || ""));
    if (b) {
      b.click();
      return b.textContent.trim();
    }
    return null;
  });
  out.resumeNav = goResume;
  await page.waitForTimeout(800);

  // 2. Click the "Download CV" button on the resume page (opens modal + auto download)
  const cvDownload = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const b = btns.find((el) => /download cv/i.test(el.textContent || ""));
    if (b) {
      b.click();
      return b.textContent.trim();
    }
    return null;
  });
  out.cvDownloadClick = cvDownload;

  // Wait for the modal and the auto-triggered download
  let download = null;
  try {
    download = await page.waitForEvent("download", { timeout: 25000 });
  } catch (e) {
    out.downloadError = String(e).split("\n")[0];
  }

  if (download) {
    const p =
      "C:\\Users\\User\\Downloads\\btk-cv\\.qa\\out-" +
      download.suggestedFilename();
    await download.saveAs(p);
    out.saved = p;
    out.savedSize = fs.statSync(p).size;
    out.suggested = download.suggestedFilename();
    const head = fs.readFileSync(p).subarray(0, 5).toString("latin1");
    out.header = head;
  }

  out.buttonLabelAfter = await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download/i.test(el.textContent || ""),
    );
    return b ? b.textContent.trim() : null;
  });

  out.consoleTail = [];
  return out;
}
