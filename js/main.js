const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const tabs = Array.from(document.querySelectorAll('.tab'));
const grid = document.getElementById('projectsGrid');
const panel = document.getElementById('projectsPanel');
const dialog = document.getElementById('projectDialog');
const modalInner = document.getElementById('modalInner');
const modalClose = document.getElementById('modalClose');
const categoryLabel = { finance: 'Finance & FP&A', data: 'Data & Analytics', film: 'Personal projects' };
let modalTrigger = null;

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });
navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.querySelector('.nav-logo').addEventListener('click', () => setMenu(false));
document.addEventListener('click', event => {
  if (!nav.contains(event.target)) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    navToggle.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

function resourceLinks(project, className) {
  return (project.resources || []).map(resource =>
    `<a class="${className}" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener">${escapeHtml(resource.label)}</a>`
  ).join('');
}

function projectVisual(project) {
  if (project.preview) {
    return `<div class="project-preview">
      <p class="preview-eyebrow">${escapeHtml(project.preview.eyebrow)}</p>
      <div class="preview-chart"><img src="${escapeHtml(project.id === 'fpa-agent-team' ? 'images/projects/fpa-close-bridge.png' : 'images/projects/fpa-planning-runway.svg')}" alt="${escapeHtml(project.id === 'fpa-agent-team' ? 'FY2025 operating result bridge from budget to provisional result, with an explicit zero baseline' : 'Minimum downside runway by hiring and cloud option, compared with the 18-month floor')}" loading="lazy" width="1680" height="960" /></div>
      <p class="preview-headline">${escapeHtml(project.preview.headline)}</p>
      <div class="preview-metrics">${project.preview.metrics.map(metric =>
        `<div><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span></div>`
      ).join('')}</div>
      <p class="preview-note">${escapeHtml(project.preview.note)}</p>
    </div>`;
  }
  return `<div class="project-thumb"><img src="${escapeHtml(project.thumb)}" alt="" loading="lazy" width="600" height="320" /></div>`;
}

function renderCards(filter) {
  const list = projects.filter(project => !project.archived && !project.bundledInto && (filter === 'all' || project.category === filter));
  grid.replaceChildren();
  list.forEach(project => {
    const card = document.createElement('article');
    const titleId = `project-${project.id}`;
    card.className = `project-card${project.featured ? ' featured' : ''}`;
    card.dataset.id = project.id;
    card.setAttribute('aria-labelledby', titleId);
    card.innerHTML = `
      <a class="project-visual-link" href="${escapeHtml(project.link)}" tabindex="-1"${project.preview ? '' : ` aria-label="Open ${escapeHtml(project.title)}"`}${project.featured ? '' : ' target="_blank" rel="noopener"'}>${projectVisual(project)}</a>
      <div class="project-body">
        <p class="project-type">${escapeHtml(project.type)}</p>
        <h3 class="project-title" id="${titleId}"><a href="${escapeHtml(project.link)}"${project.featured ? '' : ' target="_blank" rel="noopener"'}>${escapeHtml(project.title)}</a></h3>
        <p class="project-desc">${escapeHtml(project.shortDesc)}</p>
        <ul class="project-skills" aria-label="Skills">${project.skills.slice(0, 3).map(skill => `<li class="project-skill-tag">${escapeHtml(skill)}</li>`).join('')}</ul>
      </div>
      <div class="project-footer">
        <a class="project-open" href="${escapeHtml(project.link)}"${project.featured ? '' : ' target="_blank" rel="noopener"'}>${escapeHtml(project.linkLabel)}<span aria-hidden="true"> ↗</span></a>
        ${project.featured ? '' : `<button class="project-details" type="button" aria-haspopup="dialog" aria-label="About ${escapeHtml(project.title)}">About this project</button>`}
        ${project.resources && project.resources.length ? `<div class="project-resources">${resourceLinks(project, 'resource-link')}</div>` : ''}
      </div>`;
    const details = card.querySelector('.project-details');
    if (details) details.addEventListener('click', () => openModal(project, details));
    grid.appendChild(card);
  });
  const countLabel = { finance: 'finance projects', data: 'analytics projects', film: 'personal projects', all: 'projects' };
  document.getElementById('projectCount').textContent = `${list.length} selected ${countLabel[filter]}`;
}

function activateTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tab.id);
  renderCards(tab.dataset.filter);
  if (focus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    activateTab(tabs[next], true);
  });
});

function openModal(project, trigger) {
  modalTrigger = trigger;
  modalInner.innerHTML = `<div class="modal-body">
    <p class="project-type">${escapeHtml(project.type)}</p>
    <h2 class="modal-title" id="modalTitle">${escapeHtml(project.title)}</h2>
    <a href="${escapeHtml(project.link)}" target="_blank" rel="noopener" class="modal-cta">${escapeHtml(project.linkLabel)}<span aria-hidden="true"> ↗</span></a>
    <p class="modal-description">${escapeHtml(project.fullDesc)}</p>
    <ul class="modal-highlights">${project.highlights.map(highlight => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul>
    ${project.resources && project.resources.length ? `<div class="modal-resources">${resourceLinks(project, 'resource-link')}</div>` : ''}
  </div>`;
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialog.scrollTop = 0;
  modalClose.focus();
}

modalClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = Array.from(dialog.querySelectorAll('button:not([disabled]), a[href]'));
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (modalTrigger && modalTrigger.isConnected) modalTrigger.focus();
});

const archiveList = document.getElementById('archiveList');
projects.filter(project => project.archived).forEach(project => {
  const item = document.createElement('li');
  item.className = 'archive-card';
  item.innerHTML = `<button class="archive-open" type="button" aria-haspopup="dialog" aria-label="${escapeHtml(project.title)}">
    <span class="archive-thumb"><img src="${escapeHtml(project.thumb)}" alt="" loading="lazy" width="600" height="320" /></span>
    <span class="archive-body"><span class="archive-category">${escapeHtml(categoryLabel[project.category])}</span><span class="archive-title">${escapeHtml(project.title)}</span><span class="archive-desc">${escapeHtml(project.shortDesc)}</span><span class="archive-cta">Explore the project <span aria-hidden="true">↗</span></span></span>
  </button>`;
  const trigger = item.querySelector('button');
  trigger.addEventListener('click', () => openModal(project, trigger));
  archiveList.appendChild(item);
});

renderCards('finance');
