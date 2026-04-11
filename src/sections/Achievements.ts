import SectionContainer from '../components/SectionContainer';

export default function Achievements(): string {
  const achievements = [
    {
      icon: '&#127942;',
      title: 'Bypass CTF 2025 Participant',
      description: 'Completed a national-level CTF organized by the Army Institute of Technology and solved practical challenges focused on web and system security.',
      highlight: 'Dec 2025',
    },
    {
      icon: '&#128640;',
      title: 'Advent of Cyber 2025 Completion',
      description: 'Completed 24 hands-on cybersecurity challenges on TryHackMe, strengthening practical skills in penetration testing, investigation, and threat analysis.',
      highlight: '24 Challenges',
    },
    {
      icon: '&#128126;',
      title: 'Cyber Apocalypse CTF Participant',
      description: 'Participated in Hack The Box Cyber Apocalypse CTF and worked on challenges in web exploitation, reverse engineering, and cryptography.',
      highlight: 'Hack The Box',
    },
    {
      icon: '&#127891;',
      title: 'Cybersecurity Job Simulations',
      description: 'Completed practical job simulation programs from Mastercard, Deloitte, and Tata (Forage), gaining structured exposure to real-world security task patterns.',
      highlight: 'Forage Programs',
    },
    {
      icon: '&#129351;',
      title: 'Consistent Certification Track',
      description: 'Built a steady cybersecurity learning path through certifications in digital forensics, AI security risk, red team operations, and ethical hacking.',
      highlight: '2025 - 2026',
    },
  ];

  const cards = achievements.map((item, index) => `
    <article class="glass-card achievement-card reveal" data-reveal="scale-up" data-delay="${index * 90}" data-tilt>
      <div class="achievement-top-accent"></div>
      <div class="achievement-icon" aria-hidden="true">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <span class="achievement-highlight">${item.highlight}</span>
    </article>
  `).join('');

  const content = `
    <div class="achievements-wrap section-divider-top">
      <div class="text-center mb-16 reveal" data-reveal="fade-up">
        <h2 class="section-title" style="color: var(--text-primary);" data-split="chars">Achievements</h2>
        <p class="section-subtitle">Milestones and recognitions along my cybersecurity journey.</p>
      </div>
      <div class="achievement-grid">
        ${cards}
      </div>
    </div>
  `;

  return SectionContainer('achievements', content);
}
