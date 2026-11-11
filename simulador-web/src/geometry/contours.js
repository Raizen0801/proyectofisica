// Extracción de isolíneas (marching squares) e isosuperficies (marching tetrahedra).

/**
 * Marching squares sobre una malla regular nx×ny. Devuelve segmentos [x0,y0,x1,y1,...] en coordenadas del dominio.
 */
export function marchingSquares(values, nx, ny, level, xmin, xmax, ymin, ymax) {
  const dx = (xmax - xmin) / (nx - 1), dy = (ymax - ymin) / (ny - 1);
  const out = [];
  const lerp = (a, b, va, vb) => (vb === va ? 0.5 : (level - va) / (vb - va)) * (b - a) + a;
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const v00 = values[j * nx + i], v10 = values[j * nx + i + 1];
      const v11 = values[(j + 1) * nx + i + 1], v01 = values[(j + 1) * nx + i];
      let idx = 0;
      if (v00 > level) idx |= 1;
      if (v10 > level) idx |= 2;
      if (v11 > level) idx |= 4;
      if (v01 > level) idx |= 8;
      if (idx === 0 || idx === 15) continue;
      const x0 = xmin + i * dx, y0 = ymin + j * dy, x1 = x0 + dx, y1 = y0 + dy;
      // puntos en las 4 aristas: abajo(b), derecha(r), arriba(t), izquierda(l)
      const b = [lerp(x0, x1, v00, v10), y0];
      const r = [x1, lerp(y0, y1, v10, v11)];
      const t = [lerp(x0, x1, v01, v11), y1];
      const l = [x0, lerp(y0, y1, v00, v01)];
      const seg = (p, q) => out.push(p[0], p[1], q[0], q[1]);
      switch (idx) {
        case 1: case 14: seg(l, b); break;
        case 2: case 13: seg(b, r); break;
        case 3: case 12: seg(l, r); break;
        case 4: case 11: seg(r, t); break;
        case 6: case 9: seg(b, t); break;
        case 7: case 8: seg(l, t); break;
        case 5: case 10: {
          const c = (v00 + v10 + v11 + v01) / 4 > level;
          if ((idx === 5) === c) { seg(l, t); seg(b, r); } else { seg(l, b); seg(r, t); }
          break;
        }
        default: break;
      }
    }
  }
  return new Float32Array(out);
}

// Descomposición del cubo en 6 tetraedros que comparten la diagonal 0–6.
const CORNERS = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
const TETS = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];

/**
 * Marching tetrahedra sobre una malla n³ que cubre [-L, L]³. Devuelve posiciones de triángulos (Float32Array).
 * values[(k*n + j)*n + i] es el valor en (x_i, y_j, z_k).
 */
export function marchingTetrahedra(values, n, level, L) {
  const step = (2 * L) / (n - 1);
  const tris = [];
  const val = new Float64Array(8);
  const pos = new Array(8);
  const edge = (a, b) => {
    const va = val[a], vb = val[b];
    const t = vb === va ? 0.5 : (level - va) / (vb - va);
    const pa = pos[a], pb = pos[b];
    return [pa[0] + t * (pb[0] - pa[0]), pa[1] + t * (pb[1] - pa[1]), pa[2] + t * (pb[2] - pa[2])];
  };
  const push = (...ps) => { for (const p of ps) tris.push(p[0], p[1], p[2]); };
  for (let k = 0; k < n - 1; k++) {
    for (let j = 0; j < n - 1; j++) {
      for (let i = 0; i < n - 1; i++) {
        let mn = Infinity, mx = -Infinity;
        for (let c = 0; c < 8; c++) {
          const [ci, cj, ck] = CORNERS[c];
          const v = values[((k + ck) * n + (j + cj)) * n + (i + ci)];
          val[c] = v;
          if (v < mn) mn = v;
          if (v > mx) mx = v;
        }
        if (level < mn || level > mx) continue;
        for (let c = 0; c < 8; c++) {
          const [ci, cj, ck] = CORNERS[c];
          pos[c] = [-L + (i + ci) * step, -L + (j + cj) * step, -L + (k + ck) * step];
        }
        for (const tet of TETS) {
          const inside = tet.filter((v) => val[v] < level);
          const outside = tet.filter((v) => val[v] >= level);
          if (inside.length === 0 || inside.length === 4) continue;
          if (inside.length === 1) {
            const a = inside[0];
            push(edge(a, outside[0]), edge(a, outside[1]), edge(a, outside[2]));
          } else if (inside.length === 3) {
            const a = outside[0];
            push(edge(a, inside[0]), edge(a, inside[1]), edge(a, inside[2]));
          } else {
            const [a, b] = inside, [c, d] = outside;
            const p0 = edge(a, c), p1 = edge(a, d), p2 = edge(b, d), p3 = edge(b, c);
            push(p0, p1, p2, p0, p2, p3);
          }
        }
      }
    }
  }
  return new Float32Array(tris);
}
