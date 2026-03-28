/**
 * Shared site content and small rendering helpers.
 * @module site-content
 */

export const SITE_PRIMARY_NAV = [
  { href: 'index.html', label: 'Home', icon: 'home', iconOnly: true },
  { href: 'about.html', label: 'About', icon: 'about', iconOnly: true },
  { href: 'projects.html', label: 'Projects', icon: 'projects', iconOnly: true }
];

export const SITE_EXPLORE_LINKS = [
  { href: 'hobbies.html', label: 'Hobbies', icon: 'hobbies', iconOnly: true },
  { href: 'bookmarks.html', label: 'Bookmarks', icon: 'bookmarks', iconOnly: true }
];

export const SITE_ONLINE_LINKS = [
  { href: 'https://github.com/karakayautku4', label: 'GitHub', icon: 'github', iconOnly: true },
  { href: 'https://tryhackme.com/p/karakayautku4', label: 'TryHackMe', icon: 'tryhackme', iconOnly: true },
  { href: 'https://www.hackerrank.com/karakayautku4', label: 'HackerRank', icon: 'hackerrank', iconOnly: true }
];

export const SITE_SOCIAL_LINKS = [
  { href: 'https://linkedin.com/in/karakayautku4', label: 'LinkedIn', icon: 'linkedin', iconOnly: true },
  { href: 'https://x.com/karakayautku4', label: 'X', icon: 'x', iconOnly: true },
  { href: 'https://instagram.com/karakayautku4', label: 'Instagram', icon: 'instagram', iconOnly: true },
  { href: 'https://www.reddit.com/user/karakayautku4/', label: 'Reddit', icon: 'reddit', iconOnly: true }
];

export const ABOUT_HIGHLIGHTS = [
  {
    label: 'Primary Focus',
    value: 'Automation that ships',
    description: 'UI, API, and data validation flows built to catch regressions without slowing delivery.'
  },
  {
    label: 'Core Stack',
    value: 'Python / Playwright / Pytest',
    description: 'A practical stack for maintainable suites, repeatable local runs, and CI-friendly feedback.'
  },
  {
    label: 'Working Style',
    value: 'Quiet, systematic, durable',
    description: 'I care more about trustworthy systems and clean signal than dashboards built for show.'
  }
];

export const COLLECTION_PAGE_OVERVIEWS = {
  hobbies: [
    {
      label: 'Collection Style',
      value: 'Small and selective',
      description: 'I would rather keep a narrow set of things I genuinely enjoy than publish a bloated catalog.'
    },
    {
      label: 'Current Bias',
      value: 'Mechanical objects',
      description: 'Watches and maker tools that reward attention to detail are the items I revisit most.'
    }
  ],
  bookmarks: [
    {
      label: 'Bookmark Rule',
      value: 'Revisit-worthy only',
      description: 'If I would not intentionally open it again later, it does not belong on this page.'
    },
    {
      label: 'Typical Picks',
      value: 'Technical writing + tools',
      description: 'I save resources that explain things clearly, teach by example, or stay useful over time.'
    }
  ]
};

export function renderHighlightCards(items, className = '') {
  return items.map(item => `
    <article class="highlight-card ${className}">
      <p class="highlight-label">${item.label}</p>
      <h2>${item.value}</h2>
      <p>${item.description}</p>
    </article>`).join('');
}