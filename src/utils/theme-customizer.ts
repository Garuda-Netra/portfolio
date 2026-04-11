import { localSettings } from '../data/localSettings';

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return '0, 229, 255';
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export async function applyCustomTheme(): Promise<void> {
  const theme = localSettings.theme;
  const root = document.documentElement;
  const dark = theme.darkMode;
  const light = theme.lightMode;

  root.style.setProperty('--primary-bg', dark.primaryBg);
  root.style.setProperty('--secondary-bg', dark.secondaryBg);
  root.style.setProperty('--accent-cyan', dark.accentCyan);
  root.style.setProperty('--accent-purple', dark.accentPurple);
  root.style.setProperty('--accent-green', dark.accentGreen);
  root.style.setProperty('--primary-text', dark.primaryText);
  root.style.setProperty('--secondary-text', dark.secondaryText);
  root.style.setProperty('--card-bg', dark.cardBg);
  root.style.setProperty('--card-border', dark.cardBorder);

  root.style.setProperty('--light-primary-bg', light.primaryBg);
  root.style.setProperty('--light-secondary-bg', light.secondaryBg);
  root.style.setProperty('--light-accent', light.accentColor);
  root.style.setProperty('--light-primary-text', light.primaryText);
  root.style.setProperty('--light-secondary-text', light.secondaryText);
  root.style.setProperty('--light-card-bg', light.cardBg);
  root.style.setProperty('--light-card-border', light.cardBorder);

  const speedMap: Record<string, string> = {
    slow: '1.5',
    normal: '1',
    fast: '0.7'
  };
  root.style.setProperty('--animation-speed', speedMap[theme.animationSpeed] || '1');

  const fontMap: Record<string, string> = {
    jetbrains: '"JetBrains Mono", monospace',
    'fira-code': '"Fira Code", monospace',
    'source-code-pro': '"Source Code Pro", monospace'
  };
  root.style.setProperty('--terminal-font', fontMap[theme.fontFamily] || '"JetBrains Mono", monospace');

  root.style.setProperty('--accent-cyan-rgb', hexToRgb(dark.accentCyan));
  root.style.setProperty('--accent-purple-rgb', hexToRgb(dark.accentPurple));
  root.style.setProperty('--accent-green-rgb', hexToRgb(dark.accentGreen));
}
