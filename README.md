# karakayautku4.dev

Personal website of Utku Karakaya, built as a static site with vanilla HTML, CSS, and JavaScript.

## Overview

The site combines a traditional multi-page structure with a desktop-style homepage experience.

Current highlights:
- Desktop-inspired home screen with draggable, resizable app windows
- Custom profile windows for social platforms that do not embed reliably
- GitHub profile app powered by public GitHub API data
- In-window CV document viewer
- Photos app backed by local image assets
- Static build pipeline for HTML, CSS, and sitemap generation

## Stack

- HTML
- CSS
- Vanilla JavaScript modules
- Node.js build script

## Project Structure

```text
.
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── pages/
├── build.js
├── index.html
├── robots.txt
└── sitemap.xml
```

## Development

Requirements:
- Node.js 18+

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

Before deploying, run:

```bash
npm run build
```

## License

This project is open source under the MIT License. See [LICENSE](LICENSE).

If you reuse this project or substantial parts of it, keeping a reference to
Utku Karakaya or linking back to the original repository/site is appreciated.
That attribution note is a request, not an extra restriction beyond the MIT
License.
