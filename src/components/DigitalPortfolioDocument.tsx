import React from 'react';
import {
  Printer,
  X,
  ExternalLink,
  Check,
  Briefcase,
  FileText,
  Layers,
  Sparkles,
  ArrowUpRight,
  Eye,
  Globe,
  Palette,
  Bot,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { PROJECTS, EXPERIENCES, EDUCATION_AND_CERTS } from '../data/portfolioData';

interface DigitalPortfolioDocumentProps {
  onClose: () => void;
}

export const DigitalPortfolioDocument: React.FC<DigitalPortfolioDocumentProps> = ({
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const ebookCovers = [
    { title: 'Practical AI Tools For Everyday Work', path: '/works/ebooks/Practical AI Tools - For Everyday Work - Cover.jpg', tag: 'AI & Automation' },
    { title: 'AI & Machine Learning Practical Course', path: '/works/ebooks/AI Machine - Learning Practical Course - Commercial Edition - Cover.jpg', tag: 'Data & ML' },
    { title: 'Cybersecurity Mini-Course Guide', path: '/works/ebooks/Cybersecurity - Mini-Course - Cover.jpg', tag: 'Security' },
    { title: 'Digital Marketing Playbook Insights 2026', path: '/works/ebooks/Digital Marketing - Playbook Insights - Cover.jpg', tag: 'Marketing & SEO' },
    { title: 'Career Self Help & Leadership', path: '/works/ebooks/Career Self Help - eBook - Cover.jpg', tag: 'Personal Growth' },
    { title: 'Budgeting for Beginners Financial Guide', path: '/works/ebooks/Budgeting for Beginners - Guide - Cover.jpg', tag: 'Finance' },
    { title: 'The Daily Workout Guide', path: '/works/ebooks/Daily Workout Guide - Cover.jpg', tag: 'Fitness' },
    { title: 'Healthy Smoothies & Health Drinks Guide', path: '/works/ebooks/Healthy Smoothies and Health Drinks - Guide - Cover.jpg', tag: 'Wellness' },
    { title: 'Botanical Wall Art Editorial Design', path: '/works/ebooks/Botanical Wall Art - Cover.jpg', tag: 'Visual Art' },
    { title: 'Backyard Vegetable Garden Guide', path: '/works/ebooks/Backyard Vegetable Garden - Premium eBook - Cover.jpg', tag: 'Lifestyle' },
    { title: 'The Golden Round Golf Guide for Seniors', path: '/works/ebooks/The Golden Round Golf Guide for Seniors - Cover.jpg', tag: 'Sports & Leisure' },
  ];

  return (
    <div className="print-doc fixed inset-0 z-50 flex flex-col bg-zinc-950/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="print-hide shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white dark:bg-[#0d0d11] border-b border-black/[0.08] dark:border-white/[0.08] shadow-md z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black font-semibold text-xs flex items-center justify-center tracking-wider">
            BTK
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-normal text-zinc-950 dark:text-white leading-tight">
              Brenton T. Kandhai &bull; Comprehensive Portfolio
            </h2>
            <p className="text-[10px] text-zinc-400 font-light">
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
          {/* Modern Site-Designed Portfolio Document */}
          <div className="max-w-4xl mx-auto space-y-12 print:space-y-0 text-zinc-900 dark:text-zinc-100">
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
                      Full Stack Developer &bull; 15+ Years Experience
                    </p>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-zinc-400">
                  <div>OFFICIAL PORTFOLIO</div>
                  <div>2026 EDITION</div>
                </div>
              </div>

              {/* Cover Hero Statement */}
              <div className="space-y-4 py-6">
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                  <span>EXECUTIVE OVERVIEW</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
                  Engineering High-Performance Web Applications &amp; Scalable Digital Platforms.
                </h2>
                <p className="text-sm font-light text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl pt-2">
                  15+ years of verified expertise architecting enterprise web systems, custom WordPress and Shopify e-commerce ecosystems, and high-conversion UI/UX workflows. Supported by strong secondary specializations in Google Ads, technical SEO audits, and 3D architectural brand activations.
                </p>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-b border-black/[0.06] dark:border-white/[0.06] py-6">
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">Experience</span>
                  <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">15+ Yrs</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">Web Platforms</span>
                  <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">35+ Live</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">Site Health</span>
                  <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">90%+</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">National Brands</span>
                  <span className="text-2xl sm:text-3xl font-light text-zinc-950 dark:text-white">Skyworth, Wits</span>
                </div>
              </div>

              {/* Direct Contact Details */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-light text-zinc-500 pt-2">
                <span>Johannesburg, South Africa</span>
                <span>+27 73 726 1025 &bull; +27 62 659 7658</span>
                <span className="text-zinc-900 dark:text-zinc-200">brenton.travino@gmail.com</span>
              </div>
            </article>

            {/* ==================== PAGE 2: CORE DISCIPLINES & ARCHITECTURE ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-10">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  DISCIPLINES &bull; 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Technical Architecture &amp; Specializations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-zinc-950 dark:text-white" />
                    <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                      Full Stack Web &amp; E-Commerce (Primary)
                    </h4>
                  </div>
                  <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Custom web application development, React, Next.js, modern JavaScript/TypeScript, PHP/MySQL, custom WordPress &amp; WooCommerce themes, Shopify Liquid, payment gateway integrations, and REST API architectures.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-zinc-950 dark:text-white" />
                    <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                      CRM, AI Tools &amp; Automation
                    </h4>
                  </div>
                  <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    HubSpot inbound CRM workflows, Mailchimp automation journeys, Zendesk &amp; TeamDesk tier-3 technical ticketing systems, and generative AI prompt engineering (Copilot Studio, ChatGPT, Google Gemini).
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-zinc-950 dark:text-white" />
                    <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                      Performance Marketing &amp; SEO (Secondary)
                    </h4>
                  </div>
                  <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Google Ads PPC management (Search, Display, Performance Max), Google Looker Studio client reporting, Meta Ads Manager, and Semrush-certified technical SEO audits lifting site health scores to 90%+.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-zinc-950 dark:text-white" />
                    <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                      UI/UX, 3D &amp; Digital Publishing (Secondary)
                    </h4>
                  </div>
                  <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Figma &amp; Adobe Creative Cloud mastery (Photoshop, Illustrator, InDesign), commercial e-book cover art, 3D exhibition booth modeling (Comic Con, Decorex SA), and custom dye-sublimation athletic apparel manufacturing.
                  </p>
                </div>
              </div>
            </article>

            {/* ==================== PAGE 2B: TECHNICAL ARCHITECTURE & SYSTEMS ENGINEERING ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-10">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  SYSTEMS ENGINEERING &bull; 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Technical Architecture &amp; Enterprise Platforms
                </h3>
                <p className="text-xs font-light text-zinc-500 mt-1">
                  High-scale system design: event-driven workflow engines, AI ERP platforms, distributed AI topologies &amp; collaborative workspaces
                </p>
              </div>

              {/* System 1: Flow Ops Nexus */}
              <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Workflow Orchestration Engine</span>
                    <h4 className="text-base font-normal text-zinc-950 dark:text-white">
                      Flow Ops (Optimal Nexus Pro)
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">flow-optimal-nexus-pro.base44.app</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                    <img
                      src="/works/technical-architecture/flow-ops/flow-ops-dashboard.png"
                      alt="Flow Ops Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                    <img
                      src="/works/technical-architecture/flow-ops/flow-ops-builder.png"
                      alt="Workflow Builder Canvas"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                    <img
                      src="/works/technical-architecture/flow-ops/flow-ops-integrations.png"
                      alt="Multi-Service Integrations"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong className="font-normal text-zinc-950 dark:text-white">Architectural Scope:</strong> Visual node-based workflow builder with triggers and conditional branching, multi-service webhook connectors, live telemetry execution runs, error recovery policies, and RBAC team collaboration.
                </p>
              </div>

              {/* System 2: BTV BOS */}
              <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Enterprise AI Operating System</span>
                    <h4 className="text-base font-normal text-zinc-950 dark:text-white">
                      BTV BOS - Complete Enterprise ERP
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">btv-bos.base44.app</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                    <img
                      src="/works/technical-architecture/ai-business-operating-system/btv-bos-dashboard.png"
                      alt="BTV BOS Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                    <img
                      src="/works/technical-architecture/ai-business-operating-system/btv-bos-projects.png"
                      alt="Project Timelines"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 aspect-[16/10]">
                    <img
                      src="/works/technical-architecture/ai-business-operating-system/btv-bos-devices.png"
                      alt="IoT Device Fleet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong className="font-normal text-zinc-950 dark:text-white">Architectural Scope:</strong> Consolidating 7 core operational subsystems including CRM deal pipeline, project sprint milestones, Kanban task operations, double-entry financial accounting, IoT hardware device monitoring, and an autonomous AI Copilot.
                </p>
              </div>

              {/* System 3: AI BOS Blueprints & Atrium Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Distributed AI Topology</span>
                  <h4 className="text-sm font-normal text-zinc-950 dark:text-white">AI BOS Architecture Blueprints</h4>
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 h-36">
                    <img
                      src="/works/technical-architecture/ai-bos/AI-BOS-1.png"
                      alt="AI BOS Architecture Blueprint"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-light text-zinc-500 leading-relaxed">
                    4-part architectural blueprint series detailing multi-agent coordination, vector caching, and zero-downtime microservices clusters.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Collaborative Operations</span>
                  <h4 className="text-sm font-normal text-zinc-950 dark:text-white">Atrium Operations &amp; Knowledge Hub</h4>
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 h-36">
                    <img
                      src="/works/technical-architecture/atrium/atrium-1.png"
                      alt="Atrium Operations Canvas"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-light text-zinc-500 leading-relaxed">
                    Real-time workspace canvas with fluid node-based content linking, collaborative permissions, and team active presence.
                  </p>
                </div>
              </div>
            </article>

            {/* ==================== PAGE 3: BRAND IDENTITY & MEDTECH DESIGN ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  DESIGN &amp; CAMPAIGNS &bull; 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Chronos Medical - Surgical Innovation Campaign
                </h3>
                <p className="text-xs font-light text-zinc-500 mt-1">
                  Surgical implant technology branding, DuraFrame system social series &amp; Instagram asset suite
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 flex items-center justify-center h-64">
                    <img
                      src="/works/graphic design/Chronos_IG_Brand_1080.png"
                      alt="Chronos Medical Brand Identity"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400 text-center">01. Master Brand Identity (1080x1080)</p>
                </div>

                <div className="space-y-2">
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 flex items-center justify-center h-64">
                    <img
                      src="/works/graphic design/Chronos_IG_DuraFrame_1080.png"
                      alt="Chronos DuraFrame System"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400 text-center">02. DuraFrame Titanium System (1080x1080)</p>
                </div>

                <div className="space-y-2">
                  <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 flex items-center justify-center h-64">
                    <img
                      src="/works/graphic design/Chronos_IG_Story_1080x1920.png"
                      alt="Chronos Instagram Story"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400 text-center">03. Interactive Story (1080x1920)</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="font-normal text-zinc-950 dark:text-white">Design Scope:</strong> Crafted high-precision clinical marketing visuals communicating ergonomic titanium surgical systems. Integrated 3D instrument renderings, strict typography hierarchy, and interactive engagement slides for healthcare procurement leads.
              </div>
            </article>

            {/* ==================== PAGE 4: WITS UNIVERSITY OPEN DAY 2025 SHOWCASE ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  MOBILE STORIES &bull; 03
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Wits University Open Day 2025 - Research Showcase
                </h3>
                <p className="text-xs font-light text-zinc-500 mt-1">
                  Mobile story series &amp; corporate partner acquisition campaign (&ldquo;Where a century of discovery meets the next century of partners&rdquo;)
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { title: 'Intro & Welcome', file: '/works/graphic design/wits-story-01.png' },
                  { title: 'Four Ways to Partner', file: '/works/graphic design/wits-story-03.png' },
                  { title: 'Century of Firsts', file: '/works/graphic design/wits-story-04.png' },
                  { title: 'Innovation Centre', file: '/works/graphic design/wits-story-05.png' },
                  { title: 'Open Day Call to Action', file: '/works/graphic design/wits-story-06.png' },
                ].map((story, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#001e3d] flex items-center justify-center aspect-[9/16]">
                      <img
                        src={story.file}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[10px] font-mono text-zinc-400 text-center truncate">{story.title}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="font-normal text-zinc-950 dark:text-white">Institutional Impact:</strong> Designed official mobile storytelling assets highlighting Wits milestones (First nuclear accelerator, first computer, first plastic cornea graft, first African university with quantum computer access) and structured the corporate collaboration funnel for the Wits Innovation Centre.
              </div>
            </article>

            {/* ==================== PAGE 5: DIGITAL PUBLISHING & E-BOOK COLLECTION ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  DIGITAL PUBLISHING &bull; 04
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Commercial E-Book &amp; Editorial Cover Collection
                </h3>
                <p className="text-xs font-light text-zinc-500 mt-1">
                  11 commercially produced publication covers across Artificial Intelligence, Cybersecurity, Marketing &amp; Lifestyle
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {ebookCovers.map((book, idx) => (
                  <div key={idx} className="group space-y-2">
                    <div className="rounded-lg overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950 shadow-md aspect-[3/4]">
                      <img
                        src={book.path}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono text-zinc-400 block">{book.tag}</span>
                      <h4 className="text-xs font-normal text-zinc-950 dark:text-white leading-tight line-clamp-1">
                        {book.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* ==================== PAGE 6: FLAGSHIP WEB PLATFORMS & E-COMMERCE ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  WEB PLATFORMS &bull; 05
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Selected Full Stack Web Platforms
                </h3>
                <p className="text-xs font-light text-zinc-500 mt-1">
                  Enterprise corporate portals, high-traffic electronics catalogs &amp; global scientific web systems
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: 'Skyworth South Africa Official Portal',
                    url: 'skyworth.co.za',
                    sector: 'Flagship Consumer Electronics & Android TV',
                    role: 'Full Stack Engineering, Theme Development & Server Administration',
                    image: '/works/graphic design/skw1.jpg',
                  },
                  {
                    name: 'Sinotec Consumer Electronics',
                    url: 'sinotec.co.za',
                    sector: 'National Consumer Electronics & Warranty System',
                    role: 'Catalog Management, Performance Optimization & Retailer Locator',
                    image: '/works/graphic design/sinotec1.jpg',
                  },
                ].map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center gap-6"
                  >
                    <div className="w-full sm:w-48 h-28 rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08] shrink-0 bg-zinc-900">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5 w-full">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="uppercase">{proj.sector}</span>
                        <span className="text-zinc-900 dark:text-white font-normal">{proj.url}</span>
                      </div>
                      <h4 className="text-base font-normal text-zinc-950 dark:text-white">
                        {proj.name}
                      </h4>
                      <p className="text-xs font-light text-zinc-500 dark:text-zinc-400">
                        {proj.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* ==================== PAGE 7: 3D EXHIBITION, SIGNAGE & EVENTS ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  EXHIBITIONS &bull; 06
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  3D Exhibition Stands, Signage &amp; Events
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
                  <div className="grid grid-cols-3 gap-0">
                    {[
                      '/works/graphic design/scomic con-sk1.jpg',
                      '/works/graphic design/scomic con-sk2.jpg',
                      '/works/graphic design/scomic con-sk3.jpg',
                    ].map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt="Skyworth @ Comic Con Africa booth build"
                        className="w-full h-28 object-cover"
                      />
                    ))}
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Kyalami Convention Centre &bull; 50,000+ Visitors</span>
                    <h4 className="text-base font-normal text-zinc-950 dark:text-white">Skyworth @ Comic Con Africa</h4>
                    <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Spearheaded 3D booth structure modeling in AutoCAD, architectural pylon signage, high-density digital gaming displays, and real-time social event broadcasting.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
                  <div className="w-full">
                    <img
                      src="/works/graphic design/decorex-sk4.jpg"
                      alt="Skyworth @ Decorex SA Expo booth design"
                      className="w-full h-28 object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Gallagher Convention Centre &bull; Luxury Interior Expo</span>
                    <h4 className="text-base font-normal text-zinc-950 dark:text-white">Skyworth @ Decorex SA Expo</h4>
                    <p className="text-xs font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Designed illuminated curved brand arches, 3D exhibition booth layouts, large-format graphics, and the high-conversion &ldquo;Win a 49-inch TV&rdquo; visitor campaign.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* ==================== PAGE 8: PERFORMANCE MARKETING & VERIFIED HISTORY ==================== */}
            <article className="print-page bg-white dark:bg-[#101014] p-8 sm:p-16 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-xl space-y-8">
              <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
                  VERIFIED HISTORY &bull; 07
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white mt-1">
                  Professional Experience &amp; Official Credentials
                </h3>
              </div>

              <div className="space-y-4">
                {EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-black/[0.04] dark:border-white/[0.04] flex flex-col sm:flex-row justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-sm font-normal text-zinc-950 dark:text-white">
                        {exp.company} &mdash; <span className="font-light text-zinc-500">{exp.role}</span>
                      </h4>
                      <p className="text-xs font-light text-zinc-500">{exp.focus}</p>
                    </div>
                    <span className="font-mono text-xs text-zinc-400 shrink-0">{exp.period}</span>
                  </div>
                ))}
              </div>

              {/* Certifications and Closing */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500">
                <div>
                  <strong className="font-normal text-zinc-950 dark:text-white">Verified Certifications:</strong> Semrush Academy SEO/SEM Specialist &bull; Google Digital Training &bull; Senior High Certificate
                </div>
                <div className="font-mono text-[10px] text-zinc-400">
                  DOCUMENT CERTIFIED &bull; BRENTON T. KANDHAI
                </div>
              </div>
            </article>
          </div>
      </div>
    </div>
  );
};
