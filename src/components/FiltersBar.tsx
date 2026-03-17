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
    <section className="card grid gap-3 md:grid-cols-4">
      <input className="rounded-lg border border-slate-300 px-3 py-2" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input className="rounded-lg border border-slate-300 px-3 py-2" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      <input
        className="rounded-lg border border-slate-300 px-3 py-2"
        placeholder="Фильтр по названию кампании"
        value={campaignFilter}
        onChange={(e) => setCampaignFilter(e.target.value)}
      />
      <button onClick={onRefresh} className="rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-blue-700" type="button">
        Refresh
      </button>
    </section>
  );
}
