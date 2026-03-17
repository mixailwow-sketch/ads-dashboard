import { AggregateSummary } from '@/types/analytics';

type Props = { summary: AggregateSummary };

const cards = [
  { key: 'clicks', label: 'Клики' },
  { key: 'impressions', label: 'Показы' },
  { key: 'spend', label: 'Расход, ₽' },
  { key: 'revenue', label: 'Доход, ₽' },
  { key: 'orders', label: 'Заказы' },
  { key: 'romi', label: 'ROMI, %' },
] as const;

export function KpiCards({ summary }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <article className="card" key={card.key}>
          <p className="text-xs text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{Number(summary[card.key]).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}</p>
        </article>
      ))}
    </section>
  );
}
