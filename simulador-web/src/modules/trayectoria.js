// Unidad 1 · Módulo 3: Simulador de trayectoria de una partícula cargada en campos eléctricos.
import { Stage, THREE, axesWithGrid, textSprite } from '../ui/scene3d.js';
import { h, group, slider, numField, select, check, readouts, modTitle, debounce } from '../ui/dom.js';
import { TrajectoryPlayer, playbackBar, niceCeil } from '../ui/player.js';
import { LineChart } from '../ui/charts.js';
import { store } from '../store.js';
import { fieldAt, potentialAt } from '../physics/electrostatics.js';
import { integrateParticle, kineticEnergy } from '../physics/dynamics.js';
import { E_CHARGE, M_ELECTRON, M_PROTON, AMU, K_E } from '../physics/constants.js';
import { si, sci, deg, rad } from '../ui/format.js';

const PARTICLES = {
  electron: { nombre: 'Electrón (−e, 9.11×10⁻³¹ kg)', qe: -1, m: M_ELECTRON },
  proton: { nombre: 'Protón (+e, 1.67×10⁻²⁷ kg)', qe: 1, m: M_PROTON },
  alpha: { nombre: 'Partícula α (+2e, 4.00 u)', qe: 2, m: 4.001506 * AMU },
  custom: { nombre: 'Personalizada…', qe: 1, m: 12 * AMU },
};

const PRESETS = {
  crt: {
    nombre: 'Tubo de rayos catódicos: deflexión de un electrón',
    particle: 'electron', speed: 2e7, elev: 0, azim: 0, r0: [0, 0, 0], E: [0, -1.5e4, 0], T: 2.6e-9, charges: null,
  },
  freno: {
    nombre: 'Protón frenado por un campo opuesto (regresa)',
    particle: 'proton', speed: 2e5, elev: 0, azim: 0, r0: [0, 0, 0], E: [-4e3, 0, 0], T: 1.1e-6, charges: null,
  },
  oblicuo: {
    nombre: 'Lanzamiento oblicuo de un protón (parábola)',
    particle: 'proton', speed: 1e5, elev: 45, azim: 0, r0: [0, 0, 0], E: [0, 0, -1e3], T: 1.5e-6, charges: null,
  },
  dispersion: {
    nombre: 'Dispersión de un protón por una carga fija de +5 nC',
    particle: 'proton', speed: 1.5e5, elev: 0, azim: 0, r0: [-5, 0.5, 0], E: [0, 0, 0], T: 7e-5, charges: [[5, 0, 0, 0]],
  },
  orbita: {
    nombre: 'Órbita circular de un electrón alrededor de +5 nC',
    particle: 'electron', speed: Math.sqrt((K_E * 5e-9 * E_CHARGE) / (M_ELECTRON * 1)), elev: 0, azim: 90, r0: [1, 0, 0], E: [0, 0, 0],
    T: 3 * ((2 * Math.PI) / Math.sqrt((K_E * 5e-9 * E_CHARGE) / (M_ELECTRON * 1))), charges: [[5, 0, 0, 0]],
  },
};

export default {
  id: 'trayectoria', unidad: 1, icono: '↗', titulo: 'Simulador de trayectoria', corto: 'Partícula en campos eléctricos',
  mount(root) {
    const S = {
      particle: 'electron', qe: -1, mu: 12, speed: 2e7, elev: 0, azim: 0, r0: [0, 0, 0], E: [0, -1.5e4, 0], T: 2.6e-9, useCharges: false,
    };
    let result = null, unit = 1;

    const viewport = h('div', { class: 'viewport' });
    const stage = new Stage(viewport, { camera: [10, -12, 8] });
    const axes = new THREE.Group();
    stage.scene.add(axes);
    const gScene = new THREE.Group();
    stage.scene.add(gScene);
    const player = new TrajectoryPlayer(stage);
    const scaleHud = h('div', { class: 'hud' });
    const stateHud = h('div', { class: 'hud' });
    viewport.append(h('div', { class: 'overlay-bar' }, scaleHud), h('div', { class: 'hud-bottom' }, stateHud));

    // ---- controles ----
    const presetSel = select({
      label: 'Escenarios de ejemplo',
      options: [{ value: '', label: 'Elegir un escenario…' }, ...Object.entries(PRESETS).map(([k, v]) => ({ value: k, label: v.nombre }))],
      onInput: (k) => { if (k) applyPreset(PRESETS[k]); presetSel.set(''); },
    });
    const partSel = select({ label: 'Partícula', options: Object.entries(PARTICLES).map(([k, v]) => ({ value: k, label: v.nombre })), value: S.particle, onInput: (k) => { S.particle = k; syncParticle(); run(); } });
    const qField = numField({ label: 'Carga (en múltiplos de e)', value: 1, step: 1, onInput: (v) => { S.qe = v; run(); } });
    const mField = numField({ label: 'Masa (u)', value: 12, step: 0.5, min: 0.001, onInput: (v) => { S.mu = v; run(); } });
    const customBox = h('div', { class: 'row' }, h('div', { class: 'grow' }, qField.el), h('div', { class: 'grow' }, mField.el));
    const speedSl = slider({ label: 'Rapidez inicial v₀', min: 1e2, max: 1e8, value: S.speed, log: true, fmt: (v) => si(v, 'm/s', 3), onInput: (v) => { S.speed = v; run(); } });
    const elevSl = slider({ label: 'Elevación (desde el plano xy)', min: -90, max: 90, step: 1, value: 0, unit: '°', onInput: (v) => { S.elev = v; run(); } });
    const azimSl = slider({ label: 'Azimut (desde +x)', min: -180, max: 180, step: 1, value: 0, unit: '°', onInput: (v) => { S.azim = v; run(); } });
    const r0f = ['x', 'y', 'z'].map((k, i) => numField({ label: `${k}₀ (m)`, value: 0, step: 0.1, onInput: (v) => { S.r0[i] = v; run(); } }));
    const Ef = ['x', 'y', 'z'].map((k, i) => numField({ label: `E${k} (V/m)`, value: 0, step: 100, onInput: (v) => { S.E[i] = v; run(); } }));
    const useChk = check({ label: 'Incluir el campo de las cargas puntuales del módulo 1', value: false, onInput: (v) => { S.useCharges = v; run(); } });
    const Tsl = slider({ label: 'Duración de la simulación T', min: 1e-10, max: 1e-3, value: S.T, log: true, fmt: (v) => si(v, 's', 3), onInput: (v) => { S.T = v; run(); } });
    const chargeInfo = h('p', { class: 'note' });

    const controls = h('aside', { class: 'controls' },
      modTitle('Simulador de trayectoria', 'Lanza una partícula cargada y observa su movimiento bajo un campo eléctrico uniforme y/o el campo de cargas fijas. Integración numérica RK45 adaptativa.', ['Unidad 1', 'Dinámica']),
      group('Escenarios', presetSel.el),
      group('Partícula', partSel.el, customBox),
      group('Condiciones iniciales', speedSl.el, elevSl.el, azimSl.el, h('div', { class: 'row' }, ...r0f.map((f) => h('div', { class: 'grow' }, f.el)))),
      group('Campo eléctrico', h('div', { class: 'row' }, ...Ef.map((f) => h('div', { class: 'grow' }, f.el))), useChk.el, chargeInfo),
      group('Tiempo', Tsl.el),
      h('p', { class: 'note' }, 'm d²r/dt² = q E(r). Con E uniforme: r = r₀ + v₀t + ½(qE/m)t². Con cargas fijas el teorema trabajo–energía exige ΔK = −q ΔV.'),
    );

    const ro = readouts([
      { key: 'a0', label: 'Aceleración inicial' }, { key: 'vf', label: 'Rapidez final' }, { key: 'rf', label: 'Posición final (m)' },
      { key: 'K0', label: 'Energía cinética inicial' }, { key: 'Kf', label: 'Energía cinética final' }, { key: 'we', label: 'Verificación ΔK = −qΔV' },
      { key: 'an', label: 'Comparación analítica' }, { key: 'steps', label: 'Pasos del integrador' },
    ]);
    const chart = new LineChart({ xlabel: 'tiempo (s)', ylabel: 'energía (eV)', xfmt: (v) => si(v, 's', 2), yfmt: (v) => si(v, 'eV', 2), height: 250, yZero: false });
    const pb = playbackBar(player);
    const stageEl = h('div', { class: 'stage scroll' }, viewport, pb.el,
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Resultados de la simulación'), ro.el),
        h('div', { class: 'card' }, h('h3', {}, 'Conservación de la energía mecánica'), chart.el,
          h('p', { class: 'help' }, 'K (cinética) + U (potencial = q V) debe permanecer constante: el campo eléctrico es conservativo.'))));
    root.append(h('div', { class: 'mod' }, controls, stageEl));

    // ---- lógica ----
    function particle() {
      const p = PARTICLES[S.particle];
      return S.particle === 'custom' ? { q: S.qe * E_CHARGE, m: S.mu * AMU } : { q: p.qe * E_CHARGE, m: p.m };
    }
    function syncParticle() { customBox.style.display = S.particle === 'custom' ? '' : 'none'; }

    function applyPreset(p) {
      Object.assign(S, { particle: p.particle, speed: p.speed, elev: p.elev, azim: p.azim, r0: [...p.r0], E: [...p.E], T: p.T, useCharges: !!p.charges });
      if (p.charges) store.set(p.charges.map(([q, x, y, z]) => ({ q, x, y, z })));
      partSel.set(S.particle); syncParticle();
      speedSl.set(S.speed); elevSl.set(S.elev); azimSl.set(S.azim); Tsl.set(S.T);
      r0f.forEach((f, i) => f.set(S.r0[i])); Ef.forEach((f, i) => f.set(S.E[i])); useChk.set(S.useCharges);
      run();
      player.focus(); player.restart();
    }

    function run() {
      const { q, m } = particle();
      const ch = S.useCharges ? store.si() : [];
      chargeInfo.textContent = S.useCharges ? `Se usan ${ch.length} carga(s) del módulo «Visualizador de cargas» (posiciones en metros).` : 'Activa la casilla para añadir el campo de las cargas del módulo 1.';
      const Efun = (x, y, z) => {
        const e = ch.length ? fieldAt(ch, x, y, z, 1e-4) : [0, 0, 0];
        return [e[0] + S.E[0], e[1] + S.E[1], e[2] + S.E[2]];
      };
      const th = rad(S.elev), ph = rad(S.azim);
      const v0 = [S.speed * Math.cos(th) * Math.cos(ph), S.speed * Math.cos(th) * Math.sin(ph), S.speed * Math.sin(th)];
      result = integrateParticle({ q, m, r0: S.r0, v0, T: S.T, Efun, method: 'rk45', nSamples: 1200 });
      result.meta = { q, m, ch, v0 };
      // escala de la escena: unidades de 1, 2 o 5 × 10^k metros
      let ext = 0;
      for (let i = 0; i < result.pos.length; i++) ext = Math.max(ext, Math.abs(result.pos[i]));
      for (const c of ch) ext = Math.max(ext, Math.abs(c.x), Math.abs(c.y), Math.abs(c.z));
      unit = niceCeil(Math.max(ext, 1e-12) / 7);
      buildScene();
      player.load(result, unit);
      player.forceFn = (r) => { const e = Efun(r[0], r[1], r[2]); return [q * e[0], q * e[1], q * e[2]]; };
      updateResults();
    }

    function buildScene() {
      stage.clear(axes); stage.clear(gScene);
      axes.add(axesWithGrid(10, { labels: true }));
      scaleHud.textContent = `Cada división = ${si(unit, 'm', 2)}  ·  ejes de ±${si(10 * unit, 'm', 2)}`;
      const { ch, q } = result.meta;
      for (const c of ch) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), new THREE.MeshStandardMaterial({ color: c.q >= 0 ? 0xff5c5c : 0x4f9dff, emissive: c.q >= 0 ? 0x661111 : 0x113366 }));
        m.position.set(c.x / unit, c.y / unit, c.z / unit);
        gScene.add(m);
        const lab = textSprite(`${c.q > 0 ? '+' : ''}${(c.q * 1e9).toFixed(1)} nC`, { size: 0.5 });
        lab.position.set(c.x / unit, c.y / unit, c.z / unit + 0.7);
        gScene.add(lab);
      }
      const Em = Math.hypot(...S.E);
      if (Em > 0) {
        const dir = new THREE.Vector3(...S.E).normalize();
        const a = new THREE.ArrowHelper(dir, new THREE.Vector3(-8, 8, 0), 3.2, 0xffa94d, 0.7, 0.4);
        gScene.add(a);
        const lab = textSprite(`E = ${si(Em, 'V/m', 3)}`, { color: '#ffa94d', size: 0.6 });
        lab.position.set(-8 + dir.x * 3.8, 8 + dir.y * 3.8, dir.z * 3.8 + 0.8);
        gScene.add(lab);
      }
      stage.invalidate();
    }

    function energyAt(i) {
      const { q, ch } = result.meta;
      const x = result.pos[3 * i], y = result.pos[3 * i + 1], z = result.pos[3 * i + 2];
      const V = (ch.length ? potentialAt(ch, x, y, z, 1e-4) : 0) - (S.E[0] * x + S.E[1] * y + S.E[2] * z);
      return q * V;
    }

    function updateResults() {
      const { q, m, ch, v0 } = result.meta;
      const N = result.t.length - 1;
      const K = kineticEnergy(m, result.vel);
      const E0 = fieldAt(ch, ...S.r0, 1e-4);
      const Eloc = [E0[0] + S.E[0], E0[1] + S.E[1], E0[2] + S.E[2]];
      const a0 = (Math.hypot(...Eloc) * Math.abs(q)) / m;
      const rf = [result.pos[3 * N], result.pos[3 * N + 1], result.pos[3 * N + 2]];
      const vf = Math.hypot(result.vel[3 * N], result.vel[3 * N + 1], result.vel[3 * N + 2]);
      const dU = energyAt(N) - energyAt(0);
      const wErr = Math.abs(K[N] - K[0] + dU) / (Math.abs(K[0]) + Math.abs(dU) + 1e-300);
      const rel = vf / 3e8;
      let an = ['—', 'sólo con E uniforme y sin cargas'];
      if (!ch.length) {
        const t = result.t[N], a = Eloc.map((e) => (q * e) / m);
        const ra = S.r0.map((r, k) => r + v0[k] * t + 0.5 * a[k] * t * t);
        const err = Math.hypot(...ra.map((v, k) => v - rf[k])) / (Math.hypot(...ra) || 1);
        an = [`error ${err.toExponential(1)}`, 'frente a r₀ + v₀t + ½at²', err < 1e-6 ? 'good' : 'warn'];
      }
      ro.update({
        a0: [si(a0, 'm/s²'), `a = qE/m`],
        vf: [si(vf, 'm/s'), rel > 0.1 ? '⚠ v > 0.1c: efectos relativistas' : `${(100 * rel).toFixed(3)} % de c`, rel > 0.1 ? 'warn' : ''],
        rf: [`(${sci(rf[0], 3)}, ${sci(rf[1], 3)}, ${sci(rf[2], 3)})`, ''],
        K0: [`${si(K[0], 'J')}`, `${si(K[0] / E_CHARGE, 'eV')}`],
        Kf: [`${si(K[N], 'J')}`, `${si(K[N] / E_CHARGE, 'eV')}`],
        we: [`error ${wErr.toExponential(1)}`, 'ΔK + ΔU = 0', wErr < 1e-5 ? 'good' : 'warn'],
        an,
        steps: [`${N}`, 'RK45 adaptativo'],
      });
      const step = Math.max(1, Math.floor(N / 400));
      const xs = [], ks = [], us = [], es = [];
      for (let i = 0; i <= N; i += step) { xs.push(result.t[i]); const k = K[i] / E_CHARGE, u = energyAt(i) / E_CHARGE; ks.push(k); us.push(u); es.push(k + u); }
      chart.set({ series: [{ x: xs, y: ks, label: 'K' }, { x: xs, y: us, label: 'U = qV', color: '#ff9f6b' }, { x: xs, y: es, label: 'K + U', color: '#7ae582', dash: [6, 4] }] });
    }

    player.onChange((p) => {
      if (!p.run) return;
      const s = p.state();
      stateHud.textContent = `t = ${si(s.t, 's', 3)} · v = ${si(Math.hypot(...s.v), 'm/s', 3)} · r = (${sci(s.r[0], 2)}, ${sci(s.r[1], 2)}, ${sci(s.r[2], 2)}) m`;
    });
    viewport.append(h('div', { class: 'overlay-bar', style: { top: 'auto', bottom: '52px', justifyContent: 'flex-end' } }, h('div', { class: 'hud' }, h('span', { style: { color: '#7ae582' } }, '→ velocidad v'), '  ', h('span', { style: { color: '#ff5c7a' } }, '→ fuerza F = qE'))));
    const unsub = store.subscribe(debounce(() => { if (S.useCharges) run(); }, 100));

    syncParticle();
    applyPreset(PRESETS.crt);
    return { destroy() { unsub(); pb.destroy(); player.dispose(); chart.destroy(); stage.dispose(); } };
  },
};
