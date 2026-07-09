# ClauseWise - Next.js Conversion

A professional AI-powered legal document analyzer for college students.

## Project Status

**Phase 1: ✅ Complete** - Next.js, React, TypeScript, and Tailwind CSS project initialization complete.

**Phase 2: ⏳ Pending** - Migration of existing frontend pages and components into Next.js structure.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (Frontend)

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with global styles
│   ├── page.tsx             # Home page (landing page)
│   ├── upload/
│   │   └── page.tsx         # Upload page
│   └── results/
│       └── page.tsx         # Results page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/            # Page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── ...
└── styles/
    └── globals.css          # Global Tailwind styles

public/                       # Static assets
package.json                  # Dependencies
tsconfig.json                 # TypeScript config
tailwind.config.ts            # Tailwind CSS config
next.config.js                # Next.js config
```

## Color Palette

- **Background**: `#09090B`
- **Card**: `#18181B`
- **Border**: `#27272A`
- **Primary Text**: `#FAFAFA`
- **Secondary Text**: `#A1A1AA`
- **Accent Blue**: `#3B82F6`
- **Success**: `#22C55E`
- **Warning**: `#F59E0B`
- **Danger**: `#EF4444`

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Important Notes

- ✅ Existing frontend files preserved (index.html, upload.html, results.html, etc.)
- ✅ Tailwind CSS configured with ClauseWise color palette
- ✅ TypeScript strict mode enabled
- ✅ Global styles set up with Inter font
- ⏳ Phase 2: Pages will be migrated into React components within Next.js structure
- ⏳ No backend, authentication, database, or OCR implemented yet

## Next Steps (Phase 2)

1. Migrate landing page (index.html → src/app/page.tsx)
2. Migrate upload page (upload.html → src/app/upload/page.tsx)
3. Migrate results page (results.html → src/app/results/page.tsx)
4. Extract and create reusable React components
5. Convert all inline styles to Tailwind CSS classes
6. Migrate JavaScript logic to React hooks
7. Test all navigation and interactions
8. Responsive design verification
