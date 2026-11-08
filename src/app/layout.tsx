import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/layout/Providers';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://novawear.com'),
  title: 'NOVA WEAR | Haute Couture & Modern Luxury Fashion',
  description:
    'Experience modern sartorial elegance with NOVA WEAR. Handcrafted Italian wool blazers, Mulberry silk blouses, tailored jeans, and luxury Swiss watches & gold accessories.',
  keywords: [
    'NOVA WEAR',
    'Luxury Fashion',
    'Haute Couture',
    'Men Fashion',
    'Women Fashion',
    'Kids Fashion',
    'Luxury Accessories',
    'Gold Watches',
    'Silk Dresses',
  ],
  authors: [{ name: 'NOVA WEAR Studio' }],
  openGraph: {
    title: 'NOVA WEAR | Haute Couture & Modern Luxury Fashion',
    description:
      'Experience modern sartorial elegance with NOVA WEAR. Discover our exclusive Men, Women, Children, and Accessories collections.',
    url: 'https://novawear.com',
    siteName: 'NOVA WEAR',
    images: [
      {
        url: '/images/men/men-wool-blazer.webp',
        width: 800,
        height: 1000,
        alt: 'NOVA WEAR Haute Couture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="dark-mode lang-ar rtl" suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
