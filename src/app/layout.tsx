import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Warevolt - Pan-India eCommerce Fulfillment & 3PL',
  description: 'Headquartered in Kochi, Warevolt powers inventory management, warehousing, order fulfillment, shipping, and nationwide distribution.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
