"""Validación cruzada: el motor JavaScript del simulador web vs. el motor Python (NumPy/SciPy).

Ejecuta ``node simulador-web/tests/exportar_casos.mjs`` y compara cada resultado con la implementación
independiente de ``fisica_em``. Se omite si Node.js no está instalado.
"""
import json
import shutil
import subprocess
from pathlib import Path

import numpy as np
import pytest

from fisica_em import capacitores as cap
from fisica_em import circuitos as circ
from fisica_em import dinamica, electrostatica as es, magnetostatica as mg
from fisica_em.constantes import E_CARGA, M_ELECTRON, M_PROTON

RAIZ = Path(__file__).resolve().parents[2]
SCRIPT = RAIZ / "simulador-web" / "tests" / "exportar_casos.mjs"


@pytest.fixture(scope="module")
def js():
    node = shutil.which("node")
    if node is None or not SCRIPT.exists():
        pytest.skip("Node.js o el script de exportación no están disponibles")
    out = subprocess.run([node, str(SCRIPT)], capture_output=True, text=True, check=True, cwd=SCRIPT.parent, encoding="utf-8")
    return json.loads(out.stdout)


def test_cargas(js):
    d = js["cargas"]
    c, p = np.array(d["charges"]), np.array(d["puntos"])
    assert np.allclose(es.campo_electrico(c, p), d["E"], rtol=1e-9)
    assert np.allclose(es.potencial(c, p), d["V"], rtol=1e-9)
    assert es.energia_sistema(c) == pytest.approx(d["U"], rel=1e-9)


def test_trayectoria(js):
    d = js["trayectoria"]
    src, E0 = np.array(d["src"]), np.array(d["E0"])
    tr = dinamica.trayectoria(-E_CARGA, M_ELECTRON, [0.3, 0.1, 0], [2e5, 1e5, 5e4], d["T"],
                              E=lambda r: es.campo_electrico(src, r[None, :])[0] + E0)
    assert np.allclose(tr.r[-1], d["final_pos"], rtol=1e-6)
    assert np.allclose(tr.v[-1], d["final_vel"], rtol=1e-6)


def test_lorentz(js):
    d = js["lorentz"]
    E, B, v0 = np.array(d["E"]), np.array(d["B"]), np.array(d["v0"])
    ref = dinamica.trayectoria(E_CARGA, M_PROTON, [0, 0, 0], v0, d["T"], E=lambda r: E, B=lambda r: B, n=4000)
    for metodo, tol in (("rk45", 1e-6), ("boris", 2e-3)):
        scale_r = np.linalg.norm(ref.r[-1])
        assert np.linalg.norm(np.array(d[metodo]["pos"]) - ref.r[-1]) / scale_r < tol, metodo
        assert np.linalg.norm(np.array(d[metodo]["vel"]) - ref.v[-1]) / np.linalg.norm(ref.v[-1]) < tol, metodo
    th = dinamica.teoria_lorentz(E_CARGA, M_PROTON, v0, E, B)
    assert d["teoria"]["radius"] == pytest.approx(th["radio"], rel=1e-9)
    assert d["teoria"]["period"] == pytest.approx(th["periodo"], rel=1e-9)
    assert d["teoria"]["driftSpeed"] == pytest.approx(np.linalg.norm(th["deriva"]), rel=1e-9)


def test_capacitores(js):
    d = js["capacitores"]
    assert d["placas"] == pytest.approx(cap.capacitancia_placas(0.02, 2e-3, 5.4), rel=1e-12)
    assert d["parcial"] == pytest.approx(cap.capacitancia_parcial(0.02, 2e-3, 5.4, 0.37), rel=1e-12)
    assert d["energia"]["U"] == pytest.approx(cap.energia_almacenada(C=4.7e-6, V=24)["U"], rel=1e-12)
    for topo in ("serie", "paralelo"):
        r = cap.red(d["Cs"], 12, topo)
        assert d[topo]["Ceq"] == pytest.approx(r["Ceq"], rel=1e-12)
        assert d[topo]["U"] == pytest.approx(r["U"], rel=1e-12)
        assert [i["V"] for i in d[topo]["items"]] == pytest.approx(list(r["V_i"]), rel=1e-12)
    rc = cap.carga_rc(9, 2200, 100e-6, 0.3)
    assert d["rc"]["vc"] == pytest.approx(rc["vc"], rel=1e-12)


def _a_arbol(n):
    if n["type"] == "R":
        return circ.R(n["R"])
    hijos = [_a_arbol(h) for h in n["children"]]
    return circ.S(*hijos) if n["type"] == "S" else circ.P(*hijos)


def test_circuito(js):
    d = js["circuito"]
    arbol = _a_arbol(d["arbol"])
    mna = circ.resolver_mna(arbol, d["V"])
    assert d["I"] == pytest.approx(mna["I"], rel=1e-12)
    assert d["Req"] == pytest.approx(circ.equivalente(arbol), rel=1e-12)
    assert [r["I"] for r in d["resistores"]] == pytest.approx(mna["corrientes"], rel=1e-9)


def test_magnetico(js):
    d = js["magnetico"]
    pts = np.array(d["puntos"])
    e = d["espira"]
    assert np.allclose(mg.biot_savart(mg.segmentos_espira(e["R"], e["I"]), pts), e["B"], rtol=1e-9, atol=1e-18)
    s = d["solenoide"]
    seg = mg.segmentos_solenoide(s["R"], s["L"], s["N"], s["I"])
    assert np.allclose(mg.biot_savart(seg, pts), s["B"], rtol=1e-9, atol=1e-18)
    for p, b in zip(pts, d["hilo"]["B"]):
        if np.hypot(p[0], p[1]) < 1e-9:  # sobre el eje del hilo el campo no está definido
            continue
        assert np.hypot(b[0], b[1]) == pytest.approx(mg.hilo_infinito(7, np.hypot(p[0], p[1])), rel=1e-9)
