import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Starlink For All - Micro-Investment Platform',
  description: 'Invest in Starlink terminals across Bangladesh and earn passive income',
  metadataBase: new URL('https://starlink-for-all.vercel.app'),
  // Security-related metadata
  applicationName: 'Starlink For All',
  referrer: 'strict-origin-when-cross-origin',
  keywords: ['starlink', 'investment', 'bangladesh', 'satellite internet'],
  authors: [{ name: 'Starlink For All Team' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // OpenGraph data
  openGraph: {
    title: 'Starlink For All - Micro-Investment Platform',
    description: 'Invest in Starlink terminals across Bangladesh and earn passive income',
    url: 'https://starlink-for-all.vercel.app',
    siteName: 'Starlink For All',
    locale: 'en_US',
    type: 'website',
  },
  // Twitter card data
  twitter: {
    card: 'summary_large_image',
    title: 'Starlink For All - Micro-Investment Platform',
    description: 'Invest in Starlink terminals across Bangladesh and earn passive income',
  },
  // Robots directive
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-neutral-white hexagon-pattern">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}