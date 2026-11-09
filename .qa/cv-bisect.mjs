import fs from "node:fs";

// Which element pushes CV sheet 2 onto an extra printed page? Hide each sheet and count.
export default async function run(page, ui) {
  const { PDFDocument } = await import("pdf-lib");
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

  const count = async () =>
    (
      await PDFDocument.load(
        await page.pdf({ printBackground: true, preferCSSPageSize: true }),
      )
    ).getPageCount();

  const baseline = await count();
  // Hide sheets one at a time.
  const perSheet = [];
  for (let i = 0; i < 4; i++) {
    await page.evaluate((idx) => {
      document
        .querySelectorAll("#btk-print-root .print-page")
        .forEach((el, j) => {
          el.style.display = j === idx ? "" : "none";
        });
    }, i);
    await page.waitForTimeout(150);
    perSheet.push({ sheet: i + 1, printedPages: await count() });
  }
  await page.evaluate(() =>
    document.querySelectorAll("#btk-print-root .print-page").forEach((el) => {
      el.style.display = "";
    }),
  );

  // Inside sheet 2: hide blocks one at a time.
  const blocks = await page.evaluate(
    () =>
      document.querySelectorAll(
        "#btk-print-root .print-page:nth-child(2) .space-y-6 > *",
      ).length,
  );
  const perBlock = [];
  for (let i = 0; i < blocks; i++) {
    await page.evaluate((idx) => {
      document
        .querySelectorAll("#btk-print-root .print-page")
        .forEach((el, j) => {
          el.style.display = j === 1 ? "" : "none";
        });
      document
        .querySelectorAll(
          "#btk-print-root .print-page:nth-child(2) .space-y-6 > *",
        )
        .forEach((el, j) => {
          el.style.display = j === idx ? "none" : "";
        });
    }, i);
    await page.waitForTimeout(150);
    perBlock.push({ block: i + 1, printedPages: await count() });
  }

  return {
    baseline,
    perSheet,
    sheet2Blocks: blocks,
    perBlock,
    size: fs.existsSync("x"),
  };
}
