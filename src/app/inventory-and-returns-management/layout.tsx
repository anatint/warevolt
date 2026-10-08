import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('inventory-returns');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
