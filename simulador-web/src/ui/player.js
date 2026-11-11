// Reproductor de trayectorias 3D: ruta completa tenue, estela animada, partícula y vector velocidad.
import { THREE, plasma } from './scene3d.js';
import { h, button, select } from './dom.js';
import { si } from './format.js';

/** Número "agradable" (1, 2, 5 × 10^k) mayor o igual a v. */
export function niceCeil(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

export class TrajectoryPlayer {
  constructor(stage, { duration = 9, particleColor = 0xffe066 } = {}) {
    this.stage = stage;
    this.group = new THREE.Group();
    stage.scene.add(this.group);
    this.frac = 0; this.playing = false; this.speed = 1; this.duration = duration;
    this.particleColor = particleColor;
    this.listeners = new Set();
    this.showVel = true;
    this.forceFn = null; // (r, v) => [Fx, Fy, Fz] en N; se dibuja como flecha roja
    this.off = stage.onFrame((dt) => this.tick(dt));
  }

  onChange(cb) { this.listeners.add(cb); return () => this.listeners.delete(cb); }

  /** run: { t, pos, vel } en SI; u = metros por unidad de escena. */
  load(run, u) {
    this.stage.clear(this.group);
    this.run = run; this.u = u;
    const N = run.t.length;
    const pos = new Float32Array(3 * N), col = new Float32Array(3 * N), dim = new Float32Array(3 * N);
    let smax = 0, smin = Infinity;
    const sp = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      pos[3 * i] = run.pos[3 * i] / u; pos[3 * i + 1] = run.pos[3 * i + 1] / u; pos[3 * i + 2] = run.pos[3 * i + 2] / u;
      sp[i] = Math.hypot(run.vel[3 * i], run.vel[3 * i + 1], run.vel[3 * i + 2]);
      smax = Math.max(smax, sp[i]); smin = Math.min(smin, sp[i]);
    }
    for (let i = 0; i < N; i++) {
      const c = plasma(0.25 + 0.7 * ((sp[i] - smin) / (smax - smin || 1)));
      col.set(c, 3 * i); dim.set(c.map((x) => x * 0.55), 3 * i);
    }
    this.pos = pos;
    this.full = this.stage.fatLine(pos, { colors: dim, width: 1.4, opacity: 0.45 });
    this.trail = this.stage.fatLine(pos, { colors: col, width: 3.4 });
    this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshStandardMaterial({ color: this.particleColor, emissive: 0x665500, roughness: 0.3 }));
    this.arrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1.5, 0x7ae582, 0.35, 0.2);
    this.farrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), 1.5, 0xff5c7a, 0.35, 0.2);
    this.group.add(this.full, this.trail, this.sphere, this.arrow, this.farrow);
    // marcador de inicio
    const start = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    start.position.set(pos[0], pos[1], pos[2]);
    this.group.add(start);
    this.render();
  }

  /** Centra los controles orbitales en la caja de la trayectoria, conservando el ángulo de la cámara. */
  focus() {
    if (!this.pos) return;
    const p = this.pos, lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[i + k]); hi[k] = Math.max(hi[k], p[i + k]); }
    const c = new THREE.Vector3((lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2);
    const prev = this.stage.controls.target.clone();
    this.stage.controls.target.copy(c);
    this.stage.camera.position.add(c.clone().sub(prev));
    this.stage.controls.update();
    this.stage.invalidate();
  }

  get T() { return this.run ? this.run.t[this.run.t.length - 1] : 0; }

  play() { if (this.frac >= 1) this.frac = 0; this.playing = true; this.emit(); }
  pause() { this.playing = false; this.emit(); }
  restart() { this.frac = 0; this.playing = true; this.render(); this.emit(); }
  seek(f) { this.frac = Math.min(1, Math.max(0, f)); this.render(); this.emit(); }
  emit() { for (const cb of this.listeners) cb(this); }

  tick(dt) {
    if (!this.playing || !this.run) return;
    this.frac += (dt * this.speed) / this.duration;
    if (this.frac >= 1) { this.frac = 1; this.playing = false; }
    this.render(); this.emit();
  }

  /** Índice i tal que t[i] <= t < t[i+1]. */
  index(t) {
    const ts = this.run.t;
    let lo = 0, hi = ts.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (ts[mid] <= t) lo = mid; else hi = mid; }
    return lo;
  }

  state() {
    const { t, pos, vel } = this.run;
    const tt = this.frac * this.T;
    const i = this.index(tt), j = Math.min(i + 1, t.length - 1);
    const w = j === i ? 0 : (tt - t[i]) / (t[j] - t[i]);
    const lerp = (arr, k) => arr[3 * i + k] + w * (arr[3 * j + k] - arr[3 * i + k]);
    return { t: tt, i, r: [lerp(pos, 0), lerp(pos, 1), lerp(pos, 2)], v: [lerp(vel, 0), lerp(vel, 1), lerp(vel, 2)] };
  }

  render() {
    if (!this.run) return;
    const s = this.state();
    this.sphere.position.set(s.r[0] / this.u, s.r[1] / this.u, s.r[2] / this.u);
    this.trail.geometry.instanceCount = Math.max(1, s.i);
    const vm = Math.hypot(...s.v);
    this.arrow.visible = this.showVel && vm > 0;
    if (vm > 0) {
      this.arrow.position.copy(this.sphere.position);
      this.arrow.setDirection(new THREE.Vector3(s.v[0], s.v[1], s.v[2]).normalize());
      this.arrow.setLength(1.8, 0.4, 0.22);
    }
    // fuerza instantánea sobre la partícula (rojo)
    this.farrow.visible = false;
    if (this.forceFn) {
      const F = this.forceFn(s.r, s.v), fm = Math.hypot(F[0], F[1], F[2]);
      if (fm > 0) {
        this.farrow.visible = true;
        this.farrow.position.copy(this.sphere.position);
        this.farrow.setDirection(new THREE.Vector3(F[0], F[1], F[2]).normalize());
        this.farrow.setLength(1.2 + 0.5 * Math.log10(1 + fm * 1e15), 0.38, 0.22);
      }
    }
    this.stage.invalidate();
  }

  dispose() { this.off(); this.stage.clear(this.group); this.group.parent?.remove(this.group); }
}

/** Barra de reproducción (play/pausa, reiniciar, velocidad y línea de tiempo). */
export function playbackBar(player, { label = (p) => `t = ${si(p.frac * p.T, 's', 3)}` } = {}) {
  const playBtn = button('▶ Reproducir', () => (player.playing ? player.pause() : player.play()), 'primary small');
  const restart = button('⟲', () => player.restart(), 'small');
  const spd = select({ options: [{ value: 0.25, label: '0.25×' }, { value: 0.5, label: '0.5×' }, { value: 1, label: '1×' }, { value: 2, label: '2×' }, { value: 4, label: '4×' }], value: 1, onInput: (v) => { player.speed = parseFloat(v); } });
  spd.input.value = '1';
  const range = h('input', { type: 'range', min: 0, max: 1000, value: 0, style: { flex: 1, minWidth: '120px' } });
  const txt = h('span', { class: 'hud' }, label(player));
  range.addEventListener('input', () => { const f = range.value / 1000; player.pause(); player.seek(f); });
  const off = player.onChange((p) => {
    playBtn.textContent = p.playing ? '⏸ Pausa' : '▶ Reproducir';
    if (document.activeElement !== range) range.value = Math.round(p.frac * 1000);
    txt.textContent = label(p);
  });
  const el = h('div', { class: 'row wrap', style: { padding: '8px 4px' } }, playBtn, restart, h('div', { style: { width: '78px' } }, spd.el), range, txt);
  return { el, destroy: off };
}
