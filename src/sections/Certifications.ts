import SectionContainer from '../components/SectionContainer';
import { certificatesData, type CertificateData } from '../data/certificates';

type CertificateVisual = {
  domainLabel: string;
  domainIcon: string;
  titleIcon: string;
  tone: string;
};

const certificateVisualMap: Record<string, CertificateVisual> = {
  caisr: { domainLabel: 'AI Security', domainIcon: '🤖', titleIcon: '🛡️', tone: 'ai' },
  ccep: { domainLabel: 'Cyber Education', domainIcon: '🎓', titleIcon: '📚', tone: 'education' },
  crtom: { domainLabel: 'Red Teaming', domainIcon: '🎯', titleIcon: '🛡️', tone: 'offensive' },
  'digital-forensics-incident-investigation': { domainLabel: 'Forensics', domainIcon: '🔍', titleIcon: '🔬', tone: 'forensics' },
  'offensive-agent-ai': { domainLabel: 'Offensive AI', domainIcon: '🤖', titleIcon: '🎯', tone: 'offensive' },
  'iso-iec-27001-2022': { domainLabel: 'Compliance', domainIcon: '🛡️', titleIcon: '📊', tone: 'governance' },
  'reverse-engineering-intro': { domainLabel: 'Reverse Engineering', domainIcon: '🔍', titleIcon: '🛡️', tone: 'forensics' },
  'deloitte-cyber-job-simulation': { domainLabel: 'Enterprise Sim', domainIcon: '🛡️', titleIcon: '🏢', tone: 'simulation' },
  'cybersecurity-job-simulation-phishing-analysis': { domainLabel: 'Phishing Analysis', domainIcon: '🔍', titleIcon: '🛡️', tone: 'simulation' },
  'cybersecurity-analyst-simulation-iam-strategy': { domainLabel: 'IAM Strategy', domainIcon: '🛡️', titleIcon: '🔑', tone: 'governance' },
  'tryhackme-advent-of-cyber-2025': { domainLabel: 'CTF Challenges', domainIcon: '🎯', titleIcon: '🛡️', tone: 'ctf' },
  'ethical-hacking-course': { domainLabel: 'Ethical Hacking', domainIcon: '🛡️', titleIcon: '💻', tone: 'offensive' },
  'redynox-cybersecurity-internship': { domainLabel: 'Internship', domainIcon: '🛡️', titleIcon: '🚀', tone: 'internship' },
  'comptia-pentest-plus-udemy': { domainLabel: 'Pen Testing', domainIcon: '🎯', titleIcon: '🛡️', tone: 'offensive' },
  'ait-pune-bypass-ctf': { domainLabel: 'National CTF', domainIcon: '🎯', titleIcon: '🛡️', tone: 'ctf' }
};

const fallbackVisual: CertificateVisual = {
  domainLabel: 'Cybersecurity',
  domainIcon: '🛡️',
  titleIcon: '📜',
  tone: 'core'
};

function getVisualForCertificate(cert: CertificateData): CertificateVisual {
  return certificateVisualMap[cert.id] ?? fallbackVisual;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCertificateCard(cert: CertificateData, index: number): string {
  const visual = getVisualForCertificate(cert);

  return `
    <article
      class="cert-flip-card reveal"
      data-reveal="fade-up"
      data-delay="${index * 70}"
      data-cert-id="${escapeHtml(cert.id)}"
      tabindex="0"
      role="button"
      aria-pressed="false"
      aria-label="Flip card for ${escapeHtml(cert.name)}"
      data-magnetic
    >
      <div class="cert-paperclip" aria-hidden="true">
        <svg width="28" height="64" viewBox="0 0 24 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 44V16a4 4 0 0 1 8 0v36a8 8 0 0 1-16 0V20" />
        </svg>
      </div>
      <div class="cert-flip-card-inner">
        <div class="cert-face cert-front" aria-hidden="false">
          <div class="cert-front-head">
            <span class="cert-domain-chip cert-domain-${escapeHtml(visual.tone)}">
              <span class="cert-domain-icon" aria-hidden="true">${visual.domainIcon}</span>
              <span class="cert-domain-text">${escapeHtml(visual.domainLabel)}</span>
            </span>
            <span class="cert-complete-chip" aria-label="Completed certificate">
              <span class="cert-complete-icon" aria-hidden="true">&#x2714;</span>
              <span>Completed</span>
            </span>
          </div>
          <h3 class="cert-front-title">
            <span class="cert-title-icon" aria-hidden="true">${visual.titleIcon}</span>
            <span>${escapeHtml(cert.shortLabel)}</span>
          </h3>
          <p class="cert-front-org">${escapeHtml(cert.organization)}</p>
        </div>
        <div class="cert-face cert-back" aria-hidden="true">
          <p class="cert-back-label">
            <span class="cert-inline-icon" aria-hidden="true">&#x1F4DC;</span>
            <span>Credential</span>
          </p>
          <h3 class="cert-back-title">${escapeHtml(cert.name)}</h3>
          <div class="cert-back-meta">
            <p class="cert-back-org">
              <span class="cert-inline-icon" aria-hidden="true">&#x1F3E2;</span>
              <span>${escapeHtml(cert.organization)}</span>
            </p>
            <p class="cert-back-date">
              <span class="cert-inline-icon" aria-hidden="true">&#x1F4C5;</span>
              <span>${escapeHtml(cert.completionDate)}</span>
            </p>
          </div>
          <p class="cert-back-description">${escapeHtml(cert.description)}</p>
          <a
            href="${escapeHtml(cert.credentialLink)}"
            target="_blank"
            rel="noopener noreferrer"
            class="cert-view-btn"
            aria-label="View certificate for ${escapeHtml(cert.name)}"
          >
            <span aria-hidden="true">&#x1F517;</span>
            <span>View Certificate</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

export default function Certifications(): string {
  const previewCount = 4;

  const content = `
    <div class="certifications-wrap section-divider-top">
      <div class="text-center mb-16 reveal" data-reveal="fade-up">
        <h2 class="section-title" style="color: var(--text-primary);" data-split="chars">Certifications (Certs)</h2>
        <p class="section-subtitle">Curated credentials that validate my cybersecurity expertise.</p>
      </div>

      <div id="cert-board" class="cert-board" data-stagger-group data-stagger-step="80">
        <div class="cert-loading" style="grid-column: 1 / -1; text-align: center; color: #8ea9c1; padding: 2rem;">Loading certifications...</div>
      </div>
      <div id="cert-view-toggle-wrap" class="cert-view-toggle-wrap hidden">
        <button id="cert-view-toggle-btn" class="cert-view-toggle-btn" type="button" aria-expanded="false">
          View Full Credentials
        </button>
      </div>
    </div>
  `;

  const section = SectionContainer('certifications', content);

  // Render certifications after DOM is ready so interactions can be bound once.
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const certBoard = document.getElementById('cert-board');
      const certToggleWrap = document.getElementById('cert-view-toggle-wrap');
      const certToggleBtn = document.getElementById('cert-view-toggle-btn') as HTMLButtonElement | null;
      if (!certBoard) return;

      if (certBoard.dataset.initialized === 'true') return;
      certBoard.dataset.initialized = 'true';
      let isShowingAll = false;

      const getVisibleCertifications = (): CertificateData[] => {
        if (isShowingAll) return certificatesData;
        return certificatesData.slice(0, previewCount);
      };

      const renderCertifications = (): void => {
        if (certificatesData.length === 0) {
          certBoard.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #8ea9c1; padding: 2rem;">No certifications yet.</p>';
          certToggleWrap?.classList.add('hidden');
          return;
        }

        const visibleItems = getVisibleCertifications();
        const cards = visibleItems
          .map((cert, index) => renderCertificateCard(cert, index))
          .join('');

        certBoard.innerHTML = cards;

        const hasOverflow = certificatesData.length > previewCount;
        if (!hasOverflow || !certToggleWrap || !certToggleBtn) {
          certToggleWrap?.classList.add('hidden');
          return;
        }

        const hiddenCount = Math.max(certificatesData.length - previewCount, 0);
        certToggleWrap.classList.remove('hidden');
        certToggleBtn.setAttribute('aria-expanded', String(isShowingAll));
        certToggleBtn.textContent = isShowingAll
          ? 'Show Fewer Credentials'
          : `View Full Credentials (${hiddenCount} more)`;
      };

      const syncFaceAria = (card: HTMLElement): void => {
        const isFlipped = card.classList.contains('is-flipped');
        const front = card.querySelector<HTMLElement>('.cert-front');
        const back = card.querySelector<HTMLElement>('.cert-back');
        front?.setAttribute('aria-hidden', String(isFlipped));
        back?.setAttribute('aria-hidden', String(!isFlipped));
      };

      const markCardFlipping = (card: HTMLElement): void => {
        const inner = card.querySelector<HTMLElement>('.cert-flip-card-inner');
        card.classList.add('is-flipping');

        if (!inner) {
          window.setTimeout(() => {
            card.classList.remove('is-flipping');
          }, 760);
          return;
        }

        const clearFlipping = (): void => {
          card.classList.remove('is-flipping');
        };

        inner.addEventListener(
          'transitionend',
          (event) => {
            if ((event as TransitionEvent).propertyName !== 'transform') {
              return;
            }
            clearFlipping();
          },
          { once: true }
        );

        window.setTimeout(clearFlipping, 800);
      };

      const toggleCard = (card: HTMLElement): void => {
        const shouldFlip = !card.classList.contains('is-flipped');
        const openedCards = certBoard.querySelectorAll<HTMLElement>('.cert-flip-card.is-flipped');

        // Unflip all other open cards — restore their float animation
        openedCards.forEach((openedCard) => {
          if (openedCard !== card) {
            openedCard.classList.remove('is-flipped');
            openedCard.classList.remove('is-flipping');
            openedCard.setAttribute('aria-pressed', 'false');
            openedCard.style.animationPlayState = '';
            syncFaceAria(openedCard);
          }
        });

        markCardFlipping(card);
        card.classList.toggle('is-flipped', shouldFlip);
        card.setAttribute('aria-pressed', String(shouldFlip));

        // Pause the float animation while flipped — eliminates jitter
        // from two competing transforms on the same stacking context.
        card.style.animationPlayState = shouldFlip ? 'paused' : '';

        syncFaceAria(card);
      };

      const getEventCard = (target: EventTarget | null): HTMLElement | null => {
        if (!(target instanceof HTMLElement)) return null;
        return target.closest('.cert-flip-card') as HTMLElement | null;
      };

      certBoard.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.closest('.cert-view-btn')) return;

        const card = getEventCard(event.target);
        if (!card) return;
        toggleCard(card);
      });

      certBoard.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        const card = getEventCard(event.target);
        if (!card) return;

        event.preventDefault();
        toggleCard(card);
      });

      certBoard.addEventListener('focusin', (event) => {
        const card = getEventCard(event.target);
        if (!card) return;

        certBoard.querySelectorAll<HTMLElement>('.cert-flip-card.is-flipped').forEach((openedCard) => {
          if (openedCard !== card) {
            openedCard.classList.remove('is-flipped');
            openedCard.setAttribute('aria-pressed', 'false');
            syncFaceAria(openedCard);
          }
        });
      });

      certToggleBtn?.addEventListener('click', () => {
        isShowingAll = !isShowingAll;
        renderCertifications();
      });

      renderCertifications();
    }, 100);
  }

  return section;
}
