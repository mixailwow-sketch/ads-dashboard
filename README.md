# Ads Dashboard (Click.ru + Google Sheets)

Production-ready SaaS dashboard на Next.js для анализа рекламных кампаний.

## Что внутри

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, Recharts.
- **Backend**: API route `/api/dashboard` внутри Next.js.
- **Интеграции**:
  - Click.ru API (`https://click.ru/agency/user`)
  - Google Sheets API (чтение таблицы по `spreadsheetId`)
- **Логика**:
  - объединение по `campaign_id` (fallback: `campaign_name`)
  - ROMI = `(revenue - spend) / spend * 100`
  - KPI, график, таблица, аналитический блок, warnings

## Структура

```bash
src/
  app/
    api/dashboard/route.ts
    layout.tsx
    page.tsx
  components/
    AnalyticsBlock.tsx
    CampaignTable.tsx
    FiltersBar.tsx
    KpiCards.tsx
    PerformanceChart.tsx
    WarningsPanel.tsx
  hooks/
    useDashboardData.ts
  lib/api/
    click.ts
    googleSheets.ts
  services/
    analytics.ts
  types/
    analytics.ts
```

## Локальный запуск

1. Установить зависимости:
   ```bash
   npm install
   ```
2. Создать `.env.local` на основе `.env.example`.
3. Запустить dev-сервер:
   ```bash
   npm run dev
   ```
4. Открыть `http://localhost:3000`.

## Деплой в Vercel

1. Push в GitHub.
2. Import project в Vercel.
3. В Settings → Environment Variables добавить:
   - `CLICK_API_TOKEN`
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SHEETS_RANGE` (опционально)
4. Deploy.

## Деплой в Render / VPS

- Build command: `npm run build`
- Start command: `npm run start`
- Node version: 18+
- Добавить те же переменные окружения.
