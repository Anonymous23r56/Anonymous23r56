# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Portfolio (`artifacts/portfolio`) — served at `/`
- React + Vite single-page developer portfolio
- Dark-first design with deep navy/electric blue theme
- Google Fonts: JetBrains Mono, Inter, Outfit
- Sections: Hero, Projects (GitHub API), GitHub Stats, Tech Stack, Contact
- GitHub integration via public REST API (configurable via `src/config.ts`)
- Live code demo modal using StackBlitz embeds
- Framer Motion animations (scroll-triggered reveals, staggered entrances)
- Tech stack badges with `react-icons/si`
- No backend required — fully client-side

**Config:** `artifacts/portfolio/src/config.ts` — update `GITHUB_USERNAME`, `GITHUB_DISPLAY_NAME`, `GITHUB_BIO`, `CONTACT_EMAIL`, and `LINKEDIN_URL` with your own details. GitHub data is fetched from the public GitHub API (no token required): `/users/{username}/repos` sorted by stars for the Projects section.

### API Server (`artifacts/api-server`) — served at `/api`
- Express 5 backend with health endpoint

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
