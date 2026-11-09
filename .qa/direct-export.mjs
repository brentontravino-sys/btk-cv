import fs from "node:fs";

// Call the export function in-page and surface the thrown error.
export default async function run(page, ui) {
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /^resume$/i.test((el.textContent || "").trim()),
    );
    b?.click();
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((el) =>
      /download cv/i.test(el.textContent || ""),
    );
    b?.click();
  });
  await page.waitForTimeout(1200);

  const res = await page.evaluate(async () => {
    try {
      const mod = await import("/src/utils/pdfExport.ts");
      const dataMod = await import("/src/data/portfolioData.ts");
      const P = dataMod.PERSONAL_INFO;
      const t0 = performance.now();
      await mod.exportCvAsPdf(
        {
          ...P,
          summary:
            "Service check paragraph that is long enough to wrap across a couple of lines in the generated document.",
          highlights: ["15+ YRS EXPERIENCE"],
          stacks: ["Full Stack Dev: Node.js, Python, TypeScript, React, PHP."],
          ecosystem: [{ title: "WordPress", category: "CMS" }],
          experiences: dataMod.EXPERIENCES.map(
            ({ company, role, period, focus, responsibilities, tags }) => ({
              company,
              role,
              period,
              focus,
              responsibilities,
              tags,
            }),
          ),
          skillCategories: dataMod.SKILL_CATEGORIES.map(
            ({ title, skills }) => ({ title, skills }),
          ),
          credentials: dataMod.EDUCATION_AND_CERTS.map(
            ({ title, details, issuer, year }) => ({
              title,
              details,
              issuer,
              year,
            }),
          ),
          availability: "Available for engagements.",
        },
        "service_check",
        () => {},
      );
      return { ok: true, ms: Math.round(performance.now() - t0) };
    } catch (e) {
      return { ok: false, err: String((e && e.stack) || e) };
    }
  });

  return res;
}
