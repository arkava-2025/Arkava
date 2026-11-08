// ─────────────────────────────────────────────────────────────────────────────
// OPCIONES DEL SIMULADOR DE ENCHAPE (/servicios/enchape/)
//
// Edita estos arreglos para agregar formatos o materiales.
//
// FORMATOS: largo y ancho en centímetros. `modo` es recto, trabado o espiga.
// `desfase` (0 a 1) mueve cada fila en los trabados. `desperdicio` es el
// porcentaje que se compra de más por cortes. Caja: presentación habitual.
//
// MATERIALES: `tipo` elige el dibujo (marmol, cemento, madera o piedra).
// `base` y `veta` son los dos colores del dibujo, `brillo` va de 0 (mate) a
// 1 (pulido) y `juntaMm` es el ancho de la boquilla en milímetros.
// ─────────────────────────────────────────────────────────────────────────────

export type FormatoEnchape = {
  id: string;
  nombre: string;
  largo: number;
  ancho: number;
  modo: 'recto' | 'trabado' | 'espiga';
  desfase: number;
  desperdicio: number;
  m2Caja: number;
  piezasCaja: number;
  nota: string;
};

export type MaterialEnchape = {
  id: string;
  nombre: string;
  tipo: 'marmol' | 'cemento' | 'madera' | 'piedra';
  base: string;
  veta: string;
  junta: string;
  juntaMm: number;
  brillo: number;
};

export const FORMATOS_ENCHAPE: FormatoEnchape[] = [
  { id: '60x60', nombre: '60 × 60 recto', largo: 60, ancho: 60, modo: 'recto', desfase: 0, desperdicio: 10, m2Caja: 1.44, piezasCaja: 4, nota: 'El formato más usado en apartamentos. Pocos cortes y buena relación entre costo y resultado.' },
  { id: '60x120', nombre: '60 × 120 recto', largo: 120, ancho: 60, modo: 'recto', desfase: 0, desperdicio: 10, m2Caja: 1.44, piezasCaja: 2, nota: 'Menos juntas y sensación de amplitud. Pide base muy plana, doble encolado y niveladores.' },
  { id: '60x120-t', nombre: '60 × 120 trabado', largo: 120, ancho: 60, modo: 'trabado', desfase: 0.1, desperdicio: 12, m2Caja: 1.44, piezasCaja: 2, nota: 'En gran formato se traba poco, alrededor del 10 %. La pieza no es perfectamente plana y un desfase mayor deja cejas.' },
  { id: '30x60', nombre: '30 × 60 trabado', largo: 60, ancho: 30, modo: 'trabado', desfase: 0.5, desperdicio: 12, m2Caja: 1.44, piezasCaja: 8, nota: 'Formato clásico para baños y muros. Trabado a la mitad funciona bien porque la pieza es pequeña.' },
  { id: '20x120', nombre: '20 × 120 tipo tablón', largo: 120, ancho: 20, modo: 'trabado', desfase: 0.33, desperdicio: 12, m2Caja: 1.44, piezasCaja: 6, nota: 'Lectura de piso en madera con la resistencia del porcelanato. Se traba a un tercio.' },
  { id: 'espiga', nombre: '20 × 120 en espiga', largo: 120, ancho: 20, modo: 'espiga', desfase: 0, desperdicio: 18, m2Caja: 1.44, piezasCaja: 6, nota: 'El patrón con más cortes y mano de obra. Da mucha presencia en salas y corredores.' },
];

export const MATERIALES_ENCHAPE: MaterialEnchape[] = [
  { id: 'calacatta', nombre: 'Calacatta pulido', tipo: 'marmol', base: '#e9e6df', veta: '#8f8a80', junta: '#cfcbc2', juntaMm: 2, brillo: 0.85 },
  { id: 'crema', nombre: 'Crema beige pulido', tipo: 'marmol', base: '#d9ccb6', veta: '#a78f6e', junta: '#c0b39d', juntaMm: 2, brillo: 0.7 },
  { id: 'cemento', nombre: 'Cemento gris mate', tipo: 'cemento', base: '#a29f98', veta: '#8a8780', junta: '#8e8b84', juntaMm: 3, brillo: 0.08 },
  { id: 'roble', nombre: 'Roble natural', tipo: 'madera', base: '#b48c5e', veta: '#7c5a36', junta: '#6a4e30', juntaMm: 2, brillo: 0.12 },
  { id: 'nogal', nombre: 'Nogal oscuro', tipo: 'madera', base: '#6d4c35', veta: '#3e2a1c', junta: '#352518', juntaMm: 2, brillo: 0.14 },
  { id: 'piedra', nombre: 'Piedra carbón', tipo: 'piedra', base: '#4a4a48', veta: '#2f2f2e', junta: '#3a3a39', juntaMm: 3, brillo: 0.22 },
];
