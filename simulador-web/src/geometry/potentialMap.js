// Mapa de color del potencial en un plano y selección de niveles equipotenciales (escala logarítmica con signo).
import { potentialGrid } from '../physics/electrostatics.js';

function percentile(sorted, p) {
  if (!sorted.length) return 1;
  return sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
}

/**
 * @param charges cargas en SI
 * @param L semilado del dominio (m)
 * @param z plano de corte
 * @returns { vals, n, rgba, Vs, Vhi, vmin, vmax, levels(nLevels) }
 */
export function buildPotentialMap(charges, L, z, n = 200) {
  const vals = potentialGrid(charges, -L, L, -L, L, z, n, n);
  const absSorted = Float32Array.from(vals, Math.abs).sort();
  const Vs = Math.max(percentile(absSorted, 0.3), 1e-9);
  const Vhi = Math.max(percentile(absSorted, 0.985), Vs * 2);
  let vmin = Infinity, vmax = -Infinity;
  for (const v of vals) { if (v < vmin) vmin = v; if (v > vmax) vmax = v; }
  const norm = Math.asinh(Vhi / Vs);
  const rgba = new Uint8ClampedArray(n * n * 4);
  const base = [13, 19, 31];
  for (let i = 0; i < vals.length; i++) {
    const s = Math.max(-1, Math.min(1, Math.asinh(vals[i] / Vs) / norm));
    const a = Math.pow(Math.abs(s), 0.85);
    const tgt = s >= 0 ? [255, 96, 90] : [70, 150, 255];
    const hi = s >= 0 ? [255, 214, 160] : [170, 225, 255];
    const t2 = Math.max(0, (a - 0.8) / 0.2);
    for (let k = 0; k < 3; k++) {
      const c = base[k] + (tgt[k] - base[k]) * a;
      rgba[4 * i + k] = c + (hi[k] - c) * t2;
    }
    rgba[4 * i + 3] = 255;
  }
  return {
    vals, n, rgba, Vs, Vhi, vmin, vmax,
    /** Niveles log-espaciados entre Vs y Vhi para cada signo presente, más V = 0 si cambia de signo. */
    levels(nLevels) {
      const out = [];
      for (let k = 0; k < nLevels; k++) {
        const v = Vs * Math.pow(Vhi / Vs, nLevels === 1 ? 0.5 : k / (nLevels - 1));
        if (vmax > v) out.push(v);
        if (vmin < -v) out.push(-v);
      }
      if (vmin < 0 && vmax > 0) out.push(0);
      return out;
    },
  };
}
