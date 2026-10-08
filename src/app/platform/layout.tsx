import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('platform');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
