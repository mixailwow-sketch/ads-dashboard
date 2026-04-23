'use client';

type Props = {
  from: string;
  to: string;
  campaignFilter: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setCampaignFilter: (value: string) => void;
  onRefresh: () => void;
};

export function FiltersBar({ from, to, campaignFilter, setFrom, setTo, setCampaignFilter, onRefresh }: Props) {
  return (
    <section className="card grid w-full gap-3 md:grid-cols-4 xl:max-w-3xl">
      <label className="filter-field">
        <span>Начало</span>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      </label>
      <label className="filter-field">
        <span>Конец</span>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label className="filter-field md:col-span-2">
        <span>Кампания</span>
        <input placeholder="Фильтр по названию кампании" value={campaignFilter} onChange={(e) => setCampaignFilter(e.target.value)} />
      </label>
      <button onClick={onRefresh} className="btn-primary md:col-span-4" type="button">
        Обновить данные
      </button>
    </section>
  );
}
