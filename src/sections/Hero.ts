import GlowButton from '../components/GlowButton';

export default function Hero(): string {
  return `
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background: var(--bg-primary); padding-top: 4rem; min-height: 100dvh;">
      <div class="hero-spotlight" aria-hidden="true"></div>
      <div class="hero-mesh" aria-hidden="true"></div>
      <div class="hero-diagonal-glow" aria-hidden="true"></div>

      <!-- Animated Grid Background -->
      <div class="hero-grid"></div>

      <!-- Floating Orbs -->
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
      <div class="hero-shard hero-shard-a" data-parallax="0.05" aria-hidden="true"></div>
      <div class="hero-shard hero-shard-b" data-parallax="0.08" aria-hidden="true"></div>

      <!-- Desktop Social Rail -->
      <div id="hero-social-desktop" class="hero-social-rail hidden lg:flex" aria-label="Social links">
        <a href="https://wa.me/918271915751" target="_blank" rel="noreferrer" aria-label="WhatsApp chat" class="hero-social-link">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="w-4 h-4"><path fill="currentColor" d="M12.04 2C6.59 2 2.17 6.42 2.17 11.87c0 1.75.46 3.47 1.33 4.99L2 22l5.27-1.38a9.82 9.82 0 0 0 4.77 1.22h.01c5.45 0 9.87-4.42 9.87-9.87A9.88 9.88 0 0 0 12.04 2Zm0 18.05h-.01a8.19 8.19 0 0 1-4.17-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.31c0-4.52 3.67-8.2 8.2-8.2a8.2 8.2 0 0 1 8.2 8.2c0 4.52-3.68 8.18-8.17 8.18Zm4.5-6.14c-.25-.12-1.47-.72-1.7-.8c-.23-.09-.39-.13-.55.12c-.16.25-.64.8-.78.96c-.15.16-.29.19-.54.06c-.25-.12-1.04-.38-1.98-1.22c-.73-.65-1.23-1.46-1.37-1.7c-.14-.25-.01-.38.11-.5c.11-.11.25-.29.37-.43c.12-.15.16-.25.24-.41c.08-.17.04-.31-.02-.43c-.06-.12-.55-1.33-.75-1.82c-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.66.31c-.23.25-.87.85-.87 2.07c0 1.22.89 2.4 1.01 2.56c.12.16 1.74 2.65 4.2 3.72c.59.26 1.05.41 1.41.52c.59.19 1.12.16 1.54.1c.47-.07 1.47-.6 1.68-1.18c.21-.58.21-1.08.15-1.18c-.06-.09-.23-.15-.48-.27Z"/></svg>
        </a>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 hero-main-grid items-center gap-10 lg:gap-14">

        <!-- Profile Image -->
        <div class="animate-on-scroll mb-8 lg:mb-0 hero-profile-wrap order-2 lg:order-2">
          <div class="hero-profile-stack">
            <div class="hero-profile-shell" role="img" aria-label="Portrait of Prince Kumar">
              <div class="hero-profile-inner">
                <img
                  id="hero-profile-image"
                  src=""
                  alt="Prince Kumar profile photo"
                  class="hero-profile-photo"
                  loading="eager"
                  decoding="async"
                  style="display:none;"
                  onerror="this.style.display='none'; if (this.nextElementSibling) { this.nextElementSibling.style.display='flex'; }"
                />
                <div class="hero-profile-fallback" style="display:flex;">
                  <svg viewBox="0 0 200 200" class="hero-profile-icon" aria-hidden="true">
                    <path fill="currentColor" d="M100 18l58 22v43c0 44-28 82-58 99c-30-17-58-55-58-99V40z" opacity="0.35" />
                    <circle cx="100" cy="83" r="24" fill="currentColor" opacity="0.7" />
                    <path fill="currentColor" d="M62 152c8-19 23-30 38-30s30 11 38 30" opacity="0.7" />
                  </svg>
                </div>
              </div>
            </div>

            <article id="hero-profile-structure" class="hero-profile-structure glass-card" aria-label="Profile quick overview">
              <div class="hero-profile-structure-top">
                <span id="hero-structure-role" class="hero-structure-chip">Cybersecurity Explorer</span>
                <span id="hero-structure-status" class="hero-structure-chip hero-structure-chip-live">Actively Building</span>
              </div>

              <p id="hero-structure-meta" class="hero-structure-meta">India • Open to Internship Opportunities</p>

              <div id="hero-structure-focus" class="hero-structure-focus" aria-label="Focus areas">
                <span class="hero-structure-tag">Red Teaming</span>
                <span class="hero-structure-tag">Blue Teaming</span>
                <span class="hero-structure-tag">Digital Forensics</span>
                <span class="hero-structure-tag">CTF Practice</span>
              </div>

              <div id="hero-structure-metrics" class="hero-structure-metrics" aria-label="Profile highlights">
                <div class="hero-structure-metric">
                  <p class="hero-structure-value">50+</p>
                  <p class="hero-structure-label">CTF Solved</p>
                </div>
                <div class="hero-structure-metric">
                  <p class="hero-structure-value">10+</p>
                  <p class="hero-structure-label">Tools</p>
                </div>
                <div class="hero-structure-metric">
                  <p class="hero-structure-value">6</p>
                  <p class="hero-structure-label">Projects</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Name & Title -->
        <div class="order-1 lg:order-1 text-center lg:text-left">
          <div class="animate-on-scroll stagger-1">
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 hero-name-gradient">
              <span id="hero-name-text" class="hero-name-shine">Prince Kumar</span>
            </h1>
          </div>

          <div class="animate-on-scroll stagger-2">
            <p class="text-lg sm:text-xl md:text-2xl mb-4 font-medium hero-typed-line" style="color: var(--text-secondary);">
              <span id="hero-typed-text" aria-live="polite"></span>
              <span class="hero-typed-caret" aria-hidden="true">|</span>
            </p>
          </div>

          <div class="animate-on-scroll stagger-3">
            <p id="hero-tagline-text" class="text-base md:text-lg max-w-2xl lg:max-w-3xl mx-auto lg:mx-0 mb-10 hero-tagline" style="color: var(--text-muted);">
              Exploring the intersection of offense and defense in cybersecurity. Building tools, breaking systems, and investigating the digital world.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="animate-on-scroll stagger-4 hero-cta-grid">
            ${GlowButton('View Projects', '#projects', true).replace('class="glow-button', 'class="glow-button hero-cta-btn').replace('<a ', '<a data-magnetic ')}
            ${GlowButton('Open Terminal', '#', false).replace('href="#"', 'href="#" id="open-terminal-btn" data-magnetic').replace('class="glow-button', 'class="glow-button hero-cta-btn')}
            ${GlowButton('🛡 Scan Portfolio', '#', false).replace('href="#"', 'href="#" id="scan-portfolio-btn" data-magnetic').replace('class="glow-button', 'class="glow-button hero-cta-btn')}
          </div>

          <!-- Mobile Social Links -->
          <div id="hero-social-mobile" class="hero-social-mobile lg:hidden mt-8 animate-on-scroll stagger-5" aria-label="Social links">
            <a href="https://github.com/Garuda-Netra" target="_blank" rel="noreferrer" aria-label="GitHub profile" class="hero-social-link">GitHub</a>
            <a href="https://www.linkedin.com/in/prince-kumar8/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" class="hero-social-link">LinkedIn</a>
            <a href="mailto:princekumaarr2005@gmail.com" aria-label="Email address" class="hero-social-link">Email</a>
          </div>

          <!-- Scroll Indicator -->
          <div class="animate-on-scroll stagger-5 mt-14 md:mt-16 lg:mt-20">
            <a href="#about" class="inline-flex flex-col items-center lg:items-start gap-2 transition-opacity hover:opacity-75" style="color: var(--text-muted);">
              <span class="text-sm font-mono tracking-wide">Scroll Down</span>
              <div class="hero-scroll-mouse">
                <div class="hero-scroll-dot"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Existing Visual Depth -->
      <div class="absolute inset-x-0 bottom-0 h-28 pointer-events-none" style="background: linear-gradient(to top, rgba(var(--accent-cyan-rgb), 0.05), transparent);"></div>
    </section>
  `;
}
