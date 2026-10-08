import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('b2b-isometric');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
