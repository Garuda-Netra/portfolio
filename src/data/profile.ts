export type SocialLinkData = {
  platform: string;
  url: string;
  displayText?: string;
  isVisible?: boolean;
  order?: number;
};

export type ProfileData = {
  name: string;
  title: string;
  tagline: string;
  email: string;
  bio: string;
  profileImageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  typingTitles: string[];
  structure: ProfileStructureData;
};

export type ProfileMetricData = {
  label: string;
  value: string;
};

export type ProfileStructureData = {
  role: string;
  status: string;
  location: string;
  availability: string;
  focusAreas: string[];
  metrics: ProfileMetricData[];
};

export type AboutContentData = {
  paragraphs: string[];
};

export type EducationContentData = {
  degree: string;
  status: string;
  institution: string;
  focusAreas: string;
};

export const profileData: ProfileData = {
  name: 'Prince Kumar',
  title: 'Bug Hunter | CTF Player | Digital Forensics Learner',
  tagline:
    'I build practical security tools, learn digital investigations, and improve through CTFs and hands-on labs.',
  email: 'princekumaarr2005@gmail.com',
  bio:
    'I am Prince Kumar, a B.Tech CSE student at Lovely Professional University with a focused interest in cybersecurity and digital forensics. I enjoy working across both offensive and defensive workflows, from scanning and assessment to investigation and reporting. I actively practice on TryHackMe and Hack The Box, and I build projects that turn security concepts into usable tools.',
  profileImageUrl: '/uploads/profile/Profile.png',
  githubUrl: 'https://github.com/Garuda-Netra',
  linkedinUrl: 'https://www.linkedin.com/in/prince-kumar8/',
  typingTitles: [
    'Cybersecurity Enthusiast',
    'Bug Hunter',
    'Digital Forensics Learner',
    'CTF Player & Bug Hunter',
    'Port Scanner Builder',
    'Red Team / Blue Team Practitioner'
  ],
  structure: {
    role: 'Bug Hunter & Security Tool Builder',
    status: 'Open to Security Internships',
    location: 'India',
    availability: 'Available for Cybersecurity Roles',
    focusAreas: ['Network Security', 'Vulnerability Assessment', 'Digital Forensics', 'CTF Practice'],
    metrics: [
      { label: 'CTF Events Participated', value: '3+' },
      { label: 'TryHackMe Advent Challenges', value: '24' },
      { label: 'Core Security Projects', value: '3+' },
    ]
  }
};

export const socialLinksData: SocialLinkData[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/Garuda-Netra',
    displayText: 'github.com/Garuda-Netra',
    isVisible: true,
    order: 1
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/prince-kumar8/',
    displayText: 'linkedin.com/in/prince-kumar8',
    isVisible: true,
    order: 2
  },
  {
    platform: 'Email',
    url: 'mailto:princekumaarr2005@gmail.com',
    displayText: 'princekumaarr2005@gmail.com',
    isVisible: true,
    order: 3
  }
];

export const aboutContentData: AboutContentData = {
  paragraphs: [
    'I am Prince Kumar, a cybersecurity learner and builder currently pursuing B.Tech in Computer Science and Engineering at Lovely Professional University.',
    'My focus is on practical security work: network analysis, vulnerability discovery, and investigation-driven learning through labs and CTFs.',
    'During my internship at Redynox, I gained hands-on exposure to threat awareness, common risk identification, and the day-to-day thinking process used by security teams.',
    'I keep learning by building projects like TriNetra and Anveshana Vidya, where I combine development skills with real security problem solving.'
  ]
};

export const educationContentData: EducationContentData = {
  degree: 'Bachelor of Technology - Computer Science and Engineering',
  status: 'Pursuing | August 2023 - Present',
  institution: 'Lovely Professional University, Phagwara, Punjab',
  focusAreas: 'CGPA: 7.02'
};
