import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trạng thái thanh toán',
  description: 'Kiểm tra trạng thái thanh toán của bạn',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="vi">
      <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
  )
}

