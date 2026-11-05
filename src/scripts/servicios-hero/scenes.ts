import type { Rect } from './geometry';

// Zonas de cada escena en % de la imagen (2752 × 1536), medidas sobre las
// fotos. Cada efecto se limita a su zona: fuera de ella se ve una sola imagen,
// así no aparecen las pequeñas diferencias entre fotos (plantas, paisaje).
export type SceneGeometry = {
  area?: Rect;
  poly?: [number, number][];
  xEdges?: number[];
  yEdges?: number[];
  door?: Rect;
  header?: Rect;
  light?: [number, number];
  modules?: (Rect & { kind: 'base' | 'tower' | 'upper' })[];
};

const bandsOf = (xs: number[], y0: number, y1: number, kind: 'base' | 'tower' | 'upper') =>
  xs.slice(0, -1).map((x0, i) => ({ x0, x1: xs[i + 1], y0, y1, kind }));

const range = (from: number, to: number, n: number) =>
  Array.from({ length: n + 1 }, (_, i) => Math.round((from + ((to - from) * i) / n) * 100) / 100);

// Muro lateral del edificio (08, 09, 10): incluye la franja de la esquina
const CULATA: Rect = { x0: 30, y0: 7.5, x1: 84.5, y1: 100 };

export const SCENES: Record<string, SceneGeometry> = {
  // Techo hasta la línea superior de los muros; la luz nace en la cornisa
  cielo: {
    poly: [
      [0, 0],
      [100, 0],
      [100, 3],
      [68.5, 51.5],
      [34.5, 51.5],
      [0, 2],
    ],
    light: [51.75, 30],
  },
  // Toda la sala menos el vidrio del ventanal (el paisaje no cambia)
  integral: {
    poly: [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
      [0, 84],
      [43.5, 67],
      [43.5, 30],
      [0, 4],
    ],
  },
  argamasa: { area: CULATA },
  // Primer plano de la culata (08c, 09c): muro y franja de la esquina
  pintura: { area: { x0: 6, y0: 0, x1: 93.3, y1: 100 } },
  // Juntas del muro de fondo del baño (medidas sobre la 11b)
  enchape: {
    xEdges: [18.75, 25.75, 37.85, 50, 62.15, 74.25, 80.85, 87.85],
    yEdges: [5.6, 49.2, 91.2],
  },
  decorativos: { area: { x0: 25.5, y0: 3, x1: 95.5, y1: 86.5 } },
  estuco: { area: { x0: 16, y0: 8, x1: 100, y1: 94 } },
  // Tres placas (juntas medidas sobre la 18b) y el refuerzo sobre el vano.
  // El muro a la derecha del vano no entra: está terminado en todas las fotos.
  drywall: {
    area: { x0: 27.2, y0: 14.3, x1: 92.5, y1: 87.5 },
    xEdges: [27.2, 43.75, 60.5, 75.2],
    header: { x0: 75.2, y0: 14.3, x1: 92.5, y1: 21.5 },
  },
  // Cocina (24-27): módulos medidos sobre la 26, en orden de montaje:
  // muebles bajos de izquierda a derecha, torre y muebles altos.
  carpinteria: {
    modules: [
      ...bandsOf([21.8, 30.6, 44.1, 52.8, 61.3, 75, 83.8], 58.5, 83.5, 'base'),
      ...bandsOf([83.8, 94, 100], 14, 83.5, 'tower'),
      ...bandsOf([23.5, 30.8, 45.6, 60.1, 74.5, 81.8], 16.5, 43.5, 'upper'),
    ],
    light: [52, 44],
  },
};
