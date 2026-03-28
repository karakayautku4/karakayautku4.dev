import { createSVG } from '../icons.js';

const PDFJS_MODULE_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs';
const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
let pdfJsLoader = null;

const DESKTOP_APPS = {
  home: {
    title: 'Desktop',
    icon: 'home',
    kind: 'desktop'
  },
  about: {
    title: 'About',
    icon: 'about',
    kind: 'iframe',
    src: 'pages/about.html',
    width: 860,
    height: 640
  },
  projects: {
    title: 'Projects',
    icon: 'projects',
    kind: 'iframe',
    src: 'pages/projects.html',
    width: 760,
    height: 560
  },
  hobbies: {
    title: 'Hobbies',
    icon: 'hobbies',
    kind: 'iframe',
    src: 'pages/hobbies.html',
    width: 920,
    height: 680
  },
  bookmarks: {
    title: 'Bookmarks',
    icon: 'bookmarks',
    kind: 'iframe',
    src: 'pages/bookmarks.html',
    width: 980,
    height: 700
  },
  cv: {
    title: 'CV',
    icon: 'cv',
    kind: 'document',
    src: 'Utku-Karakaya-CV.pdf',
    width: 900,
    height: 680,
    fallback: {
      kicker: 'Document Window',
      description: 'This window tries the browser\'s native PDF renderer first. If the current environment blocks embedded PDF previews, it falls back to a clean document panel instead of leaving an empty frame.',
      note: 'On the deployed site this should render directly inside the window. In local file previews or restricted embedded browsers, opening the PDF in a new tab is the safer path.',
      points: [
        { label: 'Format', value: 'PDF', note: 'Native browser preview when supported.' },
        { label: 'Mode', value: 'In-window', note: 'Matches the desktop app feel.' },
        { label: 'Fallback', value: 'Open externally', note: 'Used when embed restrictions apply.' }
      ]
    }
  },
  photos: {
    title: 'Photos',
    icon: 'photos',
    kind: 'photos',
    width: 980,
    height: 700,
    gallery: {
      kicker: 'Personal Gallery',
      description: 'A quiet personal gallery with a few favorite photos kept inside the desktop experience.',
      images: [
        { src: 'assets/images/pictures/1.jpeg', alt: 'Personal photo 1' },
        { src: 'assets/images/pictures/2.jpeg', alt: 'Personal photo 2' },
        { src: 'assets/images/pictures/3.jpeg', alt: 'Personal photo 3' },
        { src: 'assets/images/pictures/4.jpeg', alt: 'Personal photo 4' }
      ]
    }
  },
  message: {
    title: 'Message Me',
    icon: 'message',
    kind: 'mailbox',
    url: 'mailto:k4utku@gmail.com',
    width: 760,
    height: 560,
    mailbox: {
      address: 'k4utku@gmail.com',
      kicker: 'Inbox Window',
      description: 'A quick way to reach out directly from the desktop. Write a short subject and message, then open your mail client with everything filled in.',
      availability: 'Best for collaboration, opportunities, project ideas, or a direct hello.',
      placeholders: {
        subject: 'Quick hello from karakayautku4.dev',
        body: 'Hi Utku,%0A%0AI came across your site and wanted to reach out about...'
      },
      note: 'This site is static, so sending is handled by your own email app.'
    }
  },
  github: {
    title: 'GitHub',
    icon: 'github',
    kind: 'github-profile',
    url: 'https://github.com/karakayautku4',
    width: 980,
    height: 700,
    username: 'karakayautku4',
    fallback: {
      kicker: 'GitHub App',
      description: 'This window tries to load public GitHub profile data directly from the GitHub API so the desktop can show a real custom app instead of a blocked embed.',
      note: 'If the API request is rate-limited or blocked in the current environment, the window still stays usable and lets you jump straight to the live profile.',
      points: [
        { label: 'Platform', value: 'GitHub', note: 'Public profile and repositories.' },
        { label: 'Mode', value: 'Custom app', note: 'Public data rendered in your own UI.' },
        { label: 'Action', value: 'Open externally', note: 'Use the header action for the live page.' }
      ]
    }
  },
  tryhackme: {
    title: 'TryHackMe',
    icon: 'tryhackme',
    kind: 'browser',
    url: 'https://tryhackme.com/p/karakayautku4',
    width: 980,
    height: 700,
    fallback: {
      kicker: 'Browser Window',
      description: 'This window first attempts a real in-page browser load for TryHackMe, then gracefully drops to a launcher panel if the platform blocks embedding.',
      note: 'That keeps the interaction premium instead of pretending the embedded page worked when the remote site refused it.',
      points: [
        { label: 'Platform', value: 'TryHackMe', note: 'Hands-on labs and guided rooms.' },
        { label: 'Mode', value: 'Live embed first', note: 'Real page when allowed.' },
        { label: 'Fallback', value: 'Graceful', note: 'Browser shell remains intact.' }
      ]
    }
  },
  hackerrank: {
    title: 'HackerRank',
    icon: 'hackerrank',
    kind: 'profile',
    url: 'https://www.hackerrank.com/karakayautku4',
    width: 860,
    height: 520,
    profile: {
      kicker: 'Coding Profile',
      handle: 'hackerrank.com/karakayautku4',
      description: 'A compact profile view for coding challenges, skill signals, and direct access to the public HackerRank page without relying on a blocked embed.',
      tags: ['Python', 'Challenges', 'Problem solving'],
      points: []
    }
  },
  linkedin: {
    title: 'LinkedIn',
    icon: 'linkedin',
    kind: 'profile',
    url: 'https://linkedin.com/in/karakayautku4',
    width: 860,
    height: 520,
    profile: {
      kicker: 'Professional Profile',
      handle: 'linkedin.com/in/karakayautku4',
      description: 'A focused profile view for career context, current role, and public professional presence without pretending the real LinkedIn UI is embedded here.',
      tags: ['Automation', 'QA', 'Python'],
      points: []
    }
  },
  x: {
    title: 'X',
    icon: 'x',
    kind: 'profile',
    url: 'https://x.com/karakayautku4',
    width: 860,
    height: 520,
    profile: {
      kicker: 'Social Feed Entry',
      handle: '@karakayautku4',
      description: 'A lightweight profile window that points to short-form updates and public posts without depending on X to allow embedding.',
      tags: ['Notes', 'Links', 'Thoughts'],
      points: []
    }
  },
  instagram: {
    title: 'Instagram',
    icon: 'instagram',
    kind: 'profile',
    url: 'https://instagram.com/karakayautku4',
    width: 860,
    height: 520,
    profile: {
      kicker: 'Visual Profile',
      handle: '@karakayautku4',
      description: 'A compact profile view for the more visual side of the presence, without forcing the full Instagram shell into the desktop metaphor.',
      tags: ['Visual', 'Personal', 'Snapshot'],
      points: []
    }
  },
  reddit: {
    title: 'Reddit',
    icon: 'reddit',
    kind: 'profile',
    url: 'https://www.reddit.com/user/karakayautku4/',
    width: 860,
    height: 520,
    profile: {
      kicker: 'Community Profile',
      handle: 'u/karakayautku4',
      description: 'A community-facing profile card that fits the desktop system better than a broken embed, while still giving direct access to the real Reddit page.',
      tags: ['Community', 'Threads', 'Discussion'],
      points: []
    }
  }
};

const DESKTOP_SHORTCUTS = [
  { appId: 'cv', label: 'CV' },
  { appId: 'photos', label: 'Photos' },
  { appId: 'message', label: 'Message' }
];

const MENUBAR_ITEMS = {
  desktop: ['File', 'Edit', 'View', 'Go', 'Window'],
  about: ['Profile', 'History', 'Skills', 'Window'],
  message: ['Inbox', 'Compose', 'Window'],
  photos: ['Library', 'View', 'Window'],
  projects: ['Projects', 'Status', 'Archive', 'Window'],
  hobbies: ['Collections', 'Notes', 'Window', 'Help'],
  bookmarks: ['Bookmarks', 'Reading', 'Tools', 'Window'],
  github: ['Profile', 'Repos', 'Search', 'Window'],
  tryhackme: ['Rooms', 'Profile', 'Practice', 'Window'],
  hackerrank: ['Challenges', 'Badges', 'Profile', 'Window']
};

const MENUBAR_MENUS = {
  desktop: {
    File: ['New window', 'Close all windows', 'Show desktop'],
    Edit: ['Undo', 'Copy', 'Paste'],
    View: ['Toggle widgets', 'Reset layout', 'Refresh weather'],
    Go: ['About', 'Projects', 'Bookmarks'],
    Window: ['Minimize all', 'Bring all to front', 'Tile left and right']
  },
  about: {
    Profile: ['Open about window', 'Pin profile widget', 'Jump to home'],
    History: ['Career path', 'Experience notes', 'Recent updates'],
    Skills: ['Automation', 'Python', 'Security'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  message: {
    Inbox: ['Open message window', 'Copy address', 'Open externally'],
    Compose: ['Compose email'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  photos: {
    Library: ['Open photos window', 'Show desktop'],
    View: ['Zoom', 'Close window'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  projects: {
    Projects: ['Featured work', 'Archive', 'Open project page'],
    Status: ['Active', 'In progress', 'On hold'],
    Archive: ['Past builds', 'Experiments', 'References'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  hobbies: {
    Collections: ['Music', 'Learning', 'Daily rituals'],
    Notes: ['Highlights', 'Recent finds', 'Personal picks'],
    Window: ['Minimize', 'Zoom', 'Close window'],
    Help: ['About this view', 'Back to desktop', 'Open externally']
  },
  bookmarks: {
    Bookmarks: ['Curated links', 'Save for later', 'Open bookmark page'],
    Reading: ['Articles', 'Tools', 'Inspiration'],
    Tools: ['Search', 'Sort', 'Open all'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  github: {
    Profile: ['Open profile', 'Repositories', 'Pinned work'],
    Repos: ['Public repos', 'Recent updates', 'Source code'],
    Search: ['Find project', 'Search profile', 'Open externally'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  tryhackme: {
    Rooms: ['Recent rooms', 'Learning paths', 'Open profile'],
    Profile: ['Badges', 'Streaks', 'Overview'],
    Practice: ['Labs', 'Walkthroughs', 'Browser shell'],
    Window: ['Minimize', 'Zoom', 'Close window']
  },
  hackerrank: {
    Challenges: ['Algorithms', 'Python', 'Problem solving'],
    Badges: ['Verified skills', 'Track progress', 'Recent wins'],
    Profile: ['Open profile', 'Certificates', 'External page'],
    Window: ['Minimize', 'Zoom', 'Close window']
  }
};

const DESKTOP_STORAGE_KEY = 'karakayautku4.desktop.widgets';
const DESKTOP_FIRST_VISIT_KEY = 'karakayautku4.desktop.firstVisitComplete';
const DESKTOP_WINDOW_STORAGE_KEY = 'karakayautku4.desktop.windows';
const DESKTOP_WEATHER_STORAGE_KEY = 'karakayautku4.desktop.weather';
const DESKTOP_WEATHER_TTL_MS = 15 * 60 * 1000;
const DEFAULT_WIDGET_POSITIONS = {
  profile: { left: 24, top: 24 }
};

function toEmbeddedSrc(src) {
  return `${src}${src.includes('?') ? '&' : '?'}embed=1`;
}

async function loadPdfJs() {
  if (!pdfJsLoader) {
    pdfJsLoader = import(PDFJS_MODULE_URL).then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      return pdfjsLib;
    });
  }

  return pdfJsLoader;
}

export class DesktopRuntime {
  constructor(root, homeMarkup) {
    this.root = root;
    this.homeMarkup = homeMarkup;
    this.profileWidget = this.extractProfileWidgetData();
    this.weatherData = null;
    this.windows = new Map();
    this.dockLaunchers = new Map();
    this.activeAppId = null;
    this.activeMenuName = null;
    this.zIndex = 20;
    this.windowOffset = 0;
    this.clockTimer = null;
    this.handleDocumentPointerDown = this.onDocumentPointerDown.bind(this);
    this.handleDocumentKeydown = this.onDocumentKeydown.bind(this);
    this.init();
  }

  init() {
    this.root.innerHTML = this.renderShell();
    this.windowsArea = this.root.querySelector('[data-desktop-windows]');
    this.menuState = this.root.querySelector('[data-desktop-menu-state]');
    this.menuItems = this.root.querySelector('[data-desktop-menu-items]');
    this.clockNode = this.root.querySelector('[data-desktop-clock]');
    this.dockMount = this.root.querySelector('[data-desktop-dock]');
    this.profileWidgetNode = this.root.querySelector('[data-profile-widget]');
    this.weatherSummary = this.root.querySelector('[data-menubar-weather]');

    this.moveDockIntoDesktop();
    this.dockNode = this.root.querySelector('.nav-panel');
    this.bindDock();
    this.bindDesktopShortcuts();
    this.bindGlobalEvents();
    if (this.profileWidgetNode) {
      this.applyWidgetPosition(
        this.profileWidgetNode,
        DEFAULT_WIDGET_POSITIONS.profile.left,
        DEFAULT_WIDGET_POSITIONS.profile.top
      );
    }
    this.startClock();
    this.hydrateWeather();
    this.scheduleWeatherRefresh();
    this.updateMenubarState();
    this.syncDockState();
    this.openInitialWindow();
  }

  renderShell() {
    return `
      <div class="desktop-runtime">
        <header class="desktop-menubar">
          <div class="desktop-menubar-section desktop-menubar-left">
            <strong>karakayautku4</strong>
            <span class="desktop-menubar-divider"></span>
            <nav class="desktop-menubar-apps" aria-label="Desktop menu">
              <span class="desktop-menubar-state" data-desktop-menu-state>Desktop</span>
              <div class="desktop-menubar-items" data-desktop-menu-items>
                ${this.renderMenubarItems('desktop')}
              </div>
            </nav>
          </div>
          <div class="desktop-menubar-section desktop-menubar-right">
            <span class="desktop-menubar-chip">Eindhoven</span>
            <span class="desktop-menubar-chip" data-menubar-weather>${createSVG('weather', 12)} Weather loading</span>
            <span data-desktop-clock></span>
          </div>
        </header>
        <section class="desktop-stage">
          ${this.renderProfileWidget()}
          ${this.renderDesktopShortcuts()}
          <div class="desktop-windows-area" data-desktop-windows></div>
          <div class="desktop-dock-slot" data-desktop-dock></div>
        </section>
      </div>
    `;
  }

  renderDesktopShortcuts() {
    return `
      <div class="desktop-shortcuts" aria-label="Desktop shortcuts">
        ${DESKTOP_SHORTCUTS.map(({ appId, label }) => {
          const app = DESKTOP_APPS[appId];
          if (!app) {
            return '';
          }

          return `
            <button class="desktop-shortcut" type="button" data-desktop-shortcut="${this.escapeHTML(appId)}" data-shortcut-app="${this.escapeHTML(appId)}" aria-label="Open ${this.escapeHTML(label)}">
              <span class="desktop-shortcut-icon">${createSVG(app.icon, 22)}</span>
              <span class="desktop-shortcut-label">${this.escapeHTML(label)}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  renderMenubarItems(stateKey) {
    const labels = MENUBAR_ITEMS[stateKey] || MENUBAR_ITEMS.desktop;
    const menus = MENUBAR_MENUS[stateKey] || MENUBAR_MENUS.desktop;

    return labels
      .map((item) => {
        const entries = menus[item] || ['Open', 'Close'];
        return `
          <div class="desktop-menubar-menu" data-menu-name="${this.escapeHTML(item)}">
            <button class="desktop-menubar-trigger" type="button" data-menu-trigger aria-haspopup="true" aria-expanded="false">
              ${this.escapeHTML(item)}
            </button>
            <div class="desktop-menubar-dropdown" data-menu-dropdown role="menu" aria-label="${this.escapeHTML(item)} menu">
              ${entries.map((entry) => {
                const action = this.getMenubarAction(stateKey, item, entry);
                return `<button class="desktop-menubar-dropdown-item" type="button" role="menuitem"${action ? ` data-menu-action="${this.escapeHTML(action)}"` : ''}>${this.escapeHTML(entry)}</button>`;
              }).join('')}
            </div>
          </div>
        `;
      })
      .join('');
  }

  getMenubarAction(stateKey, menuName, entry) {
    if (entry === 'Show desktop' || entry === 'Jump to home' || entry === 'Back to desktop') {
      return 'show-desktop';
    }

    if (entry === 'Close all windows') {
      return 'close-all-windows';
    }

    if (entry === 'Toggle widgets' || entry === 'Pin profile widget') {
      return 'toggle-widgets';
    }

    if (entry === 'Reset layout') {
      return 'reset-layout';
    }

    if (entry === 'Refresh weather') {
      return 'refresh-weather';
    }

    if (entry === 'Minimize all') {
      return 'minimize-all';
    }

    if (entry === 'Bring all to front') {
      return 'bring-all-to-front';
    }

    if (entry === 'Tile left and right') {
      return 'tile-left-right';
    }

    if (entry === 'About') {
      return 'open-app:about';
    }

    if (entry === 'Projects' || entry === 'Open project page') {
      return 'open-app:projects';
    }

    if (entry === 'Bookmarks' || entry === 'Open bookmark page') {
      return 'open-app:bookmarks';
    }

    if (entry === 'Open about window') {
      return 'open-app:about';
    }

    if (entry === 'Open photos window') {
      return 'open-app:photos';
    }

    if (entry === 'Open message window') {
      return 'open-app:message';
    }

    if (entry === 'Compose email') {
      return 'compose-email:message';
    }

    if (entry === 'Copy address') {
      return 'copy-email:message';
    }

    if (entry === 'Minimize') {
      return 'minimize-active';
    }

    if (entry === 'Zoom') {
      return 'zoom-active';
    }

    if (entry === 'Close window') {
      return 'close-active';
    }

    if (entry === 'Open externally') {
      return `open-external:${stateKey}`;
    }

    if (entry === 'Open profile' && ['github', 'tryhackme', 'hackerrank'].includes(stateKey)) {
      return `open-external:${stateKey}`;
    }

    return '';
  }

  moveDockIntoDesktop() {
    const dock = document.querySelector('.nav-panel');

    if (!dock || !this.dockMount) {
      return;
    }

    this.dockMount.appendChild(dock);
  }

  extractProfileWidgetData() {
    const profileCard = document.querySelector('.profile-section');
    const profileImage = profileCard?.querySelector('.profile-photo');
    const brandLink = profileCard?.querySelector('.brand');
    const titleNode = profileCard?.querySelector('.profile-title');
    const metaNode = profileCard?.querySelector('.profile-meta');

    return {
      imageSrc: profileImage?.getAttribute('src') || 'assets/images/profile.webp',
      imageAlt: profileImage?.getAttribute('alt') || 'Utku Karakaya',
      name: brandLink?.textContent?.trim() || 'Utku Karakaya',
      homeHref: brandLink?.getAttribute('href') || 'index.html',
      title: titleNode?.textContent?.trim() || 'Automation Engineer / Python',
      location: metaNode?.textContent?.trim() || 'Based in Eindhoven',
      employerName: 'Forescout',
      employerHref: 'https://www.forescout.com/',
      employerLogo: 'assets/images/forescout-dark.svg',
      employerLogoAlt: 'Forescout logo'
    };
  }

  renderProfileWidget() {
    const profile = this.profileWidget;

    return `
      <aside class="desktop-profile-widget" data-profile-widget data-widget-id="profile" aria-label="Profile widget">
        <div class="desktop-profile-widget-head">
          <p class="desktop-widget-kicker">Profile</p>
          <span class="desktop-widget-status">Status</span>
        </div>
        <div class="desktop-profile-widget-body">
          <img src="${profile.imageSrc}" alt="${this.escapeHTML(profile.imageAlt)}" class="desktop-profile-widget-photo">
          <div class="desktop-profile-widget-copy">
            <a href="${profile.homeHref}" class="desktop-profile-widget-name">${this.escapeHTML(profile.name)}</a>
            <p class="desktop-profile-widget-title">${this.escapeHTML(profile.title)}</p>
            <a href="${profile.employerHref}" class="desktop-profile-widget-employer" target="_blank" rel="noopener noreferrer" aria-label="Currently in ${this.escapeHTML(profile.employerName)}">
              <span class="desktop-profile-widget-employer-label">Currently in</span>
              <img src="${profile.employerLogo}" alt="${this.escapeHTML(profile.employerLogoAlt)}" class="desktop-profile-widget-employer-logo">
            </a>
          </div>
        </div>
      </aside>
    `;
  }

  bindDock() {
    const appLaunchers = document.querySelectorAll('.nav-panel a[data-dock-icon]');
    const appMap = {
      home: 'home',
      about: 'about',
      projects: 'projects',
      hobbies: 'hobbies',
      bookmarks: 'bookmarks',
      github: 'github',
      tryhackme: 'tryhackme',
      hackerrank: 'hackerrank',
      linkedin: 'linkedin',
      x: 'x',
      instagram: 'instagram',
      reddit: 'reddit'
    };

    let suppressNextClick = false;

    appLaunchers.forEach((launcher) => {
      const icon = launcher.getAttribute('data-dock-icon');
      const appId = appMap[icon];
      if (!appId) {
        return;
      }

      this.dockLaunchers.set(appId, launcher);

      launcher.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressNextClick = true;
        this.pulseDockLauncher(appId);
        this.openWindow(appId);
      });

      launcher.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (suppressNextClick) {
          suppressNextClick = false;
          return;
        }

        this.pulseDockLauncher(appId);
        this.openWindow(appId);
      });

      launcher.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        this.pulseDockLauncher(appId);
        this.openWindow(appId);
      });
    });

    const dockNav = this.dockNode?.querySelector('.nav');
    dockNav?.addEventListener('pointermove', (event) => {
      this.updateDockMagnification(event.clientX);
    });
    dockNav?.addEventListener('pointerleave', () => {
      this.resetDockMagnification();
    });
    dockNav?.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!dockNav.matches(':focus-within')) {
          this.resetDockMagnification();
        }
      }, 0);
    });

    this.syncDockState();
  }

  bindDesktopShortcuts() {
    this.root.querySelectorAll('[data-desktop-shortcut]').forEach((shortcutNode) => {
      shortcutNode.addEventListener('click', () => {
        const appId = shortcutNode.getAttribute('data-desktop-shortcut');
        if (appId) {
          this.openWindow(appId);
        }
      });
    });
  }

  startClock() {
    const renderClock = () => {
      if (!this.clockNode) {
        return;
      }

      this.clockNode.textContent = new Intl.DateTimeFormat('en', {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date());
    };

    renderClock();
    this.clockTimer = window.setInterval(renderClock, 30_000);
  }

  hydrateWeather() {
    const cachedWeather = this.readStoredWeather();
    if (cachedWeather) {
      this.weatherData = cachedWeather;
      this.renderWeather();
    }
  }

  scheduleWeatherRefresh() {
    const runRefresh = () => {
      this.initWeather();
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runRefresh, { timeout: 1200 });
      return;
    }

    window.setTimeout(runRefresh, 120);
  }

  async initWeather(forceRefresh = false) {
    if (!this.weatherSummary) {
      return;
    }

    if (!forceRefresh) {
      const cachedWeather = this.readStoredWeather();
      if (cachedWeather) {
        this.weatherData = cachedWeather;
        this.renderWeather();
      }
    }

    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4416&longitude=5.4697&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto');
      if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
      }

      const payload = await response.json();
      const current = payload.current || {};
      this.weatherData = {
        temperature: typeof current.temperature_2m === 'number' ? `${Math.round(current.temperature_2m)}°C` : '--',
        wind: typeof current.wind_speed_10m === 'number' ? `${Math.round(current.wind_speed_10m)} km/h` : '-- km/h',
        condition: this.getWeatherLabel(current.weather_code),
        updated: this.formatRelativeTime(current.time)
      };
      this.writeStoredWeather(this.weatherData);
    } catch {
      this.weatherData = this.weatherData || {
        temperature: '--',
        wind: '-- km/h',
        condition: 'Weather unavailable',
        updated: 'offline'
      };
    }

    this.renderWeather();
  }

  renderWeather() {
    const data = this.weatherData;
    if (!data) {
      return;
    }

    this.weatherSummary.innerHTML = `${createSVG('weather', 12)} ${this.escapeHTML(data.temperature)} ${this.escapeHTML(data.condition)}`;
  }

  readStoredWeather() {
    try {
      const rawValue = window.localStorage.getItem(DESKTOP_WEATHER_STORAGE_KEY);
      if (!rawValue) {
        return null;
      }

      const parsed = JSON.parse(rawValue);
      if (!parsed?.savedAt || (Date.now() - parsed.savedAt) > DESKTOP_WEATHER_TTL_MS) {
        return null;
      }

      return parsed.data || null;
    } catch {
      return null;
    }
  }

  writeStoredWeather(data) {
    try {
      window.localStorage.setItem(DESKTOP_WEATHER_STORAGE_KEY, JSON.stringify({
        savedAt: Date.now(),
        data
      }));
    } catch {
      // Ignore storage failures and keep the desktop usable.
    }
  }

  getWeatherLabel(code) {
    if (code === 0) return 'Clear';
    if ([1, 2].includes(code)) return 'Partly cloudy';
    if (code === 3) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
    if ([95, 96, 99].includes(code)) return 'Thunderstorm';
    return 'Stable';
  }

  formatRelativeTime(isoValue) {
    if (!isoValue) {
      return 'just now';
    }

    const timestamp = new Date(isoValue).getTime();
    if (Number.isNaN(timestamp)) {
      return 'just now';
    }

    const diffMinutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
    if (diffMinutes < 1) {
      return 'just now';
    }
    if (diffMinutes === 1) {
      return '1 min ago';
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`;
    }
    const hours = Math.round(diffMinutes / 60);
    return `${hours}h ago`;
  }

  openWindow(appId, options = {}) {
    if (appId === 'home') {
      this.revealDesktop();
      return;
    }

    const existingWindow = this.windows.get(appId);
    if (existingWindow) {
      this.restoreMinimizedWindow(existingWindow);
      this.focusWindow(existingWindow);
      this.syncDockState();
      return;
    }

    const config = DESKTOP_APPS[appId];
    if (!config) {
      return;
    }

    const windowNode = this.createWindow(appId, config, options);
    this.windows.set(appId, windowNode);
    this.windowsArea.appendChild(windowNode);
    this.applyStoredWindowFrame(windowNode, appId, config);
    this.animateWindowIn(windowNode);
    this.focusWindow(windowNode);
    this.syncDockState();
  }

  createWindow(appId, config, options = {}) {
    const windowNode = document.createElement('article');
    windowNode.className = 'desktop-app-window';
    windowNode.dataset.appId = appId;
    const centeredFrame = options.initialPlacement === 'center'
      ? this.getCenteredWindowFrame(config)
      : null;

    windowNode.style.width = centeredFrame?.width || `${config.width}px`;
    windowNode.style.height = centeredFrame?.height || `${config.height}px`;

    if (centeredFrame) {
      windowNode.style.left = centeredFrame.left;
      windowNode.style.top = centeredFrame.top;
    } else {
      const offsetX = 40 + (this.windowOffset % 5) * 28;
      const offsetY = 36 + (this.windowOffset % 5) * 22;
      this.windowOffset += 1;
      windowNode.style.left = `${offsetX}px`;
      windowNode.style.top = `${offsetY}px`;
    }

    windowNode.innerHTML = `
      <header class="desktop-app-titlebar" data-window-drag-handle>
        <div class="desktop-app-lights">
          <button class="desktop-app-light desktop-app-light-close" type="button" aria-label="Close"></button>
          <button class="desktop-app-light desktop-app-light-minimize" type="button" aria-label="Minimize"></button>
          <button class="desktop-app-light desktop-app-light-expand" type="button" aria-label="Zoom"></button>
        </div>
        <div class="desktop-app-title">
          <span class="desktop-app-title-icon">${createSVG(config.icon, 14)}</span>
          <span>${config.title}</span>
        </div>
        <div class="desktop-app-title-meta">${config.kind === 'browser' ? 'Browser' : config.kind === 'document' ? 'Document' : config.kind === 'photos' ? 'Gallery' : config.kind === 'mailbox' ? 'Inbox' : config.kind === 'profile' || config.kind === 'github-profile' ? 'Profile' : 'App'}</div>
      </header>
      <div class="desktop-app-content"></div>
      <button class="desktop-app-resize-handle" type="button" aria-label="Resize window"></button>
    `;

    const content = windowNode.querySelector('.desktop-app-content');

    if (config.kind === 'iframe') {
      content.innerHTML = `<iframe class="desktop-app-iframe" src="${toEmbeddedSrc(config.src)}" title="${config.title} window" loading="lazy"></iframe>`;
    }

    if (config.kind === 'document') {
      content.innerHTML = this.renderDocumentContent(config);
      this.setupDocumentWindow(content, config);
    }

    if (config.kind === 'browser') {
      content.innerHTML = this.renderBrowserContent(config);
      this.setupBrowserWindow(content, config);
    }

    if (config.kind === 'profile') {
      content.innerHTML = this.renderProfileAppContent(config);
    }

    if (config.kind === 'mailbox') {
      content.innerHTML = this.renderMessageAppContent(config);
      this.setupMessageWindow(content, config);
    }

    if (config.kind === 'photos') {
      content.innerHTML = this.renderPhotosAppContent(config);
      this.setupPhotosWindow(content, config);
    }

    if (config.kind === 'github-profile') {
      content.innerHTML = this.renderGitHubAppContent(config);
      this.setupGitHubWindow(content, config);
    }

    this.bindWindowControls(windowNode, appId);
    this.makeDraggable(windowNode);
    this.makeResizable(windowNode);
    windowNode.addEventListener('mousedown', () => this.focusWindow(windowNode));
    return windowNode;
  }

  renderBrowserContent(config) {
    return `
      <div class="desktop-browser-window is-loading" data-browser-shell>
        <div class="desktop-browser-toolbar">
          <div class="desktop-browser-address">
            <span class="desktop-browser-address-secure"></span>
            <span class="desktop-browser-address-text">${this.escapeHTML(config.url)}</span>
          </div>
          <a class="desktop-browser-open" href="${config.url}" target="_blank" rel="noopener noreferrer">Open</a>
        </div>
        <div class="desktop-browser-loading">
          <span class="desktop-window-loading-ring"></span>
          <p>Loading ${config.title}...</p>
        </div>
        <iframe class="desktop-browser-iframe" title="${config.title} browser window" src="${config.url}" loading="eager"></iframe>
        <div class="desktop-browser-fallback" hidden>
          <div class="desktop-window-preview-panel">
            <div class="desktop-window-preview-hero">
              <span class="desktop-window-preview-icon">${createSVG(config.icon, 32)}</span>
              <div>
                <p class="desktop-window-kicker">${config.fallback.kicker}</p>
                <h3>${config.title}</h3>
                <p>${config.fallback.description}</p>
              </div>
            </div>
            <div class="desktop-window-preview-grid">
              ${config.fallback.points.map((point) => `
                <article class="desktop-window-preview-card">
                  <p>${point.label}</p>
                  <h4>${point.value}</h4>
                  <span>${point.note}</span>
                </article>
              `).join('')}
            </div>
            <div class="desktop-window-preview-note">
              <p>${config.fallback.note}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderDocumentContent(config) {
    return `
      <div class="desktop-document-window is-loading" data-document-shell>
        <div class="desktop-document-toolbar">
          <div class="desktop-document-file">
            <span class="desktop-document-file-icon">${createSVG(config.icon, 16)}</span>
            <span class="desktop-document-file-name">${this.escapeHTML(config.src)}</span>
          </div>
          <div class="desktop-document-actions">
            <a class="desktop-document-action" href="${config.src}" download aria-label="Download CV" data-tooltip="Download CV">${createSVG('download', 16)}</a>
          </div>
        </div>
        <div class="desktop-document-loading">
          <span class="desktop-window-loading-ring"></span>
          <p>Loading ${config.title}...</p>
        </div>
        <div class="desktop-document-viewer" data-document-viewer></div>
        <div class="desktop-document-fallback" hidden>
          <div class="desktop-window-preview-panel">
            <div class="desktop-window-preview-hero">
              <span class="desktop-window-preview-icon">${createSVG(config.icon, 32)}</span>
              <div>
                <p class="desktop-window-kicker">${config.fallback.kicker}</p>
                <h3>${config.title}</h3>
                <p>${config.fallback.description}</p>
              </div>
            </div>
            <div class="desktop-window-preview-grid">
              ${config.fallback.points.map((point) => `
                <article class="desktop-window-preview-card">
                  <p>${point.label}</p>
                  <h4>${point.value}</h4>
                  <span>${point.note}</span>
                </article>
              `).join('')}
            </div>
            <div class="desktop-window-preview-note">
              <p>${config.fallback.note}</p>
            </div>
            <div class="desktop-document-fallback-actions">
              <a class="desktop-browser-open" href="${config.src}" target="_blank" rel="noopener noreferrer">Open PDF</a>
              <a class="desktop-browser-open" href="${config.src}" download>Download PDF</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderProfileAppContent(config) {
    const profile = config.profile;
    const summary = this.profileWidget;

    return `
      <div class="desktop-profile-app desktop-profile-app-${config.icon}">
        <div class="desktop-profile-app-hero">
          <div class="desktop-profile-app-summary">
            <p class="desktop-window-kicker">${this.escapeHTML(profile.kicker)}</p>
            <div class="desktop-profile-app-headline">
              <span class="desktop-profile-app-avatar"><img src="${summary.imageSrc}" alt="${this.escapeHTML(summary.imageAlt)}"></span>
              <div>
                <h3>${this.escapeHTML(config.title)}</h3>
                <p class="desktop-profile-app-handle">${this.escapeHTML(profile.handle)}</p>
              </div>
            </div>
            <p class="desktop-profile-app-description">${this.escapeHTML(profile.description)}</p>
            <div class="desktop-profile-app-tags">
              ${profile.tags.map((tag) => `<span>${this.escapeHTML(tag)}</span>`).join('')}
            </div>
          </div>
          <div class="desktop-profile-app-actions">
            <span class="desktop-profile-app-platform-icon" aria-hidden="true">${createSVG(config.icon, 18)}</span>
            <a class="desktop-browser-open" href="${config.url}" target="_blank" rel="noopener noreferrer">Open profile</a>
          </div>
        </div>
        <div class="desktop-profile-app-grid">
          ${profile.points.map((point) => `
            <article class="desktop-profile-app-card">
              <p>${this.escapeHTML(point.label)}</p>
              <h4>${this.escapeHTML(point.value)}</h4>
              <span>${this.escapeHTML(point.note)}</span>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderPhotosAppContent(config) {
    const [firstImage] = config.gallery.images;

    return `
      <div class="desktop-photos-app" data-photos-app>
        <div class="desktop-photos-hero">
          <div>
            <p class="desktop-window-kicker">${this.escapeHTML(config.gallery.kicker)}</p>
            <h3>${this.escapeHTML(config.title)}</h3>
            <p class="desktop-photos-description">${this.escapeHTML(config.gallery.description)}</p>
          </div>
          <div class="desktop-photos-meta">
            <span>${config.gallery.images.length} photos</span>
          </div>
        </div>
        <div class="desktop-photos-stage">
          <figure class="desktop-photos-frame">
            <img class="desktop-photos-current-image" src="${this.escapeHTML(firstImage.src)}" alt="${this.escapeHTML(firstImage.alt)}" data-photos-current-image>
          </figure>
          <div class="desktop-photos-thumbnails" data-photos-thumbnails>
            ${config.gallery.images.map((image, index) => `
              <button class="desktop-photos-thumb${index === 0 ? ' is-active' : ''}" type="button" data-photos-thumb="${index}" aria-label="Open photo ${index + 1}">
                <img src="${this.escapeHTML(image.src)}" alt="${this.escapeHTML(image.alt)}">
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderMessageAppContent(config) {
    const mailbox = config.mailbox;

    return `
      <div class="desktop-message-app" data-message-app>
        <div class="desktop-message-hero">
          <div>
            <p class="desktop-window-kicker">${this.escapeHTML(mailbox.kicker)}</p>
            <h3>${this.escapeHTML(config.title)}</h3>
            <p class="desktop-message-description">${this.escapeHTML(mailbox.description)}</p>
            <div class="desktop-message-meta">
              <span>${this.escapeHTML(mailbox.address)}</span>
              <span>${this.escapeHTML(mailbox.availability)}</span>
            </div>
          </div>
          <div class="desktop-profile-app-actions">
            <span class="desktop-profile-app-platform-icon" aria-hidden="true">${createSVG(config.icon, 18)}</span>
            <button class="desktop-browser-open" type="button" data-message-copy-email>Copy email</button>
          </div>
        </div>
        <div class="desktop-message-compose">
          <label class="desktop-message-field">
            <span>To</span>
            <input type="text" value="${this.escapeHTML(mailbox.address)}" readonly>
          </label>
          <label class="desktop-message-field">
            <span>Subject</span>
            <input type="text" value="Quick hello from karakayautku4.dev" data-message-subject>
          </label>
          <label class="desktop-message-field desktop-message-field-body">
            <span>Message</span>
            <textarea data-message-body>Hi Utku,

I came across your site and wanted to reach out about...</textarea>
          </label>
          <div class="desktop-message-actions">
            <button class="desktop-browser-open" type="button" data-message-compose>Compose Email</button>
            <a class="desktop-browser-open is-secondary" href="mailto:${this.escapeHTML(mailbox.address)}" target="_blank" rel="noopener noreferrer">Open empty draft</a>
          </div>
          <p class="desktop-message-note" data-message-note>${this.escapeHTML(mailbox.note)}</p>
        </div>
      </div>
    `;
  }

  setupPhotosWindow(content, config) {
    const currentImage = content.querySelector('[data-photos-current-image]');
    const thumbnails = content.querySelectorAll('[data-photos-thumb]');

    thumbnails.forEach((thumbnailNode) => {
      thumbnailNode.addEventListener('click', () => {
        const imageIndex = Number(thumbnailNode.getAttribute('data-photos-thumb'));
        const imageConfig = config.gallery.images[imageIndex];
        if (!imageConfig || !currentImage) {
          return;
        }

        currentImage.src = imageConfig.src;
        currentImage.alt = imageConfig.alt;
        thumbnails.forEach((node) => node.classList.toggle('is-active', node === thumbnailNode));
      });
    });
  }

  setupMessageWindow(content, config) {
    const copyButton = content.querySelector('[data-message-copy-email]');
    const composeButton = content.querySelector('[data-message-compose]');
    const subjectInput = content.querySelector('[data-message-subject]');
    const bodyInput = content.querySelector('[data-message-body]');
    const note = content.querySelector('[data-message-note]');
    const address = config.mailbox.address;
    const openedAt = performance.now();

    copyButton?.addEventListener('click', async () => {
      const copied = await this.copyText(address);
      if (note) {
        note.textContent = copied
          ? `Email copied: ${address}`
          : `Copy failed. You can still use ${address}.`;
      }
    });

    composeButton?.addEventListener('click', () => {
      if (performance.now() - openedAt < 250) {
        return;
      }

      const subject = subjectInput?.value?.trim() || 'Quick hello from karakayautku4.dev';
      const body = bodyInput?.value?.trim() || 'Hi Utku,\n\nI came across your site and wanted to reach out about...';
      const mailtoUrl = `mailto:${encodeURIComponent(address)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      if (note) {
        note.textContent = 'Opening your default email app...';
      }
    });
  }

  async copyText(value) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      // Fallback below.
    }

    try {
      const input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', 'true');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(input);
      return copied;
    } catch {
      return false;
    }
  }

  renderGitHubAppContent(config) {
    return `
      <div class="desktop-github-app is-loading" data-github-app>
        <div class="desktop-github-app-hero">
          <div>
            <p class="desktop-window-kicker">GitHub App</p>
            <div class="desktop-github-hero-headline">
              <h3>${this.escapeHTML(config.username)}</h3>
            </div>
            <p class="desktop-github-app-description">Loading public profile and repository data...</p>
          </div>
          <div class="desktop-profile-app-actions">
            <span class="desktop-github-platform-icon" aria-hidden="true">${createSVG(config.icon, 18)}</span>
            <a class="desktop-browser-open" href="${config.url}" target="_blank" rel="noopener noreferrer">Open profile</a>
          </div>
        </div>
        <div class="desktop-github-loading">
          <span class="desktop-window-loading-ring"></span>
          <p>Loading GitHub data...</p>
        </div>
        <div class="desktop-github-content" hidden>
          <section class="desktop-github-overview">
            <div class="desktop-github-user">
              <img class="desktop-github-avatar" alt="GitHub avatar" data-github-avatar>
              <div>
                <h4 data-github-name>${this.escapeHTML(config.username)}</h4>
                <p class="desktop-github-handle" data-github-handle>@${this.escapeHTML(config.username)}</p>
                <p class="desktop-github-bio" data-github-bio></p>
                <div class="desktop-github-meta" data-github-meta></div>
              </div>
            </div>
            <div class="desktop-github-stats">
              <article class="desktop-github-stat-card">
                <p>Public repos</p>
                <h4 data-github-repos>0</h4>
              </article>
              <article class="desktop-github-stat-card">
                <p>Followers</p>
                <h4 data-github-followers>0</h4>
              </article>
              <article class="desktop-github-stat-card">
                <p>Following</p>
                <h4 data-github-following>0</h4>
              </article>
              <article class="desktop-github-stat-card">
                <p>Public gists</p>
                <h4 data-github-gists>0</h4>
              </article>
            </div>
          </section>
          <section class="desktop-github-side-grid">
            <section class="desktop-github-repos-section desktop-github-orgs-section">
              <div class="desktop-github-section-head">
                <p class="desktop-window-kicker">Organizations</p>
                <span class="desktop-github-section-note" data-github-orgs-note></span>
              </div>
              <div class="desktop-github-orgs" data-github-orgs></div>
            </section>
            <section class="desktop-github-repos-section desktop-github-events-section">
              <div class="desktop-github-section-head">
                <p class="desktop-window-kicker">Recent activity</p>
                <span class="desktop-github-section-note" data-github-events-note></span>
              </div>
              <div class="desktop-github-events" data-github-events></div>
            </section>
          </section>
          <section class="desktop-github-repos-section">
            <div class="desktop-github-section-head">
              <p class="desktop-window-kicker">Recent repositories</p>
              <span class="desktop-github-section-note" data-github-updated></span>
            </div>
            <div class="desktop-github-repos" data-github-repos-list></div>
          </section>
        </div>
        <div class="desktop-github-fallback" hidden>
          <div class="desktop-window-preview-panel">
            <div class="desktop-window-preview-hero">
              <span class="desktop-window-preview-icon">${createSVG(config.icon, 32)}</span>
              <div>
                <p class="desktop-window-kicker">${config.fallback.kicker}</p>
                <h3>${config.title}</h3>
                <p>${config.fallback.description}</p>
              </div>
            </div>
            <div class="desktop-window-preview-grid">
              ${config.fallback.points.map((point) => `
                <article class="desktop-window-preview-card">
                  <p>${point.label}</p>
                  <h4>${point.value}</h4>
                  <span>${point.note}</span>
                </article>
              `).join('')}
            </div>
            <div class="desktop-window-preview-note">
              <p>${config.fallback.note}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupBrowserWindow(content, config) {
    const shell = content.querySelector('[data-browser-shell]');
    const iframe = content.querySelector('.desktop-browser-iframe');
    const fallback = content.querySelector('.desktop-browser-fallback');
    let settled = false;

    const showReady = () => {
      if (settled) {
        return;
      }
      settled = true;
      shell.classList.remove('is-loading');
      shell.classList.add('is-ready');
    };

    const showFallback = () => {
      if (settled) {
        return;
      }
      settled = true;
      shell.classList.remove('is-loading');
      shell.classList.add('is-fallback');
      fallback.hidden = false;
    };

    if (config.forceFallback) {
      iframe.removeAttribute('src');
      showFallback();
      return;
    }

    iframe.addEventListener('load', () => {
      try {
        const href = iframe.contentWindow.location.href;
        if (!href || href === 'about:blank') {
          showFallback();
          return;
        }
      } catch {
        // Cross-origin access is expected when the embed actually loads.
      }

      showReady();
    });

    iframe.addEventListener('error', showFallback);
    window.setTimeout(() => {
      if (!settled) {
        showFallback();
      }
    }, 2800);
  }

  async setupGitHubWindow(content, config) {
    const shell = content.querySelector('[data-github-app]');
    const loading = content.querySelector('.desktop-github-loading');
    const body = content.querySelector('.desktop-github-content');
    const fallback = content.querySelector('.desktop-github-fallback');

    const showReady = () => {
      shell.classList.remove('is-loading');
      shell.classList.add('is-ready');
      loading.hidden = true;
      body.hidden = false;
      fallback.hidden = true;
    };

    const showFallback = () => {
      shell.classList.remove('is-loading');
      shell.classList.add('is-fallback');
      loading.hidden = true;
      body.hidden = true;
      fallback.hidden = false;
    };

    try {
      const [profileResponse, reposResponse, orgsResult, eventsResult] = await Promise.all([
        fetch(`https://api.github.com/users/${config.username}`),
        fetch(`https://api.github.com/users/${config.username}/repos?sort=updated&per_page=6`),
        fetch(`https://api.github.com/users/${config.username}/orgs`).then((response) => response.ok ? response.json() : []),
        fetch(`https://api.github.com/users/${config.username}/events/public?per_page=5`).then((response) => response.ok ? response.json() : [])
      ]);

      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error('GitHub API request failed');
      }

      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
      const orgs = Array.isArray(orgsResult) ? orgsResult : [];
      const events = Array.isArray(eventsResult) ? eventsResult : [];

      if (!Array.isArray(repos)) {
        throw new Error('GitHub repositories payload was invalid');
      }

      this.populateGitHubWindow(content, profile, repos, orgs, events);
      showReady();
    } catch {
      showFallback();
    }
  }

  populateGitHubWindow(content, profile, repos, orgs, events) {
    const avatar = content.querySelector('[data-github-avatar]');
    const name = content.querySelector('[data-github-name]');
    const handle = content.querySelector('[data-github-handle]');
    const bio = content.querySelector('[data-github-bio]');
    const meta = content.querySelector('[data-github-meta]');
    const reposCount = content.querySelector('[data-github-repos]');
    const followers = content.querySelector('[data-github-followers]');
    const following = content.querySelector('[data-github-following]');
    const gists = content.querySelector('[data-github-gists]');
    const updated = content.querySelector('[data-github-updated]');
    const reposList = content.querySelector('[data-github-repos-list]');
    const orgsNote = content.querySelector('[data-github-orgs-note]');
    const orgsNode = content.querySelector('[data-github-orgs]');
    const eventsNote = content.querySelector('[data-github-events-note]');
    const eventsNode = content.querySelector('[data-github-events]');

    avatar.src = profile.avatar_url;
    name.textContent = profile.name || profile.login;
    handle.textContent = `@${profile.login}`;
    bio.textContent = profile.bio || 'Public repositories and profile details from GitHub.';
    meta.innerHTML = [
      profile.location ? `<span>${this.escapeHTML(profile.location)}</span>` : '',
      profile.company ? `<span>${this.escapeHTML(profile.company)}</span>` : '',
      profile.blog ? `<a href="${this.escapeHTML(profile.blog)}" target="_blank" rel="noopener noreferrer">${this.escapeHTML(profile.blog.replace(/^https?:\/\//, ''))}</a>` : '',
      profile.twitter_username ? `<span>@${this.escapeHTML(profile.twitter_username)}</span>` : '',
      profile.created_at ? `<span>Joined ${new Date(profile.created_at).getFullYear()}</span>` : ''
    ].filter(Boolean).join('');
    reposCount.textContent = String(profile.public_repos ?? 0);
    followers.textContent = String(profile.followers ?? 0);
    following.textContent = String(profile.following ?? 0);
    gists.textContent = String(profile.public_gists ?? 0);
    updated.textContent = repos[0]?.pushed_at ? `Updated ${this.formatRelativeTime(repos[0].pushed_at)}` : 'Public profile';

    reposList.innerHTML = repos.length ? repos.map((repo) => `
      <article class="desktop-github-repo-card">
        <div class="desktop-github-repo-head">
          <h4>${this.escapeHTML(repo.name)}</h4>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Open</a>
        </div>
        <p>${this.escapeHTML(repo.description || 'No description provided for this repository yet.')}</p>
        <div class="desktop-github-repo-meta">
          <span>${this.escapeHTML(repo.language || 'Code')}</span>
          <span>${repo.stargazers_count || 0} stars</span>
          <span>${repo.forks_count || 0} forks</span>
          <span>${this.formatRelativeTime(repo.pushed_at)}</span>
        </div>
      </article>
    `).join('') : `<article class="desktop-github-repo-card desktop-github-empty-card"><p>No public repositories are visible right now.</p></article>`;

    orgsNote.textContent = orgs.length ? `${orgs.length} visible` : 'No public orgs';
    orgsNode.innerHTML = orgs.length ? orgs.slice(0, 6).map((org) => `
      <a class="desktop-github-org-chip" href="https://github.com/${this.escapeHTML(org.login)}" target="_blank" rel="noopener noreferrer">
        <img src="${org.avatar_url}" alt="${this.escapeHTML(org.login)} avatar">
        <span>${this.escapeHTML(org.login)}</span>
      </a>
    `).join('') : `<p class="desktop-github-empty-copy">No public organization memberships exposed by the API.</p>`;

    eventsNote.textContent = events.length ? `Latest ${events.length}` : 'No public events';
    eventsNode.innerHTML = events.length ? events.map((eventItem) => `
      <article class="desktop-github-event-card">
        <p>${this.escapeHTML(this.formatGitHubEventType(eventItem.type))}</p>
        <h4>${this.escapeHTML(eventItem.repo?.name || 'GitHub activity')}</h4>
        <span>${this.formatRelativeTime(eventItem.created_at)}</span>
      </article>
    `).join('') : `<p class="desktop-github-empty-copy">No recent public events are available from the API right now.</p>`;
  }

  formatGitHubEventType(type = '') {
    return type.replace(/Event$/, '').replace(/([a-z])([A-Z])/g, '$1 $2') || 'Activity';
  }

  async setupDocumentWindow(content, config) {
    const shell = content.querySelector('[data-document-shell]');
    const viewer = content.querySelector('[data-document-viewer]');
    const fallback = content.querySelector('.desktop-document-fallback');
    let settled = false;

    const showReady = () => {
      if (settled) {
        return;
      }

      settled = true;
      shell.classList.remove('is-loading');
      shell.classList.add('is-ready');
    };

    const showFallback = () => {
      if (settled) {
        return;
      }

      settled = true;
      shell.classList.remove('is-loading');
      shell.classList.add('is-fallback');
      fallback.hidden = false;
    };

    try {
      const pdfjsLib = await loadPdfJs();
      const pdfDocument = await pdfjsLib.getDocument(config.src).promise;

      if (!document.body.contains(shell)) {
        return;
      }

      await this.renderPdfDocument(viewer, pdfDocument);
      showReady();
    } catch {
      showFallback();
    }
  }

  async renderPdfDocument(viewer, pdfDocument) {
    viewer.innerHTML = '';
    const viewerWidth = Math.max(320, (viewer.clientWidth || viewer.offsetWidth || 760) - 48);
    const pixelRatio = window.devicePixelRatio || 1;

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = viewerWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Canvas rendering is not available');
      }

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const pageNode = document.createElement('section');
      pageNode.className = 'desktop-document-page';
      pageNode.append(canvas);
      viewer.append(pageNode);

      await page.render({
        canvasContext: context,
        viewport,
        transform: pixelRatio !== 1 ? [pixelRatio, 0, 0, pixelRatio, 0, 0] : null
      }).promise;
    }
  }

  bindWindowControls(windowNode, appId) {
    const closeButton = windowNode.querySelector('.desktop-app-light-close');
    const minimizeButton = windowNode.querySelector('.desktop-app-light-minimize');
    const expandButton = windowNode.querySelector('.desktop-app-light-expand');
    const titlebar = windowNode.querySelector('[data-window-drag-handle]');

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.closeWindow(appId);
    });

    minimizeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.minimizeWindow(windowNode);
      this.focusTopWindow();
      this.syncDockState();
    });

    expandButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleMaximize(windowNode, appId);
    });

    titlebar.addEventListener('dblclick', (event) => {
      if (event.target.closest('button, a')) {
        return;
      }

      this.toggleMaximize(windowNode, appId);
    });
  }

  toggleMaximize(windowNode, appId) {
    if (windowNode.classList.contains('is-maximized')) {
      this.restoreWindow(windowNode, appId);
      return;
    }

    this.maximizeWindow(windowNode);
  }

  rememberWindowFrame(windowNode) {
    windowNode.dataset.prevLeft = windowNode.style.left;
    windowNode.dataset.prevTop = windowNode.style.top;
    windowNode.dataset.prevWidth = windowNode.style.width;
    windowNode.dataset.prevHeight = windowNode.style.height;
  }

  maximizeWindow(windowNode) {
    this.rememberWindowFrame(windowNode);
    windowNode.classList.remove('is-minimized');
    windowNode.classList.remove('is-snapped-left', 'is-snapped-right');
    windowNode.classList.add('is-maximized');
    windowNode.style.left = '18px';
    windowNode.style.top = '18px';
    windowNode.style.width = 'calc(100% - 36px)';
    windowNode.style.height = 'calc(100% - 36px)';
    this.persistWindowFrame(windowNode);
  }

  restoreWindow(windowNode, appId) {
    windowNode.classList.remove('is-maximized', 'is-snapped-left', 'is-snapped-right');
    windowNode.style.left = windowNode.dataset.prevLeft || '40px';
    windowNode.style.top = windowNode.dataset.prevTop || '36px';
    windowNode.style.width = windowNode.dataset.prevWidth || `${DESKTOP_APPS[appId].width}px`;
    windowNode.style.height = windowNode.dataset.prevHeight || `${DESKTOP_APPS[appId].height}px`;
    this.persistWindowFrame(windowNode);
  }

  animateWindowIn(windowNode) {
    windowNode.classList.add('is-entering');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        windowNode.classList.remove('is-entering');
      });
    });
  }

  restoreMinimizedWindow(windowNode) {
    if (!windowNode.classList.contains('is-minimized')) {
      return;
    }

    windowNode.classList.remove('is-minimizing');
    windowNode.classList.remove('is-minimized');
    windowNode.classList.add('is-restoring');
    window.setTimeout(() => {
      windowNode.classList.remove('is-restoring');
    }, 220);
  }

  minimizeWindow(windowNode) {
    if (!windowNode || windowNode.classList.contains('is-minimized') || windowNode.classList.contains('is-minimizing')) {
      return;
    }

    const appId = windowNode.dataset.appId;
    const launcher = this.dockLaunchers.get(appId);
    const windowRect = windowNode.getBoundingClientRect();
    const launcherRect = launcher?.getBoundingClientRect();
    const deltaX = launcherRect
      ? (launcherRect.left + launcherRect.width / 2) - (windowRect.left + windowRect.width / 2)
      : 0;
    const deltaY = launcherRect
      ? (launcherRect.top + launcherRect.height / 2) - (windowRect.top + windowRect.height / 2)
      : 28;

    windowNode.style.setProperty('--minimize-x', `${Math.round(deltaX)}px`);
    windowNode.style.setProperty('--minimize-y', `${Math.round(deltaY)}px`);
    windowNode.classList.add('is-minimizing');

    window.setTimeout(() => {
      windowNode.classList.remove('is-minimizing', 'is-restoring');
      windowNode.classList.add('is-minimized');
    }, 210);
  }

  snapWindow(windowNode, side) {
    this.rememberWindowFrame(windowNode);
    const stageRect = this.windowsArea.getBoundingClientRect();
    const halfWidth = Math.max(520, (stageRect.width - 30) / 2);
    windowNode.classList.remove('is-maximized', 'is-snapped-left', 'is-snapped-right');
    windowNode.classList.add(side === 'left' ? 'is-snapped-left' : 'is-snapped-right');
    windowNode.style.top = '18px';
    windowNode.style.width = `${halfWidth}px`;
    windowNode.style.height = 'calc(100% - 36px)';
    windowNode.style.left = side === 'left'
      ? '18px'
      : `calc(100% - ${Math.round(halfWidth)}px - 18px)`;
    this.persistWindowFrame(windowNode);
  }

  makeResizable(windowNode) {
    const handle = windowNode.querySelector('.desktop-app-resize-handle');
    if (!handle) {
      return;
    }

    let resizing = false;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const onPointerMove = (event) => {
      if (!resizing || windowNode.classList.contains('is-maximized')) {
        return;
      }

      const stageRect = this.windowsArea.getBoundingClientRect();
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      const currentLeft = parseFloat(windowNode.style.left) || 0;
      const currentTop = parseFloat(windowNode.style.top) || 0;
      const maxWidth = Math.max(520, stageRect.width - currentLeft - 12);
      const maxHeight = Math.max(360, stageRect.height - currentTop - 12);
      const nextWidth = Math.min(maxWidth, Math.max(520, startWidth + deltaX));
      const nextHeight = Math.min(maxHeight, Math.max(360, startHeight + deltaY));

      windowNode.style.width = `${nextWidth}px`;
      windowNode.style.height = `${nextHeight}px`;
    };

    const stopResize = () => {
      resizing = false;
      windowNode.classList.remove('is-resizing');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopResize);
      this.persistWindowFrame(windowNode);
    };

    handle.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      resizing = true;
      startX = event.clientX;
      startY = event.clientY;
      startWidth = windowNode.offsetWidth;
      startHeight = windowNode.offsetHeight;
      windowNode.classList.add('is-resizing');
      this.focusWindow(windowNode);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', stopResize);
    });
  }

  makeDraggable(windowNode) {
    const handle = windowNode.querySelector('[data-window-drag-handle]');
    const appId = windowNode.dataset.appId;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;

    const onPointerMove = (event) => {
      if (!dragging || windowNode.classList.contains('is-maximized')) {
        return;
      }

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      windowNode.style.left = `${Math.max(0, originLeft + deltaX)}px`;
      windowNode.style.top = `${Math.max(0, originTop + deltaY)}px`;
    };

    const stopDragging = () => {
      dragging = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDragging);
      this.applySnapFromPosition(windowNode);
      this.persistWindowFrame(windowNode);
    };

    handle.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button, a')) {
        return;
      }

      dragging = true;
      startX = event.clientX;
      startY = event.clientY;

      if (windowNode.classList.contains('is-snapped-left') || windowNode.classList.contains('is-snapped-right')) {
        this.restoreWindow(windowNode, appId);
      }

      originLeft = parseFloat(windowNode.style.left) || 0;
      originTop = parseFloat(windowNode.style.top) || 0;
      this.focusWindow(windowNode);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', stopDragging);
    });
  }

  applySnapFromPosition(windowNode) {
    if (windowNode.classList.contains('is-resizing') || windowNode.classList.contains('is-maximized')) {
      return;
    }

    const stageRect = this.windowsArea.getBoundingClientRect();
    const left = parseFloat(windowNode.style.left) || 0;
    const top = parseFloat(windowNode.style.top) || 0;
    const width = windowNode.offsetWidth;

    if (top <= 24) {
      this.maximizeWindow(windowNode);
      return;
    }

    if (left <= 18) {
      this.snapWindow(windowNode, 'left');
      return;
    }

    if (left + width >= stageRect.width - 18) {
      this.snapWindow(windowNode, 'right');
    }
  }

  focusWindow(windowNode) {
    this.zIndex += 1;
    windowNode.style.zIndex = String(this.zIndex);
    this.windowsArea.querySelectorAll('.desktop-app-window').forEach((node) => {
      node.classList.toggle('is-active', node === windowNode);
    });
    const appId = windowNode.dataset.appId;
    this.activeAppId = appId;
    this.updateMenubarState();
    this.syncDockState();
  }

  closeWindow(appId) {
    const windowNode = this.windows.get(appId);
    if (!windowNode) {
      return;
    }

    this.persistWindowFrame(windowNode);

    windowNode.classList.add('is-closing');

    window.setTimeout(() => {
      if (!this.windows.has(appId)) {
        return;
      }

      windowNode.remove();
      this.windows.delete(appId);
      this.focusTopWindow();
      this.syncDockState();
    }, 180);
  }

  focusTopWindow() {
    const candidates = Array.from(this.windows.values())
      .filter((node) => !node.classList.contains('is-minimized'))
      .sort((left, right) => Number(right.style.zIndex || 0) - Number(left.style.zIndex || 0));

    const topWindow = candidates[0];

    if (topWindow) {
      this.focusWindow(topWindow);
      return;
    }

    this.activeAppId = null;
    this.windowsArea.querySelectorAll('.desktop-app-window').forEach((node) => {
      node.classList.remove('is-active');
    });
    this.updateMenubarState();
  }

  revealDesktop() {
    this.windows.forEach((windowNode) => {
      this.minimizeWindow(windowNode);
    });

    window.setTimeout(() => {
      this.focusTopWindow();
      this.syncDockState();
    }, 215);
  }

  updateMenubarState() {
    const stateKey = this.activeAppId || 'desktop';
    const activeTitle = DESKTOP_APPS[this.activeAppId]?.title || 'Desktop';

    if (this.menuState) {
      this.menuState.textContent = activeTitle;
    }

    if (this.menuItems) {
      this.menuItems.innerHTML = this.renderMenubarItems(stateKey);
      this.bindMenubarMenus();
    }

    this.closeMenubarMenus();
  }

  bindGlobalEvents() {
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
    document.addEventListener('keydown', this.handleDocumentKeydown);
  }

  bindMenubarMenus() {
    if (!this.menuItems) {
      return;
    }

    this.menuItems.querySelectorAll('[data-menu-name]').forEach((menuNode) => {
      const trigger = menuNode.querySelector('[data-menu-trigger]');
      const menuName = menuNode.dataset.menuName || '';

      trigger?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.activeMenuName === menuName) {
          this.closeMenubarMenus();
          return;
        }

        this.openMenubarMenu(menuName);
      });

      menuNode.addEventListener('mouseenter', () => {
        if (!this.activeMenuName || this.activeMenuName === menuName) {
          return;
        }

        this.openMenubarMenu(menuName);
      });

      menuNode.querySelectorAll('[data-menu-dropdown] button').forEach((itemNode) => {
        itemNode.addEventListener('click', () => {
          this.handleMenubarAction(itemNode.dataset.menuAction || '');
          this.closeMenubarMenus();
        });
      });
    });
  }

  handleMenubarAction(action) {
    if (!action) {
      return;
    }

    if (action === 'show-desktop') {
      this.revealDesktop();
      return;
    }

    if (action === 'close-all-windows') {
      Array.from(this.windows.keys()).forEach((appId) => this.closeWindow(appId));
      return;
    }

    if (action === 'toggle-widgets') {
      this.root.classList.toggle('desktop-widgets-hidden');
      return;
    }

    if (action === 'reset-layout') {
      this.resetLayout();
      return;
    }

    if (action === 'refresh-weather') {
      this.initWeather(true);
      return;
    }

    if (action === 'minimize-all') {
      this.revealDesktop();
      return;
    }

    if (action === 'bring-all-to-front') {
      this.bringAllToFront();
      return;
    }

    if (action === 'tile-left-right') {
      this.tileTopWindows();
      return;
    }

    if (action === 'minimize-active') {
      this.minimizeWindow(this.getActiveWindowNode());
      this.focusTopWindow();
      this.syncDockState();
      return;
    }

    if (action === 'zoom-active') {
      const activeWindow = this.getActiveWindowNode();
      if (activeWindow) {
        this.toggleMaximize(activeWindow, activeWindow.dataset.appId);
      }
      return;
    }

    if (action === 'close-active') {
      const activeWindow = this.getActiveWindowNode();
      if (activeWindow?.dataset.appId) {
        this.closeWindow(activeWindow.dataset.appId);
      }
      return;
    }

    if (action.startsWith('open-app:')) {
      this.openWindow(action.replace('open-app:', ''));
      return;
    }

    if (action.startsWith('compose-email:')) {
      const appId = action.replace('compose-email:', '');
      const url = DESKTOP_APPS[appId]?.url;
      if (url) {
        window.location.href = url;
      }
      return;
    }

    if (action.startsWith('copy-email:')) {
      const appId = action.replace('copy-email:', '');
      const address = DESKTOP_APPS[appId]?.mailbox?.address;
      if (address) {
        this.copyText(address);
      }
      return;
    }

    if (action.startsWith('open-external:')) {
      const appId = action.replace('open-external:', '');
      const url = DESKTOP_APPS[appId]?.url;
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  }

  openMenubarMenu(menuName) {
    this.activeMenuName = menuName;
    this.menuItems?.querySelectorAll('[data-menu-name]').forEach((menuNode) => {
      const isActive = menuNode.dataset.menuName === menuName;
      menuNode.classList.toggle('is-open', isActive);
      menuNode.querySelector('[data-menu-trigger]')?.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }

  closeMenubarMenus() {
    this.activeMenuName = null;
    this.menuItems?.querySelectorAll('[data-menu-name]').forEach((menuNode) => {
      menuNode.classList.remove('is-open');
      menuNode.querySelector('[data-menu-trigger]')?.setAttribute('aria-expanded', 'false');
    });
  }

  onDocumentPointerDown(event) {
    if (event.target.closest('.desktop-menubar-apps')) {
      return;
    }

    this.closeMenubarMenus();
  }

  onDocumentKeydown(event) {
    if (event.key === 'Escape') {
      this.closeMenubarMenus();
    }
  }

  readStoredWidgetPositions() {
    try {
      const storedValue = window.localStorage.getItem(DESKTOP_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : {};
    } catch {
      return {};
    }
  }

  hasCompletedFirstDesktopVisit() {
    try {
      return window.localStorage.getItem(DESKTOP_FIRST_VISIT_KEY) === '1';
    } catch {
      return true;
    }
  }

  markFirstDesktopVisitComplete() {
    try {
      window.localStorage.setItem(DESKTOP_FIRST_VISIT_KEY, '1');
    } catch {
      // Ignore storage failures and keep the desktop usable.
    }
  }

  openInitialWindow() {
    if (this.hasCompletedFirstDesktopVisit()) {
      return;
    }

    this.markFirstDesktopVisitComplete();
    window.requestAnimationFrame(() => {
      this.openWindow('about', { initialPlacement: 'center' });
    });
  }

  readStoredWindowFrames() {
    try {
      const storedValue = window.localStorage.getItem(DESKTOP_WINDOW_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : {};
    } catch {
      return {};
    }
  }

  writeStoredWindowFrames(frames) {
    try {
      window.localStorage.setItem(DESKTOP_WINDOW_STORAGE_KEY, JSON.stringify(frames));
    } catch {
      // Ignore storage failures and keep the desktop usable.
    }
  }

  getRegularWindowFrame(windowNode, appId) {
    const config = DESKTOP_APPS[appId] || { width: 760, height: 560 };

    if (windowNode.classList.contains('is-maximized') || windowNode.classList.contains('is-snapped-left') || windowNode.classList.contains('is-snapped-right')) {
      return {
        left: windowNode.dataset.prevLeft || '40px',
        top: windowNode.dataset.prevTop || '36px',
        width: windowNode.dataset.prevWidth || `${config.width}px`,
        height: windowNode.dataset.prevHeight || `${config.height}px`
      };
    }

    return {
      left: windowNode.style.left || '40px',
      top: windowNode.style.top || '36px',
      width: windowNode.style.width || `${config.width}px`,
      height: windowNode.style.height || `${config.height}px`
    };
  }

  persistWindowFrame(windowNode) {
    const appId = windowNode?.dataset.appId;
    if (!appId) {
      return;
    }

    const frames = this.readStoredWindowFrames();
    frames[appId] = {
      ...this.getRegularWindowFrame(windowNode, appId),
      state: windowNode.classList.contains('is-maximized')
        ? 'maximized'
        : windowNode.classList.contains('is-snapped-left')
          ? 'snapped-left'
          : windowNode.classList.contains('is-snapped-right')
            ? 'snapped-right'
            : 'default'
    };
    this.writeStoredWindowFrames(frames);
  }

  clampStoredWindowFrame(frame, config) {
    const stageRect = this.windowsArea?.getBoundingClientRect();
    const stageWidth = stageRect?.width || window.innerWidth;
    const stageHeight = stageRect?.height || (window.innerHeight - 90);
    const widthValue = Math.min(
      Math.max(520, parseFloat(frame.width) || config.width),
      Math.max(520, stageWidth - 24)
    );
    const heightValue = Math.min(
      Math.max(360, parseFloat(frame.height) || config.height),
      Math.max(360, stageHeight - 24)
    );
    const maxLeft = Math.max(18, stageWidth - widthValue - 18);
    const maxTop = Math.max(18, stageHeight - heightValue - 18);
    const leftValue = Math.min(Math.max(18, parseFloat(frame.left) || 40), maxLeft);
    const topValue = Math.min(Math.max(18, parseFloat(frame.top) || 36), maxTop);

    return {
      left: `${Math.round(leftValue)}px`,
      top: `${Math.round(topValue)}px`,
      width: `${Math.round(widthValue)}px`,
      height: `${Math.round(heightValue)}px`
    };
  }

  getCenteredWindowFrame(config) {
    const stageRect = this.windowsArea?.getBoundingClientRect();
    const stageWidth = stageRect?.width || window.innerWidth;
    const stageHeight = stageRect?.height || (window.innerHeight - 90);
    const widthValue = Math.min(
      Math.max(520, config.width),
      Math.max(520, stageWidth - 24)
    );
    const heightValue = Math.min(
      Math.max(360, config.height),
      Math.max(360, stageHeight - 24)
    );

    return {
      left: `${Math.round(Math.max(18, (stageWidth - widthValue) / 2))}px`,
      top: `${Math.round(Math.max(18, (stageHeight - heightValue) / 2))}px`,
      width: `${Math.round(widthValue)}px`,
      height: `${Math.round(heightValue)}px`
    };
  }

  applyStoredWindowFrame(windowNode, appId, config) {
    const storedFrame = this.readStoredWindowFrames()[appId];
    if (!storedFrame) {
      return;
    }

    const regularFrame = this.clampStoredWindowFrame(storedFrame, config);
    windowNode.style.left = regularFrame.left;
    windowNode.style.top = regularFrame.top;
    windowNode.style.width = regularFrame.width;
    windowNode.style.height = regularFrame.height;

    if (storedFrame.state === 'maximized') {
      this.maximizeWindow(windowNode);
      return;
    }

    if (storedFrame.state === 'snapped-left') {
      this.snapWindow(windowNode, 'left');
      return;
    }

    if (storedFrame.state === 'snapped-right') {
      this.snapWindow(windowNode, 'right');
      return;
    }

    this.persistWindowFrame(windowNode);
  }

  writeStoredWidgetPositions(positions) {
    try {
      window.localStorage.setItem(DESKTOP_STORAGE_KEY, JSON.stringify(positions));
    } catch {
      // Ignore storage failures and keep the desktop usable.
    }
  }

  clampWidgetPosition(widgetNode, left, top) {
    const stageRect = this.root.querySelector('.desktop-stage')?.getBoundingClientRect();
    const maxLeft = Math.max(18, (stageRect?.width || 0) - widgetNode.offsetWidth - 18);
    const maxTop = Math.max(18, (stageRect?.height || 0) - widgetNode.offsetHeight - 18);

    return {
      left: Math.min(Math.max(18, left), maxLeft),
      top: Math.min(Math.max(18, top), maxTop)
    };
  }

  applyWidgetPosition(widgetNode, left, top) {
    const nextPosition = this.clampWidgetPosition(widgetNode, left, top);
    widgetNode.style.left = `${nextPosition.left}px`;
    widgetNode.style.top = `${nextPosition.top}px`;
    widgetNode.style.right = 'auto';
    widgetNode.style.bottom = 'auto';
  }

  restoreWidgetPositions() {
    const positions = this.readStoredWidgetPositions();

    window.requestAnimationFrame(() => {
      [this.profileWidgetNode].forEach((widgetNode) => {
        const widgetId = widgetNode?.dataset.widgetId;
        const savedPosition = widgetId ? positions[widgetId] : null;
        if (!widgetNode || !savedPosition) {
          return;
        }

        this.applyWidgetPosition(widgetNode, savedPosition.left, savedPosition.top);
      });
    });
  }

  persistWidgetPosition(widgetNode) {
    const widgetId = widgetNode.dataset.widgetId;
    if (!widgetId) {
      return;
    }

    const positions = this.readStoredWidgetPositions();
    positions[widgetId] = {
      left: parseFloat(widgetNode.style.left) || 18,
      top: parseFloat(widgetNode.style.top) || 18
    };
    this.writeStoredWidgetPositions(positions);
  }

  resetLayout() {
    this.root.classList.remove('desktop-widgets-hidden');
    this.writeStoredWidgetPositions(DEFAULT_WIDGET_POSITIONS);
    this.writeStoredWindowFrames({});

    if (this.profileWidgetNode) {
      this.applyWidgetPosition(
        this.profileWidgetNode,
        DEFAULT_WIDGET_POSITIONS.profile.left,
        DEFAULT_WIDGET_POSITIONS.profile.top
      );
    }
  }

  getActiveWindowNode() {
    return this.activeAppId ? this.windows.get(this.activeAppId) || null : null;
  }

  bringAllToFront() {
    const visibleWindows = Array.from(this.windows.values())
      .filter((node) => !node.classList.contains('is-minimized'));

    visibleWindows.forEach((windowNode) => {
      this.zIndex += 1;
      windowNode.style.zIndex = String(this.zIndex);
    });

    const topWindow = visibleWindows[visibleWindows.length - 1];
    if (topWindow) {
      this.focusWindow(topWindow);
    }
  }

  tileTopWindows() {
    const visibleWindows = Array.from(this.windows.values())
      .filter((node) => !node.classList.contains('is-minimized'))
      .sort((left, right) => Number(right.style.zIndex || 0) - Number(left.style.zIndex || 0));

    if (!visibleWindows[0]) {
      return;
    }

    this.snapWindow(visibleWindows[0], 'left');
    if (visibleWindows[1]) {
      this.snapWindow(visibleWindows[1], 'right');
      this.focusWindow(visibleWindows[0]);
    } else {
      this.focusWindow(visibleWindows[0]);
    }
  }

  makeWidgetDraggable(widgetNode) {
    if (!widgetNode) {
      return;
    }

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;

    const getPoint = (event) => {
      if (event.touches?.[0]) {
        return event.touches[0];
      }

      if (event.changedTouches?.[0]) {
        return event.changedTouches[0];
      }

      return event;
    };

    const onPointerMove = (event) => {
      if (!dragging) {
        return;
      }

      const point = getPoint(event);
      const stageRect = this.root.querySelector('.desktop-stage')?.getBoundingClientRect();
      const deltaX = point.clientX - startX;
      const deltaY = point.clientY - startY;
      const nextLeft = originLeft + deltaX;
      const nextTop = originTop + deltaY;
      const maxLeft = Math.max(0, (stageRect?.width || 0) - widgetNode.offsetWidth - 18);
      const maxTop = Math.max(0, (stageRect?.height || 0) - widgetNode.offsetHeight - 18);

      widgetNode.style.left = `${Math.min(Math.max(18, nextLeft), maxLeft)}px`;
      widgetNode.style.top = `${Math.min(Math.max(18, nextTop), maxTop)}px`;
      widgetNode.style.right = 'auto';
      widgetNode.style.bottom = 'auto';
    };

    const stopDragging = () => {
      dragging = false;
      widgetNode.classList.remove('is-dragging');
      this.persistWidgetPosition(widgetNode);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', stopDragging);
    };

    const startDragging = (event) => {
      if (event.target.closest('a, button')) {
        return;
      }

      const point = getPoint(event);
      dragging = true;
      startX = point.clientX;
      startY = point.clientY;
      const rect = widgetNode.getBoundingClientRect();
      const stageRect = this.root.querySelector('.desktop-stage')?.getBoundingClientRect();
      originLeft = rect.left - (stageRect?.left || 0);
      originTop = rect.top - (stageRect?.top || 0);
      event.preventDefault();
      widgetNode.classList.add('is-dragging');
      widgetNode.style.left = `${originLeft}px`;
      widgetNode.style.top = `${originTop}px`;
      widgetNode.style.right = 'auto';
      widgetNode.style.bottom = 'auto';
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', stopDragging);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', stopDragging);
    };

    widgetNode.addEventListener('pointerdown', startDragging);
    widgetNode.addEventListener('mousedown', startDragging);
    widgetNode.addEventListener('touchstart', startDragging, { passive: false });
  }

  syncDockState() {
    this.dockLaunchers.forEach((launcher, appId) => {
      if (appId === 'home') {
        const isDesktopActive = !this.activeAppId;
        launcher.toggleAttribute('data-window-open', this.windows.size > 0);
        launcher.toggleAttribute('data-window-active', isDesktopActive);
        launcher.setAttribute('aria-pressed', isDesktopActive ? 'true' : 'false');
        return;
      }

      const windowNode = this.windows.get(appId);
      const isOpen = Boolean(windowNode);
      const isMinimized = windowNode?.classList.contains('is-minimized') || false;
      const isActive = this.activeAppId === appId && !isMinimized;

      launcher.toggleAttribute('data-window-open', isOpen);
      launcher.toggleAttribute('data-window-active', isActive);

      if (isOpen) {
        launcher.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      } else {
        launcher.removeAttribute('aria-pressed');
      }
    });
  }

  updateDockMagnification(pointerX) {
    this.dockLaunchers.forEach((launcher) => {
      const rect = launcher.getBoundingClientRect();
      const centerX = rect.left + (rect.width / 2);
      const distance = Math.abs(pointerX - centerX);
      const influence = Math.max(0, 1 - (distance / 160));
      const scale = 1 + (influence * 0.22);
      const rise = Math.round(influence * 14);
      launcher.style.setProperty('--dock-scale', scale.toFixed(3));
      launcher.style.setProperty('--dock-rise', `${rise}px`);
      launcher.style.setProperty('--dock-opacity', (0.72 + (influence * 0.28)).toFixed(3));
    });
  }

  resetDockMagnification() {
    this.dockLaunchers.forEach((launcher) => {
      launcher.style.removeProperty('--dock-scale');
      launcher.style.removeProperty('--dock-rise');
      launcher.style.removeProperty('--dock-opacity');
    });
  }

  pulseDockLauncher(appId) {
    const launcher = this.dockLaunchers.get(appId);
    if (!launcher) {
      return;
    }

    launcher.classList.remove('is-dock-bouncing');
    window.requestAnimationFrame(() => {
      launcher.classList.add('is-dock-bouncing');
      window.setTimeout(() => {
        launcher.classList.remove('is-dock-bouncing');
      }, 520);
    });
  }

  escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}

export function initDesktopRuntime(root, homeMarkup) {
  if (!root) {
    return null;
  }

  return new DesktopRuntime(root, homeMarkup);
}