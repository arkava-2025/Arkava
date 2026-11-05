// Contenido del hub /servicios (debajo del hero). Responde las búsquedas
// generales ("empresa de remodelación Medellín", "servicios de remodelación y
// acabados") y reparte enlaces hacia cada landing, sin repetir su contenido.
// Precios: los mismos ya publicados en el blog y en public/llms.txt.

export type LinkCard = { title: string; text: string; href: string; cta: string; price?: string; icon?: string };

// Iconos de Lucide (lucide.dev, licencia ISC): solo el contenido del <svg>,
// en una cuadrícula de 24 × 24 con trazo, para dibujarlos sin JavaScript.

export const PROYECTOS_TIPO: LinkCard[] = [
  {
    title: 'Remodelación de apartamentos',
    text: 'Renovación completa o por zonas: pisos, baños, cocina, cielos y muros. Coordinamos horarios y permisos con la administración del edificio.',
    price: '$850.000 a $1.800.000 por m²',
    href: '/blog/guia-remodelacion-apartamentos-medellin/',
    cta: 'Guía de remodelación de apartamentos',
  },
  {
    title: 'Remodelación de casas y fincas',
    text: 'Casas en Medellín y fincas en el Oriente cercano. Redistribución de espacios, fachadas, pisos y acabados interiores.',
    href: '/contacto/',
    cta: 'Cotizar remodelación de casa',
  },
  {
    title: 'Remodelación de baños',
    text: 'Enchapes, redes hidráulicas, mueble, grifería y ducha, con impermeabilización en zonas húmedas.',
    price: '$6.000.000 a $12.000.000 un baño completo',
    href: '/blog/cuanto-cuesta-remodelar-bano-medellin/',
    cta: 'Cuánto cuesta remodelar un baño',
  },
  {
    title: 'Remodelación de cocinas',
    text: 'Enchapes, mesones, redes e iluminación, coordinados con el mobiliario para que todo encaje a la primera.',
    price: 'Desde $6.800.000',
    href: '/blog/remodelacion-cocina-medellin-costos-materiales/',
    cta: 'Costos de remodelar una cocina',
  },
  {
    title: 'Obra blanca',
    text: 'Para inmuebles entregados en obra gris: revoque, estuco, pintura, cielos, enchapes y carpintería, hasta dejarlo listo para habitar.',
    href: '/contacto/',
    cta: 'Cotizar obra blanca',
  },
  {
    title: 'Locales comerciales y oficinas',
    text: 'Adecuaciones con horarios pactados para no frenar la operación del negocio, y entrega por zonas cuando hace falta.',
    href: '/contacto/',
    cta: 'Cotizar adecuación de local',
  },
  {
    title: 'Hoteles',
    text: 'Habitaciones, lobbies y zonas comunes. Hemos trabajado en Hunters, Heiss, Nakua y Calle Flora.',
    href: '/proyectos/',
    cta: 'Ver proyectos en hoteles',
  },
];

export const ESPECIALIDADES: LinkCard[] = [
  {
    title: 'Pintura',
    icon: '<rect width="16" height="6" x="2" y="2" rx="2" /><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect width="4" height="6" x="8" y="16" rx="1" />',
    text: 'Muros, cielos, fachadas y estructuras metálicas, con resane y preparación de la superficie.',
    price: 'Desde $18.000/m²',
    href: '/servicios/pintura/',
    cta: 'Pintura en Medellín',
  },
  {
    title: 'Enchape',
    icon: '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />',
    text: 'Cerámica y porcelanato en baños, cocinas, pisos, piscinas y fachadas.',
    price: 'Desde $80.000/m²',
    href: '/servicios/enchape/',
    cta: 'Instalación de enchapes',
  },
  {
    title: 'Estuco',
    icon: '<path d="m14.622 17.897-10.68-2.913" /><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" /><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />',
    text: 'Liso, labrado o texturizado. El muro queda plano y listo para pintar.',
    price: 'Desde $25.000/m²',
    href: '/servicios/estuco/',
    cta: 'Estuco en Medellín',
  },
  {
    title: 'Argamasa y revoque',
    icon: '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M12 9v6" /><path d="M16 15v6" /><path d="M16 3v6" /><path d="M3 15h18" /><path d="M3 9h18" /><path d="M8 15v6" /><path d="M8 3v6" />',
    text: 'Nivelación de muros y pisos como base del acabado final.',
    href: '/servicios/argamasa/',
    cta: 'Argamasa y revoque',
  },
  {
    title: 'Cielo raso',
    icon: '<path d="M12 2v5" /><path d="M14.829 15.998a3 3 0 1 1-5.658 0" /><path d="M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z" />',
    text: 'Drywall, PVC y fibra mineral, con dilataciones para luz indirecta.',
    price: 'Desde $70.000/m²',
    href: '/servicios/cielo-raso/',
    cta: 'Cielo raso en drywall',
  },
  {
    title: 'Muros en drywall',
    icon: '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" />',
    text: 'Divisiones livianas, con aislamiento termoacústico o resistencia al fuego.',
    href: '/servicios/muros-drywall/',
    cta: 'Muros en drywall y superboard',
  },
  {
    title: 'Muros decorativos',
    icon: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" />',
    text: 'Microcemento, estuco veneciano y texturas aplicadas a mano.',
    price: 'Microcemento desde $95.000/m²',
    href: '/servicios/muros-decorativos/',
    cta: 'Microcemento y muros decorativos',
  },
  {
    title: 'Carpintería',
    icon: '<path d="M10 12h.01" /><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" /><path d="M2 20h20" />',
    text: 'Puertas, revestimientos en madera y mobiliario fijo hechos para cada obra.',
    href: '/servicios/carpinteria/',
    cta: 'Carpintería arquitectónica',
  },
];

export type PriceRow = { item: string; range: string; note?: string; href?: string };

export const PRECIOS: PriceRow[] = [
  { item: 'Remodelación integral', range: '$850.000 – $1.800.000 por m²', note: 'Según el nivel de acabado', href: '/blog/guia-remodelacion-apartamentos-medellin/' },
  { item: 'Baño completo', range: '$6.000.000 – $12.000.000', note: 'Premium: $15.000.000 – $25.000.000 o más', href: '/blog/cuanto-cuesta-remodelar-bano-medellin/' },
  { item: 'Cocina', range: 'Desde $6.800.000', note: 'Hasta $60.000.000 o más con diseño premium', href: '/blog/remodelacion-cocina-medellin-costos-materiales/' },
  { item: 'Pintura de interiores', range: '$18.000 – $35.000 por m²', note: 'Mano de obra incluida' },
  { item: 'Estuco y pintura de muros', range: '$25.000 – $60.000 por m²' },
  { item: 'Enchape', range: '$80.000 – $350.000 por m²', note: 'De cerámica a porcelanato importado', href: '/blog/cuanto-cuesta-enchape-medellin/' },
  { item: 'Pisos en porcelanato o laminado', range: '$80.000 – $180.000 por m²' },
  { item: 'Microcemento', range: '$95.000 – $140.000 por m²', href: '/blog/microcemento-vs-pintura-paredes/' },
  { item: 'Cielo raso en drywall', range: '$70.000 – $95.000 por m²', note: 'PVC: $65.000 – $90.000 por m²', href: '/blog/tipos-cielo-raso-hogar/' },
];

export const PROCESO = [
  { title: 'Evaluación técnica', text: 'Revisamos el espacio, el estado de muros, redes y estructura, y escuchamos qué quieres lograr.' },
  { title: 'Planeación y presupuesto', text: 'Definimos diseño y materiales, y armamos un presupuesto por partidas. Lo que firmas es lo que pagas.' },
  { title: 'Ejecución', text: 'Un solo equipo coordina todos los oficios con un cronograma acordado desde el inicio.' },
  { title: 'Supervisión y control', text: 'Revisamos calidad y avance al cierre de cada etapa, antes de pasar a la siguiente.' },
  { title: 'Entrega final', text: 'Recorrido contigo, ajustes pendientes y el espacio limpio. La garantía queda por escrito.' },
];

export const GARANTIAS = [
  { title: 'Contrato desde el primer día', text: 'Alcance, plazos y condiciones quedan por escrito antes de empezar.' },
  { title: 'Presupuesto sin costos ocultos', text: 'Cada partida con su valor, para que sepas en qué se va tu inversión.' },
  { title: 'Pagos por etapas', text: 'Pagas según el avance real de la obra, no por adelantado.' },
  { title: 'Póliza de cumplimiento', text: 'Si la necesitas, la gestionamos con una aseguradora certificada.' },
  { title: 'Garantía por escrito', text: 'Cubre defectos de instalación o terminación según el servicio, con acompañamiento después de la entrega.' },
];

export const PROYECTOS = [
  { name: 'Hotel Nakua', kind: 'Hotel', href: '/proyectos/hotel-nakua/' },
  { name: 'Hunters Hotel', kind: 'Hotel', href: '/proyectos/hunters-hotel/' },
  { name: 'Hotel Heiss', kind: 'Hotel', href: '/proyectos/hotel-heiss/' },
  { name: 'Calle Flora Hotel', kind: 'Hotel', href: '/proyectos/calle-flora-hotel/' },
  { name: 'Proyecto Vesubio', kind: 'Apartamento en Medellín', href: '/proyectos/remodelacion-apartamento-medellin-proyecto-vesubio/' },
  { name: 'Casa El Pomar', kind: 'Casa', href: '/proyectos/casa-el-pomar/' },
];

export const ZONAS = {
  medellin: ['El Poblado', 'Laureles', 'Estadio', 'Belén'],
  valle: ['Envigado', 'Sabaneta', 'Itagüí', 'La Estrella', 'Bello'],
  oriente: ['Rionegro', 'Llanogrande', 'El Retiro'],
};

export const FAQ = [
  {
    q: '¿Cuánto cuesta remodelar un apartamento en Medellín?',
    a: 'Una remodelación integral está entre $850.000 y $1.800.000 por m², según el nivel de acabado. Un baño completo está entre $6.000.000 y $12.000.000, y una cocina parte de $6.800.000. El valor final depende del estado del inmueble y de los materiales que elijas, y sale de la evaluación técnica.',
  },
  {
    q: '¿Hacen trabajos puntuales o solo remodelaciones completas?',
    a: 'Las dos cosas. Puedes contratar solo la pintura de una fachada, el enchape de un baño o un cielo raso, o la remodelación completa con un solo contrato.',
  },
  {
    q: '¿Cómo se paga una obra con Arkava?',
    a: 'Por etapas, según el avance real de la obra y con contrato firmado. Si lo necesitas, gestionamos una póliza de cumplimiento con una aseguradora certificada.',
  },
  {
    q: '¿Cuánto tiempo toma una remodelación?',
    a: 'Depende del tamaño del espacio, el tipo de trabajo y los acabados. Antes de empezar se define un cronograma por etapas, así sabes qué pasa cada semana.',
  },
  {
    q: '¿Ofrecen diseño antes de la obra?',
    a: 'Sí. El equipo de diseño arquitectónico y de interiores define distribución, materiales e iluminación. La asesoría tiene un costo adicional que se descuenta del valor del proyecto si continúas con la ejecución.',
  },
  {
    q: '¿Trabajan en locales comerciales y hoteles?',
    a: 'Sí. Además de apartamentos y casas, hemos hecho obras en locales, oficinas y hoteles como Hunters, Heiss, Nakua y Calle Flora, con horarios pactados para no frenar la operación.',
  },
  {
    q: '¿En qué zonas trabajan?',
    a: 'En Medellín y el Valle de Aburrá (Envigado, Sabaneta, Itagüí, La Estrella, Bello) y en el Oriente cercano: Rionegro, Llanogrande y El Retiro.',
  },
];
