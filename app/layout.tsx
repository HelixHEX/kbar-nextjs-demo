import { Inter } from 'next/font/google'
import './globals.css'
import KBar from '@/components/kbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KBar>
          {children}
        </KBar>
      </body>
    </html>
  )
}
