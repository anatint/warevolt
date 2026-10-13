import type { Metadata } from 'next';
import './globals.css';
import { seoMetadata, SITE_URL, SITE_NAME, OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: 'eXpe54MadpB3RzYxo2JOewE0qx0TrMhuRBwaoYE5Uqk' },
  ...seoMetadata('home'),
};

const GTM_ID = 'GTM-W3R7STVF';
const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${OG_IMAGE}`,
      description: 'Kochi-based 3PL for D2C, B2B, marketplace and quick commerce brands: inventory, warehousing, order fulfillment and nationwide shipping across India.',
      areaServed: 'IN',
      telephone: '+91 99954 50330',
      email: 'hello@warevolt.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Building No: 384 & 385, Airapuram',
        addressLocality: 'Kochi',
        addressRegion: 'Kerala',
        postalCode: '683556',
        addressCountry: 'IN',
      },
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: "if(location.protocol==='http:'&&location.hostname.endsWith('warevolt.com'))location.replace('https://'+location.host+location.pathname+location.search+location.hash)",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
