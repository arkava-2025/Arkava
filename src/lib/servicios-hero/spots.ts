// Puntos del hero de /servicios. x/y en % de la imagen del edificio
// (01-edificio.jpg). Cada tarjeta lleva la keyword del servicio + Medellín,
// un dato concreto (precio de referencia publicado en el blog y en llms.txt)
// y un enlace con texto descriptivo hacia la landing.

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
  fact: string;
  href: string;
  cta: string;
};

export const SPOTS: Spot[] = [
  {
    id: 'integral',
    n: 1,
    label: 'Remodelación integral',
    x: 61,
    y: 58,
    title: 'Remodelación integral de apartamentos y casas',
    text: 'Un solo equipo y un solo contrato para toda la obra: demolición, obra gris, obra blanca y acabados. Pagas por etapas según el avance y, si la necesitas, con póliza de cumplimiento.',
    fact: 'En Medellín, entre $850.000 y $1.800.000 por m² según el nivel de acabado',
    href: '/contacto/',
    cta: 'Cotizar remodelación integral',
  },
  {
    id: 'diseno',
    n: 2,
    label: 'Diseño',
    x: 66.5,
    y: 35,
    title: 'Diseño arquitectónico antes de construir',
    text: 'Primero se resuelve el espacio en planos y en volumen. Con el diseño cerrado, el presupuesto es real y en obra no hay que improvisar.',
    fact: 'Planos, volumetría y selección de materiales',
    href: '/contacto/',
    cta: 'Cotizar diseño arquitectónico',
  },
  {
    id: 'pintura',
    n: 3,
    label: 'Pintura',
    x: 79,
    y: 27,
    title: 'Pintura de interiores y fachadas en Medellín',
    text: 'Resanamos y preparamos la superficie antes de pintar. Trabajamos con pinturas base agua, esmaltes, epóxicas y poliuretanos en muros, cielos, fachadas y estructuras metálicas, y entregamos el espacio limpio.',
    fact: 'Desde $18.000/m² en Medellín',
    href: '/servicios/pintura/',
    cta: 'Ver pintura en Medellín',
  },
  {
    id: 'enchape',
    n: 4,
    label: 'Enchape',
    x: 47.5,
    y: 56.5,
    title: 'Instalación de enchapes en baños, cocinas y pisos',
    text: 'Cerámica y porcelanato en pequeño y gran formato, sobre una base nivelada y con el pegante que pide cada formato. Las juntas quedan alineadas en baños, cocinas, pisos, piscinas y fachadas.',
    fact: 'Instalado desde $80.000/m²',
    href: '/servicios/enchape/',
    cta: 'Ver instalación de enchapes',
  },
  {
    id: 'decorativos',
    n: 5,
    label: 'Muros decorativos',
    x: 65,
    y: 78,
    title: 'Microcemento y muros decorativos en Medellín',
    text: 'Microcemento, estuco veneciano y porcelanato líquido aplicados a mano, capa por capa, en muros y pisos de interior o exterior. Ninguna superficie queda igual a otra.',
    fact: 'Microcemento desde $95.000/m²',
    href: '/servicios/muros-decorativos/',
    cta: 'Ver muros decorativos',
  },
  {
    id: 'cielo',
    n: 6,
    label: 'Cielo raso',
    x: 56.5,
    y: 31,
    title: 'Cielo raso en drywall y PVC',
    text: 'Cielos en drywall estándar, RH o RF, superboard y PVC, con dilataciones para luz indirecta. La estructura se nivela y las juntas se cierran con cinta y masilla antes de pintar.',
    fact: 'En drywall, desde $70.000/m² instalado',
    href: '/servicios/cielo-raso/',
    cta: 'Ver cielo raso en Medellín',
  },
  {
    id: 'drywall',
    n: 7,
    label: 'Muros en drywall',
    x: 56.5,
    y: 46,
    title: 'Muros en drywall y superboard',
    text: 'Divisiones livianas en drywall, superboard o mixtas, con aislamiento termoacústico o resistencia al fuego cuando el espacio lo pide. Toman menos tiempo que un muro en ladrillo y dejan menos escombro.',
    fact: 'Para viviendas, oficinas y hoteles',
    href: '/servicios/muros-drywall/',
    cta: 'Ver muros en drywall',
  },
  {
    id: 'estuco',
    n: 8,
    label: 'Estuco',
    x: 31.5,
    y: 71,
    title: 'Estuco liso, labrado y texturizado',
    text: 'Estucos en polvo, plásticos y acrílicos para dejar el muro plano y listo para pintar. Filetes y ranuras bien definidos, en interior y exterior.',
    fact: 'Desde $25.000/m²',
    href: '/servicios/estuco/',
    cta: 'Ver estuco en Medellín',
  },
  {
    id: 'argamasa',
    n: 9,
    label: 'Argamasa',
    x: 79,
    y: 55,
    title: 'Argamasa y revoque para nivelar muros',
    text: 'Revoque, revoestuco o pañete como base del acabado final, en muros y pisos. Con una base bien nivelada aparecen menos fisuras y el estuco, la pintura o el enchape quedan mejor.',
    fact: 'Base para interiores y fachadas',
    href: '/servicios/argamasa/',
    cta: 'Ver argamasa y revoque',
  },
  {
    id: 'carpinteria',
    n: 10,
    label: 'Carpintería',
    x: 56,
    y: 20,
    title: 'Carpintería arquitectónica a medida',
    text: 'Mobiliario fijo fabricado en taller y montado en obra: módulos, puertas y mesones que llegan a la medida exacta de cada muro, coordinados con los puntos de agua, la electricidad y la iluminación.',
    fact: 'Fabricación e instalación a medida',
    href: '/servicios/carpinteria/',
    cta: 'Ver carpintería arquitectónica',
  },
];
