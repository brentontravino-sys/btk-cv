import React from 'react';
import { PageTab } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPdf }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-[#fbfbfd] dark:bg-[#08080a] text-zinc-500 font-light transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Col 1: Monogram & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black font-medium tracking-widest text-xs">
                BTK
              </div>
              <div>
                <h3 className="font-normal text-sm text-zinc-950 dark:text-white tracking-wide">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-[10.3px] tracking-widest uppercase text-zinc-400">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 font-light">
              15+ years of experience engineering high-performance web applications, scalable e-commerce systems, and robust digital platforms with secondary specializations in marketing and design.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <span className="text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400 block">
              SECTIONS
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    scrollToTop();
                  }}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('portfolio');
                    scrollToTop();
                  }}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Selected Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('resume');
                    scrollToTop();
                  }}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Curriculum Vitae
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('skills');
                    scrollToTop();
                  }}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Expertise Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    scrollToTop();
                  }}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <span className="text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400 block">
              LOCATION &amp; CONTACT
            </span>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  {PERSONAL_INFO.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified PDF Assets */}
          <div className="space-y-3">
            <span className="text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400 block">
              ARCHIVES
            </span>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => onOpenPdf('cv')}
                className="w-full flex items-center justify-between p-2.5 rounded-md border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </button>

              <button
                onClick={() => onOpenPdf('portfolio')}
                className="w-full flex items-center justify-between p-2.5 rounded-md border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>Portfolio</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-400">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name} (BTK). All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Top of Page</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
