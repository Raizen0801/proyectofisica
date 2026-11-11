// Punto de entrada: navegación entre módulos por unidades.
import { h } from './ui/dom.js';
import cargas from './modules/cargas.js';
import potencial from './modules/potencial.js';
import trayectoria from './modules/trayectoria.js';
import capacitor from './modules/capacitor.js';
import energia from './modules/energia.js';
import circuitos from './modules/circuitos.js';
import ohm from './modules/ohm.js';
import magnetico from './modules/magnetico.js';
import lorentz from './modules/lorentz.js';
import ayuda from './modules/ayuda.js';

const MODULES = [cargas, potencial, trayectoria, capacitor, energia, circuitos, ohm, magnetico, lorentz];
const UNITS = {
  1: 'Unidad 1 · Electricidad, campo y potencial',
  2: 'Unidad 2 · Capacitores y dieléctricos',
  3: 'Unidad 3 · Corriente eléctrica y ley de Ohm',
  4: 'Unidad 4 · Fuerza y campo magnético',
};

const nav = document.getElementById('nav');
const app = document.getElementById('app');
let current = null;

const groups = {}; // unidad -> grupo desplegable del menú

function buildNav() {
  nav.replaceChildren();
  for (const u of Object.keys(UNITS)) {
    const mods = MODULES.filter((m) => String(m.unidad) === u);
    const head = h('button', { type: 'button', class: 'nav-unit', 'aria-expanded': 'false' },
      h('span', {}, UNITS[u]), h('span', { class: 'count' }, String(mods.length)), h('span', { class: 'chev' }, '▶'));
    const items = h('div', { class: 'nav-items' }, mods.map((m) => h('a', { href: `#${m.id}`, 'data-id': m.id },
      h('span', { class: 'ico' }, m.icono),
      h('span', {}, m.titulo, h('small', {}, m.corto)))));
    const g = h('div', { class: 'nav-group' }, head, items);
    head.addEventListener('click', () => {
      const open = !g.classList.contains('open');
      g.classList.toggle('open', open);
      head.setAttribute('aria-expanded', String(open));
    });
    groups[u] = g;
    nav.append(g);
  }
}

function openGroup(unit) {
  const g = groups[String(unit)];
  if (!g) return;
  g.classList.add('open');
  g.querySelector('.nav-unit').setAttribute('aria-expanded', 'true');
}

function route() {
  const id = (location.hash || '#cargas').slice(1);
  const mod = id === 'ayuda' ? ayuda : MODULES.find((m) => m.id === id) || MODULES[0];
  if (current?.destroy) { try { current.destroy(); } catch (e) { console.error(e); } }
  current = null;
  app.replaceChildren();
  try {
    current = mod.mount(app);
  } catch (e) {
    console.error(e);
    app.replaceChildren(h('div', { class: 'help-page' }, h('h2', {}, 'No se pudo cargar el módulo'), h('p', {}, String(e && e.message ? e.message : e))));
  }
  nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.dataset.id === mod.id));
  if (mod.unidad) openGroup(mod.unidad); // despliega la unidad del módulo activo
  nav.classList.remove('open');
  document.title = `${mod.titulo} · Simulador de Campos E/M`;
}

document.getElementById('menuBtn').addEventListener('click', () => nav.classList.toggle('open'));
window.addEventListener('hashchange', route);
buildNav();
route();
