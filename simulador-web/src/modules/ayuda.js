import { h } from '../ui/dom.js';

export default {
  id: 'ayuda',
  titulo: 'Ayuda',
  mount(root) {
    root.append(h('div', { class: 'help-page' },
      h('h2', {}, 'Cómo usar el simulador'),
      h('p', {}, 'Elige un módulo en el menú lateral. Cada módulo tiene un panel de controles a la izquierda y la visualización a la derecha.'),
      h('h2', {}, 'Controles en las escenas 3D'),
      h('ul', {},
        h('li', {}, h('kbd', {}, 'Arrastrar'), ' con el botón izquierdo: rotar la cámara.'),
        h('li', {}, h('kbd', {}, 'Rueda'), ': acercar o alejar.'),
        h('li', {}, h('kbd', {}, 'Arrastrar derecho'), ' (o Shift + arrastrar): desplazar la vista.'),
        h('li', {}, 'En el módulo de cargas, arrastra una carga con el ratón para moverla en el plano horizontal.')),
      h('h2', {}, 'Unidades'),
      h('p', {}, 'Distancias en metros, cargas en nanocoulombs (nC), potencial en voltios (V) y campo en V/m. Los módulos de partículas y de campo magnético usan SI y reescalan la escena automáticamente.'),
      h('h2', {}, 'Escena compartida'),
      h('p', {}, 'Las cargas del módulo «Visualizador de cargas» se comparten con la «Calculadora de potencial» y el «Simulador de trayectoria».'),
      h('h2', {}, 'Validación'),
      h('p', {}, 'El motor físico se verifica con pruebas automáticas contra soluciones analíticas y contra una implementación independiente en Python (NumPy/SciPy). Consulta el informe técnico.')));
    return {};
  },
};
