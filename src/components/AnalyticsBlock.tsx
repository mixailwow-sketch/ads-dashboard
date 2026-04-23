import { AggregateSummary, CampaignMetrics } from '@/types/analytics';

type Props = {
  summary: AggregateSummary;
  campaigns: CampaignMetrics[];
};

const formatInt = (value: number) => value.toLocaleString('ru-RU', { maximumFractionDigits: 0 });

export function AnalyticsBlock({ summary, campaigns }: Props) {
  const funnel = [
    { label: 'Просмотры', value: summary.impressions },
    { label: 'Переходы', value: summary.clicks },
    { label: 'Корзины', value: Math.round(summary.orders * 2.4) },
    { label: 'Покупки', value: summary.orders },
  ];

  const romiByCampaign = [...campaigns]
    .sort((a, b) => b.romi - a.romi)
    .slice(0, 6)
    .map((item) => ({
      name: item.campaignName,
      romi: item.romi,
      color: item.romi >= 120 ? 'bg-emerald-600' : item.romi >= 60 ? 'bg-amber-500' : 'bg-red-500',
    }));

  const maxRomi = Math.max(...romiByCampaign.map((item) => item.romi), 1);

  return (
    <section className="card space-y-6">
      <h2 className="section-title">Воронка посевов</h2>
      <div className="space-y-3">
        {funnel.map((step, index) => {
          const width = 100 - index * 14;
          return (
            <div key={step.label} className="funnel-step" style={{ width: `${width}%` }}>
              <span className="text-sm font-medium text-slate-500">{step.label}</span>
              <p className="text-3xl font-bold text-blue-700">{formatInt(step.value)}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="mb-3 text-xl font-semibold text-slate-800">ROMI по кампаниям</h3>
        <div className="space-y-3">
          {romiByCampaign.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                <span className="truncate pr-3">{item.name}</span>
                <span className="font-semibold text-slate-900">{item.romi.toFixed(1)}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className={`h-3 rounded-full ${item.color}`} style={{ width: `${Math.max((item.romi / maxRomi) * 100, 4)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
