export default function SectionContainer(id: string, content: string, extraClasses = ''): string {
  const classes = ['section-container', extraClasses].filter(Boolean).join(' ');

  return `
    <section id="${id}" class="${classes}">
      <div class="max-w-7xl mx-auto">
        ${content}
      </div>
    </section>
  `;
}
