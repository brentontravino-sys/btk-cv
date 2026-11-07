import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 280);
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2"
        >
          {/* Subtle percentage tooltip on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-950 text-white dark:bg-white dark:text-black text-[10.3px] font-mono tracking-wider shadow-md pointer-events-none select-none"
              >
                <span>TOP</span>
                <span className="opacity-40">&bull;</span>
                <span>{percent}%</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal circular button with SVG progress ring */}
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={`Back to top, page scrolled ${percent}%`}
            title={`Back to top (${percent}%)`}
            className="relative w-11 h-11 rounded-full flex items-center justify-center bg-white/90 dark:bg-[#101014]/90 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg text-zinc-900 dark:text-zinc-100 hover:border-black/30 dark:hover:border-white/30 transition-colors cursor-pointer group"
          >
            {/* SVG Scroll Progress Circle */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 44 44"
            >
              {/* Background Guide Circle */}
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                strokeWidth="2"
                className="stroke-black/5 dark:stroke-white/10"
              />
              {/* Animated Progress Circle */}
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
                className="stroke-zinc-950 dark:stroke-white transition-opacity"
              />
            </svg>

            {/* Centered Arrow Icon with Micro-Interaction */}
            <ArrowUp className="w-4 h-4 text-zinc-800 dark:text-zinc-200 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
