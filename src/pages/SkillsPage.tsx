import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  Layers,
  BarChart3,
  Globe,
  Palette,
  Box,
  Cpu,
  Bot,
  Check,
  Search,
} from 'lucide-react';
import { TechEcosystemBanner } from '../components/TechEcosystemBanner';

interface SkillsPageProps {
  isDark: boolean;
}

export const SkillsPage: React.FC<SkillsPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
      case 'Box':
        return <Box className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
      case 'Bot':
        return <Bot className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
      default:
        return <Layers className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.title !== selectedCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.skills.some((s) => s.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-10"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
          <span className="text-[12.4px] tracking-[0.25em] uppercase font-light text-zinc-500 dark:text-zinc-400">
            TECHNICAL CAPABILITIES &bull; TOOLS MATRIX
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-zinc-950 dark:text-white">
              Software &amp; Expertise
            </h1>
            <p className="mt-3 text-xs sm:text-sm font-light text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              Curated overview of 15+ years of experience across full stack web engineering, modern JavaScript frameworks, CMS architectures, APIs, and secondary expertise in performance marketing suites and UI/UX design.
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tool, language or platform..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light"
            />
          </div>
        </div>
      </motion.div>

      {/* Category Pills Filter */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-2"
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-1.5 rounded-md text-xs tracking-wider uppercase transition-all cursor-pointer font-light ${
            selectedCategory === 'all'
              ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-normal'
              : 'border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white'
          }`}
        >
          All Disciplines
        </button>

        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.title}
            onClick={() => setSelectedCategory(cat.title)}
            className={`px-4 py-1.5 rounded-md text-xs tracking-wider uppercase transition-all cursor-pointer font-light ${
              selectedCategory === cat.title
                ? 'bg-zinc-950 dark:bg-white text-white dark:text-black font-normal'
                : 'border border-black/10 dark:border-white/10 text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </motion.div>

      {/* Categories Grid with Staggered Cascades */}
      <div className="space-y-16">
        <AnimatePresence>
          {filteredCategories.map((cat, idx) => (
            <motion.div
              layout
              key={cat.title}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-8 sm:p-12 rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.05] dark:border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h2 className="text-lg font-normal text-zinc-950 dark:text-white tracking-wide">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-zinc-400 font-light">{cat.description}</p>
                  </div>
                </div>

                <span className="text-[12.4px] font-mono uppercase tracking-widest text-zinc-400">
                  {cat.skills.length} Platforms
                </span>
              </div>

              {/* Individual Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.skills.map((skill, sIdx) => (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    key={sIdx}
                    className="p-4 rounded-md bg-zinc-50/60 dark:bg-zinc-900/40 border border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between gap-3 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="text-xs font-light text-zinc-800 dark:text-zinc-200">
                        {skill.name}
                      </span>
                    </div>

                    {skill.level && (
                      <span className="text-[12.4px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 shrink-0 font-light">
                        {skill.level}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full-width Icon Section on Black Background */}
      <TechEcosystemBanner />
    </div>
  );
};
