import { localSettings } from '../data/localSettings';

export default function Navbar(): string {
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const desktopLinks = navItems
    .map((link) => `<a href="${link.href}" class="nav-link nav-link-premium text-sm font-medium" style="color: var(--text-secondary);">${link.label}</a>`)
    .join('');

  const mobileLinks = navItems
    .map(
      (link, index) =>
        `<a href="${link.href}" class="mobile-nav-link mobile-nav-link-premium" style="--mobile-stagger:${index};">${link.label}</a>`
    )
    .join('');

  const resumeDesktopLink = localSettings.resume.enabled
    ? `
    <a
      href="${localSettings.resume.path}"
      id="nav-resume-link"
      class="nav-link nav-link-premium nav-resume-link"
      data-resume-download
      data-resume-filename="${localSettings.resume.filename}"
      style="color: var(--text-secondary);"
      download="${localSettings.resume.filename}"
      aria-label="Download resume"
      title="Download resume"
    >
      <span class="nav-resume-icon" aria-hidden="true">⤓</span>
      <span>${localSettings.resume.navLabel}</span>
      <span class="nav-resume-dot" aria-hidden="true"></span>
    </a>
  `
    : '';

  const resumeMobileLink = localSettings.resume.enabled
    ? `
    <a
      href="${localSettings.resume.path}"
      id="mobile-nav-resume-link"
      class="mobile-nav-link mobile-nav-link-premium mobile-nav-resume-link"
      data-resume-download
      data-resume-filename="${localSettings.resume.filename}"
      style="--mobile-stagger:${navItems.length};"
      download="${localSettings.resume.filename}"
      aria-label="Download resume"
    >
      <span class="nav-resume-icon" aria-hidden="true">⤓</span>
      <span>${localSettings.resume.navLabel}</span>
      <span class="nav-resume-dot" aria-hidden="true"></span>
    </a>
  `
    : '';

  return `
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-[1000] transition-transform duration-300">
      <div class="nav-glass nav-shell" style="border-bottom: 1px solid transparent;">
        <div class="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[60px] md:h-[70px]">

          <!-- Logo -->
          <a href="#hero" class="flex items-center gap-2 group nav-logo" aria-label="Go to top">
            <span class="nav-logo-mark">PK</span>
          </a>

          <!-- Desktop Links -->
          <div class="hidden md:flex items-center gap-7">
            ${desktopLinks}
            ${resumeDesktopLink}
          </div>

          <!-- Right Side -->
          <div class="flex items-center gap-2 md:gap-3">
            <button
              id="theme-toggle"
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer nav-utility-btn"
              style="background: var(--glass-bg); border: 1px solid var(--glass-border);"
              aria-label="Toggle theme"
            >
              <span id="theme-toggle-icon" class="text-lg leading-none">☀️</span>
            </button>

            <button
              id="mobile-menu-btn"
              class="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 nav-utility-btn nav-hamburger"
              style="background: var(--glass-bg); border: 1px solid var(--glass-border);"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <span class="ham-line"></span>
              <span class="ham-line"></span>
              <span class="ham-line short"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        id="mobile-menu"
        class="mobile-menu mobile-menu-overlay fixed inset-0 md:hidden"
        style="background: rgba(5, 10, 20, 0.72);"
      >
        <div class="mobile-menu-panel">
          <button id="mobile-menu-close" class="mobile-menu-close-btn" aria-label="Close menu">&times;</button>
          <div class="mobile-menu-links">
            ${mobileLinks}
            ${resumeMobileLink}
          </div>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbar(): void {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const resumeLinks = document.querySelectorAll<HTMLAnchorElement>('[data-resume-download]');
  let lastY = window.scrollY;

  const closeMenu = (): void => {
    mobileMenu?.classList.remove('active');
    menuBtn?.setAttribute('aria-expanded', 'false');
    menuBtn?.setAttribute('aria-label', 'Open menu');
    menuBtn?.classList.remove('open');
  };

  const openMenu = (): void => {
    mobileMenu?.classList.add('active');
    menuBtn?.setAttribute('aria-expanded', 'true');
    menuBtn?.setAttribute('aria-label', 'Close menu');
    menuBtn?.classList.add('open');
  };

  menuBtn?.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('active')) {
      closeMenu();
      return;
    }
    openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  resumeLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const path = link.getAttribute('href') ?? '';
      const fileName = link.dataset.resumeFilename || 'Resume.pdf';
      if (!path) {
        return;
      }

      void (async () => {
        try {
          const probe = await fetch(path, { method: 'HEAD' });
          if (!probe.ok) {
            window.alert('Resume file not found. Add it to public/assets/resume and update src/data/localSettings.ts if needed.');
            return;
          }
        } catch {
          window.alert('Could not access resume file. Please check your resume path in src/data/localSettings.ts.');
          return;
        }

        const anchor = document.createElement('a');
        anchor.href = path;
        anchor.download = fileName;
        anchor.rel = 'noopener';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      })();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (
      mobileMenu?.classList.contains('active') &&
      target === mobileMenu &&
      !menuBtn?.contains(target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMenu();
    }
  });

  // Scroll effect + hide on scroll down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > lastY && window.scrollY > 120) {
      navbar?.classList.add('nav-hidden');
    } else {
      navbar?.classList.remove('nav-hidden');
    }

    lastY = window.scrollY;
  });
}