# FILESYSTEM.md

A markdown-first primer on Unix-style filesystems, rendered with Astro and deployable to Cloudflare Workers. The homepage pulls its content from `src/content/docs/filesystem.md` and links straight to the raw Markdown so it can be consumed as a text document.

## Quick start

```bash
npm install
npm run dev     # start the local server
npm run build   # build for production
npm run preview # serve the built assets locally
```

## Project layout

- `src/content/docs/filesystem.md` — primary Markdown document for the site content.
- `src/pages/index.astro` — wraps the Markdown in site chrome and adds source links.
- `src/components/` — shared UI parts (head, header, footer).
- `public/` — static assets such as fonts and the favicon.

The raw Markdown file is also available at:
`https://raw.githubusercontent.com/JetSquirrel/FILESYSTEM.md/main/src/content/docs/filesystem.md`
