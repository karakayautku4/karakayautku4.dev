# karakayautku4.dev

Personal website of Utku Karakaya, built as a static site with vanilla HTML, CSS, and JavaScript.

## Overview

The site combines a traditional multi-page structure with a desktop-style homepage experience on larger screens.

Current highlights:
- Desktop-inspired home screen with draggable, resizable app windows, menubar, dock, and desktop shortcuts
- Separate mobile home experience with the standard page layout instead of the desktop runtime
- Custom profile windows for social platforms that do not embed reliably
- GitHub profile app powered by public GitHub API data
- In-window CV document viewer
- Photos app backed by local image assets
- Message Me desktop app that opens a prefilled email draft to `k4utku@gmail.com`
- Static build pipeline for HTML, CSS, and sitemap generation

## Stack

- HTML
- CSS
- Vanilla JavaScript modules
- Node.js build script

## Runtime Notes

- Desktop mode is enabled on the homepage above the desktop breakpoint and runs through the desktop runtime module.
- Mobile and smaller tablet widths fall back to the standard responsive homepage layout.
- Internal pages remain static multi-page documents and can also be rendered in embedded mode for desktop windows.

## Project Structure

```text
.
├── .github/
│   └── workflows/
├── assets/
│   ├── css/
│   │   └── src/
│   ├── images/
│   └── js/
│       └── modules/
├── pages/
├── build.js
├── CNAME
├── index.html
├── package.json
├── robots.txt
└── sitemap.xml
```

## Development

Requirements:
- Node.js 18+

Recommended:
- Node.js 24 locally if you want parity with the GitHub Pages workflow

Available scripts:

```bash
npm run build
npm run watch
npm run build:css
npm run build:html
```

## Deployment

This project is structured for static hosting and is currently configured for GitHub Pages via the production domain:

- https://karakayautku4.dev

Deployments are handled automatically on pushes to `main` through GitHub Actions in `.github/workflows/deploy.yml`.

The workflow currently uses:
- `actions/checkout@v6`
- `actions/setup-node@v6` with Node.js 24
- `actions/configure-pages@v6`
- `actions/upload-pages-artifact@v4`
- `actions/deploy-pages@v5`

Before pushing deployment-related changes, run:

```bash
npm run build
```

## License

This project is open source under the MIT License. See [LICENSE](LICENSE).

If you reuse this project or substantial parts of it, keeping a reference to
Utku Karakaya or linking back to the original repository/site is appreciated.
That attribution note is a request, not an extra restriction beyond the MIT
License.
