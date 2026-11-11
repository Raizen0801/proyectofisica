// Formato numérico con prefijos SI.
const PREFIXES = [
  [1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f'], [1e-18, 'a'],
];

/** 4.7e-6, 'F' -> "4.70 µF" */
export function si(value, unit = '', digits = 3) {
  if (!isFinite(value)) return value > 0 ? '∞ ' + unit : value < 0 ? '−∞ ' + unit : '— ' + unit;
  if (value === 0) return `0 ${unit}`.trim();
  const a = Math.abs(value);
  let pick = PREFIXES[PREFIXES.length - 1];
  for (const p of PREFIXES) { if (a >= p[0] * 0.99995) { pick = p; break; } }
  const v = value / pick[0];
  const txt = Math.abs(v) >= Math.pow(10, digits) ? v.toFixed(0) : v.toPrecision(digits);
  return `${txt} ${pick[1]}${unit}`.trim();
}

/** Notación científica compacta: 1.23e-5 -> "1.23×10⁻⁵" */
export function sci(value, digits = 3) {
  if (!isFinite(value)) return '—';
  if (value === 0) return '0';
  const [m, e] = value.toExponential(digits - 1).split('e');
  const exp = parseInt(e, 10);
  if (exp === 0) return m;
  const sup = String(exp).replace(/-/g, '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  return `${m}×10${sup}`;
}

/** Número con decimales fijos sin ceros inútiles. */
export function fix(value, d = 3) {
  if (!isFinite(value)) return '—';
  return parseFloat(value.toFixed(d)).toString();
}

export const deg = (r) => (r * 180) / Math.PI;
export const rad = (d) => (d * Math.PI) / 180;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
