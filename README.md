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
Username: chanvandaneb
Password: dgsystem123
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

- **Dashboard** — KPI cards, employee status board, recent breaks, announcements, earnings
- **Attendance** — check-in/out records, reports, breaks, plus a live `/clock` check-in screen
- **KPI** — entries, scores report, rules (create/edit/delete), categories
- **Tasks** — table view with filters, Kanban board (drag-and-drop), bulk delete, scores
- **Accounts** — credentials vault with full CRUD and bulk delete
- **Knowledge** — category browser + article archive
- **Bookmarks** — categorized link collections
- **Auth** — JWT-based login, protected API routes
- **Other** — command palette (`⌘K`), notifications, light/dark theme, collapsible sidebar

## Notes

- `server/data.sqlite` is gitignored — each environment gets its own local database, auto-seeded on first run.
- This is a demo/internal tool; the JWT secret defaults to a dev value (`server/src/auth.ts`) unless `JWT_SECRET` is set in the environment.
