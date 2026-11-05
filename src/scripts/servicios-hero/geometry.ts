// Geometría de las escenas del hero. Todo está en % de la imagen (2752 × 1536):
// la capa usa la misma caja que la foto, así un % cae en el mismo píxel en
// cualquier pantalla.

export type Rect = { x0: number; y0: number; x1: number; y1: number };
export type Stroke = { cx: number; cy: number; rx: number; ry: number };

const r2 = (n: number) => Math.round(n * 100) / 100;

export function insetClip(r: Rect): string {
  return `inset(${r2(r.y0)}% ${r2(100 - r.x1)}% ${r2(100 - r.y1)}% ${r2(r.x0)}%)`;
}

export function polygonClip(points: [number, number][]): string {
  return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;
}

// Franjas entre bordes consecutivos de un eje; `cross` es el rango del otro eje.
export function bands(axis: 'x' | 'y', edges: number[], cross: [number, number]): Rect[] {
  const out: Rect[] = [];
  for (let i = 0; i < edges.length - 1; i++) {
    out.push(
      axis === 'y'
        ? { x0: cross[0], y0: edges[i], x1: cross[1], y1: edges[i + 1] }
        : { x0: edges[i], y0: cross[0], x1: edges[i + 1], y1: cross[1] },
    );
  }
  return out;
}

export function gridCells(xEdges: number[], yEdges: number[], order: 'rows' | 'cols'): Rect[] {
  const out: Rect[] = [];
  const nx = xEdges.length - 1;
  const ny = yEdges.length - 1;
  for (let a = 0; a < (order === 'rows' ? ny : nx); a++) {
    for (let b = 0; b < (order === 'rows' ? nx : ny); b++) {
      const [i, j] = order === 'rows' ? [b, a] : [a, b];
      out.push({ x0: xEdges[i], y0: yEdges[j], x1: xEdges[i + 1], y1: yEdges[j + 1] });
    }
  }
  return out;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Trazos de llana: elipses repartidas en filas (en zigzag, como se aplica a
// mano) que al radio completo cubren toda el área aunque estén desplazadas.
export function trowelStrokes(area: Rect, count: number, seed: number): Stroke[] {
  const rand = mulberry32(seed);
  const w = area.x1 - area.x0;
  const h = area.y1 - area.y0;
  const rows = Math.max(1, Math.round(Math.sqrt((count * h) / w)));
  const base = Math.floor(count / rows);
  const extra = count % rows;
  const jitter = 0.12;
  const out: Stroke[] = [];
  const ch = h / rows;
  for (let r = 0; r < rows; r++) {
    const n = base + (r < extra ? 1 : 0);
    const cw = w / n;
    const row: Stroke[] = [];
    for (let c = 0; c < n; c++) {
      row.push({
        cx: r2(area.x0 + cw * (c + 0.5) + (rand() * 2 - 1) * jitter * cw),
        cy: r2(area.y0 + ch * (r + 0.5) + (rand() * 2 - 1) * jitter * ch),
        rx: r2(cw * (0.5 + jitter) * 1.5),
        ry: r2(ch * (0.5 + jitter) * 1.5),
      });
    }
    out.push(...(r % 2 === 0 ? row : row.reverse()));
  }
  return out;
}

export function trowelMask(n: number): string {
  return Array.from(
    { length: n },
    (_, i) =>
      `radial-gradient(ellipse var(--svh-rx${i}) var(--svh-ry${i}) at var(--svh-cx${i}) var(--svh-cy${i}), #000 98%, transparent 100%)`,
  ).join(', ');
}
