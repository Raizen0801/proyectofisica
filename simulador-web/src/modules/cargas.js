// Unidad 1 · Módulo 1: Visualizador de cargas puntuales (campo E, líneas de campo, equipotenciales).
import { Stage, THREE, textSprite, axesWithGrid, plasma, coneAt } from '../ui/scene3d.js';
import { h, group, slider, check, segmented, button, readouts, modTitle, rafThrottle, debounce } from '../ui/dom.js';
import { chargeTable } from '../ui/chargeTable.js';
import { store, COLORS } from '../store.js';
import { fieldAt, potentialAt, fieldLines, systemEnergy, potentialGrid } from '../physics/electrostatics.js';
import { marchingSquares, marchingTetrahedra } from '../geometry/contours.js';
import { buildPotentialMap } from '../geometry/potentialMap.js';
import { si, sci } from '../ui/format.js';
import { FlowParticles } from '../ui/flow.js';

const L = 6; // semilado del dominio (m)
const MAX_TEST = 36;

export default {
  id: 'cargas', unidad: 1, icono: '⊕', titulo: 'Visualizador de cargas', corto: 'Campo, líneas y equipotenciales',
  mount(root) {
    const S = { mode3d: true, lines: true, nLines: 36, equip: true, nEq: 3, level: 25, map: false, slice: 0, arrows: false, zero: true, flow: true, testSign: 1 };

    const viewport = h('div', { class: 'viewport' });
    const stage = new Stage(viewport);
    stage.scene.add(axesWithGrid(L, { labels: true }));
    const gCharges = new THREE.Group(), gLines = new THREE.Group(), gEquip = new THREE.Group(), gMap = new THREE.Group(), gArrows = new THREE.Group(), gTest = new THREE.Group();
    stage.scene.add(gCharges, gLines, gEquip, gMap, gArrows, gTest);
    const flow = new FlowParticles(stage, { size: 0.26, color: 0xfff1a8, spacing: 1.25, speed: 2.4 });
    const halos = []; // halos pulsantes de las cargas
    const gridHelper = stage.scene.children.find((o) => o.isGroup && o.children.some((c) => c.isGridHelper));

    // ----- HUD -----
    const probeHud = h('div', { class: 'hud' }, 'Pasa el cursor sobre el plano de corte');
    const infoHud = h('div', { class: 'hud' });
    viewport.append(h('div', { class: 'hud-bottom' }, probeHud, infoHud));

    // ----- controles -----
    const viewSeg = segmented([{ value: '3d', label: 'Vista 3D' }, { value: '2d', label: 'Vista 2D' }], '3d', (v) => {
      S.mode3d = v === '3d';
      stage.setView2D(!S.mode3d, 15);
      if (!S.mode3d) { S.map = true; mapChk.set(true); }
      table.refresh();
      rebuildAll();
      updateVisibility();
    });
    const linesChk = check({ label: 'Líneas de campo eléctrico', value: S.lines, onInput: (v) => { S.lines = v; updateVisibility(); } });
    const nLinesSl = slider({ label: 'Cantidad de líneas', min: 8, max: 120, step: 2, value: S.nLines, fmt: (v) => `${v}`, onInput: debounce((v) => { S.nLines = v; rebuildLines(); }, 60) });
    const equipChk = check({ label: 'Equipotenciales (superficies en 3D, curvas en 2D)', value: S.equip, onInput: (v) => { S.equip = v; updateVisibility(); } });
    const nEqSl = slider({ label: 'Cantidad de niveles', min: 1, max: 5, step: 1, value: S.nEq, fmt: (v) => `${v}`, onInput: debounce((v) => { S.nEq = v; rebuildEquip(); }, 60) });
    const levelSl = slider({ label: 'Nivel de |V| de la superficie (3D)', min: 1, max: 3000, value: S.level, log: true, unit: 'V', digits: 3, onInput: debounce((v) => { S.level = v; rebuildEquip(); }, 80) });
    const zeroChk = check({ label: 'Mostrar superficie V = 0', value: S.zero, onInput: (v) => { S.zero = v; rebuildEquip(); } });
    const mapChk = check({ label: 'Mapa de potencial en plano de corte', value: S.map, onInput: (v) => { S.map = v; updateVisibility(); } });
    const sliceSl = slider({ label: 'Altura del plano de corte z', min: -L, max: L, step: 0.1, value: 0, unit: 'm', onInput: debounce((v) => { S.slice = v; rebuildMap(); rebuildArrows(); }, 50) });
    const arrowsChk = check({ label: 'Vectores E en el plano de corte', value: S.arrows, onInput: (v) => { S.arrows = v; updateVisibility(); } });
    const resetBtn = button('Restablecer cámara', () => stage.setView2D(!S.mode3d, 15), 'small');
    const flowChk = check({ label: 'Animar el flujo del campo (partículas sobre las líneas)', value: S.flow, onInput: (v) => { S.flow = v; updateVisibility(); } });
    const signSeg = segmented([{ value: '1', label: '+ positiva' }, { value: '-1', label: '− negativa' }], '1', (v) => { S.testSign = parseInt(v, 10); });
    const releaseBtn = button('Soltar 10 al azar', () => { for (let i = 0; i < 10; i++) release((Math.random() * 2 - 1) * 5, (Math.random() * 2 - 1) * 5, S.mode3d ? (Math.random() * 2 - 1) * 3 : 0, S.testSign); }, 'small');
    const clearBtn = button('Quitar', () => { clearTests(); }, 'small');

    const table = chargeTable({ get2d: () => !S.mode3d });
    const ro = readouts([
      { key: 'Q', label: 'Carga neta' }, { key: 'U', label: 'Energía del sistema' },
      { key: 'V0', label: 'V en el origen' }, { key: 'E0', label: '|E| en el origen' },
    ]);

    const controls = h('aside', { class: 'controls' },
      modTitle('Visualizador de cargas puntuales', 'Coloca hasta 10 cargas, arrástralas con el ratón y observa el campo eléctrico, sus líneas y las superficies equipotenciales.', ['Unidad 1', '2D / 3D']),
      group('Vista', h('div', { class: 'row wrap' }, viewSeg.el, resetBtn)),
      group('Animación', flowChk.el,
        h('div', { class: 'field' }, h('span', { class: 'lbl' }, h('span', {}, 'Carga de prueba (haz clic en el plano para soltarla)')), signSeg.el),
        h('div', { class: 'row wrap' }, releaseBtn, clearBtn),
        h('p', { class: 'note' }, 'Las cargas de prueba obedecen F = qE (con algo de fricción para que sigan las líneas): las positivas son repelidas por las positivas y atraídas por las negativas.')),
      group('Capas', linesChk.el, nLinesSl.el, equipChk.el, nEqSl.el, levelSl.el, zeroChk.el, mapChk.el, sliceSl.el, arrowsChk.el),
      table.el,
      group('Resumen del sistema', ro.el),
      h('p', { class: 'note' }, 'Ley de Coulomb: E = k Σ qᵢ (r − rᵢ)/|r − rᵢ|³ y V = k Σ qᵢ/|r − rᵢ|. Las líneas salen de las cargas positivas y entran en las negativas; su densidad es proporcional a |E|.'),
    );
    root.append(h('div', { class: 'mod' }, controls, h('div', { class: 'stage' }, viewport)));

    // ----- construcción de la escena -----
    const chargesSI = () => store.si({ flat2d: !S.mode3d });

    function rebuildCharges() {
      stage.clear(gCharges);
      halos.length = 0;
      for (const c of store.charges) {
        const r = 0.14 + 0.07 * Math.cbrt(Math.abs(c.q));
        const m = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 18),
          new THREE.MeshStandardMaterial({ color: c.q >= 0 ? COLORS.pos : COLORS.neg, emissive: c.q >= 0 ? 0x661111 : 0x113366, roughness: 0.35 }));
        m.position.set(c.x, c.y, S.mode3d ? c.z : 0);
        m.userData.id = c.id;
        gCharges.add(m);
        // halo translúcido que "respira" (intensidad según |q|)
        const halo = new THREE.Mesh(new THREE.SphereGeometry(r * 1.9, 20, 14), new THREE.MeshBasicMaterial({ color: c.q >= 0 ? 0xff6b6b : 0x5aa9ff, transparent: true, opacity: 0.18, depthWrite: false }));
        halo.position.copy(m.position);
        halo.raycast = () => {}; // el halo es sólo visual: no debe capturar el ratón
        halo.userData.base = r * 1.9; halo.userData.sign = c.q >= 0 ? 1 : -1;
        gCharges.add(halo);
        halos.push(halo);
        const lab = textSprite(`${c.q > 0 ? '+' : ''}${+c.q.toFixed(2)} nC`, { size: 0.36, color: '#ffffff' });
        lab.position.set(c.x, c.y, (S.mode3d ? c.z : 0) + r + 0.34);
        gCharges.add(lab);
      }
      stage.invalidate();
    }

    function rebuildLines() {
      stage.clear(gLines);
      const ch = chargesSI();
      if (!ch.length) return;
      const lines = fieldLines(ch, { total: S.nLines, mode3d: S.mode3d, h: 0.06, bound: 11, r0: 0.16 });
      // escala de color: log|E|
      const samples = [];
      const ecache = lines.map((ln) => {
        const out = new Float32Array(ln.points.length / 3);
        for (let i = 0; i < out.length; i++) { const e = fieldAt(ch, ln.points[3 * i], ln.points[3 * i + 1], ln.points[3 * i + 2], 1e-6); out[i] = Math.log10(Math.hypot(e[0], e[1], e[2]) + 1e-9); if (i % 7 === 0) samples.push(out[i]); }
        return out;
      });
      samples.sort((a, b) => a - b);
      const lo = samples[Math.floor(samples.length * 0.05)] ?? 0, hi = samples[Math.floor(samples.length * 0.95)] ?? 1;
      const flowLines = [];
      lines.forEach((ln, k) => {
        const n = ln.points.length / 3;
        const col = new Float32Array(n * 3), fac = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          const t = Math.min(1, Math.max(0, (ecache[k][i] - lo) / (hi - lo || 1)));
          col.set(plasma(0.15 + 0.85 * t), 3 * i);
          fac[i] = 0.45 + 1.6 * t; // las partículas aceleran donde el campo es más intenso
        }
        flowLines.push({ pts: ln.points, flip: ln.sourceCharge.q < 0, fac });
        gLines.add(stage.fatLine(ln.points, { colors: col, width: 1.8 }));
        // punta de flecha a ~45 % de la longitud
        const i0 = Math.max(1, Math.floor(n * 0.45));
        const p0 = [ln.points[3 * i0], ln.points[3 * i0 + 1], ln.points[3 * i0 + 2]];
        const p1 = [ln.points[3 * i0 + 3], ln.points[3 * i0 + 4], ln.points[3 * i0 + 5]];
        const sgn = ln.sourceCharge.q > 0 ? 1 : -1;
        gLines.add(coneAt(p0, [sgn * (p1[0] - p0[0]), sgn * (p1[1] - p0[1]), sgn * (p1[2] - p0[2])], { color: 0xffffff, size: 0.22 }));
      });
      flow.setLines(flowLines);
      flow.setEnabled(S.flow && S.lines);
      stage.invalidate();
    }

    function rebuildMap() {
      stage.clear(gMap);
      const ch = chargesSI();
      if (!ch.length) return;
      const z = S.mode3d ? S.slice : 0;
      const map = buildPotentialMap(ch, L, z, 200);
      rebuildMap.last = map;
      const tex = new THREE.DataTexture(map.rgba, map.n, map.n, THREE.RGBAFormat);
      tex.needsUpdate = true; tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter; tex.colorSpace = THREE.SRGBColorSpace;
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(2 * L, 2 * L), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: S.mode3d ? 0.62 : 0.95, depthWrite: false, side: THREE.DoubleSide }));
      plane.position.z = z - 0.001;
      plane.userData.isMap = true;
      gMap.add(plane);
      // curvas equipotenciales sobre el plano
      const levels = map.levels(S.nEq * (S.mode3d ? 2 : 3));
      for (const lv of levels) {
        const seg = marchingSquares(map.vals, map.n, map.n, lv, -L, L, -L, L);
        if (!seg.length) continue;
        const pos = new Float32Array((seg.length / 4) * 6);
        for (let i = 0, j = 0; i < seg.length; i += 4, j += 6) { pos[j] = seg[i]; pos[j + 1] = seg[i + 1]; pos[j + 2] = z + 0.004; pos[j + 3] = seg[i + 2]; pos[j + 4] = seg[i + 3]; pos[j + 5] = z + 0.004; }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const col = lv === 0 ? 0xffffff : lv > 0 ? 0xffd0a0 : 0xa8dcff;
        gMap.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: lv === 0 ? 0.9 : 0.55, depthWrite: false })));
      }
      gMap.visible = S.map || !S.mode3d;
      stage.invalidate();
    }

    function rebuildEquip() {
      stage.clear(gEquip);
      if (!S.mode3d) { rebuildMap(); return; }
      const ch = chargesSI();
      if (!ch.length) return;
      const n = 42;
      const vals = new Float32Array(n * n * n);
      for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        vals[(k * n + j) * n + i] = potentialAt(ch, -L + (2 * L * i) / (n - 1), -L + (2 * L * j) / (n - 1), -L + (2 * L * k) / (n - 1), 1e-3);
      }
      let vmin = Infinity, vmax = -Infinity;
      for (const v of vals) { if (v < vmin) vmin = v; if (v > vmax) vmax = v; }
      const specs = [];
      for (let i = 0; i < S.nEq; i++) {
        const v = S.level * Math.pow(2, i);
        if (vmax > v) specs.push({ v, color: 0xff6b6b });
        if (vmin < -v) specs.push({ v: -v, color: 0x5aa9ff });
      }
      if (S.zero && vmin < 0 && vmax > 0) specs.push({ v: 0, color: 0x4ade80, op: 0.16 });
      for (const sp of specs) {
        const tris = marchingTetrahedra(vals, n, sp.v, L);
        if (!tris.length) continue;
        const nTri = tris.length / 9;
        const nor = new Float32Array(tris.length);
        for (let t = 0; t < nTri; t++) {
          let nx = 0, ny = 0, nz = 0;
          for (let k = 0; k < 3; k++) {
            const o = 9 * t + 3 * k;
            const e = fieldAt(ch, tris[o], tris[o + 1], tris[o + 2], 1e-3);
            const m = Math.hypot(e[0], e[1], e[2]) || 1;
            nor[o] = -e[0] / m; nor[o + 1] = -e[1] / m; nor[o + 2] = -e[2] / m; // ∇V = −E
            nx += nor[o]; ny += nor[o + 1]; nz += nor[o + 2];
          }
          // orientar el triángulo de acuerdo con la normal analítica
          const o = 9 * t;
          const ax = tris[o + 3] - tris[o], ay = tris[o + 4] - tris[o + 1], az = tris[o + 5] - tris[o + 2];
          const bx = tris[o + 6] - tris[o], by = tris[o + 7] - tris[o + 1], bz = tris[o + 8] - tris[o + 2];
          const gx = ay * bz - az * by, gy = az * bx - ax * bz, gz = ax * by - ay * bx;
          if (gx * nx + gy * ny + gz * nz < 0) {
            for (let c = 0; c < 3; c++) { const tmp = tris[o + 3 + c]; tris[o + 3 + c] = tris[o + 6 + c]; tris[o + 6 + c] = tmp; const tn = nor[o + 3 + c]; nor[o + 3 + c] = nor[o + 6 + c]; nor[o + 6 + c] = tn; }
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(tris, 3));
        g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
        gEquip.add(new THREE.Mesh(g, new THREE.MeshPhongMaterial({ color: sp.color, transparent: true, opacity: sp.op ?? 0.3, side: THREE.DoubleSide, depthWrite: false, shininess: 70, specular: 0x666666 })));
      }
      stage.invalidate();
    }

    function rebuildArrows() {
      stage.clear(gArrows);
      const ch = chargesSI();
      if (!ch.length) return;
      const z = S.mode3d ? S.slice : 0;
      const nG = 13, step = (2 * L) / (nG - 1);
      const es = [];
      for (let j = 0; j < nG; j++) for (let i = 0; i < nG; i++) {
        const x = -L + i * step, y = -L + j * step;
        const e = fieldAt(ch, x, y, z, 1e-2);
        es.push({ x, y, e, m: Math.hypot(e[0], e[1], e[2]) });
      }
      const logs = es.map((a) => Math.log10(a.m + 1e-9)).sort((a, b) => a - b);
      const lo = logs[Math.floor(logs.length * 0.05)], hi = logs[Math.floor(logs.length * 0.95)];
      for (const a of es) {
        if (a.m === 0) continue;
        const col = plasma(0.15 + 0.85 * ((Math.log10(a.m + 1e-9) - lo) / (hi - lo || 1)));
        const cone = coneAt([a.x, a.y, z + 0.02], a.e, { color: new THREE.Color(col[0], col[1], col[2]), size: 0.5 });
        gArrows.add(cone);
      }
      stage.invalidate();
    }

    function updateVisibility() {
      gLines.visible = S.lines;
      flow.setEnabled(S.flow && S.lines);
      gEquip.visible = S.equip && S.mode3d;
      gMap.visible = S.map || !S.mode3d;
      gMap.children.forEach((c) => { if (!c.userData.isMap) c.visible = S.equip; });
      gArrows.visible = S.arrows;
      levelSl.el.style.display = S.mode3d ? '' : 'none';
      zeroChk.el.style.display = S.mode3d ? '' : 'none';
      sliceSl.el.style.display = S.mode3d ? '' : 'none';
      if (gridHelper) gridHelper.visible = S.mode3d;
      stage.invalidate();
    }

    function rebuildSummary() {
      const ch = chargesSI();
      const Q = store.charges.reduce((s, c) => s + c.q, 0);
      ro.update({
        Q: [`${+Q.toFixed(3)} nC`, `${store.charges.length} carga(s)`],
        U: [ch.length > 1 ? si(systemEnergy(ch), 'J') : '0 J', ch.length > 1 ? 'Σ k qᵢqⱼ / rᵢⱼ' : 'se necesitan 2 cargas'],
        V0: [si(potentialAt(ch, 0, 0, 0, 1e-3), 'V'), ''],
        E0: [si(Math.hypot(...fieldAt(ch, 0, 0, 0, 1e-3)), 'V/m'), ''],
      });
      infoHud.textContent = S.mode3d ? 'Arrastra una carga para moverla · rueda: zoom' : 'Vista 2D · arrastra cargas · rueda: zoom';
    }

    const rebuildAllNow = () => { rebuildCharges(); rebuildLines(); rebuildEquip(); if (S.mode3d) rebuildMap(); rebuildArrows(); updateVisibility(); rebuildSummary(); };
    const rebuildAll = rebuildAllNow;
    const rebuildAllDebounced = debounce(rebuildAllNow, 90);
    const rebuildDrag = rafThrottle(() => { rebuildCharges(); rebuildLines(); rebuildMap(); rebuildArrows(); updateVisibility(); rebuildSummary(); });

    const unsub = store.subscribe((kind) => {
      if (kind === 'structure' || kind === 'commit') rebuildAllNow();
      else if (kind === 'drag') rebuildDrag();
      else rebuildAllDebounced();
    });

    // ----- interacción: arrastrar cargas y sondear el plano -----
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const canvas = stage.canvas;
    const setRay = (ev) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, stage.camera);
    };
    let drag = null, downAt = null;
    canvas.addEventListener('pointerdown', (ev) => {
      if (ev.button !== 0) return;
      setRay(ev);
      const hit = ray.intersectObjects(gCharges.children.filter((o) => o.isMesh), false)[0];
      if (!hit) return;
      ev.stopImmediatePropagation();
      stage.controls.enabled = false;
      const c = store.charges.find((k) => k.id === hit.object.userData.id);
      if (!c) { stage.controls.enabled = true; return; }
      drag = { id: c.id, plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), -(S.mode3d ? c.z : 0)) };
      downAt = null; // arrastrar una carga no suelta una carga de prueba
      canvas.setPointerCapture(ev.pointerId);
      canvas.style.cursor = 'grabbing';
    }, { capture: true });
    canvas.addEventListener('pointermove', (ev) => {
      setRay(ev);
      if (drag) {
        const p = new THREE.Vector3();
        if (ray.ray.intersectPlane(drag.plane, p)) {
          const cl = (v) => Math.max(-L, Math.min(L, Math.round(v * 20) / 20));
          store.update(drag.id, { x: cl(p.x), y: cl(p.y) }, 'drag');
        }
        return;
      }
      // sonda
      const hitC = ray.intersectObjects(gCharges.children.filter((o) => o.isMesh), false)[0];
      canvas.style.cursor = hitC ? 'grab' : 'default';
      if (!(S.map || !S.mode3d)) return;
      const z = S.mode3d ? S.slice : 0;
      const p = new THREE.Vector3();
      if (ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), -z), p) && Math.abs(p.x) <= L && Math.abs(p.y) <= L) {
        const ch = chargesSI();
        const E = fieldAt(ch, p.x, p.y, z, 1e-3);
        probeHud.textContent = `(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${z.toFixed(2)}) m  ·  V = ${si(potentialAt(ch, p.x, p.y, z, 1e-3), 'V')}  ·  |E| = ${si(Math.hypot(...E), 'V/m')}`;
      }
    });
    const endDrag = (ev) => {
      if (!drag) return;
      drag = null; stage.controls.enabled = true; canvas.style.cursor = 'default';
      try { canvas.releasePointerCapture(ev.pointerId); } catch { /* ya liberado */ }
      store.emit('commit');
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    // ----- cargas de prueba: F = qE con fricción (se sueltan con un clic) -----
    const tests = [];
    const testGeo = new THREE.SphereGeometry(0.11, 14, 10);
    function release(x, y, z, sign) {
      if (tests.length >= MAX_TEST) { const old = tests.shift(); stage.free(old.group); }
      const col = sign > 0 ? 0xffd34d : 0x4de1d1;
      const group = new THREE.Group();
      const body = new THREE.Mesh(testGeo, new THREE.MeshBasicMaterial({ color: col }));
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 8), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.25, depthWrite: false }));
      const N = 48;
      const tg = new THREE.BufferGeometry();
      tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3 * N), 3));
      tg.setDrawRange(0, 0);
      const trail = new THREE.Line(tg, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.7 }));
      trail.frustumCulled = false;
      group.add(body, glow, trail);
      gTest.add(group);
      tests.push({ x, y, z, vx: 0, vy: 0, vz: 0, sign, body, glow, trail, group, n: 0, N, age: 0 });
      stage.invalidate();
    }
    function clearTests() { while (tests.length) stage.free(tests.pop().group); stage.invalidate(); }

    canvas.addEventListener('pointerdown', (ev) => { downAt = ev.button === 0 && !drag ? [ev.clientX, ev.clientY] : null; });
    canvas.addEventListener('pointerup', (ev) => {
      if (!downAt || Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) > 5) { downAt = null; return; }
      downAt = null;
      setRay(ev);
      const z = S.mode3d ? S.slice : 0, p = new THREE.Vector3();
      if (ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), -z), p) && Math.abs(p.x) <= L && Math.abs(p.y) <= L) release(p.x, p.y, z, S.testSign);
    });
    let tclock = 0;
    stage.onFrame((dt) => {
      tclock += dt;
      // halos pulsantes
      for (const hl of halos) { const s = 1 + 0.14 * Math.sin(tclock * 3 + hl.userData.sign); hl.scale.setScalar(s); hl.material.opacity = 0.14 + 0.07 * (0.5 + 0.5 * Math.sin(tclock * 3)); }
      if (halos.length) stage.invalidate();
      if (!tests.length) return;
      const ch = chargesSI();
      const sub = 4, h = Math.min(dt, 0.05) / sub;
      for (let ti = tests.length - 1; ti >= 0; ti--) {
        const t = tests[ti];
        for (let s = 0; s < sub; s++) {
          const e = fieldAt(ch, t.x, t.y, t.z, 0.06);
          const m = Math.hypot(e[0], e[1], e[2]) || 1;
          const a = 5 * Math.min(m / 9, 3) * t.sign; // m/s² de la escena
          t.vx += (a * e[0] / m) * h; t.vy += (a * e[1] / m) * h; t.vz += S.mode3d ? (a * e[2] / m) * h : 0;
          const damp = Math.exp(-0.35 * h);
          t.vx *= damp; t.vy *= damp; t.vz *= damp;
          t.x += t.vx * h; t.y += t.vy * h; t.z += t.vz * h;
          if (!S.mode3d) t.z = 0;
        }
        t.age += dt;
        let dead = Math.abs(t.x) > L * 1.6 || Math.abs(t.y) > L * 1.6 || Math.abs(t.z) > L * 1.6 || t.age > 40;
        for (const c of ch) if (Math.hypot(t.x - c.x, t.y - c.y, t.z - c.z) < 0.2) dead = true;
        if (dead) { stage.free(t.group); tests.splice(ti, 1); continue; }
        t.body.position.set(t.x, t.y, t.z); t.glow.position.copy(t.body.position);
        const arr = t.trail.geometry.attributes.position.array;
        if (t.n < t.N) t.n++; else arr.copyWithin(0, 3, 3 * t.N);
        arr.set([t.x, t.y, t.z], 3 * (t.n - 1));
        t.trail.geometry.attributes.position.needsUpdate = true;
        t.trail.geometry.setDrawRange(0, t.n);
      }
      stage.invalidate();
    });

    rebuildAllNow();
    updateVisibility();

    return {
      destroy() { unsub(); table.destroy(); flow.dispose(); stage.dispose(); },
      stage, // para pruebas
    };
  },
};
