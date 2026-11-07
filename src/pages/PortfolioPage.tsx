import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { WEBSITE_SHOWCASES } from '../data/websiteShowcases';
import { WebsiteShowcaseCard } from '../components/WebsiteShowcaseCard';
import { TechnicalArchitectureShowcase } from '../components/TechnicalArchitectureShowcase';
import {
  Search,
  ArrowRight,
  Briefcase,
  Download,
  ArrowUpRight,
} from 'lucide-react';

interface PortfolioPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onSelectProject, onOpenPdf }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { key: 'all', label: 'All Works', count: PROJECTS.length },
    {
      key: 'architecture',
      label: 'Technical Architecture',
      count: PROJECTS.filter((p) => p.category === 'architecture').length,
    },
    {
      key: 'web',
      label: 'Full Stack & Web Apps',
      count: PROJECTS.filter((p) => p.category === 'web').length,
    },
    {
      key: 'creative',
      label: 'Design & Publishing (Secondary)',
      count: PROJECTS.filter((p) => p.category === 'creative').length,
    },
    {
      key: 'social',
      label: 'Campaigns & Social (Secondary)',
      count: PROJECTS.filter((p) => p.category === 'social').length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      return (
        matchesCategory &&
        (p.title.toLowerCase().includes(query) ||
          p.client.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tools.some((t) => t.toLowerCase().includes(query)) ||
          (p.displayUrl && p.displayUrl.toLowerCase().includes(query)))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 max-w-7xl mx-auto">
      {/* Header with Kinetic Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-10"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
          <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-500 dark:text-zinc-400">
            SELECTED WORKS &bull; CASE ARCHIVE
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-zinc-950 dark:text-white">
              Selected Projects
            </h1>
            <p className="mt-3 text-xs sm:text-sm font-light text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              Curated portfolio of full stack web applications, high-traffic consumer brand portals, e-commerce architectures, and secondary marketing campaigns &amp; 3D designs.
            </p>
          </div>

          {/* PDF Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPdf('portfolio')}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 text-xs tracking-wider uppercase font-light text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
              <span>View Portfolio</span>
            </button>

            <button
              onClick={() => onOpenPdf('portfolio')}
              className="p-2 rounded-md border border-black/15 dark:border-white/15 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              title="Portfolio Document"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Featured Primary Discipline: Technical Architecture & Systems Engineering */}
      <TechnicalArchitectureShowcase onSelectProject={onSelectProject} />

      <section aria-labelledby="website-showcases-heading" className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
            <span>Website Design &bull; Selected Screens</span>
          </div>
          <h2
            id="website-showcases-heading"
            className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white"
          >
            Website showcases
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
            A closer look at five website concepts. Each preview slides through its pages automatically — hover to pause, or use the arrows and page tabs to browse.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WEBSITE_SHOWCASES.map((showcase) => (
            <WebsiteShowcaseCard key={showcase.name} showcase={showcase} />
          ))}
        </div>
      </section>

      {/* Brand, Graphic Design & Digital Publishing Showcase (User Assets) */}
      <section aria-labelledby="design-showcases-heading" className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
            <span>Design, Campaigns &amp; Publishing (Secondary)</span>
          </div>
          <h2
            id="design-showcases-heading"
            className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white"
          >
            Brand identity, campaigns &amp; digital covers
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
            High-impact visual communication suites: medical brand technology, university mobile innovation stories, and 11 commercial publication covers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Chronos Medical */}
          {(() => {
            const chronos = PROJECTS.find((p) => p.id === 'chronos-medical');
            if (!chronos) return null;
            return (
              <div
                onClick={() => onSelectProject(chronos)}
                className="group cursor-pointer rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] hover:border-black/30 dark:hover:border-white/30 transition-all p-5 space-y-4 soft-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-zinc-950 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center">
                    <img
                      src="/works/graphic design/Chronos_IG_Brand_1080.png"
                      alt="Chronos Medical Surgical Innovation"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[12.4px] font-mono text-white">
                      3 Master Assets
                    </div>
                  </div>
                  <div>
                    <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Surgical MedTech &bull; Branding</span>
                    <h3 className="text-base font-normal text-zinc-950 dark:text-white group-hover:underline">
                      Chronos Medical &bull; DuraFrame Campaign
                    </h3>
                    <p className="text-xs font-light text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      Precision titanium implant branding, DuraFrame feature highlights, and interactive Instagram Story sequence.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-light text-zinc-400 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                  <span>Figma &bull; Illustrator</span>
                  <span className="text-zinc-950 dark:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Asset Suite <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Card 2: Wits University Stories */}
          {(() => {
            const wits = PROJECTS.find((p) => p.id === 'wits-research-showcase');
            if (!wits) return null;
            return (
              <div
                onClick={() => onSelectProject(wits)}
                className="group cursor-pointer rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] hover:border-black/30 dark:hover:border-white/30 transition-all p-5 space-y-4 soft-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-[#001e3d] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center">
                    <img
                      src="/works/graphic design/wits-story-01.png"
                      alt="Wits Research Showcase Open Day 2025"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[12.4px] font-mono text-white">
                      5-Part Story Series
                    </div>
                  </div>
                  <div>
                    <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Higher Ed &bull; Mobile Campaign</span>
                    <h3 className="text-base font-normal text-zinc-950 dark:text-white group-hover:underline">
                      Wits University &bull; Open Day 2025
                    </h3>
                    <p className="text-xs font-light text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      Corporate partner acquisition stories, &ldquo;Century of Firsts&rdquo; milestone infographics, and Innovation Centre CTAs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-light text-zinc-400 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                  <span>Photoshop &bull; Mobile UI</span>
                  <span className="text-zinc-950 dark:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Story Cards <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Card 3: 11 Commercial E-Books */}
          {(() => {
            const ebooks = PROJECTS.find((p) => p.id === 'ebooks-digital-publishing');
            if (!ebooks) return null;
            return (
              <div
                onClick={() => onSelectProject(ebooks)}
                className="group cursor-pointer rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] hover:border-black/30 dark:hover:border-white/30 transition-all p-5 space-y-4 soft-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-zinc-950 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center p-2">
                    <div className="grid grid-cols-3 gap-1.5 w-full h-full">
                      <img
                        src="/works/ebooks/Practical AI Tools - For Everyday Work - Cover.jpg"
                        alt="AI Tools"
                        className="w-full h-full object-cover rounded"
                      />
                      <img
                        src="/works/ebooks/Digital Marketing - Playbook Insights - Cover.jpg"
                        alt="Marketing Playbook"
                        className="w-full h-full object-cover rounded"
                      />
                      <img
                        src="/works/ebooks/Cybersecurity - Mini-Course - Cover.jpg"
                        alt="Cybersecurity"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[12.4px] font-mono text-white">
                      11 Book Covers
                    </div>
                  </div>
                  <div>
                    <span className="text-[12.4px] uppercase font-mono text-zinc-400 block">Editorial &bull; Digital Publishing</span>
                    <h3 className="text-base font-normal text-zinc-950 dark:text-white group-hover:underline">
                      Commercial E-Book &amp; Guide Collection
                    </h3>
                    <p className="text-xs font-light text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      11 commercial cover designs spanning AI Tools, Cybersecurity, Marketing Playbooks, Fitness, and Lifestyle.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-light text-zinc-400 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                  <span>InDesign &bull; Cover Art</span>
                  <span className="text-zinc-950 dark:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View All 11 Covers <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-3.5 py-1.5 rounded-md text-xs tracking-wider uppercase transition-all cursor-pointer font-light ${
                selectedCategory === c.key
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-normal'
                  : 'border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {c.label} ({c.count})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archive..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light"
          />
        </div>
      </motion.div>

      {/* Portfolio Grid with Staggered Entrance Animations */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center space-y-3 rounded-xl border border-dashed border-black/10 dark:border-white/10">
          <p className="text-zinc-400 text-xs tracking-wider uppercase">
            No projects found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-light text-zinc-950 dark:text-white underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 6) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProject(project)}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] hover:border-black/30 dark:hover:border-white/30 transition-all cursor-pointer group soft-shadow"
              >
                <div className="space-y-4">
                  {/* Thumbnail Banner (if present) */}
                  {project.image && (
                    <div className="h-40 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900/80 border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[12.4px] font-mono text-zinc-400">
                    <span className="uppercase">{project.categoryLabel}</span>
                    {project.displayUrl && (
                      <span className="hover:text-black dark:hover:text-white flex items-center gap-1">
                        {project.displayUrl}
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-normal text-zinc-950 dark:text-white group-hover:underline underline-offset-4 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs font-light text-zinc-400 mt-1">{project.client}</p>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.04] dark:border-white/[0.04] text-[12.4px]"
                        >
                          <span className="text-zinc-400 block uppercase font-mono">{m.label}</span>
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tools.slice(0, 2).map((t, i) => (
                      <span
                        key={i}
                        className="text-[12.4px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-light"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-light tracking-wider uppercase text-zinc-950 dark:text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
