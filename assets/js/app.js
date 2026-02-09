/**
 * Main Application Entry Point
 * Initializes all modules for the site
 * @module app
 */

import { Navigation, initNavigation } from './modules/nav.js';
import { Sidebar, initSidebar } from './modules/sidebar.js';
import { Workspace3D, initWorkspace3D } from './modules/workspace-3d.js';
import { 
  WORKSPACE_DATA, 
  WorkspaceAPI, 
  generateWorkspaceGrid, 
  getWorkspaceSidebarData 
} from './modules/workspace-data.js';
import { 
  HOBBIES_DATA, 
  HobbiesAPI, 
  generateHobbiesGrid, 
  generateHobbiesSections, 
  getHobbiesSidebarData 
} from './modules/hobbies-data.js';
import { 
  BOOKMARKS_DATA, 
  BookmarksAPI, 
  generateBookmarksGrid, 
  getBookmarksSidebarData 
} from './modules/bookmarks-data.js';

// Export all modules for external use
export {
  Navigation,
  Sidebar,
  Workspace3D,
  WORKSPACE_DATA,
  WorkspaceAPI,
  HOBBIES_DATA,
  HobbiesAPI,
  BOOKMARKS_DATA,
  BookmarksAPI
};

/**
 * Initialize core functionality
 */
function initCore() {
  initNavigation();
  initSidebar();
}

/**
 * Initialize page-specific functionality
 */
function initPage() {
  const path = window.location.pathname;
  const currentPage = path.split('/').pop() || 'index.html';
  
  // Initialize workspace 3D effects on workspace page
  if (currentPage === 'workspace.html') {
    initWorkspace3D();
  }
}

/**
 * Make data functions globally available for backward compatibility
 */
function exposeGlobals() {
  // Workspace
  window.WORKSPACE_DATA = WORKSPACE_DATA;
  window.WorkspaceAPI = WorkspaceAPI;
  window.generateWorkspaceGrid = generateWorkspaceGrid;
  window.getWorkspaceSidebarData = getWorkspaceSidebarData;
  
  // Hobbies
  window.HOBBIES_DATA = HOBBIES_DATA;
  window.HobbiesAPI = HobbiesAPI;
  window.generateHobbiesGrid = generateHobbiesGrid;
  window.generateHobbiesSections = generateHobbiesSections;
  window.getHobbiesSidebarData = getHobbiesSidebarData;
  
  // Bookmarks
  window.BOOKMARKS_DATA = BOOKMARKS_DATA;
  window.BookmarksAPI = BookmarksAPI;
  window.generateBookmarksGrid = generateBookmarksGrid;
  window.getBookmarksSidebarData = getBookmarksSidebarData;
}

/**
 * Main initialization
 */
function init() {
  exposeGlobals();
  initCore();
  initPage();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
