// Unidad 2 · Módulo 4: Simulador de capacitores de placas paralelas con dieléctrico.
import { Stage, THREE, textSprite } from '../ui/scene3d.js';
import { h, group, slider, select, segmented, button, readouts, modTitle } from '../ui/dom.js';
import { LineChart } from '../ui/charts.js';
import { DIELECTRICS, partialDielectricCapacitance } from '../physics/capacitors.js';
import { EPS0 } from '../physics/constants.js';
import { si, sci } from '../ui/format.js';
import { FlowParticles } from '../ui/flow.js';

const A_MAX = 500; // cm², para la escala visual
const DEFAULTS = { V: 12, A: 100, d: 2, mat: 'aire', kappa: 5, x: 1 };

// generador pseudoaleatorio determinista
function rng(seed) { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }

export default {
  id: 'capacitor', unidad: 2, icono: 'C', titulo: 'Simulador de capacitores', corto: 'Área, distancia y dieléctrico',
  mount(root) {
    const S = { ...DEFAULTS, mode: 'conectada', Qiso: 0 };
    const Qref = partialDielectricCapacitance(DEFAULTS.A * 1e-4, DEFAULTS.d * 1e-3, 1.00059, 1) * DEFAULTS.V;

    const viewport = h('div', { class: 'viewport' });
    const stage = new Stage(viewport, { camera: [6.2, -7.6, 4.1], fov: 42 });
    stage.controls.target.set(-0.7, 0, 0.1);
    const floor = new THREE.GridHelper(20, 20, 0x2a3a57, 0x182235); floor.rotation.x = Math.PI / 2; floor.position.z = -2.4;
    stage.scene.add(floor);
    const gCap = new THREE.Group(); stage.scene.add(gCap);
    const spark = new THREE.Group(); stage.scene.add(spark);
    const hud = h('div', { class: 'hud' });
    const badge = h('div', { class: 'badge-bad', style: { display: 'none' } }, '⚡ Ruptura dieléctrica');
    const status = h('div', { class: 'hud' });
    viewport.append(h('div', { class: 'overlay-bar' }, hud, badge), h('div', { class: 'hud-bottom' }, status));

    // ---- controles ----
    const Vsl = slider({ label: 'Voltaje de la batería V', min: 1, max: 1000, value: S.V, log: true, fmt: (v) => si(v, 'V', 3), onInput: (v) => { S.V = v; update(); } });
    const Asl = slider({ label: 'Área de las placas A', min: 5, max: A_MAX, value: S.A, step: 1, fmt: (v) => `${v.toFixed(0)} cm²`, onInput: (v) => { S.A = v; update(); } });
    const dsl = slider({ label: 'Separación d', min: 0.1, max: 20, value: S.d, log: true, fmt: (v) => `${v.toFixed(v < 1 ? 2 : 1)} mm`, onInput: (v) => { S.d = v; update(); } });
    const matSel = select({
      label: 'Material dieléctrico',
      options: [...DIELECTRICS.map((d) => ({ value: d.id, label: `${d.nombre} (κ = ${d.kappa})` })), { value: 'custom', label: 'Personalizado…' }],
      value: S.mat, onInput: (v) => { S.mat = v; kSl.el.style.display = v === 'custom' ? '' : 'none'; update(); },
    });
    const kSl = slider({ label: 'Constante dieléctrica κ', min: 1, max: 2000, value: S.kappa, log: true, digits: 3, onInput: (v) => { S.kappa = v; update(); } });
    kSl.el.style.display = 'none';
    const xSl = slider({ label: 'Inserción del dieléctrico', min: 0, max: 1, step: 0.01, value: S.x, fmt: (v) => `${(100 * v).toFixed(0)} %`, onInput: (v) => { S.x = v; update(); } });
    const modeSeg = segmented([{ value: 'conectada', label: 'Batería conectada (V cte)' }, { value: 'aislada', label: 'Aislado (Q cte)' }], 'conectada', (m) => {
      if (m === 'aislada') S.Qiso = calc().Q;
      S.mode = m;
      Vsl.setEnabled(m === 'conectada');
      update();
    });
    const resetBtn = button('Restablecer', () => {
      Object.assign(S, DEFAULTS, { mode: 'conectada' });
      Vsl.set(S.V); Asl.set(S.A); dsl.set(S.d); matSel.set(S.mat); kSl.set(S.kappa); xSl.set(S.x); modeSeg.set('conectada'); Vsl.setEnabled(true); kSl.el.style.display = 'none';
      update();
    }, 'small');

    const ro = readouts([
      { key: 'C', label: 'Capacitancia C' }, { key: 'Q', label: 'Carga Q' }, { key: 'V', label: 'Voltaje V' }, { key: 'E', label: 'Campo E = V/d' },
      { key: 'U', label: 'Energía U = ½CV²' }, { key: 'u', label: 'Densidad de energía' }, { key: 'sig', label: 'Densidad de carga libre σ' }, { key: 'ratio', label: 'C / C₀ (sin dieléctrico)' },
    ]);
    const cC = new LineChart({ xlabel: 'separación d (mm)', ylabel: 'C (pF)', height: 210, xfmt: (v) => v.toFixed(1), yfmt: (v) => v.toPrecision(3) });
    const cX = new LineChart({ xlabel: 'inserción del dieléctrico (%)', ylabel: 'C (pF)', height: 210, xfmt: (v) => v.toFixed(0), yfmt: (v) => v.toPrecision(3) });
    const cU = new LineChart({ xlabel: 'separación d (mm)', ylabel: 'U (µJ)', height: 210, xfmt: (v) => v.toFixed(1), yfmt: (v) => v.toPrecision(3) });

    const controls = h('aside', { class: 'controls' },
      modTitle('Simulador de capacitores', 'Varía el área, la distancia y el dieléctrico de un capacitor de placas paralelas y observa cómo cambian C, Q, V, E y la energía almacenada.', ['Unidad 2', 'Dieléctricos']),
      group('Conexión', modeSeg.el, h('p', { class: 'note' }, 'Con la batería conectada V es constante; al aislar el capacitor la carga Q se conserva y V varía.')),
      group('Parámetros', Vsl.el, Asl.el, dsl.el, matSel.el, kSl.el, xSl.el, h('div', { class: 'row' }, resetBtn)),
      h('p', { class: 'note' }, 'C = κ ε₀ A / d. Con un dieléctrico insertado una fracción x de la longitud: C = C₀[1 + (κ − 1)x].'),
    );
    const stageEl = h('div', { class: 'stage scroll' }, viewport,
      h('div', { class: 'card' }, h('h3', {}, 'Magnitudes del capacitor'), ro.el),
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Capacitancia frente a separación'), cC.el),
        h('div', { class: 'card' }, h('h3', {}, 'Capacitancia frente a inserción'), cX.el),
        h('div', { class: 'card' }, h('h3', {}, 'Energía frente a separación'), cU.el, h('p', { class: 'help' }, 'Con V constante U ∝ 1/d (la batería aporta energía); con Q constante U ∝ d (hay que realizar trabajo para separar las placas).'))));
    root.append(h('div', { class: 'mod' }, controls, stageEl));

    // ---- física ----
    const material = () => (S.mat === 'custom' ? { kappa: S.kappa, Emax: Infinity, color: '#ff9f6b', nombre: 'Personalizado' } : DIELECTRICS.find((d) => d.id === S.mat));
    function calc(over = {}) {
      const p = { ...S, ...over };
      const mat = material();
      const A = p.A * 1e-4, d = p.d * 1e-3;
      const C = partialDielectricCapacitance(A, d, mat.kappa, p.x);
      let V, Q;
      if (S.mode === 'conectada' || over.forceV) { V = p.V; Q = C * V; } else { Q = S.Qiso; V = Q / C; }
      const E = V / d;
      const EmaxEff = Math.min(p.x < 0.999 ? 3e6 : Infinity, p.x > 0.001 ? mat.Emax : Infinity);
      return { A, d, C, V, Q, E, U: 0.5 * C * V * V, kappa: mat.kappa, EmaxEff, mat };
    }

    // ---- escena ----
    const gDots = new THREE.Group(); stage.scene.add(gDots);
    const flowE = new FlowParticles(stage, { size: 0.24, color: 0x6cb4ff, spacing: 0.85, speed: 2, maxPerLine: 30 });
    const flowT = new FlowParticles(stage, { size: 0.2, color: 0xffd34d, spacing: 0.5, speed: 1.2, maxPerLine: 6 });
    const anim = { Q: null, target: 0, rate: 0 };
    let cur = null;
    const dotCount = (Q) => Math.max(4, Math.min(240, Math.round((40 * Q) / Qref)));
    let lastN = -1;

    // cargas libres sobre las placas internas (cantidad relativa a Q de referencia; se anima con la carga)
    function buildDots() {
      stage.clear(gDots);
      if (!cur) return;
      const { c, s, g } = cur;
      const n = dotCount(anim.Q ?? c.Q);
      lastN = n;
      const slabLo = -s / 2, slabHi = -s / 2 + S.x * s;
      const wD = c.kappa * S.x, wA = 1 - S.x;
      const fracD = wD + wA > 0 ? wD / (wD + wA) : 0;
      let nd = Math.round(n * fracD), na = n - nd;
      if (S.x <= 0.001) { nd = 0; na = n; }
      const cand = { d: [], a: [] };
      const R = rng(7);
      for (let i = 0; i < 17; i++) for (let j = 0; j < 17; j++) {
        const x = -s / 2 + 0.05 * s + (0.9 * s * (i + 0.2 + 0.6 * R())) / 17, y = -s / 2 + 0.05 * s + (0.9 * s * (j + 0.2 + 0.6 * R())) / 17;
        (x <= slabHi && x >= slabLo ? cand.d : cand.a).push([x, y, R()]);
      }
      const pick = (arr, k) => arr.sort((a, b) => a[2] - b[2]).slice(0, k);
      const dots = [...pick(cand.d, nd), ...pick(cand.a, na)];
      const geo = new THREE.SphereGeometry(0.07, 8, 6);
      const mP = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ color: 0xff5c5c }), dots.length);
      const mN = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ color: 0x4f9dff }), dots.length);
      const mat4 = new THREE.Matrix4();
      dots.forEach(([x, y], i) => {
        mat4.setPosition(x, y, g / 2 - 0.02); mP.setMatrixAt(i, mat4);
        mat4.setPosition(x, y, -g / 2 + 0.02); mN.setMatrixAt(i, mat4);
      });
      gDots.add(mP, mN);
      stage.invalidate();
    }

    // transitorio de carga/descarga: la carga mostrada tiende exponencialmente a su valor final
    stage.onFrame((dt) => {
      if (anim.Q === null) return;
      const diff = anim.target - anim.Q;
      if (Math.abs(diff) > 1e-3 * Qref) {
        anim.Q += diff * (1 - Math.exp(-dt / 0.7));
        if (dotCount(anim.Q) !== lastN) buildDots();
      } else anim.Q = anim.target;
      const rate = Math.abs(anim.target - anim.Q) / Qref;
      const active = rate > 0.01;
      flowE.setEnabled(active);
      flowE.speed = 0.5 + 5 * Math.min(1, rate);
      for (const L of flowE.lines) L.flip = diff < 0; // al descargarse, los electrones regresan
      const eN = cur ? Math.min(1, Math.log10(1 + cur.c.E / 1e3) / 4) : 0;
      flowT.speed = 0.5 + 2.2 * eN;
      status.textContent = active ? (diff > 0 ? 'Cargando: los electrones salen de la placa + hacia la batería y llegan a la placa −' : 'Descargando: los electrones regresan a la placa +') : (S.mode === 'conectada' ? 'Equilibrio: Q = CV y ya no circula corriente' : 'Aislado: Q constante');
    });

    function build(c) {
      stage.clear(gCap);
      const s = 6 * Math.sqrt(S.A / A_MAX);
      const g = 0.25 + 0.2 * S.d;
      const t = 0.14;
      const plateMat = (col) => new THREE.MeshStandardMaterial({ color: col, metalness: 0.55, roughness: 0.35, transparent: true, opacity: 0.88 });
      const top = new THREE.Mesh(new THREE.BoxGeometry(s, s, t), plateMat(0xc0707a));
      top.position.z = g / 2 + t / 2;
      const bot = new THREE.Mesh(new THREE.BoxGeometry(s, s, t), plateMat(0x6f8fc8));
      bot.position.z = -g / 2 - t / 2;
      gCap.add(top, bot);
      // dieléctrico: losa completa desplazada para que sólo la fracción x quede entre las placas
      if (S.x > 0.001 && c.kappa > 1.01) {
        const slab = new THREE.Mesh(new THREE.BoxGeometry(s, s * 0.96, g * 0.96), new THREE.MeshPhysicalMaterial({ color: new THREE.Color(c.mat.color), transparent: true, opacity: 0.5, roughness: 0.2, transmission: 0.0, side: THREE.DoubleSide, depthWrite: false }));
        slab.position.x = -s / 2 + S.x * s - s / 2;
        gCap.add(slab);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), new THREE.LineBasicMaterial({ color: new THREE.Color(c.mat.color), transparent: true, opacity: 0.8 }));
        edges.position.copy(slab.position);
        gCap.add(edges);
        const lab = textSprite(`κ = ${+c.kappa.toPrecision(3)}`, { size: 0.5, color: c.mat.color });
        lab.position.set(slab.position.x, -s / 2 - 0.2, g / 2 + 0.7);
        gCap.add(lab);
      }
      cur = { c, s, g, t };
      buildDots();
      // batería y cables: por ellos circulan los electrones mientras el capacitor se carga o descarga
      const xw = -s / 2 - 1.6, zt = g / 2 + t / 2, zb = -g / 2 - t / 2, hb = 0.55;
      const wirePts = [-s / 2, 0, zt, xw, 0, zt, xw, 0, hb, xw, 0, -hb, xw, 0, zb, -s / 2, 0, zb];
      gCap.add(stage.fatLine([-s / 2, 0, zt, xw, 0, zt, xw, 0, hb], { color: 0xb9c3d9, width: 2.2 }));
      gCap.add(stage.fatLine([xw, 0, -hb, xw, 0, zb, -s / 2, 0, zb], { color: 0xb9c3d9, width: 2.2 }));
      const batt = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 2 * hb), new THREE.MeshStandardMaterial({ color: 0x5a6a8f, metalness: 0.4, roughness: 0.5 }));
      batt.position.set(xw, 0, 0); gCap.add(batt);
      const cap1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.14), new THREE.MeshStandardMaterial({ color: 0xff6b6b })); cap1.position.set(xw, 0, hb + 0.07); gCap.add(cap1);
      const bl = textSprite(`${si(c.V, 'V', 3)}`, { size: 0.42, color: '#ffe066' }); bl.position.set(xw - 0.2, 0, -hb - 0.55); gCap.add(bl);
      flowE.setLines([{ pts: new Float32Array(wirePts), flip: false }]);
      // cargas de prueba positivas que derivan de la placa + a la placa − (sentido de E)
      const tl = [];
      const nx = 4;
      for (let i = 0; i < nx; i++) for (let j = 0; j < nx; j++) {
        const x = -s / 2 + (s * (i + 0.5)) / nx, y = -s / 2 + (s * (j + 0.5)) / nx;
        tl.push({ pts: new Float32Array([x, y, g / 2, x, y, -g / 2]), flip: false });
      }
      flowT.spacing = Math.max(0.35, g * 0.55);
      flowT.setLines(tl);
      // flechas del campo entre las placas
      const eNorm = Math.min(1, Math.log10(1 + c.E / 1e3) / 4);
      const col = new THREE.Color().setHSL(0.1 - 0.1 * eNorm, 1, 0.55);
      for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
        const x = -s / 2 + (s * (i + 0.5)) / 5, y = -s / 2 + (s * (j + 0.5)) / 5;
        const ar = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(x, y, g * 0.4), g * 0.8, col, Math.min(0.3, g * 0.3), Math.min(0.15, g * 0.15));
        gCap.add(ar);
      }
      // etiquetas + y −
      const plus = textSprite('+Q', { size: 0.6, color: '#ff8a8a' }); plus.position.set(s / 2 + 0.6, 0, g / 2 + t + 0.25);
      const minus = textSprite('−Q', { size: 0.6, color: '#8ab8ff' }); minus.position.set(s / 2 + 0.6, 0, -g / 2 - t - 0.25);
      gCap.add(plus, minus);
      // cota de la separación
      const dim = stage.fatLine([s / 2 + 0.2, -s / 2, -g / 2, s / 2 + 0.2, -s / 2, g / 2], { color: 0xffffff, width: 2 });
      gCap.add(dim);
      const dl = textSprite(`d = ${S.d.toFixed(S.d < 1 ? 2 : 1)} mm`, { size: 0.45 }); dl.position.set(s / 2 + 0.3, -s / 2 - 0.9, 0);
      gCap.add(dl);
      top.material.color.set(c.E > c.EmaxEff ? 0xff4d4d : 0xc0707a);
      stage.invalidate();
      build.g = g; build.s = s;
    }

    let breakdown = false;
    stage.onFrame((dt, now) => {
      if (!breakdown) { if (spark.children.length) { stage.clear(spark); } return; }
      if (Math.floor(now * 14) === build.lastTick) return;
      build.lastTick = Math.floor(now * 14);
      stage.clear(spark);
      const { g, s } = build;
      for (let k = 0; k < 3; k++) {
        const pts = [];
        const x0 = (Math.random() - 0.5) * s * 0.8, y0 = (Math.random() - 0.5) * s * 0.8;
        for (let i = 0; i <= 8; i++) pts.push(x0 + (Math.random() - 0.5) * 0.5, y0 + (Math.random() - 0.5) * 0.5, g / 2 - (g * i) / 8);
        spark.add(stage.fatLine(pts, { color: 0xfff0a0, width: 3 }));
      }
      stage.invalidate();
    });

    function update() {
      const c = calc();
      breakdown = c.E > c.EmaxEff;
      badge.style.display = breakdown ? '' : 'none';
      if (S.mode === 'aislada') Vsl.set(Math.min(1000, Math.max(1, c.V)));
      const C0 = EPS0 * c.A / c.d;
      ro.update({
        C: [si(c.C, 'F'), `C₀ = ${si(C0, 'F')}`],
        Q: [si(c.Q, 'C'), S.mode === 'aislada' ? 'constante (aislado)' : 'Q = C V'],
        V: [si(c.V, 'V'), S.mode === 'aislada' ? 'varía: V = Q / C' : 'fijado por la batería'],
        E: [si(c.E, 'V/m'), isFinite(c.EmaxEff) ? `límite ${si(c.EmaxEff, 'V/m')}` : 'sin límite', breakdown ? 'bad' : ''],
        U: [si(c.U, 'J'), ''],
        u: [si(c.U / (c.A * c.d), 'J/m³'), '½ ε E²'],
        sig: [si(c.Q / c.A, 'C/m²'), ''],
        ratio: [(c.C / C0).toFixed(3), 'efecto del dieléctrico'],
      });
      hud.textContent = `A = ${S.A.toFixed(0)} cm² · d = ${S.d.toFixed(2)} mm · ${c.mat.nombre} · ${S.mode === 'conectada' ? 'batería conectada' : 'aislado'}`;
      anim.target = c.Q;
      if (anim.Q === null) anim.Q = c.Q;
      build(c);
      // gráficas
      const ds = [], Cs = [], UsV = [], UsQ = [];
      for (let i = 0; i <= 100; i++) {
        const d = 0.2 + (20 - 0.2) * (i / 100);
        ds.push(d);
        const Ci = partialDielectricCapacitance(c.A * 1e4 * 1e-4, d * 1e-3, c.kappa, S.x);
        Cs.push(Ci * 1e12);
        UsV.push(0.5 * Ci * c.V * c.V * 1e6);
        UsQ.push((c.Q * c.Q) / (2 * Ci) * 1e6);
      }
      cC.set({ series: [{ x: ds, y: Cs, label: 'C(d)' }], markers: [{ x: S.d, y: c.C * 1e12, color: '#fff', label: 'actual' }] });
      const xs = [], Cx = [];
      for (let i = 0; i <= 100; i++) { xs.push(i); Cx.push(partialDielectricCapacitance(c.A, c.d, c.kappa, i / 100) * 1e12); }
      cX.set({ series: [{ x: xs, y: Cx, label: 'C(x)', color: '#ff9f6b' }], markers: [{ x: S.x * 100, y: c.C * 1e12, color: '#fff', label: 'actual' }] });
      cU.set({ series: [{ x: ds, y: UsV, label: 'V constante' }, { x: ds, y: UsQ, label: 'Q constante', color: '#ff9f6b' }], markers: [{ x: S.d, y: c.U * 1e6, color: '#fff', label: 'actual' }] });
    }

    update();
    return { destroy() { cC.destroy(); cX.destroy(); cU.destroy(); flowE.dispose(); flowT.dispose(); stage.dispose(); } };
  },
};
