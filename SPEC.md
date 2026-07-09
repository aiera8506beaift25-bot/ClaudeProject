# ClauseWise - Product Specification

## Product Name

ClauseWise

---

# Product Vision

ClauseWise is an AI-powered legal document analyzer designed specifically for students.

It helps students understand complex legal agreements in plain English before signing them, highlights risky clauses, and suggests safer alternatives.

The goal is to make legal documents understandable without requiring expensive legal consultation.

---

# Problem Statement

Students frequently sign important legal documents without fully understanding them.

Examples include:

- PG / Hostel Rental Agreements
- Internship Offer Letters
- Freelance Contracts
- Campus Hackathon IP Agreements

These documents often contain hidden clauses such as:

- Non-refundable deposits
- Unfair lock-in periods
- Arbitrary eviction rules
- Intellectual Property ownership
- Non-compete clauses
- Hidden payment conditions

Most students cannot afford professional legal advice.

ClauseWise simplifies these documents using AI.

---

# Target Audience

Primary Users

- College Students
- Interns
- Freshers
- Freelancers

Secondary Users

- Student Startups
- College Clubs
- Student Communities

---

# Supported Document Types

## PG / Hostel Agreements

Detect:

- Security deposit risks
- Lock-in clauses
- Maintenance charges
- Guest restrictions
- Curfew policies
- Eviction clauses

---

## Internship Offer Letters

Detect:

- Stipend conditions
- Notice periods
- Non-compete clauses
- Intellectual Property ownership
- Termination clauses

---

## Freelance Contracts

Detect:

- Payment schedules
- Revision limits
- Ownership transfer
- Late payment clauses
- Scope creep

---

## Hackathon Agreements

Detect:

- IP ownership
- Code licensing
- Prize eligibility
- Submission rights
- Commercial usage permissions

---

# Core Features

## Upload Document

Supported formats

- PDF
- DOCX
- PNG
- JPG
- JPEG

---

## Document Type Selection

Users select one category before analysis.

---

## OCR Processing

Image documents are converted into editable text.

Technologies

- Tesseract.js
- PDF.js

---

## AI Analysis

AI analyzes the extracted text and identifies risky clauses.

---

## Risk Detection

Each clause is categorized as

- High Risk
- Medium Risk
- Safe

---

## Plain English Summary

Complex legal language is rewritten into simple English.

---

## Clause Explanation

Each risky clause includes

- Original clause
- Why it is risky
- Possible consequences

---

## Negotiation Suggestions

Generate polite negotiation messages that users can send to landlords or employers.

---

## Risk Score

Overall document score

Example

82 / 100

Risk Levels

Safe

Moderate

High Risk

---

## Download Report

Export analysis as PDF.

---

## Analyze Another Document

Allows quick re-analysis.

---

# User Workflow

Landing Page

↓

Analyze Document

↓

Choose Document Type

↓

Upload Document

↓

OCR Processing

↓

AI Analysis

↓

Risk Dashboard

↓

Download Report

---

# Frontend Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

# Backend Stack

- Node.js
- Express.js

---

# AI

Claude 3.5 Sonnet API

Responsibilities

- Risk Detection
- Clause Explanation
- Plain Language Translation
- Negotiation Suggestions

---

# OCR

PDF.js

Purpose

Extract text from PDF documents.

Tesseract.js

Purpose

Extract text from scanned images.

---

# Database

Supabase

Stores

- User Accounts
- Uploaded Document Metadata
- Analysis History
- Saved Reports

---

# Deployment

Frontend

Vercel

Backend

Render

---

# UI Design

Theme

Premium Dark Mode

Color Palette

Background

#09090B

Cards

#18181B

Accent

#3B82F6

Text

White

Secondary Text

Gray

Effects

- Glassmorphism
- Soft Shadows
- Rounded Corners
- Subtle Hover Effects

---

# Design Inspiration

- Linear
- Vercel
- OpenAI
- Perplexity
- Stripe

---

# Non-Functional Requirements

- Responsive
- Accessible
- Fast
- Secure
- Production Ready
- Mobile Friendly

---

# Future Scope

- Multi-language support
- Voice explanation
- AI chatbot for legal questions
- Clause comparison
- Lawyer consultation
- AI-generated safer contract versions
- University policy analyzer

---

# Success Metrics

- Analysis completes in under 5 seconds
- Simple explanations understandable by students
- Accurate clause detection
- Clean user experience
- Responsive across all devices

---

# Current Development Phase

Current Sprint

Frontend Only

Backend

Not Yet Implemented

AI

Mock Data

OCR

Not Yet Integrated

Authentication

Not Yet Implemented

Database

Not Yet Connected