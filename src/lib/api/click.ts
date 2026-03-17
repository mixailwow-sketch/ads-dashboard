import { ClickCampaignRaw, DateRange } from '@/types/analytics';

const CLICK_API_BASE = 'https://click.ru/agency/user';

const toNumber = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export async function fetchClickCampaigns(range: DateRange = {}): Promise<ClickCampaignRaw[]> {
  const token = process.env.CLICK_API_TOKEN;

  if (!token) {
    throw new Error('CLICK_API_TOKEN is not configured');
  }

  const params = new URLSearchParams();
  if (range.from) params.set('from', range.from);
  if (range.to) params.set('to', range.to);

  const url = `${CLICK_API_BASE}${params.size ? `?${params.toString()}` : ''}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Click.ru API error: ${response.status}`);
  }

  const payload = await response.json();
  const rows = Array.isArray(payload?.data) ? payload.data : [];

  return rows.map((row: Record<string, unknown>) => ({
    campaign_id: String(row.campaign_id ?? row.id ?? ''),
    campaign_name: String(row.campaign_name ?? row.name ?? 'Unknown campaign'),
    date: String(row.date ?? new Date().toISOString().slice(0, 10)),
    budget: toNumber(row.budget),
    spend: toNumber(row.spend),
    clicks: toNumber(row.clicks),
    impressions: toNumber(row.impressions),
    ctr: toNumber(row.ctr),
    cpc: toNumber(row.cpc),
  }));
}
