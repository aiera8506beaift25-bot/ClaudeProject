'use client';

import { useState } from 'react';
import Link from 'next/link';
import FooterModal from '@/components/footer/FooterModal';
import FooterLink from '@/components/footer/FooterLink';
import {
  InfoIcon,
  LegalIcon,
  HelpIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PrivacyPolicyContent,
  TermsOfUseContent,
  ContactContent,
  HelpCenterContent,
} from '@/components/footer/ModalContents';

export default function Footer() {
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modal: string) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return (
    <footer className="bg-[#09090B] border-t border-[#27272A]">
      {/* Privacy Policy Modal */}
      <FooterModal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
        icon={<InfoIcon />}
      >
        <PrivacyPolicyContent />
      </FooterModal>

      {/* Terms of Use Modal */}
      <FooterModal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms & Conditions"
        icon={<LegalIcon />}
      >
        <TermsOfUseContent />
      </FooterModal>

      {/* Contact Modal */}
      <FooterModal
        isOpen={activeModal === 'contact'}
        onClose={closeModal}
        title="Contact Us"
        icon={<MailIcon />}
      >
        <ContactContent />
      </FooterModal>

      {/* Help Center Modal */}
      <FooterModal
        isOpen={activeModal === 'help'}
        onClose={closeModal}
        title="Help Center"
        icon={<HelpIcon />}
      >
        <HelpCenterContent />
      </FooterModal>

      <div className="max-w-[1280px] mx-auto px-6 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
                <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2" fill="currentColor" />
              </svg>
              <span className="text-[#FAFAFA] font-bold text-lg">ClauseWise</span>
            </Link>
            <p className="body-sm text-[#A1A1AA] mb-3">
              Simplifying complex legal contracts for college students everywhere.
            </p>
            <p className="caption text-[#71717A]">Powered by Claude AI</p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="label font-semibold text-[#FAFAFA] mb-4">Product</h3>
            <div className="flex flex-col gap-3">
              <FooterLink label="Features" href="#features" />
              <FooterLink label="How It Works" href="#how-it-works" />
              <FooterLink label="Documents" href="#documents" />
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="label font-semibold text-[#FAFAFA] mb-4">Resources</h3>
            <div className="flex flex-col gap-3">
              <FooterLink
                label="Privacy Policy"
                onClick={() => openModal('privacy')}
              />
              <FooterLink
                label="Terms & Conditions"
                onClick={() => openModal('terms')}
              />
              <FooterLink
                label="Help Center"
                onClick={() => openModal('help')}
              />
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="label font-semibold text-[#FAFAFA] mb-4">Support</h3>
            <div className="flex flex-col gap-3">
              <FooterLink
                label="Contact Us"
                onClick={() => openModal('contact')}
              />
              <FooterLink
                label="GitHub"
                href="https://github.com"
                external
                icon={<GithubIcon />}
              />
              <FooterLink
                label="LinkedIn"
                href="https://linkedin.com"
                external
                icon={<LinkedinIcon />}
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#27272A] pt-8 flex flex-col sm:flex-row justify-between items-center gap-8">
          <p className="caption text-[#71717A]">
            &copy; 2026 ClauseWise. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
