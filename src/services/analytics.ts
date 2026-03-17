import { format, parseISO } from 'date-fns';
import {
  AggregateSummary,
  CampaignMetrics,
  ClickCampaignRaw,
  DashboardResponse,
  DailySeriesPoint,
  SheetCampaignRaw,
  WarningItem,
} from '@/types/analytics';

const safeDivide = (a: number, b: number): number => (b === 0 ? 0 : a / b);

const normalizeKey = (id?: string, name?: string): string => (id && id.trim().length > 0 ? id.trim() : (name ?? 'unknown').trim().toLowerCase());

const calculateRomi = (revenue: number, spend: number): number => safeDivide(revenue - spend, spend) * 100;

export function buildDashboard(clickRows: ClickCampaignRaw[], sheetRows: SheetCampaignRaw[]): DashboardResponse {
  const sheetMap = new Map<string, SheetCampaignRaw[]>();

  for (const row of sheetRows) {
    const key = normalizeKey(row.campaign_id, row.campaign_name);
    const list = sheetMap.get(key) ?? [];
    list.push(row);
    sheetMap.set(key, list);
  }

  const campaigns: CampaignMetrics[] = clickRows.map((click) => {
    const key = normalizeKey(click.campaign_id, click.campaign_name);
    const matches = (sheetMap.get(key) ?? []).filter((item) => item.date === click.date);

    const revenue = matches.reduce((sum, item) => sum + item.revenue, 0);
    const orders = matches.reduce((sum, item) => sum + item.orders, 0);
    const ctr = click.impressions ? (click.clicks / click.impressions) * 100 : click.ctr;
    const cpc = click.clicks ? click.spend / click.clicks : click.cpc;

    return {
      campaignId: click.campaign_id,
      campaignName: click.campaign_name,
      date: click.date,
      budget: click.budget,
      spend: click.spend,
      clicks: click.clicks,
      impressions: click.impressions,
      ctr,
      cpc,
      orders,
      revenue,
      romi: calculateRomi(revenue, click.spend),
    };
  });

  const summary = campaigns.reduce<AggregateSummary>(
    (acc, c) => {
      acc.clicks += c.clicks;
      acc.impressions += c.impressions;
      acc.spend += c.spend;
      acc.revenue += c.revenue;
      acc.orders += c.orders;
      return acc;
    },
    {
      clicks: 0,
      impressions: 0,
      spend: 0,
      revenue: 0,
      orders: 0,
      ctr: 0,
      cpc: 0,
      conversionRate: 0,
      romi: 0,
    },
  );

  summary.ctr = safeDivide(summary.clicks, summary.impressions) * 100;
  summary.cpc = safeDivide(summary.spend, summary.clicks);
  summary.conversionRate = safeDivide(summary.orders, summary.clicks) * 100;
  summary.romi = calculateRomi(summary.revenue, summary.spend);

  const seriesMap = new Map<string, DailySeriesPoint>();
  for (const c of campaigns) {
    const item = seriesMap.get(c.date) ?? { date: c.date, clicks: 0, spend: 0, ctr: 0 };
    item.clicks += c.clicks;
    item.spend += c.spend;
    item.ctr += c.ctr;
    seriesMap.set(c.date, item);
  }

  const series = Array.from(seriesMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((point) => {
      const rowsForDay = campaigns.filter((item) => item.date === point.date).length || 1;
      return {
        ...point,
        date: format(parseISO(point.date), 'dd.MM'),
        ctr: point.ctr / rowsForDay,
      };
    });

  const warnings: WarningItem[] = campaigns.flatMap((c) => {
    const arr: WarningItem[] = [];
    if (c.ctr < 1.5) arr.push({ campaignName: c.campaignName, reason: 'low_ctr', value: c.ctr });
    if (c.cpc > 100) arr.push({ campaignName: c.campaignName, reason: 'high_cpc', value: c.cpc });
    if (c.romi < 0) arr.push({ campaignName: c.campaignName, reason: 'bad_romi', value: c.romi });
    return arr;
  });

  return {
    summary,
    campaigns,
    series,
    warnings,
    generatedAt: new Date().toISOString(),
  };
}
