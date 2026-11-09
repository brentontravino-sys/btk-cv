import React, { useState, useEffect } from 'react';
import { PageTab, ProjectItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ResumePage } from './pages/ResumePage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { PortfolioModal } from './components/PortfolioModal';
import { PDFModalViewer } from './components/PDFModalViewer';
import { BackToTopButton } from './components/BackToTopButton';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Default to clean white/minimalist theme as requested ("mainly white with black and less blue")
    const stored = localStorage.getItem('btk_theme');
    return stored ? stored === 'dark' : false;
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activePdfModal, setActivePdfModal] = useState<'cv' | 'portfolio' | null>(null);
  const [pdfAction, setPdfAction] = useState<'view' | 'download' | 'print'>('view');

  const handleOpenPdf = (
    type: 'cv' | 'portfolio',
    action: 'view' | 'download' | 'print' = 'view'
  ) => {
    setPdfAction(action);
    setActivePdfModal(type);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('btk_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('btk_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd] dark:bg-[#08080a] text-zinc-900 dark:text-zinc-100 transition-colors duration-400 antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Header / Navigation with BTK logo */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        onOpenPdf={handleOpenPdf}
      />

      {/* Main Multipage Content Area with Smooth Motion Transitions */}
      <main
        className={
          'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 print:px-0 ' +
          (activeTab === 'home' ? 'pt-0' : 'pt-[60px]')
        }
      >
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <HomePage
                setActiveTab={setActiveTab}
                onOpenPdf={handleOpenPdf}
                onSelectProject={(project) => setSelectedProject(project)}
                isDark={isDark}
              />
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <PortfolioPage
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenPdf={handleOpenPdf}
              />
            </motion.div>
          )}

          {activeTab === 'resume' && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <ResumePage onOpenPdf={handleOpenPdf} />
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <SkillsPage isDark={isDark} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <ContactPage onOpenPdf={handleOpenPdf} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer with Contact Details & PDF Triggers */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPdf={handleOpenPdf}
      />

      {/* Case Study Details Modal */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Full-Page PDF Viewer Modal for CV & Portfolio Attachments */}
      <PDFModalViewer
        type={activePdfModal}
        onClose={() => setActivePdfModal(null)}
        action={pdfAction}
      />

      {/* Floating Minimalist Back-To-Top Button with Scroll Progress Tracker */}
      <BackToTopButton />
    </div>
  );
}
