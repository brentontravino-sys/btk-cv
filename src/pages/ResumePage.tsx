import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_AND_CERTS } from '../data/portfolioData';
import { TechEcosystemBanner } from '../components/TechEcosystemBanner';
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
  onOpenPdf: (type: 'cv' | 'portfolio', action?: 'view' | 'download' | 'print') => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onOpenPdf }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-28 max-w-5xl mx-auto">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
            <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-500 dark:text-zinc-400">
              CURRICULUM VITAE &bull; OFFICIAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-2">
            Curriculum Vitae
          </h1>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Brenton T. Kandhai &bull; Verified 15+ Years Experience
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onOpenPdf('cv', 'view')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-normal tracking-wider uppercase bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenPdf('cv', 'download')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-black/15 dark:border-white/15 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 bg-zinc-50 dark:bg-zinc-900/40 transition-colors cursor-pointer"
            title="Download Curriculum Vitae as PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </button>

          <button
            onClick={() => onOpenPdf('cv', 'print')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-black/15 dark:border-white/15 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 bg-zinc-50 dark:bg-zinc-900/40 transition-colors cursor-pointer"
            title="Print Curriculum Vitae"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </motion.div>

      {/* Full Width Scrolling Ecosystem Banner */}
      <TechEcosystemBanner />

      {/* Main CV Body (Minimal Editorial White Sheet with Smooth Stagger) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-16 rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow space-y-16 print:p-0 print:border-none print:shadow-none"
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

            <div className="text-[12.4px] font-mono tracking-widest uppercase text-zinc-400">
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
          <h3 className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
            PROFESSIONAL PROFILE
          </h3>
          <p className="text-sm font-light leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">
            Full stack developer with{' '}
            <strong className="font-normal text-zinc-950 dark:text-white">
              15+ years of experience
            </strong>{' '}
            engineering high-performance web applications, scalable backend services, and custom digital platforms across Node.js, Python, C++, TypeScript/JavaScript, React, and PHP. Blends robust system architecture, database optimization, and microservice APIs with secondary specializations in digital marketing, technical SEO, and UI/UX design to deliver end-to-end digital solutions that convert.
          </p>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-4">
          <h3 className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
            KEY CAPABILITIES &amp; DEV STACKS
          </h3>
          <div className="space-y-3 text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Full stack &amp; application development:</strong>{' '}
              Node.js, Python (FastAPI/Flask), C++ / C# (.NET/systems), TypeScript, React, Next.js, Vite, PHP 8.x, modern CSS/Tailwind, and RESTful / GraphQL API architectures.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Backend, databases &amp; DevOps:</strong>{' '}
              Express.js, Fastify, Docker containerization, Linux server administration, Nginx, PostgreSQL, MySQL, Supabase, Redis in-memory caching, and GitHub CI/CD automated deployment pipelines.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">CMS &amp; e-commerce engineering:</strong>{' '}
              Custom WordPress theme and plugin development, WooCommerce checkout architectures, Shopify Liquid storefronts, and headless CMS API integrations.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Automation, scripting &amp; AI systems:</strong>{' '}
              Python data automation pipelines, Zapier workflows, HubSpot &amp; Mailchimp customer journeys, and generative AI prompt engineering (Copilot Studio, ChatGPT, Google Gemini).
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">SEO &amp; web performance (Secondary):</strong>{' '}
              Technical audits, indexing health, Core Web Vitals speed tuning, search visibility, and Semrush Academy certified optimization.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Digital marketing (Secondary):</strong>{' '}
              Google Ads, YouTube and paid / organic social campaigns, campaign budgets, A/B testing, Looker Studio analytics dashboards, and conversion tracking.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">UI/UX &amp; creative production (Secondary):</strong>{' '}
              Interactive UI / UX prototypes in Figma, 3D architectural exhibition booth layout (Comic Con Africa, Decorex), brand identity, and motion design.
            </p>
            <p>
              <strong className="font-normal text-zinc-950 dark:text-white">Management &amp; commercial:</strong>{' '}
              Account and engineering project management, cross-functional team coordination, and tier-3 technical ticketing support.
            </p>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-8">
          <h3 className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
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
          <h3 className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
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
