import React, { useState, useRef } from 'react';
import {
  Printer,
  Download,
  X,
  Globe,
  Cpu,
  Bot,
  BarChart3,
  Palette,
  Box,
  GraduationCap,
  BadgeCheck,
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES, EDUCATION_AND_CERTS } from '../data/portfolioData';
import { printDocument } from '../utils/pdfExport';

interface DigitalCVDocumentProps {
  onClose: () => void;
  initialAction?: 'download' | 'print';
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Globe: <Globe className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Bot: <Bot className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  BarChart3: <BarChart3 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Palette: <Palette className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Box: <Box className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
};

const ECOSYSTEM_BADGES = [
  { title: 'WordPress', category: 'CMS & Themes', icon: '/assets/aistudio/wordpress_54e6825b.png' },
  { title: 'Elementor Pro', category: 'Visual Builder', icon: '/assets/aistudio/elementor_6d0d99c7.png' },
  { title: 'Adobe Creative Cloud', category: 'UI/UX & Design', icon: '/assets/aistudio/creative-cloud_d70d1165.png' },
  { title: 'Artificial Intelligence', category: 'AI & Copilots', icon: '/assets/aistudio/AI_ea740ab1.png' },
  { title: 'Google Analytics 4', category: 'GA4 Telemetry', icon: '/assets/aistudio/google-analytics_6c35204b.png' },
  { title: 'Google Ads', category: 'PPC & Search', icon: '/assets/aistudio/Google_Analytics-w_c0679edf.png' },
  { title: 'Search Console', category: 'SEO & Indexing', icon: '/assets/aistudio/google-search-console_9ddfde1a.png' },
  { title: 'PageSpeed Insights', category: 'Core Web Vitals', icon: '/assets/aistudio/google-pagespeeds_c5f5ae6c.png' },
  { title: 'Looker Studio', category: 'BI Dashboards', icon: '/assets/aistudio/looker-studio_2f20ce0f.png' },
  { title: 'Meta Ads', category: 'IG / FB Social', icon: '/assets/aistudio/meta_7b1c433b.png' },
  { title: 'Google Business', category: 'Local SEO Profile', icon: '/assets/aistudio/google-business_6068a31f.png' },
  { title: 'Google Ecosystem', category: 'Tag Manager & Cloud', icon: '/assets/aistudio/Google_463bf0ff.png' },
];

export const DigitalCVDocument: React.FC<DigitalCVDocumentProps> = ({ onClose, initialAction }) => {
  const [showTip, setShowTip] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');
  const documentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Use browser's native print-to-PDF for perfect visual fidelity
    // This captures the exact on-screen design including Tailwind styles, icons, images, dark/light theme
    const ok = printDocument(documentRef.current, 'Brenton T. Kandhai \u2014 Curriculum Vitae');
    if (!ok) {
      // If print is blocked (sandboxed iframe), alert user to use browser's "Print to PDF"
      setDownloadMsg('Print dialog blocked. Use browser menu (Ctrl+P) \u2192 Save as PDF');
      setTimeout(() => setDownloadMsg(''), 4000);
    }
  };

  const handlePrint = () => {
    const ok = printDocument(documentRef.current, 'Brenton T. Kandhai \u2014 Curriculum Vitae');
    if (!ok) {
      // Printing is blocked (e.g. a sandboxed iframe): fall back to the PDF file.
      setDownloadMsg('Print blocked, trying PDF download...');
      setTimeout(() => handleDownload(), 300);
    }
  };

  React.useEffect(() => {
    if (initialAction === 'download') {
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
      return () => clearTimeout(timer);
    } else if (initialAction === 'print') {
      const timer = setTimeout(() => {
        handlePrint();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialAction]);

  return (
    <div className="print-doc fixed inset-0 z-50 flex flex-col bg-zinc-950/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="print-hide shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white dark:bg-[#0d0d11] border-b border-black/[0.08] dark:border-white/[0.08] shadow-md z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black font-semibold text-xs flex items-center justify-center tracking-wider">
            BTK
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white leading-tight">
              Brenton T. Kandhai &bull; Curriculum Vitae
            </h2>
            <p className="text-[12px] text-zinc-400 font-light">
              Full Stack Developer &bull; 15+ Years Experience
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black text-xs font-normal tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm active:scale-95"
            title="Download Curriculum Vitae as PDF (opens print dialog → Save as PDF)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </button>
          {downloadMsg && (
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-2">{downloadMsg}</span>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-black/15 dark:border-white/15 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 transition-colors cursor-pointer"
            title="Print Curriculum Vitae"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-black/10 dark:border-white/10 text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer ml-1"
            aria-label="Close viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Document Viewport */}
      <div className="print-scroll flex-1 overflow-y-auto bg-zinc-100 dark:bg-[#070709] p-3 sm:p-8 print:p-0 print:bg-white">
        <div ref={documentRef} className="max-w-[210mm] mx-auto space-y-8 print:space-y-0 text-zinc-900 dark:text-zinc-100">

          {/* ==================== PAGE 1: EXECUTIVE PROFILE & DEV STACKS ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg tracking-wider">
                  BTK
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 dark:text-white uppercase">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-xs font-light text-zinc-400 tracking-widest uppercase mt-0.5">
                    {PERSONAL_INFO.title} &bull; 15+ Years Verified Experience
                  </p>
                </div>
              </div>

              <div className="text-right text-[12px] font-mono text-zinc-400">
                <div className="text-zinc-900 dark:text-white font-medium">CURRICULUM VITAE</div>
                <div>OFFICIAL &bull; 2026</div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                <span>PROFESSIONAL PROFILE</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Full stack developer with <strong className="font-normal text-zinc-950 dark:text-white">15+ years of experience</strong> engineering high-performance web applications, scalable backend microservices, and custom digital platforms across <strong className="font-normal text-zinc-950 dark:text-white">Node.js, Python, C++, TypeScript, React, and PHP</strong>. Blends robust system architecture, database optimization, and REST/GraphQL APIs with secondary specializations in digital marketing, technical SEO, and UI/UX design to deliver end-to-end digital solutions that convert.
              </p>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-black/[0.06] dark:border-white/[0.06] py-4">
              <div>
                <span className="text-[11px] uppercase font-mono text-zinc-400 block">Experience</span>
                <span className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white">15+ Yrs</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-mono text-zinc-400 block">Web Platforms</span>
                <span className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white">35+ Live</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-mono text-zinc-400 block">Site Health</span>
                <span className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white">90%+ Avg</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-mono text-zinc-400 block">Campaigns</span>
                <span className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white">20+ Managed</span>
              </div>
            </div>

            {/* Dev Stacks & Key Capabilities */}
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400 block">
                CORE DEV STACKS &amp; TECHNICAL CAPABILITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span><strong className="font-normal text-zinc-950 dark:text-white">Full Stack Dev:</strong> Node.js, Python (FastAPI/Flask), C++ / C# (.NET), TypeScript, React, Next.js, PHP 8.x, Tailwind.</span>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span><strong className="font-normal text-zinc-950 dark:text-white">Backend &amp; DevOps:</strong> Docker, Linux Admin, Nginx, PostgreSQL, MySQL, Supabase, Redis Caching, GitHub CI/CD.</span>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span><strong className="font-normal text-zinc-950 dark:text-white">CMS &amp; E-Commerce:</strong> Custom WordPress Themes &amp; Plugins, WooCommerce Architecture, Shopify Liquid, Headless CMS.</span>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span><strong className="font-normal text-zinc-950 dark:text-white">Automation &amp; AI:</strong> Python Automation, Zapier Workflows, HubSpot CRM, Copilot Studio, ChatGPT, Google Gemini.</span>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span><strong className="font-normal text-zinc-950 dark:text-white">SEO &amp; Performance:</strong> Technical Audits, Indexing, Core Web Vitals, GA4, Semrush Academy Certified.</span>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span><strong className="font-normal text-zinc-950 dark:text-white">Digital Marketing:</strong> Google Ads (Search/Display/PMax), Meta Ads Manager, Looker Studio Dashboards.</span>
                </div>
              </div>
            </div>

            {/* Core Ecosystem Banner */}
            <div className="space-y-2.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400 block">
                CORE ECOSYSTEM &bull; INDUSTRY-STANDARD PLATFORMS &amp; MARKETING SUITES
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {ECOSYSTEM_BADGES.map((b) => (
                  <div
                    key={b.title}
                    className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.08]"
                  >
                    <img src={b.icon} alt="" className="w-4 h-4 object-contain shrink-0" />
                    <div className="truncate">
                      <span className="text-[11px] font-medium text-zinc-950 dark:text-white block truncate leading-tight">
                        {b.title}
                      </span>
                      <span className="text-[9.5px] font-mono text-zinc-400 uppercase block truncate leading-tight">
                        {b.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-light text-zinc-500 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span>{PERSONAL_INFO.location}</span>
              <span>{PERSONAL_INFO.phones.join(' &bull; ')}</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-normal">{PERSONAL_INFO.email}</span>
            </div>
          </article>

          {/* ==================== PAGE 2: VERIFIED PROFESSIONAL EXPERIENCE ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                CHRONOLOGY &bull; 01
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Professional Experience &amp; Positions Held
              </h3>
            </div>

            {/* Tighter rhythm in print only, so all four roles stay on this one sheet */}
            <div className="space-y-6 print:space-y-4">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="space-y-2 print-avoid-break">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h4 className="text-sm sm:text-base font-normal text-zinc-950 dark:text-white">
                        {exp.company}
                      </h4>
                      <p className="text-xs font-light text-zinc-500 uppercase tracking-wider">
                        {exp.role} &bull; <span className="normal-case">{exp.focus}</span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-zinc-400 shrink-0">{exp.period}</span>
                  </div>

                  <ul className="space-y-1.5 pt-1 print:space-y-0.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono text-zinc-500 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {idx < EXPERIENCES.length - 1 && (
                    <div className="border-b border-dashed border-black/[0.06] dark:border-white/[0.06] pt-3" />
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* ==================== PAGE 3: TECHNICAL SKILLS & DISCIPLINES ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                EXPERTISE MATRIX &bull; 02
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Detailed Technical Disciplines &amp; Proficiencies
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] space-y-2.5 print-avoid-break"
                >
                  <div className="flex items-center gap-2">
                    {CATEGORY_ICONS[cat.iconName]}
                    <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white leading-tight">
                      {cat.title}
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="flex items-center justify-between gap-2 text-[11.5px]">
                        <span className="font-light text-zinc-700 dark:text-zinc-300">{s.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 shrink-0">{s.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* ==================== PAGE 4: EDUCATION & VERIFIED CREDENTIALS ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                CREDENTIALS &bull; 03
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Education, Certifications &amp; Commercial Availability
              </h3>
            </div>

            <div className="space-y-3">
              {EDUCATION_AND_CERTS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print-avoid-break"
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white">{cert.title}</h4>
                      <p className="text-xs font-light text-zinc-500">{cert.details}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-mono text-xs uppercase tracking-wider text-zinc-400">{cert.issuer}</div>
                    <div className="font-mono text-xs text-zinc-900 dark:text-white">{cert.year}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability & Official Signoff */}
            <div className="p-5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/20 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">
                COMMERCIAL ENGAGEMENTS
              </span>
              <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Available for full-time senior engineering appointments, contract systems architecture, and custom application engineering engagements. Located in Johannesburg and operating with distributed teams across the UK, EU, US, and Southern Africa.
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500">
              <div>
                <strong className="font-normal text-zinc-950 dark:text-white">Document Status:</strong> Verified Current &bull; Generated from Official Portfolio
              </div>
              <div className="font-mono text-[11px] text-zinc-400">
                OFFICIAL CV &bull; BRENTON T. KANDHAI
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
