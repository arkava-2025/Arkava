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
  light?: [number, number];
};

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
};
