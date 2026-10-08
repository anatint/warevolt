import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('d2c-marketplace');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
