export type BlogPostData = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: number;
  createdDate: string;
  thumbnailUrl?: string;
  featured?: boolean;
};

export const blogPostsData: BlogPostData[] = [
  {
    _id: 'blog-ctf-web-hunt',
    title: 'How I Approach Web CTF Challenges',
    slug: 'how-i-approach-web-ctf-challenges',
    category: 'CTF',
    excerpt: 'A practical workflow for solving web exploitation challenges with speed and consistency.',
    content: `# How I Approach Web CTF Challenges\n\n## Phase 1: Rapid Mapping\n- Identify entry points\n- Fingerprint framework behavior\n- Collect all request patterns\n\n## Phase 2: Attack Surface Expansion\n- Test auth bypass paths\n- Validate input handling and encoding\n- Probe hidden parameters and debug endpoints\n\n## Phase 3: Payload Precision\nI use narrow, hypothesis-driven payloads to avoid noise and reduce false assumptions.\n\n## Takeaway\nThe fastest path is not random fuzzing. It is structured observation + deliberate testing.`,
    readTime: 5,
    createdDate: '2026-02-18',
    featured: true
  },
  {
    _id: 'blog-forensics-timeline',
    title: 'Timeline Thinking in Digital Forensics',
    slug: 'timeline-thinking-in-digital-forensics',
    category: 'Forensics',
    excerpt: 'Why timeline-first analysis helps reduce blind spots during incident investigations.',
    content: `# Timeline Thinking in Digital Forensics\n\nA timeline is often the highest-signal artifact in an investigation.\n\n## Why It Works\n- It converts noisy evidence into sequence\n- It highlights impossible or suspicious transitions\n- It supports defensible reporting\n\n## Practical Advice\nStart broad, then zoom into suspicious windows with correlated logs and file system events.`,
    readTime: 4,
    createdDate: '2026-03-04',
    featured: true
  }
];
