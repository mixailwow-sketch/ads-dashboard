'use client';

import { AnalyticsBlock } from '@/components/AnalyticsBlock';
import { CampaignTable } from '@/components/CampaignTable';
import { FiltersBar } from '@/components/FiltersBar';
import { KpiCards } from '@/components/KpiCards';
import { PerformanceChart } from '@/components/PerformanceChart';
import { WarningsPanel } from '@/components/WarningsPanel';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardPage() {
  const { data, isLoading, error, from, to, campaignFilter, setFrom, setTo, setCampaignFilter, refresh } = useDashboardData();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-4 md:p-8">
      <header>
        <h1 className="text-3xl font-bold">Ads Performance Dashboard</h1>
        <p className="text-slate-600">Click.ru + Google Sheets unified analytics</p>
      </header>

      <FiltersBar
        from={from}
        to={to}
        campaignFilter={campaignFilter}
        setFrom={setFrom}
        setTo={setTo}
        setCampaignFilter={setCampaignFilter}
        onRefresh={refresh}
      />

      {isLoading ? <div className="card">Загрузка данных...</div> : null}
      {error ? <div className="card border border-red-300 text-red-700">Ошибка: {error}</div> : null}

      {data ? (
        <>
          <KpiCards summary={data.summary} />
          <PerformanceChart data={data.series} />
          <CampaignTable campaigns={data.campaigns} />
          <AnalyticsBlock summary={data.summary} />
          <WarningsPanel warnings={data.warnings} />
        </>
      ) : null}
    </main>
  );
}
