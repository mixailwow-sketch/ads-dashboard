# Ads Dashboard (Click.ru + Google Sheets)

Production-ready SaaS dashboard на Next.js для анализа рекламных кампаний.

## Что внутри

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, Recharts.
- **Backend**: API route `/api/dashboard` внутри Next.js (если Google Sheets не настроен, API продолжит работать только с Click.ru).
- **Интеграции**:
  - Click.ru API (`https://click.ru/agency/user`), поддержка двух аккаунтов через `account=1|2`
  - Google Sheets API (чтение таблицы по `spreadsheetId`, опционально)
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

## Переменные окружения

```bash
CLICK_API_TOKEN=...            # fallback токен
CLICK_API_TOKEN_1=...          # account=1
CLICK_API_TOKEN_2=...          # account=2
GOOGLE_SHEETS_API_KEY=...      # optional
GOOGLE_SHEETS_SPREADSHEET_ID=... # optional
GOOGLE_SHEETS_RANGE=Sheet1!A:G
```

## API примеры

- `GET /api/dashboard?account=1`
- `GET /api/dashboard?account=2&from=2026-03-01&to=2026-03-17`

## Деплой в Vercel

1. Push в GitHub.
2. Import project в Vercel.
3. В Settings → Environment Variables добавить:
   - `CLICK_API_TOKEN` (или `CLICK_API_TOKEN_1` / `CLICK_API_TOKEN_2`)
   - `GOOGLE_SHEETS_API_KEY` (опционально)
   - `GOOGLE_SHEETS_SPREADSHEET_ID` (опционально)
   - `GOOGLE_SHEETS_RANGE` (опционально)
4. Deploy.

## Деплой в Render / VPS

- Build command: `npm run build`
- Start command: `npm run start`
- Node version: 18+
- Добавить те же переменные окружения.
