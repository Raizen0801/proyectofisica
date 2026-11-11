"""Genera notebooks/validacion.ipynb (sin salidas). Uso: py notebooks/crear_notebook.py"""
import json
from pathlib import Path


def md(t):
    return {"cell_type": "markdown", "metadata": {}, "source": t.strip("\n").splitlines(keepends=True)}


def code(t):
    return {"cell_type": "code", "metadata": {}, "execution_count": None, "outputs": [], "source": t.strip("\n").splitlines(keepends=True)}


cells = [
    md("""
# Validación del motor físico — Simulador de Campos Eléctricos y Magnéticos 3D

Este cuaderno usa el paquete `fisica_em` (NumPy/SciPy) para reproducir y verificar los resultados del simulador web.
Ejecútalo desde la carpeta `python/` (`jupyter lab`).
"""),
    code("""
import sys; sys.path.insert(0, '..')
import numpy as np, matplotlib.pyplot as plt
from fisica_em import electrostatica as es, dinamica, capacitores as cap, circuitos as circ, magnetostatica as mg
from fisica_em.constantes import *
"""),
    md("## 1. Campo y potencial de un dipolo (Unidad 1)"),
    code("""
cargas = np.array([[2e-9, -1, 0, 0], [-2e-9, 1, 0, 0]])
X, Y, V = es.malla_potencial(cargas, (-3, 3), (-3, 3), n=300)
plt.contour(X, Y, V, levels=np.linspace(-60, 60, 25), cmap='coolwarm'); plt.gca().set_aspect('equal'); plt.title('Equipotenciales del dipolo')
print('V en la mediatriz =', es.potencial(cargas, [[0, 2, 0]])[0], 'V')
"""),
    md("## 2. Trayectoria de un electrón en campo uniforme: numérica vs. analítica"),
    code("""
E0 = np.array([0, 1000., 0]); q, m = -E_CARGA, M_ELECTRON
tr = dinamica.trayectoria(q, m, [0, 0, 0], [1e6, 0, 0], 1e-7, E=lambda r: E0)
a = q*E0[1]/m
print('error relativo en y:', abs(tr.r[-1, 1] - 0.5*a*tr.t[-1]**2) / abs(0.5*a*tr.t[-1]**2))
"""),
    md("## 3. Fuerza de Lorentz: hélice, radio de Larmor y deriva E×B"),
    code("""
B = np.array([0, 0, 0.1]); E = np.array([0, 1e3, 0])
th = dinamica.teoria_lorentz(E_CARGA, M_PROTON, [0, 0, 0], E, B)
tr = dinamica.trayectoria(E_CARGA, M_PROTON, [0, 0, 0], [0, 0, 0], 4*th['periodo'], E=lambda r: E, B=lambda r: B, n=4000)
print('deriva teórica =', np.linalg.norm(th['deriva']), 'm/s | medida =', tr.r[-1, 0]/tr.t[-1], 'm/s')
plt.plot(tr.r[:, 0]*1e3, tr.r[:, 1]*1e3); plt.xlabel('x (mm)'); plt.ylabel('y (mm)'); plt.title('Cicloide')
"""),
    md("## 4. Integrador de Boris: conservación de |v| y orden 2"),
    code("""
q, m = E_CARGA, M_PROTON; B = np.array([0, 0, 0.1])
th = dinamica.teoria_lorentz(q, m, [1e5, 0, 0], [0, 0, 0], B); T = 20*th['periodo']
ref = dinamica.trayectoria(q, m, [0, 0, 0], [1e5, 0, 0], T, B=lambda r: B, n=20)
prev = None
for ps in [64, 128, 256, 512]:
    tb = dinamica.trayectoria_boris(q, m, [0, 0, 0], [1e5, 0, 0], T, B=lambda r: B, n=20*ps)
    e = np.linalg.norm(tb.r[-1]-ref.r[-1])/th['radio']
    print(ps, e, '' if prev is None else f'orden = {np.log2(prev/e):.2f}'); prev = e
"""),
    md("## 5. Circuitos: reducción serie/paralelo frente a análisis nodal"),
    code("""
arbol = circ.S(circ.R(100), circ.P(circ.S(circ.R(220), circ.R(330)), circ.R(150)), circ.P(circ.R(470), circ.R(680)))
r, mna = circ.resolver(arbol, 12), circ.resolver_mna(arbol, 12)
print('I (reducción) =', r['I'], ' I (MNA) =', mna['I'])
print('máx. diferencia por resistor:', np.abs(np.array([x['I'] for x in r['resistores']]) - mna['corrientes']).max())
"""),
    md("## 6. Biot–Savart numérico frente a la solución exacta de la espira"),
    code("""
I, R = 3.0, 0.05
for n in [8, 16, 32, 64, 128]:
    num = mg.biot_savart(mg.segmentos_espira(R, I, n), [[0.03, 0, 0.02]])[0, 2]
    ex = float(mg.espira_exacta(I, R, 0.03, 0.02)[1])
    print(n, abs(num/ex - 1))
"""),
]

nb = {"cells": cells, "metadata": {"kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"}, "language_info": {"name": "python"}}, "nbformat": 4, "nbformat_minor": 5}
destino = Path(__file__).with_name("validacion.ipynb")
destino.write_text(json.dumps(nb, ensure_ascii=False, indent=1), encoding="utf-8")
print("escrito", destino)
