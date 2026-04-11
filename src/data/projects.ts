export type ProjectData = {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  link?: string;
  linkLabel?: string;
};

export const projectsData: ProjectData[] = [
  {
    category: 'Red Team | Offensive Security',
    title: 'NetraX 2.0',
    subtitle: 'Advanced Penetration Testing & Social Engineering Simulation Tool',
    description:
      'A professional-grade security testing tool designed for authorized penetration testing and social engineering awareness training. NetraX simulates realistic phishing workflows and demonstrates practical security risk paths in controlled environments.',
    features: [
      'Real-world phishing simulation with decoy templates',
      'Permission-based camera and GPS interaction paths',
      'Tunneling support for controlled demonstrations',
      'Structured credential capture for security training use cases',
      'Cross-platform execution workflow'
    ],
    techStack: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Ngrok', 'Cloudflare'],
    link: 'https://github.com/Garuda-Netra/NetraX-2.0',
    linkLabel: 'View Project'
  },
  {
    category: 'Blue Team | Digital Forensics | Education',
    title: 'Anveshana Vidya',
    subtitle: 'Interactive Digital Forensics Learning Platform',
    description:
      'An immersive educational platform that turns forensic concepts into guided, hands-on workflows. It combines assisted learning with practical command-driven labs and mission-based exercises.',
    features: [
      'Domain-restricted AI assistant for forensic learning paths',
      'Theory modules for network, timeline, hash, memory, and steganography analysis',
      'Advanced terminal with 200+ forensic command patterns',
      'Mission-based challenge progression and case studies'
    ],
    techStack: ['TypeScript', 'JavaScript', 'HTML', 'Tailwind CSS', 'AI Integration'],
    link: 'https://anveshana-vidya.vercel.app/',
    linkLabel: 'View Project'
  },
  {
    category: 'Network Security | Full Stack | Tooling',
    title: 'TriNetra',
    subtitle: 'Third Eye Port Scanner with CLI + Django Web Dashboard',
    description:
      'A full-stack port scanner built with a shared scanning engine for both CLI and web workflows. TriNetra combines fast scriptable scans with a clean dashboard for scan history, filtering, and export.',
    features: [
      'CLI scanner with rich progress output and flexible port input formats',
      'Django web dashboard with scan history and CSV/JSON export',
      'Shared backend scanner engine used by both interfaces',
      'SQLite persistence with production-ready PostgreSQL path',
      'Deployment-ready setup for Render, Heroku, and custom hosting'
    ],
    techStack: ['Python', 'Django', 'SQLite', 'PostgreSQL', 'Rich', 'JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/Garuda-Netra/TriNetra',
    linkLabel: 'View Project'
  }
];
