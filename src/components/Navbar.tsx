import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { PageTab } from '../types';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  isDark: boolean;
  toggleDark: () => void;
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  onOpenPdf,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'Index' },
    { tab: 'portfolio', label: 'Works' },
    { tab: 'resume', label: 'Resume' },
    { tab: 'skills', label: 'Expertise' },
    { tab: 'contact', label: 'Inquiries' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ArcAdaptive Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 inset-x-0 h-[2.5px] bg-zinc-950 dark:bg-white z-50 origin-left pointer-events-none"
      />

      <header
        className={`${activeTab === 'home' ? (scrolled ? 'fixed' : 'absolute') : 'sticky'} top-0 z-40 w-full transition-all duration-300 py-5 ${
          activeTab === 'home' && !scrolled
            ? 'bg-transparent border-b border-transparent backdrop-blur-none shadow-none'
            : 'bg-white/75 dark:bg-zinc-950/75 border-b border-black/[0.06] dark:border-white/[0.08] backdrop-blur-lg shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo: Minimalist BTK Monogram + RESUME */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-black dark:bg-white text-white dark:text-black font-medium tracking-widest text-xs transition-transform duration-300 group-hover:scale-105 shadow-sm">
                BTK
              </div>

              <span className="font-light tracking-[0.25em] text-xs uppercase text-zinc-900 dark:text-zinc-100">
                RESUME
              </span>
            </div>

            {/* Desktop Navigation: Minimal Editorial Layout */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(({ tab, label }) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleNavClick(tab)}
                    className={`group relative flex items-center gap-1.5 py-1 text-xs tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-zinc-950 dark:text-white font-medium'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 font-light'
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 inset-x-0 h-[1.5px] bg-zinc-950 dark:bg-white"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Quick PDF links in minimalist pills */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => onOpenPdf('cv')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-[12.4px] tracking-wider uppercase text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm"
                  title="View original verified CV"
                >
                  <span>CV</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>

                <button
                  onClick={() => onOpenPdf('portfolio')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-[12.4px] tracking-wider uppercase text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all cursor-pointer bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm"
                  title="View original Portfolio"
                >
                  <span>Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              </div>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDark}
                aria-label="Toggle Dark and Light Mode"
                className="p-2.5 rounded-md border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-md border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 bg-white/80 dark:bg-zinc-900/80"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.06] bg-[#fbfbfd] dark:bg-[#08080a] px-6 py-6 space-y-4 animate-in fade-in duration-200 shadow-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ tab, label }) => (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`py-2 text-xs tracking-[0.2em] uppercase text-left transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'text-black dark:text-white font-medium'
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenPdf('cv');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-xs tracking-wider uppercase text-zinc-600 dark:text-zinc-400"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                onClick={() => {
                  onOpenPdf('portfolio');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 text-xs tracking-wider uppercase text-zinc-600 dark:text-zinc-400"
              >
                <span>Portfolio Document</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <div className="pt-2 flex items-center justify-between text-xs tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
                <span>Theme</span>
                <button
                  onClick={toggleDark}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 text-xs text-zinc-800 dark:text-zinc-200"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
