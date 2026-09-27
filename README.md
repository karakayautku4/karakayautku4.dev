# karakayautku4.dev

Personal website of Utku Karakaya. A small static Astro site: Home, About, and Projects, plus a downloadable CV.

## Stack

- [Astro](https://astro.build) static output
- Typed content in `src/data/site.ts`
- Pages rendered to HTML at build time
- No client-side application runtime

## Local preview

Requirements: Node.js 18 or newer. The GitHub Pages workflow uses Node.js 24.

```bash
npm install
npm run dev
```

The dev server prints a local URL, usually http://localhost:4321.

Production build and local preview of that build:

```bash
npm run build
npm run preview
```

`npm run build` writes the site to `dist/`.

## Project structure

```text
.
├── public/                 # CV, profile image, favicon, CNAME
├── src/
│   ├── components/
│   ├── data/site.ts        # locked copy, roles, skills, links
│   ├── layouts/
│   ├── pages/              # /, /about, /projects
│   └── styles/
├── astro.config.mjs
└── package.json
```

## Deployment

The live site is https://karakayautku4.dev.

GitHub Actions (`.github/workflows/deploy.yml`) deploys only from `main`:

1. `npm ci`
2. `npm run build`
3. Package `dist/` as the GitHub Pages artifact
4. Deploy with `actions/deploy-pages`

This workflow still uses the existing Pages artifact format (an uncompressed `github-pages` tar uploaded with `actions/upload-artifact`). It publishes the Astro `dist/` directory instead of the repository root. Merging the Astro remake is what switches production. A pull request does not deploy.

For Cloudflare Pages later, use:

- Build command: `npm run build`
- Output directory: `dist`

Keep `public/CNAME` if the custom domain stays on GitHub Pages.

## License

This project is open source under the MIT License. See [LICENSE](LICENSE).

If you reuse this project or substantial parts of it, keeping a reference to
Utku Karakaya or linking back to the original repository/site is appreciated.
That attribution note is a request, not an extra restriction beyond the MIT
License.
