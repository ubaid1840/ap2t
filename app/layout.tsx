import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";
import "./globals.css";
import AnimatingLoader from "@/components/animating-loader";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AP2T",
  description: "Advanced Physical & Technical Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={
          <AnimatingLoader />}>
          <NextTopLoader
            color="#d3fb20"
            showSpinner={false} />
          {children}
        </Suspense>

      </body>
    </html>
  );
}
