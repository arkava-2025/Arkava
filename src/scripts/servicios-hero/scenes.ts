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
};

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
  // La pintura baja piso por piso, por las juntas de cada placa
  pintura: { area: CULATA, yEdges: [7.5, 30, 44, 59, 72, 84, 100] },
  // Juntas del muro de fondo del baño (medidas sobre la 11b)
  enchape: {
    xEdges: [18.75, 25.75, 37.85, 50, 62.15, 74.25, 80.85, 87.85],
    yEdges: [5.6, 49.2, 91.2],
  },
  decorativos: { area: { x0: 25.5, y0: 3, x1: 95.5, y1: 86.5 } },
  estuco: { area: { x0: 16, y0: 8, x1: 100, y1: 94 } },
  // Una franja por placa entre perfiles, más el refuerzo sobre el vano
  drywall: {
    area: { x0: 27, y0: 15, x1: 75.5, y1: 86.5 },
    xEdges: range(27, 75.5, 8),
    header: { x0: 75.5, y0: 14.5, x1: 92, y1: 21 },
  },
  // Grupos de tablillas a los dos lados de la puerta pivotante
  carpinteria: {
    area: { x0: 19, y0: 16.5, x1: 100, y1: 86.5 },
    xEdges: [...range(19, 66.3, 12), ...range(82.7, 100, 4)],
    door: { x0: 66.3, y0: 17.5, x1: 82.7, y1: 86.5 },
  },
};
