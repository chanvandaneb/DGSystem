# DGSystem

<div align="center">

![DGSystem](https://img.shields.io/badge/DGSystem-Internal%20Dashboard-2563EB?style=for-the-badge&logo=vue.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Express](https://img.shields.io/badge/Express%205-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Internal HR & Operations Dashboard — built with Vue 3 + Express + SQLite**

</div>

---

## ✨ Features

| Module | Description |
|---|---|
| 📊 **Dashboard** | KPI cards, working hours trend chart, team presence & attendance overview |
| 🕐 **Attendance** | Check-in/out records, breaks log, reports, and live clock check-in screen |
| 📈 **KPI** | KPI entries with approval workflow, scoring, and rules management |
| ✅ **Tasks** | Table view with filters, Kanban board (drag-and-drop), and bulk actions |
| 🔐 **Accounts** | Credentials vault with full CRUD, bulk delete, and inline editing |
| 📚 **Knowledge** | Category browser and article archive |
| 🔖 **Bookmarks** | Categorized link collections with grid / list / kanban views |
| 📣 **Announcements** | Pinnable announcements with Holiday / KPI / General / Urgent types |
| 🔔 **Notifications** | Per-item mark-as-read with unread badge counter |
| 🔍 **Command Palette** | Global search modal with `⌘K` shortcut |
| 🌙 **Theme** | Light / Dark mode toggle with consistent themed scrollbars |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20+
- **npm** v8+

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/chanvandaneb/DGSystem.git
cd DGSystem

# 2. Install all dependencies (root + client + server)
npm run install:all

# 3. Start development servers
npm run dev
```

| Service | URL |
|---|---|
| Client (Vue + Vite) | http://localhost:5173 |
| API (Express) | http://localhost:4000 |

> On first run, the server automatically creates `server/data.sqlite` and seeds it with demo data.

### 🔑 Default Login

```
Username : vanda
Password : 1234
```

---

## 🗂 Project Structure

```
DGSystem/
├── client/                  # Vue 3 + Vite frontend
│   └── src/
│       ├── components/      # UI kit, layout & feature components
│       │   ├── ui/          # shadcn-style primitives (Button, Card, Table…)
│       │   ├── layout/      # Sidebar, Header, Notifications, Command Palette
│       │   └── ...          # Feature components (tasks, accounts, kpi…)
│       ├── pages/           # Route-level views
│       ├── router/          # Vue Router + JWT auth guard
│       ├── stores/          # Pinia stores (auth, theme, sidebar)
│       └── lib/             # API client, utilities
│
└── server/                  # Express 5 + SQLite backend
    └── src/
        ├── data/            # Seed data files
        ├── repositories/    # SQLite-backed data access layer
        ├── routes/          # Express route handlers
        ├── db.ts            # SQLite connection & schema
        └── auth.ts          # JWT authentication middleware
```

---

## 🛠 Tech Stack

**Frontend**
- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + TypeScript
- [Tailwind CSS v3](https://tailwindcss.com/) with shadcn-style design tokens
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vue Router](https://router.vuejs.org/) — client-side routing with auth guard
- [@tanstack/vue-table](https://tanstack.com/table) — sortable, filterable data tables
- [reka-ui](https://reka-ui.com/) — headless UI primitives
- [lucide-vue-next](https://lucide.dev/) — icons

**Backend**
- [Express 5](https://expressjs.com/) + TypeScript
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — SQLite with WAL mode
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JWT authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — password hashing

---

## 📜 Scripts

Run from the **project root**:

| Command | Description |
|---|---|
| `npm run dev` | Start client + server in dev mode (hot reload) |
| `npm run build` | Build the client for production |
| `npm run install:all` | Install dependencies for root, client & server |

---

## 🔒 Notes

- `server/data.sqlite` is gitignored — each environment gets its own local database, auto-seeded on first run.
- The JWT secret defaults to a development value. Set `JWT_SECRET` as an environment variable in production.
- To reset all data: delete `server/data.sqlite` and restart the server.

---

<div align="center">

Made with ❤️ by the DG Group team

</div>
