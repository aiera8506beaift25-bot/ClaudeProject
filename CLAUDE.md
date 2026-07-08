# CLAUDE.md

# Project

## Project Name
ClauseWise

## One-Line Description
ClauseWise is an AI-powered legal document analyzer that helps college students understand contracts such as internship agreements, PG/hostel rental agreements, freelance contracts, hackathon IP forms, scholarship agreements, and university policies in simple language before signing.

## Goal

Build a professional, production-ready AI SaaS web application.

The product should focus on:

- Excellent User Experience
- Clean UI
- Fast performance
- Student-first design
- Modern animations
- Accessibility
- Responsive layout

Never make the UI look like a college project.

---

# Tech Stack

Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend
- Node.js
- Express.js

AI
- Claude API (Anthropic)

OCR
- PDF.js
- Tesseract.js

Database
- Supabase

Deployment
- Frontend → Vercel
- Backend → Render

---

# Folder Structure

Components should be inside:

src/components/

Pages should be inside:

src/app/

Reusable UI should be modular.

Avoid writing everything inside one file.

---

# Coding Standards

Always use TypeScript.

Never use "any".

Use functional React components.

Use modern React hooks.

Keep components small and reusable.

Use meaningful variable names.

Keep code clean and readable.

---

# UI Guidelines

Design style:

- Premium AI SaaS
- Minimal
- Professional
- Modern
- Dark theme

Inspired by:

- Linear
- Vercel
- OpenAI
- Perplexity
- Stripe

Do NOT use:

- Bright gradients
- Cartoon icons
- Bootstrap styling
- Government portal aesthetics

---

# Color Palette

Background:
#09090B

Cards:
#18181B

Borders:
#27272A

Primary Text:
#FAFAFA

Secondary Text:
#A1A1AA

Accent Blue:
#3B82F6

Success:
#22C55E

Warning:
#F59E0B

Danger:
#EF4444

---

# Product Workflow

User uploads document

↓

OCR extracts text

↓

Claude analyzes clauses

↓

Generate:

- Plain-English Summary
- Risk Score
- High-Risk Clauses
- Student Rights Explanation
- Negotiation Suggestions

↓

Export Report

---

# Supported Documents

- Internship Agreements
- PG / Hostel Agreements
- Freelance Contracts
- Hackathon Rules
- Scholarship Agreements
- University Policies

---

# UI Components

Landing Page

Dashboard

Upload Area

Risk Cards

Summary Card

Negotiation Card

Document History

Profile

Settings

---

# Animations

Use Framer Motion.

Smooth transitions.

Fade animations.

Hover lift.

Loading skeletons.

Progress animations.

Typing effect while AI is analyzing.

Never use flashy animations.

---

# Responsiveness

Desktop

Tablet

Mobile

All layouts should adapt correctly.

---

# Git Workflow

Create one branch per feature.

Commit message format:

feat:
fix:
refactor:
style:

Never push directly to main.

---

# Testing

Test every feature before considering it complete.

Check:

- Upload
- OCR
- AI response
- Dashboard
- Responsiveness

---

# Boundaries

Do not delete existing files without confirmation.

Do not install new packages without asking.

Do not modify environment variables.

Keep existing project architecture.

---

# When Writing Code

Always explain:

1. What files were changed.

2. Why they were changed.

3. Any dependencies added.

4. Any manual setup required.

---

# Priority

1. Product Quality

2. User Experience

3. Code Quality

4. Performance

5. Maintainability