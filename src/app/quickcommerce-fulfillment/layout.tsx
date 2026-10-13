import type { Metadata } from 'next';

// Alias of /quick-ecommerce-fulfillment/ — keep it out of search results so the main page isn't duplicated.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: '/quick-ecommerce-fulfillment/' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
