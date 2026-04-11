import SectionContainer from '../components/SectionContainer';
import { projectsData } from '../data/projects';

export default function Projects(): string {
  const cards = projectsData
    .map(
      (project, index) => `
        <article class="glass-card project-feature-card reveal project-card-animated" data-reveal="fade-up" data-delay="${index * 120}" data-tilt data-project-index="${index}">
          <div class="project-card-glow" aria-hidden="true"></div>
          <div class="project-feature-grid ${index % 2 === 1 ? 'project-feature-grid-mirror' : ''}">
            <div class="project-content">
              <p class="project-category-badge">${project.category}</p>
              <h3 class="project-title-gradient">${project.title}</h3>
              <p class="project-subtitle">${project.subtitle}</p>
              <p class="project-description">${project.description}</p>
              <ul class="project-feature-list" data-feature-list>
                ${project.features.map((feature, featureIndex) => `<li class="project-feature-item" data-feature-index="${featureIndex}" style="animation-delay: ${featureIndex * 50}ms;">${feature}</li>`).join('')}
              </ul>
              <div class="project-tags" data-project-tags>
                ${project.techStack.map((tech, techIndex) => `<span class="project-tech-tag" data-tech-index="${techIndex}" style="animation-delay: ${techIndex * 40}ms;">${tech}</span>`).join('')}
              </div>
              ${
                project.link
                  ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-view-btn project-view-btn-animated" data-magnetic>
                ${project.linkLabel ?? 'View Project'} <span aria-hidden="true">&rarr;</span>
              </a>`
                  : ''
              }
            </div>

            <div class="project-visual-dashboard project-visual-animated" data-parallax="0.08" aria-hidden="true">
              <div class="project-dash-card dash-terminal">
                <p class="dash-label">threat-model</p>
                <p class="dash-text">Attack Surface -&gt; Priority -&gt; Mitigation</p>
              </div>
              <div class="project-dash-card dash-modules">
                <p class="dash-label">Core Stack</p>
                <p class="dash-text">${project.techStack.slice(0, 4).join(' | ')}</p>
              </div>
              <div class="project-dash-card dash-chat">
                <p class="dash-label">Focus</p>
                <p class="dash-text">${project.category}</p>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  const content = `
    <div class="projects-section-wrap section-divider-top">
      <div class="text-center mb-16 reveal" data-reveal="fade-up">
        <h2 class="section-title" style="color: var(--text-primary);" data-split="chars">Projects</h2>
        <p class="section-subtitle">Real-world tools built for offense, defense, and investigation.</p>
      </div>

      <div id="projects-stack" class="projects-stack">
        ${cards}
      </div>
    </div>
  `;

  return SectionContainer('projects', content);
}