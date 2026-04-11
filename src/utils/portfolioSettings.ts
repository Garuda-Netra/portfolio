import { localSettings } from '../data/localSettings';

export type PortfolioSettingsMap = Record<string, boolean>;

const DEFAULT_SETTINGS: PortfolioSettingsMap = { ...localSettings.toggles };

export async function loadPortfolioSettings(): Promise<PortfolioSettingsMap> {
  return { ...DEFAULT_SETTINGS };
}

export function hideFeatureButtons(settings: PortfolioSettingsMap): void {
  if (!settings.terminalFeature) {
    document.querySelectorAll<HTMLElement>('#open-terminal-btn').forEach((node) => {
      node.style.display = 'none';
    });
  }

  if (settings.scannerFeature === false) {
    document.querySelectorAll<HTMLElement>('#scan-portfolio-btn').forEach((node) => {
      node.style.display = 'none';
    });
  }

  if (!settings.marqueeStrips) {
    document.querySelectorAll<HTMLElement>('.marquee-strip').forEach((node) => {
      node.remove();
    });
  }
}

export function getDefaultPortfolioSettings(): PortfolioSettingsMap {
  return { ...DEFAULT_SETTINGS };
}
