/* ──────────────────────────────────────
   ALAN VOURC'H PORTFOLIO, main.js
   ────────────────────────────────────── */

// ── NAV scroll shadow ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Category labels ──
const categoryLabel = { finance: 'Finance & FP&A', data: 'Data & Analytics', film: 'Film & Entertainment' };
const categoryClass  = { finance: 'badge-finance',   data: 'badge-data',       film: 'badge-film' };

// ── Render project cards ──
function renderCards(filter) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  const list = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', p.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View details: ' + p.title);

    const skillTagsPreview = p.skills.slice(0, 3).map(s =>
      `<span class="project-skill-tag">${s}</span>`
    ).join('');

    card.innerHTML = `
      <div class="project-thumb">
        <img class="img-default" src="${p.thumb}" alt="${p.title}" loading="lazy" />
        <img class="img-hover" src="${p.hover}" alt="${p.title} detail" loading="lazy" />
        <span class="project-category-badge ${categoryClass[p.category]}">${categoryLabel[p.category]}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.shortDesc}</p>
      </div>
      <div class="project-footer">
        <div class="project-skills">${skillTagsPreview}</div>
        <span class="project-more-btn">Details</span>
      </div>
    `;

    card.addEventListener('click', () => openModal(p));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(p); });

    grid.appendChild(card);
  });
}

// ── Tabs ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderCards(tab.dataset.filter);
  });
});

// ── Modal ──
const overlay   = document.getElementById('modalOverlay');
const modalInner = document.getElementById('modalInner');
const modalClose = document.getElementById('modalClose');

function openModal(p) {
  const highlightItems = p.highlights
    ? p.highlights.map(h => `<li>${h}</li>`).join('')
    : '';

  const skillTags = p.skills.map(s => `<span class="modal-skill-tag">${s}</span>`).join('');

  modalInner.innerHTML = `
    <img class="modal-image" src="${p.hover}" alt="${p.title}" />
    <div class="modal-body">
      <p class="modal-eyebrow">${categoryLabel[p.category]}</p>
      <h2 class="modal-title">${p.title}</h2>
      <p class="modal-description">${p.fullDesc}</p>
      ${highlightItems ? `
      <div class="modal-highlights">
        <h4>Key highlights</h4>
        <ul>${highlightItems}</ul>
      </div>` : ''}
      <div class="modal-skills">${skillTags}</div>
      <a href="${p.link}" target="_blank" rel="noopener" class="modal-cta">${p.linkLabel}</a>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Init ──
renderCards('all');

// Film & Entertainment tab note
(function() {
  const filmNote = document.getElementById('film-note');
  if (!filmNote) return;
  function updateFilmNote() {
    const activeTab = document.querySelector('.tab.active');
    const show = activeTab && (activeTab.dataset.filter === 'film' || activeTab.dataset.filter === 'all');
    filmNote.style.display = show ? 'block' : 'none';
  }
  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', updateFilmNote));
  updateFilmNote();
})();

// Mobile card tap-to-flip
(function() {
  function isTouchDevice() { return ('ontouchstart' in window) || navigator.maxTouchPoints > 0; }
  if (!isTouchDevice()) return;
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') return;
      card.classList.toggle('flipped');
    });
  });
})();
