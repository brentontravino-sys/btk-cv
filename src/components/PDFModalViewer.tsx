import React, { useEffect } from 'react';
import { X, Download, ArrowUpRight, FileText, Briefcase, Printer } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DigitalPortfolioDocument } from './DigitalPortfolioDocument';

interface PDFModalViewerProps {
  type: 'cv' | 'portfolio' | null;
  onClose: () => void;
}

export const PDFModalViewer: React.FC<PDFModalViewerProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  // When portfolio is requested, render the modern interactive & printable portfolio document
  if (type === 'portfolio') {
    return <DigitalPortfolioDocument onClose={onClose} />;
  }

  const isCv = type === 'cv';
  const filePath = PERSONAL_INFO.cvPdfPath;
  const title = isCv
    ? 'Brenton T. Kandhai - Professional CV'
    : 'Brenton T. Kandhai - Multimedia Design & Marketing Portfolio';
  const pageNote = isCv ? '2-Page Verified Resume' : '20-Page Comprehensive Portfolio Document';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-xl bg-white dark:bg-[#101014] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.06] bg-[#fbfbfd] dark:bg-[#08080a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
              {isCv ? <FileText className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-normal text-xs sm:text-sm text-zinc-950 dark:text-white leading-tight">
                {title}
              </h3>
              <p className="text-[10px] text-zinc-400 font-light mt-0.5">
                {pageNote} &bull; Verified Attachment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 text-xs font-light tracking-wider uppercase text-zinc-700 dark:text-zinc-300 hover:border-black/30 dark:hover:border-white/30 transition-colors"
            >
              <span>New Tab</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>

            <a
              href={filePath}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black text-xs font-light tracking-wider uppercase transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-black/10 dark:border-white/10 text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close PDF viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF iframe */}
        <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 overflow-hidden relative">
          <iframe
            src={`${filePath}#view=FitH`}
            className="w-full h-full border-0"
            title={title}
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="px-6 py-2.5 border-t border-black/[0.06] dark:border-white/[0.06] bg-[#fbfbfd] dark:bg-[#08080a] flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span>{filePath.replace('/public', '')}</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
