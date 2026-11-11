"""Dinámica de partículas cargadas en campos E y B (Unidades 1 y 4).

Ecuación de movimiento:  m dv/dt = q (E + v × B)
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable

import numpy as np
from scipy.integrate import solve_ivp

CampoVec = Callable[[np.ndarray], np.ndarray]


@dataclass
class Trayectoria:
    t: np.ndarray
    r: np.ndarray   # (N, 3)
    v: np.ndarray   # (N, 3)

    def energia_cinetica(self, m: float) -> np.ndarray:
        return 0.5 * m * np.sum(self.v**2, axis=1)


def _cero(_r):
    return np.zeros(3)


def trayectoria(q, m, r0, v0, T, E: CampoVec = _cero, B: CampoVec = _cero, metodo="dop853", n=2000):
    """Integra la trayectoria con SciPy (``dop853``, ``rk45``...) o con el esquema de Boris."""
    if metodo == "boris":
        return trayectoria_boris(q, m, r0, v0, T, E, B, n)
    qm = q / m

    def rhs(_t, s):
        r, v = s[:3], s[3:]
        return np.concatenate([v, qm * (E(r) + np.cross(v, B(r)))])

    t_eval = np.linspace(0.0, T, n + 1)
    sol = solve_ivp(rhs, (0.0, T), np.concatenate([r0, v0]).astype(float), method=metodo.upper(),
                    t_eval=t_eval, rtol=1e-10, atol=1e-14)
    return Trayectoria(sol.t, sol.y[:3].T, sol.y[3:].T)


def trayectoria_boris(q, m, r0, v0, T, E: CampoVec = _cero, B: CampoVec = _cero, n=2000):
    """Integrador de Boris (kick–rotación–kick) con posición por regla del trapecio."""
    dt = T / n
    qm = q / m
    r = np.asarray(r0, float).copy()
    v = np.asarray(v0, float).copy()
    R = np.empty((n + 1, 3))
    V = np.empty((n + 1, 3))
    R[0], V[0] = r, v
    for k in range(1, n + 1):
        e, b = E(r), B(r)
        h = 0.5 * qm * dt
        vm = v + h * e
        t = h * b
        s = 2.0 * t / (1.0 + t @ t)
        vp = vm + np.cross(vm + np.cross(vm, t), s)
        vn = vp + h * e
        r = r + 0.5 * dt * (v + vn)
        v = vn
        R[k], V[k] = r, v
    return Trayectoria(np.linspace(0.0, T, n + 1), R, V)


def teoria_lorentz(q, m, v0, E, B) -> dict:
    """Magnitudes analíticas en campos uniformes: ω_c, T, r_L, v_∥, v_E×B."""
    E, B, v0 = (np.asarray(a, float) for a in (E, B, v0))
    Bm = np.linalg.norm(B)
    if Bm == 0:
        return {"omega": 0.0, "periodo": np.inf, "radio": np.inf, "deriva": np.zeros(3), "v_par": 0.0, "v_perp": 0.0}
    bh = B / Bm
    v_par = v0 @ bh
    deriva = np.cross(E, B) / Bm**2
    v_perp = np.linalg.norm(v0 - v_par * bh - deriva)
    omega = abs(q) * Bm / m
    return {"omega": omega, "periodo": 2 * np.pi / omega, "radio": v_perp / omega,
            "deriva": deriva, "v_par": v_par, "v_perp": v_perp}
