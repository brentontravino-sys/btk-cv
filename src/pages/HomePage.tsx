import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PageTab, ProjectItem } from '../types';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { ArcAdaptiveHero } from '../components/ArcAdaptiveHero';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  Briefcase,
  ArrowUpRight,
  Globe,
  BarChart3,
  TrendingUp,
  Layers,
  Cpu,
  Bot,
  CheckCircle2,
  Check,
  Award,
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
  onSelectProject: (project: ProjectItem) => void;
  isDark: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenPdf,
  onSelectProject,
  isDark,
}) => {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 6);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for tracing beam on timeline
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 50%'],
  });

  return (
    <div ref={containerRef} className="space-y-36 sm:space-y-48 pb-32">
      {/* SECTION 1: ArcAdaptive Mountain Parallax Hero with Floating Architectural Card */}
      <section id="hero" className="scroll-mt-28">
        <ArcAdaptiveHero
          setActiveTab={setActiveTab}
          onOpenPdf={onOpenPdf}
          isDark={isDark}
        />
      </section>

      {/* SECTION 2: Kinetic Editorial Manifesto (Split-Mask Typography Reveal Effect) */}
      <section id="manifesto" className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
          <span className="text-[11.3px] tracking-[0.3em] uppercase font-light text-zinc-400">
            CREATIVE MANIFESTO &bull; 01
          </span>
        </motion.div>

        {/* Staggered Line Mask Reveal */}
        <div className="overflow-hidden py-1">
          <motion.blockquote
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-zinc-950 dark:text-white tracking-tight leading-[1.15]"
          >
            &ldquo;In today&apos;s world, <br className="hidden sm:inline" />
            <span className="font-normal italic">digital is everything</span>.&rdquo;
          </motion.blockquote>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-xl mx-auto leading-relaxed pt-2"
        >
          I&rsquo;m Brenton Kandhai, a Full Stack Developer with 15+ years of experience engineering high-performance web applications, scalable e-commerce systems, and custom digital platforms &mdash; supported by secondary expertise in growth marketing, technical SEO, and UI/UX design.
        </motion.p>
      </section>

      {/* SECTION 3: Core Disciplines (3D Perspective Card Tilt Entrance Effect) */}
      <section id="disciplines" className="space-y-12 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400">
              DISCIPLINES &bull; 02
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight text-zinc-950 dark:text-white mt-1 tracking-tight">
              Core Capabilities &amp; Expertise
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveTab('skills')}
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer font-light group"
          >
            <span>View Full Technical Stack</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* 3D Perspective Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {[
            {
              icon: Cpu,
              title: 'Technical Architecture & Systems Engineering',
              desc: 'High-scale event-driven workflow engines, distributed AI topologies, multi-tenant RBAC architectures, microservices, and real-time state synchronization.',
            },
            {
              icon: Globe,
              title: 'Full Stack Web & Application Development',
              desc: 'Architecting modern responsive front-end and back-end web applications. Custom React, Vite, Next.js, WordPress theme engineering, PHP, REST APIs, and scalable infrastructure.',
            },
            {
              icon: Layers,
              title: 'E-Commerce & Digital Systems',
              desc: 'Shopify, WooCommerce, and custom checkout funnels. Catalog synchronization, payment gateway integrations, security hardening, and Core Web Vitals speed optimization.',
            },
            {
              icon: Bot,
              title: 'CRM, AI Tools & Automation',
              desc: 'Customer lifecycle workflows, HubSpot & Mailchimp CRM management, Zapier integrations, and generative AI prompt engineering (ChatGPT, Copilot Studio, Google Gemini, Midjourney).',
            },
            {
              icon: TrendingUp,
              title: 'SEO & Web Performance (Secondary)',
              desc: 'Secondary specialization in technical audits, keyword research, indexing health, search visibility, Core Web Vitals, and speed optimization verified by Semrush Academy credentials.',
            },
            {
              icon: BarChart3,
              title: 'Digital Marketing & Paid Campaigns (Secondary)',
              desc: 'Secondary specialization in Google Ads, YouTube, and paid social campaigns. Account setup, campaign budgets, A/B testing, Looker Studio dashboards, and ROI optimization.',
            },
            {
              icon: CheckCircle2,
              title: 'UI/UX, 3D Layouts & Creative Design (Secondary)',
              desc: 'Secondary specialization in architectural 3D exhibition booth layout (Comic Con Africa, Decorex), interactive UI prototypes in Figma, brand identity, and motion graphics.',
            },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotateX: 18 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="p-8 rounded-lg bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] space-y-4 soft-shadow hover:border-black/30 dark:hover:border-white/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-normal text-base text-zinc-950 dark:text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-light">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Stack (Software & Digital Arsenal) */}
      <section id="stack" className="space-y-12 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400">
              STACK &bull; 03
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight text-zinc-950 dark:text-white mt-1 tracking-tight">
              Software & Digital Arsenal
            </h2>
          </motion.div>
        </div>

        {/* Software & Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              category: 'Full Stack & Web Engineering',
              tools: ['React', 'Next.js', 'Vite', 'WordPress', 'Shopify', 'PHP & MySQL', 'Tailwind CSS'],
            },
            {
              category: 'Cloud, APIs & Architecture',
              tools: ['REST APIs', 'Node.js', 'GitHub', 'Vercel', 'Supabase', 'AWS & Azure', 'Server Admin'],
            },
            {
              category: 'CRM, AI & Automation',
              tools: ['HubSpot CRM', 'Zapier Automation', 'ChatGPT & Copilot', 'Google Gemini', 'Zendesk', 'Mailchimp'],
            },
            {
              category: 'SEO & Analytics (Secondary)',
              tools: ['Semrush Academy', 'Google Search Console', 'Core Web Vitals', 'GA4', 'Technical Audits'],
            },
            {
              category: 'Digital Marketing (Secondary)',
              tools: ['Google Ads', 'YouTube Ads', 'Meta Ads', 'Looker Studio', 'PPC Dashboards'],
            },
            {
              category: 'UI/UX & Design Suite (Secondary)',
              tools: ['Figma', 'Blender 3D', 'Adobe Creative Cloud', 'Exhibition CAD', 'Brand Identity'],
            },
          ].map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="p-8 rounded-lg bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] space-y-4 soft-shadow hover:border-black/30 dark:hover:border-white/30 transition-all group"
            >
              <div className="space-y-1">
                <span className="text-[10.3px] font-mono tracking-widest text-zinc-400 uppercase block">
                  CATEGORY
                </span>
                <h3 className="text-lg font-normal text-zinc-950 dark:text-white">
                  {category.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {category.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10.3px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-light"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Career History & Milestones (Scroll-Driven Glowing Tracing Beam) */}
      <section id="history" ref={timelineRef} className="space-y-12 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400">
              HISTORY &bull; 04
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight text-zinc-950 dark:text-white mt-1 tracking-tight">
              Professional Timeline
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveTab('resume')}
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer font-light group"
          >
            <span>Full CV &amp; Credentials</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Timeline with Tracing Center Beam */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Vertical Dynamic Tracing Line */}
          <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[1px] bg-black/10 dark:bg-white/10" />
          <motion.div
            style={{ scaleY: timelineScroll }}
            className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] bg-zinc-950 dark:bg-white origin-top"
          />

          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-6 sm:-left-10 top-6 w-3 h-3 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-950 dark:border-white shadow-sm -translate-x-[5px]" />

              <div className="p-8 rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] space-y-4 soft-shadow hover:border-black/30 dark:hover:border-white/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-normal text-lg text-zinc-950 dark:text-white">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <div className="text-xs font-light text-zinc-500 tracking-wide uppercase">
                  {exp.role} &bull; <span className="text-zinc-400 normal-case">{exp.focus}</span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] font-light">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-zinc-400 mt-0.5">&bull;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Inquiries & Contact Portal (Monolithic Aperture Expand Effect) */}
      <section id="inquiries" className="scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-10 sm:p-16 lg:p-20 rounded-xl bg-zinc-950 text-white dark:bg-[#0c0c10] border border-white/[0.1] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-white/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[11.3px] tracking-[0.25em] uppercase font-light text-zinc-400">
                INITIATE DIALOGUE &bull; 06
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight leading-tight">
              Let's Connect
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-2xl">
              Available for full-time engineering engagements, contract full stack development, technical web architecture, and custom applications. Located in Johannesburg and collaborating worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setActiveTab('contact')}
                className="flex items-center gap-2 px-6 py-3 rounded-md text-xs font-normal tracking-widest uppercase text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer shadow-md active:scale-98"
              >
                <span>Direct Contact Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenPdf('cv')}
                className="flex items-center gap-2 px-5 py-3 rounded-md text-xs font-light tracking-wider uppercase border border-white/20 hover:border-white/50 text-white transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-300" />
                <span>Verified CV</span>
              </button>

              <button
                onClick={() => onOpenPdf('portfolio')}
                className="flex items-center gap-2 px-5 py-3 rounded-md text-xs font-light tracking-wider uppercase border border-white/20 hover:border-white/50 text-white transition-all cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-zinc-300" />
                <span>Portfolio</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
