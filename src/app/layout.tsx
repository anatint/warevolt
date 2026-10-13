import type { Metadata } from 'next';
import './globals.css';
import { seoMetadata, SITE_URL, SITE_NAME, OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = { metadataBase: new URL(SITE_URL), ...seoMetadata('home') };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${OG_IMAGE}`,
      description: 'Kochi-based 3PL for D2C, B2B, marketplace and quick commerce brands: inventory, warehousing, order fulfillment and nationwide shipping across India.',
      areaServed: 'IN',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
