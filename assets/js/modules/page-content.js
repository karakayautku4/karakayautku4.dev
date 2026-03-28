/**
 * Page body template registry.
 * @module page-content
 */

import { HOME_COPY, ABOUT_COPY, PROJECTS_COPY } from './copy-content.js';

function renderActions(actions) {
  if (!actions.length) {
    return '';
  }

  return actions.map(action => {
    const className = action.variant === 'solid' ? 'btn-solid' : 'btn-outline';
    const attrs = action.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${action.href}" class="${className}"${attrs}>${action.label}</a>`;
  }).join('');
}

function renderHomeSignals(signals) {
  return signals.map(signal => {
    const isEmbeddedMap = signal.visual === 'map' && signal.embedUrl;
    const isCardLink = signal.href && !isEmbeddedMap && signal.cardLink !== false;
    const tagName = isCardLink ? 'a' : 'article';
    const className = `${isCardLink ? 'signal-card signal-card-link' : 'signal-card'}${signal.cardClass ? ` ${signal.cardClass}` : ''}`;
    const attrs = isCardLink
      ? ` href="${signal.href}" class="${className}"${signal.external ? ' target="_blank" rel="noopener noreferrer"' : ''}`
      : ` class="${className}"`;

    const visual = signal.visual === 'map'
      ? signal.embedUrl
        ? `<div class="signal-visual signal-map-frame"><iframe class="signal-map-embed" src="${signal.embedUrl}" title="${signal.embedTitle || signal.title}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>${signal.href ? `<a class="signal-map-meta" href="${signal.href}" target="_blank" rel="noopener noreferrer">${signal.mapMetaLabel || 'Open map'}</a>` : ''}</div>`
        : `<div class="signal-visual signal-map-frame"><img class="signal-map-image" src="${signal.image}" alt="${signal.imageAlt || signal.title}" loading="lazy"><span class="signal-map-meta">${signal.mapMetaLabel || 'Open map'}</span></div>`
      : signal.image
        ? signal.logoStyle === 'inline'
          ? `<div class="signal-logo-inline">${signal.href && signal.cardLink === false ? `<a class="signal-logo-inline-link" href="${signal.href}"${signal.external ? ' target="_blank" rel="noopener noreferrer"' : ''}><img class="signal-logo signal-logo-inline-image" src="${signal.image}" alt="${signal.imageAlt || signal.title}" loading="lazy"></a>` : `<img class="signal-logo signal-logo-inline-image" src="${signal.image}" alt="${signal.imageAlt || signal.title}" loading="lazy">`}</div>`
          : `<div class="signal-visual signal-logo-wrap"><img class="signal-logo" src="${signal.image}" alt="${signal.imageAlt || signal.title}" loading="lazy"></div>`
        : '';

    return `
          <${tagName}${attrs}>
            <p class="signal-label">${signal.label}</p>
            ${visual}
            ${signal.hideTitle ? '' : `<h2>${signal.title}</h2>`}
            ${signal.role ? `<p class="signal-role">${signal.role}</p>` : ''}
            ${signal.period ? `<p class="signal-period">${signal.period}</p>` : ''}
            ${signal.hideDescription ? '' : `<p>${signal.description}</p>`}
          </${tagName}>`;
  }).join('');
}

function renderHomeCards(cards) {
  return cards.map(card => `
          <a class="card" href="${card.href}">
            <h2>${card.title}</h2>
            <p>${card.description}</p>
          </a>`).join('');
}

function renderCompanies(companies) {
  return companies.map(company => `
          <a class="company-card" href="${company.href}" target="_blank" rel="noopener noreferrer">
            <div class="company-logo-badge${company.logoSurface ? ` ${company.logoSurface}` : ''}">
              <img src="${company.image}" alt="${company.alt}"${company.className ? ` class="${company.className}"` : ''} loading="lazy">
            </div>
            <div>
              <h3>${company.name}</h3>
              <p>${company.role}</p>
              ${company.domain ? `<span class="company-domain">${company.domain}</span>` : ''}
              ${company.timeline ? `<small class="company-timeline">${company.timeline}</small>` : ''}
            </div>
          </a>`).join('');
}

function renderSkillGroups(groups) {
  return groups.map(group => `
          <h3>${group.title}</h3>
          <div class="skills-badges">
            ${group.items.map(item => `<span class="badge">${item}</span>`).join('')}
          </div>`).join('');
}

function renderEducation(items) {
  return items.map(item => `
            <li>
              <img src="https://www.metu.edu.tr/system/files/logo_orj/9/9.8.png" alt="METU" class="edu-logo">
              <div>
                ${item.degree} <em>${item.field}</em>${item.suffix ? ` ${item.suffix}` : ''}<br>
                <a href="${item.schoolHref}" target="_blank" rel="noopener noreferrer">${item.school}</a> · ${item.years}
              </div>
            </li>`).join('');
}

export const PAGE_TEMPLATES = {
  'index.html': () => `
    <div class="container home-shell">
      <section class="hero hero-shell">
        <div class="hero-copy">
          ${HOME_COPY.eyebrow ? `<p class="hero-eyebrow">${HOME_COPY.eyebrow}</p>` : ''}
          ${HOME_COPY.title ? `<h1 class="hero-title">${HOME_COPY.title}</h1>` : ''}
          <p class="hero-lead">${HOME_COPY.lead}</p>
          <ul class="hero-points">
            ${HOME_COPY.points.map(point => `<li>${point}</li>`).join('')}
          </ul>
          <div class="hero-actions hero-actions-footer">
            ${renderActions(HOME_COPY.actions)}
          </div>
        </div>

        <aside class="home-signal-grid" aria-label="Quick profile summary">
          ${renderHomeSignals(HOME_COPY.signals)}
        </aside>
      </section>

      <section class="home-section">
        <div class="section-heading-row">
          <div>
            <p class="section-kicker">${HOME_COPY.explore.kicker}</p>
            <h2>${HOME_COPY.explore.title}</h2>
          </div>
        </div>

        <div class="cards route-grid">
          ${renderHomeCards(HOME_COPY.explore.cards)}
        </div>
      </section>
    </div>`,

  'about.html': () => `
    <div class="container page-shell about-shell">
      <section class="about-hero-grid">
        <div class="about-intro-panel">
          <p class="page-eyebrow">${ABOUT_COPY.eyebrow}</p>
          <h1>${ABOUT_COPY.title}</h1>
          ${ABOUT_COPY.intro.map(paragraph => `<p class="page-lead">${paragraph}</p>`).join('')}
          ${ABOUT_COPY.actions.length ? `
          <div class="page-actions">
            ${renderActions(ABOUT_COPY.actions)}
          </div>` : ''}
          <div class="about-onboarding-note" aria-label="How to use this site">
            <p class="about-onboarding-label">Start Here</p>
            <p>Use the dock to open sections, drag windows by their titlebars, and double-click a titlebar to zoom a window.</p>
          </div>
        </div>

        <div class="highlights-grid" id="about-highlights"></div>
      </section>

      <section class="prose about-prose">
        <h2>${ABOUT_COPY.sections.experienceTitle}</h2>
        <div class="companies">
          ${renderCompanies(ABOUT_COPY.companies)}
        </div>

        <h2>${ABOUT_COPY.sections.skillsTitle}</h2>
        <div class="skills-card">
          ${renderSkillGroups(ABOUT_COPY.skillGroups)}
        </div>
      </section>

      <section class="about-detail-grid about-detail-grid-single">
        <div>
          <h2>${ABOUT_COPY.sections.educationTitle}</h2>
          <ul class="education-list">
            ${renderEducation(ABOUT_COPY.education)}
          </ul>

          <h2>${ABOUT_COPY.sections.interestsTitle}</h2>
          <p>${ABOUT_COPY.interests}</p>
        </div>
      </section>
    </div>`,

  'projects.html': () => `
    <div class="container page-shell">
      <section class="page-hero">
        <p class="page-eyebrow">${PROJECTS_COPY.eyebrow}</p>
        <h1>${PROJECTS_COPY.title}</h1>
        <p class="page-lead">${PROJECTS_COPY.lead}</p>
        <div class="page-actions">
          ${renderActions(PROJECTS_COPY.actions)}
        </div>
      </section>

      <section class="notice-panel">
        <p class="notice-label">${PROJECTS_COPY.noteTitle}</p>
        <ul class="meta-list">
          ${PROJECTS_COPY.notes.map(note => `<li>${note}</li>`).join('')}
        </ul>
      </section>
    </div>`,

  'hobbies.html': () => `
    <div class="container page-shell">
      <section class="page-hero page-hero-compact">
        <p class="page-eyebrow">Hobbies</p>
        <h1>Hobbies</h1>
        <p class="page-lead">A smaller corner for collections, interests, and objects I keep returning to.</p>
      </section>

      <div id="hobbies-content"></div>
    </div>`,

  'bookmarks.html': () => `
    <div class="container page-shell">
      <section class="page-hero page-hero-compact">
        <p class="page-eyebrow">Bookmarks</p>
        <h1>Bookmarks</h1>
        <p class="page-lead">Websites, articles, and tools worth saving for a second look.</p>
      </section>

      <section class="highlights-grid compact-highlights-grid" id="bookmarks-overview"></section>

      <section class="section">
        <div id="bookmarks-grid"></div>
      </section>
    </div>`,

  '404.html': () => `
    <div class="container page-shell">
      <section class="page-hero error-hero">
        <p class="page-code">404</p>
        <h1>This route does not exist.</h1>
        <p class="page-lead">
          The link may be outdated, the page may have moved, or the URL may simply be wrong.
          The rest of the site is still available.
        </p>
        <div class="page-actions">
          <a href="../index.html" class="btn-solid">Back Home</a>
          <a href="about.html" class="btn-outline">About</a>
          <a href="bookmarks.html" class="btn-outline">Bookmarks</a>
        </div>
      </section>
    </div>`
};

export function renderPageTemplate(pageName) {
  const template = PAGE_TEMPLATES[pageName];
  return template ? template() : '';
}