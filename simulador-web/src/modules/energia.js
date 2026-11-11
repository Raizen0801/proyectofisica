// Unidad 2 · Módulo 5: Calculadora de energía almacenada en capacitores, redes y carga/descarga RC.
import { h, group, select, segmented, button, readouts, modTitle } from '../ui/dom.js';
import { LineChart } from '../ui/charts.js';
import { storedEnergy, capacitorNetwork, rcCharge, rcDischarge } from '../physics/capacitors.js';
import { si } from '../ui/format.js';

const UNITS = {
  C: [['pF', 1e-12], ['nF', 1e-9], ['µF', 1e-6], ['mF', 1e-3], ['F', 1]],
  V: [['mV', 1e-3], ['V', 1], ['kV', 1e3]],
  Q: [['pC', 1e-12], ['nC', 1e-9], ['µC', 1e-6], ['mC', 1e-3], ['C', 1]],
  R: [['Ω', 1], ['kΩ', 1e3], ['MΩ', 1e6]],
};

/** Campo con unidad: devuelve { el, get() en SI, set(valor SI) }. */
function unitField(label, kind, value, unitIdx, onInput) {
  const inp = h('input', { type: 'number', value, step: 'any', min: 0 });
  const sel = h('select', { style: { width: '78px', flex: 'none' } }, UNITS[kind].map(([n], i) => h('option', { value: i, selected: i === unitIdx }, n)));
  const fire = () => onInput && onInput();
  inp.addEventListener('input', fire); sel.addEventListener('input', fire);
  return {
    el: h('label', { class: 'field' }, h('span', { class: 'lbl' }, h('span', {}, label)), h('div', { class: 'row' }, inp, sel)),
    get: () => parseFloat(inp.value) * UNITS[kind][parseInt(sel.value, 10)][1],
    set: (si_) => {
      // elige la unidad con mantisa en [1, 1000)
      let k = UNITS[kind].length - 1;
      for (let i = 0; i < UNITS[kind].length; i++) if (si_ / UNITS[kind][i][1] < 1000) { k = i; break; }
      sel.value = k; inp.value = +(si_ / UNITS[kind][k][1]).toPrecision(4);
    },
    el2: { inp, sel },
  };
}

export default {
  id: 'energia', unidad: 2, icono: 'U', titulo: 'Energía almacenada', corto: 'U = ½CV², redes y circuito RC',
  mount(root) {
    // ===== A. Calculadora =====
    let known = 'CV';
    const fC = unitField('Capacitancia C', 'C', 100, 2, calcA);
    const fV = unitField('Voltaje V', 'V', 12, 1, calcA);
    const fQ = unitField('Carga Q', 'Q', 1200, 2, calcA);
    const knownSel = select({
      label: 'Datos conocidos', value: 'CV',
      options: [{ value: 'CV', label: 'Capacitancia y voltaje (C, V)' }, { value: 'CQ', label: 'Capacitancia y carga (C, Q)' }, { value: 'VQ', label: 'Voltaje y carga (V, Q)' }],
      onInput: (v) => { known = v; sync(); calcA(); },
    });
    const roA = readouts([{ key: 'C', label: 'Capacitancia C' }, { key: 'V', label: 'Voltaje V' }, { key: 'Q', label: 'Carga Q' }, { key: 'U', label: 'Energía U' }, { key: 'eq', label: 'Equivale a levantar 1 kg' }, { key: 'P', label: 'Potencia si se descarga en 1 ms' }]);
    const chartA = new LineChart({ xlabel: 'voltaje V (V)', ylabel: 'U (J)', height: 230, xfmt: (v) => v.toPrecision(3), yfmt: (v) => si(v, 'J', 2), yZero: true });
    const sync = () => {
      fC.el.style.display = known.includes('C') ? '' : 'none';
      fV.el.style.display = known.includes('V') ? '' : 'none';
      fQ.el.style.display = known.includes('Q') ? '' : 'none';
    };
    function calcA() {
      try {
        const args = {};
        if (known.includes('C')) args.C = fC.get();
        if (known.includes('V')) args.V = fV.get();
        if (known.includes('Q')) args.Q = fQ.get();
        if (Object.values(args).some((v) => !isFinite(v) || v <= 0)) throw new Error('valor no válido');
        const r = storedEnergy(args);
        roA.update({
          C: [si(r.C, 'F'), ''], V: [si(r.V, 'V'), ''], Q: [si(r.Q, 'C'), ''], U: [si(r.U, 'J'), '½CV² = ½QV = Q²/2C'],
          eq: [`h = ${si(r.U / 9.81, 'm')}`, 'U = m g h'], P: [si(r.U / 1e-3, 'W'), 'P = U / Δt'],
        });
        const Vs = [], Us = [];
        for (let i = 0; i <= 100; i++) { const v = (r.V * 1.6 * i) / 100; Vs.push(v); Us.push(0.5 * r.C * v * v); }
        chartA.set({ series: [{ x: Vs, y: Us, label: `U = ½ C V²  (C = ${si(r.C, 'F', 3)})` }], markers: [{ x: r.V, y: r.U, color: '#fff', label: `${si(r.U, 'J', 3)}` }] });
      } catch (e) {
        roA.update({ C: ['—'], V: ['—'], Q: ['—'], U: ['—'], eq: ['—'], P: ['—'] });
      }
    }

    // ===== B. Redes =====
    const net = { topo: 'serie', V: 12, caps: [{ C: 10e-6 }, { C: 22e-6 }, { C: 47e-6 }] };
    const netRows = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } });
    const netV = unitField('Voltaje aplicado', 'V', 12, 1, () => { net.V = netV.get(); calcB(); });
    const topoSeg = segmented([{ value: 'serie', label: 'Serie' }, { value: 'paralelo', label: 'Paralelo' }], 'serie', (v) => { net.topo = v; calcB(); });
    const roB = readouts([{ key: 'Ceq', label: 'Capacitancia equivalente' }, { key: 'Q', label: 'Carga total' }, { key: 'U', label: 'Energía total' }, { key: 'chk', label: 'Σ Uᵢ = U total' }]);
    const tbodyB = h('tbody');
    const addBtn = button('+ Añadir capacitor', () => { if (net.caps.length < 6) { net.caps.push({ C: 10e-6 }); buildRows(); calcB(); } }, 'small');
    function buildRows() {
      netRows.replaceChildren(...net.caps.map((c, i) => {
        const f = unitField(`C${i + 1}`, 'C', 0, 2, () => { c.C = f.get(); calcB(); });
        f.set(c.C);
        return h('div', { class: 'row' }, h('div', { class: 'grow' }, f.el), h('button', { class: 'btn small danger', style: { marginTop: '18px' }, onclick: () => { if (net.caps.length > 1) { net.caps.splice(i, 1); buildRows(); calcB(); } } }, '✕'));
      }));
      addBtn.disabled = net.caps.length >= 6;
    }
    function calcB() {
      const Cs = net.caps.map((c) => c.C);
      if (Cs.some((c) => !isFinite(c) || c <= 0) || !isFinite(net.V)) return;
      const r = capacitorNetwork(Cs, net.V, net.topo);
      const sumU = r.items.reduce((s, i) => s + i.U, 0);
      roB.update({
        Ceq: [si(r.Ceq, 'F'), net.topo === 'serie' ? '1/Ceq = Σ 1/Cᵢ' : 'Ceq = Σ Cᵢ'], Q: [si(r.Q, 'C'), net.topo === 'serie' ? 'misma Q en todos' : 'Q = Σ Qᵢ'],
        U: [si(r.U, 'J'), '½ Ceq V²'], chk: [`${((sumU / r.U) * 100).toFixed(4)} %`, 'conservación de energía', Math.abs(sumU / r.U - 1) < 1e-9 ? 'good' : 'bad'],
      });
      tbodyB.replaceChildren(...r.items.map((it, i) => h('tr', {}, h('td', {}, `C${i + 1}`), h('td', {}, si(it.C, 'F')), h('td', {}, si(it.Q, 'C')), h('td', {}, si(it.V, 'V')), h('td', {}, si(it.U, 'J')), h('td', {}, `${((100 * it.U) / r.U).toFixed(1)} %`))));
    }

    // ===== C. RC =====
    const rc = { mode: 'carga', R: 1000, C: 100e-6, V: 12, frac: 1 };
    const fR = unitField('Resistencia R', 'R', 1, 1, upd);
    const fC2 = unitField('Capacitancia C', 'C', 100, 2, upd);
    const fV2 = unitField('Voltaje V', 'V', 12, 1, upd);
    const modeSeg = segmented([{ value: 'carga', label: 'Carga' }, { value: 'descarga', label: 'Descarga' }], 'carga', (v) => { rc.mode = v; upd(); });
    const tSlide = h('input', { type: 'range', min: 0, max: 1000, value: 300, style: { width: '100%' } });
    tSlide.addEventListener('input', () => { rc.frac = tSlide.value / 1000; upd(); });
    const roC = readouts([
      { key: 'tau', label: 'Constante de tiempo τ = RC' }, { key: 'vc', label: 'v_C(t)' }, { key: 'i', label: 'i(t)' }, { key: 'uc', label: 'Energía en C' },
      { key: 'er', label: 'Energía disipada en R' }, { key: 'eb', label: 'Energía de la fuente' },
    ]);
    const chV = new LineChart({ xlabel: 't', ylabel: 'v_C (V)', height: 210, xfmt: (v) => si(v, 's', 2), yfmt: (v) => si(v, 'V', 2) });
    const chI = new LineChart({ xlabel: 't', ylabel: 'i (A)', height: 210, xfmt: (v) => si(v, 's', 2), yfmt: (v) => si(v, 'A', 2), yZero: false });
    const chE = new LineChart({ xlabel: 't', ylabel: 'energía (J)', height: 210, xfmt: (v) => si(v, 's', 2), yfmt: (v) => si(v, 'J', 2) });
    function upd() {
      rc.R = fR.get(); rc.C = fC2.get(); rc.V = fV2.get();
      if (![rc.R, rc.C, rc.V].every((v) => isFinite(v) && v > 0)) return;
      const tau = rc.R * rc.C, T = 6 * tau, N = 240;
      const f = rc.mode === 'carga' ? (t) => rcCharge(rc.V, rc.R, rc.C, t) : (t) => rcDischarge(rc.V, rc.R, rc.C, t);
      const ts = [], vs = [], is = [], uc = [], er = [], eb = [];
      let diss = 0, prev = 0;
      for (let k = 0; k <= N; k++) {
        const t = (T * k) / N, s = f(t);
        diss += (s.i * s.i * rc.R) * (t - prev); prev = t;
        ts.push(t); vs.push(s.vc); is.push(s.i); uc.push(s.uC); er.push(diss);
        eb.push(rc.mode === 'carga' ? rc.V * rc.C * s.vc : 0);
      }
      const t = rc.frac * T, now = f(t);
      const idx = Math.round(rc.frac * N);
      const tv = [{ x: t, color: '#fbbf24', label: `t = ${si(t, 's', 2)}` }];
      chV.set({ series: [{ x: ts, y: vs, label: 'v_C' }], vlines: tv, markers: [{ x: t, y: now.vc, color: '#fff' }] });
      chI.set({ series: [{ x: ts, y: is, label: 'i', color: '#ff9f6b' }], vlines: tv, markers: [{ x: t, y: now.i, color: '#fff' }] });
      const series = [{ x: ts, y: uc, label: 'Energía en C' }, { x: ts, y: er, label: 'Disipada en R', color: '#ff9f6b' }];
      if (rc.mode === 'carga') series.push({ x: ts, y: eb, label: 'Entregada por la fuente', color: '#7ae582', dash: [6, 4] });
      chE.set({ series, vlines: tv });
      roC.update({
        tau: [si(tau, 's'), `99 % en ≈ ${si(4.6 * tau, 's', 2)}`], vc: [si(now.vc, 'V'), `${((now.vc / rc.V) * 100).toFixed(1)} % de V`],
        i: [si(now.i, 'A'), `I₀ = V/R = ${si(rc.V / rc.R, 'A', 3)}`], uc: [si(now.uC, 'J'), `final ${si(0.5 * rc.C * rc.V * rc.V, 'J', 3)}`],
        er: [si(er[idx], 'J'), rc.mode === 'carga' ? 'total → ½CV² (la mitad)' : 'total → ½CV² (toda la energía)'],
        eb: [rc.mode === 'carga' ? si(eb[idx], 'J') : '—', rc.mode === 'carga' ? 'total → CV²' : 'sin fuente'],
      });
    }

    sync(); calcA(); buildRows(); calcB(); upd();

    const page = h('div', { class: 'stage scroll', style: { flex: 1 } },
      h('div', { class: 'mod-title' }, h('div', {}, h('span', { class: 'tag' }, 'Unidad 2'), h('span', { class: 'tag' }, 'Calculadora')), h('h2', { style: { marginTop: '6px' } }, 'Calculadora de energía almacenada'), h('p', {}, 'La energía de un capacitor es el trabajo necesario para cargarlo: U = ½ C V² = ½ Q V = Q² / (2C).')),
      h('div', { class: 'card' }, h('h3', {}, 'A · Energía de un capacitor'),
        h('div', { class: 'grid-2' },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, knownSel.el, fC.el, fV.el, fQ.el, roA.el),
          chartA.el)),
      h('div', { class: 'card' }, h('h3', {}, 'B · Capacitores en serie y en paralelo'),
        h('div', { class: 'grid-2' },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, h('div', { class: 'row wrap' }, topoSeg.el, addBtn), netV.el, netRows),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 } }, roB.el,
            h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, ['', 'C', 'Q', 'V', 'U', '% de U'].map((t) => h('th', {}, t)))), tbodyB)))),
      h('div', { class: 'card' }, h('h3', {}, 'C · Carga y descarga de un capacitor a través de una resistencia (circuito RC)'),
        h('div', { class: 'grid-2' },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, modeSeg.el, fR.el, fC2.el, fV2.el,
            h('label', { class: 'field' }, h('span', { class: 'lbl' }, h('span', {}, 'Instante de observación (0 … 6τ)')), tSlide), roC.el),
          chE.el),
        h('div', { class: 'grid-2' }, chV.el, chI.el),
        h('p', { class: 'help' }, 'v_C(t) = V (1 − e^(−t/RC)) al cargar; v_C(t) = V e^(−t/RC) al descargar. Al cargar, la fuente entrega C V²: la mitad queda almacenada y la otra mitad se disipa en R, sin importar el valor de R.')));
    root.append(h('div', { class: 'mod' }, page));
    return { destroy() { chartA.destroy(); chV.destroy(); chI.destroy(); chE.destroy(); } };
  },
};
