/**
 * Main Application Entry Point
 * Initializes all modules for the site
 * @module app
 */

import { Navigation, initNavigation } from './modules/nav.js';
import { Sidebar, initSidebar } from './modules/sidebar.js';
import { 
  HOBBIES_DATA, 
  HobbiesAPI, 
  generateHobbiesSections 
} from './modules/hobbies-data.js';
import { 
  BOOKMARKS_DATA, 
  BookmarksAPI, 
  generateBookmarksSections 
} from './modules/bookmarks-data.js';
import {
  ABOUT_HIGHLIGHTS,
  COLLECTION_PAGE_OVERVIEWS,
  renderHighlightCards
} from './modules/site-content.js';
import { renderPageTemplate } from './modules/page-content.js';

import { initDesktopRuntime } from './modules/desktop-runtime.js';

let responsiveHomeModeWatcherBound = false;

function isEmbeddedMode() {
  return new URLSearchParams(window.location.search).get('embed') === '1';
}
// Export all modules for external use
export {
  Navigation,
  Sidebar,
  HOBBIES_DATA,
  HobbiesAPI,
  BOOKMARKS_DATA,
  BookmarksAPI
};

function getCurrentPage() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'index.html';
}

/**
 * Initialize core functionality
 */
function initCore() {
  if (isEmbeddedMode()) {
    document.body.classList.add('embed-page');
    return;
  }

  initSidebar();
  initNavigation();
}

function renderPageBody(currentPage) {
  const root = document.getElementById('page-content');

  if (!root) {
    return null;
  }

  root.innerHTML = renderPageTemplate(currentPage);
  return root;
}

function bindResponsiveHomeMode(currentPage, embedded) {
  if (responsiveHomeModeWatcherBound || currentPage !== 'index.html' || embedded) {
    return;
  }

  const desktopModeQuery = window.matchMedia('(min-width: 861px)');
  const handleModeChange = () => {
    window.location.reload();
  };

  if (typeof desktopModeQuery.addEventListener === 'function') {
    desktopModeQuery.addEventListener('change', handleModeChange);
  } else if (typeof desktopModeQuery.addListener === 'function') {
    desktopModeQuery.addListener(handleModeChange);
  }

  responsiveHomeModeWatcherBound = true;
}

const pageInitializers = {
  'about.html': () => {
    const highlights = document.getElementById('about-highlights');
    if (highlights) {
      highlights.innerHTML = renderHighlightCards(ABOUT_HIGHLIGHTS);
    }
  },
  'hobbies.html': () => {
    const content = document.getElementById('hobbies-content');

    if (!content) return;

    content.innerHTML = generateHobbiesSections();
  },
  'bookmarks.html': () => {
    const grid = document.getElementById('bookmarks-grid');
    const overview = document.getElementById('bookmarks-overview');

    if (overview) {
      overview.innerHTML = renderHighlightCards([
        ...COLLECTION_PAGE_OVERVIEWS.bookmarks,
        ...BookmarksAPI.getOverviewStats()
      ], 'compact-highlight-card');
    }

    if (!grid) return;

    grid.innerHTML = generateBookmarksSections();
  }
};

/**
 * Initialize page-specific functionality
 */
function initPage() {
  const currentPage = getCurrentPage();
  const embedded = isEmbeddedMode();
  const pageContent = renderPageBody(currentPage);
  const desktopEligible = window.matchMedia('(min-width: 861px)').matches;
  const initializer = pageInitializers[currentPage];

  if (!pageContent) {
    return;
  }

  if (initializer) {
    initializer();
  }

  bindResponsiveHomeMode(currentPage, embedded);

  if (currentPage === 'index.html' && !embedded && desktopEligible) {
    document.body.classList.add('desktop-home-active');
    initDesktopRuntime(pageContent, pageContent.innerHTML);
    return;
  }

  document.body.classList.remove('desktop-home-active');
}

/**
 * Main initialization
 */
function init() {
  initCore();
  initPage();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
