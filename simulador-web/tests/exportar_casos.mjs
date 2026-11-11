// Calcula con el motor JS del simulador un conjunto fijo de casos y los imprime como JSON.
// Lo consume python/tests/test_validacion_web.py para contrastarlos con NumPy/SciPy.
import { fieldAt, potentialAt, systemEnergy } from '../src/physics/electrostatics.js';
import { integrateParticle, lorentzTheory } from '../src/physics/dynamics.js';
import * as cap from '../src/physics/capacitors.js';
import * as circ from '../src/physics/circuits.js';
import * as mag from '../src/physics/magnetostatics.js';
import { E_CHARGE, M_ELECTRON, M_PROTON } from '../src/physics/constants.js';

const out = {};

// 1. Campo, potencial y energía de un sistema de cargas
const charges = [
  { q: 2e-9, x: -1, y: 0.5, z: 0 }, { q: -3e-9, x: 1.5, y: -0.5, z: 0.4 }, { q: 1e-9, x: 0, y: 2, z: -1 },
];
const pts = [[0, 0, 0], [2, 1, 0.5], [-3, 2, 1], [0.3, -1.2, 2.2]];
out.cargas = {
  charges: charges.map((c) => [c.q, c.x, c.y, c.z]),
  puntos: pts,
  E: pts.map((p) => fieldAt(charges, ...p)),
  V: pts.map((p) => potentialAt(charges, ...p)),
  U: systemEnergy(charges),
};

// 2. Trayectoria de un electrón en campo E uniforme + campo de una carga
const src = [{ q: 4e-9, x: 0, y: 0, z: 0 }];
const E0 = [200, -300, 100];
const tr = integrateParticle({
  q: -E_CHARGE, m: M_ELECTRON, r0: [0.3, 0.1, 0], v0: [2e5, 1e5, 5e4], T: 3e-7,
  Efun: (x, y, z) => { const e = fieldAt(src, x, y, z); return [e[0] + E0[0], e[1] + E0[1], e[2] + E0[2]]; }, method: 'rk45',
});
const N = tr.t.length - 1;
out.trayectoria = {
  src: [[4e-9, 0, 0, 0]], E0, T: 3e-7,
  final_pos: [tr.pos[3 * N], tr.pos[3 * N + 1], tr.pos[3 * N + 2]],
  final_vel: [tr.vel[3 * N], tr.vel[3 * N + 1], tr.vel[3 * N + 2]],
};

// 3. Lorentz con E y B cruzados
const E = [0, 5e3, 0], B = [0, 0, 0.2], v0 = [3e4, 1e4, 2e4], T = 4e-6;
out.lorentz = { E, B, v0, T };
for (const method of ['rk45', 'boris']) {
  const r = integrateParticle({ q: E_CHARGE, m: M_PROTON, r0: [0, 0, 0], v0, T, Efun: () => E, Bfun: () => B, method, nSteps: 40000 });
  const n = r.t.length - 1;
  out.lorentz[method] = { pos: [r.pos[3 * n], r.pos[3 * n + 1], r.pos[3 * n + 2]], vel: [r.vel[3 * n], r.vel[3 * n + 1], r.vel[3 * n + 2]] };
}
out.lorentz.teoria = lorentzTheory({ q: E_CHARGE, m: M_PROTON, v0, E, B });

// 4. Capacitores
out.capacitores = {
  placas: cap.plateCapacitance(0.02, 2e-3, 5.4),
  parcial: cap.partialDielectricCapacitance(0.02, 2e-3, 5.4, 0.37),
  energia: cap.storedEnergy({ C: 4.7e-6, V: 24 }),
  Cs: [1e-6, 2.2e-6, 4.7e-6],
  serie: cap.capacitorNetwork([1e-6, 2.2e-6, 4.7e-6], 12, 'serie'),
  paralelo: cap.capacitorNetwork([1e-6, 2.2e-6, 4.7e-6], 12, 'paralelo'),
  rc: cap.rcCharge(9, 2200, 100e-6, 0.3),
};

// 5. Circuito mixto
const tree = circ.S(circ.R(10), circ.P(circ.S(circ.R(20), circ.R(30)), circ.R(25)), circ.P(circ.R(40), circ.R(60), circ.R(120)));
const sol = circ.solve(tree, 24);
out.circuito = {
  V: 24,
  arbol: JSON.parse(JSON.stringify(tree)),
  Req: sol.Req, I: sol.I, P: sol.P,
  resistores: circ.flatten(sol.tree).map((r) => ({ R: r.R, I: r.I, V: r.V, P: r.P })),
};

// 6. Campos magnéticos
const loop = mag.makeSource('espira', { I: 2.5, R: 0.04 });
const sol4 = mag.makeSource('solenoide', { I: 1.5, R: 0.03, L: 0.3, N: 250 });
const mp = [[0.01, 0.02, 0.03], [0, 0, 0.07], [0.08, -0.04, 0.02]];
out.magnetico = {
  puntos: mp,
  espira: { I: 2.5, R: 0.04, B: mp.map((p) => loop.B(...p)) },
  solenoide: { I: 1.5, R: 0.03, L: 0.3, N: 250, B: mp.map((p) => sol4.B(...p)) },
  hilo: { I: 7, B: mp.map((p) => mag.makeSource('hilo', { I: 7 }).B(...p)) },
};

console.log(JSON.stringify(out));
