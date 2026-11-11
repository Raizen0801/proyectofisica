"""Circuitos de resistencias (Unidad 3): reducción serie/paralelo y análisis nodal (MNA).

Un circuito se describe con un árbol de diccionarios:
    {"tipo": "R", "R": 10.0} | {"tipo": "S", "hijos": [...]} | {"tipo": "P", "hijos": [...]}
con una fuente de voltaje V en serie con la raíz.
"""
from __future__ import annotations

import numpy as np


def R(valor):
    return {"tipo": "R", "R": float(valor)}


def S(*hijos):
    return {"tipo": "S", "hijos": list(hijos)}


def P(*hijos):
    return {"tipo": "P", "hijos": list(hijos)}


def equivalente(n) -> float:
    if n["tipo"] == "R":
        return n["R"]
    rs = [equivalente(h) for h in n["hijos"]]
    return sum(rs) if n["tipo"] == "S" else 1.0 / sum(1.0 / r for r in rs)


def resolver(raiz, V):
    """Reducción recursiva. Devuelve ``{"Req", "I", "P", "resistores": [{R, I, V, P}, ...]}`` en orden de lectura."""
    res = []

    def anota(n, v, i):
        if n["tipo"] == "R":
            res.append({"R": n["R"], "I": i, "V": v, "P": v * i})
        elif n["tipo"] == "S":
            for h in n["hijos"]:
                anota(h, i * equivalente(h), i)
        else:
            for h in n["hijos"]:
                anota(h, v, v / equivalente(h))

    Req = equivalente(raiz)
    I = V / Req
    anota(raiz, V, I)
    return {"Req": Req, "I": I, "P": V * I, "resistores": res}


def a_netlist(raiz):
    """Aristas (a, b, R) con nodos enteros; el nodo 0 es el borne + de la fuente y -1 la tierra."""
    aristas, cont = [], [1]

    def construir(n, a, b):
        if n["tipo"] == "R":
            aristas.append((a, b, n["R"]))
        elif n["tipo"] == "S":
            cur = a
            for i, h in enumerate(n["hijos"]):
                if i == len(n["hijos"]) - 1:
                    nxt = b
                else:
                    nxt = cont[0]
                    cont[0] += 1
                construir(h, cur, nxt)
                cur = nxt
        else:
            for h in n["hijos"]:
                construir(h, a, b)

    construir(raiz, 0, -1)
    return aristas, cont[0]


def resolver_mna(raiz, V):
    """Análisis nodal: con el nodo 0 fijo en V resuelve el resto. Devuelve corrientes por resistor (orden de lectura)."""
    aristas, n = a_netlist(raiz)
    G = np.zeros((n, n))
    for a, b, r in aristas:
        g = 1.0 / r
        if a >= 0:
            G[a, a] += g
        if b >= 0:
            G[b, b] += g
        if a >= 0 and b >= 0:
            G[a, b] -= g
            G[b, a] -= g
    v = np.zeros(n)
    v[0] = V
    libres = list(range(1, n))
    if libres:
        rhs = -G[np.ix_(libres, [0])].ravel() * V
        v[libres] = np.linalg.solve(G[np.ix_(libres, libres)], rhs)

    def volt(k):
        return 0.0 if k < 0 else v[k]

    corrientes = [(volt(a) - volt(b)) / r for a, b, r in aristas]
    total = float(sum((volt(a) - volt(b)) / r for a, b, r in aristas if a == 0))
    return {"I": total, "corrientes": corrientes, "voltajes_nodo": v}
