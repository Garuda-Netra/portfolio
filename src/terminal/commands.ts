import { handleCtfCommand } from '../utils/ctf-challenge';
import { profileData, aboutContentData, educationContentData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { getDecryptTerminalLines } from '../utils/encrypted-message';
import { getVulnerabilityScanTerminalLines } from '../utils/vulnerability-scanner';

export type TerminalTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'cyan'
  | 'purple'
  | 'ctfBorder'
  | 'ctfText'
  | 'ctfCommand'
  | 'ctfOk'
  | 'ctfFail'
  | 'prompt'
  | 'error'
  | 'success'
  | 'warning'
  | 'dark-green'
  | 'dark-blue'
  | 'navy-blue'
  | 'pink'
  | 'yellow'
  | 'orange'
  | 'light-green'
  | 'light-blue'
  | 'magenta';

export interface TerminalSegment {
  text: string;
  tone?: TerminalTone;
  effect?: 'scramble';
}

export interface TerminalLine {
  segments: TerminalSegment[];
  pre?: boolean;
  speed?: number;
}

export interface CommandExecutionResult {
  clear?: boolean;
  matrix?: boolean;
  ctfCelebration?: 'capture' | 'complete';
  lines?: TerminalLine[];
}

export interface CommandContext {
  viewportWidth: number;
  viewportHeight: number;
}

export interface CommandInput {
  raw: string;
  base: string;
  args: string[];
}

interface CommandDefinition {
  name: string;
  description: string;
  execute: (context: CommandContext, input: CommandInput) => CommandExecutionResult;
}

function toDisplayLink(value: string): string {
  return value.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

const dynamicContact = {
  email: profileData.email,
  github: toDisplayLink(profileData.githubUrl),
  linkedin: toDisplayLink(profileData.linkedinUrl)
};

export function setTerminalDynamicContact(payload: {
  email?: string;
  github?: string;
  linkedin?: string;
}): void {
  if (payload.email && payload.email.trim()) dynamicContact.email = payload.email.trim();
  if (payload.github && payload.github.trim()) dynamicContact.github = payload.github.trim();
  if (payload.linkedin && payload.linkedin.trim()) dynamicContact.linkedin = payload.linkedin.trim();
}

const seg = (text: string, tone: TerminalTone = 'primary'): TerminalSegment => ({ text, tone });
const line = (
  text: string,
  tone: TerminalTone = 'primary',
  options?: { pre?: boolean; speed?: number }
): TerminalLine => ({
  segments: [seg(text, tone)],
  pre: options?.pre,
  speed: options?.speed,
});

function makeHelpLines(commands: CommandDefinition[]): TerminalLine[] {
  const allRows = commands.map((item) => ({ name: item.name, description: item.description }));
  const maxCommandLength = allRows.reduce((max, item) => Math.max(max, item.name.length), 0);

  const header: TerminalLine[] = [
    line('Available commands:', 'cyan'),
    line(''),
  ];

  const rows = allRows.map((item) => ({
    segments: [
      seg(item.name.padEnd(maxCommandLength + 4, ' '), 'cyan'),
      seg(item.description, 'purple'),
    ],
    pre: true,
  }));

  return [...header, ...rows];
}

function getPrimaryFocusAreas(): string {
  return profileData.structure.focusAreas.join(' | ');
}

function getHighlightedSkills(): string {
  return skillsData
    .flatMap((group) => group.items)
    .slice(0, 8)
    .join(', ');
}

function neofetchLines(context: CommandContext): TerminalLine[] {
  const left = [
    '      /\\\\      ',
    '     /  \\\\     ',
    '    / /\\ \\\\    ',
    '   / ____ \\\\   ',
    '  /_/    \\_\\  ',
    '     [##]      ',
    '      ||       ',
    '     /__\\      ',
  ];

  const rightLabels = [
    `${profileData.name.toLowerCase().replace(/\s+/g, '')}@portfolio`,
    'OS',
    'Host',
    'Kernel',
    'Shell',
    'Resolution',
    'Terminal',
    'CPU',
    'Memory',
    'Uptime',
  ];

  const rightValues = [
    '',
    'Web Portfolio (Security Theme)',
    profileData.structure.location,
    profileData.structure.role,
    'prince-terminal',
    `${context.viewportWidth}x${context.viewportHeight}`,
    'interactive-terminal',
    profileData.title,
    profileData.structure.status,
    'Always learning',
  ];

  const rightRows: Array<TerminalLine | null> = [
    { segments: [seg(rightLabels[0], 'cyan')] },
  ];

  for (let i = 1; i < rightLabels.length; i += 1) {
    rightRows.push({
      segments: [
        seg(`${rightLabels[i]}: `, 'cyan'),
        seg(rightValues[i], 'primary'),
      ],
    });
  }

  const rows: TerminalLine[] = [];
  const totalRows = Math.max(left.length, rightRows.length);

  for (let i = 0; i < totalRows; i += 1) {
    const leftText = left[i] ?? ''.padEnd(left[0].length, ' ');
    const rightLine = rightRows[i];

    if (!rightLine) {
      rows.push({
        segments: [
          seg(leftText, 'purple'),
        ],
        pre: true,
      });
      continue;
    }

    const spacer = '   ';
    rows.push({
      segments: [
        seg(leftText, 'purple'),
        seg(spacer, 'primary'),
        ...rightLine.segments,
      ],
      pre: true,
    });
  }

  return rows;
}

function bannerCommandLines(): TerminalLine[] {
  return [
    line(' ____  ____  ___ _   _  ____ _____   _  ___   _ __  __    _    ____  ', 'cyan', { pre: true }),
    line('|  _ \\|  _ \\|_ _| \\ | |/ ___| ____| | |/ / | | |  \\/  |  / \\  |  _ \\ ', 'cyan', { pre: true }),
    line('| |_) | |_) || ||  \\| | |   |  _|   | \' /| | | | |\\/| | / _ \\ | |_) |', 'cyan', { pre: true }),
    line('|  __/|  _ < | || |\\  | |___| |___  | . \\| |_| | |  | |/ ___ \\|  _ < ', 'cyan', { pre: true }),
    line('|_|   |_| \\_\\___|_| \\_|\\____|_____| |_|\\_\\\\___/|_|  |_/_/   \\_\\_| \\_\\', 'cyan', { pre: true }),
    line(''),
    line(`Welcome to ${profileData.name}'s terminal`, 'primary'),
    line(profileData.title, 'secondary'),
    line("Type 'help' to see available commands.", 'purple'),
  ];
}

function dateCommandLines(): TerminalLine[] {
  const now = new Date();
  const dayName = now.toLocaleDateString(undefined, { weekday: 'long' });
  const dateLabel = now.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const timeLabel = now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Timezone';

  return [
    line(`Current Date: ${dayName}, ${dateLabel}`, 'primary'),
    line(`Current Time: ${timeLabel}`, 'primary'),
    line(`Timezone: ${timezone}`, 'secondary'),
  ];
}

const commands: CommandDefinition[] = [
  {
    name: 'help',
    description: 'Show all available commands',
    execute: () => ({ lines: makeHelpLines(commands) }),
  },
  {
    name: 'whoami',
    description: 'Display identity and role summary',
    execute: () => ({
      lines: [
        line(profileData.name, 'primary'),
        line(profileData.title, 'primary'),
        line(profileData.tagline, 'secondary'),
        line(`Location: ${profileData.structure.location}`, 'primary'),
        line(`Status: ${profileData.structure.status}`, 'primary'),
        line(`Focus: ${getPrimaryFocusAreas()}`, 'primary'),
      ],
    }),
  },
  {
    name: 'scan',
    description: 'Run a vulnerability scan on this portfolio',
    execute: () => ({
      lines: getVulnerabilityScanTerminalLines(),
    }),
  },
  {
    name: 'ctf',
    description: 'Multi-level CTF challenge system (4 flags hidden)',
    execute: (_context, input) => handleCtfCommand(input.args),
  },
  {
    name: 'decrypt',
    description: 'Decrypt an intercepted message',
    execute: () => ({
      lines: getDecryptTerminalLines(),
    }),
  },
  {
    name: 'about',
    description: 'Read a detailed personal overview',
    execute: () => ({
      lines: [
        line(aboutContentData.paragraphs[0] ?? profileData.bio, 'secondary'),
        line(aboutContentData.paragraphs[1] ?? '', 'secondary'),
        line(aboutContentData.paragraphs[2] ?? '', 'secondary'),
        line(''),
        line(`Current focus: ${getPrimaryFocusAreas()}`, 'primary'),
      ],
    }),
  },
  {
    name: 'skills',
    description: 'Explore tools, platforms, and capabilities',
    execute: () => ({
      lines: [
        ...skillsData.flatMap((group, index) => {
          const block: TerminalLine[] = [
            line(`[*] ${group.title}`, 'cyan'),
            line(group.items.join(', '), 'primary'),
          ];

          if (index < skillsData.length - 1) {
            block.push(line('----------------------------------------', 'muted', { pre: true }));
          }

          return block;
        }),
      ],
    }),
  },
  {
    name: 'projects',
    description: 'Show featured security projects',
    execute: () => ({
      lines: projectsData.flatMap((project, index) => {
        const block: TerminalLine[] = [
          line(`Project ${index + 1}: ${project.title}`, 'cyan'),
          line(project.subtitle, 'purple'),
          line(project.description, 'primary'),
          ...project.features.slice(0, 4).map((feature) => line(`- ${feature}`, 'primary')),
        ];

        if (project.link) {
          block.push(line(`Link: ${project.link}`, 'secondary'));
        }

        block.push(line(''));
        return block;
      }),
    }),
  },
  {
    name: 'contact',
    description: 'Display contact channels',
    execute: () => ({
      lines: [
        {
          segments: [seg('Email: ', 'cyan'), seg(dynamicContact.email, 'primary')],
        },
        {
          segments: [seg('LinkedIn: ', 'cyan'), seg(dynamicContact.linkedin, 'primary')],
        },
        {
          segments: [seg('GitHub: ', 'cyan'), seg(dynamicContact.github, 'primary')],
        },
        line('Feel free to reach out for collaboration, opportunities, or just to connect!', 'secondary'),
      ],
    }),
  },
  {
    name: 'experience',
    description: 'Show current practical experience',
    execute: () => ({
      lines: [
        line('Current practical experience snapshot:', 'primary'),
        line(''),
        line('- Hands-on labs on TryHackMe and Hack The Box', 'primary'),
        line('- Security project building and workflow automation', 'primary'),
        line('- CTF-style challenge solving and write-up practice', 'primary'),
        line('- Internship-backed exposure to risk and threat awareness', 'primary'),
        line(`Highlighted tools: ${getHighlightedSkills()}`, 'secondary'),
      ],
    }),
  },
  {
    name: 'education',
    description: 'Display education and learning path',
    execute: () => ({
      lines: [
        { segments: [seg('Degree: ', 'cyan'), seg(educationContentData.degree, 'primary')] },
        { segments: [seg('Status: ', 'cyan'), seg(educationContentData.status, 'primary')] },
        { segments: [seg('Institution: ', 'cyan'), seg(educationContentData.institution, 'primary')] },
        { segments: [seg('Academic Snapshot: ', 'cyan'), seg(educationContentData.focusAreas, 'primary')] },
        { segments: [seg('Learning Platforms: ', 'cyan'), seg('TryHackMe, Hack The Box, PortSwigger', 'primary')] },
        { segments: [seg('Philosophy: ', 'cyan'), seg('Continuous learning through hands-on practice and real-world application', 'primary')] },
      ],
    }),
  },
  {
    name: 'socials',
    description: 'Show social profiles in styled format',
    execute: () => ({
      lines: [
        { segments: [seg('GitHub: ', 'cyan'), seg(dynamicContact.github, 'primary')] },
        { segments: [seg('LinkedIn: ', 'cyan'), seg(dynamicContact.linkedin, 'primary')] },
        { segments: [seg('Email: ', 'cyan'), seg(dynamicContact.email, 'primary')] },
      ],
    }),
  },
  {
    name: 'neofetch',
    description: 'Display neofetch-style system summary',
    execute: (context) => ({ lines: neofetchLines(context) }),
  },
  {
    name: 'clear',
    description: 'Clear terminal output',
    execute: () => ({ clear: true }),
  },
  {
    name: 'banner',
    description: 'Re-display banner and welcome lines',
    execute: () => ({ lines: bannerCommandLines() }),
  },
  {
    name: 'date',
    description: 'Show current date, time, and timezone',
    execute: () => ({ lines: dateCommandLines() }),
  },
  {
    name: 'matrix',
    description: 'Run a short matrix rain effect',
    execute: () => ({
      matrix: true,
      lines: [line('Matrix stream initiated...', 'prompt')],
    }),
  },
  {
    name: 'secret',
    description: 'Hidden command for curious minds',
    execute: () => ({
      lines: [
        line('You found the secret command! \\uD83D\\uDD0D', 'cyan'),
        line('True investigators always dig deeper.', 'secondary'),
        line('Prince Kumar - Curious. Relentless. Security-Focused.', 'purple'),
      ],
    }),
  },
];

const commandMap = new Map(commands.map((item) => [item.name, item]));

export function getCommandNames(): string[] {
  return commands.map((item) => item.name);
}

export function getCommandMatches(input: string): string[] {
  const normalized = input.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return getCommandNames().filter((name) => name.startsWith(normalized));
}

export function executeCommand(rawInput: string, context: CommandContext): CommandExecutionResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { lines: [] };
  }

  const parts = trimmed.split(/\s+/);
  const base = (parts[0] ?? '').toLowerCase();
  const args = parts.slice(1);

  const input: CommandInput = {
    raw: trimmed,
    base,
    args,
  };

  const command = commandMap.get(base);
  if (command) {
    window.dispatchEvent(new CustomEvent('analytics:terminal_command', { detail: { command: base } }));
    return command.execute(context, input);
  }

  return {
    lines: [
      {
        segments: [
          seg(`bash: ${base}: command not found`, 'error'),
        ],
      },
      {
        segments: [
          seg("Type 'help' to see available commands.", 'error'),
        ],
      },
    ],
  };
}
