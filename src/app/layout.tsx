import type { Metadata } from 'next';
import './globals.css';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata('home');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
