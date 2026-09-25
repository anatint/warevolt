import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';
import { currentCart } from '@wix/ecom';

export async function GET(request: NextRequest) {
  try {
    const client = getWixClient();
    const cart = await client.currentCart.getCurrentCart();

    return NextResponse.json({
      success: true,
      cart,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to fetch Wix cart',
      },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, lineItems, checkoutOptions } = body;
    const client = getWixClient();

    if (action === 'add') {
      // Add items to current visitor cart
      const updatedCart = await client.currentCart.addToCurrentCart({
        lineItems: lineItems || [],
      });
      return NextResponse.json({
        success: true,
        cart: updatedCart.cart,
      });
    }

    if (action === 'checkout') {
      // Create checkout from current cart
      const currentCheckout = await client.currentCart.createCheckoutFromCurrentCart({
        channelType: checkoutOptions?.channelType || currentCart.ChannelType.WEB,
      });

      return NextResponse.json({
        success: true,
        checkoutId: currentCheckout.checkoutId,
        checkout: currentCheckout,
      });
    }

    return NextResponse.json(
      { success: false, error: `Invalid action: ${action}` },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Wix Cart API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Cart operation failed',
        details: error?.details || null,
      },
      { status: 400 }
    );
  }
}
