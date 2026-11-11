// Circuitos de resistencias en serie, paralelo y mixto, representados como árbol.
// Nodo: { type: 'R', id, R } | { type: 'S', children: [...] } | { type: 'P', children: [...] }

let uid = 1;
export const newId = () => `n${uid++}`;
export const R = (value, name) => ({ type: 'R', id: newId(), R: value, name });
export const S = (...children) => ({ type: 'S', id: newId(), children });
export const P = (...children) => ({ type: 'P', id: newId(), children });

/** Resistencia equivalente. */
export function equivalent(node) {
  if (node.type === 'R') return node.R;
  const rs = node.children.map(equivalent);
  if (node.type === 'S') return rs.reduce((a, b) => a + b, 0);
  return 1 / rs.reduce((a, b) => a + 1 / b, 0);
}

/**
 * Resuelve el circuito con una fuente V en serie con `root`.
 * Devuelve un árbol anotado { ...node, Req, I, V, P } y totales.
 */
export function solve(root, Vsource) {
  const Req = equivalent(root);
  const I = Vsource / Req;
  const annotate = (node, V, Iin) => {
    const Rn = equivalent(node);
    const out = { ...node, Req: Rn, I: Iin, V, P: V * Iin };
    if (node.type === 'S') {
      out.children = node.children.map((c) => {
        const rc = equivalent(c);
        return annotate(c, Iin * rc, Iin);
      });
    } else if (node.type === 'P') {
      out.children = node.children.map((c) => {
        const rc = equivalent(c);
        return annotate(c, V, V / rc);
      });
    }
    return out;
  };
  const tree = annotate(root, Vsource, I);
  return { tree, Req, I, V: Vsource, P: Vsource * I };
}

/** Lista plana de resistores del árbol anotado, en orden de lectura. */
export function flatten(node, acc = []) {
  if (node.type === 'R') acc.push(node);
  else node.children.forEach((c) => flatten(c, acc));
  return acc;
}

/** Potencia total disipada: Σ I² R (para verificar el balance con la fuente). */
export function dissipated(tree) {
  return flatten(tree).reduce((s, r) => s + r.I * r.I * r.R, 0);
}

/** Expresión legible del equivalente, p. ej. "R1 + (R2 ∥ R3)". */
export function expression(node, names = new Map()) {
  if (node.type === 'R') return names.get(node.id) || node.name || 'R';
  const parts = node.children.map((c) => {
    const s = expression(c, names);
    return c.type === 'R' ? s : `(${s})`;
  });
  return parts.join(node.type === 'S' ? ' + ' : ' ∥ ');
}

/** Asigna nombres R1, R2, ... en orden de lectura. */
export function nameResistors(root) {
  const names = new Map();
  let k = 1;
  const walk = (n) => {
    if (n.type === 'R') names.set(n.id, `R${k++}`);
    else n.children.forEach(walk);
  };
  walk(root);
  return names;
}

/** Netlist plana para análisis nodal (usado en las pruebas): [{a, b, R}], con nodos enteros. Fuente entre nodo 0 (+) y GND (-1). */
export function toNetlist(root) {
  const edges = [];
  let node = 1;
  const alloc = () => node++;
  const build = (n, a, b) => {
    if (n.type === 'R') { edges.push({ a, b, R: n.R, id: n.id }); return; }
    if (n.type === 'S') {
      let cur = a;
      n.children.forEach((c, i) => {
        const next = i === n.children.length - 1 ? b : alloc();
        build(c, cur, next);
        cur = next;
      });
    } else n.children.forEach((c) => build(c, a, b));
  };
  build(root, 0, -1);
  return edges;
}
