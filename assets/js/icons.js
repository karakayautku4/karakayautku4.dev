/**
 * Icons Module
 * Centralized SVG icon paths for consistent usage
 * @module icons
 */

export const icons = {
  // Navigation icons
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
  about: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  projects: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
  hobbies: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
  bookmarks: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
  workspace: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
  cv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
  
  // Social icons
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
  x: '<path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
  reddit: '<path d="M19.5,3.462c0.8,0,1.45,0.65,1.45,1.45s-0.65,1.45-1.45,1.45s-1.45-0.65-1.45-1.45S18.7,3.462,19.5,3.462z M21.6,10.2c0-1.326-1.074-2.4-2.4-2.4c-0.647,0-1.234,0.257-1.666,0.671c-1.449-0.785-3.282-1.289-5.291-1.364L13.8,3l3,0.6c0,0.993,0.806,1.8,1.8,1.8s1.8-0.806,1.8-1.8s-0.806-1.8-1.8-1.8c-0.719,0-1.338,0.422-1.626,1.03L13.8,1.8c-0.134-0.028-0.272,0.006-0.378,0.091s-0.175,0.209-0.188,0.347L12.3,6.807c-2.024,0.075-3.863,0.579-5.311,1.364C6.557,7.757,5.97,7.5,5.323,7.5c-1.326,0-2.4,1.074-2.4,2.4c0,0.883,0.478,1.651,1.189,2.07c-0.005,0.179-0.009,0.359-0.009,0.54c0,3.385,3.761,6.121,8.4,6.121s8.4-2.736,8.4-6.121c0-0.181-0.005-0.36-0.011-0.538C21.122,11.851,21.6,11.083,21.6,10.2z M6.6,13.8c0-0.662,0.538-1.2,1.2-1.2s1.2,0.538,1.2,1.2s-0.538,1.2-1.2,1.2S6.6,14.462,6.6,13.8z M17.4,17.4c-0.993,0.993-3,1.8-4.2,1.8s-3.207-0.806-4.2-1.8c-0.187-0.187-0.187-0.491,0-0.678c0.187-0.187,0.491-0.187,0.678,0c0.65,0.65,1.93,1.078,3.522,1.078s2.872-0.428,3.522-1.078c0.187-0.187,0.491-0.187,0.678,0C17.587,16.909,17.587,17.213,17.4,17.4z M16.2,15c-0.662,0-1.2-0.538-1.2-1.2s0.538-1.2,1.2-1.2s1.2,0.538,1.2,1.2S16.862,15,16.2,15z"/>',
  
  // Platform icons
  tryhackme: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 12l2 2 4-4"></path>',
  hackerrank: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
  roadmap: '<line x1="12" y1="2" x2="12" y2="22"></line><rect x="4" y="5" width="7" height="4" rx="1"></rect><rect x="13" y="9" width="7" height="4" rx="1"></rect><rect x="4" y="15" width="7" height="4" rx="1"></rect>',
  
  // UI icons
  external: '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>',
  close: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
  
  // Category icons (for sidebar menus)
  devices: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>',
  display: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
  accessories: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
  watch: '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>',
  notes: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
  practice: '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
  tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'
};

/**
 * Create SVG element from icon path
 * @param {string} iconName - Name of the icon from icons object
 * @param {number} size - Size in pixels (default: 16)
 * @returns {string} Complete SVG markup
 */
export function createSVG(iconName, size = 16) {
  const iconPath = icons[iconName];
  if (!iconPath) {
    console.warn(`Icon "${iconName}" not found`);
    return '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`;
}

/**
 * Create inline SVG with custom styles (for sidebar headings)
 * @param {string} iconName - Name of the icon
 * @param {number} size - Size in pixels
 * @returns {string} SVG markup with inline styles
 */
export function createInlineSVG(iconName, size = 16) {
  const iconPath = icons[iconName];
  if (!iconPath) {
    console.warn(`Icon "${iconName}" not found`);
    return '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 6px;">${iconPath}</svg>`;
}
