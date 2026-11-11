// Magnetostática: ley de Biot–Savart numérica para espiras, solenoides e imanes,
// hilo rectilíneo infinito y dipolo magnético. Líneas de campo por RK4.
import { MU0 } from './constants.js';

const MU0_4PI = MU0 / (4 * Math.PI);

/** Conjunto de segmentos de corriente: Float64Array [mx,my,mz,dlx,dly,dlz, I] por segmento (7 valores). */
export function circleSegments(radius, current, nSeg = 96, zPos = 0) {
  const out = new Float64Array(7 * nSeg);
  const da = (2 * Math.PI) / nSeg;
  for (let k = 0; k < nSeg; k++) {
    // punto medio sobre la circunferencia y dl tangente de longitud R·Δθ (regla del punto medio)
    const am = (k + 0.5) * da;
    const o = 7 * k;
    out[o] = radius * Math.cos(am); out[o + 1] = radius * Math.sin(am); out[o + 2] = zPos;
    out[o + 3] = -radius * da * Math.sin(am); out[o + 4] = radius * da * Math.cos(am); out[o + 5] = 0;
    out[o + 6] = current;
  }
  return out;
}

export function concatSegments(list) {
  const n = list.reduce((s, a) => s + a.length, 0);
  const out = new Float64Array(n);
  let o = 0;
  for (const a of list) { out.set(a, o); o += a.length; }
  return out;
}

/** B(r) = μ0/4π Σ I dl × (r - rm) / |r - rm|³  [T] */
export function biotSavart(segs, x, y, z) {
  let bx = 0, by = 0, bz = 0;
  for (let o = 0; o < segs.length; o += 7) {
    const rx = x - segs[o], ry = y - segs[o + 1], rz = z - segs[o + 2];
    const r2 = rx * rx + ry * ry + rz * rz + 1e-12;
    const f = (segs[o + 6]) / (r2 * Math.sqrt(r2));
    const dx = segs[o + 3], dy = segs[o + 4], dz = segs[o + 5];
    bx += f * (dy * rz - dz * ry);
    by += f * (dz * rx - dx * rz);
    bz += f * (dx * ry - dy * rx);
  }
  return [MU0_4PI * bx, MU0_4PI * by, MU0_4PI * bz];
}

/** Hilo recto infinito paralelo a z, que pasa por (x0, y0), corriente I en +z. */
export function wireField(I, x0, y0, x, y) {
  const dx = x - x0, dy = y - y0;
  const rho2 = dx * dx + dy * dy + 1e-12;
  const f = (MU0 * I) / (2 * Math.PI * rho2);
  return [-f * dy, f * dx, 0];
}

/** Dipolo magnético m (vector) en el origen. */
export function dipoleField(m, x, y, z) {
  const r2 = x * x + y * y + z * z + 1e-18;
  const r = Math.sqrt(r2);
  const md = m[0] * x + m[1] * y + m[2] * z;
  const f = MU0_4PI / (r2 * r);
  return [f * (3 * md * x / r2 - m[0]), f * (3 * md * y / r2 - m[1]), f * (3 * md * z / r2 - m[2])];
}

/** Fórmulas analíticas de referencia. */
export const theory = {
  wire: (I, rho) => (MU0 * I) / (2 * Math.PI * rho),
  loopCenter: (I, R) => (MU0 * I) / (2 * R),
  loopAxis: (I, R, z) => (MU0 * I * R * R) / (2 * Math.pow(R * R + z * z, 1.5)),
  solenoidInfinite: (N, L, I) => (MU0 * N * I) / L,
  solenoidCenter: (N, L, R, I) => ((MU0 * N * I) / L) * (L / Math.sqrt(L * L + 4 * R * R)),
  parallelWiresForcePerLength: (I1, I2, d) => (MU0 * I1 * I2) / (2 * Math.PI * d),
};

/**
 * Construye una fuente. kind: 'iman' | 'hilo' | 'espira' | 'solenoide' | 'hilos2'.
 * Devuelve { kind, B(x,y,z), axisymmetric, bound, scale, meta } .
 */
export function makeSource(kind, p) {
  if (kind === 'hilo') {
    return {
      kind, axisymmetric: false, scale: 0.1, bound: 0.8,
      B: (x, y, z) => wireField(p.I, 0, 0, x, y),
      meta: { I: p.I },
    };
  }
  if (kind === 'hilos2') {
    const d = p.d;
    const I2 = p.same ? p.I : -p.I;
    return {
      kind, axisymmetric: false, scale: d, bound: 6 * d,
      B: (x, y, z) => {
        const a = wireField(p.I, -d / 2, 0, x, y), b = wireField(I2, d / 2, 0, x, y);
        return [a[0] + b[0], a[1] + b[1], 0];
      },
      meta: { I1: p.I, I2, d, F: theory.parallelWiresForcePerLength(p.I, I2, d) },
    };
  }
  // Se construyen dos discretizaciones: una fina (sonda y valores numéricos) y otra gruesa (trazado de líneas).
  const build = (nLoops, nSeg) => {
    if (kind === 'espira') return circleSegments(p.R, p.I, nSeg);
    // 'solenoide' y 'iman' (imán de barra = solenoide equivalente: corriente superficial de magnetización)
    const nModel = Math.min(p.N, nLoops);
    const Ieff = (p.I * p.N) / nModel;
    const list = [];
    for (let k = 0; k < nModel; k++) {
      const z = -p.L / 2 + (p.L * (k + 0.5)) / nModel; // regla del punto medio
      list.push(circleSegments(p.R, Ieff, nSeg, z));
    }
    return concatSegments(list);
  };
  const R = p.R, L = kind === 'espira' ? 0 : p.L;
  const segs = build(40, kind === 'espira' ? 128 : 64);
  const segsFast = build(16, kind === 'espira' ? 48 : 32);
  const scale = Math.max(R, L / 2);
  return {
    kind, axisymmetric: true, scale, bound: 8 * scale, segs, R, L,
    B: (x, y, z) => biotSavart(segs, x, y, z),
    Bfast: (x, y, z) => biotSavart(segsFast, x, y, z),
    meta: { R, L, N: p.N, I: p.I },
  };
}

/** Línea de campo B con RK4 sobre el campo unitario; detecta cierre. */
export function traceBLine(Bfun, start, sign, { h, maxSteps = 900, bound = 10 } = {}) {
  const dir = (x, y, z) => {
    const b = Bfun(x, y, z);
    const m = Math.hypot(b[0], b[1], b[2]) || 1;
    return [(sign * b[0]) / m, (sign * b[1]) / m, (sign * b[2]) / m];
  };
  const pts = [start[0], start[1], start[2]];
  let x = start[0], y = start[1], z = start[2];
  let closed = false;
  for (let n = 0; n < maxSteps; n++) {
    const k1 = dir(x, y, z);
    const k2 = dir(x + 0.5 * h * k1[0], y + 0.5 * h * k1[1], z + 0.5 * h * k1[2]);
    const k3 = dir(x + 0.5 * h * k2[0], y + 0.5 * h * k2[1], z + 0.5 * h * k2[2]);
    const k4 = dir(x + h * k3[0], y + h * k3[1], z + h * k3[2]);
    x += (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    z += (h / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
    pts.push(x, y, z);
    if (Math.hypot(x, y, z) > bound) break;
    if (n > 20 && Math.hypot(x - start[0], y - start[1], z - start[2]) < 1.1 * h) { closed = true; break; }
  }
  return { pts, closed };
}

/** Línea completa por un punto: hacia atrás + hacia delante (si no se cerró). */
export function fullBLine(Bfun, start, opts) {
  const fwd = traceBLine(Bfun, start, +1, opts);
  if (fwd.closed) return new Float32Array(fwd.pts);
  const bwd = traceBLine(Bfun, start, -1, opts);
  const back = [];
  for (let i = bwd.pts.length - 3; i >= 3; i -= 3) back.push(bwd.pts[i], bwd.pts[i + 1], bwd.pts[i + 2]);
  return new Float32Array([...back, ...fwd.pts]);
}

/**
 * Semillas de flujo igual en el plano z=0 para fuentes con simetría axial.
 * Devuelve radios ρ_k de la rama interior (ascendente) de ψ(ρ) = ∫ Bz ρ dρ.
 */
export function equalFluxSeeds(Bfun, rhoMax, n) {
  const M = 800;
  const rho = new Float64Array(M + 1), psi = new Float64Array(M + 1);
  let acc = 0;
  let prevBz = Bfun(0, 0, 0)[2];
  let peakIdx = 0;
  for (let i = 1; i <= M; i++) {
    rho[i] = (rhoMax * i) / M;
    const bz = Bfun(rho[i], 0, 0)[2];
    acc += 0.5 * (prevBz * rho[i - 1] + bz * rho[i]) * (rho[i] - rho[i - 1]);
    psi[i] = acc; prevBz = bz;
    if (acc > psi[peakIdx]) peakIdx = i;
  }
  const peak = psi[peakIdx];
  const seeds = [];
  if (peak <= 0) return seeds;
  for (let k = 1; k <= n; k++) {
    const level = (peak * k) / (n + 1);
    for (let i = 1; i <= peakIdx; i++) {
      if (psi[i] >= level) {
        const t = (level - psi[i - 1]) / (psi[i] - psi[i - 1] || 1);
        seeds.push(rho[i - 1] + t * (rho[i] - rho[i - 1]));
        break;
      }
    }
  }
  return seeds;
}

/** Líneas de campo de una fuente: lista de Float32Array con puntos 3D. */
export function sourceFieldLines(src, nLines = 12, nAzimuth = 8) {
  const lines = [];
  if (src.kind === 'hilo') {
    const rings = nLines;
    for (let k = 1; k <= rings; k++) {
      const rho = 0.3 * k * src.scale * 0.5;
      for (const z of [-2, 0, 2]) {
        const pts = [];
        for (let a = 0; a <= 64; a++) pts.push(rho * Math.cos((2 * Math.PI * a) / 64), rho * Math.sin((2 * Math.PI * a) / 64), z * src.scale * 0.5);
        lines.push(new Float32Array(pts));
      }
    }
    return lines;
  }
  if (src.kind === 'hilos2') {
    const d = src.meta.d, h = d / 40;
    const nSeed = Math.max(4, nLines);
    const planar = [];
    for (const cx of [-d / 2, d / 2]) {
      for (let k = 0; k < nSeed; k++) {
        const ang = (2 * Math.PI * (k + 0.5)) / nSeed;
        const r = 0.28 * d * (1 + (k % 3) * 0.55);
        planar.push(fullBLine(src.B, [cx + r * Math.cos(ang), r * Math.sin(ang), 0], { h, bound: src.bound, maxSteps: 1400 }));
      }
    }
    for (const z of [-1.2, 0, 1.2]) {
      for (const pl of planar) {
        const c = new Float32Array(pl);
        for (let i = 2; i < c.length; i += 3) c[i] = z * d * 0.6;
        lines.push(c);
      }
    }
    return lines;
  }
  const h = src.scale / 14;
  const Bt = src.Bfast || src.B; // discretización gruesa: suficiente para trazar líneas
  const seeds = equalFluxSeeds(Bt, 4 * src.scale, nLines);
  for (const [baseIdx, rho] of seeds.entries()) {
    const base = fullBLine(Bt, [rho, 0, 0], { h, bound: src.bound, maxSteps: 1200 });
    for (let a = 0; a < nAzimuth; a++) {
      const th = (2 * Math.PI * a) / nAzimuth;
      const c = Math.cos(th), s = Math.sin(th);
      const rot = new Float32Array(base.length);
      for (let i = 0; i < base.length; i += 3) {
        rot[i] = c * base[i] - s * base[i + 1];
        rot[i + 1] = s * base[i] + c * base[i + 1];
        rot[i + 2] = base[i + 2];
      }
      rot.base = baseIdx; // las copias azimutales comparten la misma magnitud |B|
      lines.push(rot);
    }
  }
  return lines;
}
