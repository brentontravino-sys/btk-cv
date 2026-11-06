import React, { useState } from 'react';
import { WebsiteShowcase } from '../data/websiteShowcases';
import browserFrame from '../../works/gettyimages-1465286557-612x612.jpg';

interface WebsiteShowcaseCardProps {
  showcase: WebsiteShowcase;
}

export const WebsiteShowcaseCard: React.FC<WebsiteShowcaseCardProps> = ({ showcase }) => {
  const [activeScreen, setActiveScreen] = useState(0);
  const screen = showcase.screens[activeScreen];

  return (
    <article className="overflow-hidden rounded-3xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow transition-all hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={screen.image}
          alt={`${showcase.name} ${screen.label.toLowerCase()} page`}
          className="absolute left-[2%] top-[12%] h-[85.5%] w-[96%] object-cover object-top"
        />
        <img
          src={browserFrame}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none mix-blend-multiply"
        />
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
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
              onClick={() => setActiveScreen(index)}
              aria-pressed={activeScreen === index}
              aria-label={`Show ${showcase.name} ${item.label} page`}
              className={`rounded-full px-3 py-1 text-[10px] tracking-wide transition-colors ${
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
