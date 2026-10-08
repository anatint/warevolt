import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('quick-ecommerce');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
