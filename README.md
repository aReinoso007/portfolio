# Alex Reinoso — Portfolio

Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## Deploy on Vercel (recommended)

This project is configured for Vercel with `vercel.json`. No base path is needed (served from `/`).

### Option A — Vercel Dashboard

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Vite — keep defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy. Every push to `main` redeploys automatically.

Open Graph URLs are filled in at build time from Vercel’s `VERCEL_PROJECT_PRODUCTION_URL`. For a custom domain, add it in **Project Settings → Domains** — previews and sharing will use that URL.

Optional: set `VITE_SITE_URL` in **Project Settings → Environment Variables** if you want to override (no trailing slash).

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts, then `vercel --prod` for production.

## Structure

- `src/data/cv.ts` — All CV content (easy to update)
- `src/components/` — UI sections (Hero, About, Experience, Projects, Skills, Education, Contact)
- `vercel.json` — Vercel build and SPA routing config
