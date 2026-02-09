/**
 * Sidebar Component Module
 * Dynamically generates sidebar navigation
 * @module sidebar
 */

import { icons, createSVG, createInlineSVG } from '../icons.js';

export class Sidebar {
  constructor() {
    this.init();
  }
  
  init() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    // Get current page
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const isInPagesFolder = path.includes('/pages/');
    const pathPrefix = isInPagesFolder ? '../' : '';
    
    header.innerHTML = this.generateSidebar(currentPage, pathPrefix);
    
    // Setup CV download modal after sidebar is rendered
    this.setupCVModal();
    
    // Initialize secondary sidebar for workspace, projects, hobbies, and bookmarks pages
    const projectPages = ['projects.html', 'pythonleague.html'];
    
    if (currentPage === 'workspace.html') {
      this.initSecondarySidebar('workspace');
    } else if (currentPage === 'hobbies.html') {
      this.initSecondarySidebar('hobbies');
    } else if (currentPage === 'bookmarks.html') {
      this.initSecondarySidebar('bookmarks');
    } else if (projectPages.includes(currentPage)) {
      this.initSecondarySidebar('projects');
    }
    
    // Setup smooth scroll for hash links
    this.setupSmoothScroll();
  }
  
  generateSidebar(currentPage, pathPrefix) {
    const navItems = [
      { href: 'index.html', label: 'Home', icon: 'home' },
      { href: 'about.html', label: 'About', icon: 'about' },
      { href: 'projects.html', label: 'Projects', icon: 'projects' },
      { href: 'workspace.html', label: 'Workspace', icon: 'workspace' }
    ];
    
    const otherItems = [
      { href: 'hobbies.html', label: 'Hobbies', icon: 'hobbies' },
      { href: 'bookmarks.html', label: 'Bookmarks', icon: 'bookmarks' }
    ];
    
    const onlineLinks = [
      { href: 'https://github.com/karakayautku4', label: 'GitHub', icon: 'github' },
      { href: 'https://roadmap.sh/u/karakayautku4', label: 'Roadmap.sh', icon: 'roadmap' },
      { href: 'https://tryhackme.com/p/karakayautku4', label: 'TryHackMe', icon: 'tryhackme' },
      { href: 'https://www.hackerrank.com/karakayautku4', label: 'HackerRank', icon: 'hackerrank' }
    ];
    
    const socialLinks = [
      { href: 'https://linkedin.com/in/karakayautku4', label: 'LinkedIn', icon: 'linkedin' },
      { href: 'https://x.com/karakayautku4', label: 'X', icon: 'x' },
      { href: 'https://instagram.com/karakayautku4', label: 'Instagram', icon: 'instagram' },
      { href: 'https://www.reddit.com/user/karakayautku4/', label: 'Reddit', icon: 'reddit' }
    ];
    
    return `
    <div class="profile-section">
      <img src="${pathPrefix}assets/images/profile.webp" alt="Utku Karakaya" class="profile-photo">
      <div class="profile-info">
        <a class="brand" href="${pathPrefix}index.html">Utku Karakaya</a>
        <p class="profile-title">Software Test Engineer</p>
      </div>
    </div>
    <nav class="nav">
      ${navItems.map(item => {
        const isActive = currentPage === item.href;
        let href;
        if (item.href === 'index.html') {
          href = pathPrefix ? `${pathPrefix}index.html` : `index.html`;
        } else {
          href = pathPrefix ? `${pathPrefix}pages/${item.href}` : `pages/${item.href}`;
        }
        return `
      <a href="${href}"${isActive ? ' aria-current="page"' : ''}>
        ${createSVG(item.icon)}
        ${item.label}
      </a>`;
      }).join('')}
      <a href="${pathPrefix}Utku-Karakaya-CV.pdf" data-cv-download>
        ${createSVG('cv')}
        CV
      </a>
      <h3 class="sidebar-title">Other</h3>
      <div class="social-links">
        ${otherItems.map(item => {
          const isActive = currentPage === item.href;
          const href = pathPrefix ? `${pathPrefix}pages/${item.href}` : `pages/${item.href}`;
          return `
        <a href="${href}"${isActive ? ' aria-current="page"' : ''}>
          ${createSVG(item.icon)}
          <span>${item.label}</span>
        </a>`;
        }).join('')}
      </div>
      <h3 class="sidebar-title">Online</h3>
      <div class="social-links">
        ${onlineLinks.map(item => `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer">
          ${createSVG(item.icon)}
          <span>${item.label}</span>
          ${createSVG('external', 12)}
        </a>`).join('')}
      </div>
      <h3 class="sidebar-title">Social</h3>
      <div class="social-links">
        ${socialLinks.map(item => `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer">
          ${createSVG(item.icon)}
          <span>${item.label}</span>
          ${createSVG('external', 12)}
        </a>`).join('')}
      </div>
    </nav>`;
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
    if (pageType === 'workspace') {
      // Use centralized workspace data if available
      if (typeof getWorkspaceSidebarData === 'function') {
        return getWorkspaceSidebarData();
      }
      // Fallback to empty data
      return {
        title: 'Workspace',
        sections: []
      };
    } else if (pageType === 'hobbies') {
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
    } else if (pageType === 'projects') {
      return {
        title: 'Projects',
        sections: [
          {
            heading: `<span class="category-with-icon">${createInlineSVG('projects')}Projects</span><span class="count-badge">1</span>`,
            links: [
              { href: 'pythonleague.html', label: 'PythonLeague' },
              { href: '#coming-soon', label: 'Coming soon...' }
            ]
          },
          {
            heading: `<span class="category-with-icon">${createInlineSVG('notes')}Notes</span><span class="count-badge">0</span>`,
            links: [
              { href: '#coming-soon', label: 'Coming soon...' }
            ]
          },
          {
            heading: `<span class="category-with-icon">${createInlineSVG('practice')}Practice</span><span class="count-badge">0</span>`,
            links: [
              { href: '#coming-soon', label: 'Coming soon...' }
            ]
          },
          {
            heading: `<span class="category-with-icon">${createInlineSVG('tools')}Tools</span><span class="count-badge">0</span>`,
            links: [
              { href: '#coming-soon', label: 'Coming soon...' }
            ]
          }
        ]
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
}

/**
 * Initialize sidebar
 */
export function initSidebar() {
  return new Sidebar();
}
