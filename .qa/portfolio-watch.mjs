import fs from "node:fs";
import path from "node:path";

export default async function run(page, ui) {
  const events = [];
  page.on("download", (d) => events.push("download: " + d.suggestedFilename()));

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
  await page.waitForTimeout(2000);

  const samples = [];
  for (let i = 0; i < 5; i++) {
    samples.push(
      await page.evaluate(() => {
        const b = Array.from(document.querySelectorAll("button")).find((el) =>
          /download/i.test(el.textContent || ""),
        );
        return b ? b.textContent.trim() : null;
      }),
    );
    await page.waitForTimeout(1000);
  }

  // Call the export helper in-page directly with full project data.
  const direct = await page.evaluate(async () => {
    try {
      const mod = await import("/src/utils/pdfExport.ts");
      const D = await import("/src/data/portfolioData.ts");
      const P = D.PERSONAL_INFO;
      const systems = D.PROJECTS.filter((p) => p.category === "architecture");
      const clients = D.PROJECTS.filter((p) => p.category !== "architecture");
      await mod.exportPortfolioAsPdf(
        {
          name: P.name,
          title: P.title,
          location: P.location,
          phones: P.phones,
          email: P.email,
          headline:
            "Engineering High-Performance Web Applications, Scalable Backend Systems & Modern Applications.",
          summary: P.summary,
          kpis: [{ label: "EXPERIENCE", value: "15+ YRS" }],
          ecosystem: [{ title: "WordPress", category: "CMS" }],
          systems: systems.map((p) => ({
            title: p.title,
            summary: p.tagline,
            scope: p.description,
            tags: p.tools,
          })),
          clients: clients.map((p) => ({
            name: p.title,
            category: p.client + " - " + p.categoryLabel,
            summary: p.description,
          })),
          experiences: D.EXPERIENCES.map(
            ({ company, role, period, focus, responsibilities, tags }) => ({
              company,
              role,
              period,
              focus,
              responsibilities,
              tags,
            }),
          ),
          skillCategories: D.SKILL_CATEGORIES.map(({ title, skills }) => ({
            title,
            skills,
          })),
          credentials: D.EDUCATION_AND_CERTS.map(
            ({ title, details, issuer, year }) => ({
              title,
              details,
              issuer,
              year,
            }),
          ),
        },
        "direct_portfolio",
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, err: String((e && e.stack) || e) };
    }
  });

  return { events, samples, direct };
}
