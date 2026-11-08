import type { Landing } from './tipos';

export const MUROS_DECORATIVOS: Landing = {
  slug: 'muros-decorativos',
  nombre: 'Muros decorativos',
  serviceType: 'Microcemento y acabados decorativos',
  seoTitle: 'Microcemento y muros decorativos en Medellín | Arkava',
  seoDescription: 'Microcemento en Medellín desde $95.000/m², estuco veneciano y relieves artesanales para muros y pisos. Aplicado a mano, con obras reales y garantía.',
  kicker: 'Muros decorativos · Medellín y Valle de Aburrá',
  h1: 'Microcemento y muros decorativos en Medellín',
  lead: 'Acabados aplicados a mano, capa por capa, para el muro que se ve desde la entrada. Ninguno queda igual a otro.',
  datos: [
    { label: 'Microcemento', value: '$95.000 a $140.000/m²' },
    { label: 'Espesor', value: '2 a 3 mm' },
    { label: 'Aplicación', value: 'Muros y pisos' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  priceFrom: 95000,
  ogFoto: 'decorativos-1',
  bloques: [
    {
      id: 'microcemento',
      kicker: 'Microcemento',
      titulo: 'Qué es el microcemento y dónde funciona',
      parrafos: [
        'El microcemento es un revestimiento continuo de 2 a 3 mm de espesor. Como es tan delgado, se aplica sobre muros, pisos o enchapes existentes sin demoler y casi sin ganar altura, lo que lo hace muy útil en remodelación. Las fichas técnicas lo describen como un material de acabado: no nivela. Si la base tiene desniveles, hay que corregirlos antes.',
        'En baños y duchas funciona bien con un buen sellado y una base impermeabilizada. Es un acabado artesanal, y eso implica aceptar variaciones de tono, parte de su carácter.',
      ],
    },
    {
      id: 'comparacion',
      kicker: 'Comparación',
      titulo: 'Microcemento, veneciano o porcelanato líquido',
      parrafos: ['Cada acabado responde a una necesidad distinta. Esta tabla resume en qué se diferencian en obra.'],
      tabla: {
        caption: 'Comparación de acabados decorativos para muros y pisos',
        columnas: ['Acabado', 'Aspecto', 'Dónde va', 'A tener en cuenta'],
        filas: [
          ['Microcemento', 'Mineral y continuo', 'Muros, pisos y baños', 'Necesita base firme y sellado'],
          ['Estuco veneciano', 'Pulido, con profundidad', 'Muros interiores', 'Mano de obra muy especializada'],
          ['Porcelanato líquido', 'Brillante, tipo espejo', 'Pisos y encimeras', 'Muestra rayones en alto tráfico'],
          ['Relieve artesanal', 'Textura modelada', 'Muros de acento', 'Se define junto con la luz'],
          ['Imitación piedra', 'Rugoso y natural', 'Interior y exterior', 'Pesa menos que la piedra real'],
        ],
      },
    },
    {
      id: 'mantenimiento',
      kicker: 'Cuidado',
      titulo: 'Cómo se mantiene un muro decorativo',
      parrafos: [
        'La mayoría de estos acabados se limpia con agua y un jabón neutro. Los productos ácidos o abrasivos dañan el sellador, y es el sellador lo que protege la superficie. En pisos de mucho tráfico conviene renovar la capa de protección cada cierto tiempo, según el uso.',
        'Una fisura puntual se puede reparar, aunque el parche rara vez queda invisible porque el acabado es artesanal. Por eso tratamos los encuentros y los cambios de material desde el principio.',
      ],
    },
    {
      id: 'donde',
      kicker: 'Dónde usarlos',
      titulo: 'En qué espacios funciona un muro decorativo',
      parrafos: [
        'Funcionan mejor cuando hay un solo protagonista. Un muro de entrada, la cabecera de una alcoba o la recepción de un hotel soportan una textura fuerte. Si todo el espacio lleva relieve, ninguno se destaca y el conjunto se vuelve pesado.',
        'La luz cambia el resultado tanto como el material. Un aplique cerca del muro acentúa el relieve, y una iluminación frontal lo aplana. Por eso conviene definir la luz antes de elegir el acabado y revisar la muestra con esa misma iluminación.',
        'Evita los relieves profundos en corredores estrechos, donde se roza con la ropa y los muebles, y en zonas donde el muro se limpie a diario.',
      ],
    },
  ],
  precios: {
    titulo: 'Cuánto cuesta un muro decorativo en Medellín',
    caption: 'Precios de referencia de muros decorativos en Medellín',
    columnas: ['Acabado', 'Rango de referencia', 'Qué lo hace variar'],
    filas: [
      ['Microcemento', '$95.000 a $140.000 por m²', 'Estado de la base y número de capas'],
      ['Estuco veneciano', 'Según diseño', 'Pulido y número de capas'],
      ['Relieves y texturas', 'Según diseño', 'Complejidad del dibujo'],
    ],
    nota: 'Valores con mano de obra. El precio sube cuando la base requiere reparación previa.',
  },
  proceso: {
    titulo: 'Cómo aplicamos un acabado decorativo',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Revisamos la base, la humedad y la luz que recibe el muro.' },
      { titulo: 'Muestras y presupuesto', texto: 'Preparamos muestras del acabado para aprobar tono y textura antes de empezar.' },
      { titulo: 'Preparación', texto: 'Reparación, nivelación e imprimación de la superficie.' },
      { titulo: 'Aplicación', texto: 'Capas a mano con los tiempos de secado de cada producto.' },
      { titulo: 'Sellado y entrega', texto: 'Protección final, recomendaciones de cuidado y garantía por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'decorativos-2', alt: 'Muro decorativo con relieve artesanal en forma de mandala y discos de color', caption: 'Relieve artesanal con plantilla.' },
    { archivo: 'decorativos-1', alt: 'Muro en microcemento gris iluminado con apliques', caption: 'Microcemento bajo apliques de luz.' },
    { archivo: 'decorativos-3', alt: 'Detalle de textura metalizada en tonos bronce', caption: 'Detalle de acabado metalizado.' },
  ],
  proyectos: [],
  faq: [
    { q: '¿Cuánto cuesta el microcemento por metro cuadrado en Medellín?', a: 'Está entre $95.000 y $140.000 por m², con mano de obra. El valor sube si la base necesita reparación o si la superficie tiene muchos encuentros.' },
    { q: '¿Se puede aplicar microcemento sobre cerámica?', a: 'Sí, si el enchape está firme. Se limpia, se imprima y se tratan las juntas para que no se marquen. Las piezas huecas hay que retirarlas primero.' },
    { q: '¿El microcemento sirve para baños y duchas?', a: 'Sí, con impermeabilización de la base y un sellador adecuado. En la ducha se cuida especialmente el encuentro con sifones y griferías.' },
    { q: '¿El microcemento se fisura?', a: 'Puede fisurarse si la base se mueve o si se aplica con más espesor del recomendado. Con base estable, malla en los puntos críticos y buen sellado el riesgo baja mucho.' },
    { q: '¿Qué diferencia hay entre microcemento y cemento pulido?', a: 'El microcemento se aplica en capas de 2 a 3 mm sobre una superficie existente y no necesita juntas de dilatación a la vista. El cemento pulido es una placa gruesa, mucho más pesada, que sí lleva juntas.' },
    { q: '¿Qué muro conviene decorar en un apartamento?', a: 'El que se ve primero al entrar o el que enmarca una zona, como la cabecera de una alcoba. Conviene elegir un solo muro por ambiente y definir su iluminación antes de escoger la textura.' },
    { q: '¿Cómo se limpia un muro de microcemento?', a: 'Con agua y jabón neutro, usando un paño suave. Evita productos ácidos o abrasivos, porque dañan el sellador.' },
  ],
  relacionados: [
    { titulo: 'Estuco para muros', href: '/servicios/estuco/' },
    { titulo: 'Pintura de interiores', href: '/servicios/pintura/' },
    { titulo: 'Instalación de enchapes', href: '/servicios/enchape/' },
  ],
  blog: [{ titulo: 'Microcemento o pintura: cuál conviene en tus paredes', href: '/blog/microcemento-vs-pintura-paredes/' }],
  waTexto: 'Hola Arkava, quiero cotizar un muro decorativo o microcemento',
};
