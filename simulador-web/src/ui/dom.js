// Utilidades mínimas para construir la interfaz sin framework.
import { clamp } from './format.js';

export function h(tag, attrs = {}, ...children) {
  const el = tag === 'svg' || attrs.ns === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === 'ns' || v === undefined || v === null || v === false) continue;
    if (k === 'class') el.setAttribute('class', v);
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') el.innerHTML = v;
    else if (k in el && k !== 'list' && !(el instanceof SVGElement)) { try { el[k] = v; } catch { el.setAttribute(k, v); } }
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
}

export const svg = (tag, attrs = {}, ...children) => h(tag, { ...attrs, ns: 'svg' }, ...children);

/** Grupo de controles con título. */
export const group = (title, ...children) => h('section', { class: 'group' }, title ? h('h3', {}, title) : null, ...children);

/**
 * Deslizador con etiqueta y valor. log=true usa escala logarítmica.
 * Devuelve { el, get, set, input }.
 */
export function slider({ label, min, max, step, value, unit = '', log = false, fmt, onInput, digits = 3 }) {
  const out = h('b', {});
  const lo = log ? Math.log10(min) : min;
  const hi = log ? Math.log10(max) : max;
  const input = h('input', { type: 'range', min: lo, max: hi, step: log ? (hi - lo) / 400 : step ?? (hi - lo) / 400 });
  const toVal = (s) => {
    let v = log ? Math.pow(10, parseFloat(s)) : parseFloat(s);
    if (!log && step) v = Math.round(v / step) * step;
    return v;
  };
  const show = (v) => { out.textContent = fmt ? fmt(v) : `${+v.toPrecision(digits)} ${unit}`.trim(); };
  let exact = null; // valor exacto fijado por programa (evita la cuantización del deslizador)
  const api = {
    el: h('div', { class: 'field' }, h('div', { class: 'lbl' }, h('span', {}, label), out), input),
    get: () => (exact !== null ? exact : toVal(input.value)),
    set: (v, silent = true) => {
      v = clamp(v, min, max);
      input.value = log ? Math.log10(v) : v;
      exact = v;
      show(v);
      if (!silent && onInput) onInput(v);
    },
    input,
    setEnabled: (on) => { input.disabled = !on; },
  };
  input.addEventListener('input', () => { exact = null; const v = api.get(); show(v); if (onInput) onInput(v); });
  api.set(value);
  return api;
}

/** Campo numérico con etiqueta. */
export function numField({ label, value, step = 'any', min, max, unit = '', onInput, width }) {
  const input = h('input', { type: 'number', value, step, min, max });
  if (width) input.style.width = width;
  const api = {
    el: h('label', { class: 'field' }, h('span', { class: 'lbl' }, h('span', {}, label), unit ? h('span', {}, unit) : null), input),
    input,
    get: () => parseFloat(input.value),
    set: (v) => { input.value = v; },
  };
  input.addEventListener('input', () => { if (onInput && isFinite(api.get())) onInput(api.get()); });
  return api;
}

export function select({ label, options, value, onInput }) {
  const sel = h('select', {}, options.map((o) => h('option', { value: o.value ?? o, selected: (o.value ?? o) === value }, o.label ?? o)));
  const api = { el: h('label', { class: 'field' }, label ? h('span', { class: 'lbl' }, h('span', {}, label)) : null, sel), input: sel, get: () => sel.value, set: (v) => { sel.value = v; } };
  sel.addEventListener('input', () => onInput && onInput(sel.value));
  return api;
}

export function check({ label, value = false, onInput }) {
  const input = h('input', { type: 'checkbox', checked: value });
  const api = { el: h('label', { class: 'check' }, input, h('span', {}, label)), input, get: () => input.checked, set: (v) => { input.checked = v; } };
  input.addEventListener('input', () => onInput && onInput(input.checked));
  return api;
}

export function segmented(options, value, onInput) {
  const el = h('div', { class: 'seg' });
  const btns = options.map((o) => {
    const b = h('button', { type: 'button', class: o.value === value ? 'on' : '', onclick: () => api.set(o.value, true) }, o.label);
    el.append(b);
    return b;
  });
  const api = {
    el, value,
    set(v, fire) { api.value = v; btns.forEach((b, i) => b.classList.toggle('on', options[i].value === v)); if (fire && onInput) onInput(v); },
    get: () => api.value,
  };
  return api;
}

export const button = (text, onclick, cls = '') => h('button', { type: 'button', class: `btn ${cls}`.trim(), onclick }, text);

/** Panel de lecturas. items: [{ key, label, unit? }]; update({key: [valor, subtexto, estado]}). */
export function readouts(items) {
  const cells = {};
  const el = h('div', { class: 'readouts' }, items.map((it) => {
    const v = h('div', { class: 'v' }, '—'), s = h('div', { class: 's' }), box = h('div', { class: 'ro' }, h('div', { class: 'k' }, it.label), v, s);
    cells[it.key] = { v, s, box };
    return box;
  }));
  return {
    el,
    update(data) {
      for (const [k, val] of Object.entries(data)) {
        const c = cells[k]; if (!c) continue;
        const [text, sub = '', state = ''] = Array.isArray(val) ? val : [val];
        c.v.textContent = text; c.s.textContent = sub;
        c.box.className = `ro ${state}`.trim();
      }
    },
  };
}

/** Cabecera estándar de módulo. */
export function modTitle(titulo, resumen, tags = []) {
  return h('div', { class: 'mod-title' }, h('div', {}, tags.map((t) => h('span', { class: 'tag' }, t))), h('h2', { style: { marginTop: '6px' } }, titulo), h('p', {}, resumen));
}

/** Retardo para eventos frecuentes. */
export function debounce(fn, ms = 80) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

/** Throttle por animation frame. */
export function rafThrottle(fn) {
  let pending = false, lastArgs;
  return (...a) => {
    lastArgs = a;
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; fn(...lastArgs); });
  };
}
