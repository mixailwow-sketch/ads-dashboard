import { WarningItem } from '@/types/analytics';

const reasonText: Record<WarningItem['reason'], string> = {
  low_ctr: 'Низкий CTR',
  high_cpc: 'Высокий CPC',
  bad_romi: 'Низкий ROMI',
};

export function WarningsPanel({ warnings }: { warnings: WarningItem[] }) {
  return (
    <section className="card h-fit">
      <h2 className="section-title">Проблемы</h2>
      {warnings.length === 0 ? (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Критичных отклонений не найдено.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {warnings.slice(0, 10).map((item, index) => (
            <li className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900" key={`${item.campaignName}-${item.reason}-${index}`}>
              <strong>{item.campaignName}</strong>
              <div>{reasonText[item.reason]}: {item.value.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
