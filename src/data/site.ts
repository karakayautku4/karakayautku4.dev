export const site = {
  name: 'Utku Karakaya',
  domain: 'karakayautku4.dev',
  url: 'https://karakayautku4.dev',
  jobTitle: 'Software Development Engineer in Test',
  location: 'Eindhoven',
  profileImage: '/images/profile.webp',
  profileAlt: 'Portrait of Utku Karakaya',
  cv: {
    href: '/Utku-Karakaya-CV.pdf',
    label: 'Download CV',
    fileName: 'Utku-Karakaya-CV.pdf',
  },
} as const;

export const homeLead =
  'Software Development Engineer in Test in Eindhoven. I develop automation tools — including with AI — that accelerate teams across the company, not just my own.';

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
] as const;

export const socials = [
  { href: 'https://github.com/karakayautku4', label: 'GitHub', icon: 'github' },
  { href: 'https://tryhackme.com/p/karakayautku4', label: 'TryHackMe', icon: 'tryhackme' },
  { href: 'https://www.hackerrank.com/karakayautku4', label: 'HackerRank', icon: 'hackerrank' },
  { href: 'https://linkedin.com/in/karakayautku4', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://x.com/karakayautku4', label: 'X', icon: 'x' },
  { href: 'https://instagram.com/karakayautku4', label: 'Instagram', icon: 'instagram' },
  { href: 'https://www.reddit.com/user/karakayautku4/', label: 'Reddit', icon: 'reddit' },
] as const;

export const currentRole = {
  company: 'Forescout',
  href: 'https://www.forescout.com/',
  title: 'Software Development Engineer in Test',
  domain: 'Cybersecurity',
  timeline: 'Nov 2025 – Present',
  place: 'Eindhoven, NL',
  note: 'Automation tools that accelerate teams across the company.',
} as const;

export const about = {
  headline: 'I build automation tools that help other teams move faster.',
  paragraphs: [
    'Software Development Engineer in Test with 6+ years across cybersecurity, telecom, and mapping. These days the job is less "own one test suite" and more "find the friction, then ship tools that take it away" — often with AI in the mix.',
    'At Forescout in Eindhoven I develop automation tools that accelerate teams across the company. Before that: telecom billing at Calvi Insight, map validation at SeeWay.ai (ex-NavInfo Europe), and earlier test roles at Huawei and Ericsson.',
  ],
} as const;

export const experience = [
  {
    company: 'Forescout',
    href: 'https://www.forescout.com/',
    title: 'Software Development Engineer in Test',
    domain: 'Cybersecurity',
    timeline: 'Nov 2025 – Present',
    place: 'Eindhoven, NL',
  },
  {
    company: 'Calvi Insight',
    href: 'https://www.calvi-insight.com/',
    title: 'Software Test Automation Engineer / QA',
    domain: 'Billing Solutions / Telecom',
    timeline: 'Apr 2025 – Oct 2025',
    place: 'Tilburg, NL',
  },
  {
    company: 'SeeWay.ai',
    href: 'https://www.seeway.ai/',
    title: 'Software Test Engineer / Python Developer',
    domain: 'Mobility / Mapping',
    timeline: 'Jan 2022 – Mar 2025',
    place: 'Formerly NavInfo Europe',
  },
  {
    company: 'Huawei',
    href: 'https://www.huawei.com/',
    title: 'Software Test Engineer',
    domain: 'Mobile / Navigation',
    timeline: 'May 2021 – Dec 2021',
    place: 'Istanbul, TR',
  },
  {
    company: 'Ericsson',
    href: 'https://www.ericsson.com/',
    title: 'Software Test Engineer',
    domain: 'Bill & Payment Solutions',
    timeline: 'Nov 2019 – May 2021',
    place: 'Ankara, TR',
  },
] as const;

export const skillGroups = [
  {
    title: 'Testing & Automation',
    items: ['Python', 'Pytest', 'Playwright', 'Postman'],
  },
  {
    title: 'Data & Query',
    items: ['SQL', 'MSSQL', 'SQLite', 'Oracle', 'ADX', 'KQL'],
  },
  {
    title: 'DevOps & Cloud',
    items: ['Docker', 'GitHub Actions', 'Jenkins', 'Git', 'Bitbucket', 'Azure', 'AWS'],
  },
  {
    title: 'Tools & Methodologies',
    items: ['Agile/Scrum', 'Jira', 'Confluence', 'qTest', 'Linux', 'macOS', 'Windows'],
  },
] as const;

export const education = [
  {
    credential: 'BSc Engineering',
    school: 'Middle East Technical University (METU)',
    href: 'https://www.metu.edu.tr/',
    years: '2013–2019',
  },
  {
    credential: 'MSc Remote Sensing',
    school: 'Middle East Technical University (METU)',
    href: 'https://www.metu.edu.tr/',
    years: '2021–2023 (dropped out)',
  },
] as const;

export const interests =
  'ML, cybersecurity labs (TryHackMe / HackTheBox), DIY hardware, basketball.';

export const projects = {
  title: 'Projects',
  paragraphs: [
    'No public case studies yet. I would rather keep this page empty than invent write-ups for work I cannot share.',
    'I will add project write-ups here when they are ready.',
  ],
  githubLabel: 'GitHub',
  githubHref: 'https://github.com/karakayautku4',
} as const;
