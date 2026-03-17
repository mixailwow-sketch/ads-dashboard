import { AggregateSummary } from '@/types/analytics';

export function AnalyticsBlock({ summary }: { summary: AggregateSummary }) {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold">Блок аналитики</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <p>Средний CPC: <strong>{summary.cpc.toFixed(2)} ₽</strong></p>
        <p>Средний CTR: <strong>{summary.ctr.toFixed(2)}%</strong></p>
        <p>Конверсия: <strong>{summary.conversionRate.toFixed(2)}%</strong></p>
      </div>
    </section>
  );
}
