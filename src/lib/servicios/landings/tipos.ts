// Estructura del contenido de cada landing de servicio. El texto vive en un
// archivo por servicio; ServicioLanding.astro lo pinta y arma el schema.

export type Dato = { label: string; value: string };

export type Tabla = {
  caption: string;
  columnas: string[];
  filas: string[][];
};

export type Bloque = {
  id: string;
  kicker: string;
  titulo: string;
  parrafos: string[];
  lista?: { titulo: string; texto: string }[];
  tabla?: Tabla;
};

export type Foto = {
  archivo: string;
  alt: string;
  caption: string;
};

export type Enlace = { titulo: string; href: string };

export type Landing = {
  slug: string;
  nombre: string;
  serviceType: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  datos: Dato[];
  // Precio mínimo por m² en COP para el schema Offer (el mismo del hub)
  priceFrom?: number;
  ogFoto: string;
  bloques: Bloque[];
  precios?: Tabla & { titulo: string; nota: string };
  proceso: { titulo: string; pasos: { titulo: string; texto: string }[] };
  fotos: Foto[];
  proyectos: { nombre: string; detalle: string; href: string }[];
  faq: { q: string; a: string }[];
  relacionados: Enlace[];
  blog: Enlace[];
  waTexto: string;
};
