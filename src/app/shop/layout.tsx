import type { Metadata } from 'next';
import './shop.css';

export const metadata: Metadata = {
  title: 'Shop | Warevolt',
  description: 'Browse products and check out securely with Warevolt.',
  alternates: { canonical: '/shop/' },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
