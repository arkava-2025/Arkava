// Puntos del hero de /servicios. x/y en % de la imagen del edificio
// (01-edificio.jpg). Textos provisionales: se escriben después con seo-writer.

export type SpotId =
  | 'integral'
  | 'diseno'
  | 'pintura'
  | 'enchape'
  | 'decorativos'
  | 'cielo'
  | 'drywall'
  | 'estuco'
  | 'argamasa'
  | 'carpinteria';

export type Spot = {
  id: SpotId;
  n: number;
  label: string;
  x: number;
  y: number;
  title: string;
  text: string;
  href: string;
  cta: string;
};

const PLACEHOLDER = 'Texto provisional: aquí va el detalle del servicio.';

const spot = (
  n: number,
  id: SpotId,
  label: string,
  x: number,
  y: number,
  href: string,
): Spot => {
  const contact = href === '/contacto/';
  return {
    id,
    n,
    label,
    x,
    y,
    title: label,
    text: PLACEHOLDER,
    href,
    cta: contact ? 'Cotizar proyecto' : 'Ver servicio',
  };
};

export const SPOTS: Spot[] = [
  spot(1, 'integral', 'Remodelación integral', 61, 58, '/contacto/'),
  spot(2, 'diseno', 'Diseño', 66.5, 35, '/contacto/'),
  spot(3, 'pintura', 'Pintura', 79, 27, '/servicios/pintura/'),
  spot(4, 'enchape', 'Enchape', 47.5, 56.5, '/servicios/enchape/'),
  spot(5, 'decorativos', 'Muros decorativos', 65, 78, '/servicios/muros-decorativos/'),
  spot(6, 'cielo', 'Cielo raso', 56.5, 31, '/servicios/cielo-raso/'),
  spot(7, 'drywall', 'Muros en drywall', 56.5, 46, '/servicios/muros-drywall/'),
  spot(8, 'estuco', 'Estuco', 31.5, 71, '/servicios/estuco/'),
  spot(9, 'argamasa', 'Argamasa', 79, 55, '/servicios/argamasa/'),
  spot(10, 'carpinteria', 'Carpintería', 56, 20, '/servicios/carpinteria/'),
];
