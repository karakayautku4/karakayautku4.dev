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
  photos: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="9" cy="10" r="1.5"></circle><path d="M6 17l4.5-4.5 3.5 3.5 2.5-2.5L21 17"></path>',
  message: '<path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path><polyline points="22 8 12 14 2 8"></polyline>',
  
  // Social icons
  github: {
    body: '<path d="M12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.8 8.207 11.387.6.111.82-.261.82-.577 0-.287-.011-1.247-.017-2.25-3.338.724-4.042-1.607-4.042-1.607-.546-1.384-1.333-1.754-1.333-1.754-1.089-.743.083-.728.083-.728 1.205.085 1.838 1.237 1.838 1.237 1.069 1.832 2.805 1.302 3.49.996.108-.774.419-1.302.762-1.602-2.665-.303-5.467-1.332-5.467-5.93 0-1.313.469-2.386 1.236-3.227-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.303 1.227a11.53 11.53 0 0 1 3.003-.404c1.018 0 2.042.137 3.003.404 2.295-1.549 3.303-1.227 3.303-1.227.653 1.649.241 2.873.118 3.176.77.841 1.236 1.914 1.236 3.227 0 4.608-2.805 5.623-5.471 5.93.43.372.815 1.103.815 2.223 0 1.606-.014 2.898-.014 3.287 0 .319.218.694.825.577C20.563 21.8 24 17.304 24 12c0-6.628-5.372-12-12-12z"/>',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none'
  },
  linkedin: {
    body: '<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>',
    viewBox: '0 0 448 512',
    fill: 'currentColor',
    stroke: 'none'
  },
  x: {
    body: '<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"/>',
    viewBox: '0 0 448 512',
    fill: 'currentColor',
    stroke: 'none'
  },
  instagram: {
    body: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2'
  },
  reddit: {
    body: '<path d="M19.5,3.462c0.8,0,1.45,0.65,1.45,1.45s-0.65,1.45-1.45,1.45s-1.45-0.65-1.45-1.45S18.7,3.462,19.5,3.462z M21.6,10.2c0-1.326-1.074-2.4-2.4-2.4c-0.647,0-1.234,0.257-1.666,0.671c-1.449-0.785-3.282-1.289-5.291-1.364L13.8,3l3,0.6c0,0.993,0.806,1.8,1.8,1.8s1.8-0.806,1.8-1.8s-0.806-1.8-1.8-1.8c-0.719,0-1.338,0.422-1.626,1.03L13.8,1.8c-0.134-0.028-0.272,0.006-0.378,0.091s-0.175,0.209-0.188,0.347L12.3,6.807c-2.024,0.075-3.863,0.579-5.311,1.364C6.557,7.757,5.97,7.5,5.323,7.5c-1.326,0-2.4,1.074-2.4,2.4c0,0.883,0.478,1.651,1.189,2.07c-0.005,0.179-0.009,0.359-0.009,0.54c0,3.385,3.761,6.121,8.4,6.121s8.4-2.736,8.4-6.121c0-0.181-0.005-0.36-0.011-0.538C21.122,11.851,21.6,11.083,21.6,10.2z M6.6,13.8c0-0.662,0.538-1.2,1.2-1.2s1.2,0.538,1.2,1.2s-0.538,1.2-1.2,1.2S6.6,14.462,6.6,13.8z M17.4,17.4c-0.993,0.993-3,1.8-4.2,1.8s-3.207-0.806-4.2-1.8c-0.187-0.187-0.187-0.491,0-0.678c0.187-0.187,0.491-0.187,0.678,0c0.65,0.65,1.93,1.078,3.522,1.078s2.872-0.428,3.522-1.078c0.187-0.187,0.491-0.187,0.678,0C17.587,16.909,17.587,17.213,17.4,17.4z M16.2,15c-0.662,0-1.2-0.538-1.2-1.2s0.538-1.2,1.2-1.2s1.2,0.538,1.2,1.2S16.862,15,16.2,15z"/>',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none'
  },
  
  // Platform icons
  tryhackme: {
    body: '<path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27A3.273 3.273 0 0 1 6.59 7.08a.625.625 0 0 0 .7-1.035 4.488 4.488 0 0 0-1.68-.69 5.223 5.223 0 0 1 5.096-4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0-.488.305.625.625 0 1 0 .731 1.013 3.245 3.245 0 0 1 1.912-.616 3.278 3.278 0 0 1 3.203 2.61.625.625 0 0 0 1.225-.251 4.533 4.533 0 0 0-4.428-3.61 4.54 4.54 0 0 0-.958.105C16.556 2.328 13.9 0 10.705 0z"/>',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none'
  },
  hackerrank: {
    body: '<path d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z"/>',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    stroke: 'none'
  },
  
  // UI icons
  external: '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>',
  close: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
  location: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
  weather: '<path d="M6 17.5h11a4.5 4.5 0 0 0 .35-8.99A6 6 0 0 0 5.2 10.3 3.5 3.5 0 0 0 6 17.5z"></path><line x1="9" y1="3" x2="9" y2="5"></line><line x1="3.5" y1="6" x2="5" y2="7"></line><line x1="2" y1="12" x2="4" y2="12"></line>',
  wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><path d="M12 20h.01"></path>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><line x1="6" y1="10" x2="10" y2="10"></line><line x1="6" y1="12" x2="14" y2="12"></line><line x1="6" y1="14" x2="12" y2="14"></line>',
  download: '<path d="M12 3v11"></path><polyline points="7 10 12 15 17 10"></polyline><path d="M5 21h14"></path>',
  
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
function resolveIcon(iconName) {
  const icon = icons[iconName];
  if (!icon) {
    return null;
  }

  if (typeof icon === 'string') {
    return {
      body: icon,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    };
  }

  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    ...icon
  };
}

export function createSVG(iconName, size = 16) {
  const icon = resolveIcon(iconName);
  if (!icon) {
    console.warn(`Icon "${iconName}" not found`);
    return '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="${icon.fill}" stroke="${icon.stroke}" stroke-width="${icon.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${icon.body}</svg>`;
}

/**
 * Create inline SVG with custom styles (for sidebar headings)
 * @param {string} iconName - Name of the icon
 * @param {number} size - Size in pixels
 * @returns {string} SVG markup with inline styles
 */
export function createInlineSVG(iconName, size = 16) {
  const icon = resolveIcon(iconName);
  if (!icon) {
    console.warn(`Icon "${iconName}" not found`);
    return '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="${icon.fill}" stroke="${icon.stroke}" stroke-width="${icon.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 6px;">${icon.body}</svg>`;
}
