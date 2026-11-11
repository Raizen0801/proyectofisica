// Genera Presentacion_Simulador_Campos_EM.pptx  (node crear_ppt.js)
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fa = require("react-icons/fa");
const { applyTheme } = require("C:/Users/Laptop/AppData/Local/Packages/Claude_pzs8sxrjxfjjc/LocalCache/Roaming/Claude/local-agent-mode-sessions/skills-plugin/07bfae47-c58a-4c3a-bc45-33ad4bf991e8/36f8e5f9-b732-4aed-8b08-dccdf5cc23b8/skills/pptx/scripts/apply_theme.js");

const DOCS = path.resolve(__dirname, "..");
const CAP = (f) => path.join(DOCS, "capturas", f);
const FIG = (f) => path.join(DOCS, "figuras", f);
const OUT = path.join(DOCS, "Presentacion_Simulador_Campos_EM.pptx");
const LOGO = path.join(DOCS, "..", "simulador-web", "img", "logo-upeu.png");

// ---------- tema ----------
const THEME = {
  name: "Campos EM",
  headFontFace: "Calibri",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "0B0F17", lt1: "FFFFFF", dk2: "151D2C", lt2: "E6EBF5",
    accent1: "4CC2FF", accent2: "7C8CFF", accent3: "FF6B6B", accent4: "FFD34D", accent5: "4ADE80", accent6: "FF9F6B",
    hlink: "4CC2FF", folHlink: "7C8CFF",
  },
};
const BG = THEME.colors.dk1, PANEL = THEME.colors.dk2, MUTED = "93A0B8", LINE = "28344B";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Simulador interactivo de campos eléctricos y magnéticos en 3D";
pres.author = "Equipo — Física 2";
const C = pres.SchemeColor;
const W = 13.33, H = 7.5, MX = 0.6;

pres.defineSlideMaster({
  title: "BASE",
  background: { color: BG },
  slideNumber: { x: 12.3, y: 7.0, w: 0.5, h: 0.3, fontSize: 11, color: MUTED, align: "right" },
  objects: [{ text: { text: "Simulador de Campos Eléctricos y Magnéticos 3D", options: { x: MX, y: 7.0, w: 7, h: 0.3, fontSize: 11, color: MUTED, margin: 0 } } }],
  masterName: "BASE",
});
pres.defineSlideMaster({ title: "PORTADA", background: { color: BG }, objects: [], masterName: "PORTADA" });

async function icon(Comp, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

const SHOT_AR = 1440 / 860;
function shot(slide, file, x, y, w, name) {
  slide.addImage({ path: CAP(file), x, y, w, h: w / SHOT_AR, objectName: name, shadow: { type: "outer", color: "000000", opacity: 0.45, blur: 12, offset: 4, angle: 90 }, altText: name });
  return w / SHOT_AR;
}
function title(slide, text, opts = {}) {
  slide.addText(text, { x: MX, y: 0.35, w: W - 2 * MX, h: 0.85, fontSize: 36, bold: true, color: C.background1, fontFace: "Calibri", margin: 0, valign: "middle", isTextBox: true, objectName: "Título", ...opts });
}
function tag(slide, text, color, x = MX, y = 0.18) {
  slide.addText(text, { x, y, w: 7.5, h: 0.3, fontSize: 12, bold: true, color, charSpacing: 2, margin: 0, isTextBox: true, objectName: "Etiqueta" });
}
function bullets(slide, items, x, y, w, h, size = 16) {
  const runs = items.map((t, i) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: i < items.length - 1, paraSpaceAfter: 9 } }));
  slide.addText(runs, { x, y, w, h, fontSize: size, color: C.background2, valign: "top", margin: 0, isTextBox: true, objectName: "Viñetas" });
}
function pill(slide, text, x, y, w, color) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.5, rectRadius: 0.12, fill: { color: PANEL }, line: { color, width: 1.25 }, objectName: "Fórmula (fondo)" });
  slide.addText(text, { x, y, w, h: 0.5, fontSize: 15, italic: true, color, align: "center", valign: "middle", fontFace: "Cambria", margin: 0, isTextBox: true, objectName: "Fórmula" });
}
function stat(slide, big, label, x, y, w, color, bigSize = 44) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h: 1.7, rectRadius: 0.12, fill: { color: PANEL }, line: { color: LINE, width: 1 }, objectName: "Tarjeta" });
  slide.addText(big, { x: x + 0.1, y: y + 0.12, w: w - 0.2, h: 0.85, fontSize: bigSize, bold: true, color, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Cifra" });
  slide.addText(label, { x: x + 0.2, y: y + 1.0, w: w - 0.4, h: 0.62, fontSize: 14, color: C.background2, align: "center", valign: "top", margin: 0, isTextBox: true, objectName: "Etiqueta de cifra" });
}

(async () => {
  const ic = {
    bulb: await icon(fa.FaLightbulb), cube: await icon(fa.FaCube), check: await icon(fa.FaCheckCircle),
    bolt: await icon(fa.FaBolt), cog: await icon(fa.FaCogs), code: await icon(fa.FaCode), chart: await icon(fa.FaChartLine),
    pal: await icon(fa.FaPalette), team: await icon(fa.FaUsers), flask: await icon(fa.FaFlask), calc: await icon(fa.FaCalculator),
    mag: await icon(fa.FaMagnet), play: await icon(fa.FaPlayCircle), layer: await icon(fa.FaLayerGroup),
  };

  // ===== 1. Portada =====
  let s = pres.addSlide({ masterName: "PORTADA" });
  s.addImage({ path: LOGO, x: MX, y: 0.45, w: 1.05, h: 1.05, rounding: true, altText: "Logo de la Universidad Peruana Unión", objectName: "Logo UPeU" });
  s.addText("UNIVERSIDAD PERUANA UNIÓN", { x: MX + 1.25, y: 0.62, w: 5, h: 0.7, fontSize: 16, bold: true, color: C.background1, valign: "middle", margin: 0, isTextBox: true, objectName: "Universidad" });
  s.addText("FÍSICA 2  ·  PRODUCTO FINAL", { x: MX, y: 1.85, w: 6, h: 0.35, fontSize: 14, bold: true, color: C.accent1, charSpacing: 3, margin: 0, isTextBox: true, objectName: "Etiqueta" });
  s.addText("Simulador interactivo de campos eléctricos y magnéticos en 3D", { x: MX, y: 2.35, w: 5.9, h: 2.1, fontSize: 38, bold: true, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "Título" });
  s.addText("Cargas, potencial, trayectorias, capacitores, circuitos, ley de Ohm, campo magnético y fuerza de Lorentz — animados en tiempo real", { x: MX, y: 4.55, w: 5.7, h: 1.1, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true, objectName: "Subtítulo" });
  s.addText([
    { text: "[Nombre(s) del equipo]", options: { breakLine: true, bold: true, color: C.background1 } },
    { text: "[Docente]  ·  [Ciclo]  ·  Universidad Peruana Unión", options: { color: MUTED } },
  ], { x: MX, y: 5.95, w: 5.8, h: 0.8, fontSize: 16, margin: 0, valign: "top", isTextBox: true, objectName: "Autores" });
  shot(s, "01_cargas_3d.png", 6.75, 1.5, 6.0, "Captura del visualizador de cargas");
  s.addNotes("Presentación del proyecto: un simulador web 3D que cubre las cuatro unidades del curso. Mencionar integrantes y docente. Adelantar que todo se verá en vivo y que las escenas están animadas.");

  // ===== 2. Agenda =====
  s = pres.addSlide({ masterName: "BASE" });
  title(s, "Qué vamos a ver");
  const ag = ["El problema y el objetivo", "El producto: 4 unidades, 9 módulos", "Demostración por unidad", "Cómo está construido", "Validación y conclusiones"];
  ag.forEach((t, i) => {
    const y = 1.6 + i * 1.0;
    s.addShape(pres.ShapeType.ellipse, { x: MX, y, w: 0.65, h: 0.65, fill: { color: C.accent1 }, line: { color: C.accent1 }, objectName: `Número ${i + 1} (fondo)` });
    s.addText(String(i + 1), { x: MX, y, w: 0.65, h: 0.65, fontSize: 22, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: `Número ${i + 1}` });
    s.addText(t, { x: MX + 0.9, y, w: 5.6, h: 0.65, fontSize: 22, color: C.background1, valign: "middle", margin: 0, isTextBox: true, objectName: `Punto ${i + 1}` });
  });
  stat(s, "9", "módulos interactivos", 8.0, 1.6, 2.2, C.accent1);
  stat(s, "4", "unidades del curso", 10.5, 1.6, 2.2, C.accent2);
  stat(s, "44", "pruebas automáticas", 8.0, 3.6, 2.2, C.accent5);
  stat(s, "3D", "animado en tiempo real", 10.5, 3.6, 2.2, C.accent4);
  s.addText("Aplicación web con motor físico propio + paquete Python (NumPy/SciPy) que valida los resultados.", { x: 8.0, y: 5.6, w: 4.7, h: 0.9, fontSize: 14, color: MUTED, margin: 0, valign: "top", isTextBox: true, objectName: "Nota" });
  s.addNotes("Estructura de la exposición: 1) motivación, 2) qué contiene el producto, 3) demo guiada por unidades, 4) arquitectura y algoritmos, 5) validación y conclusiones. Tiempo estimado: 15–20 minutos.");

  // ===== 3. Problema / solución / objetivo =====
  s = pres.addSlide({ masterName: "BASE" });
  title(s, "De lo invisible a lo que se puede explorar");
  const cols3 = [
    [ic.bulb, "El problema", C.accent4, "Los campos eléctrico y magnético no se ven: con lápiz y papel es difícil entender cómo cambian al variar cargas, distancias o corrientes."],
    [ic.cube, "La solución", C.accent1, "Un simulador 3D interactivo y animado: mueves una carga y ves el campo, el potencial y las partículas reaccionar al instante."],
    [ic.check, "El objetivo", C.accent5, "Visualizar, calcular y validar: cada módulo muestra la física y verifica sus resultados contra teoría y contra Python."],
  ];
  cols3.forEach(([img, head, col, txt], i) => {
    const x = MX + i * 4.1, w = 3.85;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.6, w, h: 4.6, rectRadius: 0.12, fill: { color: PANEL }, line: { color: LINE, width: 1 }, objectName: `Tarjeta ${head}` });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.35, y: 1.95, w: 0.95, h: 0.95, fill: { color: col }, line: { color: col }, objectName: `Círculo ${head}` });
    s.addImage({ data: img, x: x + 0.6, y: 2.2, w: 0.45, h: 0.45, altText: head, objectName: `Icono ${head}` });
    s.addText(head, { x: x + 0.35, y: 3.2, w: w - 0.7, h: 0.5, fontSize: 24, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: `Título ${head}` });
    s.addText(txt, { x: x + 0.35, y: 3.8, w: w - 0.7, h: 2.2, fontSize: 16, color: C.background2, valign: "top", margin: 0, isTextBox: true, objectName: `Texto ${head}` });
  });
  s.addNotes("Contexto: los campos son abstractos. El simulador convierte la teoría en algo que se puede manipular. Insistir en que no es solo una animación: cada resultado se verifica numéricamente.");

  // ===== 4. Producto: 4 unidades =====
  s = pres.addSlide({ masterName: "BASE" });
  title(s, "El producto: 4 unidades, 9 módulos");
  const units = [
    ["Unidad 1", "Campo y potencial eléctrico", C.accent1, ["Visualizador de cargas puntuales", "Calculadora de potencial", "Simulador de trayectoria"]],
    ["Unidad 2", "Capacitores y dieléctricos", C.accent2, ["Simulador de capacitores", "Energía almacenada y circuito RC"]],
    ["Unidad 3", "Corriente y ley de Ohm", C.accent4, ["Simulador de circuitos", "Visualizador de la ley de Ohm"]],
    ["Unidad 4", "Fuerza y campo magnético", C.accent3, ["Simulador de campo magnético", "Simulador de fuerza de Lorentz"]],
  ];
  units.forEach(([u, sub, col, mods], i) => {
    const x = MX + i * 3.05, w = 2.85;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.55, w, h: 4.0, rectRadius: 0.12, fill: { color: PANEL }, line: { color: LINE, width: 1 }, objectName: `Tarjeta ${u}` });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.25, y: 1.8, w: 1.25, h: 0.42, rectRadius: 0.1, fill: { color: col }, line: { color: col }, objectName: `Etiqueta ${u} (fondo)` });
    s.addText(u, { x: x + 0.25, y: 1.8, w: 1.25, h: 0.42, fontSize: 14, bold: true, color: C.text1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: `Etiqueta ${u}` });
    s.addText(sub, { x: x + 0.25, y: 2.4, w: w - 0.5, h: 0.9, fontSize: 20, bold: true, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: `Subtítulo ${u}` });
    const runs = mods.map((t, k) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: k < mods.length - 1, paraSpaceAfter: 10 } }));
    s.addText(runs, { x: x + 0.25, y: 3.4, w: w - 0.5, h: 2.8, fontSize: 15, color: C.background2, margin: 0, valign: "top", isTextBox: true, objectName: `Módulos ${u}` });
  });
  s.addShape(pres.ShapeType.roundRect, { x: MX, y: 5.85, w: 12.1, h: 0.75, rectRadius: 0.12, fill: { color: PANEL }, line: { color: C.accent1, width: 1.25 }, objectName: "Resumen de módulo (fondo)" });
  s.addText("Todos los módulos: panel de controles  ·  escena animada  ·  lecturas numéricas  ·  verificación de resultados", { x: MX, y: 5.85, w: 12.1, h: 0.75, fontSize: 18, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Resumen de módulo" });
  s.addNotes("Los nueve módulos corresponden uno a uno con lo pedido en el documento del producto final. Cada módulo tiene panel de controles, visualización y lecturas numéricas.");

  // ===== 5. Guion de demo =====
  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "DEMOSTRACIÓN EN VIVO", C.accent5);
  title(s, "Guion de la demo (5–6 minutos)", { y: 0.5 });
  const demo = [
    ["Cargas", "Arrastra una carga; activa el flujo y suelta cargas de prueba con clic"],
    ["Trayectoria", "Escenario «Dispersión de un protón»: observa v y F"],
    ["Capacitor", "Sube V: placas se cargan y circulan electrones; prueba la ruptura"],
    ["Circuito", "Ejemplo mixto anidado: corrientes, tensiones y balance de potencia"],
    ["Magnético", "Solenoide: corriente animada, líneas de B y brújula oscilando"],
    ["Lorentz", "Selector de velocidades (v = E/B) y cicloide por deriva E×B"],
  ];
  demo.forEach(([m, t], i) => {
    const y = 1.65 + i * 0.82;
    s.addShape(pres.ShapeType.roundRect, { x: MX, y, w: 7.6, h: 0.7, rectRadius: 0.1, fill: { color: PANEL }, line: { color: LINE, width: 1 }, objectName: `Paso ${i + 1} (fondo)` });
    s.addText(String(i + 1), { x: MX + 0.12, y, w: 0.5, h: 0.7, fontSize: 22, bold: true, color: C.accent5, valign: "middle", margin: 0, isTextBox: true, objectName: `Paso ${i + 1} número` });
    s.addText([{ text: m + "  ", options: { bold: true, color: C.background1 } }, { text: t, options: { color: C.background2 } }], { x: MX + 0.7, y, w: 6.8, h: 0.7, fontSize: 15, valign: "middle", margin: 0, isTextBox: true, objectName: `Paso ${i + 1} texto` });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 8.7, y: 1.65, w: 4.0, h: 4.8, rectRadius: 0.12, fill: { color: PANEL }, line: { color: C.accent5, width: 1.25 }, objectName: "Tarjeta consejos" });
  s.addImage({ data: ic.play, x: 8.95, y: 1.9, w: 0.55, h: 0.55, altText: "Reproducir", objectName: "Icono demo" });
  s.addText("Antes de empezar", { x: 9.65, y: 1.9, w: 2.9, h: 0.55, fontSize: 20, bold: true, color: C.background1, valign: "middle", margin: 0, isTextBox: true, objectName: "Título consejos" });
  bullets(s, ["Abre simulador-web/index.html en Chrome o Edge", "Pantalla completa (F11) y zoom 100 %", "Prueba el 3D antes: necesita WebGL", "Respaldo: capturas en este PPT y manual en PDF"], 8.95, 2.7, 3.5, 3.6, 15);
  s.addNotes("Guion sugerido para la demostración. Si falla el 3D en el equipo del aula, usar las capturas de las siguientes diapositivas. Cada paso dura aproximadamente un minuto.");

  // ===== módulos con captura =====
  async function moduleSlide(o) {
    const sl = pres.addSlide({ masterName: "BASE", });
    tag(sl, o.tag, o.color);
    title(sl, o.title, { y: 0.5, w: 5.2, h: 1.5, fontSize: 32, valign: "top" });
    bullets(sl, o.bullets, MX, 2.2, 4.95, 3.7, 18);
    pill(sl, o.formula, MX, 6.05, 4.95, o.color);
    const hImg = shot(sl, o.img, 5.9, 1.45, 6.85, o.alt);
    if (o.cap) sl.addText(o.cap, { x: 5.9, y: 1.45 + hImg + 0.12, w: 6.85, h: 0.5, fontSize: 12, italic: true, color: MUTED, margin: 0, isTextBox: true, objectName: "Pie de captura" });
    sl.addNotes(o.notes);
    return sl;
  }

  await moduleSlide({
    tag: "UNIDAD 1 · CAMPO Y POTENCIAL", color: C.accent1, title: "Visualizador de cargas puntuales", img: "01_cargas_3d.png", alt: "Visualizador de cargas en 3D",
    bullets: ["Hasta 10 cargas, arrastrables con el ratón, en 2D y 3D", "Líneas de campo, equipotenciales y mapa de potencial", "Animado: partículas fluyen por las líneas y las cargas de prueba obedecen F = qE"],
    formula: "E = k Σ qᵢ (r − rᵢ) / |r − rᵢ|³", cap: "Dipolo: líneas de campo con flujo animado y cargas de prueba (amarillas).",
    notes: "Mostrar cómo al arrastrar una carga todo se recalcula. Activar el flujo: las partículas viajan en el sentido de E y se aceleran donde el campo es más intenso. Soltar cargas de prueba positivas y negativas y comentar que se repelen o atraen según su signo. Las superficies equipotenciales son siempre perpendiculares a las líneas.",
  });

  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "UNIDAD 1 · CAMPO Y POTENCIAL", C.accent1);
  title(s, "Potencial y trayectorias de partículas", { y: 0.5 });
  const hh = shot(s, "03_potencial.png", MX, 1.6, 5.95, "Calculadora de potencial");
  shot(s, "04_trayectoria.png", MX + 6.2, 1.6, 5.95, "Simulador de trayectoria");
  s.addText([{ text: "Calculadora de potencial. ", options: { bold: true, color: C.background1 } }, { text: "V y E en cualquier punto, aporte de cada carga y trabajo P → Q: W = q₀(V_P − V_Q).", options: { color: C.background2 } }], { x: MX, y: 1.6 + hh + 0.2, w: 5.95, h: 1.0, fontSize: 15, margin: 0, valign: "top", isTextBox: true, objectName: "Texto potencial" });
  s.addText([{ text: "Trayectoria. ", options: { bold: true, color: C.background1 } }, { text: "RK45 adaptativo; la velocidad (verde) y la fuerza F = qE (roja) se dibujan sobre la partícula. ΔK + ΔU = 0.", options: { color: C.background2 } }], { x: MX + 6.2, y: 1.6 + hh + 0.2, w: 5.95, h: 1.0, fontSize: 15, margin: 0, valign: "top", isTextBox: true, objectName: "Texto trayectoria" });
  s.addNotes("Calculadora: se puede hacer clic en el mapa para colocar P y Q; la tabla desglosa el aporte de cada carga. Trayectoria: elegir el escenario de dispersión; ver que la fuerza roja apunta siempre hacia donde se curva el camino y que la energía mecánica se conserva (gráfica K + U constante).");

  await moduleSlide({
    tag: "UNIDAD 2 · CAPACITORES", color: C.accent2, title: "Simulador de capacitores", img: "05_capacitor.png", alt: "Capacitor cargándose",
    bullets: ["Área, separación y dieléctrico (incluida la inserción parcial)", "Carga animada: electrones circulan por la batería hasta el equilibrio", "Batería conectada (V cte) o aislado (Q cte); alerta de ruptura dieléctrica"],
    formula: "C = κ ε₀ A / d       C(x) = C₀[1 + (κ − 1)x]", cap: "Capacitor cargándose a 400 V: electrones azules por la batería y cargas de prueba derivando de + a −.",
    notes: "Subir el voltaje y ver cómo crece la carga en las placas mientras los electrones circulan por los cables; al llegar al equilibrio la corriente se detiene. Cambiar a «Aislado» y separar las placas: V aumenta porque Q se conserva. Probar d pequeña con voltaje alto para provocar la ruptura dieléctrica del aire (3 MV/m).",
  });

  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "UNIDAD 2 · ENERGÍA Y CIRCUITO RC", C.accent2);
  title(s, "Energía almacenada y circuito RC", { y: 0.5, w: 5.2, h: 1.5, fontSize: 32, valign: "top" });
  stat(s, "½ C V²", "queda almacenada en el capacitor", MX, 2.2, 2.35, C.accent2, 34);
  stat(s, "½ C V²", "se disipa en la resistencia, sin importar R", MX + 2.6, 2.2, 2.35, C.accent3, 34);
  bullets(s, ["La fuente entrega C V² al cargar", "τ = RC; v_C = V(1 − e^(−t/RC))", "Redes en serie y paralelo con ΣUᵢ = U total"], MX, 4.2, 4.95, 1.7, 16);
  pill(s, "U = ½CV² = Q²/2C = ½QV", MX, 6.05, 4.95, C.accent2);
  const h7 = shot(s, "07_energia_rc.png", 5.9, 1.45, 6.85, "Circuito RC");
  s.addText("Carga RC: tensiones, corriente y balance de energía.", { x: 5.9, y: 1.45 + h7 + 0.12, w: 6.85, h: 0.4, fontSize: 12, italic: true, color: MUTED, margin: 0, isTextBox: true, objectName: "Pie de captura" });
  s.addNotes("Resultado sorprendente: al cargar un capacitor a través de una resistencia, la mitad de la energía entregada por la fuente se disipa en forma de calor, sin importar el valor de R. El simulador lo verifica numéricamente: energía disipada / almacenada = 1.0001.");

  await moduleSlide({
    tag: "UNIDAD 3 · CORRIENTE Y OHM", color: C.accent4, title: "Simulador de circuitos", img: "08_circuitos.png", alt: "Circuito mixto anidado",
    bullets: ["Serie, paralelo y mixto anidado, editable", "Corriente, voltaje y potencia de cada resistor", "Esquema animado: la velocidad de las partículas es proporcional a la corriente de cada rama"],
    formula: "Req: ΣRᵢ (serie)  ·  1/ΣRᵢ⁻¹ (paralelo)", cap: "R₁ + (R₂ ∥ (R₃ + (R₄ ∥ R₅))): balance de potencia 100 %.",
    notes: "Construir o cargar el ejemplo anidado. Señalar que el circuito se resuelve recursivamente de adentro hacia afuera y se reparte de afuera hacia adentro. El balance de potencia Σ I²R / (V·I) da exactamente 100 %; además se validó con análisis nodal en Python.",
  });

  await moduleSlide({
    tag: "UNIDAD 3 · CORRIENTE Y OHM", color: C.accent4, title: "Visualizador de la ley de Ohm", img: "09_ohm.png", alt: "Ley de Ohm en tiempo real",
    bullets: ["Elige qué hallar (I, V o R) y mueve las otras dos", "Electrones animados, brillo según la potencia disipada", "Barrido senoidal de V con historial de V, I y P"],
    formula: "V = I R      P = V I = I² R", cap: "Barrido automático de voltaje: la corriente sigue a V sin retraso.",
    notes: "Activar el barrido senoidal y mostrar cómo I sigue a V instantáneamente (resistor óhmico). La pendiente de la recta I–V es 1/R. El resistor se pone más brillante cuanto mayor es la potencia.",
  });

  await moduleSlide({
    tag: "UNIDAD 4 · CAMPO MAGNÉTICO", color: C.accent3, title: "Simulador de campo magnético", img: "10_magnetico.png", alt: "Campo magnético de un solenoide",
    bullets: ["Imán, solenoide, espira, hilo y dos hilos (Biot–Savart)", "Partículas por las líneas de B y corriente animada en el conductor", "Brújula con inercia que oscila hasta alinearse con B"],
    formula: "B = (μ₀/4π) ∮ I dl × r̂ / r²", cap: "Solenoide de 200 espiras: líneas cerradas, más densas en el interior.",
    notes: "Las líneas de B son cerradas (no hay monopolos). Cambiar la corriente o invertir su sentido y ver cómo la brújula verde oscila y se realinea. Comparar |B| en el centro con μ₀NI/L. Con dos hilos mostrar la fuerza por unidad de longitud entre corrientes paralelas.",
  });

  await moduleSlide({
    tag: "UNIDAD 4 · FUERZA DE LORENTZ", color: C.accent3, title: "Simulador de fuerza de Lorentz", img: "11_lorentz.png", alt: "Hélice de un protón",
    bullets: ["E y B cruzados: hélice, cicloide y selector de velocidades", "Vectores v (verde) y F (rojo) animados sobre la partícula", "Teoría frente a simulación: radio de Larmor, deriva E×B"],
    formula: "F = q(E + v×B)    r = m v⊥ / (|q| B)", cap: "Hélice de un protón en B = 0.1 T: radio simulado 9.041 mm = teórico.",
    notes: "Mostrar que la fuerza roja es siempre perpendicular a la velocidad cuando solo hay B, por lo que la rapidez no cambia. Escenario selector de velocidades: con v = E/B la fuerza neta es cero y la trayectoria es recta. Cicloide: deriva E×B desde el reposo.",
  });

  // ===== Arquitectura =====
  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "CÓMO ESTÁ CONSTRUIDO", C.accent1);
  title(s, "Arquitectura por capas", { y: 0.5 });
  bullets(s, ["Motor físico puro, sin interfaz: se prueba solo", "Algoritmos geométricos: líneas e isosuperficies", "Presentación: Three.js + Canvas 2D", "Referencia independiente en Python para validar", "Un solo archivo (dist/app.js): se abre con doble clic"], MX, 1.7, 4.9, 4.6, 18);
  const meta = await sharp(FIG("fig_arquitectura.png")).metadata();
  const aw = 6.6, ah = aw * meta.height / meta.width;
  s.addShape(pres.ShapeType.roundRect, { x: 5.95, y: 1.55, w: aw + 0.4, h: ah + 0.4, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: LINE, width: 1 }, objectName: "Panel del diagrama" });
  s.addImage({ path: FIG("fig_arquitectura.png"), x: 6.15, y: 1.75, w: aw, h: ah, altText: "Diagrama de arquitectura por capas", objectName: "Diagrama de arquitectura" });
  s.addNotes("La separación entre motor físico e interfaz es la decisión de diseño clave: permite probar las ecuaciones con node y compararlas con la implementación en Python. El bundle con esbuild genera un único archivo que funciona sin servidor.");

  // ===== Algoritmos =====
  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "CÓMO ESTÁ CONSTRUIDO", C.accent1);
  title(s, "Algoritmos clave", { y: 0.5 });
  const algs = [
    [ic.chart, "Líneas de campo", "RK4 sobre E/|E|; semillas ∝ |q|", C.accent1],
    [ic.cube, "Equipotenciales 3D", "Marching tetrahedra en malla 42³", C.accent2],
    [ic.cog, "Trayectorias", "Dormand–Prince 5(4) adaptativo", C.accent4],
    [ic.bolt, "Lorentz", "Integrador de Boris (orden 2, conserva |v|)", C.accent3],
    [ic.mag, "Campo magnético", "Biot–Savart numérico y semillas de igual flujo", C.accent6],
    [ic.calc, "Circuitos", "Reducción recursiva + análisis nodal (validación)", C.accent5],
  ];
  algs.forEach(([img, head, txt, col], i) => {
    const x = MX + (i % 3) * 4.1, y = 1.6 + Math.floor(i / 3) * 2.55, w = 3.85;
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 2.3, rectRadius: 0.12, fill: { color: PANEL }, line: { color: LINE, width: 1 }, objectName: `Tarjeta ${head}` });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fill: { color: col }, line: { color: col }, objectName: `Círculo ${head}` });
    s.addImage({ data: img, x: x + 0.47, y: y + 0.47, w: 0.36, h: 0.36, altText: head, objectName: `Icono ${head}` });
    s.addText(head, { x: x + 0.3, y: y + 1.1, w: w - 0.6, h: 0.45, fontSize: 20, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: `Título ${head}` });
    s.addText(txt, { x: x + 0.3, y: y + 1.55, w: w - 0.6, h: 0.65, fontSize: 14, color: C.background2, valign: "top", margin: 0, isTextBox: true, objectName: `Texto ${head}` });
  });
  s.addNotes("Seis algoritmos: RK4 para las líneas de campo; marching tetrahedra para las superficies equipotenciales; Dormand–Prince para trayectorias en campos no uniformes; Boris para Lorentz; Biot–Savart para el campo magnético con semillas de igual flujo (densidad de líneas proporcional a |B|); y reducción serie/paralelo para circuitos, validada con análisis nodal.");

  // ===== Validación =====
  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "VALIDACIÓN", C.accent5);
  title(s, "Los resultados se verifican, no solo se dibujan", { y: 0.5 });
  stat(s, "44/44", "pruebas superadas (19 JS + 25 Python)", MX, 1.6, 2.9, C.accent5, 40);
  stat(s, "10⁻¹⁵", "error de la parábola frente a la solución analítica", MX + 3.1, 1.6, 2.9, C.accent1, 40);
  stat(s, "1.996", "orden de convergencia medido de Boris (teórico 2)", MX, 3.5, 2.9, C.accent4, 40);
  stat(s, "100 %", "balance de potencia en circuitos (ΣI²R = VI)", MX + 3.1, 3.5, 2.9, C.accent3, 40);
  s.addText("Validación cruzada: el motor JavaScript del simulador coincide con una implementación independiente en NumPy/SciPy y con soluciones analíticas.", { x: MX, y: 5.4, w: 6.0, h: 1.1, fontSize: 15, color: MUTED, margin: 0, valign: "top", isTextBox: true, objectName: "Nota validación" });
  const labels = ["Parábola (E uniforme)", "Circuitos: reducción vs MNA", "Hélice: radio de Larmor", "Órbita: energía", "Biot–Savart (128 seg.)", "Solenoide (centro)"];
  const vals = [1.5e-15, 6.4e-16, 4.1e-11, 2.4e-10, 1.0e-9, 2.9e-5];
  s.addChart(pres.charts.BAR, [{ name: "Error relativo", labels, values: vals }], {
    x: 6.9, y: 1.55, w: 5.85, h: 4.9, barDir: "bar", chartColors: [C.accent1], showTitle: true, title: "Error relativo (escala logarítmica)", titleColor: "E6EBF5", titleFontSize: 16, titleFontFace: "+mn-lt",
    showValue: true, dataLabelFormatCode: "0.0E+00", dataLabelColor: "E6EBF5", dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt", dataLabelPosition: "outEnd",
    catAxisLabelColor: "E6EBF5", catAxisLabelFontSize: 11, catAxisLabelFontFace: "+mn-lt", valAxisLabelColor: "93A0B8", valAxisLabelFontSize: 11, valAxisLabelFontFace: "+mn-lt",
    catAxisLabelPos: "low", valAxisLogScaleBase: 10, valAxisMinVal: 1e-17, valAxisMaxVal: 1e-3, valAxisLabelFormatCode: "0E+00", valGridLine: { color: "28344B", size: 0.75 }, catGridLine: { style: "none" }, showLegend: false, catAxisOrientation: "maxMin",
  });
  s.addNotes("Cuatro cifras para recordar: 44 pruebas automáticas; error 10⁻¹⁵ en la parábola; el orden de convergencia medido del integrador de Boris es 1.996, muy cerca del 2 teórico; y el balance de potencia es exacto. El gráfico resume los errores relativos de las verificaciones principales en escala logarítmica.");

  // ===== Competencias =====
  s = pres.addSlide({ masterName: "BASE" });
  tag(s, "VALOR PARA INGENIERÍA DE SISTEMAS", C.accent2);
  title(s, "Competencias que desarrolla el proyecto", { y: 0.5 });
  const comps = [
    [ic.calc, "Modelamiento matemático", "Algoritmos que resuelven las ecuaciones físicas", C.accent1],
    [ic.code, "Programación científica", "Motor numérico en JS y NumPy/SciPy en Python", C.accent2],
    [ic.layer, "Arquitectura de software", "Capas modulares, estado compartido, bundle", C.accent4],
    [ic.pal, "UX / UI", "Interfaz clara para usuarios no técnicos", C.accent3],
    [ic.chart, "Visualización de datos", "Gráficas interactivas en 2D y 3D", C.accent5],
    [ic.team, "Trabajo en equipo", "Repositorio y documentación listos para colaborar", C.accent6],
  ];
  comps.forEach(([img, head, txt, col], i) => {
    const x = MX + (i % 3) * 4.1, y = 1.6 + Math.floor(i / 3) * 2.55, w = 3.85;
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 2.3, rectRadius: 0.12, fill: { color: PANEL }, line: { color: LINE, width: 1 }, objectName: `Tarjeta ${head}` });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fill: { color: col }, line: { color: col }, objectName: `Círculo ${head}` });
    s.addImage({ data: img, x: x + 0.47, y: y + 0.47, w: 0.36, h: 0.36, altText: head, objectName: `Icono ${head}` });
    s.addText(head, { x: x + 0.3, y: y + 1.1, w: w - 0.6, h: 0.45, fontSize: 20, bold: true, color: C.background1, margin: 0, isTextBox: true, objectName: `Título ${head}` });
    s.addText(txt, { x: x + 0.3, y: y + 1.55, w: w - 0.6, h: 0.65, fontSize: 14, color: C.background2, valign: "top", margin: 0, isTextBox: true, objectName: `Texto ${head}` });
  });
  s.addNotes("Relacionar con las competencias que menciona el documento del producto final: modelamiento, programación científica, arquitectura, UX/UI, visualización, simulación y trabajo en equipo.");

  // ===== Conclusiones =====
  s = pres.addSlide({ masterName: "PORTADA" });
  s.addText("CONCLUSIONES", { x: MX, y: 0.7, w: 6, h: 0.35, fontSize: 14, bold: true, color: C.accent1, charSpacing: 3, margin: 0, isTextBox: true, objectName: "Etiqueta" });
  s.addText("Un simulador completo, animado y verificado", { x: MX, y: 1.2, w: 7.2, h: 1.5, fontSize: 36, bold: true, color: C.background1, margin: 0, valign: "top", isTextBox: true, objectName: "Título" });
  bullets(s, ["Nueve módulos para las cuatro unidades, con escenas 3D animadas e interactivas", "Motor físico propio, validado con 44 pruebas y con Python", "Entregables: código, manual de usuario, informe técnico y esta presentación", "Trabajo futuro: mallas de circuitos arbitrarias, más geometrías de capacitor, campos no uniformes"], MX, 3.0, 7.2, 3.4, 18);
  s.addShape(pres.ShapeType.roundRect, { x: 8.6, y: 1.5, w: 4.1, h: 4.7, rectRadius: 0.15, fill: { color: PANEL }, line: { color: C.accent1, width: 1.5 }, objectName: "Tarjeta gracias" });
  s.addImage({ path: LOGO, x: 9.9, y: 1.75, w: 1.5, h: 1.5, rounding: true, altText: "Logo de la Universidad Peruana Unión", objectName: "Logo UPeU" });
  s.addText("¡Gracias!", { x: 8.6, y: 3.35, w: 4.1, h: 0.9, fontSize: 44, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Gracias" });
  s.addText("¿Preguntas?", { x: 8.6, y: 4.2, w: 4.1, h: 0.6, fontSize: 28, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "Preguntas" });
  s.addText("[Nombre(s) del equipo]\n[Docente]  ·  [Ciclo]", { x: 8.6, y: 5.0, w: 4.1, h: 0.9, fontSize: 14, color: MUTED, align: "center", valign: "top", margin: 0, isTextBox: true, objectName: "Autores" });
  s.addNotes("Cerrar resumiendo: se cumplió el producto pedido, con visualización animada y verificación numérica. Invitar a preguntas y ofrecer repetir alguna parte de la demo.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("OK", OUT);
})();
