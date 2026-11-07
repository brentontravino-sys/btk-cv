import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WebsiteShowcase } from '../data/websiteShowcases';
import browserFrameDark from '../../works/browser-dark.svg';
import browserFrameLite from '../../works/browser-lite.svg';

interface WebsiteShowcaseCardProps {
  showcase: WebsiteShowcase;
}

const AUTOPLAY_MS = 4500;

export const WebsiteShowcaseCard: React.FC<WebsiteShowcaseCardProps> = ({ showcase }) => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = showcase.screens.length;
  const screen = showcase.screens[activeScreen];

  const goTo = useCallback(
    (index: number) => setActiveScreen(((index % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(activeScreen + 1), [activeScreen, goTo]);
  const prev = useCallback(() => goTo(activeScreen - 1), [activeScreen, goTo]);

  // Auto-advance the slideshow, pausing on hover/focus and for reduced-motion users.
  const pausedRef = useRef(isPaused);
  pausedRef.current = isPaused;

  useEffect(() => {
    if (total < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) {
        setActiveScreen((current) => (current + 1) % total);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [total]);

  return (
    <article
      className="overflow-hidden rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow transition-all hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className="group relative aspect-[3/2] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${showcase.name} page previews`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
          }
        }}
      >
        {/* Sliding track: each screen is a full-width slide, translated left/right */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${activeScreen * 100}%)` }}
        >
          {showcase.screens.map((item, index) => (
            <div
              key={item.label}
              className="relative h-full w-full shrink-0"
              aria-hidden={index !== activeScreen}
            >
              <img
                src={item.image}
                alt={`${showcase.name} ${item.label.toLowerCase()} page`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="absolute left-[2%] top-[12%] h-[85.5%] w-[96%] object-cover object-top"
              />
            </div>
          ))}
        </div>

        <img
          src={browserFrameLite}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none dark:hidden"
        />
        <img
          src={browserFrameDark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full select-none dark:block"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={`Previous ${showcase.name} page`}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-md border border-black/10 bg-white/80 p-1.5 text-zinc-700 opacity-0 backdrop-blur-sm transition-all hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 dark:border-white/15 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-900 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={`Next ${showcase.name} page`}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-md border border-black/10 bg-white/80 p-1.5 text-zinc-700 opacity-0 backdrop-blur-sm transition-all hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 dark:border-white/15 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-900 cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            {/* Slide progress indicators */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
              {showcase.screens.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show ${showcase.name} ${item.label} page`}
                  aria-pressed={activeScreen === index}
                  className={`h-1 rounded-full transition-all cursor-pointer ${
                    activeScreen === index
                      ? 'w-5 bg-zinc-950 dark:bg-white'
                      : 'w-1.5 bg-zinc-950/30 hover:bg-zinc-950/60 dark:bg-white/30 dark:hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <p className="text-[12.4px] font-mono uppercase tracking-[0.18em] text-zinc-400">
            {showcase.category}
          </p>
          <h3 className="mt-1 text-lg font-normal tracking-tight text-zinc-950 dark:text-white">
            {showcase.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5" aria-label={`${showcase.name} page previews`}>
          {showcase.screens.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => goTo(index)}
              aria-pressed={activeScreen === index}
              aria-label={`Show ${showcase.name} ${item.label} page`}
              className={`rounded-md px-3 py-1 text-[12.4px] tracking-wide transition-colors cursor-pointer ${
                activeScreen === index
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-black'
                  : 'border border-black/10 text-zinc-500 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};
