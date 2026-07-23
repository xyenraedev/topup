import type { Metadata } from 'next'
import { Inter, Sora, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const displayFont = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'BubbleShop — Top Up Game Mudah, Cepat, Terpercaya',
  description:
    'Top up diamond, UC, dan berbagai item game favoritmu dengan harga terbaik dan proses instan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

// Lalu di tailwind.config.ts, extend fontFamily:
//
// theme: {
//   extend: {
//     fontFamily: {
//       sans: ["var(--font-body)"],
//       display: ["var(--font-display)"],
//     },
//   },
// },
