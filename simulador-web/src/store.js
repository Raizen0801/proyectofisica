// Estado compartido entre módulos: la distribución de cargas puntuales (Unidad 1).
const listeners = new Set();
const MAX_CHARGES = 10;
let nextId = 1;

export const COLORS = { pos: 0xff5c5c, neg: 0x4f9dff };

const mk = (q, x, y, z = 0) => ({ id: nextId++, q, x, y, z });

export const store = {
  /** Cargas en nC y metros. */
  charges: [mk(2, -2, 0), mk(-2, 2, 0)],
  MAX_CHARGES,

  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  emit(kind = 'change') { for (const fn of listeners) fn(kind); },

  add(c = {}) {
    if (this.charges.length >= MAX_CHARGES) return false;
    this.charges.push(mk(c.q ?? 1, c.x ?? 0, c.y ?? 0, c.z ?? 0));
    this.emit('structure');
    return true;
  },
  remove(id) { this.charges = this.charges.filter((c) => c.id !== id); this.emit('structure'); },
  update(id, patch, kind = 'change') { const c = this.charges.find((k) => k.id === id); if (c) { Object.assign(c, patch); this.emit(kind); } },
  set(list) { this.charges = list.slice(0, MAX_CHARGES).map((c) => mk(c.q, c.x, c.y, c.z ?? 0)); this.emit('structure'); },

  /** Copia en unidades SI (C, m). Si flat2d, proyecta sobre z = 0. */
  si({ flat2d = false } = {}) {
    return this.charges.map((c) => ({ q: c.q * 1e-9, x: c.x, y: c.y, z: flat2d ? 0 : c.z }));
  },
};

export const PRESETS = {
  una: { nombre: 'Una carga positiva', cargas: [[3, 0, 0, 0]] },
  dipolo: { nombre: 'Dipolo eléctrico', cargas: [[2, -2, 0, 0], [-2, 2, 0, 0]] },
  iguales: { nombre: 'Dos cargas iguales', cargas: [[2, -2, 0, 0], [2, 2, 0, 0]] },
  asimetrico: { nombre: 'Cargas desiguales (+3, −1)', cargas: [[3, -2, 0, 0], [-1, 2, 0, 0]] },
  cuadrupolo: { nombre: 'Cuadrupolo', cargas: [[2, -2, -2, 0], [-2, 2, -2, 0], [2, 2, 2, 0], [-2, -2, 2, 0]] },
  anillo: { nombre: 'Anillo de 8 cargas', cargas: Array.from({ length: 8 }, (_, i) => [1, 3 * Math.cos((i * Math.PI) / 4), 3 * Math.sin((i * Math.PI) / 4), 0]) },
  placas: { nombre: 'Hileras paralelas (±)', cargas: [[1.5, -2.5, -3, 0], [1.5, -2.5, -1, 0], [1.5, -2.5, 1, 0], [1.5, -2.5, 3, 0], [-1.5, 2.5, -3, 0], [-1.5, 2.5, -1, 0], [-1.5, 2.5, 1, 0], [-1.5, 2.5, 3, 0]].map(([q, x, y, z]) => [q, x, y, z]) },
  tetraedro: { nombre: 'Tetraedro 3D (+/−)', cargas: [[2, 2, 2, 2], [-2, -2, -2, 2], [2, -2, 2, -2], [-2, 2, -2, -2]] },
};
