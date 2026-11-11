// Gráficas 2D ligeras sobre <canvas> (sin dependencias) con ejes, cuadrícula, marcadores y lectura al pasar el cursor.
import { h } from './dom.js';

const COLORS = ['#4cc2ff', '#ff9f6b', '#7ae582', '#c79bff', '#ffd166'];

function niceStep(range, targetTicks = 6) {
  const raw = range / targetTicks;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / p;
  return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}

function tickLabel(v) {
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e5 || a < 1e-3) return v.toExponential(1).replace('e+', 'e');
  return parseFloat(v.toPrecision(4)).toString();
}

export class LineChart {
  /**
   * @param opts { xlabel, ylabel, height, xfmt, yfmt }
   */
  constructor(opts = {}) {
    this.opts = opts;
    this.canvas = h('canvas', { class: 'chart' });
    if (opts.height) this.canvas.style.height = `${opts.height}px`;
    this.data = { series: [], markers: [], vlines: [] };
    this.hover = null;
    this.ro = new ResizeObserver(() => this.draw());
    this.ro.observe(this.canvas);
    this.canvas.addEventListener('pointermove', (e) => { this.hover = e; this.draw(); });
    this.canvas.addEventListener('pointerleave', () => { this.hover = null; this.draw(); });
    this.el = this.canvas;
  }

  /** series: [{ x:[], y:[], color?, label?, dash? }], markers: [{x,y,color?,label?}], vlines: [{x,label?,color?}] */
  set(data) { this.data = { series: [], markers: [], vlines: [], ...data }; this.draw(); }

  destroy() { this.ro.disconnect(); }

  draw() {
    const cv = this.canvas;
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth, H = cv.clientHeight;
    if (!W || !H) return;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const { series, markers, vlines } = this.data;
    const L = 58, R = 14, T = 12, B = 38;
    const pw = W - L - R, ph = H - T - B;
    let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
    for (const s of series) for (let i = 0; i < s.x.length; i++) {
      if (!isFinite(s.y[i])) continue;
      xmin = Math.min(xmin, s.x[i]); xmax = Math.max(xmax, s.x[i]);
      ymin = Math.min(ymin, s.y[i]); ymax = Math.max(ymax, s.y[i]);
    }
    for (const m of markers) { xmin = Math.min(xmin, m.x); xmax = Math.max(xmax, m.x); ymin = Math.min(ymin, m.y); ymax = Math.max(ymax, m.y); }
    if (!isFinite(xmin)) { ctx.fillStyle = '#93a0b8'; ctx.fillText('Sin datos', 20, 30); return; }
    if (this.opts.yZero !== false && ymin > 0 && ymin < 0.6 * ymax) ymin = 0;
    if (xmax === xmin) { xmax += 1; xmin -= 1; }
    if (ymax === ymin) { ymax += 1; ymin -= 1; }
    const padY = (ymax - ymin) * 0.06;
    ymax += padY; if (ymin !== 0) ymin -= padY;
    const X = (x) => L + ((x - xmin) / (xmax - xmin)) * pw;
    const Y = (y) => T + ph - ((y - ymin) / (ymax - ymin)) * ph;

    ctx.font = '11px "Segoe UI", sans-serif';
    ctx.textBaseline = 'middle';
    // cuadrícula y ticks
    ctx.strokeStyle = '#1f2a3f'; ctx.fillStyle = '#93a0b8'; ctx.lineWidth = 1;
    const sx = niceStep(xmax - xmin, Math.max(3, pw / 90)), sy = niceStep(ymax - ymin, Math.max(3, ph / 45));
    ctx.textAlign = 'right';
    for (let v = Math.ceil(ymin / sy) * sy; v <= ymax + 1e-12; v += sy) {
      const y = Y(v); ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(W - R, y); ctx.stroke();
      ctx.fillText(this.opts.yfmt ? this.opts.yfmt(v) : tickLabel(v), L - 6, y);
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let v = Math.ceil(xmin / sx) * sx; v <= xmax + 1e-12; v += sx) {
      const x = X(v); ctx.beginPath(); ctx.moveTo(x, T); ctx.lineTo(x, T + ph); ctx.stroke();
      ctx.fillText(this.opts.xfmt ? this.opts.xfmt(v) : tickLabel(v), x, T + ph + 5);
    }
    // ejes
    ctx.strokeStyle = '#44536e';
    ctx.strokeRect(L, T, pw, ph);
    if (xmin < 0 && xmax > 0) { ctx.beginPath(); ctx.moveTo(X(0), T); ctx.lineTo(X(0), T + ph); ctx.stroke(); }
    if (ymin < 0 && ymax > 0) { ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(L + pw, Y(0)); ctx.stroke(); }
    // etiquetas de ejes
    ctx.fillStyle = '#c3cde0'; ctx.textBaseline = 'alphabetic';
    if (this.opts.xlabel) { ctx.textAlign = 'center'; ctx.fillText(this.opts.xlabel, L + pw / 2, H - 6); }
    if (this.opts.ylabel) { ctx.save(); ctx.translate(13, T + ph / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(this.opts.ylabel, 0, 0); ctx.restore(); }

    ctx.save();
    ctx.beginPath(); ctx.rect(L, T, pw, ph); ctx.clip();
    for (const vl of vlines) {
      ctx.strokeStyle = vl.color || '#fbbf24'; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(X(vl.x), T); ctx.lineTo(X(vl.x), T + ph); ctx.stroke(); ctx.setLineDash([]);
      if (vl.label) { ctx.fillStyle = vl.color || '#fbbf24'; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(vl.label, X(vl.x) + 4, T + 3); }
    }
    series.forEach((s, k) => {
      ctx.strokeStyle = s.color || COLORS[k % COLORS.length]; ctx.lineWidth = s.width || 2; ctx.setLineDash(s.dash || []);
      ctx.beginPath();
      let pen = false;
      for (let i = 0; i < s.x.length; i++) {
        if (!isFinite(s.y[i])) { pen = false; continue; }
        const x = X(s.x[i]), y = Y(s.y[i]);
        if (!pen) { ctx.moveTo(x, y); pen = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    });
    ctx.restore();
    for (const m of markers) {
      ctx.fillStyle = m.color || '#ffffff'; ctx.strokeStyle = '#0b0f17'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(X(m.x), Y(m.y), 5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
      if (m.label) { ctx.fillStyle = '#e6ebf5'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(m.label, X(m.x) + 8, Y(m.y) - 4); }
    }
    // leyenda
    let lx = L + 8;
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    series.forEach((s, k) => {
      if (!s.label) return;
      ctx.fillStyle = s.color || COLORS[k % COLORS.length];
      ctx.fillRect(lx, T + 10, 14, 3);
      ctx.fillStyle = '#c3cde0'; ctx.fillText(s.label, lx + 19, T + 12);
      lx += 28 + ctx.measureText(s.label).width;
    });
    // cursor
    if (this.hover && series.length) {
      const rect = cv.getBoundingClientRect();
      const mx = this.hover.clientX - rect.left;
      if (mx >= L && mx <= L + pw) {
        const xv = xmin + ((mx - L) / pw) * (xmax - xmin);
        ctx.strokeStyle = '#ffffff44'; ctx.beginPath(); ctx.moveTo(mx, T); ctx.lineTo(mx, T + ph); ctx.stroke();
        let ty = T + 28;
        series.forEach((s, k) => {
          // interpolación lineal en x
          let best = 0;
          for (let i = 0; i < s.x.length; i++) if (Math.abs(s.x[i] - xv) < Math.abs(s.x[best] - xv)) best = i;
          const yv = s.y[best];
          if (!isFinite(yv)) return;
          ctx.fillStyle = s.color || COLORS[k % COLORS.length];
          ctx.beginPath(); ctx.arc(X(s.x[best]), Y(yv), 3.5, 0, 2 * Math.PI); ctx.fill();
          const txt = `${s.label ? s.label + ': ' : ''}${this.opts.yfmt ? this.opts.yfmt(yv) : tickLabel(yv)}  @ ${this.opts.xfmt ? this.opts.xfmt(s.x[best]) : tickLabel(s.x[best])}`;
          ctx.textAlign = mx > L + pw / 2 ? 'right' : 'left'; ctx.textBaseline = 'middle';
          ctx.fillStyle = '#0b0f17cc'; const tw = ctx.measureText(txt).width + 8;
          const tx = mx > L + pw / 2 ? mx - 8 : mx + 8;
          ctx.fillRect(mx > L + pw / 2 ? tx - tw + 4 : tx - 4, ty - 8, tw, 16);
          ctx.fillStyle = s.color || COLORS[k % COLORS.length];
          ctx.fillText(txt, tx, ty); ty += 18;
        });
      }
    }
  }
}
