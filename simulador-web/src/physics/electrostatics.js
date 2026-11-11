// Electrostática de cargas puntuales: campo, potencial, energía y líneas de campo.
// Convención: cada carga es { q [C], x, y, z [m] }.
import { K_E } from './constants.js';

/** Campo eléctrico total E = Σ k q (r - ri) / |r - ri|³  [V/m]. */
export function fieldAt(charges, x, y, z, soft = 1e-9) {
  let ex = 0, ey = 0, ez = 0;
  for (let i = 0; i < charges.length; i++) {
    const c = charges[i];
    const dx = x - c.x, dy = y - c.y, dz = z - c.z;
    const r2 = dx * dx + dy * dy + dz * dz + soft * soft;
    const f = (K_E * c.q) / (r2 * Math.sqrt(r2));
    ex += f * dx; ey += f * dy; ez += f * dz;
  }
  return [ex, ey, ez];
}

/** Potencial eléctrico V = Σ k q / |r - ri|  [V] (cero en el infinito). */
export function potentialAt(charges, x, y, z, soft = 1e-9) {
  let v = 0;
  for (let i = 0; i < charges.length; i++) {
    const c = charges[i];
    const dx = x - c.x, dy = y - c.y, dz = z - c.z;
    v += (K_E * c.q) / Math.sqrt(dx * dx + dy * dy + dz * dz + soft * soft);
  }
  return v;
}

/** Contribución individual de cada carga al potencial y al campo en un punto. */
export function contributionsAt(charges, x, y, z) {
  return charges.map((c) => {
    const dx = x - c.x, dy = y - c.y, dz = z - c.z;
    const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const V = (K_E * c.q) / r;
    const e = (K_E * c.q) / (r * r);
    return { r, V, E: Math.abs(e), Ex: (e * dx) / r, Ey: (e * dy) / r, Ez: (e * dz) / r };
  });
}

/** Energía potencial electrostática del sistema: U = Σ_{i<j} k qi qj / rij  [J]. */
export function systemEnergy(charges) {
  let u = 0;
  for (let i = 0; i < charges.length; i++) {
    for (let j = i + 1; j < charges.length; j++) {
      const a = charges[i], b = charges[j];
      const r = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      u += (K_E * a.q * b.q) / r;
    }
  }
  return u;
}

/** Malla de potencial en el plano z = const. Devuelve Float32Array nx*ny (fila por fila, y creciente). */
export function potentialGrid(charges, xmin, xmax, ymin, ymax, z, nx, ny) {
  const out = new Float32Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    const y = ymin + ((ymax - ymin) * j) / (ny - 1);
    for (let i = 0; i < nx; i++) {
      const x = xmin + ((xmax - xmin) * i) / (nx - 1);
      out[j * nx + i] = potentialAt(charges, x, y, z, 1e-3);
    }
  }
  return out;
}

/**
 * Traza una línea de campo con RK4 sobre el campo unitario.
 * @param sign +1 sigue el campo, -1 lo recorre al revés.
 * @returns {Float32Array} puntos [x0,y0,z0,x1,...]
 */
export function traceFieldLine(charges, start, sign = 1, opts = {}) {
  const { h = 0.05, maxSteps = 4000, bound = 12, capture = 1.5 * h } = opts;
  const dir = (x, y, z) => {
    const [ex, ey, ez] = fieldAt(charges, x, y, z, 1e-6);
    const m = Math.hypot(ex, ey, ez) || 1;
    return [(sign * ex) / m, (sign * ey) / m, (sign * ez) / m];
  };
  const pts = [start[0], start[1], start[2]];
  let x = start[0], y = start[1], z = start[2];
  for (let n = 0; n < maxSteps; n++) {
    const k1 = dir(x, y, z);
    const k2 = dir(x + 0.5 * h * k1[0], y + 0.5 * h * k1[1], z + 0.5 * h * k1[2]);
    const k3 = dir(x + 0.5 * h * k2[0], y + 0.5 * h * k2[1], z + 0.5 * h * k2[2]);
    const k4 = dir(x + h * k3[0], y + h * k3[1], z + h * k3[2]);
    x += (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    z += (h / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
    pts.push(x, y, z);
    if (Math.abs(x) > bound || Math.abs(y) > bound || Math.abs(z) > bound) break;
    // Terminar al llegar a una carga (después de abandonar la vecindad del punto de partida).
    let hit = false;
    for (const c of charges) {
      if (Math.hypot(x - c.x, y - c.y, z - c.z) < capture && n > 6) { hit = true; break; }
    }
    if (hit) break;
  }
  return new Float32Array(pts);
}

/** Puntos casi uniformes sobre una esfera (espiral de Fibonacci). */
export function fibonacciSphere(n) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const zz = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - zz * zz);
    const phi = i * golden;
    pts.push([r * Math.cos(phi), r * Math.sin(phi), zz]);
  }
  return pts;
}

/**
 * Genera todas las líneas de campo del sistema. Semillas alrededor de cada carga,
 * en número proporcional a |q|. En 2D las semillas se reparten sobre una circunferencia en el plano z.
 * Las cargas negativas sólo aportan las líneas que provienen del infinito (conservación del flujo).
 */
export function fieldLines(charges, { total = 48, mode3d = true, h = 0.05, bound = 12, r0 = 0.12 } = {}) {
  const qmax = Math.max(...charges.map((c) => Math.abs(c.q)), 1e-30);
  const qpos = charges.filter((c) => c.q > 0).reduce((s, c) => s + c.q, 0);
  const qneg = -charges.filter((c) => c.q < 0).reduce((s, c) => s + c.q, 0);
  const lines = [];
  for (const c of charges) {
    if (c.q === 0) continue;
    let n = Math.max(4, Math.round((total * Math.abs(c.q)) / qmax));
    if (c.q < 0) {
      // fracción del flujo negativo que no termina en cargas positivas
      const extra = qneg > qpos ? 1 - qpos / qneg : 0;
      n = Math.round(n * extra);
      if (n < 1) continue;
    }
    const seeds = mode3d
      ? fibonacciSphere(n)
      : Array.from({ length: n }, (_, i) => [Math.cos((2 * Math.PI * (i + 0.5)) / n), Math.sin((2 * Math.PI * (i + 0.5)) / n), 0]);
    for (const s of seeds) {
      const start = [c.x + r0 * s[0], c.y + r0 * s[1], c.z + r0 * s[2]];
      const pts = traceFieldLine(charges, start, c.q > 0 ? 1 : -1, { h, bound });
      if (pts.length > 9) lines.push({ points: pts, sourceCharge: c });
    }
  }
  return lines;
}
