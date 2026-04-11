export type PortfolioFeatureToggles = {
  marqueeStrips: boolean;
  terminalFeature: boolean;
  scannerFeature: boolean;
  loadingScreen: boolean;
  smoothScroll: boolean;
};

export type ThemePalette = {
  primaryBg: string;
  secondaryBg: string;
  accentCyan: string;
  accentPurple: string;
  accentGreen: string;
  primaryText: string;
  secondaryText: string;
  cardBg: string;
  cardBorder: string;
};

export type LightThemePalette = {
  primaryBg: string;
  secondaryBg: string;
  accentColor: string;
  primaryText: string;
  secondaryText: string;
  cardBg: string;
  cardBorder: string;
};

export type LocalSettings = {
  toggles: PortfolioFeatureToggles;
  resume: {
    enabled: boolean;
    path: string;
    filename: string;
    navLabel: string;
  };
  contactForm: {
    provider: 'formspree';
    endpoint: string;
    successMessage: string;
    failureMessage: string;
  };
  theme: {
    darkMode: ThemePalette;
    lightMode: LightThemePalette;
    animationSpeed: 'slow' | 'normal' | 'fast';
    fontFamily: 'jetbrains' | 'fira-code' | 'source-code-pro';
  };
};

export const localSettings: LocalSettings = {
  toggles: {
    marqueeStrips: true,
    terminalFeature: true,
    scannerFeature: true,
    loadingScreen: true,
    smoothScroll: true
  },
  resume: {
    enabled: true,
    path: '/uploads/resume/Prince_Cv.pdf',
    filename: 'Prince_Cv.pdf',
    navLabel: 'Resume'
  },
  contactForm: {
    provider: 'formspree',
    endpoint: 'https://formspree.io/f/your_form_id',
    successMessage: 'Message sent successfully! I will get back to you soon.',
    failureMessage: 'Failed to send message. Please try again.'
  },
  theme: {
    darkMode: {
      primaryBg: '#020509',
      secondaryBg: '#050A12',
      accentCyan: '#00E5FF',
      accentPurple: '#A855F7',
      accentGreen: '#00CC6A',
      primaryText: '#E8EDF4',
      secondaryText: '#AAB4C2',
      cardBg: 'rgba(6, 12, 24, 0.65)',
      cardBorder: 'rgba(0, 229, 255, 0.06)'
    },
    lightMode: {
      primaryBg: '#F8FAFC',
      secondaryBg: '#F1F5F9',
      accentColor: '#0891B2',
      primaryText: '#0F172A',
      secondaryText: '#475569',
      cardBg: 'rgba(255,255,255,0.8)',
      cardBorder: 'rgba(0,0,0,0.08)'
    },
    animationSpeed: 'normal',
    fontFamily: 'jetbrains'
  }
};
