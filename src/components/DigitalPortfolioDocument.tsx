import React, { useState, useRef } from 'react';
import {
  Printer,
  Download,
  X,
  ExternalLink,
  Globe,
  Palette,
  Bot,
  BarChart3,
  Cpu,
  Info,
  BadgeCheck,
} from 'lucide-react';
import { EXPERIENCES, EDUCATION_AND_CERTS, PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { printDocument } from '../utils/pdfExport';

interface DigitalPortfolioDocumentProps {
  onClose: () => void;
  initialAction?: 'download' | 'print';
}

const BULLET_SIGN = '\u2022';

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

export const DigitalPortfolioDocument: React.FC<DigitalPortfolioDocumentProps> = ({
  onClose,
  initialAction,
}) => {
  const [showTip, setShowTip] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');
  const documentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Use browser's native print-to-PDF for perfect visual fidelity
    // This captures the exact on-screen design including Tailwind styles, icons, images, dark/light theme
    const ok = printDocument(documentRef.current, 'Brenton T. Kandhai \u2014 Selected Works Portfolio');
    if (!ok) {
      // If print is blocked (sandboxed iframe), alert user to use browser's "Print to PDF"
      setDownloadMsg('Print dialog blocked. Use browser menu (Ctrl+P) \u2192 Save as PDF');
      setTimeout(() => setDownloadMsg(''), 4000);
    }
  };

  const handlePrint = () => {
    const ok = printDocument(documentRef.current, 'Brenton T. Kandhai \u2014 Selected Works Portfolio');
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

  const ebookCovers = [
    { title: 'Practical AI Tools For Everyday Work', path: '/works/ebooks/Practical AI Tools - For Everyday Work - Cover.jpg', tag: 'AI & Tools' },
    { title: 'AI & Machine Learning Practical Course', path: '/works/ebooks/AI Machine - Learning Practical Course - Commercial Edition - Cover.jpg', tag: 'Data & ML' },
    { title: 'Cybersecurity Mini-Course Guide', path: '/works/ebooks/Cybersecurity - Mini-Course - Cover.jpg', tag: 'Security' },
    { title: 'Digital Marketing Playbook Insights 2026', path: '/works/ebooks/Digital Marketing - Playbook Insights - Cover.jpg', tag: 'Marketing & SEO' },
    { title: 'Career Self Help & Leadership', path: '/works/ebooks/Career Self Help - eBook - Cover.jpg', tag: 'Leadership' },
    { title: 'Budgeting for Beginners Financial Guide', path: '/works/ebooks/Budgeting for Beginners - Guide - Cover.jpg', tag: 'Finance' },
    { title: 'The Daily Workout Guide', path: '/works/ebooks/Daily Workout Guide - Cover.jpg', tag: 'Fitness' },
    { title: 'Healthy Smoothies & Health Drinks Guide', path: '/works/ebooks/Healthy Smoothies and Health Drinks - Guide - Cover.jpg', tag: 'Wellness' },
    { title: 'Botanical Wall Art Editorial Design', path: '/works/ebooks/Botanical Wall Art - Cover.jpg', tag: 'Visual Art' },
    { title: 'Backyard Vegetable Garden Guide', path: '/works/ebooks/Backyard Vegetable Garden - Premium eBook - Cover.jpg', tag: 'Lifestyle' },
    { title: 'The Golden Round Golf Guide for Seniors', path: '/works/ebooks/The Golden Round Golf Guide for Seniors - Cover.jpg', tag: 'Sports' },
  ];

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
              Brenton T. Kandhai &bull; Selected Works Portfolio
            </h2>
            <p className="text-[12px] text-zinc-400 font-light">
              Full Stack Web Platforms, Technical Architecture &amp; Design
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black text-xs font-normal tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm active:scale-95"
            title="Download Portfolio as PDF (opens print dialog → Save as PDF)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Portfolio</span>
          </button>
          {downloadMsg && (
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-2">{downloadMsg}</span>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-black/15 dark:border-white/15 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 transition-colors cursor-pointer"
            title="Print Portfolio"
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

          {/* ==================== PAGE 1: COVER & EXECUTIVE OVERVIEW ==================== */}
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
                <div className="text-zinc-900 dark:text-white font-medium">OFFICIAL PORTFOLIO</div>
                <div>OFFICIAL EDITION &bull; 2026</div>
              </div>
            </div>

            {/* Cover Hero Statement */}
            <div className="space-y-3 py-2">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                <span>EXECUTIVE OVERVIEW</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white leading-[1.2]">
                Engineering High-Performance Web Applications, Scalable Backend Systems &amp; Modern Applications.
              </h2>
              <p className="text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                15+ years of verified expertise architecting enterprise web systems, custom full stack applications across Node.js, Python, C++, TypeScript, React, and PHP, scalable WooCommerce &amp; Shopify e-commerce engines, and high-conversion UI/UX workflows. Complemented by secondary specializations in Google Ads, technical SEO audits, and 3D architectural brand activations.
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
                <span className="text-[11px] uppercase font-mono text-zinc-400 block">National Brands</span>
                <span className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white">Skyworth, Wits</span>
              </div>
            </div>

            {/* Core Ecosystem Banner */}
            <div className="space-y-2.5">
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

            {/* Contact Details */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-light text-zinc-500 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span>{PERSONAL_INFO.location}</span>
              <span>{PERSONAL_INFO.phones.join(' &bull; ')}</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-normal">{PERSONAL_INFO.email}</span>
            </div>
          </article>

          {/* ==================== PAGE 2: TECHNICAL ARCHITECTURE & SYSTEMS ENGINEERING ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                SYSTEMS ARCHITECTURE &bull; 01
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Technical Architecture &amp; Distributed Platforms
              </h3>
              <p className="text-xs font-light text-zinc-500 mt-0.5">
                Event-driven workflow engines, enterprise ERP platforms, AI topology blueprints &amp; collaborative workspaces
              </p>
            </div>

            {/* System 1: Flow Ops Nexus */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-3 print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-black/[0.06] dark:border-white/[0.06] pb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Workflow Orchestration Engine</span>
                  <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                    Flow Ops (Optimal Nexus Pro)
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-400">flow-optimal-nexus-pro.base44.app</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                  <img src="/works/technical-architecture/flow-ops/flow-ops-dashboard.png" alt="Dashboard" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                  <img src="/works/technical-architecture/flow-ops/flow-ops-builder.png" alt="Builder" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                  <img src="/works/technical-architecture/flow-ops/flow-ops-integrations.png" alt="Integrations" className="w-full h-full object-cover" />
                </div>
              </div>

              <p className="text-[11.5px] font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="font-normal text-zinc-950 dark:text-white">Scope:</strong> Node-based workflow builder with automated triggers, multi-service webhook connectors, live telemetry execution runs, error recovery policies, and RBAC team collaboration.
              </p>
            </div>

            {/* System 2: BTV BOS */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-3 print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-black/[0.06] dark:border-white/[0.06] pb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Enterprise AI Operating System</span>
                  <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                    BTV BOS - Complete Enterprise ERP
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-400">btv-bos.base44.app</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                  <img src="/works/technical-architecture/ai-business-operating-system/btv-bos-dashboard.png" alt="BOS Dashboard" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                  <img src="/works/technical-architecture/ai-business-operating-system/btv-bos-projects.png" alt="Sprints" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                  <img src="/works/technical-architecture/ai-business-operating-system/btv-bos-devices.png" alt="Devices" className="w-full h-full object-cover" />
                </div>
              </div>

              <p className="text-[11.5px] font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="font-normal text-zinc-950 dark:text-white">Scope:</strong> 7 core operational subsystems including CRM pipeline, sprint milestones, double-entry financial accounting, IoT device fleet monitoring, and autonomous AI Copilot.
              </p>
            </div>

            {/* System 3: AI BOS Blueprints & Atrium Hub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print-avoid-break">
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Distributed AI Topology</span>
                <h4 className="text-xs font-normal text-zinc-950 dark:text-white">AI BOS Architecture Blueprints</h4>
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 h-28">
                  <img src="/works/technical-architecture/ai-bos/AI-BOS-1.png" alt="Blueprint" className="w-full h-full object-contain" />
                </div>
                <p className="text-[11px] font-light text-zinc-500 leading-relaxed">
                  4-part architectural blueprint series detailing multi-agent coordination, vector caching, and zero-downtime microservices.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Collaborative Operations</span>
                <h4 className="text-xs font-normal text-zinc-950 dark:text-white">Atrium Operations &amp; Knowledge Hub</h4>
                <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 h-28">
                  <img src="/works/technical-architecture/atrium/atrium-1.png" alt="Atrium Canvas" className="w-full h-full object-contain" />
                </div>
                <p className="text-[11px] font-light text-zinc-500 leading-relaxed">
                  Real-time workspace canvas with fluid node-based content linking, collaborative permissions, and team presence.
                </p>
              </div>
            </div>
          </article>

          {/* ==================== PAGE 3: PRODUCTION CLIENT WEB PLATFORMS (PART 1) ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-5 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-3">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                LIVE CLIENT WEB SYSTEMS &bull; 02A
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Production Web Platforms &amp; Client Portals
              </h3>
              <p className="text-xs font-light text-zinc-500 mt-0.5">
                Flagship client web platforms, high-tech showcases &amp; specialized booking systems
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  name: 'Hologram Monkey',
                  url: 'hologrammonkey.co.uk',
                  sector: 'Advanced Holographic Tech & 3D Displays (UK)',
                  role: 'Full Stack Engineering, Dark-Mode Web Showcase & Interactive Demo Booking Funnel',
                  tools: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Motion UI'],
                  image: '/assets/aistudio/Hologram_Monkey_540b115b.png',
                },
                {
                  name: 'Sauer Attorneys & Conveyancers',
                  url: 'sauerattorneys.co.za',
                  sector: 'Property Law & Conveyancing Specialists',
                  role: 'Corporate Practice Portal, Conveyancing Walkthrough & Case Consultation Intake',
                  tools: ['WordPress', 'PHP', 'MySQL', 'Legal Intake Forms', 'SEO Architecture'],
                  image: '/assets/aistudio/SAUER_ATTORNEYS_f3ddef7c.png',
                },
                {
                  name: 'Chronos Medical',
                  url: 'chronosmedical.co.za',
                  sector: 'Surgical Systems & Clinical MedTech',
                  role: 'Neurosurgery/Urology/ENT Clinical Equipment Portal & SAHPRA-Aligned Quote Flow',
                  tools: ['WordPress Theme Dev', 'WooCommerce Catalog', 'PHP', 'Speed Optimization'],
                  image: '/assets/aistudio/Chronos_Medical_bc05507e.png',
                },
                {
                  name: 'Lulu J Boutique',
                  url: 'lulujboutique.co.za',
                  sector: 'Curated Italian & European Fashion',
                  role: 'Luxury Fashion Web Storefront, Visual Merchandising & WhatsApp VIP Styling Concierge',
                  tools: ['WooCommerce', 'WordPress', 'Payment Gateway Integration', 'Mobile UI'],
                  image: '/assets/aistudio/lulu-j-boutique_c946a8d5.png',
                },
              ].map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] flex items-center gap-4 print-avoid-break"
                >
                  <div className="w-36 h-20 rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08] shrink-0 bg-zinc-950">
                    <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="uppercase">{proj.sector}</span>
                      <span className="text-zinc-900 dark:text-white font-medium">{proj.url}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white">
                      {proj.name}
                    </h4>
                    <p className="text-[11.5px] font-light text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {proj.role}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {proj.tools.map((t) => (
                        <span key={t} className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* ==================== PAGE 4: PRODUCTION CLIENT WEB PLATFORMS (PART 2) ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-5 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-3">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                LIVE CLIENT WEB SYSTEMS &bull; 02B
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Enterprise Portals, Publishing &amp; National Brands
              </h3>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  name: 'SilvaShaw Technologies',
                  url: 'silvashaw.co.za',
                  sector: 'Enterprise Telecom & Managed IT Services',
                  role: 'VoIP, Cloud Hosted Services, Free IT Assessment Lead Engine & Reseller Portal',
                  tools: ['WordPress', 'Lead Funnels', 'Technical SEO', 'Analytics'],
                  image: '/assets/aistudio/SilvaShaw_e7977dd2.png',
                },
                {
                  name: 'AgriAbout Magazine',
                  url: 'agriabout.com',
                  sector: 'Sustainable Agriculture Digital Publishing',
                  role: 'Monthly Digital Edition Reader, Editorial CMS, Media Kit & Newsletter Integration',
                  tools: ['WordPress CMS', 'Digital Flipbook', 'Mailchimp API', 'AdSense'],
                  image: '/assets/aistudio/agriabout_18aedaac.png',
                },
                {
                  name: 'Spina Vita Chiropractic',
                  url: 'spinavita.co.za',
                  sector: 'Healthcare & Clinical Practice (Dual Clinics)',
                  role: 'Real-Time Patient Appointment Booking Engine, Medical Aid Advisory & Condition Guides',
                  tools: ['WordPress', 'Booking Calendar Engine', 'Local SEO', 'WhatsApp API'],
                  image: '/assets/aistudio/spina-vita_d82bfd1c.png',
                },
                {
                  name: 'Corporate AV Integration',
                  url: 'corporateav.co.za',
                  sector: 'Commercial Boardroom & Audiovisual Engineering',
                  role: 'B2B Solutions Architecture, Unified Communications Explorer & Quote Calculator',
                  tools: ['Custom Web App', 'Interactive Quote Builder', 'B2B UX Design'],
                  image: '/assets/aistudio/corporate-av_eb231fd0.png',
                },
                {
                  name: 'Skyworth South Africa Official Portal',
                  url: 'skyworth.co.za',
                  sector: 'Flagship Consumer Electronics & Android TV',
                  role: 'Full Stack Engineering, Custom Theme Architecture & Server Administration',
                  tools: ['PHP', 'MySQL', 'Linux Server', 'Theme Engineering', 'CDN'],
                  image: '/works/graphic design/skw1.jpg',
                },
                {
                  name: 'Sinotec Consumer Electronics',
                  url: 'sinotec.co.za',
                  sector: 'National Consumer Electronics & Warranty System',
                  role: 'Catalog Management, Performance Optimization & Retailer Locator',
                  tools: ['WordPress', 'WooCommerce', 'Speed Tuning', 'Retailer Maps'],
                  image: '/works/graphic design/sinotec1.jpg',
                },
              ].map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] flex items-center gap-4 print-avoid-break"
                >
                  <div className="w-32 h-18 rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08] shrink-0 bg-zinc-950">
                    <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="uppercase">{proj.sector}</span>
                      <span className="text-zinc-900 dark:text-white font-medium">{proj.url}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white">
                      {proj.name}
                    </h4>
                    <p className="text-[11px] font-light text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {proj.role}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {proj.tools.map((t) => (
                        <span key={t} className="text-[9.5px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* ==================== PAGE 5: BRAND IDENTITY & MEDTECH DESIGN ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                MEDTECH BRANDING &bull; 03
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Chronos Medical &bull; Surgical Innovation Campaign
              </h3>
              <p className="text-xs font-light text-zinc-500 mt-0.5">
                Titanium surgical system branding, DuraFrame feature series &amp; Instagram asset suite
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 print-avoid-break">
              <div className="space-y-1.5">
                <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 flex items-center justify-center h-48">
                  <img src="/works/graphic design/Chronos_IG_Brand_1080.png" alt="Brand Identity" className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-[11px] font-mono text-zinc-400 text-center">01. Master Brand Identity (1080x1080)</p>
              </div>

              <div className="space-y-1.5">
                <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 flex items-center justify-center h-48">
                  <img src="/works/graphic design/Chronos_IG_DuraFrame_1080.png" alt="DuraFrame" className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-[11px] font-mono text-zinc-400 text-center">02. DuraFrame Titanium System (1080x1080)</p>
              </div>

              <div className="space-y-1.5">
                <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 flex items-center justify-center h-48">
                  <img src="/works/graphic design/Chronos_IG_Story_1080x1920.png" alt="Story" className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-[11px] font-mono text-zinc-400 text-center">03. Interactive Story (1080x1920)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong className="font-normal text-zinc-950 dark:text-white">Scope &amp; Impact:</strong> Crafted clinical marketing visuals communicating ergonomic titanium surgical systems. Integrated 3D instrument renderings, strict typography hierarchy, and interactive engagement slides for healthcare procurement leads.
            </div>
          </article>

          {/* ==================== PAGE 6: MOBILE CAMPAIGNS & 11 COMMERCIAL E-BOOKS ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                CAMPAIGNS &amp; PUBLISHING &bull; 04
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Wits University Mobile Stories &amp; Commercial Publications
              </h3>
            </div>

            {/* Wits University Stories */}
            <div className="space-y-2 print-avoid-break">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Wits University Open Day 2025 - 5-Part Story Series</span>
              <div className="grid grid-cols-5 gap-2">
                {[
                  '/works/graphic design/wits-story-01.png',
                  '/works/graphic design/wits-story-03.png',
                  '/works/graphic design/wits-story-04.png',
                  '/works/graphic design/wits-story-05.png',
                  '/works/graphic design/wits-story-06.png',
                ].map((src, i) => (
                  <div key={i} className="rounded-md overflow-hidden bg-[#001e3d] aspect-[9/16]">
                    <img src={src} alt="Wits Story" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* 11 Commercial E-Books */}
            <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] print-avoid-break">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">11 Commercial Publication Covers</span>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {ebookCovers.slice(0, 6).map((book, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="rounded-md overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[3/4]">
                      <img src={book.path} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9.5px] font-mono text-zinc-400 block truncate">{book.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* ==================== PAGE 7: 3D EXHIBITIONS & NATIONAL EVENTS ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                EXHIBITION ARCHITECTURE &bull; 05
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                3D Exhibition Stands, Pylon Signage &amp; Events
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print-avoid-break">
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
                <div className="grid grid-cols-3 gap-0">
                  {[
                    '/works/graphic design/scomic con-sk1.jpg',
                    '/works/graphic design/scomic con-sk2.jpg',
                    '/works/graphic design/scomic con-sk3.jpg',
                  ].map((src) => (
                    <img key={src} src={src} alt="Comic Con" className="w-full h-24 object-cover" />
                  ))}
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Kyalami Convention Centre &bull; 50,000+ Visitors</span>
                  <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white">Skyworth @ Comic Con Africa</h4>
                  <p className="text-[11px] font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Spearheaded 3D booth structure modeling in AutoCAD, architectural pylon signage, high-density gaming arena displays, and live social event broadcasting.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
                <div className="w-full">
                  <img src="/works/graphic design/decorex-sk4.jpg" alt="Decorex" className="w-full h-24 object-cover" />
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Gallagher Convention Centre &bull; Luxury Interior Expo</span>
                  <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white">Skyworth @ Decorex SA Expo</h4>
                  <p className="text-[11px] font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Designed illuminated curved brand arches, 3D exhibition booth layouts, large-format graphics, and the high-conversion &ldquo;Win a 49-inch TV&rdquo; visitor campaign.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* ==================== PAGE 8: VERIFIED HISTORY & CREDENTIALS ==================== */}
          <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-14 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white">
            <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-400">
                VERIFIED CREDENTIALS &bull; 06
              </span>
              <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                Career History, Credentials &amp; Contact
              </h3>
            </div>

            <div className="space-y-3">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-black/[0.04] dark:border-white/[0.04] flex flex-col sm:flex-row justify-between gap-1 print-avoid-break"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white">
                      {exp.company} &mdash; <span className="font-light text-zinc-500">{exp.role}</span>
                    </h4>
                    <p className="text-[11px] font-light text-zinc-500">{exp.focus}</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-400 shrink-0">{exp.period}</span>
                </div>
              ))}
            </div>

            {/* Verified Certifications */}
            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500">
              <div>
                <strong className="font-normal text-zinc-950 dark:text-white">Verified Certifications:</strong> Semrush Academy SEO/SEM Specialist &bull; Google Digital Training &bull; Senior High Certificate
              </div>
              <div className="font-mono text-[11px] text-zinc-400">
                OFFICIAL PORTFOLIO &bull; BRENTON T. KANDHAI
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
