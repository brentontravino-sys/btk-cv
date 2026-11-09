import fs from "node:fs";
import path from "node:path";

export default async function run(page, ui) {
  const log = [];
  page.on("pageerror", (e) => log.push("pageerror: " + String(e)));
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning")
      log.push(m.type() + ": " + m.text());
  });

  // Open the portfolio download from the Works page button.
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^works$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(700);
  const labels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("button"))
      .map((b) => (b.textContent || "").trim())
      .filter(Boolean)
      .slice(0, 40),
  );
  const clicked = await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download portfolio/i.test(el.textContent || ""),
    );
    if (b) {
      b.click();
      return b.textContent.trim();
    }
    return null;
  });
  await page.waitForTimeout(1500);
  const modalState = await page.evaluate(() => ({
    modal: !!document.querySelector(".print-doc"),
    printPages: document.querySelectorAll(".print-doc .print-page").length,
  }));

  let dl = null,
    err = null;
  try {
    dl = await page.waitForEvent("download", { timeout: 20000 });
  } catch (e) {
    err = String(e).split("\n")[0];
  }
  let info = null;
  if (dl) {
    const file = path.join(
      "C:\\Users\\User\\Downloads\\btk-cv\\.qa",
      "out-" + dl.suggestedFilename(),
    );
    await dl.saveAs(file);
    const buf = fs.readFileSync(file);
    info = {
      file: path.basename(file),
      bytes: buf.length,
      header: buf.subarray(0, 5).toString("latin1"),
      pages: (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || [])
        .length,
    };
  }

  // Also exercise the Print button (window.print is stubbed to record the call).
  await page.evaluate(() => {
    window.__prints = 0;
    window.print = () => {
      window.__prints++;
    };
  });
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^print$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(500);
  const printState = await page.evaluate(() => ({
    prints: window.__prints,
    hostExists: !!document.getElementById("btk-print-host"),
    hostPages: document.querySelectorAll("#btk-print-root .print-page").length,
    bodyClass: document.body.className,
    cloneText: (
      document.getElementById("btk-print-root")?.textContent || ""
    ).slice(0, 80),
  }));
  // afterprint must clean up
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.waitForTimeout(200);
  const afterCleanup = await page.evaluate(() => ({
    hostExists: !!document.getElementById("btk-print-host"),
    bodyClass: document.body.className,
    modalStillOpen: !!document.querySelector(".print-doc"),
  }));

  return {
    labels,
    clicked,
    modalState,
    err,
    info,
    printState,
    afterCleanup,
    log: log.slice(-10),
  };
}
