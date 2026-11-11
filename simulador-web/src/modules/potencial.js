// Unidad 1 · Módulo 2: Calculadora de potencial eléctrico en cualquier punto del espacio.
import { h, group, numField, segmented, readouts, modTitle, debounce } from '../ui/dom.js';
import { chargeTable } from '../ui/chargeTable.js';
import { LineChart } from '../ui/charts.js';
import { store } from '../store.js';
import { potentialAt, fieldAt, contributionsAt } from '../physics/electrostatics.js';
import { marchingSquares } from '../geometry/contours.js';
import { buildPotentialMap } from '../geometry/potentialMap.js';
import { si, sci, deg } from '../ui/format.js';

const L = 6;

export default {
  id: 'potencial', unidad: 1, icono: 'V', titulo: 'Calculadora de potencial', corto: 'V(r) y E(r) en un punto',
  mount(root) {
    const P = { x: 1, y: 2, z: 0 }, Q = { x: -3, y: -2, z: 0 };
    let pick = 'P';
    const test = { q0: 1, m: 1 }; // nC, µg

    // --- controles ---
    const fields = {};
    const mkPoint = (name, pt, label) => {
      const f = ['x', 'y', 'z'].map((k) => {
        const n = numField({ label: `${k} (m)`, value: pt[k], step: 0.1, onInput: (v) => { pt[k] = v; recompute(); } });
        fields[`${name}${k}`] = n;
        return n.el;
      });
      return group(label, h('div', { class: 'row' }, ...f.map((e) => h('div', { class: 'grow' }, e))));
    };
    const q0 = numField({ label: 'Carga de prueba q₀ (nC)', value: test.q0, step: 0.1, onInput: (v) => { test.q0 = v; recompute(); } });
    const mass = numField({ label: 'Masa de q₀ (µg)', value: test.m, step: 0.1, min: 0.001, onInput: (v) => { test.m = v; recompute(); } });
    const pickSeg = segmented([{ value: 'P', label: 'Punto P' }, { value: 'Q', label: 'Punto Q' }], 'P', (v) => { pick = v; });
    const table = chargeTable();

    const controls = h('aside', { class: 'controls' },
      modTitle('Calculadora de potencial', 'Calcula el potencial V y el campo E en cualquier punto del espacio para la distribución de cargas definida. Haz clic en el mapa para mover el punto elegido.', ['Unidad 1', 'Superposición']),
      table.el,
      mkPoint('P', P, 'Punto P (donde se evalúa)'),
      mkPoint('Q', Q, 'Punto Q (destino del trayecto P → Q)'),
      group('Al hacer clic en el mapa coloco…', pickSeg.el),
      group('Trabajo y energía', h('div', { class: 'row' }, h('div', { class: 'grow' }, q0.el), h('div', { class: 'grow' }, mass.el)),
        h('p', { class: 'note' }, 'W(P→Q) = q₀ (V_P − V_Q) = −ΔU. Si q₀ se suelta desde el reposo en P, llega a Q con v = √(2W/m) (si W > 0).')),
    );

    // --- escenario ---
    const mapCv = h('canvas', { style: { width: '100%', maxWidth: '640px', aspectRatio: '1 / 1', borderRadius: '10px', border: '1px solid var(--line)', cursor: 'crosshair', display: 'block' } });
    const tip = h('div', { class: 'tooltip', style: { display: 'none' } });
    const roP = readouts([
      { key: 'V', label: 'Potencial V(P)' }, { key: 'E', label: '|E(P)|' }, { key: 'Ex', label: 'Componentes de E' }, { key: 'ang', label: 'Dirección de E (xy)' },
    ]);
    const roW = readouts([
      { key: 'dV', label: 'V_P − V_Q' }, { key: 'W', label: 'Trabajo W(P→Q)' }, { key: 'dU', label: 'ΔU de q₀' }, { key: 'v', label: 'Rapidez final de q₀' },
    ]);
    const contribBody = h('tbody');
    const chart = new LineChart({ xlabel: 'distancia s a lo largo de P → Q (m)', ylabel: 'V (V)', yfmt: (v) => si(v, 'V', 2), xfmt: (v) => v.toFixed(1), height: 240 });
    const chart2 = new LineChart({ xlabel: 'distancia s a lo largo de P → Q (m)', ylabel: '|E| (V/m)', yfmt: (v) => si(v, '', 2), xfmt: (v) => v.toFixed(1), height: 240 });

    const stageEl = h('div', { class: 'stage scroll' },
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Mapa del potencial en el plano z = z_P'),
          h('div', { class: 'legend' }, h('span', {}, h('i', { style: { background: '#ff605a' } }), 'V > 0'), h('span', {}, h('i', { style: { background: '#4696ff' } }), 'V < 0'), h('span', {}, h('i', { style: { background: '#fff' } }), 'P'), h('span', {}, h('i', { style: { background: '#4ade80' } }), 'Q')),
          mapCv, h('p', { class: 'help' }, 'Las curvas blancas son equipotenciales; el color usa una escala logarítmica con signo.')),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 } },
          h('div', { class: 'card' }, h('h3', {}, 'Resultado en P'), roP.el,
            h('span', { class: 'formula' }, 'V = Σ k qᵢ / rᵢ        E = Σ k qᵢ r̂ᵢ / rᵢ²')),
          h('div', { class: 'card' }, h('h3', {}, 'Aporte de cada carga'),
            h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, ['Carga', 'qᵢ (nC)', 'rᵢ (m)', 'Vᵢ', '% de V', 'Eᵢ'].map((t) => h('th', {}, t)))), contribBody)),
          h('div', { class: 'card' }, h('h3', {}, 'Trayecto P → Q'), roW.el))),
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Potencial a lo largo del segmento P → Q'), chart.el),
        h('div', { class: 'card' }, h('h3', {}, 'Magnitud del campo a lo largo del segmento P → Q'), chart2.el)),
      tip);
    root.append(h('div', { class: 'mod' }, controls, stageEl));

    // --- dibujo del mapa ---
    const off = document.createElement('canvas');
    let map = null;
    const toPx = (x, y, W) => [((x + L) / (2 * L)) * W, W - ((y + L) / (2 * L)) * W];

    function drawMap() {
      const ch = store.si();
      const dpr = window.devicePixelRatio || 1;
      const W = Math.round(mapCv.clientWidth * dpr) || 560;
      if (mapCv.width !== W) { mapCv.width = W; mapCv.height = W; }
      const ctx = mapCv.getContext('2d');
      ctx.clearRect(0, 0, W, W);
      if (ch.length) {
        map = buildPotentialMap(ch, L, P.z, 200);
        off.width = off.height = map.n;
        const id = new ImageData(map.rgba, map.n, map.n);
        // la malla va de y creciente: voltear verticalmente al dibujar
        off.getContext('2d').putImageData(id, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.save(); ctx.translate(0, W); ctx.scale(1, -1); ctx.drawImage(off, 0, 0, W, W); ctx.restore();
        ctx.lineWidth = 1.2 * dpr;
        for (const lv of map.levels(6)) {
          const seg = marchingSquares(map.vals, map.n, map.n, lv, -L, L, -L, L);
          ctx.strokeStyle = lv === 0 ? 'rgba(255,255,255,.95)' : lv > 0 ? 'rgba(255,220,180,.55)' : 'rgba(180,225,255,.55)';
          ctx.beginPath();
          for (let i = 0; i < seg.length; i += 4) {
            const a = toPx(seg[i], seg[i + 1], W), b = toPx(seg[i + 2], seg[i + 3], W);
            ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
          }
          ctx.stroke();
        }
      }
      // ejes
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = dpr;
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, W); ctx.moveTo(0, W / 2); ctx.lineTo(W, W / 2); ctx.stroke();
      // trayecto
      const [px, py] = toPx(P.x, P.y, W), [qx, qy] = toPx(Q.x, Q.y, W);
      ctx.setLineDash([6 * dpr, 5 * dpr]); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke(); ctx.setLineDash([]);
      // cargas
      for (const c of store.charges) {
        const [cx, cy] = toPx(c.x, c.y, W);
        ctx.fillStyle = c.q >= 0 ? '#ff5c5c' : '#4f9dff'; ctx.strokeStyle = '#0b0f17'; ctx.lineWidth = 2 * dpr;
        ctx.beginPath(); ctx.arc(cx, cy, (6 + 1.5 * Math.cbrt(Math.abs(c.q))) * dpr, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = `bold ${11 * dpr}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(c.q >= 0 ? '+' : '−', cx, cy + dpr);
      }
      const marker = (x, y, color, label) => {
        ctx.fillStyle = color; ctx.strokeStyle = '#0b0f17'; ctx.lineWidth = 2 * dpr;
        ctx.beginPath(); ctx.arc(x, y, 6 * dpr, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.font = `bold ${13 * dpr}px sans-serif`; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
        ctx.fillText(label, x + 9 * dpr, y - 5 * dpr);
      };
      marker(px, py, '#ffffff', 'P'); marker(qx, qy, '#4ade80', 'Q');
    }

    // --- cálculo ---
    function recompute() {
      const ch = store.si();
      if (!ch.length) return;
      const V = potentialAt(ch, P.x, P.y, P.z), E = fieldAt(ch, P.x, P.y, P.z), Em = Math.hypot(...E);
      roP.update({
        V: [si(V, 'V'), `k Σ q/r`],
        E: [si(Em, 'V/m'), ''],
        Ex: [`(${sci(E[0], 3)}, ${sci(E[1], 3)}, ${sci(E[2], 3)})`, 'V/m'],
        ang: [`${deg(Math.atan2(E[1], E[0])).toFixed(1)}°`, 'respecto a +x'],
      });
      const cs = contributionsAt(ch, P.x, P.y, P.z);
      const sumAbs = cs.reduce((s, c) => s + Math.abs(c.V), 0) || 1;
      contribBody.replaceChildren(...cs.map((c, i) => h('tr', {},
        h('td', {}, h('span', { class: 'dot', style: { background: store.charges[i].q >= 0 ? '#ff5c5c' : '#4f9dff' } }), ` ${i + 1}`),
        h('td', {}, +store.charges[i].q.toFixed(2)), h('td', {}, isFinite(c.r) ? c.r.toFixed(3) : '0'),
        h('td', {}, si(c.V, 'V', 3)), h('td', {}, `${((100 * Math.abs(c.V)) / sumAbs).toFixed(1)} %`), h('td', {}, si(c.E, 'V/m', 3)))));
      const VQ = potentialAt(ch, Q.x, Q.y, Q.z), q0SI = test.q0 * 1e-9;
      const W = q0SI * (V - VQ);
      const speed = W > 0 ? Math.sqrt((2 * W) / (test.m * 1e-9)) : 0; // µg -> kg = 1e-9
      roW.update({
        dV: [si(V - VQ, 'V'), ''],
        W: [si(W, 'J'), W >= 0 ? 'el campo realiza trabajo' : 'se necesita trabajo externo', W >= 0 ? 'good' : 'warn'],
        dU: [si(-W, 'J'), 'ΔU = q₀(V_Q − V_P)'],
        v: [W > 0 ? si(speed, 'm/s') : '—', W > 0 ? 'liberada desde el reposo' : ''],
      });
      // perfiles
      const N = 240, len = Math.hypot(Q.x - P.x, Q.y - P.y, Q.z - P.z) || 1e-9;
      const s = [], vv = [], ee = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N, x = P.x + t * (Q.x - P.x), y = P.y + t * (Q.y - P.y), z = P.z + t * (Q.z - P.z);
        s.push(t * len);
        // evita las singularidades exactas sobre las cargas
        vv.push(potentialAt(ch, x, y, z, 0.02)); ee.push(Math.hypot(...fieldAt(ch, x, y, z, 0.02)));
      }
      chart.set({ series: [{ x: s, y: vv, label: 'V(s)' }], markers: [{ x: 0, y: V, color: '#fff', label: 'P' }, { x: len, y: VQ, color: '#4ade80', label: 'Q' }] });
      chart2.set({ series: [{ x: s, y: ee, label: '|E|(s)', color: '#ff9f6b' }], markers: [{ x: 0, y: Em, color: '#fff', label: 'P' }] });
      drawMap();
    }
    const recomputeSoon = debounce(recompute, 40);
    const unsub = store.subscribe(() => recomputeSoon());

    // interacción con el mapa
    const worldFrom = (ev) => {
      const r = mapCv.getBoundingClientRect();
      return [((ev.clientX - r.left) / r.width) * 2 * L - L, L - ((ev.clientY - r.top) / r.height) * 2 * L];
    };
    mapCv.addEventListener('click', (ev) => {
      const [x, y] = worldFrom(ev);
      const pt = pick === 'P' ? P : Q;
      pt.x = +x.toFixed(2); pt.y = +y.toFixed(2);
      fields[`${pick}x`].set(pt.x); fields[`${pick}y`].set(pt.y);
      recompute();
    });
    mapCv.addEventListener('pointermove', (ev) => {
      const [x, y] = worldFrom(ev);
      const ch = store.si();
      const E = fieldAt(ch, x, y, P.z, 1e-2);
      tip.style.display = 'block';
      tip.style.left = `${ev.clientX + 14}px`; tip.style.top = `${ev.clientY + 14}px`;
      tip.textContent = `(${x.toFixed(2)}, ${y.toFixed(2)}) m · V = ${si(potentialAt(ch, x, y, P.z, 1e-2), 'V')} · |E| = ${si(Math.hypot(...E), 'V/m')}`;
    });
    mapCv.addEventListener('pointerleave', () => { tip.style.display = 'none'; });
    const mapRO = new ResizeObserver(() => drawMap());
    mapRO.observe(mapCv);

    recompute();
    return { destroy() { unsub(); mapRO.disconnect(); table.destroy(); chart.destroy(); chart2.destroy(); } };
  },
};
