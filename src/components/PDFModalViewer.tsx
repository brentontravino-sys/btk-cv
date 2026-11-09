import React, { useEffect } from 'react';
import { DigitalCVDocument } from './DigitalCVDocument';
import { DigitalPortfolioDocument } from './DigitalPortfolioDocument';

interface PDFModalViewerProps {
  type: 'cv' | 'portfolio' | null;
  onClose: () => void;
  action?: 'view' | 'download' | 'print';
}

export const PDFModalViewer: React.FC<PDFModalViewerProps> = ({
  type,
  onClose,
  action = 'view',
}) => {
  React.useEffect(() => {
    if (type) {
      document.body.classList.add('print-cv-active');
      document.body.classList.add('print-doc-active');
    }
    return () => {
      document.body.classList.remove('print-cv-active');
      document.body.classList.remove('print-doc-active');
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

  const initialAction = action === 'view' ? undefined : action;

  // Render the modern interactive & printable site-designed documents
  if (type === 'cv') {
    return <DigitalCVDocument onClose={onClose} initialAction={initialAction} />;
  }

  return <DigitalPortfolioDocument onClose={onClose} initialAction={initialAction} />;
};
