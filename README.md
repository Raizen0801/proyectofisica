# ⚡ Simulador Interactivo de Campos Eléctricos y Magnéticos en 3D

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WebGL](https://img.shields.io/badge/WebGL-Three.js-orange.svg)](https://threejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Tests](https://img.shields.io/badge/Tests-44%20passed-success.svg)](#validación-y-pruebas)

> **Producto Final de Física 2 — Escuela Profesional de Ingeniería de Sistemas**  
> **Universidad Peruana Unión (UPeU)**

Aplicación web interactiva 3D con **motor físico propio en tiempo real**, acompañada de un paquete científico en **Python (NumPy / SciPy)** para la validación cruzada y rigor analítico de los cálculos electromagnéticos.

---

## 🚀 Inicio Rápido

### 1. Ejecutar el Simulador Web
No requiere servidor ni instalación de dependencias externas:
* Haz doble clic sobre `simulador-web/index.html` en Chrome, Edge o Firefox con soporte WebGL.
* O sírvelo localmente con Python:
  ```bash
  python -m http.server 8765 --directory simulador-web
  # Abrir en el navegador: http://localhost:8765
  ```

### 2. Validación Científica en Python (Opcional)
```bash
cd python
pip install -r requirements.txt
python -m pytest                      # 25 pruebas numéricas automatizadas
python scripts/generar_figuras.py     # Genera figuras de validación del informe
```

### 3. Recompilación del Motor Web (Node.js ≥ 18)
```bash
cd simulador-web
npm install
npm run build      # Empaqueta el bundle en dist/app.js con esbuild
npm test           # Ejecuta las 19 pruebas del motor físico en JS
```

---

## 📚 Módulos del Proyecto (4 Unidades)

| Unidad | Módulo | Contenido y Fenómenos Modelados |
|:---:|:---|:---|
| **1** | **Visualizador de cargas puntuales** | Hasta 10 cargas arrastrables, líneas de campo 3D/2D por RK4, superficies equipotenciales y mapa de potencial. |
| **1** | **Calculadora de potencial y trabajo** | $V$ y $\vec{E}$ en cualquier punto, desglose de aportes, trabajo $W(P \to Q) = q_0(V_P - V_Q)$ y perfiles gráficos. |
| **1** | **Simulador de trayectoria** | Integración numérica RK45 (Dormand-Prince) en campos eléctricos, conservación de energía ($\Delta K + \Delta U = 0$). |
| **2** | **Simulador de capacitores** | Geometría de placas paralelas, inserción parcial de dieléctricos, modo batería vs aislado y alerta de ruptura ($3\text{ MV/m}$). |
| **2** | **Energía almacenada y circuito RC** | $U = \frac{1}{2}CV^2$, redes en serie/paralelo y balance energético en carga/descarga RC. |
| **3** | **Simulador de circuitos** | Redes mixtas anidadas, reducción recursiva, corrientes por rama y balance de potencia $100\%$ ($\sum I^2 R = V \cdot I$). |
| **3** | **Ley de Ohm dinámica** | Relación interactiva $V = I \cdot R$, barrido senoidal en tiempo real, curvas $I-V$ y efecto de incandescencia. |
| **4** | **Campo magnético (Biot-Savart)** | Imanes, solenoides de múltiples espiras, espiras e hilos; líneas de $\vec{B}$ cerradas y brújula con inercia física. |
| **4** | **Fuerza de Lorentz** | Campos cruzados $\vec{E}$ y $\vec{B}$, hélices, cicloides, selector de velocidades e **Integrador de Boris** (Orden 2). |

---

## 📂 Estructura del Repositorio

```
├── simulador-web/           # Aplicación Web 3D interactiva
│   ├── index.html           # Punto de entrada principal
│   ├── dist/app.js          # Bundle autocontenido generado con esbuild
│   ├── src/                 # Código fuente modular (physics/, geometry/, ui/, modules/)
│   └── tests/               # 19 pruebas del motor físico web (Node.js)
├── python/                  # Paquete científico de validación
│   ├── fisica_em/           # electrostatica, dinamica, capacitores, circuitos, magnetostatica
│   ├── tests/               # 25 pruebas analíticas con NumPy / SciPy
│   └── scripts/             # Generación de gráficos comparativos
├── docs/                    # Documentación técnica y presentaciones
│   ├── Informe_tecnico.pdf  # Memoria técnica formal
│   ├── Manual_de_usuario.pdf# Guía paso a paso para el usuario
│   ├── Presentacion_Simulador_Campos_EM.pptx
│   └── capturas/            # Capturas de alta definición de los 9 módulos
├── Video_Presentacion_Simulador_EM.mp4  # Video narrado de presentación (3 min, 1080p)
└── README.md
```

---

## 🔬 Validación y Pruebas

El sistema cuenta con un total de **44 pruebas automáticas**:
* **19 pruebas en Node.js:** Verifican las leyes de Coulomb, superposición, mallas, capacitancias y algoritmos geométricos en JavaScript.
* **25 pruebas en Python (PyTest):** Validación cruzada contra soluciones analíticas exactas y métodos de referencia en SciPy (errores $< 10^{-11}$).
* **Integrador de Boris:** Orden de convergencia medido de $1.996$ (teórico $2.0$).

---

## 👥 Equipo y Créditos

* **Carrera:** Ingeniería de Sistemas
* **Asignatura:** Física 2
* **Institución:** Universidad Peruana Unión (UPeU)

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulte el archivo [LICENSE](LICENSE) para más detalles.

