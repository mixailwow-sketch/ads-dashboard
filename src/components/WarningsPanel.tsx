import { WarningItem } from '@/types/analytics';

const reasonText: Record<WarningItem['reason'], string> = {
  low_ctr: 'Низкий CTR',
  high_cpc: 'Высокий CPC',
  bad_romi: 'Плохой ROMI',
};

export function WarningsPanel({ warnings }: { warnings: WarningItem[] }) {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold">Предупреждения</h2>
      {warnings.length === 0 ? (
        <p className="mt-3 text-sm text-emerald-700">Критичных отклонений не найдено.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {warnings.slice(0, 8).map((item, index) => (
            <li className="rounded-md bg-amber-50 px-3 py-2 text-amber-800" key={`${item.campaignName}-${item.reason}-${index}`}>
              <strong>{item.campaignName}</strong>: {reasonText[item.reason]} ({item.value.toFixed(2)})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
