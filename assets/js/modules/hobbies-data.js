/**
 * Hobbies Data Module
 * Central data source for hobbies and collections
 * @module hobbies-data
 */

import { createInlineSVG } from '../icons.js';

export const HOBBIES_DATA = {
  watches: [
    {
      id: 'seiko-srpg29k1',
      name: 'Seiko 5 Sports SRPG29K1',
      category: 'Automatic Watch',
      details: 'Field Watch',
      url: 'https://www.seikowatches.com/global-en/products/5sports/srpg29',
      image: 'https://www.seikowatches.com/global-en/-/media/Images/Product--Image/All/Seiko/2022/02/20/02/37/SRPG29K1/SRPG29K1.png?mh=1200&mw=1200',
      description: 'Japanese automatic movement with 40-hour power reserve. A reliable daily companion.',
      specs: {
        movement: 'Automatic 4R36',
        diameter: '39.4mm',
        waterResistance: '100m'
      }
    }
  ],

  maker: [
    {
      id: 'bambu-lab-a1-mini',
      name: 'Bambu Lab A1 Mini',
      category: '3D Printer',
      details: null,
      url: 'https://bambulab.com/en/a1-mini',
      image: '../assets/images/bambu-lab-a1-mini.svg',
      description: 'A small printer that scratches the maker itch without demanding an entire room or a full-time tuning hobby.',
      specs: {
        type: 'FDM',
        profile: 'Compact Desktop',
        use: 'Prototyping and small prints'
      }
    }
  ]
};

/**
 * Hobbies API
 * Centralized methods for hobby operations
 */
export const HobbiesAPI = {
  /**
   * Get all hobby items as a flat array
   */
  getAll() {
    return [
      ...HOBBIES_DATA.watches,
      ...HOBBIES_DATA.maker
    ];
  },

  /**
   * Get hobby items grouped by category
   */
  getByCategory() {
    const categories = {};
    
    if (HOBBIES_DATA.watches.length > 0) {
      categories['Watch Collection'] = HOBBIES_DATA.watches;
    }
    if (HOBBIES_DATA.maker.length > 0) {
      categories['Maker Tools'] = HOBBIES_DATA.maker;
    }
    
    return categories;
  },

  /**
   * Get emoji for hobby
   */
  getEmoji(id) {
    const emojiMap = {
      'seiko-srpg29k1': '⌚',
      'bambu-lab-a1-mini': '🖨️'
    };
    return emojiMap[id] || '🎯';
  },

  /**
   * Create specs HTML
   */
  renderSpecs(specs) {
    if (!specs) return '';
    return Object.entries(specs)
      .map(([key, value]) => `<div class="hobby-spec"><span>${key}:</span>${value}</div>`)
      .join('');
  },

  /**
   * Create hobby card template
   */
  createCardTemplate(item) {
    const detailsText = item.details ? ` · ${item.details}` : '';
    const emoji = this.getEmoji(item.id);
    const specsHTML = this.renderSpecs(item.specs);
    
    return `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hobby-showcase" id="${item.id}">
        <div class="hobby-image-section">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="hobby-image">` : `<div class="hobby-emoji">${emoji}</div>`}
        </div>
        <div class="hobby-details">
          <div class="hobby-header">
            <p class="hobby-category">${item.category}${detailsText}</p>
            <h3>${item.name}</h3>
          </div>
          ${item.description ? `<p class="hobby-description">${item.description}</p>` : ''}
          ${specsHTML ? `<div class="hobby-specs">${specsHTML}</div>` : ''}
        </div>
      </a>`;
  },

  getOverviewStats() {
    return [
      {
        label: 'Published items',
        value: String(this.getAll().length),
        description: 'Only items I actually want to keep on the page.'
      },
      {
        label: 'Collection tracks',
        value: String(Object.keys(HOBBIES_DATA).length),
        description: 'Watches and maker tools are the only buckets I actually want to maintain here.'
      }
    ];
  },

  renderEmptyState(label) {
    return `
      <div class="collection-empty-state">
        <p class="collection-empty-label">Not published yet</p>
        <h3>${label}</h3>
        <p>This section exists as a future bucket, but I am not adding filler entries just to make it look full.</p>
      </div>`;
  }
};

/**
 * Generate HTML for hobbies grid (all items)
 */
export function generateHobbiesGrid() {
  const items = HobbiesAPI.getAll();
  return items.map(item => HobbiesAPI.createCardTemplate(item)).join('\n');
}

/**
 * Generate HTML for all hobby sections
 * Automatically creates sections for each category
 */
export function generateHobbiesSections() {
  const categoryDescriptions = {
    'Watch Collection': 'Mechanical and automatic timepieces I admire',
    'Maker Tools': 'Small machines that let me turn curiosity into physical output'
  };

  return Object.entries({
    'Watch Collection': HOBBIES_DATA.watches,
    'Maker Tools': HOBBIES_DATA.maker
  }).map(([categoryName, items]) => {
    const description = categoryDescriptions[categoryName] || '';
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const content = `<div class="workspace-grid hobbies-grid" id="${categorySlug}">
          ${items.map(item => HobbiesAPI.createCardTemplate(item)).join('\n')}
        </div>`;

    return `
      <section class="section collection-section" id="${categorySlug}">
        <div class="section-heading-row collection-heading-row">
          <div>
            <p class="section-kicker">${items.length} item${items.length !== 1 ? 's' : ''}</p>
            <h2>${categoryName}</h2>
          </div>
          ${description ? `<p class="section-summary">${description}</p>` : ''}
        </div>
        ${content}
      </section>`;
  }).join('\n');
}

/**
 * Get sidebar menu structure for hobbies
 */
export function getHobbiesSidebarData() {
  const categories = HobbiesAPI.getByCategory();
  
  return {
    title: 'Hobbies',
    sections: Object.entries(categories).map(([heading, items]) => ({
      heading: heading === 'Watch Collection'
        ? `<span class="category-with-icon">${createInlineSVG('watch')}Watches</span><span class="count-badge">${items.length}</span>`
        : `<span class="category-with-icon">${createInlineSVG('tools')}Maker Tools</span><span class="count-badge">${items.length}</span>`,
      links: items.map(item => ({
        href: `#${item.id}`,
        label: item.name
      }))
    }))
  };
}

