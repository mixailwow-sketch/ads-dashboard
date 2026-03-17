import { NextRequest, NextResponse } from 'next/server';
import { fetchClickCampaigns } from '@/lib/api/click';
import { fetchSheetsCampaigns, isGoogleSheetsConfigured } from '@/lib/api/googleSheets';
import { buildDashboard } from '@/services/analytics';
import type { SheetCampaignRaw } from '@/types/analytics';

export async function GET(request: NextRequest) {
  try {
    const from = request.nextUrl.searchParams.get('from') ?? undefined;
    const to = request.nextUrl.searchParams.get('to') ?? undefined;

    const clickRows = await fetchClickCampaigns({ from, to });
    const integrationWarnings: string[] = [];
    let sheetRows: SheetCampaignRaw[] = [];

    if (!isGoogleSheetsConfigured()) {
      integrationWarnings.push('Google Sheets не настроен: используются только данные Click.ru.');
    } else {
      try {
        sheetRows = await fetchSheetsCampaigns();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        integrationWarnings.push(`Ошибка Google Sheets: ${message}. Используются только данные Click.ru.`);
      }
    }

    const dashboard = buildDashboard(clickRows, sheetRows);

    return NextResponse.json(
      {
        ...dashboard,
        integrationWarnings,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
