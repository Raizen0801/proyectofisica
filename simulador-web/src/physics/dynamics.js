// Dinámica de partículas cargadas: m dv/dt = q (E + v × B).
// Dos integradores: Dormand–Prince 5(4) adaptativo (RK45) y Boris (campos uniformes).

const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// Coeficientes de Dormand–Prince
const C = [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];
const A = [
  [],
  [1 / 5],
  [3 / 40, 9 / 40],
  [44 / 45, -56 / 15, 32 / 9],
  [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
  [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
  [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84],
];
const B5 = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
const B4 = [5179 / 57600, 0, 7571 / 16695, 393 / 640, -92097 / 339200, 187 / 2100, 1 / 40];

/**
 * Integrador adaptativo Dormand–Prince. f(t, y) -> dy/dt (Array). Devuelve { t: number[], y: number[][] }.
 */
export function dopri5(f, t0, y0, t1, { rtol = 1e-9, atol = 1e-12, hmax = Infinity, maxSteps = 400000 } = {}) {
  const n = y0.length;
  const atolv = Array.isArray(atol) ? atol : new Array(n).fill(atol);
  let t = t0;
  let y = y0.slice();
  const ts = [t];
  const ys = [y.slice()];
  let h = Math.min(hmax, (t1 - t0) / 100);
  let k = [];
  for (let step = 0; step < maxSteps && t < t1; step++) {
    if (t + h > t1) h = t1 - t;
    k = [f(t, y)];
    for (let s = 1; s < 7; s++) {
      const ytmp = y.map((yi, i) => {
        let acc = 0;
        for (let j = 0; j < s; j++) acc += A[s][j] * k[j][i];
        return yi + h * acc;
      });
      k.push(f(t + C[s] * h, ytmp));
    }
    let err = 0;
    const y5 = new Array(n);
    for (let i = 0; i < n; i++) {
      let s5 = 0, s4 = 0;
      for (let s = 0; s < 7; s++) { s5 += B5[s] * k[s][i]; s4 += B4[s] * k[s][i]; }
      y5[i] = y[i] + h * s5;
      const y4i = y[i] + h * s4;
      const sc = atolv[i] + rtol * Math.max(Math.abs(y[i]), Math.abs(y5[i]));
      err = Math.max(err, Math.abs(y5[i] - y4i) / sc);
    }
    if (err <= 1) {
      t += h; y = y5;
      ts.push(t); ys.push(y.slice());
    }
    const fac = err === 0 ? 5 : Math.min(5, Math.max(0.2, 0.9 * Math.pow(err, -0.2)));
    h = Math.min(hmax, h * fac);
    if (h < 1e-30) break;
  }
  return { t: ts, y: ys };
}

/**
 * Trayectoria de una partícula cargada.
 * @param p { q, m, r0:[x,y,z], v0:[vx,vy,vz], T, Efun(x,y,z)->[..], Bfun(x,y,z)->[..], method:'rk45'|'boris', nSamples }
 * @returns { t, pos: Float64Array(3N), vel: Float64Array(3N), method }
 */
export function integrateParticle(p) {
  const { q, m, r0, v0, T, Efun = () => [0, 0, 0], Bfun = () => [0, 0, 0], method = 'rk45', nSamples = 1200 } = p;
  if (method === 'boris') return borisIntegrate({ ...p, Efun, Bfun, nSteps: p.nSteps || nSamples });
  const qm = q / m;
  const rhs = (_t, s) => {
    const E = Efun(s[0], s[1], s[2]);
    const B = Bfun(s[0], s[1], s[2]);
    const vxB = cross([s[3], s[4], s[5]], B);
    return [s[3], s[4], s[5], qm * (E[0] + vxB[0]), qm * (E[1] + vxB[1]), qm * (E[2] + vxB[2])];
  };
  const speed = Math.hypot(...v0) || 1;
  const L = Math.max(speed * T, 1e-12);
  const res = dopri5(rhs, 0, [...r0, ...v0], T, {
    rtol: 1e-10,
    atol: [L * 1e-12, L * 1e-12, L * 1e-12, speed * 1e-12, speed * 1e-12, speed * 1e-12],
    hmax: T / nSamples,
  });
  const N = res.t.length;
  const pos = new Float64Array(3 * N), vel = new Float64Array(3 * N);
  for (let i = 0; i < N; i++) {
    pos.set(res.y[i].slice(0, 3), 3 * i);
    vel.set(res.y[i].slice(3, 6), 3 * i);
  }
  return { t: Float64Array.from(res.t), pos, vel, method: 'rk45' };
}

/** Integrador de Boris: conserva |v| exactamente en un campo B puro. Mitad de impulso E, giro magnético, mitad de impulso E. */
export function borisIntegrate({ q, m, r0, v0, T, Efun, Bfun, nSteps }) {
  const dt = T / nSteps;
  const qm = q / m;
  const pos = new Float64Array(3 * (nSteps + 1)), vel = new Float64Array(3 * (nSteps + 1)), t = new Float64Array(nSteps + 1);
  let r = r0.slice(), v = v0.slice();
  pos.set(r, 0); vel.set(v, 0);
  for (let n = 1; n <= nSteps; n++) {
    const E = Efun(r[0], r[1], r[2]);
    const B = Bfun(r[0], r[1], r[2]);
    const h = 0.5 * qm * dt;
    const vm = [v[0] + h * E[0], v[1] + h * E[1], v[2] + h * E[2]];
    const tv = [h * B[0], h * B[1], h * B[2]];
    const t2 = tv[0] * tv[0] + tv[1] * tv[1] + tv[2] * tv[2];
    const sv = [(2 * tv[0]) / (1 + t2), (2 * tv[1]) / (1 + t2), (2 * tv[2]) / (1 + t2)];
    const vpr = cross(vm, tv);
    const vprime = [vm[0] + vpr[0], vm[1] + vpr[1], vm[2] + vpr[2]];
    const vpl = cross(vprime, sv);
    const vplus = [vm[0] + vpl[0], vm[1] + vpl[1], vm[2] + vpl[2]];
    const vnew = [vplus[0] + h * E[0], vplus[1] + h * E[1], vplus[2] + h * E[2]];
    // posición con la velocidad media del paso (regla del trapecio)
    r = [r[0] + 0.5 * dt * (v[0] + vnew[0]), r[1] + 0.5 * dt * (v[1] + vnew[1]), r[2] + 0.5 * dt * (v[2] + vnew[2])];
    v = vnew;
    pos.set(r, 3 * n); vel.set(v, 3 * n); t[n] = n * dt;
  }
  return { t, pos, vel, method: 'boris' };
}

/** Energía cinética [J] para cada muestra. */
export function kineticEnergy(m, vel) {
  const N = vel.length / 3;
  const out = new Float64Array(N);
  for (let i = 0; i < N; i++) out[i] = 0.5 * m * (vel[3 * i] ** 2 + vel[3 * i + 1] ** 2 + vel[3 * i + 2] ** 2);
  return out;
}

/** Magnitudes teóricas de movimiento en campos E y B uniformes. */
export function lorentzTheory({ q, m, v0, E, B }) {
  const Bm = Math.hypot(...B);
  const out = { omega: 0, period: Infinity, radius: Infinity, vParallel: 0, vPerp: 0, drift: [0, 0, 0], driftSpeed: 0 };
  if (Bm === 0) return out;
  const bh = B.map((c) => c / Bm);
  const vpar = v0[0] * bh[0] + v0[1] * bh[1] + v0[2] * bh[2];
  // deriva E×B / B²
  const ExB = cross(E, B);
  const drift = ExB.map((c) => c / (Bm * Bm));
  // velocidad perpendicular en el sistema que se mueve con la deriva
  const vperpVec = [v0[0] - vpar * bh[0] - drift[0], v0[1] - vpar * bh[1] - drift[1], v0[2] - vpar * bh[2] - drift[2]];
  out.omega = (Math.abs(q) * Bm) / m;
  out.period = (2 * Math.PI) / out.omega;
  out.vParallel = vpar;
  out.vPerp = Math.hypot(...vperpVec);
  out.radius = out.vPerp / out.omega;
  out.drift = drift;
  out.driftSpeed = Math.hypot(...drift);
  return out;
}
