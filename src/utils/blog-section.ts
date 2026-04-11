import { blogPostsData, type BlogPostData } from '../data/blog';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatInlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

function parseMarkdown(text: string, postTitle: string): string {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const normalizedTitle = postTitle.trim().toLowerCase();
  const blocks: string[] = [];
  let listItems: string[] = [];

  const flushList = (): void => {
    if (listItems.length === 0) return;
    blocks.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join('')}</ul>`);
    listItems = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }

    const headingMatch = /^(#{1,3})\s+(.+)$/.exec(line);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();

      // The modal already renders post title as H2, so skip duplicate top heading from markdown.
      if (level === 1 && headingText.toLowerCase() === normalizedTitle) {
        return;
      }

      const tag = level >= 3 ? 'h4' : 'h3';
      blocks.push(`<${tag}>${formatInlineMarkdown(headingText)}</${tag}>`);
      return;
    }

    const listMatch = /^-\s+(.+)$/.exec(line);
    if (listMatch) {
      listItems.push(formatInlineMarkdown(listMatch[1]));
      return;
    }

    flushList();
    blocks.push(`<p>${formatInlineMarkdown(line)}</p>`);
  });

  flushList();
  return blocks.join('');
}

export async function initBlogSection(): Promise<void> {
  const wrap = document.querySelector<HTMLElement>('#portfolio-blog-wrap');
  const grid = document.querySelector<HTMLElement>('#portfolio-blog-grid');
  const modal = document.querySelector<HTMLElement>('#portfolio-blog-modal');
  const modalContent = document.querySelector<HTMLElement>('#portfolio-blog-modal-content');
  const closeBtn = document.querySelector<HTMLButtonElement>('#portfolio-blog-close');
  const section = wrap?.closest<HTMLElement>('section#blog');

  if (!wrap || !grid || !modal || !modalContent || !section) return;

  try {
    const posts: BlogPostData[] = blogPostsData.filter((post) => post.featured !== false);

    if (posts.length === 0) {
      wrap.classList.add('hidden');
      section.classList.add('hidden');
      return;
    }

    section.classList.remove('hidden');
    wrap.classList.remove('hidden');

    grid.innerHTML = posts
      .map((post) => {
        const excerpt = (post.excerpt || '').trim() || post.content.slice(0, 120);
        const trimmedExcerpt = excerpt.length > 120 ? `${excerpt.slice(0, 117)}...` : excerpt;
        return `
        <article class="glass-card portfolio-blog-card reveal" data-reveal="fade-up">
          ${post.thumbnailUrl ? `<img class="portfolio-blog-thumb" src="${escapeHtml(post.thumbnailUrl)}" alt="${escapeHtml(post.title)} thumbnail" loading="lazy" />` : ''}
          <h3 class="portfolio-blog-title">${escapeHtml(post.title)}</h3>
          <span class="portfolio-blog-category">${escapeHtml(post.category || 'Other')}</span>
          <p class="portfolio-blog-excerpt">${escapeHtml(trimmedExcerpt)}</p>
          <p class="portfolio-blog-meta">${post.readTime} min • ${new Date(post.createdDate).toLocaleDateString()}</p>
          <button class="portfolio-blog-readmore" data-blog-id="${post._id}" type="button">Read More</button>
        </article>
      `;
      })
      .join('');

    grid.querySelectorAll<HTMLButtonElement>('[data-blog-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.blogId;
        const post = posts.find((item) => item._id === id);
        if (!post) return;

        modalContent.innerHTML = `
          <h2>${escapeHtml(post.title)}</h2>
          <p class="portfolio-blog-modal-meta">${escapeHtml(post.category || 'Other')} • ${new Date(post.createdDate).toLocaleDateString()} • ${post.readTime} min</p>
          ${post.thumbnailUrl ? `<img class="portfolio-blog-modal-thumb" src="${escapeHtml(post.thumbnailUrl)}" alt="${escapeHtml(post.title)} thumbnail" loading="lazy" />` : ''}
          <article class="portfolio-blog-modal-body">${parseMarkdown(post.content || '', post.title)}</article>
        `;

        modal.classList.remove('hidden');
      });
    });
  } catch {
    wrap.classList.add('hidden');
    section.classList.add('hidden');
  }

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });
}
