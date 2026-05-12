# Avokati AI — Landing Page

Landing page for [Avokati AI](https://avokati.vercel.app), the first AI-powered legal assistant for Albanian-language Kosovo legislation.

**Product by:** Pixellent Solutions LLC

## Stack

- React 19 + Vite + Tailwind CSS
- Deployed to GitHub Pages via GitHub Actions

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the build locally
```

## Deploy

Push to `main` — GitHub Actions deploys to GitHub Pages automatically.

## Sections

- **Hero** — Tagline + CTAs (Try AvokAI, Request Demo)
- **Pipeline** — Interactive SVG visualization of the AvokAI data flow
- **Metrics** — 80% Recall@5, 100% direct citation, 98.2% citation verification
- **Features** — Citation lookup, abolishment detection, hybrid search, Albanian-native
- **Demo** — 6 example queries linking to the live app
- **Tech Stack** — DeepSeek, Pinecone, OpenAI, PyMuPDF, FastAPI, Cloud Run
- **Contact** — Lead capture form

## Links

- Live app: https://avokati.vercel.app
- Backend: GCP Cloud Run `europe-west1`
- Architecture: [`docs/AVOKAI_ARCHITECTURE.md`](../juris-automation/docs/AVOKAI_ARCHITECTURE.md)
