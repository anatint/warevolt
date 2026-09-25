import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');
  const collectionId = searchParams.get('collectionId');
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  try {
    const client = getWixClient();

    // 1. Fetch single product by slug or id if specified
    if (slug) {
      const response = await client.products.queryProducts().eq('slug', slug).limit(1).find();
      const product = response.items?.[0] || null;
      return NextResponse.json({
        success: true,
        product,
      });
    }

    if (id) {
      const product = await client.products.getProduct(id);
      return NextResponse.json({
        success: true,
        product,
      });
    }

    // 2. Query products with filters
    let query = client.products.queryProducts();

    if (search) {
      query = query.startsWith('name', search);
    }

    if (collectionId) {
      query = query.hasSome('collectionIds', [collectionId]);
    }

    const result = await query.limit(limit).skip(skip).find();

    return NextResponse.json({
      success: true,
      totalCount: result.totalCount ?? result.items?.length ?? 0,
      items: result.items || [],
      hasNext: result.hasNext ? result.hasNext() : false,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Wix Stores Products Query Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to query Wix Store products',
        details: error?.details || null,
        hint: 'Verify that Wix Stores is installed in your Wix site and the Headless Client ID has permissions enabled for Wix Stores in Wix Headless Settings.',
      },
      { status: 400 }
    );
  }
}
