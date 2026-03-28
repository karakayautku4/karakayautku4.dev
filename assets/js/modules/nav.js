/**
 * Navigation Module
 * Handles mobile navigation toggle and overlay
 * @module nav
 */

export class Navigation {
  constructor() {
    this.navToggle = null;
    this.nav = null;
    this.navOverlay = null;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // Get references
    this.header = document.querySelector('.site-header');
    this.nav = document.querySelector('.nav');
    
    // Create mobile top bar and nav toggle
    this.createMobileTopbar();
    
    // Create overlay
    this.createOverlay();
    
    // Bind events
    this.bindEvents();
    
    // Handle window resize
    this.handleResize();
  }
  
  createMobileTopbar() {
    if (document.querySelector('.mobile-topbar')) {
      this.navToggle = document.querySelector('.nav-toggle');
      return;
    }

    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const isInPagesFolder = path.includes('/pages/');
    const homeHref = isInPagesFolder ? '../index.html' : 'index.html';
    const pageTitles = {
      'index.html': 'Home',
      'about.html': 'About',
      'projects.html': 'Projects',
      'hobbies.html': 'Hobbies',
      'bookmarks.html': 'Bookmarks',
      '404.html': 'Not Found'
    };

    const topbar = document.createElement('div');
    topbar.className = 'mobile-topbar';
    topbar.innerHTML = `
      <a class="mobile-topbar-brand" href="${homeHref}">
        <img src="${isInPagesFolder ? '../' : ''}assets/images/profile.webp" alt="Utku Karakaya">
        <div class="mobile-topbar-copy">
          <strong>Utku Karakaya</strong>
          <span>${pageTitles[currentPage] || 'Site'}</span>
        </div>
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    `;

    document.body.appendChild(topbar);
    this.navToggle = topbar.querySelector('.nav-toggle');
  }
  
  createOverlay() {
    // Check if overlay already exists
    if (document.querySelector('.nav-overlay')) {
      this.navOverlay = document.querySelector('.nav-overlay');
      return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    this.navOverlay = overlay;
  }
  
  bindEvents() {
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggle());
    }
    
    if (this.navOverlay) {
      this.navOverlay.addEventListener('click', () => this.close());
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close on nav link click (mobile)
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('.site-header a');
      if (navLink && window.innerWidth <= 768 && this.isOpen) {
        this.close();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    this.isOpen = true;
    this.navToggle?.classList.add('active');
    document.querySelector('.mobile-topbar')?.classList.add('menu-open');
    this.header?.classList.add('active');
    this.navOverlay?.classList.add('active');
    this.navToggle?.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.isOpen = false;
    this.navToggle?.classList.remove('active');
    document.querySelector('.mobile-topbar')?.classList.remove('menu-open');
    this.header?.classList.remove('active');
    this.navOverlay?.classList.remove('active');
    this.navToggle?.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  handleResize() {
    // Close nav if window is resized to desktop size
    if (window.innerWidth > 768 && this.isOpen) {
      this.close();
    }
  }
}

/**
 * Initialize navigation
 * Can be called directly or will auto-init if this is the entry point
 */
export function initNavigation() {
  return new Navigation();
}
