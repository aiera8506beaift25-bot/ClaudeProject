'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface FooterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function FooterModal({
  isOpen,
  onClose,
  title,
  icon,
  children,
}: FooterModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[700px] max-h-[85vh] z-50"
          >
            {/* Modal Card with Glow */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-b from-[rgba(59,130,246,0.3)] to-transparent rounded-2xl opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

              {/* Card Content */}
              <div className="relative bg-[rgba(24,24,27,0.95)] backdrop-blur-xl border border-[rgba(39,39,42,0.5)] rounded-2xl p-8 sm:p-10 overflow-y-auto max-h-[85vh]">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {icon && <div className="text-[#3B82F6]">{icon}</div>}
                    <h2 className="h2 text-[#FAFAFA]">{title}</h2>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors flex-shrink-0 ml-4"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Content */}
                <div className="text-[#A1A1AA] space-y-4">{children}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
