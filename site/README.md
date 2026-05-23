# Aowei Blog

Personal blog and project index built with Astro.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4321/`.

## Cloudflare Pages

Use these build settings:

```text
Root directory: site
Build command: npm run build
Build output directory: dist
Node version: 22.12.0 or newer
```

## Content

- Blog posts: `src/content/blog/*.md`
- Projects: `src/content/projects/*.md`

Set `draft: true` to hide a post or project from production lists.
