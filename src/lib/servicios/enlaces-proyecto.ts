// Convierte el texto libre de "servicios" de un proyecto (Hygraph) en enlaces a
// las landings. Si no reconoce ninguno, enlaza al hub.

type Enlace = { titulo: string; href: string };

const REGLAS: { patron: RegExp; enlace: Enlace }[] = [
  { patron: /obra (negra|gris|blanca)/i, enlace: { titulo: 'Obra blanca', href: '/servicios/obra-blanca/' } },
  { patron: /pintura/i, enlace: { titulo: 'Pintura', href: '/servicios/pintura/' } },
  { patron: /estuco/i, enlace: { titulo: 'Estuco', href: '/servicios/estuco/' } },
  { patron: /enchape/i, enlace: { titulo: 'Enchape', href: '/servicios/enchape/' } },
  { patron: /cielo/i, enlace: { titulo: 'Cielo raso', href: '/servicios/cielo-raso/' } },
  { patron: /drywall|superboard/i, enlace: { titulo: 'Muros en drywall', href: '/servicios/muros-drywall/' } },
  { patron: /decorativ|microcemento/i, enlace: { titulo: 'Muros decorativos', href: '/servicios/muros-decorativos/' } },
  { patron: /argamasa|revoque/i, enlace: { titulo: 'Argamasa y revoque', href: '/servicios/argamasa/' } },
  { patron: /carpinter/i, enlace: { titulo: 'Carpintería', href: '/servicios/carpinteria/' } },
];

export function enlacesDeProyecto(servicios?: string | null): Enlace[] {
  const enlaces = REGLAS.filter((r) => r.patron.test(servicios ?? '')).map((r) => r.enlace);
  return enlaces.length ? enlaces : [{ titulo: 'Servicios de remodelación en Medellín', href: '/servicios/' }];
}
