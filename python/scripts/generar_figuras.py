"""Genera las figuras del informe técnico y un resumen numérico de validación (docs/resultados_validacion.json).

Uso (desde la carpeta python/):
    py scripts/generar_figuras.py
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

RAIZ = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RAIZ))

from fisica_em import capacitores as cap  # noqa: E402
from fisica_em import circuitos as circ  # noqa: E402
from fisica_em import dinamica, electrostatica as es, magnetostatica as mg  # noqa: E402
from fisica_em.constantes import E_CARGA, EPS0, K_E, M_ELECTRON, M_PROTON, MU0  # noqa: E402

SALIDA = RAIZ.parent / "docs" / "figuras"
SALIDA.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({
    "figure.dpi": 130, "savefig.dpi": 200, "font.size": 10, "axes.grid": True, "grid.alpha": 0.25,
    "axes.spines.top": False, "axes.spines.right": False, "font.family": "DejaVu Sans",
})
AZUL, NARANJA, VERDE, ROJO, GRIS = "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#6c757d"
resultados: dict[str, float | str] = {}


def guardar(fig, nombre):
    fig.savefig(SALIDA / nombre, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("  ->", nombre)


def fig_dipolo():
    c = np.array([[2e-9, -1, 0, 0], [-2e-9, 1, 0, 0]])
    xs = np.linspace(-3, 3, 300)
    X, Y = np.meshgrid(xs, xs)
    pts = np.column_stack([X.ravel(), Y.ravel(), np.zeros(X.size)])
    E = es.campo_electrico(c, pts, 1e-3)
    V = es.potencial(c, pts, 1e-3).reshape(X.shape)
    Ex, Ey = E[:, 0].reshape(X.shape), E[:, 1].reshape(X.shape)
    fig, ax = plt.subplots(1, 2, figsize=(10, 4.4))
    ax[0].streamplot(X, Y, Ex, Ey, color=np.log10(np.hypot(Ex, Ey) + 1e-9), cmap="plasma", density=1.8, linewidth=1)
    for q, x, y, _ in c:
        ax[0].add_patch(plt.Circle((x, y), 0.12, color=ROJO if q > 0 else AZUL, zorder=5))
    ax[0].set(title="Líneas de campo eléctrico (dipolo ±2 nC)", xlabel="x (m)", ylabel="y (m)", aspect="equal")
    niveles = np.concatenate([-np.geomspace(2, 60, 7)[::-1], [0], np.geomspace(2, 60, 7)])
    cs = ax[1].contour(X, Y, V, levels=niveles, cmap="coolwarm", linewidths=1)
    ax[1].clabel(cs, fmt="%.0f V", fontsize=6)
    for q, x, y, _ in c:
        ax[1].add_patch(plt.Circle((x, y), 0.12, color=ROJO if q > 0 else AZUL, zorder=5))
    ax[1].set(title="Equipotenciales (V = 0 en el plano mediatriz)", xlabel="x (m)", aspect="equal")
    guardar(fig, "fig_dipolo.png")
    resultados["dipolo_V_mediatriz"] = float(abs(es.potencial(c, [[0, 2.3, 0]])[0]))


def fig_trayectorias():
    # (a) electrón en campo uniforme: parábola numérica vs analítica
    E0 = np.array([0.0, 1000.0, 0.0])
    q, m, v0, T = -E_CARGA, M_ELECTRON, np.array([1e6, 0, 0.0]), 1e-7
    tr = dinamica.trayectoria(q, m, [0, 0, 0], v0, T, E=lambda r: E0)
    a = q * E0[1] / m
    xa = v0[0] * tr.t
    ya = 0.5 * a * tr.t**2
    err = np.hypot(tr.r[:, 0] - xa, tr.r[:, 1] - ya).max() / np.hypot(xa[-1], ya[-1])
    resultados["parabola_error_relativo"] = float(err)
    # (b) órbita circular en un campo coulombiano y conservación de la energía
    Q = 5e-9
    src = np.array([[Q, 0, 0, 0]])
    v = np.sqrt(K_E * Q * E_CARGA / (M_ELECTRON * 1.0))
    Tc = 2 * np.pi / v
    orb = dinamica.trayectoria(-E_CARGA, M_ELECTRON, [1, 0, 0], [0, v, 0], 3 * Tc,
                               E=lambda r: es.campo_electrico(src, r[None, :], 1e-6)[0], n=3000)
    K = orb.energia_cinetica(M_ELECTRON)
    U = -E_CARGA * es.potencial(src, orb.r, 1e-6)
    Etot = K + U
    resultados["orbita_deriva_energia"] = float(np.abs(Etot / Etot[0] - 1).max())
    resultados["orbita_radio_max_desv"] = float(np.abs(np.linalg.norm(orb.r, axis=1) - 1).max())
    # (c) dispersión de un protón
    disp = dinamica.trayectoria(E_CARGA, M_PROTON, [-5, 0.5, 0], [1.5e5, 0, 0], 7e-5,
                                E=lambda r: es.campo_electrico(src, r[None, :], 1e-6)[0], n=4000)
    fig, ax = plt.subplots(1, 3, figsize=(13, 4))
    ax[0].plot(xa * 1e3, ya * 1e3, "-", color=NARANJA, lw=4, alpha=0.5, label="analítica")
    ax[0].plot(tr.r[:, 0] * 1e3, tr.r[:, 1] * 1e3, "--", color=AZUL, label="DOP853")
    ax[0].set(title="Electrón en E uniforme (1 kV/m)", xlabel="x (mm)", ylabel="y (mm)")
    ax[0].legend()
    ax[1].plot(orb.r[:, 0], orb.r[:, 1], color=AZUL)
    ax[1].plot(0, 0, "o", color=ROJO)
    ax[1].set(title="Órbita de un electrón alrededor de +5 nC", xlabel="x (m)", ylabel="y (m)", aspect="equal")
    ax[2].plot(disp.r[:, 0], disp.r[:, 1], color=VERDE)
    ax[2].plot(0, 0, "o", color=ROJO, ms=9)
    ax[2].set(title="Dispersión de un protón (b = 0.5 m)", xlabel="x (m)", ylabel="y (m)", aspect="equal")
    guardar(fig, "fig_trayectorias.png")

    fig, ax = plt.subplots(figsize=(6.4, 3.6))
    t = orb.t * 1e6
    ax.plot(t, K / E_CARGA, label="K", color=AZUL)
    ax.plot(t, U / E_CARGA, label="U = qV", color=NARANJA)
    ax.plot(t, Etot / E_CARGA, label="K + U", color=VERDE, ls="--")
    ax.set(xlabel="t (µs)", ylabel="energía (eV)", title="Conservación de la energía en la órbita")
    ax.legend()
    guardar(fig, "fig_energia_orbita.png")


def fig_capacitores():
    d = np.linspace(0.2e-3, 10e-3, 200)
    A = 100e-4
    fig, ax = plt.subplots(1, 3, figsize=(13, 3.9))
    for nombre in ("vacío", "papel", "mica", "agua destilada"):
        kappa = cap.DIELECTRICOS[nombre][0]
        ax[0].plot(d * 1e3, cap.capacitancia_placas(A, d, kappa) * 1e12, label=f"{nombre} (κ={kappa:g})")
    ax[0].set(xlabel="d (mm)", ylabel="C (pF)", title="C = κ ε₀ A / d  (A = 100 cm²)", yscale="log")
    ax[0].legend(fontsize=8)
    x = np.linspace(0, 1, 100)
    ax[1].plot(x * 100, cap.capacitancia_parcial(A, 2e-3, 5.4, x) * 1e12, color=NARANJA)
    ax[1].set(xlabel="inserción (%)", ylabel="C (pF)", title="Dieléctrico de mica insertado parcialmente")
    C = cap.capacitancia_placas(A, d)
    V0, Q0 = 12.0, cap.capacitancia_placas(A, 2e-3) * 12.0
    ax[2].plot(d * 1e3, 0.5 * C * V0**2 * 1e9, label="V constante", color=AZUL)
    ax[2].plot(d * 1e3, Q0**2 / (2 * C) * 1e9, label="Q constante", color=NARANJA)
    ax[2].set(xlabel="d (mm)", ylabel="U (nJ)", title="Energía al separar las placas")
    ax[2].legend()
    guardar(fig, "fig_capacitores.png")
    # RC
    R, Cc, V = 1000.0, 100e-6, 12.0
    t = np.linspace(0, 10 * R * Cc, 6000)
    rc = cap.carga_rc(V, R, Cc, t)
    uC = 0.5 * Cc * rc["vc"] ** 2
    diss = np.concatenate([[0], np.cumsum(0.5 * (rc["i"][1:] ** 2 + rc["i"][:-1] ** 2) * R * np.diff(t))])
    fuente = V * Cc * rc["vc"]
    fig, ax = plt.subplots(1, 2, figsize=(10, 3.7))
    ax[0].plot(t * 1e3, rc["vc"], color=AZUL, label="v_C")
    ax[0].plot(t * 1e3, rc["i"] * R, color=NARANJA, label="i·R = v_R")
    ax[0].axvline(R * Cc * 1e3, color=GRIS, ls=":")
    ax[0].set(xlabel="t (ms)", ylabel="V", title=f"Carga RC (τ = {R * Cc * 1e3:.0f} ms)")
    ax[0].legend()
    ax[1].plot(t * 1e3, uC * 1e3, label="almacenada en C", color=AZUL)
    ax[1].plot(t * 1e3, diss * 1e3, label="disipada en R", color=NARANJA)
    ax[1].plot(t * 1e3, fuente * 1e3, label="entregada por la fuente", color=VERDE, ls="--")
    ax[1].set(xlabel="t (ms)", ylabel="energía (mJ)", title="Balance de energía")
    ax[1].legend(fontsize=8)
    guardar(fig, "fig_rc.png")
    resultados["rc_energia_disipada_vs_almacenada"] = float(diss[-1] / uC[-1])
    resultados["rc_energia_fuente_vs_CV2"] = float(fuente[-1] / (Cc * V**2))


def fig_circuitos():
    arbol = circ.S(circ.R(100), circ.P(circ.S(circ.R(220), circ.R(330)), circ.R(150)), circ.P(circ.R(470), circ.R(680), circ.R(1000)))
    r = circ.resolver(arbol, 12)
    m = circ.resolver_mna(arbol, 12)
    Ires = np.array([x["I"] for x in r["resistores"]]) * 1e3
    Imna = np.array(m["corrientes"]) * 1e3
    resultados["circuito_dif_max_reduccion_vs_mna"] = float(np.abs(Ires - Imna).max() / Ires.max())
    resultados["circuito_balance_potencia"] = float(sum(x["P"] for x in r["resistores"]) / r["P"])
    fig, ax = plt.subplots(1, 2, figsize=(10, 3.7))
    idx = np.arange(len(Ires))
    ax[0].bar(idx - 0.2, Ires, 0.4, label="reducción serie/paralelo", color=AZUL)
    ax[0].bar(idx + 0.2, Imna, 0.4, label="análisis nodal (MNA)", color=NARANJA)
    ax[0].set(xticks=idx, xticklabels=[f"R{i + 1}" for i in idx], ylabel="I (mA)", title="Corriente por resistor (12 V)")
    ax[0].legend(fontsize=8)
    V = np.linspace(0, 24, 50)
    for Rv, col in zip((10, 100, 1000), (AZUL, NARANJA, VERDE)):
        ax[1].plot(V, V / Rv, color=col, label=f"R = {Rv} Ω")
    ax[1].set(xlabel="V (V)", ylabel="I (A)", title="Ley de Ohm: I = V / R", yscale="log")
    ax[1].legend()
    guardar(fig, "fig_circuitos.png")


def fig_magnetico():
    I, R = 3.0, 0.05
    z = np.linspace(-0.2, 0.2, 201)
    seg = mg.segmentos_espira(R, I)
    B_num = mg.biot_savart(seg, np.column_stack([np.zeros_like(z), np.zeros_like(z), z]))[:, 2]
    B_ex = MU0 * I * R**2 / (2 * (R**2 + z**2) ** 1.5)
    resultados["espira_eje_error_relativo_max"] = float(np.abs(B_num / B_ex - 1).max())
    # convergencia con el número de segmentos
    ns = np.array([4, 8, 16, 32, 64, 128])
    rho, zz = 0.03, 0.02
    ref = float(mg.espira_exacta(I, R, rho, zz)[1])
    errs = [abs(mg.biot_savart(mg.segmentos_espira(R, I, n), [[rho, 0, zz]])[0, 2] / ref - 1) for n in ns]
    # solenoide
    Rs, L, N, Is = 0.02, 0.4, 400, 2.0
    zs = np.linspace(-0.4, 0.4, 161)
    segs = mg.segmentos_solenoide(Rs, L, N, Is)
    Bs = mg.biot_savart(segs, np.column_stack([np.zeros_like(zs), np.zeros_like(zs), zs]))[:, 2]
    ideal = MU0 * N * Is / L
    # hilos
    fig, ax = plt.subplots(1, 3, figsize=(13, 3.9))
    ax[0].plot(z * 100, B_ex * 1e6, color=NARANJA, lw=4, alpha=0.5, label="analítica")
    ax[0].plot(z * 100, B_num * 1e6, "--", color=AZUL, label="Biot–Savart numérico")
    ax[0].set(xlabel="z (cm)", ylabel="B_z (µT)", title="Eje de una espira (R = 5 cm, 3 A)")
    ax[0].legend(fontsize=8)
    ax[1].loglog(ns, errs, "o-", color=VERDE)
    ax[1].set(xlabel="segmentos por espira", ylabel="error relativo", title="Convergencia de Biot–Savart (fuera del eje)")
    ax[2].plot(zs * 100, Bs * 1e3, color=AZUL, label="Biot–Savart")
    ax[2].axhline(ideal * 1e3, color=ROJO, ls="--", label="μ₀ N I / L (ideal)")
    ax[2].axvspan(-L * 50, L * 50, color=GRIS, alpha=0.08)
    ax[2].set(xlabel="z (cm)", ylabel="B_z (mT)", title="Campo en el eje de un solenoide")
    ax[2].legend(fontsize=8)
    guardar(fig, "fig_magnetico.png")
    resultados["solenoide_centro_error"] = float(abs(Bs[80] / mg.solenoide_centro(N, L, Rs, Is) - 1))
    resultados["convergencia_biot_savart_n128"] = float(errs[-1])


def fig_lorentz():
    q, m = E_CARGA, M_PROTON
    fig = plt.figure(figsize=(14, 4.4))
    fig.subplots_adjust(wspace=0.5)
    # hélice
    B = np.array([0, 0, 0.1])
    v0 = np.array([8.66e4, 0, 5e4])
    th = dinamica.teoria_lorentz(q, m, v0, [0, 0, 0], B)
    tr = dinamica.trayectoria(q, m, [0, 0, 0], v0, 4 * th["periodo"], B=lambda r: B)
    ax = fig.add_subplot(1, 3, 1, projection="3d")
    ax.plot(*(tr.r.T * 1e3), color=AZUL)
    ax.set(title="Hélice en B uniforme", xlabel="x (mm)", ylabel="y (mm)", zlabel="z (mm)")
    ymed = (tr.r[:, 1].max() - tr.r[:, 1].min()) / 2
    resultados["helice_radio_teorico_m"] = float(th["radio"])
    resultados["helice_radio_medido_m"] = float(ymed)
    # cicloide
    E = np.array([0, 1e3, 0])
    th2 = dinamica.teoria_lorentz(q, m, [0, 0, 0], E, B)
    tc = dinamica.trayectoria(q, m, [0, 0, 0], [0, 0, 0], 4 * th2["periodo"], E=lambda r: E, B=lambda r: B, n=4000)
    ax2 = fig.add_subplot(1, 3, 2)
    ax2.plot(tc.r[:, 0] * 1e3, tc.r[:, 1] * 1e3, color=NARANJA)
    ax2.set(title="Cicloide: deriva E×B", xlabel="x (mm)", ylabel="y (mm)", aspect="equal")
    resultados["cicloide_deriva_teorica"] = float(np.linalg.norm(th2["deriva"]))
    resultados["cicloide_deriva_medida"] = float(tc.r[-1, 0] / tc.t[-1])
    # selector de velocidades
    E3 = np.array([0, 1e4, 0])
    vs = 1e4 / 0.1
    ts = dinamica.trayectoria(q, m, [0, 0, 0], [vs, 0, 0], 2e-6, E=lambda r: E3, B=lambda r: B)
    tm = dinamica.trayectoria(q, m, [0, 0, 0], [0.7 * vs, 0, 0], 2e-6, E=lambda r: E3, B=lambda r: B)
    tl = dinamica.trayectoria(q, m, [0, 0, 0], [1.4 * vs, 0, 0], 2e-6, E=lambda r: E3, B=lambda r: B)
    ax3 = fig.add_subplot(1, 3, 3)
    ax3.plot(ts.r[:, 0] * 1e3, ts.r[:, 1] * 1e3, color=VERDE, label="v = E/B")
    ax3.plot(tm.r[:, 0] * 1e3, tm.r[:, 1] * 1e3, color=AZUL, label="v = 0.7 E/B")
    ax3.plot(tl.r[:, 0] * 1e3, tl.r[:, 1] * 1e3, color=ROJO, label="v = 1.4 E/B")
    ax3.set(title="Selector de velocidades", xlabel="x (mm)", ylabel="y (mm)")
    ax3.legend(fontsize=8)
    guardar(fig, "fig_lorentz.png")
    resultados["selector_desviacion_y_max_m"] = float(np.abs(ts.r[:, 1]).max())

    # calidad numérica: Boris vs RK45 vs pasos por período
    th = dinamica.teoria_lorentz(q, m, [1e5, 0, 0], [0, 0, 0], B)
    T = 20 * th["periodo"]
    pasos = np.array([32, 48, 64, 96, 128, 192, 256, 384])
    e_b, e_pos = [], []
    for ps in pasos:
        tb = dinamica.trayectoria_boris(q, m, [0, 0, 0], [1e5, 0, 0], T, B=lambda r: B, n=int(20 * ps))
        K = tb.energia_cinetica(m)
        e_b.append(abs(K[-1] / K[0] - 1) + 1e-17)
        ref = dinamica.trayectoria(q, m, [0, 0, 0], [1e5, 0, 0], T, B=lambda r: B, n=int(20 * ps))
        K2 = ref.energia_cinetica(m)
        e_pos.append(np.linalg.norm(tb.r[-1] - ref.r[-1]) / th["radio"])
    # error en posición frente a dt (orden 2)
    dts = T / (20 * pasos)
    fig, ax = plt.subplots(1, 2, figsize=(10, 3.7))
    ax[0].loglog(pasos, e_b, "o-", color=AZUL)
    ax[0].set(xlabel="pasos por período", ylabel="|ΔK/K₀| tras 20 períodos", title="Boris: conservación de la energía en B puro")
    ax[1].loglog(dts * 1e9, e_pos, "o-", color=NARANJA, label="error de posición")
    pend = np.polyfit(np.log(dts), np.log(e_pos), 1)[0]
    ax[1].loglog(dts * 1e9, e_pos[0] * (dts / dts[0]) ** 2, ":", color=GRIS, label="pendiente 2")
    ax[1].set(xlabel="Δt (ns)", ylabel="error / r_L", title=f"Orden de convergencia medido: {pend:.2f}")
    ax[1].legend()
    guardar(fig, "fig_boris.png")
    resultados["boris_orden_convergencia"] = float(pend)
    resultados["boris_deriva_energia_32_pasos"] = float(e_b[0])


def main():
    print("Generando figuras en", SALIDA)
    fig_dipolo()
    fig_trayectorias()
    fig_capacitores()
    fig_circuitos()
    fig_magnetico()
    fig_lorentz()
    (SALIDA.parent / "resultados_validacion.json").write_text(json.dumps(resultados, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(resultados, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
