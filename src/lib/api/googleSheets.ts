import { SheetCampaignRaw } from '@/types/analytics';

const toNumber = (value: string | number | undefined): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

type GoogleSheetsValueRange = {
  values?: string[][];
};

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_API_KEY && process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

export async function fetchSheetsCampaigns(): Promise<SheetCampaignRaw[]> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE ?? 'Sheet1!A:G';

  if (!apiKey || !spreadsheetId) {
    return [];
  }

  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
  const response = await fetch(endpoint, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Google Sheets API error: ${response.status}`);
  }

  const payload = (await response.json()) as GoogleSheetsValueRange;
  const rows = payload.values ?? [];

  if (rows.length <= 1) {
    return [];
  }

  const [header, ...data] = rows;
  const indexOf = (name: string) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());

  const idx = {
    campaignId: indexOf('campaign_id'),
    campaignName: indexOf('campaign_name'),
    date: indexOf('date'),
    orders: indexOf('orders'),
    revenue: indexOf('revenue'),
    extra: indexOf('extra_metric'),
  };

  return data.map((row) => ({
    campaign_id: idx.campaignId >= 0 ? row[idx.campaignId] : undefined,
    campaign_name: idx.campaignName >= 0 ? row[idx.campaignName] : undefined,
    date: idx.date >= 0 ? row[idx.date] : new Date().toISOString().slice(0, 10),
    orders: toNumber(idx.orders >= 0 ? row[idx.orders] : 0),
    revenue: toNumber(idx.revenue >= 0 ? row[idx.revenue] : 0),
    extraMetric: toNumber(idx.extra >= 0 ? row[idx.extra] : 0),
  }));
}
