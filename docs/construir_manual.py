"""Construye docs/Manual_de_usuario.docx (luego se exporta a PDF con convertir_a_pdf.ps1)."""
from pathlib import Path

from docbuilder import Doc

AQUI = Path(__file__).resolve().parent
CAP = AQUI / "capturas"

d = Doc("Manual de usuario · Simulador de Campos Eléctricos y Magnéticos 3D")
d.cover("Manual de usuario", "Simulador Interactivo de Campos Eléctricos y Magnéticos en 3D", [
    ("Curso", "Física 2 — Producto final"),
    ("Integrantes", "[Nombre(s) del equipo]"),
    ("Docente", "[Nombre del docente]"),
    ("Ciclo", "[Ciclo académico]"),
    ("Fecha", "Octubre de 2026"),
    ("Versión", "1.0"),
])

d.plain_title("Contenido")
d.toc()

# ------------------------------------------------------------------ 1
d.h1("1. Introducción")
d.p("El **Simulador Interactivo de Campos Eléctricos y Magnéticos en 3D** es una aplicación web que permite visualizar, en tiempo real, los fenómenos estudiados en el curso de Física 2: campos y potenciales de cargas puntuales, trayectorias de partículas cargadas, capacitores y dieléctricos, circuitos de resistencias, la ley de Ohm, campos magnéticos de corrientes e imanes y la fuerza de Lorentz.", align="justify")
d.p("Está organizado en **cuatro unidades y nueve módulos**. Todos los cálculos se realizan en tu navegador con un motor físico propio, validado contra soluciones analíticas y contra una implementación independiente en Python (NumPy/SciPy).", align="justify")
d.h2("1.1 Requisitos")
d.bullets([
    "Un navegador moderno con WebGL: Google Chrome, Microsoft Edge o Mozilla Firefox (versiones recientes).",
    "No necesita instalación ni conexión a Internet. Todo el código está empaquetado en `simulador-web/dist/app.js`.",
    "Recomendado: pantalla de al menos 1280 × 720 píxeles. En pantallas pequeñas el menú se oculta tras el botón ☰.",
])
d.h2("1.2 Cómo abrir el simulador")
d.numbered([
    "Abre la carpeta `simulador-web` del proyecto.",
    "Haz doble clic en `index.html`. Se abrirá en tu navegador predeterminado.",
    "Alternativa: desde una terminal, ejecuta `py -m http.server 8765 --directory simulador-web` y visita http://localhost:8765.",
])

# ------------------------------------------------------------------ 2
d.h1("2. Conociendo la interfaz")
d.p("La pantalla se divide en tres zonas (Figura 1):", align="justify")
d.bullets([
    "**Menú lateral (izquierda):** los nueve módulos agrupados por unidad. El módulo activo aparece resaltado.",
    "**Panel de controles (centro-izquierda):** deslizadores, campos numéricos, casillas y selectores del módulo, con una breve explicación de la física involucrada.",
    "**Escena y resultados (derecha):** la visualización 2D/3D, gráficas y lecturas numéricas que se actualizan al instante.",
])
d.fig(CAP / "01_cargas_3d.png", "Interfaz general (módulo «Visualizador de cargas»).")
d.h2("2.1 Controles de las escenas 3D")
d.table(["Acción", "Efecto"], [
    ["**Arrastrar** con el botón izquierdo", "Rota la cámara alrededor del centro de la escena."],
    ["**Rueda** del ratón", "Acerca o aleja la vista."],
    ["**Arrastrar** con el botón derecho (o Shift + arrastrar)", "Desplaza la vista."],
    ["**Arrastrar una carga** (módulo 1)", "Mueve la carga sobre el plano horizontal; el campo se recalcula mientras arrastras."],
    ["**Botones ▶ / ⏸ / ⟲ y línea de tiempo** (módulos 3 y 9)", "Reproducen, pausan, reinician o recorren la trayectoria; el selector 0.25×–4× cambia la velocidad."],
], caption="Interacción con las escenas.", widths=[6.4, 9.8])
d.h2("2.2 Unidades y lecturas")
d.p("Las distancias se expresan en metros, las cargas en nanocoulombs (nC) en los módulos de electrostática, y el resto de magnitudes en unidades del SI con prefijos automáticos (p, n, µ, m, k, M, G). Los resultados con color verde indican una verificación correcta (por ejemplo, balance de potencia o conservación de la energía); los amarillos o rojos advierten condiciones especiales (potencia elevada, velocidad relativista, ruptura dieléctrica).", align="justify")
d.note("**Escena compartida.** Las cargas definidas en «Visualizador de cargas» se comparten con «Calculadora de potencial» y «Simulador de trayectoria». Algunos escenarios de ejemplo reemplazan las cargas de la escena; puedes volver a cargar otra configuración desde el selector «Cargar configuración…».")

# ------------------------------------------------------------------ 3
d.h1("3. Unidad 1: Electricidad, campo y potencial eléctrico")
d.h2("3.1 Visualizador de cargas puntuales")
d.p("**Qué hace.** Simula el campo eléctrico de hasta 10 cargas puntuales en 2D o 3D y muestra las líneas de campo y las equipotenciales.", align="justify")
d.fig(CAP / "01_cargas_3d.png", "Vista 3D de un dipolo: líneas de campo (coloreadas por |E|) y superficie V = 0.")
d.h3("Controles principales")
d.table(["Control", "Función"], [
    ["Vista 3D / Vista 2D", "En 2D todas las cargas se proyectan en z = 0 y se muestra el mapa de potencial con curvas equipotenciales."],
    ["Líneas de campo + cantidad", "Dibuja entre 8 y 120 líneas; las semillas son proporcionales a |q|."],
    ["Equipotenciales + niveles + nivel de |V|", "En 3D son superficies translúcidas (rojo: V > 0, azul: V < 0, verde: V = 0); en 2D son curvas en escala logarítmica."],
    ["Mapa de potencial y altura z", "Plano de corte coloreado con escala logarítmica con signo."],
    ["Vectores E", "Flechas del campo sobre el plano de corte."],
    ["Tabla de cargas", "Edita q (nC) y la posición (x, y, z); añade o elimina cargas; carga configuraciones: dipolo, cuadrupolo, anillo, tetraedro 3D, etc."],
], caption="Controles del módulo 1.", widths=[5.2, 11.0])
d.h3("Animaciones")
d.bullets([
    "**Flujo del campo:** partículas luminosas recorren cada línea de campo en el sentido de E (desde las cargas positivas hacia las negativas) y van más rápido donde el campo es más intenso. Se activa con «Animar el flujo del campo».",
    "**Cargas de prueba:** haz clic sobre el plano (o pulsa «Soltar 10 al azar») para soltar cargas de prueba positivas o negativas. Obedecen F = qE: las positivas se alejan de las positivas y caen hacia las negativas, dejando una estela; desaparecen al chocar con una carga.",
    "**Cargas con halo pulsante:** el brillo de cada carga indica su signo y magnitud.",
])
d.h3("Cómo interpretar la escena")
d.bullets([
    "Las líneas salen de las cargas positivas y entran en las negativas; donde están más juntas, |E| es mayor.",
    "Una superficie equipotencial es siempre perpendicular a las líneas de campo.",
    "Pasa el cursor sobre el plano de corte para leer V y |E| en el punto señalado.",
])
d.fig(CAP / "02_cargas_2d.png", "Vista 2D con mapa de potencial, equipotenciales y líneas de campo.")
d.note("**Ejercicio sugerido.** Carga el preset «Dos cargas iguales» y localiza el punto de equilibrio donde E = 0 entre ellas. Después cambia una carga a −2 nC y observa cómo desaparece el punto de equilibrio entre las cargas.")

d.h2("3.2 Calculadora de potencial")
d.p("**Qué hace.** Calcula el potencial V y el campo E en cualquier punto P del espacio para la distribución de cargas definida, desglosa el aporte de cada carga y evalúa el trabajo al llevar una carga de prueba de P a Q.", align="justify")
d.fig(CAP / "03_potencial.png", "Calculadora de potencial: mapa, resultados en P y perfiles a lo largo de P → Q.")
d.numbered([
    "Define las cargas con la tabla (o usa un preset).",
    "Escribe las coordenadas de P y Q, o haz clic en el mapa (el selector «Al hacer clic coloco…» decide si se mueve P o Q).",
    "Lee V(P), |E(P)|, las componentes de E y su dirección; revisa la tabla «Aporte de cada carga» (r, Vᵢ, % de V y Eᵢ).",
    "Introduce q₀ y su masa para obtener W(P→Q) = q₀(V_P − V_Q), ΔU y la rapidez final si se suelta desde el reposo.",
    "Las dos gráficas muestran V(s) y |E|(s) a lo largo del segmento P → Q.",
])
d.h2("3.3 Simulador de trayectoria")
d.p("**Qué hace.** Lanza una partícula cargada (electrón, protón, partícula α o personalizada) en un campo eléctrico uniforme y/o en el campo de las cargas puntuales de la escena, y anima su trayectoria. La integración usa un método Runge–Kutta de Dormand–Prince adaptativo.", align="justify")
d.fig(CAP / "04_trayectoria.png", "Dispersión de un protón por una carga fija de +5 nC.")
d.table(["Control", "Función"], [
    ["Escenarios de ejemplo", "Tubo de rayos catódicos, protón frenado, lanzamiento oblicuo, dispersión de Rutherford, órbita circular."],
    ["Partícula", "Elige carga y masa; «Personalizada» permite q en múltiplos de e y m en unidades de masa atómica."],
    ["Condiciones iniciales", "Rapidez (escala logarítmica), elevación, azimut y posición inicial."],
    ["Campo eléctrico", "Componentes Ex, Ey, Ez y casilla para incluir el campo de las cargas del módulo 1."],
    ["Duración T", "Tiempo total simulado (de 0.1 ns a 1 ms)."],
], caption="Controles del módulo 3.", widths=[4.4, 11.8])
d.p("Durante la reproducción se dibujan dos vectores sobre la partícula: la **velocidad v** (verde) y la **fuerza F = qE** (rojo); así se ve cómo la fuerza curva la trayectoria.", align="justify")
d.p("Debajo de la escena se muestran la aceleración inicial, la rapidez y posición finales, las energías cinéticas, el error de la verificación ΔK = −qΔV y, en campo uniforme, el error frente a la solución analítica r = r₀ + v₀t + ½at². La gráfica de energía muestra K, U = qV y K + U (que debe ser constante).", align="justify")

# ------------------------------------------------------------------ 4
d.h1("4. Unidad 2: Capacitores y dieléctricos")
d.h2("4.1 Simulador de capacitores")
d.p("**Qué hace.** Muestra un capacitor de placas paralelas y cómo cambian C, Q, V, E y la energía al variar el área, la separación y el dieléctrico (incluida su inserción parcial).", align="justify")
d.fig(CAP / "05_capacitor.png", "Capacitor con mica insertada al 60 %: C = C₀[1 + (κ − 1)x].")
d.table(["Control", "Función"], [
    ["Batería conectada / Aislado", "Con la batería conectada V es constante. Al aislar, Q se conserva y V varía (el deslizador de V se desactiva)."],
    ["Voltaje, Área, Separación", "V de 1 a 1000 V, A de 5 a 500 cm², d de 0.1 a 20 mm."],
    ["Material dieléctrico y κ", "Vacío, aire, teflón, papel, mica, vidrio, agua, titanato de estroncio o κ personalizada."],
    ["Inserción del dieléctrico", "Desliza una losa dentro del capacitor (0–100 %)."],
], caption="Controles del módulo 4.", widths=[5.0, 11.2])
d.bullets([
    "**Carga y descarga animadas:** al cambiar V, A, d o el dieléctrico con la batería conectada, la carga de las placas crece o decrece exponencialmente. Mientras tanto, electrones azules circulan por los cables y la batería (de la placa + a la placa −; al descargarse regresan) y el aviso inferior indica «Cargando», «Descargando» o «Equilibrio: ya no circula corriente». Con el capacitor aislado la carga no cambia y no hay corriente.",
    "**Cargas de prueba amarillas** derivan de la placa + a la placa − siguiendo el campo E; su velocidad crece con E.",
    "Los **puntos rojos y azules** sobre las placas representan la carga libre (cantidad relativa) y se concentran donde está el dieléctrico.",
    "Si E supera la rigidez dieléctrica del material, aparece el aviso **«Ruptura dieléctrica»** y chispas entre las placas.",
    "Las gráficas muestran C(d), C(inserción) y U(d) con V constante y con Q constante.",
])
d.note("**Ejercicio sugerido.** Con V = 12 V y aire, reduce d a 0.1 mm y sube V hasta 500 V: E supera 3 MV/m y se produce la ruptura. Cambia después a mica (rigidez ≈ 118 MV/m) y comprueba que el mismo voltaje ya no la provoca.")

d.h2("4.2 Calculadora de energía almacenada")
d.p("Página con tres secciones: **A** (U = ½CV² a partir de (C, V), (C, Q) o (V, Q), con equivalencias y gráfica U(V)), **B** (redes de hasta 6 capacitores en serie o paralelo con tabla de Q, V y U de cada uno y verificación de que ΣUᵢ = U total) y **C** (carga y descarga RC con τ, v_C(t), i(t) y balance de energía).", align="justify")
d.fig(CAP / "06_energia_a.png", "Secciones A y B de la calculadora de energía.")
d.fig(CAP / "07_energia_rc.png", "Sección C: carga de un capacitor a través de una resistencia.")
d.p("En la carga RC la fuente entrega C·V²: la mitad queda almacenada en el capacitor y la otra mitad se disipa en la resistencia, sin importar el valor de R. El simulador lo verifica numéricamente.", align="justify")

# ------------------------------------------------------------------ 5
d.h1("5. Unidad 3: Corriente eléctrica y ley de Ohm")
d.h2("5.1 Simulador de circuitos")
d.p("**Qué hace.** Permite armar circuitos de resistencias en serie, paralelo y mixtos (anidados) conectados a una fuente de voltaje, y calcula corriente, voltaje y potencia de cada resistor.", align="justify")
d.fig(CAP / "08_circuitos.png", "Circuito mixto anidado: R₁ + (R₂ ∥ (R₃ + (R₄ ∥ R₅))).")
d.numbered([
    "Elige un ejemplo del selector o parte del circuito por defecto.",
    "En «Construcción del circuito» cada grupo es **Serie** (misma corriente) o **Paralelo** (mismo voltaje). Usa **+ R**, **+ Serie** y **+ Par.** para añadir elementos, **⇄** para cambiar el tipo de un grupo y **✕** para quitar.",
    "Edita el valor de cada resistor y el voltaje de la fuente: el esquema, la tabla y los resultados se actualizan al instante.",
    "Observa las partículas amarillas: indican el sentido convencional de la corriente y su velocidad es proporcional a la corriente de cada rama.",
])
d.p("El panel «Resumen» muestra la resistencia equivalente, la corriente de la fuente, la potencia entregada y el **balance de potencia** Σ I²R / (V·I), que debe ser 100 %.", align="justify")

d.h2("5.2 Visualizador de la ley de Ohm")
d.p("**Qué hace.** Relaciona V, I y R en tiempo real: eliges qué magnitud calcular (I, V o R) y mueves las otras dos.", align="justify")
d.fig(CAP / "09_ohm.png", "Ley de Ohm con barrido senoidal de voltaje: circuito animado, característica I–V e historial.")
d.bullets([
    "**Circuito animado:** los electrones (azul) se desplazan en sentido contrario a la corriente convencional; su velocidad crece con I y el resistor brilla con la potencia disipada.",
    "**Característica I–V:** la pendiente de la recta es 1/R. Las líneas tenues corresponden a R/2 y 2R.",
    "**I frente a R:** hipérbola I = V/R para el voltaje actual.",
    "**Barrido automático:** V oscila senoidalmente y el historial (últimos 12 s) muestra V, I y P.",
])

# ------------------------------------------------------------------ 6
d.h1("6. Unidad 4: Fuerza y campo magnético")
d.h2("6.1 Simulador de campo magnético")
d.p("**Qué hace.** Visualiza las líneas de campo magnético B de un imán de barra, un solenoide, una espira circular, un hilo recto largo y dos hilos paralelos, calculadas con la ley de Biot–Savart.", align="justify")
d.fig(CAP / "10_magnetico.png", "Solenoide de 200 espiras y 3 A: líneas de campo cerradas, más densas en el interior.")
d.bullets([
    "**Flujo de B:** partículas blancas recorren las líneas de campo en el sentido de B (más rápidas donde |B| es mayor).",
    "**Corriente animada:** partículas amarillas se mueven por el conductor (espira, hélice del solenoide, hilos) en el sentido de la corriente; en el imán representan las corrientes amperianas superficiales.",
    "**Brújula con inercia:** la aguja verde en el punto de prueba oscila y se alinea con B cuando cambias cualquier parámetro (por ejemplo, al invertir la corriente da media vuelta).",
])
d.table(["Control", "Función"], [
    ["Fuente del campo", "Imán, solenoide, espira, hilo o dos hilos. Cada fuente muestra sus parámetros (I, N, L, R, B interior, d)."],
    ["Densidad de líneas", "Las semillas se reparten con igual flujo, de modo que la densidad de líneas es proporcional a |B|."],
    ["Campo vectorial", "Flechas de B sobre el plano y = 0 (coloreadas por intensidad)."],
    ["Punto de prueba", "Coordenadas en cm; muestra |B|, sus componentes, la brújula y la referencia analítica (hilo, espira en su eje, solenoide)."],
], caption="Controles del módulo 8.", widths=[4.2, 12.0])
d.note("**Ejercicio sugerido.** Con el solenoide, coloca el punto de prueba en el origen y compara |B| con μ₀NI/L. Para dos hilos con corrientes opuestas observa la repulsión y el valor de F/L = μ₀I₁I₂ / (2πd).")

d.h2("6.2 Simulador de fuerza de Lorentz")
d.p("**Qué hace.** Lanza una partícula en campos E y B (uniformes) y compara la trayectoria con la teoría: radio de Larmor, frecuencia ciclotrónica, deriva E×B y paso de la hélice.", align="justify")
d.fig(CAP / "11_lorentz.png", "Hélice de un protón en B = 0.1 T con v₀ a 30° sobre el plano xy.")
d.table(["Escenario", "Qué demuestra"], [
    ["Hélice (solo B)", "Radio r = m v⊥/(|q|B), período T = 2πm/(|q|B) y paso v∥·T."],
    ["Selector de velocidades", "Con v = E/B la fuerza neta es cero y la trayectoria es recta."],
    ["Cicloide (deriva E×B)", "Desde el reposo, la partícula deriva con v_d = E×B/B²."],
    ["Trocoide", "v₀ distinta de E/B: círculo superpuesto a la deriva."],
    ["Ciclotrón", "Electrón en B uniforme."],
    ["E paralelo a B", "Hélice con aceleración axial."],
], caption="Escenarios del módulo 9.", widths=[4.6, 11.6])
d.bullets([
    "Junto a la partícula se dibujan en tiempo real la **velocidad v** (verde) y la **fuerza de Lorentz F = q(E + v×B)** (rojo): se ve que F es siempre perpendicular a v en un campo B puro, por lo que no cambia la rapidez.",
    "El integrador **Boris** (por defecto) conserva |v| en un campo B puro; **RK45** es el método adaptativo de alta precisión. La gráfica «Calidad numérica» compara ambos.",
    "La proyección sobre el plano perpendicular a B (gris) muestra el círculo de Larmor.",
    "El panel de resultados contrasta la teoría con la simulación (radio medido, velocidad media, error de energía).",
])

# ------------------------------------------------------------------ 7
d.h1("7. Preguntas frecuentes y solución de problemas")
d.table(["Problema", "Solución"], [
    ["La escena 3D aparece en negro.", "Verifica que tu navegador tenga WebGL activo (chrome://gpu) y actualiza el controlador de video."],
    ["La simulación va lenta.", "Reduce la cantidad de líneas de campo o de niveles; cierra otras pestañas con contenido 3D."],
    ["Una trayectoria sale de la escena.", "Reduce la duración T o la rapidez; la escena se reescala automáticamente en cada simulación."],
    ["Aparece «⚠ v > 0.1c».", "El simulador es no relativista; con velocidades cercanas a c los resultados dejan de ser válidos."],
    ["No se ve el menú.", "En pantallas pequeñas pulsa el botón ☰ de la barra superior."],
    ["Quiero modificar el código.", "Consulta el README: `npm install` y `npm run build` en `simulador-web` regeneran `dist/app.js`."],
], caption="Problemas frecuentes.", widths=[6.0, 10.2])
d.h2("7.1 Resumen de ecuaciones usadas")
d.table(["Tema", "Ecuación"], [
    ["Campo y potencial de cargas puntuales", "E = k Σ qᵢ (r − rᵢ)/|r − rᵢ|³ ;  V = k Σ qᵢ/|r − rᵢ|"],
    ["Capacitor de placas", "C = κ ε₀ A / d ;  U = ½ C V² = Q²/2C"],
    ["Circuito RC (carga)", "v_C(t) = V (1 − e^(−t/RC))"],
    ["Ley de Ohm y potencia", "V = I R ;  P = V I = I²R = V²/R"],
    ["Biot–Savart", "B = (μ₀/4π) ∮ I dl × r̂ / r²"],
    ["Hilo, solenoide", "B = μ₀I/(2πρ) ;  B = μ₀ N I / L"],
    ["Fuerza de Lorentz", "F = q (E + v × B) ;  r = m v⊥/(|q|B) ;  v_d = E×B/B²"],
], caption="Ecuaciones principales.", widths=[6.2, 10.0])

d.save(AQUI / "Manual_de_usuario.docx")
print("Manual_de_usuario.docx creado")
