import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/shared/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KHB Dashboard',
  description: 'Modern ve kullanıcı dostu bir yönetim platformu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
