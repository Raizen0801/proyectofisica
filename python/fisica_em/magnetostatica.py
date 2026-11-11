"""Magnetostática (Unidad 4): Biot–Savart numérico, espira exacta (integrales elípticas), hilo, solenoide y dipolo."""
from __future__ import annotations

import numpy as np
from scipy.special import ellipe, ellipk

from .constantes import MU0

MU0_4PI = MU0 / (4 * np.pi)


def segmentos_espira(radio, corriente, n=128, z=0.0):
    """Segmentos de corriente (punto medio, dl, I) de una espira en el plano z; regla del punto medio sobre el arco."""
    da = 2 * np.pi / n
    am = (np.arange(n) + 0.5) * da
    mid = np.column_stack([radio * np.cos(am), radio * np.sin(am), np.full(n, z)])
    dl = np.column_stack([-radio * da * np.sin(am), radio * da * np.cos(am), np.zeros(n)])
    return mid, dl, np.full(n, float(corriente))


def segmentos_solenoide(R, L, N, I, n_modelo=40, n=64):
    """Solenoide como ``min(N, n_modelo)`` espiras con corriente equivalente I·N/n_modelo (punto medio en z)."""
    nm = min(N, n_modelo)
    ieff = I * N / nm
    partes = [segmentos_espira(R, ieff, n, -L / 2 + L * (k + 0.5) / nm) for k in range(nm)]
    return tuple(np.concatenate([p[i] for p in partes]) for i in range(3))


def biot_savart(segmentos, puntos):
    """B(r) = μ0/4π Σ I dl × (r - r_m)/|r - r_m|³ [T], para ``puntos`` (M, 3)."""
    mid, dl, I = segmentos
    p = np.atleast_2d(np.asarray(puntos, float))
    r = p[:, None, :] - mid[None, :, :]
    r2 = np.sum(r * r, axis=2) + 1e-12
    f = I[None, :] / (r2 * np.sqrt(r2))
    return MU0_4PI * np.sum(f[:, :, None] * np.cross(dl[None, :, :], r), axis=1)


def espira_exacta(I, R, rho, z):
    """Campo exacto de una espira (integrales elípticas completas): devuelve (B_rho, B_z) en [T]."""
    rho = np.asarray(rho, float)
    z = np.asarray(z, float)
    a2 = (R + rho) ** 2 + z**2
    b2 = (R - rho) ** 2 + z**2
    k2 = 4 * R * rho / a2
    K, E = ellipk(k2), ellipe(k2)
    c = MU0 * I / (2 * np.pi)
    Bz = c / np.sqrt(a2) * (K + (R**2 - rho**2 - z**2) / b2 * E)
    with np.errstate(divide="ignore", invalid="ignore"):
        Brho = np.where(rho > 0, c * z / (rho * np.sqrt(a2)) * (-K + (R**2 + rho**2 + z**2) / b2 * E), 0.0)
    return Brho, Bz


def hilo_infinito(I, rho):
    """|B| de un hilo recto infinito: μ0 I / (2π ρ)."""
    return MU0 * I / (2 * np.pi * rho)


def dipolo(m, puntos):
    """Campo de un dipolo magnético m (3,) en el origen."""
    m = np.asarray(m, float)
    p = np.atleast_2d(np.asarray(puntos, float))
    r = np.linalg.norm(p, axis=1)[:, None]
    return MU0_4PI * (3 * p * (p @ m)[:, None] / r**2 - m) / r**3


def solenoide_centro(N, L, R, I):
    """B en el centro de un solenoide finito: μ0 N I / sqrt(L² + 4R²)."""
    return MU0 * N * I / np.sqrt(L**2 + 4 * R**2)


def fuerza_entre_hilos(I1, I2, d):
    """Fuerza por unidad de longitud entre dos hilos paralelos [N/m] (positiva = atracción)."""
    return MU0 * I1 * I2 / (2 * np.pi * d)
