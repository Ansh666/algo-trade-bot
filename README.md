# AI Trade Bot

Personal AI-assisted intraday trading control center for India’s NSE market.

This project is designed for **paper trading first**. It combines market indicators, signal review, position protection, risk controls, and a virtual wallet into a single dashboard. Live broker execution is intentionally not enabled by default.

## Highlights

- Parent Bot and Child Bot architecture foundation
- NSE-focused instrument monitoring for liquid Nifty stocks
- Signal analysis using volume, support/resistance, EMA, VWAP, and risk/reward
- Immediate stop-loss and trailing-stop state tracking
- Minimum 1:2 risk/reward validation in the trading workflow
- Daily profit caps and loss limits
- Paper-trading virtual wallet ledger
- Emergency stop control
- Dashboard views for signals, positions, orders, trades, instruments, wallet, and settings
- OpenAPI-first API contracts with generated TypeScript clients and Zod schemas
- PostgreSQL persistence through Drizzle ORM

## Product status

| Area | Status |
| --- | --- |
| Paper trading dashboard | Available |
| Seeded sample NSE data | Available |
| Virtual wallet and ledger | Available |
| Risk and session settings | Available |
| Live Upstox market data | Planned |
| Live order execution | Planned |
| Automated Parent/Child orchestration | Planned |

This is a software project, not financial advice. Trading involves substantial risk; paper trading and backtesting do not guarantee live results.

## Project structure

```text
artifacts/
  trading-bot/        React + Vite dashboard
  api-server/         Express API server
  trading-bot-guide/  Step-by-step presentation
  trading-bot-video/  Animated product video
lib/
  api-spec/           OpenAPI contract
  api-client-react/   Generated React Query client
  api-zod/            Generated server schemas
  db/                 Drizzle schema and database package
```

## Running locally

Install dependencies:

```bash
pnpm install
```

Configure a PostgreSQL connection and session secret through your environment or Replit Secrets. Never commit `.env` files or credentials.

Start the API server:

```bash
pnpm --filter @workspace/api-server run dev
```

Start the dashboard:

```bash
pnpm --filter @workspace/trading-bot run dev
```

The workspace also contains workflows for the presentation, product video, and component preview artifacts.

## Database

The schema is managed with Drizzle. The seed process creates the sample paper-trading dataset and resets trading tables, so do not run it against data that must be preserved.

## Safety principles

- Paper Mode is the default.
- Live Mode requires an explicit settings change and confirmation.
- Every position should have a defined stop-loss before execution.
- Daily loss limits and emergency controls should remain available.
- Broker credentials belong in secure environment storage, never in source control.

## License

No open-source license has been selected yet. Treat this repository as private project code unless a license is added.