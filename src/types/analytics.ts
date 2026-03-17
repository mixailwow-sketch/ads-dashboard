export type DateRange = {
  from?: string;
  to?: string;
};

export type ClickCampaignRaw = {
  campaign_id: string;
  campaign_name: string;
  date: string;
  budget: number;
  spend: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
};

export type SheetCampaignRaw = {
  campaign_id?: string;
  campaign_name?: string;
  date: string;
  orders: number;
  revenue: number;
  extraMetric?: number;
};

export type CampaignMetrics = {
  campaignId: string;
  campaignName: string;
  date: string;
  budget: number;
  spend: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  orders: number;
  revenue: number;
  romi: number;
};

export type DailySeriesPoint = {
  date: string;
  clicks: number;
  spend: number;
  ctr: number;
};

export type AggregateSummary = {
  clicks: number;
  impressions: number;
  spend: number;
  revenue: number;
  orders: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
  romi: number;
};

export type WarningItem = {
  campaignName: string;
  reason: 'low_ctr' | 'high_cpc' | 'bad_romi';
  value: number;
};

export type DashboardResponse = {
  summary: AggregateSummary;
  campaigns: CampaignMetrics[];
  series: DailySeriesPoint[];
  warnings: WarningItem[];
  generatedAt: string;
  integrationWarnings?: string[];
};
