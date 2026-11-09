import React, { useEffect } from 'react';
import { DigitalCVDocument } from './DigitalCVDocument';
import { DigitalPortfolioDocument } from './DigitalPortfolioDocument';

interface PDFModalViewerProps {
  type: 'cv' | 'portfolio' | null;
  onClose: () => void;
}

export const PDFModalViewer: React.FC<PDFModalViewerProps> = ({ type, onClose }) => {
  React.useEffect(() => {
    if (type === 'cv') {
      document.body.classList.add('print-cv-active');
    }
    return () => {
      document.body.classList.remove('print-cv-active');
    };
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  // Render the modern interactive & printable site-designed documents
  if (type === 'cv') {
    return <DigitalCVDocument onClose={onClose} />;
  }

  return <DigitalPortfolioDocument onClose={onClose} />;
};
