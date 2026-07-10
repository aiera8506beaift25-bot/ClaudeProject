import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import VideoIntroModal from '@/components/VideoIntroModal'

export const metadata: Metadata = {
  title: 'ClauseWise - Read Less. Understand More. Sign Smarter.',
  description: 'ClauseWise uses AI to simplify legal documents, agreements, and contracts into clear, student-friendly explanations before you sign.',
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <VideoIntroModal />
        {children}
      </body>
    </html>
  )
}
