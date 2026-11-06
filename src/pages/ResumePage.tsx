import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_AND_CERTS } from '../data/portfolioData';
import {
  FileText,
  Download,
  Printer,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  GraduationCap,
  Award,
} from 'lucide-react';

interface ResumePageProps {
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onOpenPdf }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 max-w-5xl mx-auto">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-500 dark:text-zinc-400">
              CURRICULUM VITAE &bull; OFFICIAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-2">
            Curriculum Vitae
          </h1>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Brenton T. Kandhai &bull; Verified 10+ Years Experience
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onOpenPdf('cv')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-normal tracking-wider uppercase bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>View Original PDF</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={PERSONAL_INFO.cvPdfPath}
            download
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/15 dark:border-white/15 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-300 hover:border-black/40 dark:hover:border-white/40 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Download</span>
          </a>

          <button
            onClick={handlePrint}
            className="p-2 rounded-full border border-black/15 dark:border-white/15 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            title="Print CV"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Main CV Body (Minimal Editorial White Sheet with Smooth Stagger) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-16 rounded-3xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow space-y-16 print:p-0 print:border-none print:shadow-none"
      >
        {/* CV Top Info */}
        <div className="border-b border-black/[0.06] dark:border-white/[0.06] pb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-zinc-950 dark:text-white uppercase">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-xs font-light tracking-[0.2em] text-zinc-400 uppercase mt-1">
                {PERSONAL_INFO.title}
              </p>
            </div>

            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
              BTK &bull; JOHANNESBURG
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-zinc-500 font-light">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{PERSONAL_INFO.location}</span>
            </span>

            {PERSONAL_INFO.phones.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>{phone}</span>
              </a>
            ))}

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Professional Profile */}
        <div className="space-y-4">
          <h3 className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
            PROFESSIONAL PROFILE
          </h3>
          <p className="text-sm font-light leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">
            Digital marketing and web solutions professional with{' '}
            <strong className="font-normal text-zinc-950 dark:text-white">
              10+ years of experience
            </strong>{' '}
            across digital campaigns, SEO, website and e-commerce development, and multimedia
            design. Combines analytical and technical skills with creative production to support
            brands, improve online presence and deliver practical digital projects. Experienced in
            Google Ads and social campaigns, technical SEO, WordPress and Shopify websites,
            performance reporting, account coordination and customer technical support.
          </p>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-4">
          <h3 className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
            KEY CAPABILITIES
          </h3>
          <div className="space-y-3 text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Digital marketing:</strong>{' '}
              Google Ads, YouTube and paid / organic social campaigns; account setup, campaign
              budgets, A/B testing, competitor analysis, dashboards and ROI reporting.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">SEO &amp; web performance:</strong>{' '}
              technical audits, keyword research, indexing, site health, search visibility, Core
              Web Vitals and performance optimization.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Web &amp; e-commerce:</strong>{' '}
              WordPress, Shopify and WooCommerce; website maintenance, custom themes, plugins,
              functionality and API integrations.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Creative production:</strong>{' '}
              UI / UX, 3D layouts, brand identity, advertising, digital and print content,
              photography, video and motion design.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Management &amp; commercial:</strong>{' '}
              account and project management, digital team coordination, product research and
              management, pricing, forecasting and demand planning.
            </p>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-8">
          <h3 className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
            PROFESSIONAL EXPERIENCE
          </h3>

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-normal text-zinc-950 dark:text-white">
                    {exp.company}
                  </h4>
                  <span className="font-mono text-xs text-zinc-400">{exp.period}</span>
                </div>

                <p className="text-xs font-light text-zinc-500 uppercase tracking-wider">
                  {exp.role} &bull; {exp.focus}
                </p>

                <ul className="space-y-2 text-xs font-light text-zinc-600 dark:text-zinc-400 pt-1">
                  {exp.responsibilities.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5">
                      <span className="text-zinc-400 mt-0.5">&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="space-y-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
          <h3 className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
            EDUCATION &amp; CERTIFICATIONS
          </h3>

          <div className="space-y-4 text-xs font-light text-zinc-600 dark:text-zinc-400">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-normal text-zinc-950 dark:text-white">
                  Matriculation Senior Certificate
                </span>{' '}
                &mdash; Heather Secondary High School
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-normal text-zinc-950 dark:text-white">
                  Semrush Academy
                </span>{' '}
                &mdash; Certified SEO / SEM Auditing &amp; Strategy
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-normal text-zinc-950 dark:text-white">
                  Google Digital Training
                </span>{' '}
                &mdash; Search Ads, Display &amp; Analytics
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
