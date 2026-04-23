'use client';

import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DailySeriesPoint } from '@/types/analytics';

export function PerformanceChart({ data }: { data: DailySeriesPoint[] }) {
  return (
    <section className="card">
      <h2 className="section-title">Доход и расход по дням</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbe2f0" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="clicks" fill="#10b981" name="Клики" radius={[6, 6, 0, 0]} />
            <Bar yAxisId="left" dataKey="spend" fill="#f59e0b" name="Расход" radius={[6, 6, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#ef4444" strokeWidth={2} dot={false} name="CTR" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
