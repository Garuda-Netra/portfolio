export default function Footer(): string {
  return `
    <footer id="footer" class="footer-wrap">
      <div class="footer-top-line"></div>
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div class="footer-grid">
          <div>
            <h3 class="footer-name">Prince Kumar</h3>
            <p class="footer-tagline">Cybersecurity Professional | Red Teamer | Blue Teamer | Digital Forensics Enthusiast.</p>
            <p class="footer-copy">
              &copy; 2026 Prince Kumar. All rights reserved.
            </p>
          </div>

          <div>
            <h4 class="footer-title">Quick Links</h4>
            <div class="footer-links">
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h4 class="footer-title">Connect</h4>
            <div id="footer-socials-dynamic" class="footer-socials">
              <a href="https://github.com/Garuda-Netra" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-magnetic>&lt;/&gt;</a>
              <a href="https://www.linkedin.com/in/prince-kumar8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-magnetic>in</a>
              <a href="mailto:princekumaarr2005@gmail.com" aria-label="Email" data-magnetic>@</a>
            </div>
            <p class="ctf-clue" aria-hidden="true">Curious? Inspect deeper.</p>
          </div>
        </div>
      </div>

      <button id="back-to-top" class="back-to-top" aria-label="Back to top" data-magnetic>
        &uarr;
      </button>
    </footer>
  `;
}
