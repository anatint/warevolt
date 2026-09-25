import { NextResponse } from 'next/server';
import { getWixClient, clientId } from '@/lib/wixClient';

export async function GET() {
  try {
    const client = getWixClient();
    
    // 1. Check Auth & Visitor session
    let authStatus = 'initialized';
    let visitorSession = false;

    try {
      const tokens = await client.auth.generateVisitorTokens();
      if (tokens && tokens.accessToken) {
        visitorSession = true;
        authStatus = 'connected';
      }
    } catch (authErr: any) {
      console.warn('Wix visitor token note:', authErr?.message || authErr);
      authStatus = 'client_ready';
    }

    // 2. Probe Wix Stores Products
    let storesStatus: { available: boolean; count?: number; error?: string } = { available: false };
    try {
      const productsRes = await client.products.queryProducts().limit(1).find();
      storesStatus = {
        available: true,
        count: productsRes.totalCount ?? productsRes.items?.length ?? 0,
      };
    } catch (storeErr: any) {
      storesStatus = {
        available: false,
        error: storeErr?.message || 'Store permissions not enabled or no store app',
      };
    }

    // 3. Probe Wix CMS
    let cmsStatus: { available: boolean; error?: string } = { available: false };
    try {
      await client.items.query('Items').limit(1).find();
      cmsStatus = { available: true };
    } catch (cmsErr: any) {
      cmsStatus = {
        available: false,
        error: cmsErr?.message || 'CMS query note',
      };
    }

    return NextResponse.json({
      status: 'ok',
      connected: true,
      clientId,
      authStatus,
      hasVisitorSession: visitorSession,
      stores: storesStatus,
      cms: cmsStatus,
      timestamp: new Date().toISOString(),
      wixSdk: '@wix/sdk + @wix/stores + @wix/ecom',
      message: `Successfully connected Wix Headless client for ID ${clientId}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        connected: false,
        clientId,
        error: error?.message || 'Unknown error occurred while testing Wix connection',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

