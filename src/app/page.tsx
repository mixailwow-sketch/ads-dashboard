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
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Анализ посевов</h1>
          <p className="mt-2 text-lg text-slate-500">Анализ эффективности рекламных посевов по пабликам и каналам</p>
        </div>

        <FiltersBar
          from={from}
          to={to}
          campaignFilter={campaignFilter}
          setFrom={setFrom}
          setTo={setTo}
          setCampaignFilter={setCampaignFilter}
          onRefresh={refresh}
        />
      </header>

      {isLoading ? <div className="card">Загрузка данных...</div> : null}
      {error ? <div className="card border border-red-300 text-red-700">Ошибка: {error}</div> : null}

      {data ? (
        <>
          <KpiCards summary={data.summary} />

          <section className="dashboard-grid">
            <AnalyticsBlock summary={data.summary} campaigns={data.campaigns} />
            <PerformanceChart data={data.series} />
          </section>

          <section className="dashboard-grid">
            <CampaignTable campaigns={data.campaigns} />
            <WarningsPanel warnings={data.warnings} />
          </section>
        </>
      ) : null}
    </main>
  );
}
