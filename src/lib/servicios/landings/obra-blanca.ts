import type { Landing } from './tipos';

export const OBRA_BLANCA: Landing = {
  slug: 'obra-blanca',
  nombre: 'Obra blanca',
  serviceType: 'Obra blanca y acabados para inmuebles en obra gris',
  seoTitle: 'Obra blanca en Medellín para apartamentos | Arkava',
  seoDescription: 'Obra blanca en Medellín para apartamentos y casas en obra gris: revoque, estuco, pintura, cielos, enchapes y carpintería, con presupuesto por partidas.',
  kicker: 'Obra blanca · Medellín y Valle de Aburrá',
  h1: 'Obra blanca en Medellín para apartamentos y casas',
  lead: 'Recibiste el inmueble en obra gris y falta todo lo que lo vuelve habitable. Nos encargamos de los acabados en el orden correcto y con un solo responsable.',
  datos: [
    { label: 'Punto de partida', value: 'Obra gris o negra' },
    { label: 'Alcance', value: 'Muros, cielos, pisos y baños' },
    { label: 'Presupuesto', value: 'Por partidas y etapas' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  ogFoto: 'cielo-3',
  bloques: [
    {
      id: 'que-es',
      kicker: 'Qué es',
      titulo: 'Obra negra, obra gris y obra blanca: qué trae cada una',
      parrafos: [
        'La obra blanca es la etapa de acabados que deja un inmueble listo para habitar. Empieza donde termina la obra gris y llega hasta la pintura final, con pisos, baños y cielos resueltos.',
        'Estos nombres no tienen una definición única. Cada constructora los usa a su manera, y hay apartamentos que se entregan en obra gris con el baño terminado. Antes de pedir un presupuesto, conviene leer el anexo de acabados del contrato de compra y ver qué entrega exactamente.',
      ],
      tabla: {
        caption: 'Qué incluye normalmente cada tipo de entrega de un inmueble',
        columnas: ['Entrega', 'Lo que suele traer', 'Lo que falta'],
        filas: [
          ['Obra negra', 'Estructura y muros en bloque o ladrillo', 'Revoque, redes terminadas y todos los acabados'],
          ['Obra gris', 'Estructura, redes de agua, gas y energía, puerta principal y ventanas', 'Estuco, pintura, pisos, enchapes, cielos, carpintería y aparatos'],
          ['Obra blanca', 'Acabados terminados: muros, pisos, baños y cielos', 'Mobiliario y decoración'],
        ],
      },
    },
    {
      id: 'incluye',
      kicker: 'Qué incluye',
      titulo: 'Qué incluye una obra blanca con Arkava',
      parrafos: [
        'El alcance se define con el inmueble por delante, porque no todos llegan en el mismo estado. Estos son los trabajos que suele reunir un proyecto completo. Puedes contratarlos todos o solo los que te faltan.',
      ],
      lista: [
        { titulo: 'Nivelación de muros', texto: 'Revoque y argamasa donde el muro está torcido o a la vista. De esa base depende cómo queda todo lo demás.' },
        { titulo: 'Cielos y divisiones', texto: 'Cielo raso en drywall o PVC, con los puntos de luz definidos antes de cerrar, y muros livianos si cambia la distribución.' },
        { titulo: 'Enchapes', texto: 'Baños, cocina y pisos, con impermeabilización previa en las zonas húmedas.' },
        { titulo: 'Estuco y pintura', texto: 'Muros planos, lijados y sellados, con la última mano al final para no marcarla durante la obra.' },
        { titulo: 'Carpintería de obra', texto: 'Puertas, marcos y mobiliario fijo, medidos cuando muros y pisos ya están listos.' },
        { titulo: 'Remates', texto: 'Aparatos sanitarios, grifería, tomas e iluminación, para entregar el espacio funcionando.' },
      ],
    },
    {
      id: 'orden',
      kicker: 'El orden importa',
      titulo: 'En qué orden se hacen los acabados',
      parrafos: [
        'Gran parte de los sobrecostos en una obra blanca viene de hacer las cosas en desorden: romper un enchape nuevo para mover un punto de agua, o manchar una pintura terminada al instalar el cielo. Con un solo equipo coordinando, cada oficio entra cuando le corresponde.',
        'El orden habitual es revisar y corregir redes, nivelar muros, instalar cielos y divisiones, impermeabilizar y enchapar, estucar, dar la primera mano de pintura, montar carpintería y aparatos, y cerrar con la mano final y el aseo.',
      ],
    },
    {
      id: 'recibir',
      kicker: 'Antes de empezar',
      titulo: 'Qué revisar cuando te entregan el apartamento en obra gris',
      parrafos: [
        'Lo que no se reclama en la entrega se vuelve un costo tuyo cuando los acabados ya lo taparon. Si es posible, haz esta revisión con alguien que conozca de obra y deja por escrito lo que encuentres.',
      ],
      lista: [
        { titulo: 'Redes', texto: 'Pide pruebas de agua y gas, y confirma que cada punto eléctrico y sanitario corresponde al plano.' },
        { titulo: 'Humedad y filtraciones', texto: 'Revisa muros de fachada, ventanas y el cielo de los baños. Una mancha hoy es un acabado dañado mañana.' },
        { titulo: 'Plomo y nivel', texto: 'Muros y placas muy desnivelados suman revoque y material al presupuesto.' },
        { titulo: 'Reglamento del edificio', texto: 'Consulta horarios de obra, uso del ascensor, manejo de escombros y permisos ante la administración.' },
      ],
    },
  ],
  precios: {
    titulo: 'Cuánto cuesta una obra blanca en Medellín',
    caption: 'Precios de referencia de las partidas de una obra blanca en Medellín',
    columnas: ['Partida', 'Rango de referencia', 'De qué depende'],
    filas: [
      ['Estuco y pintura de muros', '$25.000 a $60.000 por m²', 'Estado del muro y número de manos'],
      ['Enchape instalado', '$80.000 a $350.000 por m²', 'Material y formato de la pieza'],
      ['Cielo raso en drywall', '$70.000 a $95.000 por m²', 'Niveles y dilataciones para luz'],
      ['Pintura de interiores', '$18.000 a $35.000 por m²', 'Cuando el estuco ya existe'],
    ],
    nota: 'Valores con mano de obra. Un total por m² de planta sirve poco, porque un apartamento tiene varias veces su área en muros, y baños y cocina pesan mucho más que una alcoba. El valor de cada proyecto sale de las cantidades reales, después de la evaluación técnica.',
  },
  proceso: {
    titulo: 'Cómo trabajamos una obra blanca',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Revisamos cómo llegó el inmueble, medimos y confirmamos el estado de las redes.' },
      { titulo: 'Planeación y presupuesto', texto: 'Definimos acabados y entregamos un presupuesto por partidas, con paquetes según el nivel que busques.' },
      { titulo: 'Ejecución', texto: 'Un equipo coordina todos los oficios con un cronograma acordado desde el inicio.' },
      { titulo: 'Supervisión y control', texto: 'Revisamos calidad y avance al cierre de cada etapa, y los pagos siguen ese avance.' },
      { titulo: 'Entrega final', texto: 'Recorrido contigo, ajustes pendientes, aseo y garantía por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'cielo-3', alt: 'Cielo raso en drywall en plena obra blanca, con placas masilladas y muros aún en bloque', caption: 'Cielo raso en instalación, con los muros todavía en bloque.' },
    { archivo: 'drywall-1', alt: 'Espacio interior en obra con muros en placa antes del masillado', caption: 'Divisiones levantadas antes del masillado.' },
    { archivo: 'estuco-2', alt: 'Oficiales de Arkava aplicando estuco sobre un muro largo', caption: 'Estuco sobre muro revocado.' },
    { archivo: 'enchape-1', alt: 'Habitación terminada por Arkava con piso tipo madera y zócalo blanco', caption: 'Habitación entregada, lista para habitar.' },
  ],
  proyectos: [
    { nombre: 'Loma del Bosque', detalle: 'Apartamento en obra negra · Envigado', href: '/proyectos/loma-del-bosque/' },
  ],
  faq: [
    { q: '¿Qué es la obra blanca?', a: 'Es la etapa de acabados que deja un inmueble listo para habitar: estuco, pintura, pisos, enchapes, cielos, carpintería y aparatos. Empieza cuando termina la obra gris.' },
    { q: '¿Qué diferencia hay entre obra gris y obra blanca?', a: 'La obra gris entrega estructura, redes, ventanas y puerta principal, pero sin acabados. La obra blanca agrega todo lo que se ve y se usa a diario. El alcance exacto depende del anexo de acabados de cada constructora.' },
    { q: '¿Cuánto cuesta la obra blanca de un apartamento en Medellín?', a: 'Depende del área de muros, del número de baños y de los materiales. Como referencia, el estuco y la pintura están entre $25.000 y $60.000 por m², el enchape instalado entre $80.000 y $350.000 por m², y el cielo raso en drywall entre $70.000 y $95.000 por m². El valor final se calcula con las cantidades reales del inmueble.' },
    { q: '¿Se puede hacer la obra blanca por etapas?', a: 'Sí. Muchos propietarios empiezan por baños, cocina y pintura para poder mudarse, y dejan cielos o carpintería para después. Conviene planear todo desde el inicio para no romper lo que ya está terminado.' },
    { q: '¿Cuánto se demora la obra blanca de un apartamento?', a: 'Se mide en semanas y depende del área, los materiales y el estado en que llegó el inmueble. Antes de empezar se define un cronograma por etapas.' },
    { q: '¿Necesito permiso para hacer la obra blanca?', a: 'Los acabados interiores normalmente solo requieren avisar a la administración y cumplir el reglamento del edificio en horarios, ascensor y escombros. Si vas a modificar estructura o fachada, hay que revisar el trámite con un profesional antes de empezar.' },
    { q: '¿Trabajan apartamentos entregados en obra negra?', a: 'Sí. Hemos ejecutado acabados completos en apartamentos entregados en obra negra, como Loma del Bosque en Envigado, y trabajamos con tres tipos de paquete según las necesidades y el presupuesto.' },
  ],
  relacionados: [
    { titulo: 'Argamasa y revoque', href: '/servicios/argamasa/' },
    { titulo: 'Estuco para muros', href: '/servicios/estuco/' },
    { titulo: 'Instalación de enchapes', href: '/servicios/enchape/' },
    { titulo: 'Cielo raso en drywall y PVC', href: '/servicios/cielo-raso/' },
  ],
  blog: [
    { titulo: 'Guía para remodelar un apartamento en Medellín', href: '/blog/guia-remodelacion-apartamentos-medellin/' },
    { titulo: 'Cuánto cuesta enchapar en Medellín', href: '/blog/cuanto-cuesta-enchape-medellin/' },
  ],
  waTexto: 'Hola Arkava, quiero cotizar la obra blanca de mi inmueble',
};
