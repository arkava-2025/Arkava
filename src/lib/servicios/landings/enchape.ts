import type { Landing } from './tipos';

export const ENCHAPE: Landing = {
  slug: 'enchape',
  nombre: 'Enchape',
  serviceType: 'Instalación de enchapes y porcelanato',
  seoTitle: 'Instalación de enchapes y porcelanato en Medellín | Arkava',
  seoDescription: 'Instalación de enchape y porcelanato en Medellín desde $80.000/m². Simula formato y material en un piso real y calcula cuántas cajas comprar.',
  kicker: 'Enchape · Medellín y Valle de Aburrá',
  h1: 'Instalación de enchapes y porcelanato en Medellín',
  lead: 'Cambia formato, patrón y material sobre un piso real, y calcula cuántas piezas y cajas necesitas para tus medidas.',
  datos: [
    { label: 'Instalado', value: 'Desde $80.000/m²' },
    { label: 'Formatos', value: 'Hasta gran formato' },
    { label: 'Zonas', value: 'Baños, cocinas, pisos, fachadas' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  priceFrom: 80000,
  ogFoto: 'enchape-2',
  bloques: [
    {
      id: 'base',
      kicker: 'La base',
      titulo: 'El enchape dura lo que dure la superficie que tiene debajo',
      parrafos: [
        'Una pieza que suena hueca, una ceja entre dos baldosas o un enchape que se levanta casi siempre tienen la misma causa: la base no estaba plana, no estaba limpia o el pegante no era el adecuado. Por eso revisamos planitud y humedad antes de hablar de diseño.',
        'En baños y duchas se impermeabiliza antes de enchapar, con especial cuidado en encuentros y sifones. Esa capa nadie la vuelve a ver, y es la que evita una gotera en el apartamento de abajo.',
      ],
    },
    {
      id: 'formatos',
      kicker: 'Formatos',
      titulo: 'Qué formato de porcelanato elegir',
      parrafos: [
        'El tamaño cambia la lectura del espacio y también la técnica de instalación. Las piezas grandes dejan menos juntas y hacen ver el espacio más amplio, pero exigen una base casi perfecta. En formatos de 30 × 30 cm o más, fabricantes como EMO piden aplicar pegante también en el reverso de la pieza, lo que se conoce como doble encolado.',
      ],
      tabla: {
        caption: 'Comparación de formatos de porcelanato y dónde conviene cada uno',
        columnas: ['Formato', 'Dónde funciona', 'Qué exige'],
        filas: [
          ['30 × 60', 'Baños y muros', 'Trabado a la mitad sin problema. Es el más sencillo de instalar.'],
          ['60 × 60', 'Apartamentos completos', 'Base plana y juntas alineadas. Buen equilibrio entre resultado y costo.'],
          ['60 × 120', 'Salas y locales', 'Doble encolado, niveladores y un trabado cercano al 10 %.'],
          ['20 × 120 tipo tablón', 'Alcobas y salas', 'Trabado a un tercio. Da lectura de madera con la dureza del porcelanato.'],
          ['Espiga', 'Salas y corredores', 'Muchos cortes y mano de obra especializada.'],
        ],
      },
    },
    {
      id: 'cantidades',
      kicker: 'Cantidades',
      titulo: 'Cuánto material comprar para un enchape',
      parrafos: [
        'El área del plano nunca es lo que se compra. Hay que sumar cortes, piezas de reserva y el material que se daña en obra. Como referencia trabajamos con 10 % en patrones rectos, 12 % en trabados y 15 a 18 % en espigas o espacios con muchos quiebres.',
        'En baños el error es mayor, porque la gente suma solo el piso. Un baño de 4 m² puede tener más de 20 m² de enchape entre muros y piso. Conviene comprar todo del mismo lote: entre lotes distintos el tono cambia, y solo se nota cuando ya está pegado.',
      ],
      lista: [
        { titulo: 'Despiece', texto: 'Definimos dónde cae cada corte antes de pegar, para que las piezas pequeñas queden en los rincones menos visibles.' },
        { titulo: 'Junta', texto: 'Las piezas rectificadas admiten juntas cercanas a 2 mm. Pegarlas a tope no es buena práctica: el material necesita dilatar.' },
      ],
    },
  ],
  precios: {
    titulo: 'Cuánto cuesta enchapar en Medellín',
    caption: 'Precios de referencia de enchape instalado en Medellín',
    columnas: ['Material', 'Rango instalado por m²', 'Uso típico'],
    filas: [
      ['Cerámica', '$80.000 a $130.000', 'Zonas secundarias y arriendos'],
      ['Porcelanato nacional', '$120.000 a $190.000', 'Salas, cocinas y baños'],
      ['Porcelanato rectificado o gran formato', '$200.000 a $280.000', 'Áreas sociales con continuidad'],
      ['Importado o piezas especiales', '$280.000 a $350.000 o más', 'Proyectos de alta gama'],
    ],
    nota: 'Material e instalación. La demolición del enchape anterior y la impermeabilización se cotizan según el estado del espacio.',
  },
  proceso: {
    titulo: 'Cómo instalamos un enchape',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Medimos, revisamos planitud y humedad, y definimos si hay que demoler o nivelar.' },
      { titulo: 'Despiece y presupuesto', texto: 'Plano de colocación, cantidades reales y presupuesto por partidas.' },
      { titulo: 'Preparación', texto: 'Nivelación e impermeabilización en zonas húmedas.' },
      { titulo: 'Instalación', texto: 'Pegante según el formato, doble encolado en piezas grandes y niveladores.' },
      { titulo: 'Boquilla y entrega', texto: 'Emboquillado, sellos en encuentros, limpieza final y garantía por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'enchape-2', alt: 'Lobby de hotel con piso en mosaico de formato pequeño, recepción en piedra y muro con listones', caption: 'Lobby de hotel con piso en mosaico.' },
    { archivo: 'enchape-1', alt: 'Habitación con piso de tablón tipo madera entregada por Arkava', caption: 'Piso tipo tablón con zócalo a ras de muro.' },
  ],
  proyectos: [
    { nombre: 'Proyecto Vesubio', detalle: 'Remodelación integral', href: '/proyectos/remodelacion-apartamento-medellin-proyecto-vesubio/' },
  ],
  faq: [
    { q: '¿Cuánto cuesta enchapar por metro cuadrado en Medellín?', a: 'Instalado, con material y mano de obra, está entre $80.000 por m² en cerámica y $350.000 o más en porcelanato importado. El porcelanato nacional, que es lo más usado en apartamentos, va de $120.000 a $190.000 por m².' },
    { q: '¿Cuánto cuesta enchapar un baño?', a: 'Un baño de 3 a 5 m² de planta requiere entre 18 y 35 m² de enchape contando muros y piso. Solo en material e instalación del revestimiento suele quedar entre $2.500.000 y $8.000.000.' },
    { q: '¿Se puede enchapar sobre un piso existente?', a: 'Sí, si el piso anterior está firme, plano y sin piezas huecas, y si la altura ganada no afecta puertas ni desniveles. Se usa un pegante apto para esa superficie. En zonas húmedas casi siempre es mejor demoler.' },
    { q: '¿Qué es el doble encolado?', a: 'Es aplicar pegante en el piso y también en el reverso de la pieza. Evita vacíos debajo de la baldosa, que es lo que después produce piezas huecas o quebradas. Es indispensable en formatos grandes.' },
    { q: '¿Cuánto material debo comprar de más?', a: 'Entre 10 y 12 % en patrones rectos o trabados, y de 15 a 18 % en espiga o espacios con muchos quiebres. Es mejor comprar todo del mismo lote para que el tono no cambie.' },
    { q: '¿Cuánto debe medir la junta del porcelanato?', a: 'Las piezas rectificadas se instalan con juntas cercanas a 2 mm, y las no rectificadas con juntas algo mayores. La medida exacta la da la ficha del fabricante.' },
  ],
  relacionados: [
    { titulo: 'Argamasa y nivelación de muros', href: '/servicios/argamasa/' },
    { titulo: 'Microcemento y muros decorativos', href: '/servicios/muros-decorativos/' },
    { titulo: 'Todos los servicios de remodelación', href: '/servicios/' },
  ],
  blog: [
    { titulo: 'Cuánto cuesta enchapar en Medellín', href: '/blog/cuanto-cuesta-enchape-medellin/' },
    { titulo: 'Cuánto cuesta remodelar un baño en Medellín', href: '/blog/cuanto-cuesta-remodelar-bano-medellin/' },
  ],
  waTexto: 'Hola Arkava, quiero cotizar la instalación de un enchape',
};
