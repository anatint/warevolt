import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('contact');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
