export type SkillCategoryData = {
  id: string;
  title: string;
  accent: 'cyan' | 'offensive' | 'defensive' | 'platforms' | 'other';
  tags: string;
  icon: string;
  items: string[];
};

export const skillsData: SkillCategoryData[] = [
  {
    id: 'languages-scripting',
    title: 'Languages & Scripting',
    accent: 'cyan',
    tags: 'all',
    icon: '&#128187;',
    items: ['Python (Intermediate)', 'Bash / Shell Scripting (Intermediate)', 'Rust (Learning)']
  },
  {
    id: 'operating-systems',
    title: 'Operating Systems',
    accent: 'cyan',
    tags: 'all platforms',
    icon: '&#128421;',
    items: ['Ubuntu', 'Kali Linux', 'Arch Linux', 'Windows', 'Virtual Machines']
  },
  {
    id: 'offensive-security',
    title: 'Offensive Security Tools',
    accent: 'offensive',
    tags: 'all offensive tools',
    icon: '&#9876;',
    items: ['Nmap', 'Burp Suite', 'Metasploit Framework', 'SQLmap', 'Gobuster', 'Feroxbuster', 'Hashcat', 'SET Toolkit', 'Hping3']
  },
  {
    id: 'defensive-security',
    title: 'Defensive & Forensics Tools',
    accent: 'defensive',
    tags: 'all defensive tools',
    icon: '&#128737;',
    items: ['Wireshark', 'Nessus', 'Ghidra', 'Autopsy', 'FTK Imager', 'dd', 'dcfldd', 'dc3dd', 'rkhunter', 'tcpdump', 'tshark', 'Splunk']
  },
  {
    id: 'platforms-labs',
    title: 'Platforms & Labs',
    accent: 'platforms',
    tags: 'all platforms',
    icon: '&#127942;',
    items: ['TryHackMe', 'Hack The Box', 'Kali Linux Tooling Workflow']
  },
  {
    id: 'other-skills',
    title: 'Soft Skills',
    accent: 'other',
    tags: 'all',
    icon: '&#129504;',
    items: ['Problem-Solving', 'Self-Learner', 'Adaptability', 'Leadership', 'Time Management']
  }
];
