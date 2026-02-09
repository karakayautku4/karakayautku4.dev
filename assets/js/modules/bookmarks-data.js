/**
 * Bookmarks Data Module
 * Central data source for favorite websites and resources
 * @module bookmarks-data
 */

import { createInlineSVG } from '../icons.js';

export const BOOKMARKS_DATA = {
  articles: [
    {
      id: 'mechanical-watch',
      title: 'Mechanical Watch',
      author: 'Bartosz Ciechanowski',
      category: 'Articles',
      url: 'https://ciechanow.ski/mechanical-watch/',
      favicon: 'https://ciechanow.ski/favicon.ico',
      description: 'An absolutely stunning interactive explanation of how mechanical watches work. Beautiful visualizations and deep dive into horology.',
      tags: ['Engineering', 'Interactive', 'Watches']
    }
  ],
  
  tools: [
    // Add tool bookmarks here
  ],
  
  learning: [
    // Add learning resource bookmarks here
  ],
  
  inspiration: [
    // Add inspiration bookmarks here
  ]
};

/**
 * Bookmarks API
 * Centralized methods for bookmark operations
 */
export const BookmarksAPI = {
  /**
   * Get all bookmarks as a flat array
   */
  getAll() {
    return [
      ...BOOKMARKS_DATA.articles,
      ...BOOKMARKS_DATA.tools,
      ...BOOKMARKS_DATA.learning,
      ...BOOKMARKS_DATA.inspiration
    ];
  },

  /**
   * Get bookmarks grouped by category
   */
  getByCategory() {
    const categories = {};
    
    if (BOOKMARKS_DATA.articles.length > 0) {
      categories['Articles'] = BOOKMARKS_DATA.articles;
    }
    if (BOOKMARKS_DATA.tools.length > 0) {
      categories['Tools'] = BOOKMARKS_DATA.tools;
    }
    if (BOOKMARKS_DATA.learning.length > 0) {
      categories['Learning'] = BOOKMARKS_DATA.learning;
    }
    if (BOOKMARKS_DATA.inspiration.length > 0) {
      categories['Inspiration'] = BOOKMARKS_DATA.inspiration;
    }
    
    return categories;
  },

  /**
   * Render favicon or fallback emoji
   */
  renderIcon(item) {
    if (item.favicon) {
      return `<img src="${item.favicon}" alt="${item.title}" class="bookmark-favicon" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <span class="bookmark-emoji" style="display: none;">🔖</span>`;
    }
    return `<span class="bookmark-emoji">🔖</span>`;
  },

  /**
   * Render tags HTML
   */
  renderTags(tags) {
    if (!tags || tags.length === 0) return '';
    return `
      <div class="bookmark-tags">
        ${tags.map(tag => `<span class="bookmark-tag">${tag}</span>`).join('')}
      </div>`;
  },

  /**
   * Create bookmark card template
   */
  createCardTemplate(item) {
    return `
      <a href="${item.url}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="bookmark-card" 
         id="${item.id}"
         data-category="${item.category}">
        <div class="bookmark-icon">${this.renderIcon(item)}</div>
        <div class="bookmark-content">
          <div class="bookmark-header">
            <h3>${item.title}</h3>
            ${item.author ? `<span class="bookmark-author">by ${item.author}</span>` : ''}
          </div>
          ${item.description ? `<p class="bookmark-description">${item.description}</p>` : ''}
          <div class="bookmark-meta">
            <span class="bookmark-category">${item.category}</span>
            ${this.renderTags(item.tags)}
          </div>
        </div>
      </a>`;
  }
};

/**
 * Generate HTML for bookmarks list (Compact style)
 */
export function generateBookmarksGrid() {
  const bookmarks = BookmarksAPI.getAll();
  return bookmarks.map(item => BookmarksAPI.createCardTemplate(item)).join('');
}

/**
 * Get sidebar menu structure for bookmarks
 */
export function getBookmarksSidebarData() {
  const categories = BookmarksAPI.getByCategory();
  const totalCount = BookmarksAPI.getAll().length;
  
  return {
    title: 'Bookmarks',
    sections: Object.entries(categories).map(([heading, items]) => ({
      heading: heading === 'Articles' 
        ? `<span class="category-with-icon">${createInlineSVG('bookmarks')}Bookmarks</span><span class="count-badge">${totalCount}</span>` 
        : heading,
      links: items.map(item => ({
        href: `#${item.id}`,
        label: item.title
      }))
    }))
  };
}

// Make functions globally available for backward compatibility
if (typeof window !== 'undefined') {
  window.BOOKMARKS_DATA = BOOKMARKS_DATA;
  window.BookmarksAPI = BookmarksAPI;
  window.generateBookmarksGrid = generateBookmarksGrid;
  window.getBookmarksSidebarData = getBookmarksSidebarData;
}
