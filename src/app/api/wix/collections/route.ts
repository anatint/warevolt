import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    const client = getWixClient();
    const result = await client.collections.queryCollections().limit(limit).find();

    return NextResponse.json({
      success: true,
      totalCount: result.totalCount ?? result.items?.length ?? 0,
      items: result.items || [],
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Wix Stores Collections Query Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to query Wix Store collections',
        details: error?.details || null,
        hint: 'Verify that Wix Stores is active on your site.',
      },
      { status: 400 }
    );
  }
}
