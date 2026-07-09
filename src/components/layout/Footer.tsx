import Link from 'next/link'

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Documents', href: '#documents' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Demo', href: '#demo' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ]
    },
    {
      title: 'Contact',
      links: [
        { label: 'support@clausewise.ai', href: 'mailto:support@clausewise.ai' },
        { label: 'Get Help', href: '#contact' },
      ]
    }
  ]

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ]

  return (
    <footer className="bg-[#09090B] border-t border-[#27272A]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
                <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2" fill="currentColor" />
              </svg>
              <span className="text-[#FAFAFA] font-bold text-lg">ClauseWise</span>
            </Link>
            <p className="body-sm text-[#A1A1AA] mb-3">Simplifying complex legal contracts for college students everywhere.</p>
            <p className="caption text-[#71717A]">Powered by Claude AI</p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="label font-semibold text-[#FAFAFA] mb-4">{section.title}</h3>
              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="body-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#27272A] pt-8 flex flex-col sm:flex-row justify-between items-center gap-8">
          <p className="caption text-[#71717A]">&copy; 2026 ClauseWise. All rights reserved.</p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label={social.label}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {social.label === 'GitHub' ? (
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="2" y="9" width="4" height="12" strokeWidth="2" />
                      <circle cx="4" cy="4" r="2" strokeWidth="2" />
                    </>
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
