import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paper Scissors Rocks',
  description: 'The "Paper Scissors Rocks" game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
      </head>
      <body className={`${inter.className}
      bg-gray-800
      text-cyan-50
      `}>{children}</body>
    </html>
  )
}
