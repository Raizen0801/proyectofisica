// Unidad 4 · Módulo 9: Simulador de la fuerza de Lorentz en campos E y B (cruzados o no).
import { Stage, THREE, axesWithGrid, textSprite } from '../ui/scene3d.js';
import { h, group, slider, numField, select, check, segmented, readouts, modTitle } from '../ui/dom.js';
import { TrajectoryPlayer, playbackBar, niceCeil } from '../ui/player.js';
import { LineChart } from '../ui/charts.js';
import { integrateParticle, lorentzTheory, kineticEnergy } from '../physics/dynamics.js';
import { E_CHARGE, M_ELECTRON, M_PROTON, AMU } from '../physics/constants.js';
import { si, sci, rad } from '../ui/format.js';

const PARTICLES = {
  electron: { nombre: 'Electrón', q: -E_CHARGE, m: M_ELECTRON },
  proton: { nombre: 'Protón', q: E_CHARGE, m: M_PROTON },
  alpha: { nombre: 'Partícula α', q: 2 * E_CHARGE, m: 4.001506 * AMU },
  custom: { nombre: 'Personalizada…', q: E_CHARGE, m: 12 * AMU },
};

const PRESETS = {
  helice: { nombre: 'Hélice: protón en B uniforme', particle: 'proton', speed: 1e5, elev: 30, azim: 0, E: [0, 0, 0], B: [0, 0, 0.1], periods: 4 },
  selector: { nombre: 'Selector de velocidades (v = E/B, trayectoria recta)', particle: 'proton', speed: 1e5, elev: 0, azim: 0, E: [0, 1e4, 0], B: [0, 0, 0.1], periods: 3 },
  cicloide: { nombre: 'Cicloide: deriva E×B desde el reposo', particle: 'proton', speed: 0, elev: 0, azim: 0, E: [0, 1e3, 0], B: [0, 0, 0.1], periods: 4 },
  trocoide: { nombre: 'Trocoide: v₀ distinta de E/B', particle: 'proton', speed: 4e4, elev: 0, azim: 0, E: [0, 1e4, 0], B: [0, 0, 0.1], periods: 4 },
  ciclotron: { nombre: 'Ciclotrón: electrón en B uniforme', particle: 'electron', speed: 1e6, elev: 0, azim: 0, E: [0, 0, 0], B: [0, 0, 1e-3], periods: 3 },
  oblicuo: { nombre: 'Hélice con campo E paralelo a B (aceleración axial)', particle: 'proton', speed: 8e4, elev: 20, azim: 0, E: [0, 0, 3e3], B: [0, 0, 0.1], periods: 4 },
};

export default {
  id: 'lorentz', unidad: 4, icono: 'F', titulo: 'Fuerza de Lorentz', corto: 'Partícula en campos E y B cruzados',
  mount(root) {
    const S = { particle: 'proton', qe: 1, mu: 12, speed: 1e5, elev: 30, azim: 0, E: [0, 0, 0], B: [0, 0, 0.1], periods: 4, T: 1e-6, method: 'boris', stepsPer: 40, proj: true };
    let res = null, unit = 1, theo = null;

    const viewport = h('div', { class: 'viewport' });
    const stage = new Stage(viewport, { camera: [9.5, -11, 7.5] });
    const axes = new THREE.Group(), gScene = new THREE.Group();
    stage.scene.add(axes, gScene);
    const player = new TrajectoryPlayer(stage);
    const scaleHud = h('div', { class: 'hud' }), stateHud = h('div', { class: 'hud' });
    viewport.append(h('div', { class: 'overlay-bar' }, scaleHud), h('div', { class: 'hud-bottom' }, stateHud));

    // ---- controles ----
    const presetSel = select({ label: 'Escenarios de ejemplo', options: [{ value: '', label: 'Elegir un escenario…' }, ...Object.entries(PRESETS).map(([k, v]) => ({ value: k, label: v.nombre }))], onInput: (k) => { if (k) applyPreset(PRESETS[k]); presetSel.set(''); } });
    const partSel = select({ label: 'Partícula', options: Object.entries(PARTICLES).map(([k, v]) => ({ value: k, label: v.nombre })), value: S.particle, onInput: (k) => { S.particle = k; customBox.style.display = k === 'custom' ? '' : 'none'; run(); } });
    const qF = numField({ label: 'Carga (múltiplos de e)', value: 1, step: 1, onInput: (v) => { S.qe = v; run(); } });
    const mF = numField({ label: 'Masa (u)', value: 12, step: 0.5, min: 0.001, onInput: (v) => { S.mu = v; run(); } });
    const customBox = h('div', { class: 'row', style: { display: 'none' } }, h('div', { class: 'grow' }, qF.el), h('div', { class: 'grow' }, mF.el));
    const speedSl = slider({ label: 'Rapidez inicial v₀', min: 0, max: 5e7, step: 1000, value: S.speed, fmt: (v) => si(v, 'm/s', 3), onInput: (v) => { S.speed = v; run(); } });
    const elevSl = slider({ label: 'Elevación de v₀ (desde el plano xy)', min: -90, max: 90, step: 1, value: S.elev, unit: '°', onInput: (v) => { S.elev = v; run(); } });
    const azimSl = slider({ label: 'Azimut de v₀', min: -180, max: 180, step: 1, value: S.azim, unit: '°', onInput: (v) => { S.azim = v; run(); } });
    const Ef = ['x', 'y', 'z'].map((a, i) => numField({ label: `E${a} (V/m)`, value: S.E[i], step: 100, onInput: (v) => { S.E[i] = v; run(); } }));
    const Bf = ['x', 'y', 'z'].map((a, i) => numField({ label: `B${a} (T)`, value: S.B[i], step: 0.01, onInput: (v) => { S.B[i] = v; run(); } }));
    const perSl = slider({ label: 'Duración (períodos ciclotrónicos)', min: 0.5, max: 20, step: 0.5, value: S.periods, fmt: (v) => `${v}`, onInput: (v) => { S.periods = v; run(); } });
    const Tsl = slider({ label: 'Duración T (si B = 0)', min: 1e-9, max: 1e-3, value: S.T, log: true, fmt: (v) => si(v, 's', 3), onInput: (v) => { S.T = v; run(); } });
    const methSeg = segmented([{ value: 'boris', label: 'Boris' }, { value: 'rk45', label: 'RK45' }], 'boris', (m) => { S.method = m; run(); });
    const stepsSl = slider({ label: 'Pasos por período (Boris)', min: 8, max: 200, step: 2, value: S.stepsPer, fmt: (v) => `${v}`, onInput: (v) => { S.stepsPer = v; run(); } });
    const projChk = check({ label: 'Proyección sobre el plano ⟂ B', value: S.proj, onInput: (v) => { S.proj = v; run(); } });

    const controls = h('aside', { class: 'controls' },
      modTitle('Simulador de la fuerza de Lorentz', 'Lanza una partícula en campos E y B (por ejemplo cruzados) y compara el movimiento con la teoría: hélices, cicloides y selector de velocidades.', ['Unidad 4', 'F = q(E + v × B)']),
      group('Escenarios', presetSel.el),
      group('Partícula', partSel.el, customBox, speedSl.el, elevSl.el, azimSl.el),
      group('Campo eléctrico E', h('div', { class: 'row' }, ...Ef.map((f) => h('div', { class: 'grow' }, f.el)))),
      group('Campo magnético B', h('div', { class: 'row' }, ...Bf.map((f) => h('div', { class: 'grow' }, f.el)))),
      group('Simulación', perSl.el, Tsl.el, h('div', { class: 'field' }, h('span', { class: 'lbl' }, h('span', {}, 'Integrador')), methSeg.el), stepsSl.el, projChk.el),
      h('p', { class: 'note' }, 'm dv/dt = q(E + v×B). Radio de Larmor r = m v⊥ / (|q|B); ω = |q|B/m; deriva v_d = E×B / B². El integrador de Boris conserva |v| en un campo B puro.'),
    );

    const ro = readouts([
      { key: 'w', label: 'Frecuencia ciclotrónica ω' }, { key: 'T', label: 'Período T = 2π/ω' }, { key: 'r', label: 'Radio de Larmor (teoría)' }, { key: 'rm', label: 'Radio medido' },
      { key: 'vd', label: 'Deriva E×B (teoría)' }, { key: 'vm', label: 'Velocidad media (teoría | medida)' }, { key: 'pitch', label: 'Paso de la hélice v∥·T' }, { key: 'en', label: 'Error de energía' },
    ]);
    const chart = new LineChart({ xlabel: 'tiempo (s)', ylabel: 'error relativo de energía', xfmt: (v) => si(v, 's', 2), yfmt: (v) => v.toExponential(0), height: 230, yZero: false });
    const pb = playbackBar(player);
    const stageEl = h('div', { class: 'stage scroll' }, viewport, pb.el,
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Resultados: teoría frente a simulación'), ro.el),
        h('div', { class: 'card' }, h('h3', {}, 'Calidad numérica'), chart.el, h('p', { class: 'help' }, 'Se grafica |ΔK − qE·Δr| / K₀ con el integrador elegido (debe ser cero: el campo B no realiza trabajo).'))));
    root.append(h('div', { class: 'mod' }, controls, stageEl));

    // ---- lógica ----
    const cur = () => (S.particle === 'custom' ? { q: S.qe * E_CHARGE, m: S.mu * AMU } : PARTICLES[S.particle]);

    function applyPreset(p) {
      Object.assign(S, { particle: p.particle, speed: p.speed, elev: p.elev, azim: p.azim, E: [...p.E], B: [...p.B], periods: p.periods });
      partSel.set(S.particle); customBox.style.display = 'none';
      speedSl.set(S.speed); elevSl.set(S.elev); azimSl.set(S.azim); perSl.set(S.periods);
      Ef.forEach((f, i) => f.set(S.E[i])); Bf.forEach((f, i) => f.set(S.B[i]));
      run(); player.focus(); player.restart();
    }

    function simulate(method, q, m, v0, T, nSteps) {
      return integrateParticle({ q, m, r0: [0, 0, 0], v0, T, Efun: () => S.E, Bfun: () => S.B, method, nSteps, nSamples: Math.max(800, nSteps) });
    }

    function energyErr(r, q, m) {
      const K = kineticEnergy(m, r.vel), N = r.t.length;
      const out = new Float64Array(N);
      for (let i = 0; i < N; i++) {
        const W = q * (S.E[0] * r.pos[3 * i] + S.E[1] * r.pos[3 * i + 1] + S.E[2] * r.pos[3 * i + 2]);
        out[i] = Math.abs(K[i] - K[0] - W) / (K[0] + Math.abs(W) + 1e-300);
      }
      return out;
    }

    function run() {
      const { q, m } = cur();
      const th = rad(S.elev), ph = rad(S.azim);
      const v0 = [S.speed * Math.cos(th) * Math.cos(ph), S.speed * Math.cos(th) * Math.sin(ph), S.speed * Math.sin(th)];
      const Bm = Math.hypot(...S.B);
      theo = lorentzTheory({ q, m, v0, E: S.E, B: S.B });
      const T = Bm > 0 ? S.periods * theo.period : S.T;
      Tsl.el.style.display = Bm > 0 ? 'none' : ''; perSl.el.style.display = Bm > 0 ? '' : 'none';
      stepsSl.el.style.display = S.method === 'boris' ? '' : 'none';
      const nSteps = Math.max(40, Math.round((Bm > 0 ? S.periods : 10) * S.stepsPer));
      res = simulate(S.method, q, m, v0, T, nSteps);
      const alt = simulate(S.method === 'boris' ? 'rk45' : 'boris', q, m, v0, T, nSteps);
      res.meta = { q, m, v0, T, Bm };
      let ext = 0;
      for (let i = 0; i < res.pos.length; i++) ext = Math.max(ext, Math.abs(res.pos[i]));
      unit = niceCeil(Math.max(ext, 1e-12) / 7);
      buildScene();
      player.load(res, unit);
      player.forceFn = (r, v) => { const E = S.E, B = S.B; return [q * (E[0] + v[1] * B[2] - v[2] * B[1]), q * (E[1] + v[2] * B[0] - v[0] * B[2]), q * (E[2] + v[0] * B[1] - v[1] * B[0])]; };
      results(res, alt, q, m, v0, T);
    }

    function buildScene() {
      stage.clear(axes); stage.clear(gScene);
      axes.add(axesWithGrid(10, { labels: true }));
      scaleHud.textContent = `Cada división = ${si(unit, 'm', 2)} · ejes de ±${si(10 * unit, 'm', 2)}`;
      const arrowAt = (vec, origin, color, name) => {
        const m = Math.hypot(...vec);
        if (m === 0) return;
        const d = new THREE.Vector3(...vec).normalize();
        for (let i = -1; i <= 1; i++) {
          // tres flechas paralelas para sugerir un campo uniforme
          const side = new THREE.Vector3().crossVectors(d, new THREE.Vector3(0, 0, 1)); if (side.length() < 0.1) side.set(1, 0, 0); side.normalize().multiplyScalar(0.9 * i);
          gScene.add(new THREE.ArrowHelper(d, new THREE.Vector3(...origin).add(side), 3.2, color, 0.55, 0.3));
        }
        const lab = textSprite(name, { color: '#' + color.toString(16).padStart(6, '0'), size: 0.6 });
        lab.position.set(origin[0] + d.x * 4 , origin[1] + d.y * 4, origin[2] + d.z * 4 + 0.6);
        gScene.add(lab);
      };
      arrowAt(S.B, [-6, -6.5, 0.5], 0x5aa9ff, `B = ${si(Math.hypot(...S.B), 'T', 2)}`);
      arrowAt(S.E, [-6, 6.5, 0.5], 0xffa94d, `E = ${si(Math.hypot(...S.E), 'V/m', 2)}`);
      if (theo.driftSpeed > 0) {
        const d = new THREE.Vector3(...theo.drift).normalize();
        gScene.add(new THREE.ArrowHelper(d, new THREE.Vector3(0, 0, 0), 5.5, 0x7ae582, 0.7, 0.4));
        const lab = textSprite(`v_d = ${si(theo.driftSpeed, 'm/s', 3)}`, { color: '#7ae582', size: 0.6 });
        lab.position.set(d.x * 6.3, d.y * 6.3, d.z * 6.3 + 0.7);
        gScene.add(lab);
      }
      // proyección sobre el plano perpendicular a B
      if (S.proj && theo.omega > 0) {
        const b = new THREE.Vector3(...S.B).normalize();
        let lo = Infinity;
        const N = res.t.length;
        for (let i = 0; i < N; i++) lo = Math.min(lo, (res.pos[3 * i] * b.x + res.pos[3 * i + 1] * b.y + res.pos[3 * i + 2] * b.z) / unit);
        const base = lo - 0.8;
        const pts = new Float32Array(3 * N);
        for (let i = 0; i < N; i++) {
          const p = new THREE.Vector3(res.pos[3 * i], res.pos[3 * i + 1], res.pos[3 * i + 2]).multiplyScalar(1 / unit);
          const h0 = p.dot(b);
          p.addScaledVector(b, base - h0);
          pts.set([p.x, p.y, p.z], 3 * i);
        }
        gScene.add(stage.fatLine(pts, { color: 0x8896b3, width: 1.6, opacity: 0.7 }));
      }
      stage.invalidate();
    }

    function results(r, alt, q, m, v0, T) {
      const N = r.t.length - 1;
      const Bm = r.meta.Bm;
      const err = energyErr(r, q, m), errAlt = energyErr(alt, q, m);
      const maxErr = Math.max(...err), maxAlt = Math.max(...errAlt);
      // radio y velocidad media medidos (sólo con períodos completos y B ≠ 0)
      let rMeas = '—', vMeas = '—', vTh = '—';
      if (Bm > 0) {
        const bh = S.B.map((c) => c / Bm);
        const apar = (q * (S.E[0] * bh[0] + S.E[1] * bh[1] + S.E[2] * bh[2])) / m;
        const rho = new Float64Array(3 * (N + 1));
        for (let i = 0; i <= N; i++) {
          const t = r.t[i], s = theo.vParallel * t + 0.5 * apar * t * t;
          for (let c = 0; c < 3; c++) rho[3 * i + c] = r.pos[3 * i + c] - theo.drift[c] * t - s * bh[c];
        }
        const c = [0, 0, 0];
        for (let i = 0; i < N; i++) { const dt = r.t[i + 1] - r.t[i]; for (let k = 0; k < 3; k++) c[k] += 0.5 * (rho[3 * i + k] + rho[3 * (i + 1) + k]) * dt; }
        for (let k = 0; k < 3; k++) c[k] /= T;
        let rr = 0;
        for (let i = 0; i < N; i++) { const dt = r.t[i + 1] - r.t[i]; const d0 = Math.hypot(rho[3 * i] - c[0], rho[3 * i + 1] - c[1], rho[3 * i + 2] - c[2]), d1 = Math.hypot(rho[3 * i + 3] - c[0], rho[3 * i + 4] - c[1], rho[3 * i + 5] - c[2]); rr += 0.5 * (d0 + d1) * dt; }
        rMeas = rr / T;
        const vv = [r.pos[3 * N] / T, r.pos[3 * N + 1] / T, r.pos[3 * N + 2] / T];
        vMeas = Math.hypot(...vv);
        const vt = theo.drift.map((d, k) => d + (theo.vParallel + 0.5 * apar * T) * bh[k]);
        vTh = Math.hypot(...vt);
        if (Math.abs(S.periods - Math.round(S.periods)) > 1e-9 && S.periods % 1 !== 0.5) { /* medios períodos: la media del radio es aproximada */ }
        rMeas = S.periods % 1 === 0 ? rMeas : NaN;
      }
      ro.update({
        w: [Bm > 0 ? si(theo.omega, 'rad/s', 3) : '—', 'ω = |q|B/m'],
        T: [Bm > 0 ? si(theo.period, 's', 3) : '—', ''],
        r: [Bm > 0 && theo.radius > 0 ? si(theo.radius, 'm', 4) : '—', `v⊥ = ${si(theo.vPerp, 'm/s', 3)}`],
        rm: [isFinite(rMeas) ? si(rMeas, 'm', 4) : '—', isFinite(rMeas) ? `diferencia ${((Math.abs(rMeas - theo.radius) / (theo.radius || 1)) * 100).toExponential(1)} %` : 'requiere períodos enteros', isFinite(rMeas) && Math.abs(rMeas - theo.radius) / (theo.radius || 1) < 5e-3 ? 'good' : ''],
        vd: [theo.driftSpeed > 0 ? si(theo.driftSpeed, 'm/s', 4) : '—', theo.driftSpeed > 0 ? 'E×B / B²' : ''],
        vm: [Bm > 0 ? `${si(vTh, 'm/s', 3)}  |  ${isFinite(vMeas) ? si(vMeas, 'm/s', 3) : '—'}` : '—', 'sobre períodos completos'],
        pitch: [Bm > 0 ? si(Math.abs(theo.vParallel) * theo.period, 'm', 3) : '—', 'v∥ = ' + si(theo.vParallel, 'm/s', 3)],
        en: [maxErr.toExponential(1), `${r.method === 'boris' ? 'Boris' : 'RK45'} · el otro: ${maxAlt.toExponential(1)}`, maxErr < 1e-6 ? 'good' : 'warn'],
      });
      const step = Math.max(1, Math.floor(N / 400)), xs = [], ys = [], ya = [];
      for (let i = 0; i <= N; i += step) { xs.push(r.t[i]); ys.push(Math.max(err[i], 1e-18)); }
      const ra = alt.t.length - 1, stepa = Math.max(1, Math.floor(ra / 400));
      const xa = [];
      for (let i = 0; i <= ra; i += stepa) { xa.push(alt.t[i]); ya.push(Math.max(errAlt[i], 1e-18)); }
      chart.opts.ylabel = "log₁₀(error relativo)"; chart.opts.yfmt = (v) => `10^${v.toFixed(0)}`;
      chart.set({
        series: [{ x: xs, y: ys.map((v) => Math.log10(v)), label: r.method === 'boris' ? 'Boris' : 'RK45' }, { x: xa, y: ya.map((v) => Math.log10(v)), label: alt.method === 'boris' ? 'Boris' : 'RK45', color: '#ff9f6b', dash: [6, 4] }],
      });
    }

    player.onChange((p) => {
      if (!p.run) return;
      const s = p.state();
      stateHud.textContent = `t = ${si(s.t, 's', 3)} · v = ${si(Math.hypot(...s.v), 'm/s', 3)} · r = (${sci(s.r[0], 2)}, ${sci(s.r[1], 2)}, ${sci(s.r[2], 2)}) m`;
    });

    viewport.append(h('div', { class: 'overlay-bar', style: { top: 'auto', bottom: '52px', justifyContent: 'flex-end' } }, h('div', { class: 'hud' }, h('span', { style: { color: '#7ae582' } }, '→ velocidad v'), '  ', h('span', { style: { color: '#ff5c7a' } }, '→ fuerza F = q(E + v×B)'))));
    applyPreset(PRESETS.helice);
    return { destroy() { pb.destroy(); player.dispose(); chart.destroy(); stage.dispose(); } };
  },
};
