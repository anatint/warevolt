# Warevolt - Wix Headless Store & CMS Integration

This project connects to the **Wix Headless platform** (Client ID `565ec5eb-181b-46e2-903c-3a82062e152a`) using Next.js (App Router), `@wix/sdk`, `@wix/stores`, `@wix/ecom`, and `@wix/data`.

---

## 🚀 Features

- **Wix Headless Store**: Full catalog query (`products`), collections/categories (`collections`), inventory, and product detail endpoints.
- **Wix eCommerce & Cart**: Visitor cart management (`currentCart`) and checkout redirects (`checkout`) via `@wix/ecom`.
- **Wix Headless CMS**: Dynamic CMS collection explorer via `@wix/data`.
- **OAuth Session Handling**: Configured with `@wix/sdk` OAuth visitor session support.
- **Live Health Diagnostics**: Automated connectivity verification endpoint (`/api/wix/health`).
- **Developer Playground & Dashboard**: Interactive UI for browsing products, filtering categories, testing cart actions, and generating production-ready code.

---

## 🛠 API Routes

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/wix/health` | `GET` | Health check & Wix Headless connection verification |
| `/api/wix/products` | `GET` | Query store products (`?search=`, `?collectionId=`, `?slug=`, `?id=`) |
| `/api/wix/collections` | `GET` | Query store collections & categories |
| `/api/wix/cart` | `GET`, `POST` | Get cart, add line items, and generate hosted checkout URLs |
| `/api/wix/cms` | `GET` | Query Wix CMS data collections (`?collection=`, `?limit=`) |

---

## 🔑 Environment Configuration

In `.env.local`:
```env
NEXT_PUBLIC_WIX_CLIENT_ID=565ec5eb-181b-46e2-903c-3a82062e152a
```

---

## 💻 Code Recipes

### 1. Query Wix Store Products (Server Component)
```tsx
import { getWixClient } from '@/lib/wixClient';

export default async function StorePage() {
  const client = getWixClient();
  const { items: products } = await client.products
    .queryProducts()
    .limit(12)
    .find();

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.priceData?.formatted?.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Add to Cart & Create Checkout (@wix/ecom)
```tsx
import { getWixClient } from '@/lib/wixClient';
import { currentCart } from '@wix/ecom';

export async function addProductToCart(productId: string) {
  const client = getWixClient();
  
  // 1. Add item
  await client.currentCart.addToCurrentCart({
    lineItems: [{
      catalogReference: {
        catalogItemId: productId,
        appId: '1380b703-e34d-405b-ab7d-962361e06e49',
      },
      quantity: 1,
    }],
  });

  // 2. Generate Checkout URL
  const checkout = await client.currentCart.createCheckoutFromCurrentCart({
    channelType: currentCart.ChannelType.WEB,
  });

  return checkout.checkoutId;
}
```

---

## 🏃 Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
