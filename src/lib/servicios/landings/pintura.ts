import type { Landing } from './tipos';

export const PINTURA: Landing = {
  slug: 'pintura',
  nombre: 'Pintura',
  serviceType: 'Pintura de interiores y fachadas',
  seoTitle: 'Pintura de apartamentos y fachadas en Medellín | Arkava',
  seoDescription: 'Pintura de apartamentos, casas y fachadas en Medellín desde $18.000/m². Prueba colores 2027 sobre un muro real. Resanes, contrato y garantía escrita.',
  kicker: 'Pintura · Medellín y Valle de Aburrá',
  h1: 'Pintura de apartamentos, casas y fachadas en Medellín',
  lead: 'Prueba el color antes de comprar el primer galón. Después nos encargamos de lo que no sale en la foto: resanar, lijar, sellar y dejar el espacio limpio.',
  datos: [
    { label: 'Interiores', value: 'Desde $18.000/m²' },
    { label: 'Manos de pintura', value: 'Dos sobre muro sellado' },
    { label: 'Cobertura', value: 'Valle de Aburrá y Oriente' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  priceFrom: 18000,
  ogFoto: 'pintura-3',
  bloques: [
    {
      id: 'preparacion',
      kicker: 'Preparación',
      titulo: 'Un muro bien pintado se decide antes de abrir el galón',
      parrafos: [
        'Casi todos los problemas de pintura que nos llaman a corregir vienen de la preparación. Fisuras que se taparon sin abrirlas, manchas de humedad pintadas encima, muros sin sellar que absorben parejo en un lado y disparejo en el otro. La pintura solo muestra lo que había debajo.',
        'Por eso empezamos con una revisión del muro. Abrimos y resanamos las fisuras, corregimos el estuco donde haga falta, lijamos y aplicamos sellador. Si encontramos humedad, primero se resuelve la causa: pintar encima solo aplaza el problema unos meses.',
      ],
      lista: [
        { titulo: 'Protección del espacio', texto: 'Cubrimos pisos, carpintería y muebles. Enmascaramos guardaescobas, marcos y tomas antes de pintar.' },
        { titulo: 'Resanes', texto: 'Las fisuras se abren, se rellenan y se lijan a ras. Si solo se tapan, reaparecen con los primeros cambios de temperatura.' },
        { titulo: 'Sellador', texto: 'Iguala la absorción del muro. Sin él, la pintura queda con parches de brillo que se notan con luz lateral.' },
        { titulo: 'Entrega', texto: 'Retiramos el enmascarado, revisamos con luz y dejamos el espacio limpio.' },
      ],
    },
    {
      id: 'tipos',
      kicker: 'Tipos de pintura',
      titulo: 'Qué pintura usar en cada superficie',
      parrafos: [
        'En Colombia, las pinturas al agua para arquitectura se clasifican por la norma NTC 1335 en tipo 1, 2 y 3. La diferencia práctica está en cuánto aguantan la limpieza. En un apartamento que se va a habitar conviene tipo 1 en zonas de uso diario, porque se puede lavar sin que el muro pierda color.',
      ],
      tabla: {
        caption: 'Tipos de pintura recomendados según la superficie',
        columnas: ['Pintura', 'Dónde va', 'Por qué'],
        filas: [
          ['Vinilo tipo 1', 'Salas, alcobas, corredores', 'Lavable y de buen cubrimiento. Es nuestra base para vivienda.'],
          ['Vinilo tipo 2', 'Cielos y zonas de poco contacto', 'Cumple bien donde el muro casi no se toca.'],
          ['Acrílica para fachada', 'Exteriores', 'Resiste sol y lluvia, y deja respirar el muro.'],
          ['Esmalte', 'Puertas, marcos y metal', 'Película dura que aguanta golpes y limpieza.'],
          ['Epóxica o poliuretano', 'Pisos y zonas de alto tráfico', 'Resistencia química y a la abrasión, para parqueaderos y bodegas.'],
        ],
      },
    },
    {
      id: 'color',
      kicker: 'Elegir el color',
      titulo: 'Cómo elegir el color de un muro sin arrepentirse',
      parrafos: [
        'El mismo color cambia según la luz que recibe. Un muro orientado al oriente se ve frío en la tarde, y bajo una cinta LED cálida casi cualquier gris se vuelve beige. Por eso la pantalla sirve para decidir la dirección, y la decisión final se toma con una muestra de al menos un metro cuadrado, vista a varias horas.',
        'Para 2027 las marcas se fueron hacia los verdes y los tonos de tierra. Sherwin-Williams eligió Celery, Dulux eligió Soulful Sage y Behr eligió Grounded. Son colores que combinan bien con madera y con la vegetación que entra por las ventanas en Medellín. Si dudas, deja el color fuerte para un solo muro y mantén el resto en un neutro cálido.',
      ],
    },
    {
      id: 'fachadas',
      kicker: 'Fachadas y edificios',
      titulo: 'Pintura de fachadas en Medellín',
      parrafos: [
        'Una fachada exige más planeación que un interior. Hay trabajo en altura, se depende del clima y casi siempre hay que coordinar con la administración del edificio. Antes de pintar se hace limpieza, se reparan fisuras y se revisan los puntos por donde entra el agua, como remates y antepechos.',
        'En conjuntos y edificios acordamos con la administración los horarios, las zonas de acceso y la protección de vehículos y jardines. El cronograma se arma contando con las temporadas de lluvia del Valle de Aburrá.',
      ],
    },
  ],
  precios: {
    titulo: 'Cuánto cuesta pintar en Medellín',
    caption: 'Precios de referencia de pintura en Medellín, con mano de obra',
    columnas: ['Trabajo', 'Rango de referencia', 'Qué lo hace variar'],
    filas: [
      ['Pintura de interiores', '$18.000 a $35.000 por m²', 'Estado del muro, número de manos, cambio de color'],
      ['Estuco y pintura de muros', '$25.000 a $60.000 por m²', 'Cuánto hay que corregir antes de pintar'],
      ['Fachadas', 'Según altura y acceso', 'Andamio, reparaciones y altura del edificio'],
      ['Pisos epóxicos', 'Según sistema y área', 'Preparación del concreto y espesor del sistema'],
    ],
    nota: 'Valores en pesos colombianos, con mano de obra. Cada proyecto se cotiza después de la evaluación técnica, porque el estado del muro cambia el trabajo.',
  },
  proceso: {
    titulo: 'Cómo pintamos un espacio',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Medimos, revisamos fisuras y humedad, y definimos con cuántas manos y qué producto se trabaja.' },
      { titulo: 'Color y presupuesto', texto: 'Probamos muestras en tu muro y entregamos un presupuesto por partidas.' },
      { titulo: 'Preparación', texto: 'Protección del espacio, resanes, lijado y sellador.' },
      { titulo: 'Aplicación', texto: 'Dos manos con el tiempo de secado que indica el fabricante, y recortes a pulso en los encuentros.' },
      { titulo: 'Entrega', texto: 'Revisión con luz, retoques y limpieza. La garantía queda por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'pintura-3', alt: 'Pintor de Arkava aplicando color con rodillo sobre un muro en Medellín', caption: 'Muro de acento en obra, con el borde recortado a pulso.' },
    { archivo: 'pintura-1', alt: 'Atrio con muros curvos oscuros, vegetación y luz perimetral', caption: 'Muros curvos con luz perimetral.' },
    { archivo: 'pintura-2', alt: 'Fachada de edificio en Medellín con andamio durante trabajos de pintura por colores', caption: 'Fachada de edificio con andamio, pintada por sectores.' },
  ],
  proyectos: [
    { nombre: 'Hotel Nakua', detalle: 'Estuco y pintura', href: '/proyectos/hotel-nakua/' },
    { nombre: 'Hunters Hotel', detalle: 'Estuco y pintura', href: '/proyectos/hunters-hotel/' },
    { nombre: 'Hashtag 98', detalle: 'Pintura y fachada', href: '/proyectos/hashtag-98/' },
  ],
  faq: [
    { q: '¿Cuánto cuesta pintar un apartamento en Medellín?', a: 'La pintura de interiores está entre $18.000 y $35.000 por m² de muro, con mano de obra. Un apartamento de 60 m² de planta suele tener cerca de 170 m² entre muros y cielos, así que el trabajo queda alrededor de $3.000.000 a $6.000.000. El valor final depende del estado de los muros y de si cambias de un color oscuro a uno claro.' },
    { q: '¿Cuántas manos de pintura necesita un muro?', a: 'Dos manos sobre un muro sellado es lo habitual. Si pasas de un color oscuro a uno claro, o usas un tono muy saturado, puede hacer falta una tercera.' },
    { q: '¿Cuánto rinde un cuñete de pintura?', a: 'Un cuñete de 5 galones de vinilo tipo 1 rinde cerca de 100 m² a dos manos sobre muro sellado. En muros porosos o sin sellar el rendimiento baja.' },
    { q: '¿Se puede pintar sobre pintura vieja?', a: 'Sí, si la pintura anterior está firme. Se lava, se lija y se resana. Si está soplada o se desprende, hay que retirarla, porque la nueva capa se caería con ella.' },
    { q: '¿Cuánto se demora pintar un apartamento?', a: 'Un apartamento desocupado de 60 m² suele tomar entre cuatro y siete días, según los resanes. Con el apartamento habitado se trabaja por zonas y tarda más. El cronograma queda definido antes de empezar.' },
    { q: '¿Qué hacen si el muro tiene humedad?', a: 'Primero se busca de dónde viene el agua y se corrige. Pintar encima no resuelve nada: la mancha vuelve a salir. Cuando el muro está seco se resana, se sella y se pinta.' },
    { q: '¿Qué tipo de pintura es mejor para interiores?', a: 'Para zonas de uso diario recomendamos vinilo tipo 1, que soporta la limpieza. En cielos, donde casi no hay contacto, un tipo 2 funciona bien. En baños y cocinas conviene una pintura antihongos.' },
  ],
  relacionados: [
    { titulo: 'Estuco para muros en Medellín', href: '/servicios/estuco/' },
    { titulo: 'Argamasa y revoque', href: '/servicios/argamasa/' },
    { titulo: 'Microcemento y muros decorativos', href: '/servicios/muros-decorativos/' },
  ],
  blog: [
    { titulo: 'Microcemento o pintura: cuál conviene en tus paredes', href: '/blog/microcemento-vs-pintura-paredes/' },
    { titulo: 'Guía para remodelar un apartamento en Medellín', href: '/blog/guia-remodelacion-apartamentos-medellin/' },
  ],
  waTexto: 'Hola Arkava, quiero cotizar pintura para mi espacio',
};
