import { seoMetadata } from '@/lib/seo';
import './privacy.css';

export const metadata = seoMetadata('privacy-policy');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
