# FILESYSTEM.md Website

Official website and docs for the `FILESYSTEM.md` standard: a filesystem-first contract for agent identity, memory, execution, and interoperability.

## What This Site Contains

- Manifesto post: `/posts/filesystem-manifesto/`
- Getting started guide: `/getting-started/`
- Standards comparison: `/compare/`
- FAQ: `/faq/`
- Community + contribution guidance: `/community/`
- Showcase: `/showcase/`
- Reading list: `/readinglist/`

Legacy manifesto paths are redirected in `astro.config.ts`:

- `/manifesto`
- `/filesystem-manifesto`
- `/filesystem`

All redirect to `/posts/filesystem-manifesto/`.

## Tech Stack

- Astro 5
- Tailwind CSS 4
- Cloudflare adapter (`@astrojs/cloudflare`)
- Astro Content Collections for docs/posts

## Project Structure

```text
src/
  content/
    docs/          # standalone documentation pages
    post/          # blog posts, including the manifesto post
  pages/           # route entrypoints (.astro + .md.ts raw endpoints)
  site.config.ts   # site metadata + menu links
astro.config.ts    # Astro config + redirects + integrations
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Build

```bash
npm run build
```

Optional search index build:

```bash
npm run postbuild
```

## Content Editing

### Update core docs pages

Edit files under `src/content/docs/`:

- `getting-started.md`
- `compare.md`
- `faq.md`
- `community.md`
- `showcase.md`
- `readinglist.md`

Routes are served by matching files in `src/pages/` (for example `src/pages/faq.astro`).

### Update manifesto

- Primary post: `src/content/post/filesystem-manifesto.md`
- Home CTA and landing blocks: `src/pages/index.astro`

### Update navigation

- Header/footer links: `src/site.config.ts` (`menuLinks`)

## Raw Markdown Endpoints

These routes return markdown source directly:

- `/filesystem.md`
- `/showcase.md`
- `/readinglist.md`
- `/getting-started.md`
- `/compare.md`
- `/faq.md`
- `/community.md`

Implemented in `src/pages/*.md.ts`.

## Deployment

Configured for Cloudflare via `@astrojs/cloudflare` in `astro.config.ts`.

Before production deploy:

1. Set the canonical URL in `src/site.config.ts` (`siteConfig.url`).
2. Review `wrangler.json` bindings/environment.
3. Run `npm run build`.

## License

MIT
