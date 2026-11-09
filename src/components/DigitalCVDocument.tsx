import React from 'react';
import {
  Printer,
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

interface DigitalCVDocumentProps {
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Globe: <Globe className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Bot: <Bot className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  BarChart3: <BarChart3 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Palette: <Palette className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
  Box: <Box className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />,
};

export const DigitalCVDocument: React.FC<DigitalCVDocumentProps> = ({ onClose }) => {
  // Mark the body while the CV viewer is open so print output contains only this document
  React.useEffect(() => {
    document.body.classList.add('print-cv-active');
    return () => {
      document.body.classList.remove('print-cv-active');
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-doc fixed inset-0 z-50 flex flex-col bg-zinc-950/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      {/* Top Control Bar (Hidden on print) */}
      <div className="print-hide shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white dark:bg-[#0d0d11] border-b border-black/[0.08] dark:border-white/[0.08] shadow-md z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black font-semibold text-xs flex items-center justify-center tracking-wider">
            BTK
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white leading-tight">
              Brenton T. Kandhai &bull; Curriculum Vitae
            </h2>
            <p className="text-[12.4px] text-zinc-400 font-light">
              Full Stack Developer &bull; 15+ Years Experience
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-black/15 dark:border-white/15 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 transition-colors cursor-pointer"
            title="Print or Save"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save</span>
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

      {/* Main Container */}
      <div className="print-scroll flex-1 overflow-y-auto bg-zinc-100 dark:bg-[#070709] p-3 sm:p-8 print:p-0 print:bg-white">
        {/* ==================== PAGE 1: COVER & PROFILE ==================== */}
        <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-12">
          <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg tracking-wider">
                BTK
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 dark:text-white uppercase">
                  Brenton T. Kandhai
                </h1>
                <p className="text-xs font-light text-zinc-400 tracking-widest uppercase">
                  {PERSONAL_INFO.title} &bull; 15+ Years
                </p>
              </div>
            </div>

            <div className="text-right text-[12.4px] font-mono text-zinc-400">
              <div>CURRICULUM VITAE</div>
              <div>OFFICIAL &bull; 2026</div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-4 py-4">
            <div className="inline-flex items-center gap-2 text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
              <span>PROFESSIONAL PROFILE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extralight tracking-tight text-zinc-950 dark:text-white leading-[1.2]">
              {PERSONAL_INFO.tagline}
            </h2>
            <p className="text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-b border-black/[0.06] dark:border-white/[0.06] py-6">
            <div>
              <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Experience</span>
              <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">15+ Yrs</span>
            </div>
            <div>
              <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Live Platforms</span>
              <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">30+ Delivered</span>
            </div>
            <div>
              <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Projects</span>
              <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">40+ Completed</span>
            </div>
            <div>
              <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Campaigns</span>
              <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">20+ Managed</span>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-3">
            <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
              Core Competencies
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-light">
              {[
                'Full Stack Web Development & System Architecture',
                'E-Commerce Engineering (WooCommerce / Shopify)',
                'Custom WordPress Theme & Plugin Engineering',
                'Technical SEO & Core Web Vitals Optimization',
                'Google Ads, Analytics & Conversion Tracking',
                'Digital Marketing Strategy & Creative Design',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <BadgeCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-light text-zinc-500 pt-2">
            <span>{PERSONAL_INFO.location}</span>
            <span>{PERSONAL_INFO.phones.join(' &bull; ')}</span>
            <span className="text-zinc-900 dark:text-zinc-200">{PERSONAL_INFO.email}</span>
          </div>
        </article>

        {/* ==================== PAGE 2: PROFESSIONAL EXPERIENCE ==================== */}
        <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
          <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
            <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
              EXPERIENCE &bull; 01
            </span>
            <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
              Professional Experience
            </h3>
          </div>

          <div className="space-y-8">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <h4 className="text-base font-normal text-zinc-950 dark:text-white">{exp.company}</h4>
                    <p className="text-xs font-light text-zinc-500">{exp.role} &mdash; {exp.focus}</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-400 shrink-0">{exp.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] text-[10.2px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                {idx < EXPERIENCES.length - 1 && (
                  <div className="border-b border-dashed border-black/[0.08] dark:border-white/[0.08]" />
                )}
              </div>
            ))}
          </div>
        </article>

        {/* ==================== PAGE 3: TECHNICAL SKILLS ==================== */}
        <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
          <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
            <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
              CAPABILITIES &bull; 02
            </span>
            <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
              Technical Skills &amp; Disciplines
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[cat.iconName]}
                  <h4 className="text-sm font-normal text-zinc-950 dark:text-white leading-tight">{cat.title}</h4>
                </div>
                <div className="space-y-1.5">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="flex items-center justify-between gap-2 text-[12.4px]">
                      <span className="font-light text-zinc-700 dark:text-zinc-300">{s.name}</span>
                      <span className="font-mono text-[10.2px] uppercase tracking-wider text-zinc-400 shrink-0">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* ==================== PAGE 4: EDUCATION & CERTIFICATIONS ==================== */}
        <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
          <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
            <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
              CREDENTIALS &bull; 03
            </span>
            <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
              Education &amp; Verified Certifications
            </h3>
          </div>

          <div className="space-y-4">
            {EDUCATION_AND_CERTS.map((cert, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-normal text-zinc-950 dark:text-white">{cert.title}</h4>
                    <p className="text-xs font-light text-zinc-500">{cert.details}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-[12.4px] uppercase tracking-wider text-zinc-400">{cert.issuer}</div>
                  <div className="font-mono text-[12.4px] text-zinc-900 dark:text-white">{cert.year}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500">
            <div>
              <strong className="font-normal text-zinc-950 dark:text-white">Available:</strong> Full-time &bull; Contract &bull; Remote / On-site (Johannesburg, SA)
            </div>
            <div className="font-mono text-[12.4px] text-zinc-400">
              DOCUMENT CERTIFIED &bull; BRENTON T. KANDHAI
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
