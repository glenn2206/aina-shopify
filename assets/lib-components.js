/* ==========================================================================
   ANIA Component Library — behaviors (dev/reference only)
   Vanilla JS, no dependencies. Setiap komponen di-init lewat data-attribute
   supaya bisa dipakai berkali-kali di halaman yang sama.
   Hanya dimuat di sections/main-components-showcase.liquid.
   ========================================================================== */

// --- Tabs ---
function initTabs(root) {
  const tabs = Array.from(root.querySelectorAll('[data-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
  if (!tabs.length) return;

  const activate = (name) => {
    tabs.forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.tab === name)));
    panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.tabPanel === name));
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab.dataset.tab)));
}

// --- Testimonial / horizontal scroll carousel ---
function initScrollRow(root) {
  const track = root.querySelector('[data-scroll-track]');
  const prev = root.querySelector('[data-scroll-prev]');
  const next = root.querySelector('[data-scroll-next]');
  if (!track) return;

  const step = () => (track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 300);
  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

// --- Hero slider ---
function initHero(root) {
  const track = root.querySelector('[data-hero-track]');
  const slides = Array.from(root.querySelectorAll('[data-hero-slide]'));
  const bars = Array.from(root.querySelectorAll('[data-progress]'));
  const fills = bars.map((bar) => bar.querySelector('[data-progress-fill]'));
  const prevBtn = root.querySelector('[data-hero-prev]');
  const nextBtn = root.querySelector('[data-hero-next]');
  if (!track || slides.length < 2) return;

  const DURATION = 5000;
  let current = 0;
  let timer = null;

  const setProgress = (idx) => {
    fills.forEach((fill, i) => {
      if (!fill) return;
      fill.style.transition = 'none';
      fill.style.width = i < idx ? '100%' : '0%';
    });
    const fill = fills[idx];
    if (!fill) return;
    void fill.offsetWidth;
    fill.style.transition = `width ${DURATION}ms linear`;
    fill.style.width = '100%';
  };

  const goTo = (idx) => {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    setProgress(current);
    clearTimeout(timer);
    timer = setTimeout(() => goTo(current + 1), DURATION);
  };

  bars.forEach((bar, i) => bar.addEventListener('click', () => goTo(i)));
  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  goTo(0);
}

// --- Filter sidebar accordion ---
function initFilterSidebar(root) {
  const groups = Array.from(root.querySelectorAll('[data-filter-group]'));
  groups.forEach((group) => {
    const toggle = group.querySelector('[data-filter-toggle]');
    toggle?.addEventListener('click', () => {
      group.classList.toggle('is-open');
    });
  });
}

// --- FAQ accordion ---
function initFaq(root) {
  const items = Array.from(root.querySelectorAll('[data-faq-item]'));
  items.forEach((item) => {
    const toggle = item.querySelector('[data-faq-toggle]');
    toggle?.addEventListener('click', () => item.classList.toggle('is-open'));
  });
}

// --- Navbar mega-menu (mis. "Shop") ---
// Trigger & panel TIDAK harus nested (panel full-width, sibling dari <nav>).
// Trigger dihubungkan ke panel lewat data-dropdown-target="<id panel>".
function initNavDropdown(root) {
  const triggers = Array.from(root.querySelectorAll('[data-dropdown-trigger]'));
  if (!triggers.length) return;

  const panelOf = (trigger) => document.getElementById(trigger.dataset.dropdownTarget);

  const closeAll = () => {
    triggers.forEach((trigger) => {
      const panel = panelOf(trigger);
      if (panel) panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    });
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = panelOf(trigger);
      if (!panel) return;
      const wasOpen = !panel.hidden;
      closeAll();
      if (!wasOpen) {
        panel.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    panelOf(trigger)?.addEventListener('click', (e) => e.stopPropagation());
  });

  document.addEventListener('click', closeAll);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}

// --- Search overlay (buka/tutup + live filter kartu berdasarkan data-tags) ---
function initSearchOverlay(root) {
  const trigger = root.querySelector('[data-search-trigger]');
  const panel = root.querySelector('[data-search-panel]');
  const closeBtn = root.querySelector('[data-search-close]');
  const input = root.querySelector('[data-search-input]');
  const results = root.querySelector('[data-search-results]');
  const countEl = root.querySelector('[data-search-count]');
  const grid = root.querySelector('[data-search-grid]');
  const emptyEl = root.querySelector('[data-search-empty]');
  if (!trigger || !panel) return;

  const cards = grid ? Array.from(grid.children) : [];

  const filter = (query) => {
    const q = query.trim().toLowerCase();
    if (results) results.hidden = q === '';
    if (q === '') return;

    let visible = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').toLowerCase();
      const match = tags.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible += 1;
    });
    if (countEl) countEl.textContent = `${visible} RESULT${visible === 1 ? '' : 'S'}`;
    if (grid) grid.hidden = visible === 0;
    if (emptyEl) emptyEl.hidden = visible !== 0;
  };

  const open = () => {
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    input?.focus();
  };
  const close = () => {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (input) input.value = '';
    filter('');
  };

  trigger.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeBtn?.addEventListener('click', close);
  input?.addEventListener('input', (e) => filter(e.target.value));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
}

// --- Mobile nav toggle ---
function initNavToggle(root) {
  const toggle = root.querySelector('[data-nav-toggle]');
  const menu = root.querySelector('[data-nav-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.dataset.open = String(open);
  });
}

// --- Auto-init everything on the page ---
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-component="tabs"]').forEach(initTabs);
  document.querySelectorAll('[data-component="scroll-row"]').forEach(initScrollRow);
  document.querySelectorAll('[data-component="hero"]').forEach(initHero);
  document.querySelectorAll('[data-component="navbar"]').forEach(initNavToggle);
  document.querySelectorAll('[data-component="navbar"]').forEach(initNavDropdown);
  document.querySelectorAll('[data-component="navbar"]').forEach(initSearchOverlay);
  document.querySelectorAll('[data-component="filter-sidebar"]').forEach(initFilterSidebar);
  document.querySelectorAll('[data-component="faq"]').forEach(initFaq);
});
