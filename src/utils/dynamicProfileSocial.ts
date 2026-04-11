import {
  aboutContentData,
  educationContentData,
  profileData,
  socialLinksData,
  type SocialLinkData
} from '../data/profile';
import { setHeroTypingTitles } from './premiumSections';
import { setTerminalDynamicContact } from '../terminal/commands';

const DEFAULT_HERO_NAME = 'Prince Kumar';

function toHref(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '#';
  if (trimmed.startsWith('mailto:')) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes('@') && !trimmed.includes(' ')) return `mailto:${trimmed}`;
  return `https://${trimmed}`;
}

function toDisplay(url: string): string {
  return url
    .replace(/^mailto:/i, '')
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '');
}

function iconFor(platform: string): string {
  const normalized = platform.toLowerCase();
  if (normalized.includes('github')) return '&lt;/&gt;';
  if (normalized.includes('linkedin')) return 'in';
  if (normalized.includes('email')) return '&#9993;';
  return '&#128279;';
}

function applyHeroName(name?: string): void {
  const nameNode = document.querySelector<HTMLElement>('#hero-name-text');
  if (!nameNode) return;

  const nextName = (name ?? '').trim();
  nameNode.textContent = nextName || DEFAULT_HERO_NAME;
}

function updateHeroProfile(): void {
  const taglineNode = document.querySelector<HTMLElement>('#hero-tagline-text');
  const imageNode = document.querySelector<HTMLImageElement>('#hero-profile-image');
  const fallbackNode = imageNode?.nextElementSibling as HTMLElement | null;
  const imageUrl = profileData.profileImageUrl.trim();

  applyHeroName(profileData.name);

  if (taglineNode) {
    taglineNode.textContent = profileData.tagline;
  }

  if (imageNode && imageUrl) {
    imageNode.style.display = 'block';
    if (fallbackNode) fallbackNode.style.display = 'none';
    imageNode.onerror = () => {
      imageNode.style.display = 'none';
      if (fallbackNode) fallbackNode.style.display = 'flex';
    };
    imageNode.src = imageUrl;
  } else if (imageNode) {
    imageNode.removeAttribute('src');
    imageNode.style.display = 'none';
    if (fallbackNode) fallbackNode.style.display = 'flex';
  }

  if (Array.isArray(profileData.typingTitles) && profileData.typingTitles.length > 0) {
    setHeroTypingTitles(profileData.typingTitles);
  } else if (profileData.title) {
    setHeroTypingTitles([profileData.title]);
  }

  updateHeroStructure();
}

function updateHeroStructure(): void {
  const structure = profileData.structure;
  if (!structure) return;

  const roleNode = document.querySelector<HTMLElement>('#hero-structure-role');
  const statusNode = document.querySelector<HTMLElement>('#hero-structure-status');
  const metaNode = document.querySelector<HTMLElement>('#hero-structure-meta');
  const focusRoot = document.querySelector<HTMLElement>('#hero-structure-focus');
  const metricsRoot = document.querySelector<HTMLElement>('#hero-structure-metrics');

  if (roleNode) {
    roleNode.textContent = structure.role;
  }

  if (statusNode) {
    statusNode.textContent = structure.status;
  }

  if (metaNode) {
    metaNode.textContent = `${structure.location} • ${structure.availability}`;
  }

  if (focusRoot && Array.isArray(structure.focusAreas) && structure.focusAreas.length > 0) {
    focusRoot.innerHTML = '';
    structure.focusAreas.forEach((item) => {
      const tag = document.createElement('span');
      tag.className = 'hero-structure-tag';
      tag.textContent = item;
      focusRoot.appendChild(tag);
    });
  }

  if (metricsRoot && Array.isArray(structure.metrics) && structure.metrics.length > 0) {
    metricsRoot.innerHTML = '';
    structure.metrics.slice(0, 3).forEach((metric) => {
      const card = document.createElement('div');
      card.className = 'hero-structure-metric';

      const value = document.createElement('p');
      value.className = 'hero-structure-value';
      value.textContent = metric.value;

      const label = document.createElement('p');
      label.className = 'hero-structure-label';
      label.textContent = metric.label;

      card.appendChild(value);
      card.appendChild(label);
      metricsRoot.appendChild(card);
    });
  }
}

function updateAboutContent(): void {
  const ids = ['#about-bio-text', '#about-paragraph-2', '#about-paragraph-3', '#about-paragraph-4'];
  ids.forEach((selector, index) => {
    const node = document.querySelector<HTMLElement>(selector);
    const text = aboutContentData.paragraphs[index];
    if (node && text) node.textContent = text;
  });

  if (!Array.isArray(aboutContentData.stats) || aboutContentData.stats.length === 0) return;

  const statsRoot = document.querySelector<HTMLElement>('#about-stats-grid');
  if (!statsRoot) return;

  statsRoot.innerHTML = aboutContentData.stats
    .map(
      (item, index) => `
    <article class="glass-card about-stat-card animate-on-scroll ${index > 0 ? `stagger-${index}` : ''}" data-about-stat>
      <div class="about-stat-icon" aria-hidden="true">&#9873;</div>
      <div class="about-stat-value" data-target="${item.value}">0</div>
      <p class="about-stat-label">${item.label}</p>
    </article>
  `
    )
    .join('');
}

function updateEducationContent(): void {
  const degree = document.querySelector<HTMLElement>('#education-degree');
  const status = document.querySelector<HTMLElement>('#education-status');
  const institution = document.querySelector<HTMLElement>('#education-institution');
  const focus = document.querySelector<HTMLElement>('#education-focus');

  if (degree) degree.textContent = educationContentData.degree;
  if (status) status.textContent = educationContentData.status;
  if (institution) institution.textContent = educationContentData.institution;
  if (focus) focus.innerHTML = `<strong>${educationContentData.focusAreas}</strong>`;
}

function renderHeroSocial(container: HTMLElement, links: SocialLinkData[], mobile = false): void {
  const mapped = links.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (mobile) {
    container.innerHTML = mapped
      .map((link) => {
        const label = link.platform || 'Link';
        return `<a href="${toHref(link.url)}" target="_blank" rel="noreferrer" class="hero-social-link">${label}</a>`;
      })
      .join('');
    return;
  }

  container.innerHTML = mapped
    .map(
      (link) => `
      <a href="${toHref(link.url)}" target="_blank" rel="noreferrer" aria-label="${link.platform}" class="hero-social-link">
        <span aria-hidden="true">${iconFor(link.platform)}</span>
      </a>
    `
    )
    .join('');
}

function updateFooterSocial(links: SocialLinkData[]): void {
  const root = document.querySelector<HTMLElement>('#footer-socials-dynamic');
  if (!root) return;

  root.innerHTML = links
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(
      (link) => `
      <a href="${toHref(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${link.platform}" data-magnetic>
        ${iconFor(link.platform)}
      </a>
    `
    )
    .join('');
}

function updateContactLinks(links: SocialLinkData[]): void {
  const root = document.querySelector<HTMLElement>('#contact-links-dynamic');
  if (!root) return;

  root.innerHTML = links
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((link) => {
      const href = toHref(link.url);
      const display = link.displayText?.trim() ? link.displayText.trim() : toDisplay(link.url);
      const isExternal = !href.startsWith('mailto:');
      return `
        <a href="${href}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''} class="contact-link-item" data-magnetic aria-label="${link.platform}">
          <span class="contact-link-icon" aria-hidden="true">${iconFor(link.platform)}</span>
          <span class="contact-link-text">${display}</span>
          <span class="contact-link-arrow" aria-hidden="true">&rarr;</span>
        </a>
      `;
    })
    .join('');
}

function updateTerminalData(links: SocialLinkData[]): void {
  const emailLink = links.find((item) => item.platform.toLowerCase().includes('email'));
  const githubLink = links.find((item) => item.platform.toLowerCase().includes('github'));
  const linkedinLink = links.find((item) => item.platform.toLowerCase().includes('linkedin'));

  setTerminalDynamicContact({
    email: (emailLink?.displayText || profileData.email || '').replace(/^mailto:/i, ''),
    github: githubLink ? toDisplay(githubLink.url) : toDisplay(profileData.githubUrl),
    linkedin: linkedinLink ? toDisplay(linkedinLink.url) : toDisplay(profileData.linkedinUrl)
  });
}

export async function initDynamicProfileAndSocial(): Promise<void> {
  try {
    updateHeroProfile();
    updateAboutContent();
    updateEducationContent();

    const visibleLinks = socialLinksData.filter((item) => item.isVisible !== false);

    if (visibleLinks.length > 0) {
      const heroDesktop = document.querySelector<HTMLElement>('#hero-social-desktop');
      const heroMobile = document.querySelector<HTMLElement>('#hero-social-mobile');
      if (heroDesktop) renderHeroSocial(heroDesktop, visibleLinks, false);
      if (heroMobile) renderHeroSocial(heroMobile, visibleLinks, true);
      updateFooterSocial(visibleLinks);
      updateContactLinks(visibleLinks);
    }

    updateTerminalData(visibleLinks);
  } catch {
    // Silent fallback to existing static markup.
  }
}