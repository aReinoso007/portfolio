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

## Deploy

### GitHub Pages (recommended)

Pushes to `main` automatically deploy via GitHub Actions.

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` — the workflow builds and publishes to GitHub Pages.

Your site will be live at:

- `https://<username>.github.io/<repo-name>/` (project site)
- `https://<username>.github.io/` (if the repo is named `<username>.github.io`)

### Other platforms

This site also works on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

## Structure

- `src/data/cv.ts` — All CV content (easy to update)
- `src/components/` — UI sections (Hero, About, Experience, Skills, Education, Contact)
