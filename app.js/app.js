const links = [...document.querySelectorAll('[data-tab]')];
const pages = [...document.querySelectorAll('.page')];
const mobileMenu = document.querySelector('.mobile-menu');
const menuButton = document.querySelector('.menu-button');

function activateTab(id, focus = false) {
  const target = document.getElementById(id);
  if (!target) return;
  pages.forEach((page) => {
    const selected = page.id === id;
    page.hidden = !selected;
    page.classList.toggle('active', selected);
  });
  links.forEach((link) => {
    const selected = link.dataset.tab === id;
    link.classList.toggle('active', selected);
    link.setAttribute('aria-current', selected ? 'page' : 'false');
  });
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
  window.history.replaceState(null, '', `#${id}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (focus) target.querySelector('h2')?.focus({ preventScroll: true });
}

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateTab(link.dataset.tab, true);
  });
});

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

window.addEventListener('keydown', (event) => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key) || !document.activeElement.matches('.tab-link')) return;
  event.preventDefault();
  const current = links.indexOf(document.activeElement);
  const next = event.key === 'ArrowDown' ? (current + 1) % links.length : (current - 1 + links.length) % links.length;
  links[next].focus();
});

const initial = window.location.hash.slice(1);
if (initial && document.getElementById(initial)) activateTab(initial);
