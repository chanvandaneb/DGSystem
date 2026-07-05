# DGSystem

Internal HR / operations dashboard — attendance tracking, KPIs, tasks, a credentials vault, knowledge base, and bookmarks.

**Stack:** Vue 3 + Vite + TypeScript + Tailwind CSS (shadcn-style UI kit) on the frontend, Express + SQLite (`better-sqlite3`) on the backend.

## Getting started

Requires Node 20+.

```bash
npm run install:all   # installs root, client, and server dependencies
npm run dev            # runs client (Vite) and server (Express) together
```

- Client: http://localhost:5173
- Server API: http://localhost:4000 (proxied through the client at `/api`)

On first run the server creates `server/data.sqlite` and seeds it with demo data automatically.

### Login

```
Username: user
Password: 123456
```

## Project structure

```
DGSystem/
  client/             Vue 3 + Vite app
    src/
      components/     UI kit (components/ui), layout, and feature components
      pages/           Route-level views
      router/          Vue Router routes + auth guard
      stores/          Pinia stores (auth, theme, sidebar)
      lib/             api client, utils
  server/             Express API
    src/
      data/            Seed data
      repositories/    SQLite-backed data access
      routes/          Express route handlers
      db.ts            SQLite connection + schema
      auth.ts          JWT auth middleware
```

## Scripts

Run from the repo root:

| Command | Description |
| --- | --- |
| `npm run dev` | Run client + server in dev mode (hot reload) |
| `npm run build` | Build the client for production |
| `npm run install:all` | Install dependencies in root, client, and server |

## Features

- **Dashboard** — personalized greeting, KPI cards computed from live data, working-hours trend chart with late-day highlighting, team presence donut, employee status board, recent breaks, announcements, earnings
- **Live attendance tracking** — the `/clock` screen records check-ins, typed breaks (WC / HR / Office Work / Other), and check-outs to SQLite; state survives reloads, late arrivals are flagged automatically, and records flow into the Attendances table, reports, and dashboard
- **KPI** — entries with role-based visibility (employees see their own), admin approve/reject review workflow, scores report, rules (create/edit/delete)
- **Announcements** — type icons and badges (Holiday / KPI / General / Urgent), pinning, relative timestamps; admins can publish, pin, and delete from the UI
- **Tasks** — table view with filters, Kanban board (drag-and-drop), bulk delete, scores
- **Accounts** — credentials vault with edit and bulk delete
- **Knowledge** — category browser + article archive
- **Bookmarks** — categorized link collections
- **Auth** — JWT-based login, protected API routes, role-based access control (admin/employee)
- **Other** — command palette (`⌘K`), notifications, light/dark theme with consistent themed scrollbars, collapsible sidebar, avatar upload with client-side resize

## Notes

- `server/data.sqlite` is gitignored — each environment gets its own local database, auto-seeded on first run.
- This is a demo/internal tool; the JWT secret defaults to a dev value (`server/src/auth.ts`) unless `JWT_SECRET` is set in the environment.
