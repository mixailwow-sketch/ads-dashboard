'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DailySeriesPoint } from '@/types/analytics';

export function PerformanceChart({ data }: { data: DailySeriesPoint[] }) {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold">Динамика по датам</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#2563eb" strokeWidth={2} name="Клики" />
            <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#0f766e" strokeWidth={2} name="Расход" />
            <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#dc2626" strokeWidth={2} name="CTR" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
