import type { Landing } from './tipos';

export const CARPINTERIA: Landing = {
  slug: 'carpinteria',
  nombre: 'Carpintería arquitectónica',
  serviceType: 'Carpintería arquitectónica a medida',
  seoTitle: 'Carpintería arquitectónica a medida en Medellín | Arkava',
  seoDescription: 'Carpintería arquitectónica en Medellín: puertas, revestimientos en madera, listones y mobiliario fijo para viviendas, locales y hoteles, medidos en obra.',
  kicker: 'Carpintería · Medellín y Valle de Aburrá',
  h1: 'Carpintería arquitectónica a medida en Medellín',
  lead: 'Puertas, revestimientos y mobiliario fijo que se planean con la obra, para que encajen con los muros, las redes y la luz.',
  datos: [
    { label: 'Piezas', value: 'Puertas, revestimientos y fijos' },
    { label: 'Medición', value: 'En obra, con muros listos' },
    { label: 'Proyectos', value: 'Vivienda, locales y hoteles' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  ogFoto: 'carpinteria-2',
  bloques: [
    {
      id: 'obra',
      kicker: 'Dentro de la obra',
      titulo: 'Por qué la carpintería se planea antes de estucar',
      parrafos: [
        'La mayoría de los problemas de una pieza a medida vienen de medir tarde o de medir sobre un muro que aún no está terminado. Un revestimiento en listones necesita saber dónde quedan las tomas. Una puerta depende del nivel del piso final. Un mueble flotante exige un refuerzo dentro del muro.',
        'Como también hacemos el estuco, el drywall y el enchape, la carpintería entra en el cronograma desde el principio. Las medidas finales se toman con los muros y pisos terminados, y la pieza se fabrica para ese espacio.',
      ],
    },
    {
      id: 'materiales',
      kicker: 'Materiales',
      titulo: 'Madera maciza, MDF enchapado o tablero melamínico',
      parrafos: ['La elección depende de dónde va la pieza y cuánto uso va a tener.'],
      tabla: {
        caption: 'Materiales para carpintería arquitectónica y su uso recomendado',
        columnas: ['Material', 'Dónde va', 'A tener en cuenta'],
        filas: [
          ['Madera maciza', 'Puertas principales y piezas protagonistas', 'Mayor resistencia, y se mueve con la humedad'],
          ['MDF con chapa natural', 'Revestimientos y puertas interiores', 'Acabado uniforme con veta real'],
          ['Tablero melamínico RH', 'Baños y zonas con humedad', 'Requiere cantos sellados'],
          ['WPC', 'Exteriores y fachadas', 'Tolera la intemperie sin barniz'],
        ],
      },
    },
    {
      id: 'hoteles',
      kicker: 'Hoteles y locales',
      titulo: 'Carpintería para hoteles y locales comerciales',
      parrafos: [
        'En hotelería se repite la misma pieza decenas de veces, y una diferencia de milímetros se multiplica. Por eso se trabaja con una unidad modelo: se instala, se aprueba y a partir de ahí se produce el resto. En locales, el reto suele ser el horario, así que se fabrica en taller y se monta en jornadas acordadas.',
        'Arkava se concentra en la carpintería ligada a la obra. Para cocinas y clósets con diseño de mobiliario trabajamos de la mano con Comfort Design, empresa aliada especializada en esas piezas.',
      ],
    },
    {
      id: 'revisar',
      kicker: 'Antes de aprobar',
      titulo: 'Qué revisar en una cotización de carpintería a medida',
      parrafos: [
        'Dos cotizaciones por el mismo mueble pueden parecer iguales y no serlo. La diferencia suele estar en el material interno, los herrajes y en quién responde por la instalación. Pide que todo eso quede escrito antes de aprobar.',
      ],
      lista: [
        { titulo: 'Tablero y chapa', texto: 'Debe indicar el espesor, si resiste humedad y si la chapa es natural o impresa.' },
        { titulo: 'Herrajes', texto: 'Bisagras y correderas son lo primero que falla. Conviene saber la referencia y el peso que soportan.' },
        { titulo: 'Cantos', texto: 'Un canto sin sellar deja entrar humedad y el tablero se hincha, sobre todo en baños.' },
        { titulo: 'Instalación', texto: 'Confirma si incluye desmonte, ajuste en obra y la coordinación con electricidad.' },
      ],
    },
  ],
  proceso: {
    titulo: 'Cómo fabricamos una pieza a medida',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Revisamos el espacio y definimos con qué etapas de obra hay que coordinar.' },
      { titulo: 'Diseño y presupuesto', texto: 'Planos de taller, materiales, herrajes y presupuesto por partidas.' },
      { titulo: 'Medición final', texto: 'Con muros y pisos terminados, se toman las medidas definitivas.' },
      { titulo: 'Fabricación', texto: 'Corte, chapado y acabado en taller.' },
      { titulo: 'Instalación y entrega', texto: 'Montaje, ajuste en obra y garantía por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'carpinteria-2', alt: 'Muro con revestimiento de listones de madera, librería empotrada y mueble flotante, obra de Arkava', caption: 'Revestimiento en listones con librería empotrada.' },
    { archivo: 'carpinteria-3', alt: 'Baño con mueble en madera clara y espejo iluminado', caption: 'Mueble fijo para zona húmeda.' },
    { archivo: 'carpinteria-1', alt: 'Zona social con panel de listones de madera sobre una barra', caption: 'Panel de listones que separa ambientes.' },
  ],
  proyectos: [],
  faq: [
    { q: '¿Qué es la carpintería arquitectónica?', a: 'Son las piezas de madera ligadas a la construcción: puertas, marcos, revestimientos de muro y cielo, y mobiliario fijo. Se diseñan con el espacio y se fabrican a medida.' },
    { q: '¿Qué material es mejor para una puerta interior?', a: 'La madera maciza da más resistencia, y el MDF con chapa natural un acabado más uniforme y estable. Para puertas interiores de vivienda, el MDF enchapado suele dar muy buen resultado.' },
    { q: '¿Cuándo se debe medir la carpintería?', a: 'Las medidas finales se toman con los muros estucados y el piso instalado. Medir antes obliga a dejar holguras o a recortar en obra.' },
    { q: '¿Se pueden instalar listones de madera en un baño?', a: 'Sí, con material resistente a la humedad y acabado sellado, lejos del contacto directo con el agua. En la ducha conviene un material sintético.' },
    { q: '¿Hacen carpintería para hoteles?', a: 'Sí. Trabajamos con unidad modelo aprobada antes de producir en serie, y coordinamos el montaje con las demás etapas de obra.' },
    { q: '¿Cuánto se demora una pieza de carpintería a medida?', a: 'Depende del tamaño y del acabado. Lo que más alarga el proceso es esperar a que el espacio esté listo, porque las medidas finales se toman con muros y pisos terminados. El plazo queda definido en el cronograma de obra.' },
    { q: '¿Hacen cocinas y clósets?', a: 'Nuestro enfoque es la carpintería ligada a la obra. Para cocinas y clósets con diseño de mobiliario trabajamos con Comfort Design, empresa aliada.' },
  ],
  relacionados: [
    { titulo: 'Cocinas a medida con Comfort Design', href: 'https://comfortdesign.com.co/servicios/cocinas-a-medida/medellin' },
    { titulo: 'Muros en drywall', href: '/servicios/muros-drywall/' },
    { titulo: 'Cielo raso en madera y drywall', href: '/servicios/cielo-raso/' },
  ],
  blog: [{ titulo: 'Remodelación de cocina en Medellín: costos y materiales', href: '/blog/remodelacion-cocina-medellin-costos-materiales/' }],
  waTexto: 'Hola Arkava, quiero cotizar carpintería a medida',
};
