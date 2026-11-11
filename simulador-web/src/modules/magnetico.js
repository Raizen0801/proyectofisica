// Unidad 4 · Módulo 8: Simulador de campo magnético (imanes, hilos, espiras y solenoides).
import { Stage, THREE, textSprite, axesWithGrid, plasma, coneAt } from '../ui/scene3d.js';
import { h, group, slider, numField, select, check, readouts, modTitle, debounce } from '../ui/dom.js';
import { makeSource, sourceFieldLines, theory } from '../physics/magnetostatics.js';
import { MU0 } from '../physics/constants.js';
import { si } from '../ui/format.js';
import { FlowParticles } from '../ui/flow.js';

const KINDS = [
  { value: 'iman', label: 'Imán de barra' },
  { value: 'solenoide', label: 'Solenoide' },
  { value: 'espira', label: 'Espira circular' },
  { value: 'hilo', label: 'Hilo recto largo' },
  { value: 'hilos2', label: 'Dos hilos paralelos' },
];

export default {
  id: 'magnetico', unidad: 4, icono: 'B', titulo: 'Campo magnético', corto: 'Imanes, corrientes y líneas de B',
  mount(root) {
    const S = { kind: 'solenoide', I: 3, N: 200, L: 30, R: 4, Bint: 200, d: 10, same: false, invert: false, nLines: 8, lines: true, arrows: false, compass: true, probe: [3, 0, 0] };
    let src = null, k = 1;

    const viewport = h('div', { class: 'viewport' });
    const stage = new Stage(viewport, { camera: [14, -17, 10] });
    const gSrc = new THREE.Group(), gLines = new THREE.Group(), gArrows = new THREE.Group(), gProbe = new THREE.Group();
    stage.scene.add(gSrc, gLines, gArrows, gProbe);
    const axesGrp = new THREE.Group(); stage.scene.add(axesGrp);
    const flowB = new FlowParticles(stage, { size: 0.5, color: 0xcfe9ff, spacing: 1.4, speed: 2.8 });
    const flowI = new FlowParticles(stage, { size: 0.6, color: 0xffe066, spacing: 0.8, speed: 2.4, maxPerLine: 60 });
    const needle = { n: new THREE.Vector3(1, 0, 0), w: new THREE.Vector3(), target: new THREE.Vector3(1, 0, 0), arrow: null };
    const hud = h('div', { class: 'hud' });
    viewport.append(h('div', { class: 'overlay-bar' }, hud));

    // ---- controles ----
    const kindSel = select({ label: 'Fuente del campo', options: KINDS, value: S.kind, onInput: (v) => { S.kind = v; syncVisibility(); rebuild(); } });
    const Isl = slider({ label: 'Corriente I', min: 0.1, max: 30, value: S.I, log: true, fmt: (v) => si(v, 'A', 3), onInput: (v) => { S.I = v; rebuildSoon(); } });
    const Nsl = slider({ label: 'Número de espiras N', min: 10, max: 1000, step: 10, value: S.N, fmt: (v) => `${v}`, onInput: (v) => { S.N = v; rebuildSoon(); } });
    const Lsl = slider({ label: 'Longitud L', min: 5, max: 50, step: 1, value: S.L, fmt: (v) => `${v} cm`, onInput: (v) => { S.L = v; rebuildSoon(); } });
    const Rsl = slider({ label: 'Radio R', min: 1, max: 15, step: 0.5, value: S.R, fmt: (v) => `${v} cm`, onInput: (v) => { S.R = v; rebuildSoon(); } });
    const Bsl = slider({ label: 'Campo interior del imán', min: 10, max: 1500, value: S.Bint, log: true, fmt: (v) => `${v.toFixed(0)} mT`, onInput: (v) => { S.Bint = v; rebuildSoon(); } });
    const dsl = slider({ label: 'Separación entre hilos d', min: 2, max: 30, step: 1, value: S.d, fmt: (v) => `${v} cm`, onInput: (v) => { S.d = v; rebuildSoon(); } });
    const sameChk = check({ label: 'Corrientes en el mismo sentido (si no, opuestas)', value: S.same, onInput: (v) => { S.same = v; rebuildSoon(); } });
    const invChk = check({ label: 'Invertir el sentido de la corriente', value: S.invert, onInput: (v) => { S.invert = v; rebuildSoon(); } });
    const nLinesSl = slider({ label: 'Densidad de líneas de campo', min: 3, max: 20, step: 1, value: S.nLines, fmt: (v) => `${v}`, onInput: (v) => { S.nLines = v; rebuildSoon(); } });
    const linesChk = check({ label: 'Líneas de campo B', value: S.lines, onInput: (v) => { S.lines = v; gLines.visible = v; flowB.setEnabled(v && flowChk.get()); stage.invalidate(); } });
    const arrChk = check({ label: 'Campo vectorial en el plano y = 0', value: S.arrows, onInput: (v) => { S.arrows = v; gArrows.visible = v; stage.invalidate(); } });
    const flowChk = check({ label: 'Animar el flujo del campo B (partículas sobre las líneas)', value: true, onInput: (v) => { flowB.setEnabled(v && S.lines); } });
    const curChk = check({ label: 'Animar la corriente en el conductor', value: true, onInput: (v) => { flowI.setEnabled(v); } });
    const cmpChk = check({ label: 'Brújula en el punto de prueba', value: S.compass, onInput: (v) => { S.compass = v; gProbe.visible = v; stage.invalidate(); } });
    const probe = ['x', 'y', 'z'].map((a, i) => numField({ label: `${a} (cm)`, value: S.probe[i], step: 0.5, onInput: (v) => { S.probe[i] = v; rebuildProbe(); } }));

    const ro = readouts([
      { key: 'B', label: '|B| en el punto de prueba' }, { key: 'comp', label: 'Componentes (Bx, By, Bz)' }, { key: 'th', label: 'Referencia analítica' }, { key: 'extra', label: 'Información' },
    ]);

    function syncVisibility() {
      const sh = (el, on) => { el.style.display = on ? '' : 'none'; };
      const kind = S.kind;
      sh(Isl.el, kind !== 'iman');
      sh(Nsl.el, kind === 'solenoide');
      sh(Lsl.el, kind === 'solenoide' || kind === 'iman');
      sh(Rsl.el, kind === 'solenoide' || kind === 'iman' || kind === 'espira');
      sh(Bsl.el, kind === 'iman');
      sh(dsl.el, kind === 'hilos2');
      sh(sameChk.el, kind === 'hilos2');
      sh(invChk.el, kind === 'solenoide' || kind === 'espira' || kind === 'hilo');
      const axisym = kind === 'solenoide' || kind === 'iman' || kind === 'espira';
      sh(nLinesSl.el, axisym || kind === 'hilos2' || kind === 'hilo');
    }

    const controls = h('aside', { class: 'controls' },
      modTitle('Simulador de campo magnético', 'Visualiza las líneas de campo B de imanes y corrientes. Los campos se calculan con la ley de Biot–Savart (numérica) o con las expresiones analíticas.', ['Unidad 4', 'Biot–Savart']),
      group('Fuente', kindSel.el, Isl.el, Nsl.el, Lsl.el, Rsl.el, Bsl.el, dsl.el, sameChk.el, invChk.el),
      group('Animación', flowChk.el, curChk.el, h('p', { class: 'note' }, 'Las partículas blancas siguen las líneas de B (más rápidas donde el campo es intenso); las amarillas son los portadores de corriente. La brújula verde oscila hasta alinearse con B cuando cambias los parámetros.')),
      group('Visualización', nLinesSl.el, linesChk.el, arrChk.el, cmpChk.el),
      group('Punto de prueba', h('div', { class: 'row' }, ...probe.map((p) => h('div', { class: 'grow' }, p.el))), ro.el),
      h('p', { class: 'note' }, 'Biot–Savart: B = (μ₀/4π) ∮ I dl × r̂ / r². Las líneas de B son siempre cerradas (∇·B = 0). Color de las líneas: intensidad |B| en escala logarítmica.'),
    );
    root.append(h('div', { class: 'mod' }, controls, h('div', { class: 'stage' }, viewport)));

    // ---- construcción ----
    function params() {
      const sg = S.invert ? -1 : 1;
      switch (S.kind) {
        case 'iman': { const L = S.L / 100, N = 40; return { L, R: S.R / 100, N, I: (sg * (S.Bint * 1e-3) * L) / (MU0 * N) }; }
        case 'solenoide': return { I: sg * S.I, N: S.N, L: S.L / 100, R: S.R / 100 };
        case 'espira': return { I: sg * S.I, R: S.R / 100 };
        case 'hilo': return { I: sg * S.I };
        default: return { I: S.I, d: S.d / 100, same: S.same };
      }
    }

    function buildSource() {
      stage.clear(gSrc);
      const curLines = [];
      const circle = (R, z, sg) => { const a = []; for (let i = 0; i <= 72; i++) { const th = (2 * Math.PI * i) / 72 * sg; a.push(R * Math.cos(th), R * Math.sin(th), z); } return new Float32Array(a); };
      const m = (geo, color, extra = {}) => new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.45, ...extra }));
      const p = params();
      const dirSign = p.I >= 0 ? 1 : -1;
      if (S.kind === 'iman') {
        const Lk = src.L * k, Rk = src.R * k;
        const n = m(new THREE.CylinderGeometry(Rk, Rk, Lk / 2, 40), 0xe0504f); n.rotation.x = Math.PI / 2; n.position.z = Lk / 4;
        const s = m(new THREE.CylinderGeometry(Rk, Rk, Lk / 2, 40), 0x4f7be0); s.rotation.x = Math.PI / 2; s.position.z = -Lk / 4;
        const tN = textSprite('N', { size: 0.8, color: '#fff' }); tN.position.set(0, -Rk - 0.2, Lk / 2 + 0.6);
        const tS = textSprite('S', { size: 0.8, color: '#fff' }); tS.position.set(0, -Rk - 0.2, -Lk / 2 - 0.6);
        gSrc.add(n, s, tN, tS);
        for (let i = 0; i < 6; i++) curLines.push({ pts: circle(Rk * 1.02, -Lk / 2 + (Lk * (i + 0.5)) / 6, 1) }); // corrientes amperianas
      } else if (S.kind === 'solenoide') {
        const turns = Math.min(src.meta.N, 22), Lk = src.L * k, Rk = src.R * k;
        const pts = [];
        for (let i = 0; i <= turns * 24; i++) { const t = i / (turns * 24), a = 2 * Math.PI * turns * t * dirSign; pts.push(new THREE.Vector3(Rk * Math.cos(a), Rk * Math.sin(a), -Lk / 2 + Lk * t)); }
        const tube = m(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), turns * 24 * 2, 0.045, 8), 0xd6a35c, { metalness: 0.7 });
        gSrc.add(tube);
        curLines.push({ pts: new Float32Array(pts.flatMap((q) => [q.x, q.y, q.z])) });
        gSrc.add(textSprite(`N = ${src.meta.N}`, { size: 0.5, color: '#d6a35c' }));
        gSrc.children[gSrc.children.length - 1].position.set(0, -Rk - 0.6, Lk / 2 + 0.5);
      } else if (S.kind === 'espira') {
        const Rk = src.R * k;
        gSrc.add(m(new THREE.TorusGeometry(Rk, 0.06, 14, 72), 0xd6a35c, { metalness: 0.7 }));
        curLines.push({ pts: circle(Rk, 0, dirSign) });
        for (let a = 0; a < 4; a++) {
          const th = (Math.PI / 2) * a + 0.4;
          gSrc.add(coneAt([Rk * Math.cos(th), Rk * Math.sin(th), 0], [-dirSign * Math.sin(th), dirSign * Math.cos(th), 0], { color: 0xffe066, size: 0.35 }));
        }
      } else {
        const xs = S.kind === 'hilo' ? [0] : [-src.meta.d / 2, src.meta.d / 2];
        xs.forEach((x, i) => {
          const sgn = S.kind === 'hilo' ? dirSign : i === 0 ? 1 : (src.meta.I2 >= 0 ? 1 : -1);
          const w = m(new THREE.CylinderGeometry(0.07, 0.07, 14, 16), 0xd6a35c, { metalness: 0.7 }); w.rotation.x = Math.PI / 2; w.position.x = x * k;
          gSrc.add(w);
          curLines.push({ pts: new Float32Array([x * k, 0, -7, x * k, 0, 7]), flip: sgn < 0 });
          for (const z of [-4, 0, 4]) gSrc.add(coneAt([x * k, 0, z - 0.2 * sgn], [0, 0, sgn], { color: 0xffe066, size: 0.45 }));
        });
      }
      flowI.setLines(curLines);
      flowI.setEnabled(curChk.get());
      stage.invalidate();
    }

    function buildLines() {
      stage.clear(gLines);
      const raw = sourceFieldLines(src, S.nLines, 8);
      const Bt = src.Bfast || src.B;
      const cache = new Map();
      const magOf = (ln) => {
        const key = ln.base !== undefined ? ln.base : null;
        if (key !== null && cache.has(key)) return cache.get(key);
        const n = ln.length / 3, out = new Float32Array(n);
        const logB = (i) => { const b = Bt(ln[3 * i], ln[3 * i + 1], ln[3 * i + 2]); return Math.log10(Math.hypot(b[0], b[1], b[2]) + 1e-15); };
        // |B| se evalúa cada 3 vértices y se interpola linealmente entre ellos
        let i0 = 0, v0 = logB(0);
        out[0] = v0;
        while (i0 < n - 1) {
          const i1 = Math.min(i0 + 3, n - 1), v1 = logB(i1);
          for (let j = i0 + 1; j <= i1; j++) out[j] = v0 + ((v1 - v0) * (j - i0)) / (i1 - i0);
          i0 = i1; v0 = v1;
        }
        if (key !== null) cache.set(key, out);
        return out;
      };
      const mags = raw.map(magOf);
      const all = [];
      for (const m of mags) for (let i = 0; i < m.length; i += 5) all.push(m[i]);
      all.sort((a, b) => a - b);
      const lo = all[Math.floor(all.length * 0.04)] ?? -9, hi = all[Math.floor(all.length * 0.96)] ?? -3;
      const flowLines = [];
      const wireInv = S.kind === 'hilo' && params().I < 0;
      raw.forEach((ln, idx) => {
        const n = ln.length / 3, pos = new Float32Array(ln.length), col = new Float32Array(ln.length), fac = new Float32Array(n);
        for (let i = 0; i < ln.length; i++) pos[i] = ln[i] * k;
        for (let i = 0; i < n; i++) {
          const tt = Math.min(1, Math.max(0, (mags[idx][i] - lo) / (hi - lo || 1)));
          col.set(plasma(0.15 + 0.85 * tt), 3 * i);
          fac[i] = 0.45 + 1.6 * tt;
        }
        flowLines.push({ pts: pos, fac, flip: wireInv });
        gLines.add(stage.fatLine(pos, { colors: col, width: 1.9 }));
        // flecha en el sentido de B
        const i0 = Math.floor(n * 0.3);
        if (i0 + 1 < n) {
          const b = src.B(ln[3 * i0], ln[3 * i0 + 1], ln[3 * i0 + 2]);
          gLines.add(coneAt([pos[3 * i0], pos[3 * i0 + 1], pos[3 * i0 + 2]], b, { color: 0xffffff, size: 0.28 }));
        }
      });
      gLines.visible = S.lines;
      flowB.setLines(flowLines);
      flowB.setEnabled(flowChk.get() && S.lines);
      stage.invalidate();
    }

    function buildArrows() {
      stage.clear(gArrows);
      const nG = 15, ext = 4.4 / k;
      const Bt = src.Bfast || src.B;
      const items = [];
      for (let j = 0; j < nG; j++) for (let i = 0; i < nG; i++) {
        const x = -ext + (2 * ext * i) / (nG - 1), z = -ext + (2 * ext * j) / (nG - 1);
        const b = Bt(x, 0, z), m = Math.hypot(b[0], b[1], b[2]);
        items.push({ x, z, b, m });
      }
      const logs = items.map((a) => Math.log10(a.m + 1e-15)).sort((a, b) => a - b);
      const lo = logs[Math.floor(logs.length * 0.05)], hi = logs[Math.floor(logs.length * 0.95)];
      for (const a of items) {
        if (!(a.m > 0)) continue;
        const c = plasma(0.1 + 0.9 * ((Math.log10(a.m) - lo) / (hi - lo || 1)));
        gArrows.add(coneAt([a.x * k, 0, a.z * k], a.b, { color: new THREE.Color(c[0], c[1], c[2]), size: 0.28 }));
      }
      gArrows.visible = S.arrows;
      stage.invalidate();
    }

    function rebuildProbe() {
      stage.clear(gProbe);
      const [x, y, z] = S.probe.map((v) => v / 100);
      const b = src.B(x, y, z), bm = Math.hypot(...b);
      const sph = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      sph.position.set(x * k, y * k, z * k);
      gProbe.add(sph);
      if (bm > 0) {
        needle.target.set(b[0], b[1], b[2]).normalize();
        needle.arrow = new THREE.ArrowHelper(needle.n.clone(), new THREE.Vector3(x * k, y * k, z * k), 1.8, 0x7ae582, 0.5, 0.3);
        gProbe.add(needle.arrow);
        const back = new THREE.ArrowHelper(needle.n.clone().negate(), new THREE.Vector3(x * k, y * k, z * k), 1.1, 0x5a6b8f, 0.01, 0.01);
        needle.back = back; gProbe.add(back);
      } else needle.arrow = null;
      gProbe.visible = S.compass;
      // lecturas
      const f = (v) => si(v, 'T', 3);
      let th = ['—', ''], extra = ['', ''];
      const rho = Math.hypot(x, y), p = params();
      if (S.kind === 'hilo') { const t = theory.wire(Math.abs(p.I), rho); th = [f(t), 'μ₀I / (2πρ)']; }
      else if (S.kind === 'espira') { if (rho < 1e-6) th = [f(Math.abs(theory.loopAxis(p.I, p.R, z))), 'μ₀IR²/2(R²+z²)^{3/2} (sobre el eje)']; else th = ['—', 'fuera del eje: sólo numérico']; }
      else if (S.kind === 'solenoide' || S.kind === 'iman') {
        if (Math.hypot(x, y, z) < 1e-6) th = [f(theory.solenoidCenter(p.N, p.L, p.R, Math.abs(p.I))), 'centro del solenoide finito'];
        else th = [f(theory.solenoidInfinite(p.N, p.L, Math.abs(p.I))), 'B ideal interior μ₀NI/L'];
      } else { extra = [`F/L = ${si(Math.abs(src.meta.F), 'N/m', 3)}`, src.meta.F > 0 ? 'atracción (corrientes paralelas)' : 'repulsión (corrientes opuestas)']; }
      ro.update({ B: [f(bm), ''], comp: [`${si(b[0], 'T', 2)}, ${si(b[1], 'T', 2)}, ${si(b[2], 'T', 2)}`, ''], th, extra });
      stage.invalidate();
    }

    function rebuild() {
      src = makeSource(S.kind, params());
      k = 3 / src.scale;
      stage.clear(axesGrp);
      axesGrp.add(axesWithGrid(8, { labels: true }));
      hud.textContent = `Escala: 1 unidad de la escena = ${si(1 / k, 'm', 2)} · ${KINDS.find((q) => q.value === S.kind).label}`;
      buildSource(); buildLines(); buildArrows(); rebuildProbe();
    }
    const rebuildSoon = debounce(rebuild, 70);

    syncVisibility();
    rebuild();
    // brújula con inercia: oscila y se alinea con B (sistema masa–resorte amortiguado)
    stage.onFrame((dt) => {
      if (!needle.arrow) return;
      const d = Math.min(dt, 0.04);
      const acc = needle.target.clone().sub(needle.n).multiplyScalar(60).addScaledVector(needle.w, -5);
      needle.w.addScaledVector(acc, d);
      needle.n.addScaledVector(needle.w, d).normalize();
      needle.arrow.setDirection(needle.n);
      if (needle.back) needle.back.setDirection(needle.n.clone().negate());
      stage.invalidate();
    });

    return { destroy() { flowB.dispose(); flowI.dispose(); stage.dispose(); } };
  },
};
