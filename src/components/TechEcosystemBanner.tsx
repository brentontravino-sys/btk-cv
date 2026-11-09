import React from 'react';

interface EcosystemItem {
  title: string;
  category: string;
  image: string;
}

const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    title: 'WordPress',
    category: 'CMS & Themes',
    image: '/assets/aistudio/wordpress_54e6825b.png',
  },
  {
    title: 'Elementor Pro',
    category: 'Visual Builder',
    image: '/assets/aistudio/elementor_6d0d99c7.png',
  },
  {
    title: 'Adobe Creative Cloud',
    category: 'UI/UX & Design',
    image: '/assets/aistudio/creative-cloud_d70d1165.png',
  },
  {
    title: 'Artificial Intelligence',
    category: 'AI & Copilots',
    image: '/assets/aistudio/AI_ea740ab1.png',
  },
  {
    title: 'Google Analytics 4',
    category: 'GA4 Telemetry',
    image: '/assets/aistudio/google-analytics_6c35204b.png',
  },
  {
    title: 'Google Ads',
    category: 'PPC & Search Ads',
    image: '/assets/aistudio/Google_Analytics-w_c0679edf.png',
  },
  {
    title: 'Search Console',
    category: 'SEO & Indexing',
    image: '/assets/aistudio/google-search-console_9ddfde1a.png',
  },
  {
    title: 'PageSpeed Insights',
    category: 'Core Web Vitals',
    image: '/assets/aistudio/google-pagespeeds_c5f5ae6c.png',
  },
  {
    title: 'Looker Studio',
    category: 'BI Dashboards',
    image: '/assets/aistudio/looker-studio_2f20ce0f.png',
  },
  {
    title: 'Meta Ads',
    category: 'IG / FB Social',
    image: '/assets/aistudio/meta_7b1c433b.png',
  },
  {
    title: 'Google Business',
    category: 'Local SEO Profile',
    image: '/assets/aistudio/google-business_6068a31f.png',
  },
  {
    title: 'Google Ecosystem',
    category: 'Tag Manager & Cloud',
    image: '/assets/aistudio/Google_463bf0ff.png',
  },
];

interface TechEcosystemBannerProps {
  className?: string;
  showKicker?: boolean;
}

export const TechEcosystemBanner: React.FC<TechEcosystemBannerProps> = ({
  className = '',
  showKicker = true,
}) => {
  // To guarantee an exact pixel-matched infinite loop at transform -50%,
  // tickerItems must consist of two identical halves: [halfA, halfA]
  // We duplicate ECOSYSTEM_ITEMS twice in each half so wide monitors are always populated.
  const singleHalf = [...ECOSYSTEM_ITEMS, ...ECOSYSTEM_ITEMS];
  const tickerItems = [...singleHalf, ...singleHalf];

  return (
    <aside
      aria-label="Scrolling Technology and Marketing Ecosystem Banner"
      className={`w-screen max-w-none ml-[calc(50%-50vw)] bg-black text-white border-y border-white/[0.12] py-3.5 sm:py-4.5 overflow-hidden relative select-none z-20 print:hidden ${className}`}
    >
      {/* Edge gradient masks for smooth cinematic fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Optional Top Kicker Line */}
      {showKicker && (
        <div className="flex items-center justify-between px-6 sm:px-10 pb-2.5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-400">
              CORE ECOSYSTEM &bull; INDUSTRY-STANDARD PLATFORMS &amp; MARKETING SUITES
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            PAUSE ON HOVER
          </span>
        </div>
      )}

      {/* Infinite Horizontal Scrolling Track */}
      <div className="overflow-hidden w-full flex">
        <div className="animate-marquee-scroll flex items-center gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4">
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="flex items-center gap-3 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/30 transition-all duration-200 shrink-0 group shadow-sm"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center p-1 rounded-md bg-white/[0.06] border border-white/[0.06] shrink-0 group-hover:scale-110 transition-transform duration-200">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="max-h-full max-w-full object-contain filter"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col pr-1 text-left">
                <span className="text-xs sm:text-[13px] font-medium text-zinc-100 group-hover:text-white transition-colors whitespace-nowrap leading-tight">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider whitespace-nowrap leading-tight mt-0.5">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
