# Cybersecurity Portfolio

This is my personal cybersecurity portfolio.
I built it to showcase my journey in cybersecurity, including projects, certifications, hands-on practice, and the kind of work I enjoy building.

The site is frontend-only, fast to run, and easy to maintain.

## What You Will Find

- Hero and profile introduction
- Skills, projects, internships, training, and certifications
- Blog highlights and achievements
- Contact section with social links
- Security-themed interactions (including a built-in CTF flow)

## Tech Stack

- TypeScript
- Vite
- Tailwind CSS
- Vanilla JavaScript DOM utilities

## Quick Start

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` runs type checks and builds production assets
- `npm run preview` serves the built output for local verification

## Content Files

Update portfolio content from these files:

- `src/data/profile.ts`
- `src/data/skills.ts`
- `src/data/projects.ts`
- `src/data/blog.ts`
- `src/data/certificates.ts`
- `src/data/localSettings.ts`

## Contact Form Setup

The contact form is configured with Formspree.

Set your endpoint in `src/data/localSettings.ts`:

```ts
contactForm: {
  provider: 'formspree',
  endpoint: 'https://formspree.io/f/your_form_id',
  successMessage: 'Message sent successfully! I will get back to you soon.',
  failureMessage: 'Failed to send message. Please try again.'
}
```

## CTF Flags (Exact)

These are the exact CTF flags currently used in the portfolio challenge:

- `FLAG{prince_security_breach_2026}`
- `FLAG{console_hacker_2026}`
- `FLAG{hidden_in_the_shadows_2026}`
- `FLAG{base64_master_2026}`

## Static Upload Paths

- `public/uploads/profile/`
- `public/uploads/resume/`

## Notes

- No backend server is required.
- Production files are generated in `dist/`.
