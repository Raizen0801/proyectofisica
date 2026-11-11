// Pruebas del motor físico contra soluciones analíticas. Ejecutar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { K_E, EPS0, MU0, E_CHARGE, M_ELECTRON, M_PROTON } from '../src/physics/constants.js';
import { fieldAt, potentialAt, fieldLines, systemEnergy } from '../src/physics/electrostatics.js';
import { integrateParticle, lorentzTheory, kineticEnergy } from '../src/physics/dynamics.js';
import * as cap from '../src/physics/capacitors.js';
import * as circ from '../src/physics/circuits.js';
import * as mag from '../src/physics/magnetostatics.js';
import { marchingSquares, marchingTetrahedra } from '../src/geometry/contours.js';

const close = (a, b, rel = 1e-6, msg = '') => {
  const err = Math.abs(a - b) / (Math.abs(b) || 1);
  assert.ok(err <= rel, `${msg} esperado ${b}, obtenido ${a} (err rel ${err})`);
};

test('Coulomb: campo y potencial de una carga puntual', () => {
  const ch = [{ q: 1e-9, x: 0, y: 0, z: 0 }];
  const [ex, ey, ez] = fieldAt(ch, 1, 0, 0);
  close(ex, K_E * 1e-9, 1e-9);
  assert.equal(ey, 0); assert.equal(ez, 0);
  close(potentialAt(ch, 2, 0, 0), (K_E * 1e-9) / 2, 1e-9);
});

test('Principio de superposición: dipolo, V=0 en el plano mediatriz', () => {
  const ch = [{ q: 2e-9, x: -1, y: 0, z: 0 }, { q: -2e-9, x: 1, y: 0, z: 0 }];
  assert.ok(Math.abs(potentialAt(ch, 0, 3, 2)) < 1e-9);
  const [ex] = fieldAt(ch, 0, 0, 0);
  close(ex, 2 * K_E * 2e-9, 1e-9); // ambos campos apuntan hacia +x
});

test('Energía del sistema de dos cargas', () => {
  const ch = [{ q: 1e-9, x: 0, y: 0, z: 0 }, { q: 2e-9, x: 0.5, y: 0, z: 0 }];
  close(systemEnergy(ch), (K_E * 2e-18) / 0.5, 1e-9);
});

test('Líneas de campo: las del dipolo terminan en la carga negativa', () => {
  const ch = [{ q: 1e-9, x: -1, y: 0, z: 0 }, { q: -1e-9, x: 1, y: 0, z: 0 }];
  const lines = fieldLines(ch, { total: 16, mode3d: false });
  assert.equal(lines.length, 16); // las negativas no aportan líneas extra (flujo igual)
  let ended = 0;
  for (const l of lines) {
    const n = l.points.length;
    const d = Math.hypot(l.points[n - 3] - 1, l.points[n - 2], l.points[n - 1]);
    if (d < 0.1) ended++;
  }
  assert.ok(ended >= 12, `líneas que terminan en -q: ${ended}`);
});

test('Trayectoria en campo E uniforme coincide con r = r0 + v0 t + a t²/2 (RK45)', () => {
  const E = [0, 1000, 0];
  const p = { q: -E_CHARGE, m: M_ELECTRON, r0: [0, 0, 0], v0: [1e6, 0, 0], T: 1e-7, Efun: () => E, method: 'rk45' };
  const res = integrateParticle(p);
  const N = res.t.length;
  const t = res.t[N - 1];
  const a = (p.q * E[1]) / p.m;
  close(res.pos[3 * (N - 1)], 1e6 * t, 1e-8);
  close(res.pos[3 * (N - 1) + 1], 0.5 * a * t * t, 1e-8);
  close(res.vel[3 * (N - 1) + 1], a * t, 1e-8);
});

test('Teorema trabajo–energía en un campo de cargas puntuales', () => {
  const src = [{ q: 5e-9, x: 0, y: 0, z: 0 }];
  const p = {
    q: E_CHARGE, m: M_PROTON, r0: [0.5, 0, 0], v0: [0, 3e3, 0], T: 2e-5,
    Efun: (x, y, z) => fieldAt(src, x, y, z), method: 'rk45',
  };
  const res = integrateParticle(p);
  const N = res.t.length - 1;
  const K = kineticEnergy(p.m, res.vel);
  const x = [res.pos[3 * N], res.pos[3 * N + 1], res.pos[3 * N + 2]];
  const dU = p.q * (potentialAt(src, ...x) - potentialAt(src, ...p.r0));
  close(K[N] - K[0], -dU, 1e-7);
});

test('Lorentz: radio, periodo y deriva E×B (Boris y RK45)', () => {
  const q = E_CHARGE, m = M_PROTON, B = [0, 0, 0.5], E = [0, 2e4, 0];
  const v0 = [1e5, 0, 0];
  const th = lorentzTheory({ q, m, v0, E, B });
  close(th.omega, (q * 0.5) / m, 1e-12);
  close(th.driftSpeed, 2e4 / 0.5, 1e-12); // E/B
  for (const method of ['rk45', 'boris']) {
    const res = integrateParticle({
      q, m, r0: [0, 0, 0], v0, T: 10 * th.period, Efun: () => E, Bfun: () => B, method, nSteps: 20000, nSamples: 20000,
    });
    // deriva media = desplazamiento / tiempo sobre 10 periodos completos (en x)
    const N = res.t.length - 1;
    const vd = res.pos[3 * N] / res.t[N];
    close(vd, th.driftSpeed, 5e-3, `deriva ${method}`);
  }
});

test('Boris conserva |v| en campo B puro', () => {
  const res = integrateParticle({ q: E_CHARGE, m: M_PROTON, r0: [0, 0, 0], v0: [1e5, 2e4, 3e4], T: 5e-6, Bfun: () => [0.1, 0, 0.3], method: 'boris', nSteps: 5000 });
  const K = kineticEnergy(M_PROTON, res.vel);
  close(K[K.length - 1], K[0], 1e-10);
});

test('Hélice en B uniforme: radio de Larmor r = m v⊥ / (|q| B)', () => {
  const q = -E_CHARGE, m = M_ELECTRON, B = [0, 0, 1e-3];
  const v0 = [1e6, 0, 5e5];
  const th = lorentzTheory({ q, m, v0, E: [0, 0, 0], B });
  const res = integrateParticle({ q, m, r0: [0, 0, 0], v0, T: th.period, Bfun: () => B, method: 'rk45' });
  let ymin = Infinity, ymax = -Infinity;
  for (let i = 0; i < res.t.length; i++) { ymin = Math.min(ymin, res.pos[3 * i + 1]); ymax = Math.max(ymax, res.pos[3 * i + 1]); }
  close((ymax - ymin) / 2, th.radius, 2e-3);
  close(th.radius, (m * 1e6) / (E_CHARGE * 1e-3), 1e-12);
});

test('Capacitor de placas paralelas y energía', () => {
  const C = cap.plateCapacitance(0.01, 1e-3, 1);
  close(C, (EPS0 * 0.01) / 1e-3, 1e-12);
  close(cap.plateCapacitance(0.01, 1e-3, 5), 5 * C, 1e-12);
  const e = cap.storedEnergy({ C: 10e-6, V: 12 });
  close(e.Q, 120e-6, 1e-12); close(e.U, 0.5 * 10e-6 * 144, 1e-12);
  close(cap.storedEnergy({ C: 10e-6, Q: 120e-6 }).U, e.U, 1e-12);
  close(cap.storedEnergy({ V: 12, Q: 120e-6 }).U, e.U, 1e-12);
  close(cap.partialDielectricCapacitance(0.01, 1e-3, 4, 1), 4 * C, 1e-12);
  close(cap.partialDielectricCapacitance(0.01, 1e-3, 4, 0), C, 1e-12);
});

test('Redes de capacitores: energía total = suma de energías', () => {
  for (const topo of ['serie', 'paralelo']) {
    const net = cap.capacitorNetwork([1e-6, 2e-6, 3e-6], 9, topo);
    close(net.items.reduce((s, i) => s + i.U, 0), net.U, 1e-12, topo);
  }
  close(cap.seriesEquivalent([2, 2]), 1, 1e-12);
  close(cap.parallelEquivalent([2, 2]), 4, 1e-12);
});

test('RC: a t = τ el capacitor alcanza 63.2 % y la energía disipada = ½CV²', () => {
  const r = cap.rcCharge(10, 1000, 1e-6, 1e-3);
  close(r.vc, 10 * (1 - Math.exp(-1)), 1e-12);
  let diss = 0;
  const dt = 1e-6;
  for (let t = 0; t < 12e-3; t += dt) { const i = cap.rcCharge(10, 1000, 1e-6, t).i; diss += i * i * 1000 * dt; }
  close(diss, 0.5 * 1e-6 * 100, 2e-3);
});

test('Circuitos: serie, paralelo y mixto', () => {
  assert.equal(circ.equivalent(circ.S(circ.R(10), circ.R(20))), 30);
  close(circ.equivalent(circ.P(circ.R(10), circ.R(10))), 5, 1e-12);
  const mixed = circ.S(circ.R(10), circ.P(circ.R(30), circ.R(60)), circ.R(5));
  const r = circ.solve(mixed, 12);
  close(r.Req, 10 + 20 + 5, 1e-12);
  close(r.I, 12 / 35, 1e-12);
  close(circ.dissipated(r.tree), r.P, 1e-12); // balance de potencia
  const [r1, r2, r3, r4] = circ.flatten(r.tree);
  close(r2.V, r3.V, 1e-12);
  close(r2.I + r3.I, r1.I, 1e-12); // ley de nodos
  close(r1.V + r2.V + r4.V, 12, 1e-12); // ley de mallas
});

test('Biot–Savart: espira (centro y eje) y solenoide', () => {
  const I = 3, R = 0.05;
  const loop = mag.makeSource('espira', { I, R });
  close(loop.B(0, 0, 0)[2], mag.theory.loopCenter(I, R), 2e-4);
  close(loop.B(0, 0, 0.08)[2], mag.theory.loopAxis(I, R, 0.08), 2e-4);
  const sol = mag.makeSource('solenoide', { I: 2, R: 0.02, L: 0.5, N: 400 });
  close(sol.B(0, 0, 0)[2], mag.theory.solenoidCenter(400, 0.5, 0.02, 2), 2e-3);
});

test('Hilo recto infinito: B = μ0 I / (2π ρ), circulación (ley de Ampère)', () => {
  const w = mag.makeSource('hilo', { I: 10 });
  const [bx, by] = w.B(0.1, 0, 0);
  close(by, mag.theory.wire(10, 0.1), 1e-9);
  assert.ok(Math.abs(bx) < 1e-15);
  // ∮B·dl alrededor de una circunferencia = μ0 I
  let circ = 0; const n = 360, rho = 0.3;
  for (let k = 0; k < n; k++) {
    const a = (2 * Math.PI * k) / n;
    const [x, y] = [rho * Math.cos(a), rho * Math.sin(a)];
    const [bxx, byy] = w.B(x, y, 0);
    circ += (-bxx * Math.sin(a) + byy * Math.cos(a)) * rho * ((2 * Math.PI) / n);
  }
  close(circ, MU0 * 10, 1e-9);
});

test('Espira lejana ≈ dipolo magnético m = I π R²', () => {
  const I = 2, R = 0.02, loop = mag.makeSource('espira', { I, R });
  const m = I * Math.PI * R * R;
  const p = [0.1, 0.05, 0.2];
  const b1 = loop.B(...p), b2 = mag.dipoleField([0, 0, m], ...p);
  for (let i = 0; i < 3; i++) close(b1[i], b2[i], 2e-2);
});

test('Líneas de campo magnético: la línea de una espira se cierra', () => {
  const loop = mag.makeSource('espira', { I: 1, R: 0.05 });
  const line = mag.fullBLine(loop.B, [0.02, 0, 0], { h: 0.005, bound: 0.6, maxSteps: 1500 });
  assert.ok(line.length > 30);
});

test('Marching squares: isolínea de V=cte alrededor de una carga es una circunferencia', () => {
  const ch = [{ q: 1e-9, x: 0, y: 0, z: 0 }];
  const n = 201, L = 4, V0 = (K_E * 1e-9) / 2; // r = 2 m
  const vals = new Float32Array(n * n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) vals[j * n + i] = potentialAt(ch, -L + (2 * L * i) / (n - 1), -L + (2 * L * j) / (n - 1), 0, 1e-3);
  const seg = marchingSquares(vals, n, n, V0, -L, L, -L, L);
  assert.ok(seg.length > 100);
  for (let i = 0; i < seg.length; i += 2) close(Math.hypot(seg[i], seg[i + 1]), 2, 5e-3);
});

test('Marching tetrahedra: la isosuperficie de una carga es una esfera', () => {
  const ch = [{ q: 1e-9, x: 0, y: 0, z: 0 }];
  const n = 33, L = 3, V0 = (K_E * 1e-9) / 1.5;
  const vals = new Float32Array(n * n * n);
  for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    vals[(k * n + j) * n + i] = potentialAt(ch, -L + (2 * L * i) / (n - 1), -L + (2 * L * j) / (n - 1), -L + (2 * L * k) / (n - 1), 1e-3);
  }
  const tri = marchingTetrahedra(vals, n, V0, L);
  assert.ok(tri.length > 300);
  for (let i = 0; i < tri.length; i += 3) close(Math.hypot(tri[i], tri[i + 1], tri[i + 2]), 1.5, 2e-2);
});
