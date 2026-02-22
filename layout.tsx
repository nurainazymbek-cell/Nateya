import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { AuthProvider } from "@/context/auth-provider"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Nateya - AI IELTS Study Hub',
  description: 'Premium AI-powered platform for IELTS preparation and university admissions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
