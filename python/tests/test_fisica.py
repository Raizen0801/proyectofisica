"""Pruebas del paquete fisica_em contra soluciones analíticas."""
import numpy as np
import pytest

from fisica_em import capacitores as cap
from fisica_em import circuitos as circ
from fisica_em import dinamica, electrostatica as es, magnetostatica as mg
from fisica_em.constantes import E_CARGA, EPS0, K_E, M_ELECTRON, M_PROTON, MU0


def test_coulomb_carga_puntual():
    c = [[1e-9, 0, 0, 0]]
    assert es.campo_electrico(c, [[1, 0, 0]])[0, 0] == pytest.approx(K_E * 1e-9)
    assert es.potencial(c, [[2, 0, 0]])[0] == pytest.approx(K_E * 1e-9 / 2)


def test_superposicion_dipolo():
    c = [[2e-9, -1, 0, 0], [-2e-9, 1, 0, 0]]
    assert abs(es.potencial(c, [[0, 3, 2]])[0]) < 1e-9
    assert es.campo_electrico(c, [[0, 0, 0]])[0, 0] == pytest.approx(2 * K_E * 2e-9)


def test_energia_dos_cargas():
    c = [[1e-9, 0, 0, 0], [2e-9, 0.5, 0, 0]]
    assert es.energia_sistema(c) == pytest.approx(K_E * 2e-18 / 0.5)


def test_linea_de_campo_termina_en_carga_negativa():
    c = [[1e-9, -1, 0, 0], [-1e-9, 1, 0, 0]]
    linea = es.linea_de_campo(c, [-1 + 0.12, 0, 0], sentido=1)
    assert np.linalg.norm(linea[-1] - np.array([1, 0, 0])) < 0.15


def test_campo_uniforme_parabola():
    E = np.array([0.0, 1000.0, 0.0])
    q, m, v0, T = -E_CARGA, M_ELECTRON, np.array([1e6, 0, 0]), 1e-7
    tr = dinamica.trayectoria(q, m, [0, 0, 0], v0, T, E=lambda r: E)
    a = q * E[1] / m
    assert tr.r[-1, 0] == pytest.approx(1e6 * T, rel=1e-8)
    assert tr.r[-1, 1] == pytest.approx(0.5 * a * T**2, rel=1e-8)


def test_trabajo_energia_campo_coulombiano():
    src = np.array([[5e-9, 0, 0, 0]])
    tr = dinamica.trayectoria(E_CARGA, M_PROTON, [0.5, 0, 0], [0, 3e3, 0], 2e-5,
                              E=lambda r: es.campo_electrico(src, r[None, :])[0])
    K = tr.energia_cinetica(M_PROTON)
    dU = E_CARGA * (es.potencial(src, tr.r[-1:])[0] - es.potencial(src, [[0.5, 0, 0]])[0])
    assert K[-1] - K[0] == pytest.approx(-dU, rel=1e-7)


@pytest.mark.parametrize("metodo", ["dop853", "boris"])
def test_lorentz_deriva_e_cruzado_b(metodo):
    q, m, B, E, v0 = E_CARGA, M_PROTON, np.array([0, 0, 0.5]), np.array([0, 2e4, 0]), np.array([1e5, 0, 0])
    th = dinamica.teoria_lorentz(q, m, v0, E, B)
    assert th["omega"] == pytest.approx(q * 0.5 / m, rel=1e-12)
    T = 10 * th["periodo"]
    tr = dinamica.trayectoria(q, m, [0, 0, 0], v0, T, E=lambda r: E, B=lambda r: B, metodo=metodo, n=20000)
    assert tr.r[-1, 0] / T == pytest.approx(np.linalg.norm(th["deriva"]), rel=5e-3)


def test_boris_conserva_energia_en_b_puro():
    tr = dinamica.trayectoria_boris(E_CARGA, M_PROTON, [0, 0, 0], [1e5, 2e4, 3e4], 5e-6,
                                    B=lambda r: np.array([0.1, 0, 0.3]), n=5000)
    K = tr.energia_cinetica(M_PROTON)
    assert K[-1] == pytest.approx(K[0], rel=1e-10)


def test_radio_de_larmor():
    q, m, B = -E_CARGA, M_ELECTRON, np.array([0, 0, 1e-3])
    th = dinamica.teoria_lorentz(q, m, [1e6, 0, 5e5], [0, 0, 0], B)
    assert th["radio"] == pytest.approx(M_ELECTRON * 1e6 / (E_CARGA * 1e-3), rel=1e-12)
    tr = dinamica.trayectoria(q, m, [0, 0, 0], [1e6, 0, 5e5], th["periodo"], B=lambda r: B)
    assert (tr.r[:, 1].max() - tr.r[:, 1].min()) / 2 == pytest.approx(th["radio"], rel=2e-3)


def test_capacitor_y_energia():
    C = cap.capacitancia_placas(0.01, 1e-3)
    assert C == pytest.approx(EPS0 * 0.01 / 1e-3)
    assert cap.capacitancia_placas(0.01, 1e-3, 5) == pytest.approx(5 * C)
    e = cap.energia_almacenada(C=10e-6, V=12)
    assert e["Q"] == pytest.approx(120e-6) and e["U"] == pytest.approx(0.5 * 10e-6 * 144)
    assert cap.energia_almacenada(C=10e-6, Q=120e-6)["U"] == pytest.approx(e["U"])
    assert cap.energia_almacenada(V=12, Q=120e-6)["U"] == pytest.approx(e["U"])


@pytest.mark.parametrize("topo", ["serie", "paralelo"])
def test_red_capacitores_energia(topo):
    r = cap.red([1e-6, 2e-6, 3e-6], 9, topo)
    assert r["U_i"].sum() == pytest.approx(r["U"])


def test_rc_energia_disipada_igual_a_almacenada():
    t = np.linspace(0, 12e-3, 200001)
    i = cap.carga_rc(10, 1000, 1e-6, t)["i"]
    disipada = np.trapezoid(i**2 * 1000, t)
    assert disipada == pytest.approx(0.5 * 1e-6 * 100, rel=1e-3)


def test_circuito_mixto_reduccion_vs_mna():
    arbol = circ.S(circ.R(10), circ.P(circ.S(circ.R(20), circ.R(30)), circ.R(25)), circ.P(circ.R(40), circ.R(60), circ.R(120)))
    r = circ.resolver(arbol, 24)
    m = circ.resolver_mna(arbol, 24)
    assert r["I"] == pytest.approx(m["I"], rel=1e-12)
    assert [x["I"] for x in r["resistores"]] == pytest.approx(m["corrientes"], rel=1e-10)
    assert sum(x["P"] for x in r["resistores"]) == pytest.approx(r["P"])


def test_biot_savart_espira_vs_exacta():
    I, R = 3.0, 0.05
    seg = mg.segmentos_espira(R, I)
    pts = np.array([[0, 0, 0], [0, 0, 0.08], [0.02, 0.01, 0.03], [0.1, 0.0, 0.0]])
    B = mg.biot_savart(seg, pts)
    for p, b in zip(pts, B):
        brho, bz = mg.espira_exacta(I, R, np.hypot(p[0], p[1]), p[2])
        assert b[2] == pytest.approx(float(bz), rel=2e-3)
    assert B[0, 2] == pytest.approx(MU0 * I / (2 * R), rel=1e-9)


def test_solenoide_centro():
    seg = mg.segmentos_solenoide(0.02, 0.5, 400, 2.0)
    assert mg.biot_savart(seg, [[0, 0, 0]])[0, 2] == pytest.approx(mg.solenoide_centro(400, 0.5, 0.02, 2.0), rel=2e-3)


def test_espira_lejana_es_dipolo():
    I, R = 2.0, 0.02
    p = np.array([[0.1, 0.05, 0.2]])
    b1 = mg.biot_savart(mg.segmentos_espira(R, I), p)
    b2 = mg.dipolo([0, 0, I * np.pi * R**2], p)
    assert np.allclose(b1, b2, rtol=2e-2)


def test_fuerza_entre_hilos():
    assert mg.fuerza_entre_hilos(10, 10, 0.1) == pytest.approx(2e-4)
