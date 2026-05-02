import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { KioskProvider } from '@/lib/kiosk-context'
import { Toaster } from '@/components/ui/sonner';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Player Check-In | AP2T',
  description: 'Self-service kiosk for player check-in at Advanced Physical & Technical Training facility.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'favicon.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased h-screen overflow-hidden">
        <div
    className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
    style={{ backgroundImage: "url('/bg.jpg')" }}
  />
        <KioskProvider>
          {children}
            <Toaster richColors position="bottom-right" />
        </KioskProvider>
      </body>
    </html>
  )
}
