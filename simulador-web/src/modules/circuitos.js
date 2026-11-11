// Unidad 3 · Módulo 6: Simulador de circuitos de resistencias en serie, paralelo y mixto.
import { h, svg, group, numField, select, button, readouts, modTitle } from '../ui/dom.js';
import * as circ from '../physics/circuits.js';
import { si } from '../ui/format.js';

const PRESETS = {
  serie: { nombre: 'Serie: R₁ + R₂ + R₃', make: () => circ.S(circ.R(100), circ.R(220), circ.R(330)) },
  paralelo: { nombre: 'Paralelo: R₁ ∥ R₂ ∥ R₃', make: () => circ.P(circ.R(100), circ.R(220), circ.R(330)) },
  mixto1: { nombre: 'Mixto: R₁ + (R₂ ∥ R₃) + R₄', make: () => circ.S(circ.R(100), circ.P(circ.R(220), circ.R(330)), circ.R(47)) },
  mixto2: { nombre: 'Mixto: (R₁+R₂) ∥ (R₃+R₄), luego + R₅', make: () => circ.S(circ.P(circ.S(circ.R(100), circ.R(220)), circ.S(circ.R(330), circ.R(150))), circ.R(68)) },
  mixto3: { nombre: 'Mixto anidado: R₁ + (R₂ ∥ (R₃ + (R₄ ∥ R₅)))', make: () => circ.S(circ.R(47), circ.P(circ.R(220), circ.S(circ.R(100), circ.P(circ.R(330), circ.R(150))))) },
};

export default {
  id: 'circuitos', unidad: 3, icono: 'Ω', titulo: 'Simulador de circuitos', corto: 'Serie, paralelo y mixto',
  mount(root) {
    const st = { root: PRESETS.mixto1.make(), V: 12 };

    // ---------- editor de árbol ----------
    const treeBox = h('div', { class: 'tree' });
    const nameOf = () => circ.nameResistors(st.root);

    function renderNode(node, parent, names) {
      if (node.type === 'R') {
        const inp = h('input', { type: 'number', value: node.R, min: 0.001, step: 'any', style: { width: '90px' } });
        inp.addEventListener('input', () => { const v = parseFloat(inp.value); if (isFinite(v) && v > 0) { node.R = v; refresh(false); } });
        return h('div', { class: 'row tnode', style: { padding: '5px 8px' } }, h('b', { style: { width: '30px' } }, names.get(node.id)), inp, h('span', { class: 'note' }, 'Ω'), h('div', { class: 'grow' }),
          parent ? h('button', { class: 'btn small danger', title: 'Quitar', onclick: () => { parent.children = parent.children.filter((c) => c !== node); refresh(true); } }, '✕') : null);
      }
      const isS = node.type === 'S';
      return h('div', { class: `tnode ${node.type}` },
        h('div', { class: 'thead' },
          h('b', {}, isS ? 'Serie' : 'Paralelo'), h('span', { class: 'note' }, `(${node.children.length})`), h('div', { class: 'grow' }),
          h('button', { class: 'btn small', title: 'Añadir resistor', onclick: () => { node.children.push(circ.R(100)); refresh(true); } }, '+ R'),
          h('button', { class: 'btn small', title: 'Añadir grupo en serie', onclick: () => { node.children.push(circ.S(circ.R(100), circ.R(100))); refresh(true); } }, '+ Serie'),
          h('button', { class: 'btn small', title: 'Añadir grupo en paralelo', onclick: () => { node.children.push(circ.P(circ.R(100), circ.R(100))); refresh(true); } }, '+ Par.'),
          h('button', { class: 'btn small', title: 'Cambiar serie ⇄ paralelo', onclick: () => { node.type = isS ? 'P' : 'S'; refresh(true); } }, '⇄'),
          parent ? h('button', { class: 'btn small danger', title: 'Quitar grupo', onclick: () => { parent.children = parent.children.filter((c) => c !== node); refresh(true); } }, '✕') : null),
        h('div', { class: 'tkids' }, node.children.map((c) => renderNode(c, node, names))));
    }

    // ---------- esquema SVG ----------
    const schem = h('div', { class: 'schem' });
    const RW = 118, SYM = 64;
    const measure = (n) => {
      if (n.type === 'R') return { w: RW, up: 30, down: 36 };
      const ms = n.children.map(measure);
      if (n.type === 'S') return { w: ms.reduce((s, m) => s + m.w, 0), up: Math.max(...ms.map((m) => m.up)), down: Math.max(...ms.map((m) => m.down)) };
      const total = ms.reduce((s, m) => s + m.up + m.down, 0) + 10 * (ms.length - 1);
      return { w: Math.max(...ms.map((m) => m.w)) + 56, up: ms[0].up, down: total - ms[0].up };
    };

    function drawSchematic(sol, names) {
      const total = sol.I;
      const els = [];
      const wire = (d, I) => {
        els.push(svg('path', { d, fill: 'none', stroke: '#51648a', 'stroke-width': 2.2, 'stroke-linecap': 'round' }));
        if (I > 0) {
          const dur = Math.min(8, Math.max(0.5, (1.2 * total) / I));
          els.push(svg('path', { d, fill: 'none', stroke: '#ffe066', 'stroke-width': 3, 'stroke-linecap': 'round', class: 'flow', style: { animationDuration: `${dur}s` } }));
        }
      };
      const text = (x, y, s, o = {}) => els.push(svg('text', { x, y, 'text-anchor': 'middle', 'font-size': 12, fill: o.fill || 'var(--text)', 'font-family': 'var(--mono)', 'font-weight': o.bold ? 700 : 400 }, s));

      const draw = (n, x, y) => {
        const m = measure(n);
        if (n.type === 'R') {
          const cx = x + RW / 2, x0 = cx - SYM / 2, x1 = cx + SYM / 2;
          wire(`M ${x} ${y} L ${x0} ${y}`, n.I);
          wire(`M ${x1} ${y} L ${x + RW} ${y}`, n.I);
          const zz = []; const k = 6;
          for (let i = 0; i <= k; i++) zz.push(`${x0 + ((x1 - x0) * i) / k},${y + (i === 0 || i === k ? 0 : i % 2 ? -9 : 9)}`);
          els.push(svg('polyline', { points: zz.join(' '), fill: 'none', stroke: '#9cc3ff', 'stroke-width': 2.6, 'stroke-linejoin': 'round' }));
          text(cx, y - 20, `${names.get(n.id)} = ${si(n.R, 'Ω', 3)}`, { bold: true });
          text(cx, y + 22, `${si(n.I, 'A', 3)}`, { fill: '#ffe066' });
          text(cx, y + 35, `${si(n.V, 'V', 3)}`, { fill: '#7ae582' });
          return;
        }
        if (n.type === 'S') {
          let cur = x;
          n.children.forEach((c) => { draw(c, cur, y); cur += measure(c).w; });
          return;
        }
        const pad = 28, xl = x + 10, xr = x + m.w - 10;
        let yy = y;
        const ys = [];
        n.children.forEach((c, i) => {
          const cm = measure(c);
          if (i > 0) yy += measure(n.children[i - 1]).down + 10 + cm.up;
          ys.push(yy);
          const off = (m.w - 2 * pad - cm.w) / 2;
          if (i === 0) { wire(`M ${x} ${y} L ${x + pad + off} ${y}`, c.I); wire(`M ${x + pad + off + cm.w} ${y} L ${x + m.w} ${y}`, c.I); }
          else { wire(`M ${xl} ${yy} L ${x + pad + off} ${yy}`, c.I); wire(`M ${x + pad + off + cm.w} ${yy} L ${xr} ${yy}`, c.I); }
          draw(c, x + pad + off, yy);
          // si el hijo es más estrecho, rellenar con cable
        });
        const yEnd = ys[ys.length - 1];
        wire(`M ${xl} ${y} L ${xl} ${yEnd}`, 0); wire(`M ${xr} ${y} L ${xr} ${yEnd}`, 0);
        // puntos de unión
        els.push(svg('circle', { cx: xl, cy: y, r: 3.2, fill: '#9cc3ff' }), svg('circle', { cx: xr, cy: y, r: 3.2, fill: '#9cc3ff' }));
      };

      const m = measure(sol.tree);
      const xs = 124, yTop = 36 + m.up;
      const yBot = yTop + m.down + 56;
      const W = xs + m.w + 60, H = yBot + 40;
      // conductores del lazo principal (siguen el sentido convencional de la corriente)
      wire(`M ${xs - 40} ${yTop} L ${xs} ${yTop}`, total);
      draw(sol.tree, xs, yTop);
      wire(`M ${xs + m.w} ${yTop} L ${xs + m.w + 30} ${yTop} L ${xs + m.w + 30} ${yBot} L ${xs - 40} ${yBot}`, total);
      wire(`M ${xs - 40} ${yBot} L ${xs - 40} ${(yTop + yBot) / 2 + 12}`, total);
      wire(`M ${xs - 40} ${(yTop + yBot) / 2 - 12} L ${xs - 40} ${yTop}`, total);
      // batería
      const by = (yTop + yBot) / 2;
      els.push(svg('line', { x1: xs - 58, y1: by - 12, x2: xs - 22, y2: by - 12, stroke: '#ff8a8a', 'stroke-width': 3.5 }));
      els.push(svg('line', { x1: xs - 50, y1: by + 12, x2: xs - 30, y2: by + 12, stroke: '#8ab8ff', 'stroke-width': 3.5 }));
      text(xs - 62, by - 16, '+', { fill: '#ff8a8a', bold: true }); text(xs - 62, by + 22, '−', { fill: '#8ab8ff', bold: true });
      text(xs - 96, by + 4, `${si(sol.V, 'V', 3)}`, { bold: true });
      return svg('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Esquema del circuito', style: { minWidth: `${Math.min(W, 520)}px` } }, ...els);
    }

    // ---------- resultados ----------
    const ro = readouts([{ key: 'Req', label: 'Resistencia equivalente' }, { key: 'I', label: 'Corriente de la fuente' }, { key: 'P', label: 'Potencia entregada' }, { key: 'bal', label: 'Balance de potencia' }]);
    const exprBox = h('div', { class: 'formula' });
    const tbody = h('tbody'), tfoot = h('tfoot');

    // elimina grupos vacíos (un grupo sin elementos no tiene significado eléctrico); la raíz nunca queda vacía
    function prune(node) {
      if (node.type === 'R') return;
      node.children.forEach(prune);
      node.children = node.children.filter((c) => c.type === 'R' || c.children.length > 0);
    }

    function refresh(structure) {
      prune(st.root);
      if (!st.root.children.length) st.root.children.push(circ.R(100));
      const names = nameOf();
      if (structure) treeBox.replaceChildren(renderNode(st.root, null, names));
      const sol = circ.solve(st.root, st.V);
      const rs = circ.flatten(sol.tree);
      const diss = circ.dissipated(sol.tree);
      ro.update({
        Req: [si(sol.Req, 'Ω', 4), ''], I: [si(sol.I, 'A', 4), 'I = V / Req'], P: [si(sol.P, 'W', 4), 'P = V I'],
        bal: [`${((diss / sol.P) * 100).toFixed(4)} %`, 'Σ I²R / (V I)', Math.abs(diss / sol.P - 1) < 1e-9 ? 'good' : 'bad'],
      });
      exprBox.textContent = `Req = ${circ.expression(st.root, names)} = ${si(sol.Req, 'Ω', 4)}`;
      tbody.replaceChildren(...rs.map((r) => h('tr', {}, h('td', {}, names.get(r.id)), h('td', {}, si(r.R, 'Ω')), h('td', {}, si(r.V, 'V')), h('td', {}, si(r.I, 'A')), h('td', {}, si(r.I * r.I * r.R, 'W')), h('td', {}, `${((100 * r.I * r.I * r.R) / sol.P).toFixed(1)} %`))));
      schem.replaceChildren(drawSchematic(sol, names));
    }

    // ---------- controles ----------
    const vField = numField({ label: 'Voltaje de la fuente (V)', value: st.V, step: 0.5, min: 0.1, onInput: (v) => { if (v > 0) { st.V = v; refresh(false); } } });
    const presetSel = select({
      label: 'Circuitos de ejemplo', options: [{ value: '', label: 'Cargar un ejemplo…' }, ...Object.entries(PRESETS).map(([k, v]) => ({ value: k, label: v.nombre }))],
      onInput: (k) => { if (k) { st.root = PRESETS[k].make(); refresh(true); } presetSel.set(''); },
    });
    const controls = h('aside', { class: 'controls' },
      modTitle('Simulador de circuitos', 'Arma circuitos con resistencias en serie, en paralelo o mixtos. El simulador calcula la corriente, el voltaje y la potencia de cada resistor.', ['Unidad 3', 'Leyes de Kirchhoff']),
      group('Ejemplos', presetSel.el),
      group('Fuente', vField.el),
      group('Construcción del circuito', treeBox, h('p', { class: 'note' }, 'Cada grupo es una conexión en serie (misma corriente) o en paralelo (mismo voltaje). Anida grupos con «+ Serie» y «+ Par.».')),
    );
    const stageEl = h('div', { class: 'stage scroll' },
      h('div', { class: 'card' }, h('h3', {}, 'Esquema del circuito'),
        h('div', { class: 'legend' }, h('span', {}, h('i', { style: { background: '#ffe066' } }), 'corriente (A)'), h('span', {}, h('i', { style: { background: '#7ae582' } }), 'voltaje en el resistor (V)'), h('span', {}, 'Las partículas amarillas indican el sentido convencional de la corriente; su velocidad es proporcional a la corriente de cada rama.')),
        schem, exprBox),
      h('div', { class: 'grid-2' },
        h('div', { class: 'card' }, h('h3', {}, 'Resumen'), ro.el),
        h('div', { class: 'card' }, h('h3', {}, 'Tabla por resistor'), h('table', { class: 'tbl' }, h('thead', {}, h('tr', {}, ['', 'R', 'V', 'I', 'P', '% de P'].map((t) => h('th', {}, t)))), tbody))),
      h('div', { class: 'card' }, h('h3', {}, 'Cómo se resuelve'),
        h('p', { class: 'help' }, '1) Se reduce el circuito de adentro hacia afuera: serie → R = ΣRᵢ ; paralelo → 1/R = Σ 1/Rᵢ.  2) Con Req se obtiene I = V/Req.  3) Se reparte hacia adentro: en serie la corriente es común y V se divide (Vᵢ = I Rᵢ); en paralelo el voltaje es común y la corriente se divide (Iᵢ = V/Rᵢ).  4) Se verifica la conservación de la energía: la potencia entregada por la fuente es igual a la suma de I²R.')));
    root.append(h('div', { class: 'mod' }, controls, stageEl));
    refresh(true);
    return {};
  },
};
