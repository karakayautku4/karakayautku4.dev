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
    
    // Create mobile nav toggle button
    this.createNavToggle();
    
    // Create overlay
    this.createOverlay();
    
    // Bind events
    this.bindEvents();
    
    // Handle window resize
    this.handleResize();
  }
  
  createNavToggle() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    // Check if toggle already exists
    if (document.querySelector('.nav-toggle')) return;
    
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    // Append to body (not header, since header is sidebar)
    document.body.appendChild(toggle);
    this.navToggle = toggle;
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
    if (this.nav) {
      const links = this.nav.querySelectorAll('a:not([data-cv-download])');
      links.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.close();
          }
        });
      });
    }
    
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
    this.header?.classList.add('active');
    this.navOverlay?.classList.add('active');
    this.navToggle?.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.isOpen = false;
    this.navToggle?.classList.remove('active');
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
