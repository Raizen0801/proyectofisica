// Editor de la distribución de cargas compartida (tabla + presets).
import { h, group, button } from './dom.js';
import { store, PRESETS } from '../store.js';

/**
 * @param opts { get2d: () => boolean } cuando devuelve true, la columna z se desactiva (vista 2D).
 * @returns { el, refresh, destroy }
 */
export function chargeTable({ get2d = () => false } = {}) {
  const tbody = h('tbody');
  const presetSel = h('select', {}, h('option', { value: '' }, 'Cargar configuración…'), Object.entries(PRESETS).map(([k, v]) => h('option', { value: k }, v.nombre)));
  presetSel.addEventListener('input', () => {
    const p = PRESETS[presetSel.value];
    if (p) store.set(p.cargas.map(([q, x, y, z]) => ({ q, x, y, z })));
    presetSel.value = '';
  });
  const addBtn = button('+ Añadir carga', () => {
    const n = store.charges.length;
    const ang = n * 2.4;
    store.add({ q: n % 2 ? -1 : 1, x: +(2.5 * Math.cos(ang)).toFixed(2), y: +(2.5 * Math.sin(ang)).toFixed(2), z: 0 });
  }, 'small');
  const count = h('span', { class: 'note' });

  const cell = (c, key, step, min, max, disabled) => {
    const inp = h('input', { type: 'number', value: c[key], step, min, max, disabled });
    inp.addEventListener('input', () => { const v = parseFloat(inp.value); if (isFinite(v)) store.update(c.id, { [key]: v }, 'change'); });
    inp.addEventListener('change', () => store.emit('commit'));
    return h('td', {}, inp);
  };

  function refresh() {
    tbody.replaceChildren(...store.charges.map((c, i) => h('tr', {},
      h('td', {}, h('span', { class: 'dot', style: { background: c.q >= 0 ? '#ff5c5c' : '#4f9dff' } }), ` ${i + 1}`),
      cell(c, 'q', 0.1, -50, 50),
      cell(c, 'x', 0.1, -6, 6),
      cell(c, 'y', 0.1, -6, 6),
      cell(c, 'z', 0.1, -6, 6, get2d()),
      h('td', {}, h('button', { class: 'btn small danger', title: 'Eliminar', onclick: () => store.remove(c.id) }, '✕')),
    )));
    count.textContent = `${store.charges.length}/${store.MAX_CHARGES} cargas`;
    addBtn.disabled = store.charges.length >= store.MAX_CHARGES;
  }

  const unsub = store.subscribe((kind) => { if (kind === 'structure') refresh(); else syncValues(); });
  // actualización ligera de los valores cuando se arrastra una carga con el ratón
  function syncValues() {
    const rows = tbody.querySelectorAll('tr');
    store.charges.forEach((c, i) => {
      const inputs = rows[i]?.querySelectorAll('input');
      if (!inputs) return;
      const vals = [c.q, c.x, c.y, c.z];
      inputs.forEach((inp, k) => { if (document.activeElement !== inp) inp.value = +vals[k].toFixed(3); });
    });
  }

  const el = group('Cargas puntuales',
    h('div', { class: 'row' }, h('div', { class: 'grow' }, presetSel), addBtn),
    h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, ['#', 'q (nC)', 'x (m)', 'y (m)', 'z (m)', ''].map((t) => h('th', {}, t)))), tbody),
    count,
  );
  refresh();
  return { el, refresh, destroy: unsub };
}
