"""Electrostática de cargas puntuales (Unidad 1).

Las cargas se pasan como arreglo ``(N, 4)`` con columnas ``[q (C), x, y, z (m)]``.
"""
from __future__ import annotations

import numpy as np
from scipy.integrate import solve_ivp

from .constantes import K_E


def _as_cargas(cargas) -> np.ndarray:
    return np.atleast_2d(np.asarray(cargas, dtype=float))


def campo_electrico(cargas, puntos, suavizado: float = 1e-9) -> np.ndarray:
    """Campo E = Σ k q (r - r_i) / |r - r_i|³ en ``puntos`` (M, 3) -> (M, 3) [V/m]."""
    c = _as_cargas(cargas)
    p = np.atleast_2d(np.asarray(puntos, dtype=float))
    d = p[:, None, :] - c[None, :, 1:4]                       # (M, N, 3)
    r2 = np.sum(d * d, axis=2) + suavizado**2                 # (M, N)
    f = K_E * c[None, :, 0] / (r2 * np.sqrt(r2))              # (M, N)
    return np.sum(f[:, :, None] * d, axis=1)


def potencial(cargas, puntos, suavizado: float = 1e-9) -> np.ndarray:
    """Potencial V = Σ k q / |r - r_i| en ``puntos`` -> (M,) [V]."""
    c = _as_cargas(cargas)
    p = np.atleast_2d(np.asarray(puntos, dtype=float))
    d = p[:, None, :] - c[None, :, 1:4]
    r = np.sqrt(np.sum(d * d, axis=2) + suavizado**2)
    return np.sum(K_E * c[None, :, 0] / r, axis=1)


def contribuciones(cargas, punto) -> list[dict]:
    """Aporte individual de cada carga al potencial y al campo en ``punto``."""
    c = _as_cargas(cargas)
    p = np.asarray(punto, dtype=float)
    out = []
    for q, x, y, z in c:
        d = p - np.array([x, y, z])
        r = np.linalg.norm(d)
        out.append({"r": r, "V": K_E * q / r, "E": K_E * abs(q) / r**2})
    return out


def energia_sistema(cargas) -> float:
    """Energía potencial del sistema U = Σ_{i<j} k q_i q_j / r_ij [J]."""
    c = _as_cargas(cargas)
    u = 0.0
    for i in range(len(c)):
        for j in range(i + 1, len(c)):
            u += K_E * c[i, 0] * c[j, 0] / np.linalg.norm(c[i, 1:4] - c[j, 1:4])
    return float(u)


def malla_potencial(cargas, xlim, ylim, z=0.0, n=200):
    """Potencial en el plano z = cte. Devuelve (X, Y, V) con forma (n, n)."""
    xs = np.linspace(*xlim, n)
    ys = np.linspace(*ylim, n)
    X, Y = np.meshgrid(xs, ys)
    pts = np.column_stack([X.ravel(), Y.ravel(), np.full(X.size, z)])
    return X, Y, potencial(cargas, pts, suavizado=1e-3).reshape(X.shape)


def linea_de_campo(cargas, inicio, sentido=1, paso=0.05, max_pasos=4000, limite=12.0, captura=None):
    """Línea de campo trazada con DOP853 sobre el campo unitario. Devuelve (M, 3)."""
    c = _as_cargas(cargas)
    captura = 1.5 * paso if captura is None else captura

    def rhs(_s, y):
        e = campo_electrico(c, y[None, :], 1e-6)[0]
        n = np.linalg.norm(e) or 1.0
        return sentido * e / n

    def llega_a_carga(_s, y):
        return np.min(np.linalg.norm(c[:, 1:4] - y, axis=1)) - captura
    llega_a_carga.terminal = True
    llega_a_carga.direction = -1

    def sale(_s, y):
        return limite - np.max(np.abs(y))
    sale.terminal = True

    sol = solve_ivp(rhs, (0.0, paso * max_pasos), np.asarray(inicio, float), method="DOP853",
                    events=(llega_a_carga, sale), max_step=paso, rtol=1e-8, atol=1e-10)
    return sol.y.T
