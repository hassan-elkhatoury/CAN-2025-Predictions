import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'CAN 2025 Predictor | AI-Powered Tournament Predictions',
  description: 'Professional sports analytics platform for Africa Cup of Nations 2025 predictions using machine learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-900 flex">
        <Sidebar />
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
