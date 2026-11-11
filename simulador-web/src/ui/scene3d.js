// Escena 3D reutilizable (Three.js): renderer, cámara con eje z hacia arriba, controles, líneas gruesas y etiquetas.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

export { THREE };

export class Stage {
  constructor(host, { background = 0x0a0f18, camera = [9, -11, 7], fov = 45 } = {}) {
    this.host = host;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'three';
    host.append(this.canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.scene = new THREE.Scene();
    this.scene.background = null;
    this.renderer.setClearColor(background, 0);
    this.camera = new THREE.PerspectiveCamera(fov, 1, 0.05, 500);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(...camera);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.12;
    this.controls.addEventListener('change', () => this.invalidate());
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(6, -8, 12);
    this.scene.add(key);
    this.lineMats = new Set();
    this.dirty = true;
    this.frameCbs = new Set();
    this.disposed = false;
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
    this._loop = this._loop.bind(this);
    this.raf = requestAnimationFrame(this._loop);
  }

  invalidate() { this.dirty = true; }
  onFrame(cb) { this.frameCbs.add(cb); return () => this.frameCbs.delete(cb); }

  resize() {
    const w = this.host.clientWidth, hh = this.host.clientHeight;
    if (!w || !hh) return;
    this.renderer.setSize(w, hh, false);
    this.camera.aspect = w / hh;
    if (this.camera.isOrthographicCamera) { /* no usado */ }
    this.camera.updateProjectionMatrix();
    for (const m of this.lineMats) m.resolution.set(w, hh);
    this.invalidate();
  }

  _loop(now) {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this._loop);
    const dt = this._last ? Math.min(0.1, (now - this._last) / 1000) : 0.016;
    this._last = now;
    for (const cb of this.frameCbs) cb(dt, now / 1000);
    if (this.controls.update()) this.dirty = true;
    if (this.dirty) { this.dirty = false; this.renderer.render(this.scene, this.camera); }
  }

  /** Vista superior (2D) con rotación bloqueada, o libre (3D). */
  setView2D(on, distance = 16) {
    this.controls.enableRotate = !on;
    if (on) {
      this.controls.target.set(0, 0, 0);
      this.camera.position.set(0, 0.0001, distance);
      this.camera.up.set(0, 1, 0);
    } else {
      this.camera.up.set(0, 0, 1);
      this.camera.position.set(9, -11, 7);
      this.controls.target.set(0, 0, 0);
    }
    this.controls.update();
    this.invalidate();
  }

  /** Línea gruesa. positions: Float32Array o Array [x,y,z,...]; colors: opcional [r,g,b,...] (0–1). */
  fatLine(positions, { color = 0xffffff, width = 2, colors = null, opacity = 1, dashed = false } = {}) {
    const g = new LineGeometry();
    g.setPositions(Array.from(positions));
    if (colors) g.setColors(Array.from(colors));
    const m = new LineMaterial({ color: colors ? 0xffffff : color, linewidth: width, vertexColors: !!colors, transparent: opacity < 1, opacity, dashed, worldUnits: false });
    m.resolution.set(this.host.clientWidth || 800, this.host.clientHeight || 600);
    this.lineMats.add(m);
    const line = new Line2(g, m);
    if (dashed) line.computeLineDistances();
    line.userData.mat = m;
    return line;
  }

  /** Elimina un objeto y libera memoria. */
  free(obj) {
    if (!obj) return;
    obj.parent?.remove(obj);
    obj.traverse?.((o) => {
      o.geometry?.dispose?.();
      const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of mats) { this.lineMats.delete(m); m.map?.dispose?.(); m.dispose?.(); }
    });
    this.invalidate();
  }

  /** Vacía un grupo liberando todo. */
  clear(group) {
    for (const c of [...group.children]) this.free(c);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.controls.dispose();
    this.clear(this.scene);
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    this.canvas.remove();
  }
}

/** Sprite de texto (etiquetas 3D). */
export function textSprite(text, { color = '#e6ebf5', size = 0.5, bg = null } = {}) {
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d');
  const fs = 56;
  ctx.font = `600 ${fs}px "Segoe UI", sans-serif`;
  const w = Math.ceil(ctx.measureText(text).width) + 24;
  cv.width = w; cv.height = fs + 24;
  ctx.font = `600 ${fs}px "Segoe UI", sans-serif`;
  if (bg) { ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(0, 0, cv.width, cv.height, 14); ctx.fill(); }
  ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
  ctx.fillText(text, cv.width / 2, cv.height / 2 + 2);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sp.scale.set((size * cv.width) / cv.height, size, 1);
  sp.renderOrder = 10;
  return sp;
}

/** Ejes x,y,z con etiquetas y cuadrícula en z = 0. */
export function axesWithGrid(size = 6, { grid = true, labels = true } = {}) {
  const g = new THREE.Group();
  const mk = (dir, color, name) => {
    const arrow = new THREE.ArrowHelper(new THREE.Vector3(...dir), new THREE.Vector3(0, 0, 0), size, color, size * 0.08, size * 0.04);
    g.add(arrow);
    if (labels) {
      const s = textSprite(name, { color: '#' + color.toString(16).padStart(6, '0'), size: size * 0.07 });
      s.position.set(dir[0] * (size + size * 0.07), dir[1] * (size + size * 0.07), dir[2] * (size + size * 0.07));
      g.add(s);
    }
  };
  mk([1, 0, 0], 0xff6b6b, 'x'); mk([0, 1, 0], 0x7ae582, 'y'); mk([0, 0, 1], 0x6ea8ff, 'z');
  if (grid) {
    const gr = new THREE.GridHelper(size * 2, Math.round(size * 2), 0x2a3a57, 0x1a2538);
    gr.rotation.x = Math.PI / 2;
    gr.material.transparent = true; gr.material.opacity = 0.7;
    g.add(gr);
  }
  return g;
}

/** Mapa de color tipo viridis/plasma para magnitudes normalizadas (0–1). */
export function plasma(t) {
  t = Math.min(1, Math.max(0, t));
  const stops = [[0.05, 0.03, 0.53], [0.42, 0.0, 0.66], [0.80, 0.28, 0.47], [0.97, 0.59, 0.25], [0.94, 0.98, 0.13]];
  const f = t * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(f)), u = f - i;
  return stops[i].map((c, k) => c + (stops[i + 1][k] - c) * u);
}

/** Flechita (cono) en un punto con una dirección. */
export function coneAt(pos, dir, { color = 0xffffff, size = 0.18 } = {}) {
  const geo = new THREE.ConeGeometry(size * 0.45, size, 10);
  geo.rotateX(Math.PI / 2); // eje del cono -> +z
  geo.translate(0, 0, size / 2);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color }));
  m.position.set(pos[0], pos[1], pos[2]);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(dir[0], dir[1], dir[2]).normalize());
  return m;
}
