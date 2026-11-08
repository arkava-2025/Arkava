// ─────────────────────────────────────────────────────────────────────────────
// COLORES DEL PROBADOR DE PINTURA (/servicios/pintura/)
//
// Para cambiar la paleta edita solo este arreglo: agrega, quita o reordena
// objetos. La página y el probador se actualizan solos.
//
//   nombre  Nombre que ve el cliente.
//   hex     Color en pantalla (#rrggbb).
//   origen  De dónde sale (marca y año, o "Selección Arkava").
//   uso     Para qué espacio funciona. Google lee este texto: escríbelo útil.
//
// Los hex de las marcas son aproximados: los fabricantes no publican un valor
// digital oficial en todos los casos. El tono exacto se confirma en carta física.
// ─────────────────────────────────────────────────────────────────────────────

export type ColorPintura = {
  nombre: string;
  hex: string;
  origen: string;
  uso: string;
};

export const COLORES_PINTURA: ColorPintura[] = [
  {
    nombre: 'Celery',
    hex: '#cfc99a',
    origen: 'Sherwin-Williams · Color del año 2027',
    uso: 'Verde claro con fondo amarillo. Da luz a salas y comedores con poca ventana, y combina bien con roble y lino.',
  },
  {
    nombre: 'Soulful Sage',
    hex: '#a3ad97',
    origen: 'Dulux · Color del año 2027',
    uso: 'Verde grisáceo que descansa la vista. Es de los más fáciles de usar en alcobas y funciona con pisos en madera.',
  },
  {
    nombre: 'Grounded',
    hex: '#5e5c50',
    origen: 'Behr · Color del año 2027',
    uso: 'Oliva profundo para un muro de acento. Pide buena luz y un acabado mate para que no se vea plano.',
  },
  {
    nombre: 'Azul Atlántico',
    hex: '#1f4e6b',
    origen: 'Pintuco · Color del año 2026',
    uso: 'Azul intenso para estudios y comedores amplios. En espacios pequeños conviene dejarlo en un solo muro.',
  },
  {
    nombre: 'Arcilla',
    hex: '#b4755a',
    origen: 'Selección Arkava',
    uso: 'Terracota suave que se lleva bien con listones de madera y luz cálida. Es el tono de la obra de la foto.',
  },
  {
    nombre: 'Arena',
    hex: '#d6c7ae',
    origen: 'Selección Arkava',
    uso: 'Neutro cálido para zonas sociales. Reemplaza al blanco cuando el espacio se siente frío.',
  },
  {
    nombre: 'Blanco roto',
    hex: '#efe9dc',
    origen: 'Selección Arkava',
    uso: 'Amplía el espacio y deja que manden los materiales y el mobiliario. Es seguro para arriendos y ventas.',
  },
  {
    nombre: 'Carbón',
    hex: '#3a3b3c',
    origen: 'Selección Arkava',
    uso: 'Para el muro del televisor o una cabecera. Reduce reflejos en pantalla y marca mucho el espacio.',
  },
];
