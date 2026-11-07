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
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
  isDark: boolean;
}

export const ArcAdaptiveHero: React.FC<ArcAdaptiveHeroProps> = ({
  setActiveTab,
  onOpenPdf,
  isDark,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Cinematic Mountain Hero Frame — Full Screen Width */}
      <div
        className="relative min-h-[400px] sm:min-h-[550px] lg:min-h-[650px] w-screen max-w-none ml-[calc(50%-50vw)] overflow-hidden border-b border-black/[0.06] dark:border-white/[0.06] pt-12 sm:pt-16"
      >
        {/* Layer 1: Mountain Backdrop Image — Full Width, Edge-to-Edge */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
        >
          <img
            src="/assets/aistudio/majesty-mountains_63853a16.jpg"
            alt="Majesty Snow Mountains"
            className="h-full w-screen object-cover object-center opacity-50 filter contrast-[1.05] brightness-[1.02] dark:brightness-[0.7] dark:contrast-[1.15]"
          />
        </div>

        {/* Layer 2: Ethereal Rolling Mist */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30 dark:opacity-10"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl transform -rotate-1" />
        </div>

        {/* Layer 2b: Dark Mode Scrim — deepens the backdrop so nav items stay legible */}
        <div className="absolute inset-0 pointer-events-none hidden dark:block bg-black/20" />

        {/* Layer 3: Text Content Directly Over Background — aligned to the page content grid */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 pt-12 sm:pt-24 flex flex-col justify-end min-h-full">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-950 dark:text-white leading-tight whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span className="font-extralight">FULL STACK </span>
              <span className="font-bold">DIGITAL SOLUTIONS</span>
            </h1>

            <p className="text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-200 leading-relaxed max-w-md">
              15+ years of experience engineering high-performance web applications, scalable e-commerce systems, and custom digital platforms, complemented by secondary expertise in growth marketing and design.
            </p>

          {/* Content Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-4">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-normal tracking-[0.15em] uppercase text-zinc-950 bg-white hover:bg-zinc-200 transition-all cursor-pointer shadow-md active:scale-98"
            >
              <span>Explore Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenPdf('cv')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-light tracking-wider uppercase border border-black/20 dark:border-white/30 hover:border-black/40 dark:hover:border-white/60 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-900 dark:text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-200" />
              <span>Curriculum Vitae</span>
            </button>

            <button
              onClick={() => onOpenPdf('portfolio')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-light tracking-wider uppercase border border-black/20 dark:border-white/30 hover:border-black/40 dark:hover:border-white/60 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-900 dark:text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              <Briefcase className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-200" />
              <span>Portfolio</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
