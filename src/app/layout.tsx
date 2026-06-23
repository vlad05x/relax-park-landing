import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/hooks';

// Premium fonts matching the design system
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Relax Park 5* | Преміальний релакс-парк',
  description:
    'Ексклюзивний заміський комплекс преміум-сегмента. Тиша, приватність та бездоганний сервіс 5 зірок.',
  keywords: [
    'релакс парк',
    'преміум готель',
    'заміський комплекс',
    'SPA',
    'wellness',
    'відпочинок 5 зірок',
  ],
  authors: [{ name: 'Relax Park' }],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://relaxpark.ua',
    siteName: 'Relax Park 5*',
    title: 'Relax Park 5* | Тиша та розкіш',
    description: 'Преміальний релакс-парк для тих, хто цінує приватність',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relax Park 5*',
    description: 'Преміальний релакс-парк',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}