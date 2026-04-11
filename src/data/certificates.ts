export type CertificateData = {
  id: string;
  shortLabel: string;
  name: string;
  organization: string;
  completionDate: string;
  description: string;
  credentialLink: string;
};

export const certificatesData: CertificateData[] = [
  {
    id: 'caisr',
    shortLabel: 'AI Security',
    name: 'Certified Artificial Intelligence Security & Risk (CAISR)',
    organization: 'Red Team Leaders',
    completionDate: 'February 4, 2026',
    description:
      'Focused on AI security risks like prompt abuse, model vulnerabilities, and practical mitigation strategy design for safer deployments.',
    credentialLink: 'https://drive.google.com/file/d/1EYYJhOJNfwaHQOt-j4l5l1ikQ8kBVS0b/view'
  },
  {
    id: 'ccep',
    shortLabel: 'Cyber Educator',
    name: 'Certified Cybersecurity Educator Professional (CCEP)',
    organization: 'Red Team Leaders',
    completionDate: 'January 21, 2026',
    description:
      'Improved how I communicate complex security topics with clarity, structure, and learner-first delivery for practical cyber training.',
    credentialLink: 'https://drive.google.com/file/d/1MLTuNFXaKZFsfi9sq7z4VWU3-3VfI1xY/view'
  },
  {
    id: 'crtom',
    shortLabel: 'Red Team Ops',
    name: 'Certified Red Team Operations Management (CRTOM)',
    organization: 'Red Team Leaders',
    completionDate: 'December 25, 2025',
    description:
      'Built operational depth in red teaming through attack simulation planning, engagement management, and mission-focused offensive execution.',
    credentialLink: 'https://drive.google.com/file/d/1mPq_21yHNn5o0ZzYgRHNTwq84lIaakoE/view'
  },
  {
    id: 'digital-forensics-incident-investigation',
    shortLabel: 'Forensics',
    name: 'Digital Forensics & Incident Investigation',
    organization: 'Red Team Leaders',
    completionDate: 'April 5, 2026',
    description:
      'Strengthened incident response and forensic workflows, including evidence handling, investigation sequencing, and high-confidence analysis.',
    credentialLink: 'https://drive.google.com/file/d/1ri4iJbz9bwXoXL3zyZT_rHGdNOr-q1Td/view'
  },
  {
    id: 'offensive-agent-ai',
    shortLabel: 'Offensive AI',
    name: 'Offensive Agent AI Course',
    organization: 'Red Team Leaders',
    completionDate: 'December 14, 2025',
    description:
      'Explored AI-driven offensive security techniques and automation patterns to accelerate recon, chaining, and adversarial test workflows.',
    credentialLink: 'https://drive.google.com/file/d/1uYEIb_skx2tjpFMldJk19-uRNJS75XZ5/view'
  },
  {
    id: 'iso-iec-27001-2022',
    shortLabel: 'ISO 27001',
    name: 'ISO/IEC 27001:2022 Information Security Associate',
    organization: 'SkillFront',
    completionDate: 'March 7, 2026',
    description:
      'Gained practical understanding of ISMS controls, compliance alignment, and risk treatment decisions grounded in ISO/IEC 27001:2022.',
    credentialLink: 'https://drive.google.com/file/d/1I0uUDVYWlWtXN0QF5PE3GMAyZNZPon6m/view'
  },
  {
    id: 'reverse-engineering-intro',
    shortLabel: 'Reverse Engineering',
    name: 'Introduction to Reverse Engineering in Cybersecurity',
    organization: 'FutureSkills Prime',
    completionDate: 'April 2, 2026',
    description:
      'Practiced reverse engineering fundamentals for malware behavior analysis and vulnerability discovery across suspicious binaries and artifacts.',
    credentialLink: 'https://drive.google.com/file/d/1DYt4G08cfhAzpSAeIc7m0A_z15a4beGp/view'
  },
  {
    id: 'deloitte-cyber-job-simulation',
    shortLabel: 'Enterprise Simulation',
    name: 'Deloitte Cyber Job Simulation',
    organization: 'Deloitte (Forage)',
    completionDate: 'January 7, 2026',
    description:
      'Completed enterprise-style cybersecurity tasks that strengthened investigative thinking, prioritization, and clear stakeholder communication.',
    credentialLink: 'https://drive.google.com/file/d/1RcOsRNDS3ATcBLjW5miP7pb-bUP7yu7j/view'
  },
  {
    id: 'cybersecurity-job-simulation-phishing-analysis',
    shortLabel: 'Phishing Analysis',
    name: 'Cybersecurity Job Simulation (Phishing & Analysis)',
    organization: 'Forage',
    completionDate: 'March 21, 2026',
    description:
      'Designed phishing simulations and interpreted awareness outcomes to improve user-centric defense planning and measurable security behavior.',
    credentialLink: 'https://drive.google.com/file/d/18Ym0rlPdpYqYNLhv8Ki26FhXPgrWBWYe/view'
  },
  {
    id: 'cybersecurity-analyst-simulation-iam-strategy',
    shortLabel: 'IAM Strategy',
    name: 'Cybersecurity Analyst Simulation (IAM & Strategy)',
    organization: 'Forage',
    completionDate: 'October 11, 2025',
    description:
      'Applied identity and access management concepts to strategy design, control mapping, and solution planning for secure access ecosystems.',
    credentialLink: 'https://example.com/certificates/cybersecurity-analyst-simulation-iam-strategy'
  },
  {
    id: 'tryhackme-advent-of-cyber-2025',
    shortLabel: 'Advent of Cyber',
    name: 'TryHackMe Advent of Cyber 2025',
    organization: 'TryHackMe',
    completionDate: 'December 30, 2025',
    description:
      'Completed all 24 hands-on challenges across core cyber domains, demonstrating consistency, speed, and practical problem-solving under pressure.',
    credentialLink: 'https://drive.google.com/file/d/1o9ihazrzGIELzKjJIgbaJpoLWsyS4Vbe/view'
  },
  {
    id: 'ethical-hacking-course',
    shortLabel: 'Ethical Hacking',
    name: 'Ethical Hacking Course',
    organization: 'WsCube Tech',
    completionDate: 'August 11, 2025',
    description:
      'Finished a 2-month practical ethical hacking track covering real-world tooling, attack methodology, and defensive insight development.',
    credentialLink: 'https://drive.google.com/file/d/1HXy4iV6kIZto21xI9EURZ4AG9LwIBHav/view'
  },
  {
    id: 'redynox-cybersecurity-internship',
    shortLabel: 'Cyber Internship',
    name: 'Redynox Cybersecurity Internship',
    organization: 'Redynox',
    completionDate: 'September 16, 2025',
    description:
      'Gained hands-on internship exposure through real cybersecurity workflows, improving execution discipline, teamwork, and practical security awareness.',
    credentialLink: 'https://drive.google.com/file/d/156Q10akS1HPwtY2z8KL8H5jO0mrTaOs_/view'
  },
  {
    id: 'comptia-pentest-plus-udemy',
    shortLabel: 'PenTest+ Foundations',
    name: 'CompTIA PenTest+ (Ethical Hacking & Security Assessment)',
    organization: 'Udemy',
    completionDate: 'October 5, 2025',
    description:
      'Strengthened penetration testing basics, vulnerability assessment flow, and ethical hacking fundamentals with structured practical exercises.',
    credentialLink: 'https://drive.google.com/file/d/16iFEak0kn5T15tq9XxfKdUS2c7Dbh3g_/view'
  },
  {
    id: 'ait-pune-bypass-ctf',
    shortLabel: 'CTF Participation',
    name: 'AIT Pune BYPASS CTF Participation',
    organization: 'Army Institute of Technology, Pune',
    completionDate: 'December 2025',
    description:
      'Participated in a national-level CTF solving realistic security challenges, sharpening analytical depth and adaptive offensive thinking.',
    credentialLink: 'https://drive.google.com/file/d/1R6JMuPvZ_ffPSoQT00oz4PKLUvh2wLUC/view'
  }
];
