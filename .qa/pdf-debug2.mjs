// Drive the export in-page and surface the exact error via the DOM.
export default async function run(page, ui) {
  // Hook console + errors into window.__log
  await page.evaluate(() => {
    window.__log = [];
    const orig = console.warn;
    console.warn = (...a) => {
      window.__log.push("warn: " + a.map(String).join(" "));
      orig(...a);
    };
    const oe = console.error;
    console.error = (...a) => {
      window.__log.push("error: " + a.map(String).join(" "));
      oe(...a);
    };
    window.onerror = (m) => window.__log.push("onerror: " + m);
    window.addEventListener("unhandledrejection", (e) =>
      window.__log.push(
        "rejection: " + String(e.reason && (e.reason.stack || e.reason)),
      ),
    );
  });

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
  await page.waitForTimeout(15000);

  const state = await page.evaluate(() => ({
    log: window.__log,
    label: (
      Array.from(document.querySelectorAll("button")).find((el) =>
        /download/i.test(el.textContent || ""),
      ) || {}
    ).textContent,
  }));

  // Now call the export path directly with a timestamp to see if it throws.
  const direct = await page.evaluate(async () => {
    try {
      const mod = await import("/src/utils/pdfExport.ts");
      const el = document.querySelector(".print-doc .print-page");
      const t0 = performance.now();
      await mod.exportElementAsPdf(el, "direct_test");
      return {
        ok: true,
        ms: Math.round(performance.now() - t0),
        log: window.__log,
      };
    } catch (e) {
      return { ok: false, err: String((e && e.stack) || e), log: window.__log };
    }
  });

  return {
    state,
    direct: { ok: direct.ok, err: direct.err, ms: direct.ms },
    log: direct.log || state.log,
  };
}
