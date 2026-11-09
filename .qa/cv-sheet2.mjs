// Measure sheet 2 against the printable box used by Chromium's print layout.
export default async function run(page, ui) {
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^resume$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download cv/i.test(el.textContent || ""),
    );
    b?.click();
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    const src = document.querySelector(".print-doc .print-scroll > div");
    const root = document.createElement("div");
    root.id = "btk-print-root";
    Array.from(src.children).forEach((c) =>
      root.appendChild(c.cloneNode(true)),
    );
    const host = document.createElement("div");
    host.id = "btk-print-host";
    host.appendChild(root);
    document.body.appendChild(host);
    document.body.classList.add("printing-document");
  });
  await page.emulateMedia({ media: "print" });
  await page.waitForTimeout(300);

  return page.evaluate(() => {
    const mm = (px) => +(px / (96 / 25.4)).toFixed(2);
    const host = document.getElementById("btk-print-host");
    const hostTop = host.getBoundingClientRect().top;
    const sheets = Array.from(
      document.querySelectorAll("#btk-print-root .print-page"),
    );
    // cumulative offsets: where each sheet starts relative to the host
    const detail = sheets.map((s, i) => {
      const r = s.getBoundingClientRect();
      const lastChild = s.lastElementChild.getBoundingClientRect();
      const rows = Array.from(s.querySelectorAll(".print-avoid-break")).map(
        (el, j) => ({
          j: j + 1,
          hMm: mm(el.getBoundingClientRect().height),
        }),
      );
      return {
        sheet: i + 1,
        startMm: mm(r.top - hostTop),
        heightMm: mm(r.height),
        contentBottomMm: mm(lastChild.bottom - hostTop),
        pos: getComputedStyle(s).position,
        rows,
      };
    });
    const limit = 277;
    return {
      limit,
      detail: detail.map((d) => ({
        ...d,
        roomLeftMm: +(limit - d.contentBottomMm).toFixed(1),
        // If the sheet starts mid-page, how much room remains on that page?
        overflows: d.contentBottomMm > limit,
      })),
      hostFontSize: getComputedStyle(host).fontSize,
    };
  });
}
