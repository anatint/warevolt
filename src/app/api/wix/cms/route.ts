import { NextRequest, NextResponse } from 'next/server';
import { getWixClient } from '@/lib/wixClient';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dataCollectionId = searchParams.get('collection') || 'Items';
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  try {
    const client = getWixClient();
    
    // Query data items from specified Wix CMS collection using fluent query builder
    const queryBuilder = client.items.query(dataCollectionId);

    const result = await queryBuilder.limit(limit).skip(skip).find();

    return NextResponse.json({
      success: true,
      collection: dataCollectionId,
      totalCount: result.totalCount ?? result.items?.length ?? 0,
      items: result.items || [],
      hasNext: result.hasNext ? result.hasNext() : false,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Wix CMS Query Error:', error);
    return NextResponse.json(
      {
        success: false,
        collection: dataCollectionId,
        error: error?.message || 'Failed to query CMS collection',
        details: error?.details || null,
        hint: 'Ensure that the collection exists in your Wix site CMS and the client permissions allow read access.',
      },
      { status: 400 }
    );
  }
}
