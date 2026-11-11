// Unidad 3 · Módulo 7: Visualizador de la ley de Ohm en tiempo real.
import { h, group, slider, segmented, check, readouts, modTitle } from '../ui/dom.js';
import { LineChart } from '../ui/charts.js';
import { si } from '../ui/format.js';

export default {
  id: 'ohm', unidad: 3, icono: 'I', titulo: 'Ley de Ohm', corto: 'Relación V – I – R en tiempo real',
  mount(root) {
    const S = { mode: 'I', V: 9, R: 120, I: 0.075, auto: false, freq: 0.25, t0: performance.now() };
    const history = { t: [], V: [], I: [], P: [] };

    // ---------- controles ----------
    const Vsl = slider({ label: 'Voltaje V', min: 0, max: 24, step: 0.1, value: S.V, fmt: (v) => si(v, 'V', 3), onInput: (v) => { S.V = v; solve('V'); } });
    const Rsl = slider({ label: 'Resistencia R', min: 1, max: 1000, value: S.R, log: true, fmt: (v) => si(v, 'Ω', 3), onInput: (v) => { S.R = v; solve('R'); } });
    const Isl = slider({ label: 'Corriente I', min: 1e-3, max: 5, value: S.I, log: true, fmt: (v) => si(v, 'A', 3), onInput: (v) => { S.I = v; solve('I'); } });
    const modeSeg = segmented([{ value: 'I', label: 'Hallar I' }, { value: 'V', label: 'Hallar V' }, { value: 'R', label: 'Hallar R' }], 'I', (m) => { S.mode = m; applyMode(); solve(); });
    const autoChk = check({ label: 'Barrido automático de V (senoidal)', value: false, onInput: (v) => { S.auto = v; if (!v) { Vsl.set(S.V); } } });
    const fSl = slider({ label: 'Frecuencia del barrido', min: 0.05, max: 1, step: 0.05, value: S.freq, fmt: (v) => `${v.toFixed(2)} Hz`, onInput: (v) => { S.freq = v; } });
    const ro = readouts([{ key: 'V', label: 'Voltaje V' }, { key: 'I', label: 'Corriente I' }, { key: 'R', label: 'Resistencia R' }, { key: 'P', label: 'Potencia P = V·I' }]);

    function applyMode() {
      Vsl.setEnabled(S.mode !== 'V'); Rsl.setEnabled(S.mode !== 'R'); Isl.setEnabled(S.mode !== 'I');
      autoChk.input.disabled = S.mode !== 'I';
      if (S.mode !== 'I') { S.auto = false; autoChk.set(false); }
    }
    function solve(changed) {
      if (S.mode === 'I') { S.I = S.R > 0 ? S.V / S.R : 0; Isl.set(Math.max(S.I, 1e-3)); }
      else if (S.mode === 'V') { S.V = S.I * S.R; Vsl.set(Math.min(24, S.V)); }
      else { S.R = S.I > 0 ? S.V / S.I : Infinity; Rsl.set(Math.min(1000, Math.max(1, S.R))); }
      show();
    }
    function show() {
      const P = S.V * S.I;
      ro.update({
        V: [si(S.V, 'V', 4), S.mode === 'V' ? 'V = I R' : ''], I: [si(S.I, 'A', 4), S.mode === 'I' ? 'I = V / R' : ''],
        R: [isFinite(S.R) ? si(S.R, 'Ω', 4) : '∞', S.mode === 'R' ? 'R = V / I' : ''], P: [si(P, 'W', 4), P > 100 ? '⚠ potencia elevada' : 'P = V I = I²R = V²/R', P > 100 ? 'warn' : ''],
      });
      drawCharts();
    }

    const controls = h('aside', { class: 'controls' },
      modTitle('Visualizador de la ley de Ohm', 'Mueve dos de las tres magnitudes y la tercera se calcula en tiempo real: V = I·R. Observa el flujo de electrones, la recta I–V y la potencia disipada.', ['Unidad 3', 'Tiempo real']),
      group('¿Qué magnitud quieres calcular?', modeSeg.el),
      group('Magnitudes', Vsl.el, Rsl.el, Isl.el),
      group('Modo dinámico', autoChk.el, fSl.el, h('p', { class: 'note' }, 'Con el barrido, V oscila entre 0 y el valor del deslizador de voltaje y puedes ver cómo I lo sigue sin retraso (resistor óhmico).')),
      h('div', { class: 'formula' }, 'V = I · R     P = V · I = I² R = V² / R'),
    );

    // ---------- animación del circuito ----------
    const cv = h('canvas', { style: { width: '100%', height: '260px', display: 'block', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px' } });
    const chIV = new LineChart({ xlabel: 'V (V)', ylabel: 'I (A)', height: 250, xfmt: (v) => v.toPrecision(2), yfmt: (v) => si(v, 'A', 2) });
    const chIR = new LineChart({ xlabel: 'R (Ω)', ylabel: 'I (A) con V constante', height: 250, xfmt: (v) => v.toFixed(0), yfmt: (v) => si(v, 'A', 2) });
    const hV = new LineChart({ xlabel: '', ylabel: 'V (V)', height: 110, xfmt: (v) => `${v.toFixed(1)} s`, yfmt: (v) => v.toPrecision(3), yZero: true });
    const hI = new LineChart({ xlabel: '', ylabel: 'I (mA)', height: 110, xfmt: (v) => `${v.toFixed(1)} s`, yfmt: (v) => v.toPrecision(3), yZero: true });
    const hP = new LineChart({ xlabel: 'tiempo (s)', ylabel: 'P (W)', height: 130, xfmt: (v) => `${v.toFixed(1)} s`, yfmt: (v) => v.toPrecision(3), yZero: true });

    const stageEl = h('div', { class: 'stage scroll' },
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Circuito en funcionamiento'), cv,
          h('div', { class: 'legend' }, h('span', {}, h('i', { style: { background: '#6cb4ff' } }), 'electrones (sentido real)'), h('span', {}, 'La corriente convencional va de + a − por el circuito externo.')), ro.el),
        h('div', { class: 'card' }, h('h3', {}, 'Característica I – V'), chIV.el, h('p', { class: 'help' }, 'La pendiente de la recta es 1/R: a mayor resistencia, menor corriente para el mismo voltaje. Las líneas tenues corresponden a R/2 y 2R.'))),
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'I frente a R (V constante)'), chIR.el, h('p', { class: 'help' }, 'I = V/R es una hipérbola: duplicar R reduce la corriente a la mitad.')),
        h('div', { class: 'card' }, h('h3', {}, 'Historial (últimos 12 s)'), hV.el, hI.el, hP.el)));
    root.append(h('div', { class: 'mod' }, controls, stageEl));

    // ---------- gráficas ----------
    function drawCharts() {
      const Vmax = Math.max(24, S.V * 1.1);
      const mk = (R) => ({ x: [0, Vmax], y: [0, Vmax / R] });
      const ref = (isFinite(S.R) ? [S.R / 2, S.R * 2] : []).map((R) => ({ ...mk(R), color: '#3a4d70', width: 1.5, dash: [4, 4] }));
      const act = { x: [0, Vmax], y: [0, isFinite(S.R) ? Vmax / S.R : 0], label: `R = ${si(S.R, 'Ω', 3)}`, color: '#4cc2ff', width: 2.6 };
      chIV.set({ series: [...ref, act], markers: [{ x: S.V, y: S.I, color: '#ffe066', label: `${si(S.V, 'V', 3)}, ${si(S.I, 'A', 3)}` }] });
      const Rs = [], Is = [];
      for (let i = 0; i <= 200; i++) { const R = 5 + (995 * i) / 200; Rs.push(R); Is.push(S.V / R); }
      chIR.set({ series: [{ x: Rs, y: Is, label: `V = ${si(S.V, 'V', 3)}`, color: '#ff9f6b' }], markers: isFinite(S.R) ? [{ x: S.R, y: S.I, color: '#ffe066' }] : [] });
    }
    let lastHist = 0;
    function drawHistory(now) {
      if (now - lastHist < 100) return;
      lastHist = now;
      const t = (now - S.t0) / 1000;
      history.t.push(t); history.V.push(S.V); history.I.push(S.I * 1000); history.P.push(S.V * S.I);
      while (history.t.length && t - history.t[0] > 12) { for (const k of ['t', 'V', 'I', 'P']) history[k].shift(); }
      const x = history.t;
      hV.set({ series: [{ x, y: history.V, color: '#7ae582' }] });
      hI.set({ series: [{ x, y: history.I, color: '#ffe066' }] });
      hP.set({ series: [{ x, y: history.P, color: '#ff7a7a' }] });
    }

    // ---------- animación ----------
    let raf = 0, phase = 0, lastT = performance.now();
    const N_E = 44;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
      if (S.auto && S.mode === 'I') {
        const Vtop = Vsl.get();
        S.V = Vtop * (0.5 + 0.5 * Math.sin(2 * Math.PI * S.freq * ((now - S.t0) / 1000)));
        S.I = S.V / S.R;
        show();
      }
      const speed = 0.02 + 0.55 * (Math.log10(1 + 40 * S.I) / Math.log10(1 + 40 * 5));
      phase = (phase + dt * speed) % 1;
      draw();
      drawHistory(now);
    }
    function draw() {
      const dpr = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
      if (!W) return;
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      const ctx = cv.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const mx = Math.max(60, W * 0.12), my = 38, x0 = mx, x1 = W - mx, y0 = my, y1 = H - my;
      const perim = 2 * (x1 - x0) + 2 * (y1 - y0);
      ctx.lineWidth = 3; ctx.strokeStyle = '#51648a'; ctx.lineJoin = 'round';
      // conductores con huecos para batería y resistor
      const mid = (y0 + y1) / 2;
      const seg = (a, b, c, d) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); };
      seg(x0, y0, x1, y0); seg(x1, y0, x1, mid - 34); seg(x1, mid + 34, x1, y1); seg(x1, y1, x0, y1); seg(x0, y1, x0, mid + 18); seg(x0, mid - 18, x0, y0);
      // batería
      ctx.strokeStyle = '#ff8a8a'; ctx.lineWidth = 4; seg(x0 - 20, mid - 14, x0 + 20, mid - 14);
      ctx.strokeStyle = '#8ab8ff'; seg(x0 - 11, mid + 14, x0 + 11, mid + 14);
      ctx.fillStyle = '#ff8a8a'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', x0 - 30, mid - 10);
      ctx.fillStyle = '#8ab8ff'; ctx.fillText('−', x0 - 30, mid + 20);
      ctx.fillStyle = '#e6ebf5'; ctx.font = '600 13px "Segoe UI", sans-serif'; ctx.fillText(si(S.V, 'V', 3), x0 + 2, mid + 44);
      // resistor con brillo según potencia
      const glow = Math.min(1, Math.log10(1 + S.V * S.I) / Math.log10(101));
      ctx.save();
      ctx.shadowColor = `rgba(255,140,60,${0.9 * glow})`; ctx.shadowBlur = 30 * glow;
      ctx.strokeStyle = `rgb(${150 + 105 * glow}, ${170 - 90 * glow}, ${255 - 200 * glow})`; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(x1, mid - 34);
      for (let i = 1; i <= 6; i++) ctx.lineTo(x1 + (i % 2 ? 11 : -11), mid - 34 + (68 * i) / 6);
      ctx.lineTo(x1, mid + 34); ctx.stroke(); ctx.restore();
      ctx.fillStyle = '#e6ebf5'; ctx.textAlign = 'left'; ctx.fillText(isFinite(S.R) ? si(S.R, 'Ω', 3) : '∞', x1 + 20, mid + 4);
      // electrones (se mueven en sentido contrario a la corriente convencional)
      const at = (s) => {
        // recorrido horario: arriba (→), derecha (↓), abajo (←), izquierda (↑)
        let d = (((s % 1) + 1) % 1) * perim;
        const top = x1 - x0, right = y1 - y0;
        if (d < top) return [x0 + d, y0];
        d -= top; if (d < right) return [x1, y0 + d];
        d -= right; if (d < top) return [x1 - d, y1];
        d -= top; return [x0, y1 - d];
      };
      for (let k = 0; k < N_E; k++) {
        const [x, y] = at(k / N_E - phase);
        ctx.fillStyle = '#6cb4ff'; ctx.shadowColor = '#6cb4ff'; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 2 * Math.PI); ctx.fill(); ctx.shadowBlur = 0;
      }
      // flecha de corriente convencional
      ctx.fillStyle = '#ffe066'; ctx.font = '600 13px "Segoe UI", sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(`I = ${si(S.I, 'A', 3)}  →`, (x0 + x1) / 2, y0 - 12);
    }

    applyMode();
    show();
    raf = requestAnimationFrame(frame);
    return { destroy() { cancelAnimationFrame(raf); [chIV, chIR, hV, hI, hP].forEach((c) => c.destroy()); } };
  },
};
