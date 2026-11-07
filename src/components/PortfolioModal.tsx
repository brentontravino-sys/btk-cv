import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import {
  X,
  ExternalLink,
  Check,
  Tag,
  ArrowUpRight,
} from 'lucide-react';

interface PortfolioModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0
    ? project.gallery
    : project.image
    ? [project.image]
    : [];
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xl bg-white dark:bg-[#101014] border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-10 text-zinc-900 dark:text-zinc-100 space-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-md border border-black/10 dark:border-white/10 text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2.5 pr-8">
          <div className="flex items-center gap-2 text-[10.3px] tracking-[0.25em] uppercase font-light text-zinc-400">
            <span>{project.categoryLabel}</span>
            <span>&bull;</span>
            <span>{project.client}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-zinc-950 dark:text-white">
            {project.title}
          </h2>

          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Visual Media Gallery (if present) */}
        {images.length > 0 && (
          <div className="space-y-3">
            <div className="relative w-full h-72 sm:h-96 rounded-lg overflow-hidden bg-zinc-100 dark:bg-black/60 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center p-2">
              <img
                src={currentImage}
                alt={`${project.title} - showcase asset`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain rounded transition-all duration-300"
              />
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10.3px] font-mono text-white">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-zinc-950 dark:border-white ring-2 ring-zinc-950/20 dark:ring-white/20'
                        : 'border-black/10 dark:border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-black/[0.04] dark:border-white/[0.05]"
              >
                <div className="text-[10.3px] font-mono text-zinc-400 uppercase">
                  {m.label}
                </div>
                <div className="text-sm font-normal text-zinc-950 dark:text-white mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Overview Description */}
        <div className="space-y-2">
          <span className="text-[10.3px] tracking-[0.2em] uppercase font-light text-zinc-400 block">
            BRIEF &amp; CONTEXT
          </span>
          <p className="text-xs sm:text-sm font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
        </div>

        {/* Deliverables */}
        <div className="space-y-2.5">
          <span className="text-[10.3px] tracking-[0.2em] uppercase font-light text-zinc-400 block">
            KEY SCOPE
          </span>
          <ul className="space-y-2 text-xs font-light text-zinc-600 dark:text-zinc-400">
            {project.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="space-y-2">
          <span className="text-[10.3px] tracking-[0.2em] uppercase font-light text-zinc-400 block">
            STACK &amp; ENVIRONMENT
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-[11.3px] font-light bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-light tracking-wider uppercase text-white dark:text-black bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <span>Visit Web Presence</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11.3px] text-zinc-400 font-light italic">
              Archived in official BTK Portfolio document
            </span>
          )}

          <button
            onClick={onClose}
            className="text-xs font-light tracking-wider uppercase text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
