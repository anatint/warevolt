import { seoMetadata } from '@/lib/seo';

export const metadata = seoMetadata('analytics-reporting');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
