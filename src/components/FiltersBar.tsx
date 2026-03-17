'use client';

import { ClickAccount } from '@/types/analytics';

type Props = {
  from: string;
  to: string;
  account: ClickAccount;
  campaignFilter: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setAccount: (value: ClickAccount) => void;
  setCampaignFilter: (value: string) => void;
  onRefresh: () => void;
};

export function FiltersBar({ from, to, account, campaignFilter, setFrom, setTo, setAccount, setCampaignFilter, onRefresh }: Props) {
  return (
    <section className="card grid gap-3 md:grid-cols-5">
      <select className="rounded-lg border border-slate-300 px-3 py-2" value={account} onChange={(e) => setAccount(e.target.value as ClickAccount)}>
        <option value="1">ИП Сытин (ключ 1)</option>
        <option value="2">ИП Карпачев (ключ 2)</option>
      </select>
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
