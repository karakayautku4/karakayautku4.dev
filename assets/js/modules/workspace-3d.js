/**
 * 3D Tilt Effect Module for Workspace Items
 * @module workspace-3d
 */

export class Workspace3D {
  constructor() {
    this.items = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupItems());
    } else {
      this.setupItems();
    }
  }

  setupItems() {
    this.items = document.querySelectorAll('.workspace-item');
    
    this.items.forEach(item => {
      item.addEventListener('mousemove', (e) => this.handleMouseMove(e, item));
      item.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, item));
      item.addEventListener('click', (e) => this.handleClick(e, item));
    });
  }

  handleMouseMove(e, item) {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    item.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
      scale(1.05)
    `;
    
    // Add shine effect
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    item.style.background = `
      radial-gradient(circle at ${shineX}% ${shineY}%, 
        rgba(88, 166, 255, 0.15) 0%, 
        transparent 50%),
      linear-gradient(135deg, var(--bg) 0%, var(--bg-secondary) 100%)
    `;
  }

  handleMouseLeave(e, item) {
    item.style.transform = '';
    item.style.background = '';
  }

  handleClick(e, item) {
    // Add a burst animation on click
    item.style.animation = 'none';
    setTimeout(() => {
      item.style.animation = '';
    }, 10);
    
    // Create particle effect
    this.createParticles(e, item);
  }

  createParticles(e, item) {
    const rect = item.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.borderRadius = '50%';
      particle.style.background = 'rgba(88, 166, 255, 0.8)';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / 8;
      const velocity = 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let posX = 0;
      let posY = 0;
      let opacity = 1;
      
      const animate = () => {
        posX += vx * 0.016;
        posY += vy * 0.016;
        opacity -= 0.02;
        
        particle.style.transform = `translate(${posX}px, ${posY}px)`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };
      
      animate();
    }
  }
}

/**
 * Initialize workspace 3D effects
 */
export function initWorkspace3D() {
  return new Workspace3D();
}
