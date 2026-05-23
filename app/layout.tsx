import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Afful Godfred — AI & Automation Engineer',
  description: "Afful Godfred builds AI automation systems, full-stack web platforms, and business infrastructure for forward-thinking companies. Stop running your business like it's ancient.",
  openGraph: {
    title: 'Afful Godfred — AI & Automation Engineer',
    description: "Stop running your business like it's ancient. AI systems, automation, full-stack development.",
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
