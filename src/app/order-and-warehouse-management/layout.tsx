import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('order-warehouse');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
