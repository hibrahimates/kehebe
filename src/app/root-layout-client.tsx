'use client'

import { NextFont } from 'next/dist/compiled/@next/font'
import { ThemeProvider } from 'next-themes'
import { Providers } from '@/shared/components/providers'

interface RootLayoutClientProps {
  children: React.ReactNode
  inter: NextFont
}

export function RootLayoutClient({ children, inter }: RootLayoutClientProps) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
} 