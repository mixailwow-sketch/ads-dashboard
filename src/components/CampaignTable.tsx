import { CampaignMetrics } from '@/types/analytics';

export function CampaignTable({ campaigns }: { campaigns: CampaignMetrics[] }) {
  return (
    <section className="card overflow-hidden">
      <h2 className="section-title mb-4">Паблики и каналы</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Кампания</th>
              <th className="px-3 py-2">Показы</th>
              <th className="px-3 py-2">Клики</th>
              <th className="px-3 py-2">CTR</th>
              <th className="px-3 py-2">CPC</th>
              <th className="px-3 py-2">Заказы</th>
              <th className="px-3 py-2">Расход</th>
              <th className="px-3 py-2">Доход</th>
              <th className="px-3 py-2">ROMI</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={`${c.campaignId}-${c.date}`} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/60">
                <td className="px-3 py-2 font-medium text-slate-800">{c.campaignName}</td>
                <td className="px-3 py-2">{c.impressions.toLocaleString('ru-RU')}</td>
                <td className="px-3 py-2">{c.clicks.toLocaleString('ru-RU')}</td>
                <td className="px-3 py-2">{c.ctr.toFixed(2)}%</td>
                <td className="px-3 py-2">{c.cpc.toFixed(2)} ₽</td>
                <td className="px-3 py-2">{c.orders.toLocaleString('ru-RU')}</td>
                <td className="px-3 py-2">{c.spend.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</td>
                <td className="px-3 py-2">{c.revenue.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</td>
                <td className={`px-3 py-2 font-semibold ${c.romi < 0 ? 'text-red-600' : c.romi < 80 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {c.romi.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
