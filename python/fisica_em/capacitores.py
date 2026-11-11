"""Capacitores, dieléctricos y energía almacenada (Unidad 2)."""
from __future__ import annotations

import numpy as np

from .constantes import EPS0

#: nombre -> (κ, rigidez dieléctrica [V/m]); valores aproximados de tablas
DIELECTRICOS = {
    "vacío": (1.0, np.inf), "aire": (1.00059, 3e6), "teflón": (2.1, 60e6), "papel": (3.7, 16e6),
    "mica": (5.4, 118e6), "vidrio pyrex": (5.6, 14e6), "agua destilada": (80.0, 65e6),
    "titanato de estroncio": (310.0, 8e6),
}


def capacitancia_placas(A, d, kappa=1.0):
    """C = κ ε0 A / d [F]."""
    return kappa * EPS0 * A / d


def capacitancia_parcial(A, d, kappa, x):
    """Dieléctrico insertado una fracción x: C = C0 [1 + (κ-1) x]."""
    return capacitancia_placas(A, d) * (1.0 + (kappa - 1.0) * x)


def energia_almacenada(C=None, V=None, Q=None) -> dict:
    """A partir de dos de (C, V, Q) devuelve las tres magnitudes y U = ½ C V²."""
    if C is not None and V is not None:
        Q = C * V
    elif C is not None and Q is not None:
        V = Q / C
    elif V is not None and Q is not None:
        C = Q / V
    else:
        raise ValueError("Se requieren dos de C, V, Q")
    return {"C": C, "V": V, "Q": Q, "U": 0.5 * C * V**2}


def equivalente_serie(Cs):
    return 1.0 / np.sum(1.0 / np.asarray(Cs, float))


def equivalente_paralelo(Cs):
    return float(np.sum(Cs))


def red(Cs, V, topologia: str) -> dict:
    """Carga, voltaje y energía de cada capacitor en una red serie o paralelo."""
    Cs = np.asarray(Cs, float)
    if topologia == "serie":
        Ceq = equivalente_serie(Cs)
        Q = Ceq * V
        return {"Ceq": Ceq, "Q": Q, "U": 0.5 * Ceq * V**2, "V_i": Q / Cs, "Q_i": np.full_like(Cs, Q), "U_i": Q**2 / (2 * Cs)}
    Ceq = float(Cs.sum())
    return {"Ceq": Ceq, "Q": Ceq * V, "U": 0.5 * Ceq * V**2, "V_i": np.full_like(Cs, V), "Q_i": Cs * V, "U_i": 0.5 * Cs * V**2}


def carga_rc(V, R, C, t):
    """Carga de un capacitor a través de R: v_C = V (1 - e^{-t/RC}); i = (V/R) e^{-t/RC}."""
    tau = R * C
    t = np.asarray(t, float)
    return {"vc": V * (1 - np.exp(-t / tau)), "i": V / R * np.exp(-t / tau), "tau": tau}
