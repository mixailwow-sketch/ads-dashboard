import { NextRequest, NextResponse } from 'next/server';
import { fetchClickCampaigns } from '@/lib/api/click';
import { fetchSheetsCampaigns } from '@/lib/api/googleSheets';
import { buildDashboard } from '@/services/analytics';

export async function GET(request: NextRequest) {
  try {
    const from = request.nextUrl.searchParams.get('from') ?? undefined;
    const to = request.nextUrl.searchParams.get('to') ?? undefined;

    const [clickRows, sheetRows] = await Promise.all([fetchClickCampaigns({ from, to }), fetchSheetsCampaigns()]);
    const dashboard = buildDashboard(clickRows, sheetRows);

    return NextResponse.json(dashboard, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
