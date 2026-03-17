'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ClickAccount, DashboardResponse } from '@/types/analytics';

type State = {
  data: DashboardResponse | null;
  isLoading: boolean;
  error: string | null;
};

export function useDashboardData() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [account, setAccount] = useState<ClickAccount>('1');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [state, setState] = useState<State>({ data: null, isLoading: true, error: null });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const params = new URLSearchParams();
      params.set('account', account);
      if (from) params.set('from', from);
      if (to) params.set('to', to);

      const res = await fetch(`/api/dashboard?${params.toString()}`);
      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload?.message ?? 'Failed to load dashboard');
      }

      setState({ data: payload as DashboardResponse, isLoading: false, error: null });
    } catch (error) {
      setState({ data: null, isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }, [account, from, to]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredData = useMemo(() => {
    if (!state.data || !campaignFilter) return state.data;
    const value = campaignFilter.toLowerCase();
    return {
      ...state.data,
      campaigns: state.data.campaigns.filter((campaign) => campaign.campaignName.toLowerCase().includes(value)),
    };
  }, [campaignFilter, state.data]);

  return {
    ...state,
    data: filteredData,
    from,
    to,
    account,
    campaignFilter,
    setFrom,
    setTo,
    setAccount,
    setCampaignFilter,
    refresh: load,
  };
}
