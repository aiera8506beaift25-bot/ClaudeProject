/* =========================================================
   ClauseWise Interactive UI/UX Logic
   ========================================================= */

// 1. Database for Simulated Contract Analyses
const PLAYGROUND_DOCS = {
  internship: {
    title: "Internship Offer Letter",
    riskScore: 72,
    riskLabel: "Moderate Risk",
    clauses: [
      {
        title: "Clause 2: Termination Notice Period",
        text: "Either party may terminate this agreement at any time. However, the Intern shall provide a minimum of ninety (90) days notice period prior to early resignation.",
        explanation: "🚨 High Risk: A 90-day notice is extremely long for a student internship. Standard notice is 14 to 30 days."
      },
      {
        title: "Clause 3: Automatic Renewal",
        text: "This internship is subject to automatic renewal at the end of the term for another three months...",
        explanation: "⚠️ Warning: Avoid automatic extensions without re-negotiating stipends or career milestones."
      },
      {
        title: "Clause 4: Travel Expense Refund",
        text: "...Intern is entitled to a full refund of travel expenses within thirty (30) days of submission.",
        explanation: "✓ Safe: Standard refund policy. Ensure you submit bills within the timelines."
      }
    ]
  },
  hostel: {
    title: "PG & Hostel Rental Lease",
    riskScore: 55,
    riskLabel: "Moderate Risk",
    clauses: [
      {
        title: "Clause 1.2: Lock-in Period",
        text: "The tenant agrees to a strict lock-in period of 6 months. Early departure forfeits the deposit.",
        explanation: "🚨 High Risk: If your college schedules change or exams end early, you will lose your security deposit."
      },
      {
        title: "Clause 2.4: Electrical Maintenance",
        text: "All electrical maintenance exceeding $15 is the sole responsibility of the tenant.",
        explanation: "⚠️ Note: Normal wear and tear on wiring should be covered by the landlord, not the student."
      }
    ]
  },
  freelance: {
    title: "Freelance Services Agreement",
    riskScore: 88,
    riskLabel: "High Risk",
    clauses: [
      {
        title: "Clause 3: Unlimited Revision Rounds",
        text: "Developer shall provide unlimited revisions until Client is satisfied with the deliverables.",
        explanation: "🚨 High Risk: Leads to unpaid extra work. Always cap revisions at 2 or 3 rounds max."
      },
      {
        title: "Clause 4.1: Indemnification Clause",
        text: "Developer agrees to indemnify Client for all losses caused by software defects or third-party libraries.",
        explanation: "🚨 High Risk: You could be held financially liable for React, Vue, or database package security flaws."
      }
    ]
  },
  hackathon: {
    title: "Hackathon IP Terms & Rules",
    riskScore: 32,
    riskLabel: "Low Risk",
    clauses: [
      {
        title: "Clause 2: Intellectual Property Assignment",
        text: "By submitting a project, you assign all rights, title, and ownership of code to the organizing committee.",
        explanation: "⚠️ Warning: You lose the rights to commercially launch the product. Request open-source distribution."
      }
    ]
  }
};

// 2. DOM Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  
  // Sticky Navbar Scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ─── Premium Smooth Scroll ──────────────────────────────────────
  // Scrolls to a target element with navbar offset compensation.
  // Duration: ~800ms via a custom ease-in-out curve.
  function smoothScrollTo(targetEl) {
    if (!targetEl) return;

    const NAVBAR_HEIGHT = navbar ? navbar.offsetHeight : 72;
    const BREATHING_ROOM = 20; // extra gap so heading isn't flush with nav
    const offset = NAVBAR_HEIGHT + BREATHING_ROOM;

    const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
    const startTop  = window.pageYOffset;
    const distance  = targetTop - startTop;
    const duration  = 820; // ms – feels premium without being sluggish
    let startTime   = null;

    // Smooth ease-in-out cubic
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeInOutCubic(progress);

      window.scrollTo(0, startTop + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Wire up all elements that point to #upload-section
  function bindSmoothScrollLinks() {
    const uploadSection = document.getElementById("upload-section");
    if (!uploadSection) return;

    // Select every anchor/button that targets #upload-section
    const triggers = document.querySelectorAll(
      'a[href="#upload-section"]'
    );

    triggers.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScrollTo(uploadSection);

        // If mobile nav is open, close it after triggering scroll
        const mobileNav  = document.getElementById("mobileNav");
        const hamburger  = document.getElementById("hamburger");
        if (mobileNav && mobileNav.classList.contains("open")) {
          hamburger.classList.remove("open");
          mobileNav.classList.remove("open");
          document.body.classList.remove("no-scroll");
        }
      });
    });
  }

  bindSmoothScrollLinks();
  // ────────────────────────────────────────────────────────────────

  // Mobile Navigation toggle
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileLinks = document.querySelectorAll(".mobile-link, .btn-signin-mobile");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  });

  // 3. Interactive Mouse Tilt Effect on Hero Dashboard
  const dashboardWrapper = document.getElementById("dashboardWrapper");
  
  if (dashboardWrapper) {
    dashboardWrapper.addEventListener("mousemove", (e) => {
      const card = dashboardWrapper.querySelector(".dashboard-mockup");
      const box = dashboardWrapper.getBoundingClientRect();
      const x = e.clientX - box.left - box.width / 2;
      const y = e.clientY - box.top - box.height / 2;
      
      // Calculate rotation angles (Max 2 degrees tilt)
      const rotateX = -(y / (box.height / 2)) * 2;
      const rotateY = (x / (box.width / 2)) * 2;
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });
    
    dashboardWrapper.addEventListener("mouseleave", () => {
      const card = dashboardWrapper.querySelector(".dashboard-mockup");
      card.style.transform = `rotateX(2deg) rotateY(-3deg) scale(1)`;
    });
  }

  // 4. Stats Counter Observer (Counts up from 0 when visible)
  const stats = document.querySelectorAll(".stat-number");
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute("data-target"), 10);
    const duration = 1500; // 1.5 seconds count animation
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString() + (target === 72 ? "%" : "+");
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString() + (target === 72 ? "%" : "+");
      }
    }, stepTime);
  };

  const observerOptions = {
    threshold: 0.5
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll(".stat-number");
        numbers.forEach(num => countUp(num));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 4.5. Hero Mockup Live Loop Animation Sequence (20s cycle)
  const mockupUploadOverlay = document.getElementById("mockupUploadOverlay");
  const uploadProgressFill = document.getElementById("uploadProgressFill");
  const uploadStatusText = document.getElementById("uploadStatusText");
  const scanLaser = document.getElementById("scanLaser");
  const mockupDocContent = document.getElementById("mockupDocContent");
  const docScroller = document.querySelector(".doc-scroller");
  const timelineSteps = document.querySelectorAll(".timeline-steps .timeline-step");
  const mockupGaugeFill = document.getElementById("mockupGaugeFill");
  const mockupGaugeVal = document.getElementById("mockupGaugeVal");
  const mockupRiskLabel = document.getElementById("mockupRiskLabel");
  const mockupSummaryText = document.getElementById("mockupSummaryText");
  const mockupAdviceCard = document.getElementById("mockupAdviceCard");
  const clauseA = document.getElementById("clauseA");
  const clauseB = document.getElementById("clauseB");
  const clauseC = document.getElementById("clauseC");

  let activeTimeouts = [];

  function clearAllMockupTimeouts() {
    activeTimeouts.forEach(t => clearTimeout(t));
    activeTimeouts = [];
  }

  function addMockupTimeout(fn, ms) {
    activeTimeouts.push(setTimeout(fn, ms));
  }

  function runMockupLoop() {
    clearAllMockupTimeouts();
    
    const dashboardMockup = document.querySelector(".dashboard-mockup");
    if (dashboardMockup) {
      dashboardMockup.style.transition = "opacity 0.5s ease";
      dashboardMockup.style.opacity = "1";
    }

    // 0. Reset State
    mockupUploadOverlay.style.opacity = "1";
    mockupUploadOverlay.style.pointerEvents = "auto";
    uploadProgressFill.style.width = "0%";
    uploadStatusText.textContent = "Uploading...";
    
    scanLaser.style.opacity = "0";
    scanLaser.style.top = "0";
    scanLaser.style.transition = "none";
    
    mockupDocContent.classList.add("skeleton-blurred");
    if (docScroller) docScroller.scrollTop = 0;
    
    // Reset highlights
    clauseA.style.boxShadow = "none";
    clauseB.style.boxShadow = "none";
    clauseC.style.boxShadow = "none";
    
    // Reset Risk gauge
    mockupGaugeFill.style.strokeDashoffset = "125.6";
    mockupGaugeVal.innerHTML = '0 <span class="max-val">/100</span>';
    mockupRiskLabel.textContent = "Calculating...";
    mockupRiskLabel.className = "risk-label danger-text";
    
    // Reset Typewriter
    mockupSummaryText.innerHTML = '<span class="typewriter-cursor">|</span>';
    
    // Reset Advice Card
    mockupAdviceCard.style.opacity = "0";
    mockupAdviceCard.style.transform = "translateY(20px)";
    
    // Reset timeline
    timelineSteps.forEach(step => {
      step.className = "timeline-step"; // clear all completed / active
      const checkSpan = step.querySelector(".step-check");
      const bulletSpan = step.querySelector(".step-bullet");
      if (checkSpan) checkSpan.textContent = "";
      if (bulletSpan) bulletSpan.textContent = "";
    });
    
    // Step 1: Upload (t=0s - 2.5s)
    timelineSteps[0].classList.add("active");
    const bullet0 = timelineSteps[0].querySelector(".step-bullet");
    if (bullet0) bullet0.textContent = "●";
    
    // Animate progress bar fill over 1.8s
    addMockupTimeout(() => {
      uploadProgressFill.style.width = "100%";
    }, 100);
    
    addMockupTimeout(() => {
      uploadStatusText.textContent = "✓ Reading document";
    }, 1900);
    
    // Step 2: OCR Scan (t=2.5s - 5s)
    addMockupTimeout(() => {
      // Fade out overlay
      mockupUploadOverlay.style.opacity = "0";
      mockupUploadOverlay.style.pointerEvents = "none";
      
      // Update timeline step 1 to completed, step 2 to active
      timelineSteps[0].classList.remove("active");
      timelineSteps[0].classList.add("completed");
      const check0 = timelineSteps[0].querySelector(".step-check");
      if (check0) check0.textContent = "✓";
      
      timelineSteps[1].classList.add("active");
      const bullet1 = timelineSteps[1].querySelector(".step-bullet");
      if (bullet1) bullet1.textContent = "●";
      
      // Turn on laser scan
      scanLaser.style.opacity = "1";
      scanLaser.style.transition = "top 2s linear";
      scanLaser.style.top = "100%";
    }, 2500);
    
    // Reveal text near scan completion
    addMockupTimeout(() => {
      mockupDocContent.classList.remove("skeleton-blurred");
      scanLaser.style.opacity = "0";
    }, 4500);
    
    // Step 3: AI Timeline steps progression (t=5s - 7.5s)
    addMockupTimeout(() => {
      timelineSteps[1].classList.remove("active");
      timelineSteps[1].classList.add("completed");
      const check1 = timelineSteps[1].querySelector(".step-check");
      if (check1) check1.textContent = "✓";
      
      timelineSteps[2].classList.add("active");
      const bullet2 = timelineSteps[2].querySelector(".step-bullet");
      if (bullet2) bullet2.textContent = "●";
    }, 5000);
    
    addMockupTimeout(() => {
      timelineSteps[2].classList.remove("active");
      timelineSteps[2].classList.add("completed");
      const check2 = timelineSteps[2].querySelector(".step-check");
      if (check2) check2.textContent = "✓";
      
      timelineSteps[3].classList.add("active");
      const bullet3 = timelineSteps[3].querySelector(".step-bullet");
      if (bullet3) bullet3.textContent = "●";
    }, 5800);
    
    addMockupTimeout(() => {
      timelineSteps[3].classList.remove("active");
      timelineSteps[3].classList.add("completed");
      const check3 = timelineSteps[3].querySelector(".step-check");
      if (check3) check3.textContent = "✓";
      
      timelineSteps[4].classList.add("active");
      const bullet4 = timelineSteps[4].querySelector(".step-bullet");
      if (bullet4) bullet4.textContent = "●";
    }, 6600);
    
    addMockupTimeout(() => {
      timelineSteps[4].classList.remove("active");
      timelineSteps[4].classList.add("completed");
      const check4 = timelineSteps[4].querySelector(".step-check");
      if (check4) check4.textContent = "✓";
      
      timelineSteps[5].classList.add("active");
      const bullet5 = timelineSteps[5].querySelector(".step-bullet");
      if (bullet5) bullet5.textContent = "●";
    }, 7500);
    
    // Step 4: Clause Scrolling & Highlighting (t=7.5s - 12s)
    // Scroll and highlight A
    addMockupTimeout(() => {
      if (docScroller) docScroller.scrollTo({top: 50, behavior: 'smooth'});
      clauseA.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.4)";
    }, 7800);
    
    // Scroll and highlight B
    addMockupTimeout(() => {
      if (docScroller) docScroller.scrollTo({top: 130, behavior: 'smooth'});
      clauseB.style.boxShadow = "0 0 10px rgba(245, 158, 11, 0.4)";
    }, 9200);
    
    // Scroll and highlight C
    addMockupTimeout(() => {
      if (docScroller) docScroller.scrollTo({top: 200, behavior: 'smooth'});
      clauseC.style.boxShadow = "0 0 10px rgba(34, 197, 94, 0.4)";
    }, 10600);
    
    // Update timeline steps
    addMockupTimeout(() => {
      timelineSteps[5].classList.remove("active");
      timelineSteps[5].classList.add("completed");
      const check5 = timelineSteps[5].querySelector(".step-check");
      if (check5) check5.textContent = "✓";
      
      timelineSteps[6].classList.add("active");
      const bullet6 = timelineSteps[6].querySelector(".step-bullet");
      if (bullet6) bullet6.textContent = "●";
    }, 11500);
    
    // Step 5: Risk Score Gauge needle animation (t=12s - 14s)
    addMockupTimeout(() => {
      // Circle gauge stroke fill (offset 125.6 matches 0%, 35.1 matches 72%)
      mockupGaugeFill.style.strokeDashoffset = "35.1";
      
      // Animate risk value count up
      let currentVal = 0;
      const countInterval = setInterval(() => {
        currentVal += 2;
        if (currentVal >= 72) {
          mockupGaugeVal.innerHTML = '72 <span class="max-val">/100</span>';
          clearInterval(countInterval);
        } else {
          mockupGaugeVal.innerHTML = currentVal + ' <span class="max-val">/100</span>';
        }
      }, 30);
      
      mockupRiskLabel.textContent = "Moderate Risk";
    }, 12000);
    
    // Step 6: AI Typewriter summary (t=14s - 17s)
    addMockupTimeout(() => {
      const summaryText = "This internship agreement contains a long notice period and a restrictive non-compete clause that may limit future opportunities...";
      let charIndex = 0;
      mockupSummaryText.innerHTML = '<span class="typewriter-cursor">|</span>';
      
      const typeInterval = setInterval(() => {
        if (charIndex < summaryText.length) {
          mockupSummaryText.innerHTML = summaryText.substring(0, charIndex + 1) + '<span class="typewriter-cursor">|</span>';
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 25);
    }, 14000);
    
    // Step 7: Suggestion Card slides up (t=17s - 19s)
    addMockupTimeout(() => {
      mockupAdviceCard.style.opacity = "1";
      mockupAdviceCard.style.transform = "translateY(0)";
      
      // Step 7 timeline completes
      timelineSteps[6].classList.remove("active");
      timelineSteps[6].classList.add("completed");
      const check6 = timelineSteps[6].querySelector(".step-check");
      if (check6) check6.textContent = "✓";
    }, 17000);
    
    // Step 8: Fade out and Reset loop (t=19s - 20s)
    addMockupTimeout(() => {
      if (dashboardMockup) {
        dashboardMockup.style.transition = "opacity 0.8s ease";
        dashboardMockup.style.opacity = "0";
      }
    }, 19000);
    
    addMockupTimeout(() => {
      runMockupLoop();
    }, 20000);
  }
  
  // Start the mockup loop!
  runMockupLoop();

  // 5. Product Demo Auto-Loop Sequence
  const demoStateUpload = document.getElementById("demoStateUpload");
  const demoCursor = document.getElementById("demoCursor");
  const demoUploadProgress = document.getElementById("demoUploadProgress");
  const demoProgressBar = document.getElementById("demoProgressBar");
  
  const demoStateResults = document.getElementById("demoStateResults");
  const demoChecklist = document.getElementById("demoChecklist");
  const demoGaugeCard = document.getElementById("demoGaugeCard");
  const demoGaugeFill = document.getElementById("demoGaugeFill");
  const demoGaugeVal = document.getElementById("demoGaugeVal");
  
  const demoRisks = document.getElementById("demoRisks");
  const demoRiskCards = demoRisks ? demoRisks.querySelectorAll(".demo-risk-card") : [];
  const demoSummaryBox = document.getElementById("demoSummaryBox");
  const demoSummaryTypewriter = document.getElementById("demoSummaryTypewriter");
  const demoActions = document.getElementById("demoActions");

  let demoTimeouts = [];

  function clearDemoTimeouts() {
    demoTimeouts.forEach(t => clearTimeout(t));
    demoTimeouts = [];
  }

  function demoTimeout(fn, ms) {
    demoTimeouts.push(setTimeout(fn, ms));
  }

  function runProductDemoLoop() {
    if (!document.getElementById("upload-section")) return;
    clearDemoTimeouts();

    // Reset all states
    demoStateUpload.classList.add("active");
    demoStateUpload.classList.remove("hidden");
    demoStateResults.classList.remove("active");
    demoStateResults.classList.add("hidden");
    
    demoCursor.style.opacity = "0";
    demoCursor.style.transform = "translate(40px, 40px)";
    demoUploadProgress.classList.add("hidden");
    demoProgressBar.style.width = "0%";

    if (demoChecklist) {
      demoChecklist.querySelectorAll("li").forEach(li => li.classList.remove("checked"));
    }
    
    demoGaugeCard.classList.add("hidden");
    demoGaugeFill.style.strokeDashoffset = "125.6";
    demoGaugeVal.textContent = "0";
    
    demoRiskCards.forEach(card => card.classList.add("hidden"));
    
    demoSummaryBox.classList.add("hidden");
    demoSummaryTypewriter.innerHTML = "";
    demoActions.classList.add("hidden");

    // Sequence Timing
    
    // 1. Cursor moves in and clicks
    demoTimeout(() => {
      demoCursor.style.opacity = "1";
      demoCursor.style.transform = "translate(-10px, -20px)";
    }, 1000);

    demoTimeout(() => {
      demoCursor.style.transform = "translate(-10px, -20px) scale(0.9)"; // click
    }, 2000);

    demoTimeout(() => {
      demoCursor.style.transform = "translate(-10px, -20px) scale(1)"; // release
    }, 2200);

    // 2. Show upload progress
    demoTimeout(() => {
      demoCursor.style.opacity = "0";
      document.querySelector(".upload-box-demo").classList.add("hidden");
      demoUploadProgress.classList.remove("hidden");
    }, 2500);

    demoTimeout(() => {
      demoProgressBar.style.width = "100%";
    }, 2800);

    // 3. Switch to Results & start checklist
    demoTimeout(() => {
      demoStateUpload.classList.remove("active");
      demoStateUpload.classList.add("hidden");
      demoStateResults.classList.add("active");
      demoStateResults.classList.remove("hidden");
    }, 4500);

    if (demoChecklist) {
      const lis = demoChecklist.querySelectorAll("li");
      [5000, 5600, 6200, 6800, 7400].forEach((ms, idx) => {
        if (lis[idx]) {
          demoTimeout(() => {
            lis[idx].classList.add("checked");
          }, ms);
        }
      });
    }

    // 4. Slide in risk cards
    demoTimeout(() => {
      demoRiskCards.forEach((card, idx) => {
        setTimeout(() => card.classList.remove("hidden"), idx * 300);
      });
    }, 6200);

    // 5. Show gauge and animate to 82
    demoTimeout(() => {
      demoGaugeCard.classList.remove("hidden");
      // Animate dashoffset from 125.6 to 125.6 * (1 - 82/100) = 22.6
      setTimeout(() => {
        demoGaugeFill.style.strokeDashoffset = "22.6";
        // Counter animate
        let c = 0;
        const intr = setInterval(() => {
          c += 2;
          if (c >= 82) { c = 82; clearInterval(intr); }
          demoGaugeVal.textContent = c;
        }, 20);
      }, 100);
    }, 7000);

    // 6. Typewriter summary
    demoTimeout(() => {
      demoSummaryBox.classList.remove("hidden");
      const txt = "We found 1 critical issue regarding indefinite confidentiality and an asymmetric notice period. See suggested changes.";
      let i = 0;
      demoSummaryTypewriter.innerHTML = '<span class="cursor">|</span>';
      const typeInt = setInterval(() => {
        if (i < txt.length) {
          demoSummaryTypewriter.innerHTML = txt.substring(0, i+1) + '<span class="cursor">|</span>';
          i++;
        } else {
          clearInterval(typeInt);
          demoSummaryTypewriter.innerHTML = txt;
        }
      }, 30);
    }, 8500);

    // 7. Show actions
    demoTimeout(() => {
      demoActions.classList.remove("hidden");
    }, 12000);

    // 8. Reset after a pause (Total loop ~18s)
    demoTimeout(() => {
      demoStateResults.classList.remove("active");
      demoStateResults.style.opacity = "0";
    }, 16500);

    demoTimeout(() => {
      document.querySelector(".upload-box-demo").classList.remove("hidden");
      demoStateResults.style.opacity = "1";
      runProductDemoLoop();
    }, 17500);
  }

  // Start the new demo loop
  runProductDemoLoop();

});
