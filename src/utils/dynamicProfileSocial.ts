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
const HERO_WHATSAPP_LINK: SocialLinkData = {
  platform: 'WhatsApp',
  url: 'https://wa.me/918271915751',
  displayText: '+91 8271915751',
  isVisible: true,
  order: 1
};

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
  if (normalized.includes('whatsapp')) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="w-4 h-4"><path fill="currentColor" d="M12.04 2C6.59 2 2.17 6.42 2.17 11.87c0 1.75.46 3.47 1.33 4.99L2 22l5.27-1.38a9.82 9.82 0 0 0 4.77 1.22h.01c5.45 0 9.87-4.42 9.87-9.87A9.88 9.88 0 0 0 12.04 2Zm0 18.05h-.01a8.19 8.19 0 0 1-4.17-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.31c0-4.52 3.67-8.2 8.2-8.2a8.2 8.2 0 0 1 8.2 8.2c0 4.52-3.68 8.18-8.17 8.18Zm4.5-6.14c-.25-.12-1.47-.72-1.7-.8c-.23-.09-.39-.13-.55.12c-.16.25-.64.8-.78.96c-.15.16-.29.19-.54.06c-.25-.12-1.04-.38-1.98-1.22c-.73-.65-1.23-1.46-1.37-1.7c-.14-.25-.01-.38.11-.5c.11-.11.25-.29.37-.43c.12-.15.16-.25.24-.41c.08-.17.04-.31-.02-.43c-.06-.12-.55-1.33-.75-1.82c-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.66.31c-.23.25-.87.85-.87 2.07c0 1.22.89 2.4 1.01 2.56c.12.16 1.74 2.65 4.2 3.72c.59.26 1.05.41 1.41.52c.59.19 1.12.16 1.54.1c.47-.07 1.47-.6 1.68-1.18c.21-.58.21-1.08.15-1.18c-.06-.09-.23-.15-.48-.27Z"/></svg>';
  }
  if (normalized.includes('github')) return '&lt;/&gt;';
  if (normalized.includes('linkedin')) return 'in';
  if (normalized.includes('email')) return '&#9993;';
  return '&#128279;';
}

function heroLinksWithWhatsApp(links: SocialLinkData[]): SocialLinkData[] {
  const sorted = links.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const firstOrder = sorted[0]?.order ?? HERO_WHATSAPP_LINK.order;

  return [
    {
      ...HERO_WHATSAPP_LINK,
      order: firstOrder
    }
  ];
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

function initHeroProfileInteraction(): void {
  const shell = document.querySelector<HTMLElement>('.hero-profile-shell');
  if (!shell) return;

  let activePointerId: number | null = null;
  let isPointerHeld = false;

  const showColor = (): void => {
    shell.classList.add('is-color');
  };

  const hideColor = (): void => {
    shell.classList.remove('is-color');
  };

  const pauseHang = (): void => {
    shell.classList.add('is-held');
  };

  const resumeHang = (): void => {
    shell.classList.remove('is-held');
  };

  const supportsHover = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const syncColorState = (): void => {
    if (isPointerHeld) {
      showColor();
      return;
    }

    if (supportsHover() && shell.matches(':hover')) {
      showColor();
      return;
    }

    hideColor();
  };

  const releasePointer = (): void => {
    if (activePointerId !== null && shell.hasPointerCapture(activePointerId)) {
      shell.releasePointerCapture(activePointerId);
    }
    activePointerId = null;
  };

  const endHold = (): void => {
    isPointerHeld = false;
    resumeHang();
    releasePointer();
    syncColorState();
  };

  shell.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') {
      showColor();
    }
  });

  shell.addEventListener('pointerleave', () => {
    if (!isPointerHeld) {
      hideColor();
    }
  });
  shell.addEventListener('focusin', showColor);
  shell.addEventListener('focusout', syncColorState);

  shell.addEventListener('pointerdown', (event) => {
    activePointerId = event.pointerId;
    isPointerHeld = true;

    try {
      shell.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture can fail on some iOS WebKit flows; state still works without it.
    }

    pauseHang();
    showColor();
  });

  shell.addEventListener('pointerup', endHold);
  shell.addEventListener('pointercancel', endHold);
  shell.addEventListener('lostpointercapture', endHold);

  document.addEventListener('pointerup', () => {
    if (isPointerHeld) {
      endHold();
    }
  });

  document.addEventListener('pointercancel', () => {
    if (isPointerHeld) {
      endHold();
    }
  });

  window.addEventListener('blur', endHold);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') {
      endHold();
    }
  });
}

function updateAboutContent(): void {
  const ids = ['#about-bio-text', '#about-paragraph-2', '#about-paragraph-3', '#about-paragraph-4'];
  ids.forEach((selector, index) => {
    const node = document.querySelector<HTMLElement>(selector);
    const text = aboutContentData.paragraphs[index];
    if (node && text) node.textContent = text;
  });
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
    initHeroProfileInteraction();
    updateAboutContent();
    updateEducationContent();

    const visibleLinks = socialLinksData.filter((item) => item.isVisible !== false);

    if (visibleLinks.length > 0) {
      const heroDesktop = document.querySelector<HTMLElement>('#hero-social-desktop');
      const heroMobile = document.querySelector<HTMLElement>('#hero-social-mobile');
      const heroDesktopLinks = heroLinksWithWhatsApp(visibleLinks);

      if (heroDesktop) renderHeroSocial(heroDesktop, heroDesktopLinks, false);
      if (heroMobile) renderHeroSocial(heroMobile, visibleLinks, true);
      updateFooterSocial(visibleLinks);
      updateContactLinks(visibleLinks);
    }

    updateTerminalData(visibleLinks);
  } catch {
    // Silent fallback to existing static markup.
  }
}