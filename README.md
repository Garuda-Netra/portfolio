# Cybersecurity Portfolio

This is my personal cybersecurity portfolio website.
I built it to share my work, learning journey, and projects in a simple and professional way.
The project is frontend-only, so it is easy to run and maintain.

## Overview

You will find:

- A short introduction and profile section
- Skills, projects, training, and certifications
- Blog posts and achievements
- A contact form
- Interactive security-themed UI elements

## Tech Stack

- TypeScript
- Vite
- Tailwind CSS
- Vanilla JavaScript/DOM utilities

## Quick Start

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Scripts

- `npm run dev`: Starts the local development server
- `npm run build`: Runs type checks and creates the production build
- `npm run preview`: Previews the production build locally

## Update Portfolio Content

Edit these files to update content:

- `src/data/profile.ts`
- `src/data/skills.ts`
- `src/data/projects.ts`
- `src/data/blog.ts`
- `src/data/certificates.ts`
- `src/data/localSettings.ts`

## Contact Form Setup

This project uses Formspree to send contact form messages.

Update the endpoint in `src/data/localSettings.ts`:

```ts
contactForm: {
  provider: 'formspree',
  endpoint: 'https://formspree.io/f/your_form_id',
  successMessage: 'Message sent successfully! I will get back to you soon.',
  failureMessage: 'Failed to send message. Please try again.'
}
```

## Static Files

Keep static uploads in:

- `public/uploads/profile/`
- `public/uploads/resume/`

## Notes

- This project does not need a backend server.
- Production build files are generated in `dist/`.
