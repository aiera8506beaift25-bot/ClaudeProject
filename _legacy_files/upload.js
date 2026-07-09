/* =========================================================
   upload.js  —  Upload Document Page Logic
   Handles: navbar scroll, mobile nav, doc-type selection,
   drag-and-drop, file validation, CTA gating.
   ========================================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll effect ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  /* ── 2. Mobile navigation toggle ─────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Close on any mobile-nav link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }


  /* ── 3. Document type card selection ─────────────────── */
  const docTypeCards = document.querySelectorAll('.doc-type-card');
  const stepDotUpload = document.getElementById('stepDotUpload');
  const stepLine      = document.querySelector('.step-line');

  let selectedDocType = null;

  docTypeCards.forEach(card => {
    card.addEventListener('click', () => {
      // Deselect all
      docTypeCards.forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
      });

      // Select clicked card
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      selectedDocType = card.dataset.type;

      // Activate step 1 dot visually
      stepDotUpload?.classList.add('step-active');
      stepLine?.classList.add('step-complete');

      updateAnalyzeButton();
    });

    // Keyboard: space / enter to select
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        card.click();
      }
    });
  });


  /* ── 4. File upload logic ─────────────────────────────── */
  const dropZone        = document.getElementById('dropZone');
  const fileInput       = document.getElementById('fileInput');
  const btnChooseFile   = document.getElementById('btnChooseFile');
  const btnChangeFile   = document.getElementById('btnChangeFile');
  const fileRemoveBtn   = document.getElementById('fileRemoveBtn');
  const filePreviewName = document.getElementById('filePreviewName');
  const filePreviewSize = document.getElementById('filePreviewSize');
  const filePreviewIcon = document.getElementById('filePreviewIcon');
  const uploadCard      = document.getElementById('uploadCard');

  let selectedFile = null;

  // File-type to badge label map
  const TYPE_LABELS = {
    'application/pdf'                                                   : 'PDF',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/msword'                                                : 'DOC',
    'image/jpeg'                                                        : 'JPG',
    'image/png'                                                         : 'PNG',
  };

  const ALLOWED_TYPES  = Object.keys(TYPE_LABELS);
  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

  // Trigger hidden file input from "Choose File" button
  btnChooseFile?.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent drop-zone click
    fileInput.click();
  });

  // Trigger hidden file input from "choose another" link
  btnChangeFile?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Click on drop zone (when not in success state)
  dropZone.addEventListener('click', () => {
    if (!dropZone.classList.contains('has-file')) {
      fileInput.click();
    }
  });

  // Keyboard activation of drop zone
  dropZone.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !dropZone.classList.contains('has-file')) {
      e.preventDefault();
      fileInput.click();
    }
  });

  // File input change
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  // Remove file
  fileRemoveBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearFile();
  });

  // Drag and drop events
  ['dragenter', 'dragover'].forEach(evtName => {
    dropZone.addEventListener(evtName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('is-dragover');
      uploadCard.classList.add('drag-active');
    });
  });

  ['dragleave', 'dragend'].forEach(evtName => {
    dropZone.addEventListener(evtName, (e) => {
      // Only remove if leaving the drop zone itself
      if (!dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('is-dragover');
        uploadCard.classList.remove('drag-active');
      }
    });
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('is-dragover');
    uploadCard.classList.remove('drag-active');

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  });

  // Prevent browser from opening dropped files elsewhere
  document.addEventListener('dragover',  (e) => e.preventDefault());
  document.addEventListener('drop',      (e) => e.preventDefault());


  /* ── 5. File validation & preview ────────────────────── */
  function handleFile(file) {
    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      showFileError('Unsupported format. Please upload PDF, DOCX, JPG, or PNG.');
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      showFileError(`File too large. Maximum allowed size is 10 MB.`);
      return;
    }

    selectedFile = file;
    showFilePreview(file);
    updateAnalyzeButton();
  }

  function showFilePreview(file) {
    // Set preview values
    filePreviewName.textContent = truncateName(file.name, 28);
    filePreviewSize.textContent = formatBytes(file.size);

    // Type badge
    const label = TYPE_LABELS[file.type] || 'FILE';
    filePreviewIcon.textContent = label;

    // Colour the icon box by type
    const isImage = file.type.startsWith('image/');
    filePreviewIcon.style.color        = isImage ? '#22C55E' : 'var(--color-brand-accent)';
    filePreviewIcon.style.borderColor  = isImage ? 'rgba(34,197,94,0.25)' : 'rgba(59,130,246,0.2)';
    filePreviewIcon.style.background   = isImage ? 'rgba(34,197,94,0.08)' : 'rgba(59,130,246,0.08)';

    // Switch drop-zone to success state
    dropZone.classList.remove('is-dragover');
    dropZone.classList.add('has-file');

    // Activate step dot
    stepDotUpload?.classList.add('step-active');
  }

  function clearFile() {
    selectedFile = null;
    fileInput.value = '';

    dropZone.classList.remove('has-file');
    filePreviewName.textContent = '';
    filePreviewSize.textContent = '';
    filePreviewIcon.textContent = '';

    updateAnalyzeButton();
  }

  function showFileError(msg) {
    // Flash the drop zone border red briefly
    dropZone.style.borderColor = 'rgba(239,68,68,0.6)';
    dropZone.style.backgroundColor = 'rgba(239,68,68,0.04)';

    // Temporarily show an error tooltip using hint text
    const hintText = document.getElementById('analyzeHintText');
    const prevText = hintText.textContent;
    hintText.textContent = `⚠ ${msg}`;
    hintText.style.color = '#EF4444';

    setTimeout(() => {
      dropZone.style.borderColor = '';
      dropZone.style.backgroundColor = '';
      hintText.textContent = prevText;
      hintText.style.color = '';
    }, 3000);
  }


  /* ── 6. CTA button gating ─────────────────────────────── */
  const btnAnalyze  = document.getElementById('btnAnalyze');
  const analyzeHint = document.getElementById('analyzeHint');
  const analyzeHintText = document.getElementById('analyzeHintText');

  function updateAnalyzeButton() {
    const hasType = selectedDocType !== null;
    const hasFile = selectedFile  !== null;
    const ready   = hasType && hasFile;

    btnAnalyze.disabled = !ready;
    btnAnalyze.setAttribute('aria-disabled', String(!ready));

    // Update hint message progressively
    if (ready) {
      analyzeHint.classList.add('hidden');
    } else {
      analyzeHint.classList.remove('hidden');
      if (!hasType && !hasFile) {
        analyzeHintText.textContent = 'Select a document type and upload a file to continue';
      } else if (!hasType) {
        analyzeHintText.textContent = 'Select a document type to continue';
      } else {
        analyzeHintText.textContent = 'Upload your document to continue';
      }
    }
  }


  /* ── 7. Analyze button click (end state) ──────────────── */
  btnAnalyze.addEventListener('click', () => {
    if (btnAnalyze.disabled) return;

    // Show a premium loading shimmer on the button
    const originalHTML = btnAnalyze.innerHTML;
    btnAnalyze.disabled = true;
    btnAnalyze.innerHTML = `
      <svg class="btn-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Analyzing…
    `;
    btnAnalyze.style.pointerEvents = 'none';

    // Show completion state then navigate to the results dashboard
    setTimeout(() => {
      btnAnalyze.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Analysis Complete — Opening Results…
      `;
      btnAnalyze.style.background = 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)';
      btnAnalyze.style.boxShadow  = '0 4px 24px rgba(34,197,94,0.35)';
    }, 2200);

    // Navigate to results page after brief pause
    setTimeout(() => {
      window.location.href = 'results.html';
    }, 3000);
  });


  /* ── Utilities ────────────────────────────────────────── */
  function formatBytes(bytes) {
    if (bytes < 1024)        return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function truncateName(name, maxLen) {
    if (name.length <= maxLen) return name;
    const ext   = name.slice(name.lastIndexOf('.'));
    const stem  = name.slice(0, maxLen - ext.length - 1);
    return `${stem}…${ext}`;
  }

  /* Initial state */
  updateAnalyzeButton();

});
