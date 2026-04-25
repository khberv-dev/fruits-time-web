# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build
npm run lint      # Run ESLint on .js/.jsx files
npm run preview   # Preview production build locally
```

## Environment

Copy `.env.example` to `.env` and configure:
- `VITE_BASE_API_URL` — backend API base URL
- `VITE_BASE_CDN_URL` — CDN base URL for media assets

Accessed in code via `src/services/config.js` using `import.meta.env`.

## Architecture

React 19 admin dashboard (no TypeScript). Key libraries: **React Router v7**, **TanStack React Query v5**, **Gravity UI**, **React Hook Form**, **Axios**, **Recharts**.

Path alias: `@` → `src/`

### Service Layer (`src/services/`)

Each domain (auth, catalog, product, banner, stats, user) has two files:
- `api.js` — raw axios functions
- `query.js` — React Query hooks (`useQuery`/`useMutation`) consumed by components

Central `services/api.js` creates the axios instance with auth interceptors: auto-attaches Bearer token on requests, auto-refreshes on 401, redirects to `/login` if refresh fails.

`services/query.js` exports `queryClient` and `useInfoMutation` — a wrapper around `useMutation` that shows toasts and invalidates queries on success.

`services/toaster.js` — singleton for global toast notifications (success/error/info).

### Providers (`src/providers/`)

Three React contexts mounted in `main.jsx`:
- **AuthContext** (`providers/auth.jsx`) — user state, logout, exposed via `useAuth()`
- **HeaderContext** (`providers/header.jsx`) — page title and back-button state for the app layout
- **ResourceLocaleContext** (`providers/resource-locale.jsx`) — locale switching with localStorage persistence

### Routing (`src/App.jsx`)

React Router v7 with a `<RequireAuth>` wrapper that redirects unauthenticated users to `/login`. All protected pages are nested under the `AppLayout`.

### UI Patterns

- Pages use `useHeader()` to set the header title/back button on mount
- Forms use React Hook Form; submission calls a mutation hook from the service layer
- Images are uploaded via the reusable `<ImageUpload>` component
- Destructive actions go through `<ConfirmDialog>` before firing mutations
- Active/inactive state is shown with a resource badge pattern

### Storage

- `access_token`, `refresh_token` — JWT tokens in localStorage
- `locale` — persisted language preference (`uz` supported)
