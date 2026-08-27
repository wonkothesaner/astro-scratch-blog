# Sane Musings (wts.services)

Martin Driscoll's personal site and blog — built with [Astro](https://astro.build) and [EmDash](https://www.emdashcms.dev/), deployed to Cloudflare Workers.

## Stack

- **Astro 7.2.8**, server output, `@astrojs/cloudflare` adapter
- **EmDash** — Cloudflare's Astro-native CMS, providing the admin UI at `/_emdash/admin` and a database-backed content layer
- **Cloudflare D1** (database) and **R2** (media storage) — the same bindings are used for both local development (via `wrangler dev`'s local simulation) and production, so there's no separate dev/prod config to maintain
- **Oxlint** (linting), **Oxfmt** + **Prettier**/`prettier-plugin-astro` (formatting)
- Deployed via **Cloudflare Workers Builds** (native Git integration — pushes to `master` build and deploy automatically, no GitHub Actions involved)

## Content model

Not everything on the site is EmDash-managed. Two different content sources coexist by design:

| Source | What lives there | Why |
| --- | --- | --- |
| **EmDash** (database, editable via `/_emdash/admin`) | `/wisdom`, `/glossary`, `/projects`, most blog posts, the home page body copy | Editor-managed content — add/edit without a code change or rebuild |
| **File-based** (`src/content/blog/*.mdx`, `src/pages/about.astro`) | Two blog posts (`markdown-style-guide`, `using-mdx`) that are themselves documentation about Astro/Markdown/MDX with embedded components, plus the About page (image-heavy, uses a custom `MediaObject` layout pattern EmDash has no equivalent for yet) | Developer-authored content with embedded Astro components — needs a rebuild to change, which is the right tradeoff for content that's really "docs about the codebase" rather than editorial writing |

`src/pages/blog/[category]/[slug].astro` looks up EmDash first, then falls back to the file-based collection, so both sources render under the same `/blog/<category>/<slug>` URL shape. `src/utils/blog.ts` has the shared normalization helpers (`postCardFromFile`/`postCardFromEmdash`) used by the blog listing, the homepage's recent-posts list, and `rss.xml.js` to merge and sort both sources together.

## Local development

**Prerequisites:** Node ≥22.19, and `wrangler` logged in to the Cloudflare account (`npx wrangler login`) — local dev runs through `wrangler dev`, which uses the real `workerd` runtime with local simulations of the D1 database and R2 bucket (backed by `.wrangler/state`, gitignored). This means dev behavior matches production closely, including bindings — there's no separate SQLite/local-filesystem fallback.

```sh
npm install
npm run dev          # starts at localhost:4321 via wrangler dev
npm run dev:clean    # same, but clears .astro/.vite/dist caches first — use this after
                      # config changes; stale Vite dep-optimizer caches have caused
                      # confusing errors more than once on this project
```

Once running, visit `http://localhost:4321/_emdash/admin` to manage EmDash content. First run walks you through a setup wizard to create an admin account (passkey-based).

**Never runs the dev server itself:** by project convention, the assistant/agent working on this repo doesn't start `npm run dev` — that's owned by whoever's at the keyboard, since only one instance can hold the port and cache-clearing races have caused real problems here before.

### Tooling

```sh
npm run lint           # oxlint — frontmatter + <script> blocks in .astro, plus all .ts/.js/.mjs
npm run format          # prettier (--astro files only) + oxfmt (everything else)
npm run format:check    # same, without writing
npx astro check          # type-checks .astro files, including templates — the safety net
                          # oxlint doesn't cover, since it doesn't parse Astro templates
```

Before any `npm run build`, run `npx astro check` first and confirm the dev server's state — build failures are much easier to diagnose with a clean type-check first.

## Deployment

Production deploys automatically via **Cloudflare Workers Builds** on every push to `master` — no manual `wrangler deploy` needed. Non-production branches also build automatically (enabled in the Workers Builds dashboard settings) as isolated preview deployments with their own `workers.dev` URL, so a feature branch can be verified live before merging.

Key points if touching deployment config:

- `wrangler.jsonc` defines the D1 (`DB`) and R2 (`MEDIA`) bindings, plus static asset serving. The `SESSION` (KV) and `IMAGES` bindings auto-provision on first deploy.
- Because Workers (unlike Pages) don't support separate bindings per branch, **every branch build shares the same D1 database and R2 bucket** — there's one live dataset, not per-branch isolation.
- The Cloudflare Images binding used for `astro:assets` processing in production doesn't support SVG as an output format — see `src/layouts/BlogPost.astro` for how file-based SVG hero images are routed around it (plain `<img>` tag, no optimization needed for vector images anyway).
- `/_emdash/admin` should be gated with **Cloudflare Access** (using the account's Zero Trust subscription) before the site is live on its real domain — passkey auth alone is fine for a `workers.dev` preview but the admin route is otherwise a normal public endpoint.

## Project structure

```text
├── src/
│   ├── components/       # Astro components, incl. EmDash render helpers (ImpactBlock, etc.)
│   ├── content/blog/      # File-based posts (see Content model above)
│   ├── content.config.ts  # File-based collection schema (blog only — wisdom/glossary/
│   │                       # projects moved to EmDash, this file just keeps shared types)
│   ├── layouts/           # BaseLayout, BlogPost (shared between EmDash + file-based posts)
│   ├── live.config.ts     # EmDash's live-collections loader registration
│   ├── pages/              # Routes — several query EmDash + astro:content together
│   └── utils/blog.ts       # Shared normalization between EmDash and file-based posts
├── astro.config.mjs
├── wrangler.jsonc          # Cloudflare bindings (D1, R2, assets)
├── .oxlintrc.json / .oxfmtrc.json / .prettierrc.json
└── package.json
```
