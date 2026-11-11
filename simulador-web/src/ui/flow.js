// Partículas animadas que fluyen a lo largo de polilíneas 3D (líneas de campo, conductores con corriente...).
import { THREE } from './scene3d.js';

let spriteTex = null;
function sprite() {
  if (spriteTex) return spriteTex;
  const cv = document.createElement('canvas');
  cv.width = cv.height = 64;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
  spriteTex = new THREE.CanvasTexture(cv);
  return spriteTex;
}

export class FlowParticles {
  /**
   * @param opts { size, color, spacing, speed, maxPerLine, loop }
   */
  constructor(stage, { size = 0.2, color = 0xffffff, spacing = 1.4, speed = 2.2, maxPerLine = 14 } = {}) {
    this.stage = stage;
    this.size = size; this.color = new THREE.Color(color);
    this.spacing = spacing; this.speed = speed; this.maxPerLine = maxPerLine;
    this.lines = []; this.parts = [];
    this.enabled = true;
    this.points = null;
    this.off = stage.onFrame((dt) => this.tick(dt));
  }

  /** lines: [{ pts: Float32Array (x,y,z...), flip?: bool, fac?: Float32Array (factor de velocidad por vértice), loop?: bool }] */
  setLines(lines) {
    this.dispose(false);
    this.lines = [];
    this.parts = [];
    for (const ln of lines) {
      const n = ln.pts.length / 3;
      if (n < 3) continue;
      const cum = new Float32Array(n);
      for (let i = 1; i < n; i++) {
        cum[i] = cum[i - 1] + Math.hypot(ln.pts[3 * i] - ln.pts[3 * i - 3], ln.pts[3 * i + 1] - ln.pts[3 * i - 2], ln.pts[3 * i + 2] - ln.pts[3 * i - 1]);
      }
      const total = cum[n - 1];
      if (total < 1e-6) continue;
      const L = { pts: ln.pts, cum, total, n, flip: !!ln.flip, fac: ln.fac || null };
      const cnt = Math.min(this.maxPerLine, Math.max(1, Math.round(total / this.spacing)));
      const idx = this.lines.push(L) - 1;
      const phase = Math.random();
      for (let k = 0; k < cnt; k++) this.parts.push({ line: idx, u: ((k + phase) / cnt) * total, i: 0 });
    }
    const N = this.parts.length;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3 * N), 3));
    const mat = new THREE.PointsMaterial({ size: this.size, map: sprite(), color: this.color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    this.points.visible = this.enabled;
    this.stage.scene.add(this.points);
    this.place(0);
  }

  setEnabled(on) { this.enabled = on; if (this.points) this.points.visible = on; this.stage.invalidate(); }

  place(dt) {
    if (!this.points) return;
    const pos = this.points.geometry.attributes.position.array;
    for (let k = 0; k < this.parts.length; k++) {
      const p = this.parts[k], L = this.lines[p.line];
      if (dt > 0) {
        const f = L.fac ? L.fac[Math.min(L.n - 1, p.i)] : 1;
        p.u += this.speed * f * dt;
        if (p.u >= L.total) { p.u -= L.total; p.i = 0; }
      }
      const s = L.flip ? L.total - p.u : p.u;
      // búsqueda del segmento (puntero que sólo retrocede cuando se reinicia)
      let i = Math.min(p.i, L.n - 2);
      if (L.flip) { i = 0; let lo = 0, hi = L.n - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (L.cum[m] <= s) lo = m; else hi = m; } i = lo; }
      else { while (i < L.n - 2 && L.cum[i + 1] < s) i++; if (L.cum[i] > s) i = 0; while (i < L.n - 2 && L.cum[i + 1] < s) i++; }
      p.i = L.flip ? L.n - 1 - i : i;
      const seg = L.cum[i + 1] - L.cum[i] || 1, w = (s - L.cum[i]) / seg;
      pos[3 * k] = L.pts[3 * i] + w * (L.pts[3 * i + 3] - L.pts[3 * i]);
      pos[3 * k + 1] = L.pts[3 * i + 1] + w * (L.pts[3 * i + 4] - L.pts[3 * i + 1]);
      pos[3 * k + 2] = L.pts[3 * i + 2] + w * (L.pts[3 * i + 5] - L.pts[3 * i + 2]);
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.stage.invalidate();
  }

  tick(dt) { if (this.enabled && this.points) this.place(dt); }

  dispose(all = true) {
    if (this.points) { this.stage.free(this.points); this.points = null; }
    if (all) this.off();
  }
}
