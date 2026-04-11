interface MarqueeConfig {
  afterSectionId: string;
  text: string;
  speed: number;
  direction: 'ltr' | 'rtl';
  rotation: string;
  tone: 'cyan' | 'purple' | 'mixed';
}

const STRIPS: MarqueeConfig[] = [
  // Intentionally left empty to disable marquee keyword strips.
];

function createStrip(config: MarqueeConfig): HTMLElement {
  const strip = document.createElement('div');
  strip.className = `marquee-strip marquee-${config.tone}`;
  strip.style.setProperty('--marquee-duration', `${config.speed}s`);
  strip.style.setProperty('--marquee-rotation', config.rotation);
  strip.style.setProperty('--marquee-direction', config.direction === 'rtl' ? '-1' : '1');

  const track = document.createElement('div');
  track.className = 'marquee-track';

  for (let i = 0; i < 6; i += 1) {
    const item = document.createElement('span');
    item.className = 'marquee-item';
    item.textContent = config.text;
    track.appendChild(item);
  }

  strip.appendChild(track);
  return strip;
}

export function initMarqueeStrips(): void {
  if (STRIPS.length === 0) {
    return;
  }

  STRIPS.forEach((config) => {
    const section = document.getElementById(config.afterSectionId);
    if (!section || section.dataset.marqueeMounted === 'true') {
      return;
    }

    const strip = createStrip(config);
    section.insertAdjacentElement('afterend', strip);
    section.dataset.marqueeMounted = 'true';
  });
}
