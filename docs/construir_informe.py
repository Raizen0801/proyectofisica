"""Construye docs/Informe_tecnico.docx (se exporta a PDF con convertir_a_pdf.ps1)."""
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

from docbuilder import Doc

AQUI = Path(__file__).resolve().parent
FIG = AQUI / "figuras"
CAP = AQUI / "capturas"
RES = json.loads((AQUI / "resultados_validacion.json").read_text(encoding="utf-8"))


# ------------------------------------------------------------ figuras de arquitectura
def caja(ax, x, y, w, h, texto, fc, ec="#1f4e79", size=9, bold=False):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08", fc=fc, ec=ec, lw=1.3))
    ax.text(x + w / 2, y + h / 2, texto, ha="center", va="center", fontsize=size, fontweight="bold" if bold else "normal", wrap=True)


def flecha(ax, a, b, color="#444", style="-|>", ls="-"):
    ax.add_patch(FancyArrowPatch(a, b, arrowstyle=style, mutation_scale=12, color=color, lw=1.3, linestyle=ls))


def fig_arquitectura():
    fig, ax = plt.subplots(figsize=(10, 6.6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 6.6); ax.axis("off")
    ax.text(0.1, 6.3, "Arquitectura por capas del simulador", fontsize=12, fontweight="bold", color="#1f4e79")
    # capa UI
    caja(ax, 0.1, 4.55, 6.6, 1.55, "", "#eaf2fb")
    ax.text(0.25, 5.88, "Capa de presentación (src/modules, src/ui)", fontsize=9, fontweight="bold", color="#1f4e79", va="top")
    mods = ["Cargas", "Potencial", "Trayectoria", "Capacitor", "Energía", "Circuitos", "Ohm", "Magnético", "Lorentz"]
    for i, m in enumerate(mods):
        caja(ax, 0.25 + (i % 5) * 1.28, 5.4 - (i // 5) * 0.5, 1.18, 0.38, m, "white", size=8)
    caja(ax, 5.45, 4.9, 1.15, 0.38, "ui: dom · charts\nscene3d · player", "#fff6e5", ec="#b36b00", size=6.3)
    # capa geometría
    caja(ax, 0.1, 3.1, 6.6, 1.1, "", "#f1f8ee", ec="#2e7d32")
    ax.text(0.25, 4.0, "Capa de algoritmos geométricos (src/geometry)", fontsize=9, fontweight="bold", color="#2e7d32", va="top")
    caja(ax, 0.3, 3.2, 2.8, 0.5, "contours.js\nmarching squares / tetrahedra", "white", ec="#2e7d32", size=8)
    caja(ax, 3.4, 3.2, 3.1, 0.5, "potentialMap.js\nmapa de color y niveles log", "white", ec="#2e7d32", size=8)
    # capa física
    caja(ax, 0.1, 0.55, 6.6, 2.2, "", "#fdf1f1", ec="#a33")
    ax.text(0.25, 2.55, "Motor físico puro (src/physics) — sin DOM, probado con node:test", fontsize=9, fontweight="bold", color="#a33", va="top")
    fis = [("constants", 0.3, 1.75), ("electrostatics", 1.85, 1.75), ("dynamics\n(RK45 · Boris)", 3.4, 1.75), ("capacitors", 4.95, 1.75),
           ("circuits", 0.3, 0.7), ("magnetostatics\n(Biot–Savart)", 1.85, 0.7)]
    for t, x, y in fis:
        caja(ax, x, y, 1.45, 0.62 if "\n" in t else 0.5, t, "white", ec="#a33", size=8)
    # lateral: Python
    caja(ax, 7.2, 0.55, 2.6, 2.2, "", "#f3ecfa", ec="#6a3d9a")
    ax.text(7.3, 2.55, "Referencia en Python", fontsize=9, fontweight="bold", color="#6a3d9a", va="top")
    caja(ax, 7.35, 1.55, 2.3, 0.65, "fisica_em\nNumPy · SciPy", "white", ec="#6a3d9a", size=8)
    caja(ax, 7.35, 0.7, 2.3, 0.65, "pytest · notebook\nfiguras del informe", "white", ec="#6a3d9a", size=8)
    flecha(ax, (6.7, 1.65), (7.2, 1.65), color="#6a3d9a", style="<|-|>", ls="--")
    ax.text(6.95, 1.8, "validación\ncruzada", fontsize=6.5, ha="center", color="#6a3d9a")
    # herramientas
    caja(ax, 7.2, 4.55, 2.6, 1.55, "", "#f4f4f4", ec="#666")
    ax.text(7.3, 5.88, "Construcción", fontsize=9, fontweight="bold", color="#444", va="top")
    caja(ax, 7.35, 5.1, 2.3, 0.4, "esbuild → dist/app.js", "white", ec="#666", size=8)
    caja(ax, 7.35, 4.65, 2.3, 0.4, "Three.js (WebGL)", "white", ec="#666", size=8)
    flecha(ax, (3.4, 4.55), (3.4, 4.2)); flecha(ax, (3.4, 3.1), (3.4, 2.75)); flecha(ax, (6.7, 5.3), (7.2, 5.3), style="<|-")
    ax.text(3.6, 4.37, "usa", fontsize=7); ax.text(3.6, 2.92, "usa", fontsize=7)
    # estado compartido
    caja(ax, 0.1, 0.05, 6.6, 0.38, "store.js — estado compartido: distribución de cargas (suscripción por eventos)", "#fffbe6", ec="#b8a000", size=8)
    fig.savefig(AQUI / "figuras" / "fig_arquitectura.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def fig_flujo():
    fig, ax = plt.subplots(figsize=(10, 2.7))
    ax.set_xlim(0, 10); ax.set_ylim(0, 2.7); ax.axis("off")
    pasos = ["Entrada del usuario\n(slider, tabla,\narrastre)", "Estado\n(S, store)", "Motor físico\n(funciones puras)", "Algoritmo\ngeométrico\n(líneas, isosuperficies)", "Three.js /\nCanvas 2D", "Lecturas y\ngráficas"]
    xs = [0.1 + i * 1.65 for i in range(6)]
    cols = ["#eaf2fb", "#fffbe6", "#fdf1f1", "#f1f8ee", "#eaf2fb", "#eaf2fb"]
    for x, t, c in zip(xs, pasos, cols):
        caja(ax, x, 0.7, 1.45, 1.3, t, c, size=8.2)
    for i in range(5):
        flecha(ax, (xs[i] + 1.45, 1.35), (xs[i + 1], 1.35))
    ax.text(5, 0.25, "Cada interacción reconstruye sólo las capas afectadas (p. ej. al arrastrar una carga se recalculan líneas y mapa; las isosuperficies se difieren hasta soltar).", ha="center", fontsize=8, color="#555")
    fig.savefig(AQUI / "figuras" / "fig_flujo.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


fig_arquitectura()
fig_flujo()

# ------------------------------------------------------------ documento
d = Doc("Informe técnico · Simulador de Campos Eléctricos y Magnéticos 3D")
d.cover("Informe técnico", "Simulador Interactivo de Campos Eléctricos y Magnéticos en 3D", [
    ("Curso", "Física 2 — Producto final"),
    ("Integrantes", "[Nombre(s) del equipo]"),
    ("Docente", "[Nombre del docente]"),
    ("Ciclo", "[Ciclo académico]"),
    ("Fecha", "Octubre de 2026"),
])

d.plain_title("Contenido")
d.toc()

# ------------------------------------------------------------------ Resumen
d.h1("Resumen")
d.p("Este informe describe el diseño, la implementación y la validación del **Simulador Interactivo de Campos Eléctricos y Magnéticos en 3D**, producto final del curso de Física 2. El simulador es una aplicación web (JavaScript, Three.js y WebGL) organizada en las cuatro unidades del curso —campo y potencial eléctrico, capacitores y dieléctricos, corriente eléctrica y ley de Ohm, y fuerza y campo magnético— mediante nueve módulos interactivos. El motor físico es propio, está separado de la interfaz y se verifica con 19 pruebas automáticas en JavaScript y 25 en Python.", align="justify")
d.p("Para garantizar la corrección de los resultados se desarrolló, en paralelo, un paquete Python (**fisica_em**, NumPy/SciPy) con implementaciones independientes de cada modelo. Las pruebas contrastan ambos motores entre sí y con soluciones analíticas: la parábola de una carga en campo uniforme coincide con la teoría con error relativo del orden de 10⁻¹⁵; el radio de Larmor y la deriva E×B simulados coinciden con la teoría con diferencias menores que 10⁻⁷ y 10⁻⁸ respectivamente; el integrador de Boris conserva la energía en campo magnético y converge con orden 2.00; el balance de potencia de los circuitos es exacto a precisión de máquina.", align="justify")
d.p("**Palabras clave:** campo eléctrico, potencial, ley de Coulomb, Biot–Savart, fuerza de Lorentz, simulación numérica, Three.js, validación.", size=10)

# ------------------------------------------------------------------ 1
d.h1("1. Introducción y objetivos")
d.p("Los conceptos de campo eléctrico y magnético son abstractos y difíciles de visualizar con lápiz y papel. Un simulador interactivo permite explorar cualitativa y cuantitativamente cómo varían las magnitudes físicas al modificar los parámetros del problema, y a la vez constituye un proyecto de ingeniería de software que integra modelamiento matemático, programación científica, visualización y diseño de interfaces.", align="justify")
d.h2("1.1 Objetivo general")
d.p("Desarrollar un simulador interactivo, en 2D y 3D, que visualice en tiempo real campos eléctricos y magnéticos, potenciales, trayectorias de partículas cargadas y circuitos eléctricos, con resultados numéricos verificables.", align="justify")
d.h2("1.2 Objetivos específicos")
d.numbered([
    "Implementar los nueve módulos solicitados para las cuatro unidades del curso.",
    "Construir un motor físico modular, independiente de la interfaz y con pruebas automáticas.",
    "Validar numéricamente los modelos frente a soluciones analíticas y a una implementación independiente en Python.",
    "Diseñar una interfaz clara para usuarios no técnicos, con lecturas numéricas, gráficas y animaciones.",
    "Documentar el producto: código fuente, manual de usuario e informe técnico.",
])
d.h2("1.3 Cumplimiento de lo solicitado")
d.table(["Elemento del documento del producto final", "Módulo / entregable", "Tecnología"], [
    ["U1 · Visualizador de cargas puntuales (hasta 10 cargas, 2D/3D, líneas y equipotenciales)", "«Visualizador de cargas»", "JavaScript + Three.js"],
    ["U1 · Calculadora de potencial", "«Calculadora de potencial»", "JavaScript; verificación en Python (NumPy)"],
    ["U1 · Simulador de trayectoria", "«Simulador de trayectoria»", "JavaScript (RK45); verificación con SciPy"],
    ["U2 · Simulador de capacitores", "«Simulador de capacitores»", "JavaScript + Three.js"],
    ["U2 · Calculadora de energía almacenada", "«Energía almacenada»", "JavaScript; verificación en Python"],
    ["U3 · Simulador de circuitos (serie, paralelo, mixto)", "«Simulador de circuitos»", "JavaScript; verificación con análisis nodal (Python)"],
    ["U3 · Visualizador de ley de Ohm en tiempo real", "«Ley de Ohm»", "JavaScript + Canvas 2D"],
    ["U4 · Simulador de campo magnético", "«Campo magnético»", "JavaScript + Three.js; Biot–Savart"],
    ["U4 · Simulador de fuerza de Lorentz (E y B cruzados)", "«Fuerza de Lorentz»", "JavaScript (Boris/RK45); verificación con SciPy"],
    ["Código fuente (repositorio)", "Carpeta del proyecto con README", "Git/GitHub (estructura lista para publicar)"],
    ["Manual de usuario (PDF)", "Manual_de_usuario.pdf", "—"],
    ["Informe técnico", "Este documento", "—"],
    ["Video demostrativo y defensa en clase", "A cargo del equipo", "—"],
], caption="Correspondencia entre lo solicitado y lo entregado.", widths=[7.2, 4.6, 4.6], size=9)

# ------------------------------------------------------------------ 2
d.h1("2. Fundamentos físicos implementados")
d.p("Todas las magnitudes se calculan en unidades del Sistema Internacional. A continuación se resumen los modelos de cada unidad.", align="justify")

d.h2("2.1 Unidad 1: Electricidad, campo eléctrico y potencial")
d.p("**Ley de Coulomb y superposición.** El campo eléctrico de un conjunto de cargas puntuales qᵢ ubicadas en rᵢ es la suma vectorial de los campos individuales:", align="justify")
d.eq(r"\vec{E}(\vec{r})=k\sum_i q_i\,\frac{\vec{r}-\vec{r}_i}{\left|\vec{r}-\vec{r}_i\right|^{3}},\qquad k=\frac{1}{4\pi\varepsilon_0}", "1")
d.p("El potencial eléctrico (cero en el infinito) y la energía potencial del sistema son:", align="justify")
d.eq(r"V(\vec{r})=k\sum_i\frac{q_i}{\left|\vec{r}-\vec{r}_i\right|},\qquad U=\sum_{i<j}k\,\frac{q_iq_j}{r_{ij}},\qquad \vec{E}=-\nabla V", "2")
d.p("Las **superficies equipotenciales** son los conjuntos V = cte y son perpendiculares a las líneas de campo. Las **líneas de campo** son curvas tangentes a E en cada punto: dr/ds = E/|E|.", align="justify")
d.p("**Movimiento de una partícula cargada.** En un campo eléctrico la segunda ley de Newton da:", align="justify")
d.eq(r"m\,\frac{d^{2}\vec{r}}{dt^{2}}=q\,\vec{E}(\vec{r}),\qquad \Delta K=-q\,\Delta V", "3")
d.p("Para E uniforme la solución es r(t) = r₀ + v₀t + ½(qE/m)t², una parábola. El teorema trabajo–energía (ΔK = −qΔV) se usa como verificación numérica en cualquier campo.", align="justify")

d.h2("2.2 Unidad 2: Capacitores y dieléctricos")
d.eq(r"C=\kappa\,\varepsilon_0\,\frac{A}{d},\qquad U=\frac{1}{2}CV^{2}=\frac{Q^{2}}{2C}=\frac{1}{2}QV,\qquad u_E=\frac{1}{2}\kappa\varepsilon_0E^{2}", "4")
d.p("Con un dieléctrico insertado una fracción x de la longitud de las placas, el capacitor equivale a dos capacitores en paralelo, uno con dieléctrico y otro con aire:", align="justify")
d.eq(r"C(x)=C_0\left[1+(\kappa-1)\,x\right]", "5")
d.p("Con la **batería conectada** V es constante (Q = CV); con el capacitor **aislado** Q es constante (V = Q/C). Para redes: en serie 1/C_eq = Σ 1/Cᵢ con carga común; en paralelo C_eq = ΣCᵢ con voltaje común. La **ruptura dieléctrica** ocurre cuando E = V/d supera la rigidez dieléctrica del medio (aire ≈ 3 MV/m). La carga de un capacitor a través de una resistencia R sigue:", align="justify")
d.eq(r"v_C(t)=V\left(1-e^{-t/RC}\right),\qquad i(t)=\frac{V}{R}\,e^{-t/RC},\qquad \int_0^\infty i^{2}R\,dt=\frac{1}{2}CV^{2}", "6")

d.h2("2.3 Unidad 3: Corriente eléctrica y ley de Ohm")
d.eq(r"V=IR,\qquad P=VI=I^{2}R=\frac{V^{2}}{R}", "7")
d.p("Para resistores en serie R_eq = ΣRᵢ (corriente común, V se divide); en paralelo 1/R_eq = Σ1/Rᵢ (voltaje común, I se divide). Los circuitos mixtos se reducen de adentro hacia afuera y se reparten de afuera hacia adentro. Las leyes de Kirchhoff (nodos y mallas) y la conservación de la energía (P_fuente = ΣI²R) se usan como verificaciones.", align="justify")

d.h2("2.4 Unidad 4: Fuerza y campo magnético")
d.p("**Ley de Biot–Savart.** El campo magnético de una corriente estacionaria es:", align="justify")
d.eq(r"\vec{B}(\vec{r})=\frac{\mu_0}{4\pi}\oint\frac{I\,d\vec{l}\times\hat{r}}{r^{2}}", "8")
d.p("Casos analíticos usados como referencia:", align="justify")
d.eq(r"B_{\mathrm{hilo}}=\frac{\mu_0I}{2\pi\rho},\qquad B_{\mathrm{espira,\,eje}}=\frac{\mu_0IR^{2}}{2\left(R^{2}+z^{2}\right)^{3/2}},\qquad B_{\mathrm{solenoide}}\approx\mu_0\,\frac{N}{L}\,I,\qquad \frac{F}{\ell}=\frac{\mu_0I_1I_2}{2\pi d}", "9", size=13)
d.p("Las líneas de B son siempre cerradas (∇·B = 0). Un **imán de barra** se modela como un solenoide equivalente (corriente superficial de magnetización).", align="justify")
d.p("**Fuerza de Lorentz.** Una partícula de carga q en campos E y B cumple:", align="justify")
d.eq(r"m\,\frac{d\vec{v}}{dt}=q\left(\vec{E}+\vec{v}\times\vec{B}\right)", "10")
d.p("En campos uniformes la trayectoria es una hélice de eje paralelo a B superpuesta a la deriva E×B:", align="justify")
d.eq(r"\omega_c=\frac{|q|B}{m},\qquad r_L=\frac{m\,v_\perp}{|q|B},\qquad \vec{v}_d=\frac{\vec{E}\times\vec{B}}{B^{2}},\qquad v=\frac{E}{B}\ \ (\mathrm{selector})", "11")

# ------------------------------------------------------------------ 3
d.h1("3. Arquitectura del software")
d.h2("3.1 Visión general")
d.p("La aplicación sigue una arquitectura **por capas** con dependencias en un solo sentido: la capa de presentación depende de los algoritmos geométricos y del motor físico, nunca al revés. El motor físico (src/physics) está formado por funciones puras sin referencia al DOM ni a Three.js, lo que permite probarlo desde Node.js y compararlo con la implementación en Python.", align="justify")
d.fig(FIG / "fig_arquitectura.png", "Arquitectura por capas del simulador y relación con la referencia en Python.", 15.5)
d.h2("3.2 Estructura del repositorio")
d.code("""
Proyecto_Esther/
├── simulador-web/
│   ├── index.html · css/style.css
│   ├── dist/app.js                  # bundle (esbuild) — se abre sin servidor
│   ├── src/
│   │   ├── main.js                  # navegación por unidades (hash routing)
│   │   ├── store.js                 # estado compartido de cargas
│   │   ├── physics/                 # constants, electrostatics, dynamics,
│   │   │                            # capacitors, circuits, magnetostatics
│   │   ├── geometry/                # contours (marching squares/tetrahedra), potentialMap
│   │   ├── ui/                      # dom, charts, scene3d, player, chargeTable, format
│   │   └── modules/                 # cargas, potencial, trayectoria, capacitor,
│   │                                # energia, circuitos, ohm, magnetico, lorentz
│   └── tests/                       # fisica.test.js, exportar_casos.mjs
├── python/
│   ├── fisica_em/                   # electrostatica, dinamica, capacitores,
│   │                                # circuitos, magnetostatica, constantes
│   ├── tests/                       # test_fisica.py, test_validacion_web.py
│   ├── scripts/generar_figuras.py · notebooks/validacion.ipynb
└── docs/                            # manual, informe, capturas, figuras
""")
d.h2("3.3 Decisiones de diseño")
d.table(["Decisión", "Justificación"], [
    ["Aplicación web en lugar de escritorio", "Se ejecuta en cualquier computadora con navegador, sin instalar nada; WebGL ofrece 3D acelerado y es fácil de demostrar en clase."],
    ["Motor físico separado de la interfaz", "Facilita las pruebas automáticas, la reutilización y la validación cruzada con Python."],
    ["Bundle con esbuild (IIFE)", "Genera un único dist/app.js que se abre con doble clic (sin las restricciones de módulos ES con file://)."],
    ["Three.js con líneas gruesas (Line2)", "Las líneas de campo se leen mejor con grosor constante en pantalla y color por |E| o |B|."],
    ["Estado compartido (store.js)", "Las mismas cargas alimentan los módulos 1, 2 y 3; los módulos se suscriben a cambios (patrón observador)."],
    ["Componentes de UI mínimos (dom.js)", "Sin framework: menor tamaño, arranque inmediato y control total del ciclo de vida de las escenas WebGL (todas se liberan al cambiar de módulo)."],
    ["Doble implementación (JS + Python)", "Dos implementaciones independientes que coinciden son una evidencia fuerte de corrección."],
], caption="Principales decisiones de diseño.", widths=[5.4, 10.8])
d.h2("3.4 Flujo de una interacción")
d.fig(FIG / "fig_flujo.png", "Flujo de datos de una interacción del usuario hasta la visualización.", 15.5)
d.p("Los controles actualizan un estado local, el motor físico produce datos (campos, trayectorias, corrientes), los algoritmos geométricos los convierten en geometría (polilíneas, mallas) y la capa de presentación los dibuja. Los eventos frecuentes (arrastres, deslizadores) se limitan con *debounce* o con requestAnimationFrame para mantener la fluidez.", align="justify")
d.h2("3.5 Interfaz y experiencia de usuario")
d.bullets([
    "Navegación por unidades en un menú lateral; cada módulo explica brevemente la física que ilustra.",
    "Tema oscuro con alto contraste; colores consistentes (rojo = positivo / V > 0, azul = negativo / V < 0).",
    "Lecturas numéricas con prefijos SI automáticos y verificaciones en verde (balance de potencia, conservación de la energía).",
    "Escenarios de ejemplo predefinidos en los módulos de partículas y circuitos.",
    "Diseño adaptable: en pantallas pequeñas el menú se oculta tras un botón y los paneles se apilan.",
])

# ------------------------------------------------------------------ 4
d.h1("4. Algoritmos utilizados", newpage=False)
d.h2("4.1 Líneas de campo eléctrico")
d.p("Cada línea se obtiene integrando dr/ds = ±E/|E| con **Runge–Kutta de cuarto orden** y paso fijo h. Las semillas se colocan sobre una esfera de radio pequeño alrededor de cada carga (espiral de Fibonacci en 3D, circunferencia en 2D) en número proporcional a |q|. Las cargas negativas sólo aportan las líneas que provienen del infinito, en proporción 1 − Q₊/Q₋ (conservación del flujo de Gauss), para evitar duplicados. La integración termina al llegar a una carga (distancia < 1.5h) o al salir del dominio.", align="justify")
d.code("""
para cada carga c con q != 0:
    n = max(4, round(N * |q| / |q|max));  si q < 0: n = round(n * max(0, 1 - Q+/Q-))
    para cada semilla s en esfera_fibonacci(n):
        p = c + r0 * s
        repetir hasta captura o límite:
            p = rk4(p, h, f(p) = signo * E(p)/|E(p)|)
""")
d.h2("4.2 Equipotenciales: marching squares y marching tetrahedra")
d.p("En 2D se evalúa V en una malla de 200 × 200 puntos y se extraen las isolíneas con **marching squares** (interpolación lineal en las aristas; los casos de silla se resuelven con el valor del centro de la celda). En 3D se evalúa V en una malla de 42³ puntos y se usa **marching tetrahedra**: cada celda cúbica se divide en 6 tetraedros y en cada uno se generan 0, 1 o 2 triángulos, lo que evita las tablas de casos del cubo completo. Los triángulos se orientan con la normal analítica ∇V = −E para obtener un sombreado correcto. Los niveles se eligen en escala logarítmica entre dos percentiles de |V|.", align="justify")
d.h2("4.3 Integración de trayectorias: Dormand–Prince 5(4)")
d.p("Las trayectorias en campos no uniformes usan el método adaptativo **Dormand–Prince** (RK45) con control de error mixto absoluto/relativo (rtol = 10⁻¹⁰). El paso se ajusta con h ← h·min(5, max(0.2, 0.9·err^(−1/5))). Un límite h_max = T/N garantiza muestras suficientes para la animación. El integrador se valida con la solución analítica y con el teorema trabajo–energía.", align="justify")
d.h2("4.4 Integrador de Boris")
d.p("Para el movimiento en campos E y B se ofrece el **integrador de Boris**, estándar en física de plasmas por conservar exactamente |v| en un campo B puro:", align="justify")
d.eq(r"\vec{v}^-=\vec{v}_n+\frac{q\vec{E}}{m}\frac{\Delta t}{2},\quad \vec{t}=\frac{q\vec{B}}{m}\frac{\Delta t}{2},\quad \vec{s}=\frac{2\vec{t}}{1+t^{2}}", "12", size=13)
d.eq(r"\vec{v}'=\vec{v}^-+\vec{v}^-\times\vec{t},\quad \vec{v}^+=\vec{v}^-+\vec{v}'\times\vec{s},\quad \vec{v}_{n+1}=\vec{v}^++\frac{q\vec{E}}{m}\frac{\Delta t}{2}", "13", size=13)
d.p("La posición se actualiza con la regla del trapecio r_{n+1} = r_n + ½Δt (v_n + v_{n+1}). El esquema es de segundo orden (Figura 5) y es simpléctico en B puro.", align="justify")
d.h2("4.5 Circuitos")
d.p("Un circuito de resistencias se representa como un **árbol** cuyos nodos son resistores (R), grupos en serie (S) o grupos en paralelo (P). La resolución es recursiva en dos pasadas: (1) hacia arriba se calcula la resistencia equivalente de cada subárbol; (2) hacia abajo se reparte la corriente (serie) o el voltaje (paralelo). La complejidad es O(n) en el número de resistores. Para validar el resultado, el árbol se convierte en una lista de aristas y se resuelve con **análisis nodal** (matriz de conductancias G·v = i) en Python; ambos métodos coinciden a precisión de máquina.", align="justify")
d.code("""
resolver(nodo, V, I):
    si R:  anotar(V, I)
    si S:  para cada hijo h: resolver(h, I * Req(h), I)
    si P:  para cada hijo h: resolver(h, V, V / Req(h))
""")
d.h2("4.6 Campo magnético: Biot–Savart numérico y líneas de B")
d.p("Cada espira se discretiza en segmentos (128 para la sonda y 48 para el trazado) con la **regla del punto medio sobre el arco**; el campo es la suma B = (μ₀/4π) Σ I dl × (r − r_m)/|r − r_m|³. El solenoide se modela con hasta 40 espiras (16 para trazar líneas) cuya corriente equivalente I·N/n_modelo representa la hoja de corriente continua. El hilo recto y el dipolo usan expresiones cerradas.", align="justify")
d.p("Para las fuentes con simetría axial las **semillas de las líneas se eligen con igual flujo**: toda línea cruza el plano z = 0, por lo que se integra ψ(ρ) = ∫B_z ρ dρ sobre ese plano y se toman radios con ψ_k = k·ψ_max/(n+1). Así la densidad de líneas es proporcional a |B|. Cada línea se traza una vez y se replica en 8 azimuts. El cierre de la línea se detecta al volver al punto de partida.", align="justify")
d.h2("4.7 Mapas de potencial y color")
d.p("El mapa de color usa una escala **asinh con signo**, s = asinh(V/V_s)/asinh(V_hi/V_s), donde V_s y V_hi son percentiles de |V|; así se distinguen simultáneamente las zonas cercanas a las cargas y el campo lejano.", align="justify")
d.h2("4.8 Complejidad y rendimiento")
d.table(["Tarea", "Coste aproximado", "Estrategia"], [
    ["Líneas de campo eléctrico", "O(L · S · N) (L líneas, S pasos, N cargas)", "Paso h = 0.06 m; ≤ 120 líneas"],
    ["Mapa de potencial 2D", "O(200² · N)", "Recalculado en cada arrastre (< 10 ms)"],
    ["Isosuperficies 3D", "O(42³ · N + 6 · 42³)", "Se difiere hasta soltar la carga"],
    ["Líneas de B de un solenoide", "O(L · S · 4 · n_seg)", "Malla gruesa para trazar (512 segmentos) y fina para la sonda"],
    ["Trayectoria RK45 / Boris", "O(pasos)", "≤ 1200 muestras para animar; Boris con 40 pasos por período"],
], caption="Costes y estrategias de rendimiento.", widths=[4.6, 5.6, 6.0])

# ------------------------------------------------------------------ 5
d.h1("5. Pruebas y validación")
d.h2("5.1 Estrategia")
d.p("La validación se organiza en cuatro niveles: (1) **pruebas analíticas** en JavaScript (19) y Python (19), que comparan con soluciones cerradas (Coulomb, parábola, Larmor, deriva E×B, hilo infinito, espira, solenoide); (2) **leyes de conservación** (trabajo–energía, balance de potencia, Σ Uᵢ = U total, ∮B·dl = μ₀I); (3) **validación cruzada** (6 pruebas en Python que ejecutan el motor JavaScript y comparan con NumPy/SciPy); y (4) **estudios de convergencia** (Biot–Savart frente a la solución exacta con integrales elípticas; orden del integrador de Boris).", align="justify")
d.table(["Prueba (motor JS)", "Criterio"], [
    ["Coulomb: campo y potencial de una carga", "Igual a k q/r² y k q/r (error rel. < 10⁻⁹)"],
    ["Superposición en un dipolo", "V = 0 en el plano mediatriz; E central = 2kqd"],
    ["Energía del sistema de dos cargas", "U = k q₁q₂/r"],
    ["Líneas de campo del dipolo", "Terminan en la carga negativa; 16 de 16 líneas generadas"],
    ["Trayectoria en E uniforme (RK45)", "r, v coinciden con r₀ + v₀t + ½at² (< 10⁻⁸)"],
    ["Teorema trabajo–energía en campo coulombiano", "ΔK = −qΔV (< 10⁻⁷)"],
    ["Lorentz: ω, deriva E×B con Boris y RK45", "Deriva simulada = E/B (< 0.5 %)"],
    ["Boris en B puro", "Conservación de K (< 10⁻¹⁰)"],
    ["Hélice en B uniforme", "Radio simulado = m v⊥/(|q|B) (< 0.2 %)"],
    ["Capacitor y energía", "C = κε₀A/d; U equivalentes (½CV², ½QV, Q²/2C)"],
    ["Redes de capacitores", "ΣUᵢ = U total en serie y paralelo"],
    ["Circuito RC", "v_C(τ) = 63.2 %; energía disipada = ½CV²"],
    ["Circuitos mixtos", "Balance de potencia, ley de nodos y de mallas"],
    ["Biot–Savart: espira y solenoide", "Centro y eje frente a fórmulas cerradas (< 0.2 %)"],
    ["Hilo infinito y ley de Ampère", "∮B·dl = μ₀I (< 10⁻⁹)"],
    ["Espira lejana ≈ dipolo", "Diferencia < 2 % a r ≫ R"],
    ["Marching squares / tetrahedra", "Isolínea e isosuperficie de una carga son circunferencia y esfera (< 0.5 % y 2 %)"],
], caption="Pruebas automáticas del motor JavaScript (npm test: 19/19 superadas).", widths=[7.4, 8.8], size=9)
d.h2("5.2 Resultados numéricos de validación")
f = lambda v: f"{v:.1e}"
d.table(["Magnitud verificada", "Resultado", "Referencia"], [
    ["Parábola de un electrón en E uniforme: error relativo máximo", f(RES["parabola_error_relativo"]), "Solución analítica"],
    ["Órbita circular: deriva relativa de la energía en 3 vueltas", f(RES["orbita_deriva_energia"]), "Conservación de la energía"],
    ["Órbita circular: máxima desviación del radio (m)", f(RES["orbita_radio_max_desv"]), "r = 1 m"],
    ["Radio de Larmor de la hélice (m): simulado", f"{RES['helice_radio_medido_m']:.6e}", f"teórico {RES['helice_radio_teorico_m']:.6e}"],
    ["Deriva E×B (m/s): simulada", f"{RES['cicloide_deriva_medida']:.4f}", f"teórica {RES['cicloide_deriva_teorica']:.4f}"],
    ["Orden de convergencia medido del integrador de Boris", f"{RES['boris_orden_convergencia']:.3f}", "2 (teórico)"],
    ["Energía en B puro con Boris (32 pasos/período, 20 períodos)", f(RES["boris_deriva_energia_32_pasos"]), "Conservación exacta"],
    ["Espira (eje): error relativo máximo de Biot–Savart", f(RES["espira_eje_error_relativo_max"]), "Fórmula cerrada"],
    ["Biot–Savart fuera del eje con 128 segmentos", f(RES["convergencia_biot_savart_n128"]), "Integrales elípticas (SciPy)"],
    ["Solenoide (centro): error relativo", f(RES["solenoide_centro_error"]), "μ₀NI/√(L²+4R²)"],
    ["Circuito mixto: diferencia reducción vs. análisis nodal", f(RES["circuito_dif_max_reduccion_vs_mna"]), "Precisión de máquina"],
    ["Circuito mixto: balance de potencia ΣP / P_fuente", f"{RES['circuito_balance_potencia']:.6f}", "1"],
    ["RC (10τ): energía disipada / energía almacenada", f"{RES['rc_energia_disipada_vs_almacenada']:.5f}", "1"],
    ["RC (10τ): energía de la fuente / CV²", f"{RES['rc_energia_fuente_vs_CV2']:.5f}", "1"],
], caption="Resultados de validación (generados por python/scripts/generar_figuras.py).", widths=[8.4, 3.2, 4.6], size=9)
d.h2("5.3 Evidencia gráfica")
d.fig(FIG / "fig_dipolo.png", "Dipolo ±2 nC calculado con el paquete Python: líneas de campo y equipotenciales (V = 0 en la mediatriz).", 15.5)
d.fig(FIG / "fig_trayectorias.png", "Trayectorias en campos eléctricos: parábola numérica frente a analítica, órbita circular y dispersión de un protón.", 16)
d.fig(FIG / "fig_energia_orbita.png", "Conservación de la energía mecánica en la órbita de un electrón (K + U constante).", 10.5)
d.fig(FIG / "fig_capacitores.png", "Capacitancia frente a separación y material, inserción parcial y energía con V o Q constante.", 16)
d.fig(FIG / "fig_rc.png", "Carga de un capacitor: tensiones y balance de energía (la mitad de la energía entregada se disipa).", 14.5)
d.fig(FIG / "fig_circuitos.png", "Corrientes por resistor (reducción serie/paralelo frente a análisis nodal) y característica I–V.", 14.5)
d.fig(FIG / "fig_magnetico.png", "Campo en el eje de una espira, convergencia de Biot–Savart con el número de segmentos y campo de un solenoide.", 16)
d.fig(FIG / "fig_lorentz.png", "Hélice, cicloide por deriva E×B y selector de velocidades (v < E/B, v = E/B, v > E/B).", 16)
d.fig(FIG / "fig_boris.png", "Integrador de Boris: conservación de la energía y orden de convergencia 2.", 14.5)
d.h2("5.4 Validación cruzada JavaScript ⇄ Python")
d.p("El script `simulador-web/tests/exportar_casos.mjs` ejecuta el motor JavaScript sobre casos fijos (campo de tres cargas, trayectoria de un electrón con E uniforme y campo coulombiano, Lorentz con Boris y RK45, capacitores, un circuito mixto de 7 resistores y campos magnéticos de una espira, un solenoide y un hilo) y los imprime en JSON. Las 6 pruebas de `python/tests/test_validacion_web.py` recalculan cada caso con `fisica_em` y comparan: campos y potenciales coinciden a 10⁻⁹, la trayectoria RK45 a 10⁻⁶, las corrientes del circuito a 10⁻⁹ y el campo magnético a 10⁻⁹. Como ambas implementaciones están escritas de forma independiente (distinta tecnología e integradores), la coincidencia es una evidencia sólida de la ausencia de errores de modelado.", align="justify")
d.code("""
> cd simulador-web && npm test        # 19 pruebas del motor JS      -> 19 superadas
> cd python && py -m pytest           # 19 analíticas + 6 cruzadas    -> 25 superadas
""")
d.h2("5.5 Verificación de la interfaz")
d.p("Cada módulo se inspeccionó en un navegador real (Chromium con WebGL): carga sin errores en consola, arrastre de cargas con el ratón, cambio de vistas 2D/3D, reproducción de trayectorias, y lecturas numéricas coherentes con las verificaciones anteriores. Las capturas del manual se generaron con la propia aplicación.", align="justify")

# ------------------------------------------------------------------ 6
d.h1("6. Resultados: el simulador en funcionamiento")
d.fig(CAP / "04_trayectoria.png", "Dispersión de un protón por una carga fija: la energía mecánica se conserva (error ΔK + ΔU del orden de 10⁻⁸).", 15)
d.fig(CAP / "08_circuitos.png", "Circuito mixto anidado con esquema animado, tabla por resistor y balance de potencia 100 %.", 15)
d.fig(CAP / "10_magnetico.png", "Campo magnético de un solenoide de 200 espiras (líneas cerradas coloreadas por |B|).", 15)

# ------------------------------------------------------------------ 7
d.h1("7. Limitaciones y trabajo futuro")
d.bullets([
    "El simulador es **no relativista**: se advierte al usuario si v > 0.1c.",
    "Las partículas no se afectan entre sí (campo de las cargas fijo); no se modela radiación.",
    "Los circuitos se limitan a resistores en serie/paralelo (árboles). Las mallas arbitrarias (p. ej. puente de Wheatstone) pueden añadirse con el análisis nodal ya implementado en Python.",
    "El capacitor es de placas paralelas ideales (sin efectos de borde); se podrían añadir geometrías cilíndrica y esférica.",
    "Los campos E y B del módulo de Lorentz son uniformes; se podrían añadir una botella magnética y un ciclotrón con campo alterno.",
    "El solenoide se discretiza con un máximo de 40 espiras (hoja de corriente equivalente), por lo que el campo muy cerca del bobinado es aproximado.",
    "Mejoras de ingeniería: web workers para cálculos pesados, exportación de datos en CSV y de escenas como imágenes.",
])

# ------------------------------------------------------------------ 8
d.h1("8. Conclusiones")
d.numbered([
    "Se implementaron los nueve módulos solicitados para las cuatro unidades, con visualización 2D/3D en tiempo real e interacción directa (arrastre de cargas, escenarios de ejemplo, reproducción de trayectorias).",
    "La separación entre el motor físico y la interfaz permitió probar los modelos de forma automática: 19 pruebas en JavaScript y 25 en Python, todas superadas.",
    "La validación cruzada entre dos implementaciones independientes y las soluciones analíticas respalda la corrección: errores del orden de 10⁻¹⁵ en la parábola y de 10⁻⁷ o menores en radio de Larmor, deriva E×B y campo magnético.",
    "El integrador de Boris conservó la energía en campo magnético y mostró el orden de convergencia teórico (1.996 ≈ 2), mientras que RK45 aporta alta precisión en campos arbitrarios.",
    "El proyecto integra competencias de Ingeniería de Sistemas: modelamiento matemático, programación científica, arquitectura modular, UX/UI, visualización de datos, simulación y trabajo colaborativo con control de versiones.",
])
d.h2("Competencias desarrolladas")
d.table(["Competencia", "Evidencia en el proyecto"], [
    ["Modelamiento matemático", "Algoritmos para resolver ecuaciones físicas: RK4, Dormand–Prince, Boris, Biot–Savart, reducción y análisis nodal."],
    ["Programación científica", "Motor numérico en JavaScript y NumPy/SciPy en Python; pruebas contra soluciones analíticas."],
    ["Arquitectura de software", "Capas físico/geométrico/presentación, estado compartido con patrón observador, bundle reproducible."],
    ["UX/UI", "Interfaz en español, lecturas con unidades, verificaciones visibles, ejemplos guiados y diseño adaptable."],
    ["Visualización de datos", "Líneas de campo, isosuperficies, mapas de potencial y gráficas interactivas 2D/3D."],
    ["Simulación", "Animaciones en tiempo real de partículas, corrientes y capacitores."],
    ["Trabajo en equipo", "Estructura de repositorio y README listos para colaboración en Git/GitHub."],
], caption="Competencias de Ingeniería de Sistemas.", widths=[4.4, 11.8])

# ------------------------------------------------------------------ refs
d.h1("Referencias")
d.bullets([
    "Young, H. D. y Freedman, R. A. *Física Universitaria con Física Moderna, Vol. 2* (Sears–Zemansky). Pearson.",
    "Serway, R. A. y Jewett, J. W. *Física para Ciencias e Ingeniería, Vol. 2*. Cengage.",
    "Griffiths, D. J. *Introduction to Electrodynamics*. Cambridge University Press.",
    "Dormand, J. R. y Prince, P. J. (1980). A family of embedded Runge–Kutta formulae. *Journal of Computational and Applied Mathematics*, 6(1), 19–26.",
    "Boris, J. P. (1970). Relativistic plasma simulation — optimization of a hybrid code. *Proc. Fourth Conf. on Numerical Simulation of Plasmas*.",
    "Birdsall, C. K. y Langdon, A. B. *Plasma Physics via Computer Simulation*. CRC Press.",
    "Lorensen, W. E. y Cline, H. E. (1987). Marching cubes. *SIGGRAPH Computer Graphics*, 21(4).",
    "Ho, C.-W., Ruehli, A. y Brennan, P. (1975). The modified nodal approach to network analysis. *IEEE Trans. Circuits and Systems*, 22(6).",
    "Documentación de Three.js (https://threejs.org), NumPy (https://numpy.org) y SciPy (https://scipy.org).",
])

d.save(AQUI / "Informe_tecnico.docx")
print("Informe_tecnico.docx creado")
