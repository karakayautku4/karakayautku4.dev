/**
 * Workspace Data Module
 * Central data source for workspace items
 * @module workspace-data
 */

import { createInlineSVG } from '../icons.js';

export const WORKSPACE_DATA = {
  devices: [
    {
      id: 'apple-macbook-air',
      name: 'Apple MacBook Air M4 13"',
      category: 'Laptop',
      details: 'Silver',
      url: 'https://www.apple.com/macbook-air/',
      image: null,
      isHero: true,
      gridSize: 'large'
    },
    {
      id: 'apple-ipad-air',
      name: 'Apple iPad Air M3 11"',
      category: 'Tablet',
      details: 'Space Gray',
      url: 'https://www.apple.com/ipad-air/',
      image: null,
      isHero: true,
      gridSize: 'medium'
    },
    {
      id: 'apple-airpods-pro',
      name: 'Apple AirPods Pro 2',
      category: 'Audio',
      details: null,
      url: 'https://www.apple.com/airpods-pro/',
      image: null,
      isHero: false,
      gridSize: 'small'
    },
    {
      id: 'beats-pill',
      name: 'Beats Pill',
      category: 'Speaker',
      details: null,
      url: 'https://www.beatsbydre.com/speakers/beats-pill/MW443/beatspill-black',
      image: null,
      isHero: false,
      gridSize: 'small'
    }
  ],
  
  display: [
    {
      id: 'xiaomi-monitor',
      name: 'Xiaomi A27Ui 4K Monitor',
      category: 'Display',
      details: null,
      url: 'https://www.mi.com/global/product/xiaomi-4k-monitor-a27ui/',
      image: 'https://cdn.mos.cms.futurecdn.net/VVUvYShtSMbWnCFVNXo9nM.jpg',
      isHero: true,
      gridSize: 'large'
    },
    {
      id: 'xiaomi-light-bar',
      name: 'Xiaomi Monitor Light Bar',
      category: 'Lighting',
      details: null,
      url: 'https://www.mi.com/global/product/mi-computer-monitor-light-bar/',
      image: 'https://m.media-amazon.com/images/I/61VuRqZW1AL._AC_SL1500_.jpg',
      isHero: false,
      gridSize: 'small'
    }
  ],
  
  accessories: [
    {
      id: 'logitech-mouse',
      name: 'Logitech MX Anywhere 3S',
      category: 'Mouse',
      details: null,
      url: 'https://www.logitech.com/en-us/products/mice/mx-anywhere-3s.html',
      image: 'https://m.media-amazon.com/images/I/51vVS+RUEPL._AC_SL1500_.jpg',
      isHero: false,
      gridSize: 'small'
    },
    {
      id: 'apple-magic-keyboard',
      name: 'Apple Magic Keyboard',
      category: 'Keyboard',
      details: 'Black',
      url: 'https://www.apple.com/shop/product/MXK83LL/A/magic-keyboard-with-touch-id-and-numeric-keypad-for-mac-models-with-apple-silicon-usb-c-us-english-black-keys',
      image: null,
      isHero: false,
      gridSize: 'small'
    },
    {
      id: 'logitech-desk-mat',
      name: 'Logitech Desk Mat Studio Series',
      category: 'Desk Mat',
      details: 'Grey',
      url: 'https://www.logitech.com/en-us/products/mouse-pads/desk-mat-studio-series.html',
      image: 'https://m.media-amazon.com/images/I/71dQx3yLN1L._AC_SL1500_.jpg',
      isHero: false,
      gridSize: 'small'
    },
    {
      id: 'bellroy-laptop-sleeve',
      name: 'Bellroy Lite Laptop Sleeve',
      category: 'Laptop Sleeve',
      details: 'Black',
      url: 'https://bellroy.com/products/lite-laptop-sleeve',
      image: 'https://m.media-amazon.com/images/I/71xOy4hzs1L._AC_SL1500_.jpg',
      isHero: false,
      gridSize: 'small'
    },
    {
      id: 'bellroy-tech-kit',
      name: 'Bellroy Patty Mills Tech Kit',
      category: 'Tech Organizer',
      details: null,
      url: 'https://bellroy.com/products/tech-kit',
      image: 'https://m.media-amazon.com/images/I/71SZeQPR4JL._AC_SL1500_.jpg',
      isHero: false,
      gridSize: 'small'
    }
  ]
};

/**
 * Workspace API
 */
export const WorkspaceAPI = {
  /**
   * Get all workspace items as a flat array
   */
  getAll() {
    return [
      ...WORKSPACE_DATA.devices,
      ...WORKSPACE_DATA.display,
      ...WORKSPACE_DATA.accessories
    ];
  },

  /**
   * Get workspace items grouped by category
   */
  getByCategory() {
    return {
      'Devices': WORKSPACE_DATA.devices,
      'Display & Lighting': WORKSPACE_DATA.display,
      'Accessories': WORKSPACE_DATA.accessories
    };
  },

  /**
   * Get emoji for product
   */
  getEmoji(id) {
    const emojiMap = {
      'apple-macbook-air': '💻',
      'apple-ipad-air': '📱',
      'apple-airpods-pro': '🎧',
      'beats-pill': '🔊',
      'xiaomi-monitor': '🖥️',
      'xiaomi-light-bar': '💡',
      'logitech-mouse': '🖱️',
      'apple-magic-keyboard': '⌨️',
      'logitech-desk-mat': '🗒️',
      'bellroy-laptop-sleeve': '👜',
      'bellroy-tech-kit': '🎒'
    };
    return emojiMap[id] || '📦';
  },

  /**
   * Create image/emoji HTML with fallback
   */
  renderImage(item) {
    const emoji = this.getEmoji(item.id);
    if (item.image) {
      return `
        <img src="${item.image}" alt="${item.name}" class="workspace-item-image" 
             onerror="this.style.display='none'; this.parentNode.querySelector('.workspace-item-emoji').style.display='flex';" />
        <div class="workspace-item-emoji" style="display:none; font-size: 4rem; opacity: 0.8;">${emoji}</div>`;
    }
    return `<div class="workspace-item-emoji" style="display:flex; font-size: 4rem; opacity: 0.8;">${emoji}</div>`;
  },

  /**
   * Create workspace item card template
   */
  createCardTemplate(item) {
    const detailsText = item.details ? ` · ${item.details}` : '';
    const sizeClass = `workspace-item-${item.gridSize}`;
    const heroClass = item.isHero ? 'workspace-item-hero' : '';
    
    return `
      <a href="${item.url}" class="workspace-item ${sizeClass} ${heroClass}" id="${item.id}" 
         target="_blank" rel="noopener noreferrer">
        ${this.renderImage(item)}
        <div class="workspace-item-content">
          <h3 title="${item.name}">${item.name}</h3>
          <p class="text-muted" title="${item.category}${detailsText}">${item.category}${detailsText}</p>
        </div>
      </a>`;
  }
};

/**
 * Generate HTML for workspace grid (Circular Bento style)
 */
export function generateWorkspaceGrid() {
  const items = WorkspaceAPI.getAll();
  return items.map(item => WorkspaceAPI.createCardTemplate(item)).join('\n');
}

/**
 * Get sidebar menu structure for workspace
 */
export function getWorkspaceSidebarData() {
  const categories = WorkspaceAPI.getByCategory();
  
  // Category icon mapping
  const categoryIconMap = {
    'Devices': 'devices',
    'Display & Lighting': 'display',
    'Accessories': 'accessories'
  };
  
  return {
    title: 'Workspace',
    sections: Object.entries(categories).map(([heading, items]) => {
      const iconName = categoryIconMap[heading] || 'workspace';
      
      return {
        heading: `<span class="category-with-icon">${createInlineSVG(iconName)}${heading}</span><span class="count-badge">${items.length}</span>`,
        links: items.map(item => ({
          href: `#${item.id}`,
          label: item.name
        }))
      };
    })
  };
}

// Make functions globally available for backward compatibility
if (typeof window !== 'undefined') {
  window.WORKSPACE_DATA = WORKSPACE_DATA;
  window.WorkspaceAPI = WorkspaceAPI;
  window.generateWorkspaceGrid = generateWorkspaceGrid;
  window.getWorkspaceSidebarData = getWorkspaceSidebarData;
}
