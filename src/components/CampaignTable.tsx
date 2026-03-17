import { CampaignMetrics } from '@/types/analytics';

export function CampaignTable({ campaigns }: { campaigns: CampaignMetrics[] }) {
  return (
    <section className="card overflow-x-auto">
      <h2 className="mb-4 text-lg font-semibold">Таблица кампаний</h2>
      <table className="min-w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th>Кампания</th>
            <th>Клики</th>
            <th>Показы</th>
            <th>CTR</th>
            <th>CPC</th>
            <th>Доход</th>
            <th>Заказы</th>
            <th>ROMI</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={`${c.campaignId}-${c.date}`} className="border-t border-slate-100">
              <td className="py-2 pr-4">{c.campaignName}</td>
              <td>{c.clicks}</td>
              <td>{c.impressions}</td>
              <td>{c.ctr.toFixed(2)}%</td>
              <td>{c.cpc.toFixed(2)}</td>
              <td>{c.revenue.toFixed(0)}</td>
              <td>{c.orders}</td>
              <td className={c.romi < 0 ? 'text-red-600' : 'text-emerald-600'}>{c.romi.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
