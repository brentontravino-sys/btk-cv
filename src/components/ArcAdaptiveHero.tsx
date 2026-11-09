import React from 'react';
import { motion } from 'motion/react';
import { PageTab } from '../types';
import {
  ArrowRight,
  FileText,
  Briefcase,
} from 'lucide-react';

interface ArcAdaptiveHeroProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenPdf: (type: 'cv' | 'portfolio', action?: 'view' | 'download' | 'print') => void;
  isDark: boolean;
}

export const ArcAdaptiveHero: React.FC<ArcAdaptiveHeroProps> = ({
  setActiveTab,
  onOpenPdf,
  isDark,
}) => {
  return (
    <div>
      {/* Main Hero Frame — Full Screen Width */}
      <div
        className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-[620px] w-screen max-w-none ml-[calc(50%-50vw)] overflow-hidden pt-12 sm:pt-16"
      >
        {/* Background Images — Pure images only, no color overlays */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          {/* Light Mode Image */}
          <img
            src="/assets/aistudio/light-mode_a8c6e2ba.jpg"
            alt="Network background light mode"
            className="h-full w-full object-cover object-right dark:hidden"
          />
          {/* Dark Mode Image */}
          <img
            src="/assets/aistudio/dark-mode_8ce9ff9a.jpg"
            alt="Network background dark mode"
            className="h-full w-full object-cover object-right hidden dark:block"
          />
        </div>

        {/* Text Content Directly Over Background — aligned to the page content grid */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 pt-12 sm:pt-24 flex flex-col justify-end min-h-full">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-950 dark:text-white leading-tight whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span className="font-extralight">FULL STACK </span>
              <span className="font-bold">DIGITAL SOLUTIONS</span>
            </h1>

            <p className="text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-md mt-3">
              15+ years of experience engineering high-performance web applications, scalable e-commerce systems, and custom digital platforms, complemented by secondary expertise in growth marketing and design.
            </p>

            {/* Content Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-4">
              <button
                onClick={() => setActiveTab('portfolio')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-normal tracking-[0.15em] uppercase bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-md active:scale-98"
              >
                <span>Explore Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenPdf('cv', 'view')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-light tracking-wider uppercase border border-black/15 dark:border-white/20 hover:border-black/40 dark:hover:border-white/50 bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white transition-all cursor-pointer backdrop-blur-sm"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-300" />
                <span>Curriculum Vitae</span>
              </button>

              <button
                onClick={() => onOpenPdf('portfolio', 'view')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-light tracking-wider uppercase border border-black/15 dark:border-white/20 hover:border-black/40 dark:hover:border-white/50 bg-white/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white transition-all cursor-pointer backdrop-blur-sm"
              >
                <Briefcase className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-300" />
                <span>Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
