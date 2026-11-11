// Capacitores y dieléctricos.
import { EPS0 } from './constants.js';

/** Dieléctricos típicos: constante κ y rigidez dieléctrica Emax [V/m] (valores aproximados de tablas). */
export const DIELECTRICS = [
  { id: 'vacio', nombre: 'Vacío', kappa: 1, Emax: Infinity, color: '#8892a6' },
  { id: 'aire', nombre: 'Aire', kappa: 1.00059, Emax: 3e6, color: '#a6c8ff' },
  { id: 'teflon', nombre: 'Teflón', kappa: 2.1, Emax: 60e6, color: '#f2f2f2' },
  { id: 'papel', nombre: 'Papel', kappa: 3.7, Emax: 16e6, color: '#e8d9a8' },
  { id: 'mica', nombre: 'Mica', kappa: 5.4, Emax: 118e6, color: '#c79bff' },
  { id: 'vidrio', nombre: 'Vidrio Pyrex', kappa: 5.6, Emax: 14e6, color: '#7fe3d1' },
  { id: 'agua', nombre: 'Agua destilada', kappa: 80, Emax: 65e6, color: '#4aa8ff' },
  { id: 'titanato', nombre: 'Titanato de estroncio', kappa: 310, Emax: 8e6, color: '#ff9f6b' },
];

/** C = κ ε0 A / d  [F] */
export const plateCapacitance = (A, d, kappa = 1) => (kappa * EPS0 * A) / d;

/**
 * Dieléctrico insertado una fracción x de la longitud (dos capacitores en paralelo):
 * C = ε0 (w/d) [κ x L + (1-x) L] = C0 [1 + (κ-1) x]
 */
export function partialDielectricCapacitance(A, d, kappa, x) {
  return plateCapacitance(A, d, 1) * (1 + (kappa - 1) * x);
}

/** Energía almacenada. Dados dos de {C, V, Q} devuelve { C, V, Q, U }. */
export function storedEnergy({ C, V, Q }) {
  if (C !== undefined && V !== undefined) { Q = C * V; }
  else if (C !== undefined && Q !== undefined) { V = Q / C; }
  else if (V !== undefined && Q !== undefined) { C = Q / V; }
  else throw new Error('Se requieren dos de C, V, Q');
  return { C, V, Q, U: 0.5 * C * V * V };
}

export const seriesEquivalent = (Cs) => 1 / Cs.reduce((s, c) => s + 1 / c, 0);
export const parallelEquivalent = (Cs) => Cs.reduce((s, c) => s + c, 0);

/** Reparto de carga, voltaje y energía en una red serie o paralelo de capacitores a voltaje V. */
export function capacitorNetwork(Cs, V, topology) {
  if (topology === 'serie') {
    const Ceq = seriesEquivalent(Cs);
    const Q = Ceq * V;
    const items = Cs.map((C) => ({ C, Q, V: Q / C, U: (Q * Q) / (2 * C) }));
    return { Ceq, Q, U: 0.5 * Ceq * V * V, items };
  }
  const Ceq = parallelEquivalent(Cs);
  const items = Cs.map((C) => ({ C, Q: C * V, V, U: 0.5 * C * V * V }));
  return { Ceq, Q: Ceq * V, U: 0.5 * Ceq * V * V, items };
}

/** Carga de un capacitor a través de R: V_C(t) = V (1 - e^{-t/RC}); descarga: V e^{-t/RC}. */
export function rcCharge(V, R, C, t) {
  const tau = R * C;
  const vc = V * (1 - Math.exp(-t / tau));
  return { vc, i: (V / R) * Math.exp(-t / tau), uC: 0.5 * C * vc * vc, tau };
}
export function rcDischarge(V0, R, C, t) {
  const tau = R * C;
  const vc = V0 * Math.exp(-t / tau);
  return { vc, i: -(V0 / R) * Math.exp(-t / tau), uC: 0.5 * C * vc * vc, tau };
}
