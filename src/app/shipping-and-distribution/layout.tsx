import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('shipping-distribution');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
