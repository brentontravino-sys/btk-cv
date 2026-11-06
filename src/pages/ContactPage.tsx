import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';

interface ContactPageProps {
  onOpenPdf: (type: 'cv' | 'portfolio') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenPdf }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Google Ads & PPC Campaigns',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-28 max-w-5xl mx-auto">
      {/* Header with Kinetic Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-10"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
          <span className="text-[11px] tracking-[0.25em] uppercase font-light text-zinc-500 dark:text-zinc-400">
            CONTACT &bull; INQUIRIES
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-zinc-950 dark:text-white">
            Initiate Conversation
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-light text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
            Direct channel for high-ROI digital campaigns, technical web infrastructure, or career
            roles. Based in Johannesburg, South Africa and available worldwide.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Contact Info (Col 1) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 space-y-10"
        >
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
              DIRECT REACH
            </span>
            <div className="space-y-4 pt-2">
              <div>
                <span className="text-xs text-zinc-400 font-light block">Email</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-normal text-zinc-950 dark:text-white hover:underline underline-offset-4"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div>
                <span className="text-xs text-zinc-400 font-light block">Mobile &amp; WhatsApp</span>
                <div className="space-y-1">
                  {PERSONAL_INFO.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-sm font-normal text-zinc-950 dark:text-white block hover:underline underline-offset-4"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-zinc-400 font-light block">Location</span>
                <span className="text-sm font-normal text-zinc-950 dark:text-white">
                  {PERSONAL_INFO.location}
                </span>
                <span className="text-xs text-zinc-400 block font-light mt-0.5">
                  SAST (UTC+2) &bull; Remote &amp; On-Site Ready
                </span>
              </div>
            </div>
          </div>

          {/* PDF Triggers */}
          <div className="space-y-3 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
            <span className="text-[10px] tracking-[0.25em] uppercase font-light text-zinc-400">
              DOCUMENTS
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onOpenPdf('cv')}
                className="flex items-center justify-between p-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-xs font-light tracking-wider uppercase text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
              >
                <span>Curriculum Vitae (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                onClick={() => onOpenPdf('portfolio')}
                className="flex items-center justify-between p-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-xs font-light tracking-wider uppercase text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
              >
                <span>20-Page Portfolio (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Form (Col 2) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7"
        >
          <div className="p-8 sm:p-12 rounded-xl bg-white dark:bg-[#101014] border border-black/[0.06] dark:border-white/[0.06] soft-shadow space-y-6">
            <h2 className="text-xl font-normal text-zinc-950 dark:text-white tracking-wide">
              Send a Message
            </h2>

            {submitted ? (
              <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-normal text-zinc-950 dark:text-white">
                  Message Transmitted
                </h3>
                <p className="text-xs text-zinc-500 font-light max-w-sm mx-auto">
                  Thank you for reaching out. Brenton will review your inquiry and follow up at{' '}
                  <span className="font-mono text-zinc-800 dark:text-zinc-200">{formState.email}</span>{' '}
                  promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      service: 'Google Ads & PPC Campaigns',
                      message: '',
                    });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-light tracking-wider uppercase rounded-md border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                >
                  New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-light text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-md border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-light text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@organization.com"
                    className="w-full px-4 py-2.5 rounded-md border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-light text-zinc-400">
                    Inquiry Scope
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light"
                  >
                    <option value="Google Ads & PPC Campaigns">Google Ads & PPC Campaigns</option>
                    <option value="Technical SEO & Site Health Audit">
                      Technical SEO & Site Health Audit
                    </option>
                    <option value="WordPress / Shopify Web Solutions">
                      WordPress / Shopify Web Solutions
                    </option>
                    <option value="3D Architectural Signage & Booth Layout">
                      3D Architectural Signage & Booth Layout
                    </option>
                    <option value="Full-Time / Contract Role Opportunity">
                      Full-Time / Contract Role Opportunity
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-light text-zinc-400">
                    Message Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, objectives, or role requirements..."
                    className="w-full px-4 py-2.5 rounded-md border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-md text-xs font-normal tracking-[0.2em] uppercase text-white dark:text-black bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
