/**
 * Sidebar Component Module
 * Dynamically generates sidebar navigation
 * @module sidebar
 */

import { createSVG } from '../icons.js';
import { getHobbiesSidebarData } from './hobbies-data.js';
import { getBookmarksSidebarData } from './bookmarks-data.js';
import {
  SITE_PRIMARY_NAV,
  SITE_EXPLORE_LINKS,
  SITE_ONLINE_LINKS,
  SITE_SOCIAL_LINKS
} from './site-content.js';

function getCurrentPageContext() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop() || 'index.html';
  const isInPagesFolder = path.includes('/pages/');
  const pathPrefix = isInPagesFolder ? '../' : '';

  return { currentPage, pathPrefix };
}

function buildInternalHref(pathPrefix, href) {
  if (href === 'index.html') {
    return pathPrefix ? `${pathPrefix}index.html` : 'index.html';
  }

  return pathPrefix ? `${pathPrefix}pages/${href}` : `pages/${href}`;
}

function renderNavLinks(items, currentPage, pathPrefix) {
  return items.map(item => {
    const isActive = currentPage === item.href;
    const className = item.iconOnly ? ' class="icon-only-link"' : '';
    const label = `<span class="nav-link-label">${item.label}</span>`;
    const dockTooltip = item.iconOnly ? `<span class="dock-tooltip" aria-hidden="true">${item.label}</span>` : '';
    const dockIcon = item.iconOnly ? ` data-dock-icon="${item.icon}"` : '';
    return `
      <a href="${buildInternalHref(pathPrefix, item.href)}" aria-label="${item.label}"${dockIcon}${className}${isActive ? ' aria-current="page"' : ''}>
        ${dockTooltip}
        ${createSVG(item.icon)}
        ${label}
      </a>`;
  }).join('');
}

function renderExternalLinks(items) {
  return items.map(item => {
    const className = item.iconOnly ? ' class="icon-only-link"' : '';
    const label = `<span class="nav-link-label">${item.label}</span>`;
    const dockTooltip = item.iconOnly ? `<span class="dock-tooltip" aria-hidden="true">${item.label}</span>` : '';
    const dockIcon = item.iconOnly ? ` data-dock-icon="${item.icon}"` : '';
    const desktopWindow = ['github', 'tryhackme', 'hackerrank', 'linkedin', 'x', 'instagram', 'reddit'].includes(item.icon)
      ? ` data-desktop-window="${item.icon}"`
      : '';
    const externalIndicator = `<span class="external-indicator" aria-hidden="true">${createSVG('external', 12)}</span>`;

    return `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}"${dockIcon}${desktopWindow}${className}>
          ${dockTooltip}
          ${createSVG(item.icon)}
          ${label}
          ${externalIndicator}
        </a>`;
  }).join('');
}

export class Sidebar {
  constructor() {
    this.init();
  }
  
  init() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const { currentPage, pathPrefix } = getCurrentPageContext();
    
    header.innerHTML = this.generateSidebar(currentPage, pathPrefix);
    
    // Setup CV download modal after sidebar is rendered
    this.setupCVModal();
    this.setupDesktopWindows();
    this.setupDockMagnification();
    
    // Initialize secondary sidebar for data-driven collection pages
    if (currentPage === 'hobbies.html') {
      this.initSecondarySidebar('hobbies');
    } else if (currentPage === 'bookmarks.html') {
      this.initSecondarySidebar('bookmarks');
    }
    
    // Setup smooth scroll for hash links
    this.setupSmoothScroll();
  }

  setupDockMagnification() {
    const supportsPrecisionHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const dock = document.querySelector('.nav-panel');

    if (!supportsPrecisionHover || !dock) {
      return;
    }

    const icons = Array.from(dock.querySelectorAll('a[data-dock-icon]'));

    if (!icons.length) {
      return;
    }

    const resetDock = () => {
      dock.classList.remove('is-magnifying');
      icons.forEach((icon) => {
        icon.style.removeProperty('--dock-scale');
        icon.style.removeProperty('--dock-rise');
      });
    };

    const updateDock = (clientX) => {
      dock.classList.add('is-magnifying');

      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(clientX - center);
        const influence = Math.max(0, 1 - distance / 150);
        const scale = 1 + influence * 0.24;
        const rise = influence * 8;

        icon.style.setProperty('--dock-scale', scale.toFixed(3));
        icon.style.setProperty('--dock-rise', `${rise.toFixed(2)}px`);
      });
    };

    dock.addEventListener('pointermove', (event) => {
      updateDock(event.clientX);
    });

    dock.addEventListener('pointerleave', resetDock);
    dock.addEventListener('pointercancel', resetDock);
    window.addEventListener('blur', resetDock);
  }
  
  generateSidebar(currentPage, pathPrefix) {
    return `
    <div class="profile-section">
      <img src="${pathPrefix}assets/images/profile.webp" alt="Utku Karakaya" class="profile-photo">
      <div class="profile-info">
        <a class="brand" href="${pathPrefix}index.html">Utku Karakaya</a>
        <p class="profile-title">Automation Engineer / Python</p>
        <p class="profile-meta"><span class="profile-status-dot" aria-hidden="true"></span>Based in Eindhoven</p>
      </div>
    </div>
    <div class="nav-panel">
      <nav class="nav">
        ${renderNavLinks(SITE_PRIMARY_NAV, currentPage, pathPrefix)}
        <h3 class="sidebar-title">Explore</h3>
        <div class="social-links">
          ${renderNavLinks(SITE_EXPLORE_LINKS, currentPage, pathPrefix)}
        </div>
        <span class="dock-separator" aria-hidden="true"></span>
        <h3 class="sidebar-title">Online</h3>
        <div class="social-links">
          ${renderExternalLinks(SITE_ONLINE_LINKS)}
        </div>
        <h3 class="sidebar-title">Social</h3>
        <div class="social-links">
          ${renderExternalLinks(SITE_SOCIAL_LINKS)}
        </div>
      </nav>
    </div>`;
  }
  
  initSecondarySidebar(pageType) {
    // Add body class
    document.body.classList.add('with-secondary-sidebar');
    
    // Store secondary menu data
    this.secondaryMenuData = this.getSecondaryMenuData(pageType);
    
    // Create secondary sidebar for desktop
    const secondarySidebar = document.createElement('aside');
    secondarySidebar.className = 'secondary-sidebar active';
    secondarySidebar.innerHTML = this.generateSecondaryMenu(pageType);
    document.body.appendChild(secondarySidebar);
    
    // Add secondary menu to main sidebar for mobile
    this.addSecondaryMenuToMainSidebar(pageType);
  }
  
  getSecondaryMenuData(pageType) {
    if (pageType === 'hobbies') {
      // Use centralized hobbies data if available
      if (typeof getHobbiesSidebarData === 'function') {
        return getHobbiesSidebarData();
      }
      // Fallback to empty data
      return {
        title: 'Hobbies',
        sections: []
      };
    } else if (pageType === 'bookmarks') {
      // Use centralized bookmarks data if available
      if (typeof getBookmarksSidebarData === 'function') {
        return getBookmarksSidebarData();
      }
      // Fallback to empty data
      return {
        title: 'Bookmarks',
        sections: []
      };
    }
    return null;
  }
  
  generateSecondaryMenu(pageType) {
    const data = this.getSecondaryMenuData(pageType);
    if (!data) return '';
    
    return data.sections.map(section => `
      <h3>${section.heading}</h3>
      <nav class="secondary-sidebar-nav">
        ${section.links.map(link => `
          <a href="${link.href}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.label}</a>
        `).join('')}
      </nav>
    `).join('');
  }
  
  addSecondaryMenuToMainSidebar(pageType) {
    const data = this.getSecondaryMenuData(pageType);
    if (!data) return;
    
    const nav = document.querySelector('.site-header .nav');
    if (!nav) return;
    
    // Create mobile-only secondary menu section
    const mobileSecondaryMenu = document.createElement('div');
    mobileSecondaryMenu.className = 'mobile-secondary-menu';
    
    mobileSecondaryMenu.innerHTML = `
      <h3 class="sidebar-title">${data.title}</h3>
      ${data.sections.map(section => `
        <div class="mobile-secondary-section">
          <div class="mobile-secondary-heading">${section.heading}</div>
          <div class="mobile-secondary-links">
            ${section.links.map(link => `
              <a href="${link.href}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${link.label}</a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    `;
    
    // Insert before social links
    const firstSidebarTitle = nav.querySelector('.sidebar-title');
    if (firstSidebarTitle) {
      nav.insertBefore(mobileSecondaryMenu, firstSidebarTitle);
    } else {
      nav.appendChild(mobileSecondaryMenu);
    }
  }
  
  setupSmoothScroll() {
    // Handle smooth scrolling for hash links in secondary sidebar
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target && target.getAttribute('href').startsWith('#')) {
        const href = target.getAttribute('href');
        if (href === '#coming-soon') return; // Skip coming soon links
        
        e.preventDefault();
        const elementId = href.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          
          // Add visual feedback
          element.style.transition = 'transform 0.3s ease';
          element.style.transform = 'scale(1.02)';
          setTimeout(() => {
            element.style.transform = 'scale(1)';
          }, 300);
        }
      }
    });
  }
  
  setupCVModal() {
    const cvLink = document.querySelector('a[data-cv-download]');
    if (!cvLink) return;
    
    cvLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create custom modal
      const modal = document.createElement('div');
      modal.className = 'cv-modal';
      modal.innerHTML = `
        <div class="cv-modal-overlay"></div>
        <div class="cv-modal-content">
          <div class="cv-modal-header">
            <h3>Download CV</h3>
            <button class="cv-modal-close" aria-label="Close">
              ${createSVG('close', 20)}
            </button>
          </div>
          <div class="cv-modal-body">
            <p>Would you like to download my CV?</p>
          </div>
          <div class="cv-modal-footer">
            <button class="cv-modal-btn cv-modal-cancel">Cancel</button>
            <button class="cv-modal-btn cv-modal-confirm">Download</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Animate in
      requestAnimationFrame(() => {
        modal.classList.add('active');
      });
      
      const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 200);
      };
      
      // Handle close
      modal.querySelector('.cv-modal-close').addEventListener('click', closeModal);
      modal.querySelector('.cv-modal-cancel').addEventListener('click', closeModal);
      modal.querySelector('.cv-modal-overlay').addEventListener('click', closeModal);
      
      // Handle download
      modal.querySelector('.cv-modal-confirm').addEventListener('click', () => {
        const url = cvLink.getAttribute('href');
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.download = url.split('/').pop();
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        closeModal();
      });
      
      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  }

  setupDesktopWindows() {
    const isDesktopRuntimeHome = document.body.classList.contains('home-page')
      && window.matchMedia('(min-width: 861px)').matches
      && new URLSearchParams(window.location.search).get('embed') !== '1';

    if (isDesktopRuntimeHome) {
      return;
    }

    const dockWindowLinks = document.querySelectorAll('a[data-desktop-window]');
    if (!dockWindowLinks.length) return;

    dockWindowLinks.forEach((link) => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const windowType = link.getAttribute('data-desktop-window');
        await this.openDesktopWindow(windowType, link.getAttribute('href'));
      });
    });
  }

  async openDesktopWindow(windowType, profileUrl) {
    const existingWindow = document.querySelector(`.desktop-window[data-window-type="${windowType}"]`);
    if (existingWindow) {
      existingWindow.classList.add('active');
      return;
    }

    this.openEmbeddedBrowserWindow(windowType, profileUrl);
  }

  openEmbeddedBrowserWindow(windowType, profileUrl) {
    const windowContent = this.getWindowContent(windowType, profileUrl);
    if (!windowContent) return;

    const windowElement = document.createElement('div');
    windowElement.className = 'desktop-window';
    windowElement.dataset.windowType = windowType;
    windowElement.innerHTML = `
      <div class="desktop-window-overlay"></div>
      <section class="desktop-window-shell" data-window-type="${windowType}" role="dialog" aria-modal="true" aria-labelledby="desktop-window-title-${windowType}">
        <header class="desktop-window-header">
          <div class="desktop-window-controls" aria-hidden="true">
            <button class="desktop-window-dot desktop-window-dot-close" type="button" data-window-close></button>
            <span class="desktop-window-dot desktop-window-dot-minimize"></span>
            <span class="desktop-window-dot desktop-window-dot-expand"></span>
          </div>
          <div class="desktop-window-titlebar">
            <span class="desktop-window-app-icon">${createSVG(windowContent.icon, 14)}</span>
            <div>
              <p class="desktop-window-app-label">${windowContent.windowLabel}</p>
              <h2 id="desktop-window-title-${windowType}">${windowContent.title}</h2>
            </div>
          </div>
          <div class="desktop-window-toolbar">
            <div class="desktop-window-addressbar">
              <span class="desktop-window-address-pill"></span>
              <span class="desktop-window-address-text">${this.escapeHTML(profileUrl)}</span>
            </div>
            <a class="desktop-window-open" href="${profileUrl}" target="_blank" rel="noopener noreferrer">Open Externally</a>
          </div>
        </header>
        <div class="desktop-window-body desktop-window-body-browser is-loading">
          <div class="desktop-window-browser-loading">
            <span class="desktop-window-loading-ring"></span>
            <p>Loading ${windowContent.windowLabel}...</p>
          </div>
          <iframe
            class="desktop-window-iframe"
            title="${windowContent.windowLabel} embedded browser"
            src="${profileUrl}"
            loading="eager"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="desktop-window-browser-fallback" hidden>
            <div class="desktop-window-preview-panel">
              <div class="desktop-window-preview-hero">
                <span class="desktop-window-preview-icon">${createSVG(windowContent.icon, 32)}</span>
                <div>
                  <p class="desktop-window-kicker">${windowContent.kicker}</p>
                  <h3>${windowContent.title}</h3>
                  <p>${windowContent.description}</p>
                </div>
              </div>
              <div class="desktop-window-preview-grid">
                ${windowContent.points.map(point => `
                  <article class="desktop-window-preview-card">
                    <p>${point.label}</p>
                    <h4>${point.value}</h4>
                    <span>${point.note}</span>
                  </article>
                `).join('')}
              </div>
              <div class="desktop-window-preview-note">
                <p>${windowContent.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    document.body.appendChild(windowElement);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      windowElement.classList.add('active');
    });

    const closeWindow = () => {
      windowElement.classList.remove('active');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
      setTimeout(() => {
        if (windowElement.parentNode) {
          windowElement.parentNode.removeChild(windowElement);
        }
      }, 220);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeWindow();
      }
    };

    windowElement.querySelector('[data-window-close]').addEventListener('click', closeWindow);
    windowElement.querySelector('.desktop-window-overlay').addEventListener('click', closeWindow);
    document.addEventListener('keydown', handleEscape);
    this.setupEmbeddedBrowserState(windowElement, windowContent);
  }

  setupEmbeddedBrowserState(windowElement, windowContent) {
    const iframe = windowElement.querySelector('.desktop-window-iframe');
    const browserBody = windowElement.querySelector('.desktop-window-body-browser');
    const fallback = windowElement.querySelector('.desktop-window-browser-fallback');

    let settled = false;

    const showEmbedded = () => {
      if (settled) return;
      settled = true;
      browserBody.classList.remove('is-loading');
      browserBody.classList.add('is-ready');
    };

    const showFallback = () => {
      if (settled) return;
      settled = true;
      browserBody.classList.remove('is-loading');
      browserBody.classList.add('is-fallback');
      fallback.hidden = false;
    };

    if (windowContent.forceFallback) {
      showFallback();
      iframe.removeAttribute('src');
      return;
    }

    iframe.addEventListener('load', () => {
      try {
        const frameLocation = iframe.contentWindow.location.href;
        if (!frameLocation || frameLocation === 'about:blank') {
          showFallback();
          return;
        }
      } catch {
        // Cross-origin access is expected for successful embeds.
      }

      showEmbedded();
    });

    iframe.addEventListener('error', showFallback);

    window.setTimeout(() => {
      if (!settled) {
        showFallback();
      }
    }, 2800);
  }

  getWindowContent(windowType, profileUrl) {
    const profiles = {
      github: {
        icon: 'github',
        windowLabel: 'GitHub',
        title: 'karakayautku4',
        kicker: 'Embedded Browser',
        description: 'This window tries to render the real GitHub profile directly inside the page. If GitHub blocks iframe embedding, it falls back to a premium launcher panel instead of breaking the experience.',
        note: 'Some external sites reject in-page embedding for security reasons. If that happens, the fallback panel stays visible and the top-right action opens the real page.',
        points: [
          { label: 'Mode', value: 'Live Embed', note: 'Attempts to render the real profile inside the page.' },
          { label: 'Platform', value: 'GitHub', note: 'Desktop-style browser container.' },
          { label: 'Fallback', value: 'Graceful', note: 'Clean launcher if iframe loading is blocked.' }
        ],
        forceFallback: true,
        profileUrl
      },
      tryhackme: {
        icon: 'tryhackme',
        windowLabel: 'TryHackMe',
        title: 'karakayautku4',
        kicker: 'Embedded Browser',
        description: 'This window first tries to behave like a real browser inside the page and load the live TryHackMe profile directly.',
        note: 'If TryHackMe blocks iframe rendering, the window keeps the premium browser shell and swaps to a branded fallback panel rather than dumping you into a broken blank frame.',
        points: [
          { label: 'Mode', value: 'Live Embed', note: 'Loads the real profile when allowed.' },
          { label: 'Platform', value: 'TryHackMe', note: 'Hands-on labs and guided rooms.' },
          { label: 'Action', value: 'Open externally', note: 'Use the top-right button if embed is blocked.' }
        ],
        profileUrl
      },
      hackerrank: {
        icon: 'hackerrank',
        windowLabel: 'HackerRank',
        title: 'karakayautku4',
        kicker: 'Embedded Browser',
        description: 'This window tries to render the real HackerRank profile inside a browser-like frame so the dock interaction feels closer to an app launch.',
        note: 'If HackerRank refuses iframe embedding, the fallback view keeps the same window shell and gives you a clean external jump instead of a broken blank browser.',
        points: [
          { label: 'Mode', value: 'Live Embed', note: 'Loads the real profile when allowed.' },
          { label: 'Platform', value: 'HackerRank', note: 'Coding challenges and badges.' },
          { label: 'Fallback', value: 'Graceful', note: 'Stays premium even when blocked.' }
        ],
        profileUrl
      }
    };

    return profiles[windowType] || null;
  }

  escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}

/**
 * Initialize sidebar
 */
export function initSidebar() {
  return new Sidebar();
}
