/**
 * Copy configuration for primary marketing pages.
 * @module copy-content
 */

export const HOME_COPY = {
  eyebrow: '',
  title: '',
  lead: 'Based in Eindhoven, I build end-to-end, UI, and API automation for product teams that need confidence without noise. The focus is practical: Python-first tooling, reliable validation flows, and test infrastructure that developers can actually trust.',
  actions: [
    { href: 'Utku-Karakaya-CV.pdf', label: 'Download CV', variant: 'outline' }
  ],
  points: [
    '6+ years across cybersecurity, telecom, and mapping products.',
    'Daily stack: Python, Playwright, Pytest, Docker, SQL, ADX, KQL, CI/CD.',
    'This site is a compact index of my work, tools, and references.'
  ],
  signals: [
    {
      label: 'Current Role',
      title: 'Forescout',
      cardClass: 'signal-card-current-role',
      role: 'Software Test Automation Engineer / Python Developer',
      period: 'Nov 2025 – Present',
      description: 'Building dependable automation for cybersecurity products.',
      href: 'https://www.forescout.com/',
      external: true,
      cardLink: false,
      image: 'assets/images/forescout-dark.svg',
      imageAlt: 'Forescout logo',
      logoStyle: 'inline',
      hideTitle: true,
      hideDescription: true
    },
    {
      label: 'Location',
      title: 'Eindhoven',
      description: 'Working from the Netherlands with a strong bias for quiet, durable systems.',
      href: 'https://www.google.com/maps/@51.4416,5.4697,11z',
      external: true,
      visual: 'map',
      embedUrl: 'https://maps.google.com/maps?hl=en&ie=UTF8&ll=51.4416,5.4697&z=11&output=embed',
      embedTitle: 'Map of Eindhoven',
      mapMetaLabel: 'Open in Google Maps',
      hideTitle: true,
      hideDescription: true
    },
    {
      label: 'Site Intent',
      title: 'No filler',
      description: 'Only the pages, tools, and references I can actually stand behind stay here.'
    }
  ],
  explore: {
    kicker: 'Explore',
    title: 'Start with the parts that are actively maintained.',
    cards: [
      {
        href: 'pages/about.html',
        title: 'About',
        description: 'Career path, technical focus, and how I approach quality engineering.'
      },
      {
        href: 'pages/bookmarks.html',
        title: 'Bookmarks',
        description: 'A growing list of articles, tools, and references worth revisiting.'
      },
      {
        href: 'pages/hobbies.html',
        title: 'Hobbies',
        description: 'A smaller, personal corner for collections, tools, and interests worth keeping.'
      },
      {
        href: 'pages/projects.html',
        title: 'Projects',
        description: 'An honest status page for what is public, what is archived, and what is intentionally absent.'
      }
    ]
  }
};

export const ABOUT_COPY = {
  eyebrow: 'About',
  title: 'I design automation that helps teams trust their releases.',
  intro: [
    'I am a Software Test Automation Engineer / Python Developer with 6+ years of experience across cybersecurity, telecom, and mapping products. My work sits where test reliability, developer workflow, and release confidence meet.',
    'At Forescout in Eindhoven, I build end-to-end, UI, and API automation for cybersecurity products. Before that, I worked on telecom billing, map validation, and integration-heavy systems where clean signal matters more than noisy test volume.'
  ],
  actions: [],
  sections: {
    experienceTitle: 'Work Experience',
    skillsTitle: 'Core Skills',
    educationTitle: 'Education',
    interestsTitle: 'Interests'
  },
  companies: [
    {
      href: 'https://www.forescout.com/',
      image: '../assets/images/forescout-dark.svg',
      alt: 'Forescout Technologies - Network Security and Compliance',
      logoSurface: 'logo-surface-dark',
      name: 'Forescout',
      role: 'QA Automation Engineer',
      domain: 'Cybersecurity',
      timeline: 'Nov 2025 – Present · Eindhoven, NL'
    },
    {
      href: 'https://www.calvi-insight.com/',
      image: '../assets/images/calvi-insight.svg',
      alt: 'Calvi Insight - Telecom Billing Solutions',
      logoSurface: 'logo-surface-dark',
      name: 'Calvi Insight',
      role: 'Software Test Automation Engineer / QA',
      domain: 'Billing Solutions / Telecom',
      timeline: 'Apr 2025 – Oct 2025 · Tilburg, NL'
    },
    {
      href: 'https://www.seeway.ai/',
      image: '../assets/images/seeway-ai.svg',
      alt: 'SeeWay.ai - formerly NavInfo Europe',
      logoSurface: 'logo-surface-dark',
      name: 'SeeWay.ai',
      role: 'Software Test Engineer / Python Developer',
      domain: 'Mobility / Mapping',
      timeline: 'Jan 2022 – Mar 2025 · Formerly NavInfo Europe'
    },
    {
      href: 'https://www.huawei.com/',
      image: '../assets/images/huawei.svg',
      alt: 'Huawei - Mobile and Navigation Technology',
      logoSurface: 'logo-surface-dark',
      name: 'Huawei',
      role: 'Software Test Engineer',
      domain: 'Mobile / Navigation',
      timeline: 'May 2021 – Dec 2021 · Istanbul, TR'
    },
    {
      href: 'https://www.ericsson.com/',
      image: '../assets/images/ericsson.svg',
      alt: 'Ericsson - Telecommunications Equipment and Services',
      logoSurface: 'logo-surface-dark',
      name: 'Ericsson',
      role: 'Software Test Engineer',
      domain: 'Bill & Payment Solutions',
      timeline: 'Nov 2019 – May 2021 · Ankara, TR'
    }
  ],
  skillGroups: [
    {
      title: 'Testing & Automation',
      items: ['Python', 'Pytest', 'Playwright', 'Postman']
    },
    {
      title: 'Data & Query',
      items: ['SQL', 'MSSQL', 'SQLite', 'Oracle', 'ADX', 'KQL']
    },
    {
      title: 'DevOps & Cloud',
      items: ['Docker', 'GitHub Actions', 'Jenkins', 'Git', 'Bitbucket', 'Azure', 'AWS']
    },
    {
      title: 'Tools & Methodologies',
      items: ['Agile/Scrum', 'Jira', 'Confluence', 'qTest', 'Linux', 'macOS', 'Windows']
    }
  ],
  education: [
    {
      degree: 'Master of Science in',
      field: 'Remote Sensing',
      suffix: '(dropped out)',
      school: 'Middle East Technical University',
      schoolHref: 'https://www.metu.edu.tr/',
      years: '2021–2023'
    },
    {
      degree: 'Bachelor of Science in',
      field: 'Engineering',
      school: 'Middle East Technical University',
      schoolHref: 'https://www.metu.edu.tr/',
      years: '2013–2019'
    }
  ],
  interests: 'Machine Learning, Cybersecurity (TryHackMe / HackTheBox), DIY devices & drones (Raspberry Pi / Arduino), and basketball.'
};

export const PROJECTS_COPY = {
  eyebrow: 'Projects',
  title: 'No public project case studies here right now.',
  lead: 'I would rather keep this page quiet than pad it with half-finished experiments, inactive repos, or internal work I cannot properly publish. When something is ready to stand on its own, it will appear here.',
  actions: [
    { href: 'https://github.com/karakayautku4', label: 'GitHub Profile', variant: 'solid', external: true },
    { href: '../index.html', label: 'Back Home', variant: 'outline' }
  ],
  noteTitle: 'Portfolio note',
  notes: [
    'Most of my recent work is product-facing, internal, or not ready to be presented as a proper public case study.',
    'I keep the public projects section intentionally selective instead of treating it like a running archive.',
    'I prefer accuracy over volume, so this page will stay minimal until there is something worth publishing.'
  ]
};