import { AggregateSummary } from '@/types/analytics';

type Props = { summary: AggregateSummary };

const cards = [
  { key: 'impressions', label: 'Просмотры', tone: 'from-blue-50 to-blue-100' },
  { key: 'clicks', label: 'Переходы', tone: 'from-indigo-50 to-indigo-100' },
  { key: 'orders', label: 'Покупки', tone: 'from-emerald-50 to-emerald-100' },
  { key: 'spend', label: 'Расход, ₽', tone: 'from-teal-50 to-teal-100' },
  { key: 'revenue', label: 'Доход, ₽', tone: 'from-amber-50 to-amber-100' },
  { key: 'romi', label: 'ROMI, %', tone: 'from-violet-50 to-violet-100' },
] as const;

export function KpiCards({ summary }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <article className={`card bg-gradient-to-br ${card.tone}`} key={card.key}>
          <p className="text-sm font-medium text-slate-600">{card.label}</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {Number(summary[card.key]).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}
          </p>
        </article>
      ))}
    </section>
  );
}
