/* =========================================================
   results.js  —  AI Analysis Dashboard Interactions
   Handles: navbar, mobile nav, gauge animation, clause
   panel, risk filter, neg tabs, copy, regenerate, toasts.
   ========================================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll effect ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  /* ── 2. Mobile navigation ─────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });
  }


  /* ── 3. Animated Risk Gauge ───────────────────────────── */
  const TARGET_SCORE   = 74;
  const GAUGE_FULL_ARC = 251.2;  // circumference of the semicircular path
  const gaugeEl   = document.getElementById('gaugeFill');
  const scoreEl   = document.getElementById('gaugeScore');
  const barFillEl = document.getElementById('gaugeBarFill');

  function animateGauge() {
    // Animate score counter
    let currentScore = 0;
    const duration  = 1400;
    const startTime = performance.now();

    function stepCounter(timestamp) {
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);

      currentScore = Math.round(eased * TARGET_SCORE);
      scoreEl.textContent = currentScore;

      if (progress < 1) requestAnimationFrame(stepCounter);
    }
    requestAnimationFrame(stepCounter);

    // Animate SVG arc
    const dashOffset = GAUGE_FULL_ARC - (TARGET_SCORE / 100) * GAUGE_FULL_ARC;
    // Trigger via CSS transition — small delay so transition is visible
    setTimeout(() => {
      gaugeEl.style.strokeDashoffset = dashOffset;
    }, 80);

    // Animate bar
    setTimeout(() => {
      barFillEl.style.width = `${TARGET_SCORE}%`;
    }, 80);
  }

  // Trigger gauge animation when it enters the viewport
  const gaugeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateGauge();
        gaugeObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const gaugeCard = document.querySelector('.risk-gauge-card');
  if (gaugeCard) gaugeObserver.observe(gaugeCard);


  /* ── 4. Clause highlight panel ────────────────────────── */
  const clausePanel        = document.getElementById('clausePanel');
  const clausePanelOverlay = document.getElementById('clausePanelOverlay');
  const clausePanelClose   = document.getElementById('clausePanelClose');

  // Clause data map
  const CLAUSE_DATA = {
    duration: {
      title:    'Internship Duration',
      risk:     'safe',
      badge:    'Safe Clause',
      section:  'Section 1',
      why:      'The 3-month internship period with clear start and end dates is standard and student-friendly. The dates are specific, which protects you.',
      impact:   'Low impact. Clear duration means no ambiguity about when your obligations end.',
      action:   'No changes needed. This clause is fair and clearly written.',
    },
    stipend: {
      title:    'Stipend Compensation',
      risk:     'medium',
      badge:    'Medium Risk',
      section:  'Section 2',
      why:      '₹8,000/month is below the standard for software internships. More critically, the company can reduce or withhold your pay at their sole discretion — with no objective criteria defined.',
      impact:   'You could receive less money than agreed with no legal recourse if you signed as-is.',
      action:   'Request that the stipend is fixed and non-revisable. Ask for objective, measurable performance criteria to be added in writing before signing.',
    },
    overtime: {
      title:    'Unpaid Overtime',
      risk:     'high',
      badge:    'High Risk',
      section:  'Section 3',
      why:      'Requiring you to work weekends and public holidays without any compensation is a one-sided clause that benefits only the employer. In many jurisdictions, this is illegal for regular employees.',
      impact:   'You could be forced to work 6–7 days per week with no extra pay — leading to financial loss and burnout.',
      action:   'Request one of the following: (1) A cap on extra hours per week, OR (2) Compensatory leave for any weekend work, OR (3) Additional pay at 1.5× rate for overtime hours.',
    },
    confidentiality: {
      title:    'Indefinite Confidentiality',
      risk:     'high',
      badge:    'High Risk',
      section:  'Section 4',
      why:      'The NDA has no expiry date and applies globally. There is no definition of what counts as "confidential information," making it dangerously overbroad. Talking about your own work experience could technically be a breach.',
      impact:   'You face unlimited legal liability forever, even for information that becomes public knowledge.',
      action:   'Negotiate a 2-year time limit. Request a clear, specific definition of "confidential information" that excludes publicly available knowledge and your general skill development.',
    },
    ip: {
      title:    'Unlimited IP Ownership',
      risk:     'high',
      badge:    'High Risk',
      section:  'Section 5',
      why:      'Any work you create during the internship — including personal projects built at home in your own time, using your own equipment — automatically becomes company property. This is exceptionally broad.',
      impact:   'Your personal GitHub projects, side apps, freelance work, and even coursework could be claimed by the company.',
      action:   'Request a carve-out exclusion for: (1) Personal projects unrelated to the company\'s business, (2) Projects developed outside working hours using personal resources, (3) Projects started before the internship began.',
    },
    noncompete: {
      title:    '12-Month Non-Compete',
      risk:     'high',
      badge:    'High Risk',
      section:  'Section 6',
      why:      'A 12-month non-compete across all of India is extremely broad for a student internship. It could prevent you from joining other tech companies immediately after graduating.',
      impact:   'You may be unable to apply for campus placements or full-time roles in tech for a year — severely impacting your career start.',
      action:   'Request the non-compete be reduced to 3 months maximum, limited to direct competitors only (not the entire tech industry), and restricted to your specific city.',
    },
    termination: {
      title:    'Asymmetric Notice Period',
      risk:     'medium',
      badge:    'Medium Risk',
      section:  'Section 7',
      why:      'The company needs to give you only 7 days notice to terminate, but you must provide 30 days notice. This asymmetry heavily favours the company.',
      impact:   'You could lose your internship with just one week of warning, while being locked in for a month if you find a better opportunity.',
      action:   'Request equal notice periods — ideally 14 days for both parties, which is fair and standard for internships.',
    },
    certificate: {
      title:    'Conditional Experience Certificate',
      risk:     'medium',
      badge:    'Medium Risk',
      section:  'Section 8',
      why:      '"Satisfactory performance" is subjective and defined entirely by the company. 45 business days (nearly 2 months) is a very long wait for a certificate you need for job applications.',
      impact:   'You could complete the internship and still not receive a certificate if the company deems your performance unsatisfactory — with no appeal process.',
      action:   'Request: (1) Objective performance criteria be defined upfront, (2) Certificate issuance timeline reduced to 15 business days, (3) A provisional certificate immediately upon completion.',
    },
    law: {
      title:    'Governing Law – Bangalore Courts',
      risk:     'safe',
      badge:    'Safe Clause',
      section:  'Section 9',
      why:      'The dispute resolution clause specifies Indian courts in Bangalore. This is standard and legally clear.',
      impact:   'Low impact for most students. If you are not in Bangalore and a dispute arises, you would need to litigate there, which may be inconvenient.',
      action:   'If you are based in a different city, you could request that your city is added as an alternate jurisdiction, but this is a minor point.',
    },
  };

  const RISK_COLOR_MAP = {
    high:   { badge: 'badge-high',   score: '#EF4444' },
    medium: { badge: 'badge-medium', score: '#F59E0B' },
    safe:   { badge: 'badge-safe',   score: '#22C55E' },
  };

  function openClausePanel(clauseKey) {
    const data = CLAUSE_DATA[clauseKey];
    if (!data) return;

    const colors = RISK_COLOR_MAP[data.risk] || RISK_COLOR_MAP.safe;

    document.getElementById('panelTitle').textContent     = data.title;
    document.getElementById('panelSectionRef').textContent = data.section;
    document.getElementById('panelWhyText').textContent   = data.why;
    document.getElementById('panelImpactText').textContent = data.impact;
    document.getElementById('panelActionText').textContent = data.action;

    const badgeEl = document.getElementById('panelRiskBadge');
    badgeEl.textContent = data.badge;
    badgeEl.className   = `risk-badge ${colors.badge}`;

    clausePanel.classList.add('open');
    clausePanel.setAttribute('aria-hidden', 'false');
    clausePanelOverlay.classList.add('open');
    clausePanelClose.focus();
  }

  function closeClausePanel() {
    clausePanel.classList.remove('open');
    clausePanel.setAttribute('aria-hidden', 'true');
    clausePanelOverlay.classList.remove('open');
  }

  // Wire clause highlights
  document.querySelectorAll('.clause-highlight').forEach(el => {
    el.addEventListener('click', () => openClausePanel(el.dataset.clause));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openClausePanel(el.dataset.clause);
      }
    });
  });

  clausePanelClose?.addEventListener('click', closeClausePanel);
  clausePanelOverlay?.addEventListener('click', closeClausePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeClausePanel();
  });


  /* ── 5. Risk filter buttons ───────────────────────────── */
  const filterBtns  = document.querySelectorAll('.risk-filter-btn');
  const riskCards   = document.querySelectorAll('.risk-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      riskCards.forEach(card => {
        const show = filter === 'all' || card.dataset.risk === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });


  /* ── 6. Negotiation tabs ──────────────────────────────── */
  const negTabs     = document.querySelectorAll('.neg-tab');
  const negEmail    = document.getElementById('negEmail');
  const negWhatsapp = document.getElementById('negWhatsapp');

  negTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      negTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.dataset.tab === 'email') {
        negEmail.classList.remove('hidden');
        negWhatsapp.classList.add('hidden');
      } else {
        negEmail.classList.add('hidden');
        negWhatsapp.classList.remove('hidden');
      }
    });
  });


  /* ── 7. Copy message ──────────────────────────────────── */
  const btnCopyMsg  = document.getElementById('btnCopyMsg');
  const copyLabel   = document.getElementById('copyBtnLabel');

  btnCopyMsg?.addEventListener('click', async () => {
    const activeContent = negEmail.classList.contains('hidden')
      ? document.getElementById('negWhatsappContent').textContent
      : document.getElementById('negEmailContent').textContent;

    try {
      await navigator.clipboard.writeText(activeContent.trim());
      btnCopyMsg.classList.add('copied');
      copyLabel.textContent = '✓ Copied!';
      setTimeout(() => {
        btnCopyMsg.classList.remove('copied');
        copyLabel.textContent = 'Copy Message';
      }, 2500);
    } catch {
      showToast('Copy failed — please select and copy manually.', 'error');
    }
  });


  /* ── 8. Regenerate (shimmer effect) ───────────────────── */
  const btnRegenerate = document.getElementById('btnRegenerate');
  const negEmailContent    = document.getElementById('negEmailContent');
  const negWhatsappContent = document.getElementById('negWhatsappContent');

  const ALT_EMAIL = `Subject: Internship Offer Review — Proposed Amendments

Dear [HR Manager's Name],

Thank you for the internship offer at TechCorp Solutions. I am very enthusiastic about this role.

After reviewing the agreement carefully, I'd like to propose a few targeted amendments before signing:

→ Section 3 (Overtime): Request compensatory leave for any weekend/holiday work required.
→ Section 5 (IP): Carve out personal projects built outside working hours with personal equipment.
→ Section 6 (Non-Compete): Reduce to 3 months, scoped to direct competitors only.
→ Section 7 (Notice): Equal 14-day notice period for both parties.
→ Section 8 (Certificate): Reduce issuance to 15 business days post-completion.

I am happy to discuss any of these over a quick call. Looking forward to joining the team!

Best regards,
Arjun Mehta`;

  const ALT_WHATSAPP = `Hi [HR] 👋

Quick question before I sign — can we sort out a few points?

1️⃣ *Weekend work (Sec 3)* — Any comp-off or extra pay?
2️⃣ *IP clause (Sec 5)* — Can my personal side projects be excluded?
3️⃣ *Non-compete (Sec 6)* — 12 months is quite long. Can we do 3 months?
4️⃣ *Notice periods (Sec 7)* — Can we both be on 14 days?

Happy to chat anytime 😊 Really excited about this!`;

  let isAlt = false;

  btnRegenerate?.addEventListener('click', () => {
    isAlt = !isAlt;

    // Add shimmer
    const activeBox = negEmail.classList.contains('hidden') ? negWhatsapp : negEmail;
    activeBox.style.opacity = '0.4';
    activeBox.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      if (isAlt) {
        negEmailContent.textContent    = ALT_EMAIL;
        negWhatsappContent.textContent = ALT_WHATSAPP;
      } else {
        // Restore original — the HTML has the original
        negEmailContent.textContent    = `Subject: Internship Offer — Clarification on Terms Before Signing\n\nDear HR Team / [Hiring Manager's Name],\n\nThank you for extending this internship offer at TechCorp Solutions. I am genuinely excited about this opportunity and look forward to contributing to the team.\n\nBefore I sign, I would like to respectfully raise a few questions and suggest minor revisions that would help me feel more confident about the agreement:\n\n1. Overtime Compensation (Section 3): Could we add a provision for compensatory leave or additional pay when weekend/holiday work is required?\n\n2. Intellectual Property (Section 5): I would appreciate a carve-out for personal projects that are unrelated to the Company's business and developed using my own resources outside of working hours.\n\n3. Non-Compete Clause (Section 6): The 12-month non-compete across all of India seems broad for a student internship. Could this be revised to 3 months and limited to direct competitors only?\n\n4. Confidentiality Duration (Section 4): Could we specify a time limit (e.g., 2 years) and define what constitutes "confidential information"?\n\n5. Notice Period (Section 7): Could both parties be held to equal notice periods of 14 days?\n\nI believe these are reasonable requests and I remain very excited about the role. Please let me know if we can discuss these points.\n\nWarm regards,\nArjun Mehta\n[Your Phone Number]`;
        negWhatsappContent.textContent = `Hi [HR Name] 👋\n\nThanks for the internship offer at TechCorp! Really excited about it 😊\n\nBefore I sign, I had a few quick questions about some clauses:\n\n1️⃣ *Overtime (Sec 3)* — Is there any comp-off or extra pay for weekend work?\n\n2️⃣ *IP Ownership (Sec 5)* — Can personal projects be excluded if they're unrelated to the company?\n\n3️⃣ *Non-Compete (Sec 6)* — 12 months feels long for a student. Can we make it 3 months + direct competitors only?\n\n4️⃣ *Notice Period (Sec 7)* — Can we keep it equal at 14 days for both?\n\nWould love to sort these out quickly — looking forward to joining the team! 🙏`;
      }
      activeBox.style.opacity = '1';
    }, 250);

    showToast('Message regenerated with a fresh approach.', 'success');
  });


  /* ── 9. Bottom bar buttons ────────────────────────────── */
  document.getElementById('btnDownloadReport')?.addEventListener('click', () => {
    showToast('Preparing your PDF report…', 'info');
    setTimeout(() => showToast('PDF report ready for download!', 'success'), 2000);
  });

  document.getElementById('btnDownloadPDF')?.addEventListener('click', () => {
    showToast('Preparing your PDF report…', 'info');
    setTimeout(() => showToast('PDF report ready for download!', 'success'), 2000);
  });

  document.getElementById('btnSaveAnalysis')?.addEventListener('click', () => {
    showToast('Analysis saved to your account.', 'success');
  });

  document.getElementById('btnShareReport')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Report link copied to clipboard!', 'success');
    } catch {
      showToast('Copy the URL from your browser to share.', 'info');
    }
  });


  /* ── 10. Learn More buttons ───────────────────────────── */
  document.querySelectorAll('.btn-learn-more').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Full legal glossary coming soon.', 'info');
    });
  });


  /* ── 11. Scroll-triggered card entrance animations ─────── */
  const animatableCards = document.querySelectorAll('.risk-card, .legal-term-card, .sidebar-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 55);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatableCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.22s ease, box-shadow 0.22s ease';
    cardObserver.observe(card);
  });


  /* ── Utilities ────────────────────────────────────────── */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // Toast notification system
  let toastQueue = [];
  let toastContainer = null;

  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 200;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  const TOAST_COLORS = {
    success: { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  color: '#86EFAC' },
    error:   { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  color: '#FCA5A5' },
    info:    { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#93C5FD' },
  };

  function showToast(message, type = 'info') {
    const container = ensureToastContainer();
    const colors    = TOAST_COLORS[type] || TOAST_COLORS.info;

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: ${colors.bg};
      border: 1px solid ${colors.border};
      color: ${colors.color};
      backdrop-filter: blur(16px);
      padding: 12px 20px;
      border-radius: 10px;
      font-family: Inter, sans-serif;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.25s ease, transform 0.25s ease;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    `;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(-6px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

});
