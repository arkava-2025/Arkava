import type { Landing } from './tipos';

export const MUROS_DRYWALL: Landing = {
  slug: 'muros-drywall',
  nombre: 'Muros en drywall',
  serviceType: 'Construcción de muros en drywall y superboard',
  seoTitle: 'Muros en drywall y superboard en Medellín | Arkava',
  seoDescription: 'Muros en drywall y superboard en Medellín, con aislamiento acústico o resistencia al fuego. Escucha cuánto ruido pasa según la composición del muro.',
  kicker: 'Muros en drywall · Medellín y Valle de Aburrá',
  h1: 'Muros en drywall y superboard en Medellín',
  lead: 'La duda de siempre es si se oye todo. Cambia la composición del muro y escucha la diferencia antes de decidir.',
  datos: [
    { label: 'Sistemas', value: 'Drywall, superboard y mixtos' },
    { label: 'Acústica', value: 'Rw de 39 a 52 dB en laboratorio' },
    { label: 'Usos', value: 'Vivienda, oficina y hotel' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  ogFoto: 'drywall-1',
  bloques: [
    {
      id: 'ruido',
      kicker: 'Aislamiento acústico',
      titulo: 'Un muro en drywall aísla tanto como se diseñe',
      parrafos: [
        'La mala fama del drywall viene de los muros de una sola placa y cámara vacía, que dejan pasar la voz alta. El sistema funciona de otra forma que el ladrillo: aísla con capas separadas y con material absorbente en la cámara, y por eso la composición lo cambia todo.',
        'Los ensayos de laboratorio del Consejo Nacional de Investigación de Canadá, con perfil de 90 mm, dan un Rw de 43 dB para una placa de 13 mm por cara con lana de vidrio, y de 52 dB con dos placas por cara. Con la misma placa, la lana agrega unos 7 dB. Las guías técnicas ubican un muro de ladrillo revocado entre 42 y 51 dB, y un ladrillo hueco delgado queda en la parte baja de ese rango. Cada 10 dB menos se perciben, a grandes rasgos, como la mitad de sonido.',
        'El número de laboratorio es un techo. En obra suele quedar entre 3 y 10 dB por debajo, porque el sonido encuentra otros caminos por las tomas eléctricas enfrentadas, las juntas sin sellar, las puertas y el encuentro con la losa. Un buen muro acústico se sella en todo su perímetro y sube hasta la losa, por encima del cielo raso.',
        'Con música rinde menos que con voz. El índice Rw pondera poco los graves, que son lo que más atraviesa un muro liviano: con bajos marcados, un muro de 52 dB se comporta cerca de 38 dB.',
      ],
    },
    {
      id: 'sistemas',
      kicker: 'Sistemas',
      titulo: 'Drywall, superboard y muros mixtos',
      parrafos: [
        'La placa de yeso es la indicada en interiores secos. Donde hay agua o intemperie se cambia por placa resistente a la humedad o por fibrocemento, que en Colombia se conoce como superboard.',
      ],
      tabla: {
        caption: 'Tipos de muro liviano y su uso recomendado',
        columnas: ['Sistema', 'Dónde va', 'Ventaja'],
        filas: [
          ['Drywall estándar', 'Divisiones interiores secas', 'Superficie lista para estuco y pintura'],
          ['Drywall RH', 'Baños y zonas húmedas', 'Tolera la humedad ambiente'],
          ['Drywall RF', 'Exigencias de fuego', 'Mayor resistencia al fuego por capa'],
          ['Superboard', 'Exteriores y zonas de agua', 'Resiste intemperie y golpes'],
          ['Mixto', 'Fachada liviana con cara interior', 'Fibrocemento afuera y yeso adentro'],
        ],
      },
    },
    {
      id: 'ventajas',
      kicker: 'Frente al ladrillo',
      titulo: 'Cuándo conviene un muro en drywall',
      parrafos: [
        'En una remodelación, el peso y el escombro pesan tanto como el precio. Un muro liviano no carga la losa, se levanta en menos tiempo y permite pasar redes por dentro sin regatear. Es la opción habitual para dividir un apartamento o adecuar un local con la operación en marcha.',
        'También tiene límites. Colgar un televisor o una alacena exige refuerzo interno en el punto exacto, y por eso se define antes de cerrar. Y en zonas de golpes constantes hay que usar placas de mayor densidad.',
      ],
      lista: [
        { titulo: 'Refuerzos', texto: 'Dejamos madera o perfil dentro del muro donde vaya a ir mobiliario pesado.' },
        { titulo: 'Redes', texto: 'Eléctricas y datos pasan por la cámara sin abrir regatas.' },
        { titulo: 'Acabado', texto: 'Juntas con cinta, masilla y lijado, para que el muro no se distinga de uno en mampostería.' },
        { titulo: 'Sellos', texto: 'Banda acústica y sellante en el perímetro cuando el muro debe aislar.' },
      ],
    },
  ],
  proceso: {
    titulo: 'Cómo construimos un muro en drywall',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Definimos para qué es el muro: dividir, aislar ruido, resistir humedad o fuego.' },
      { titulo: 'Composición y presupuesto', texto: 'Placas, cámara, lana y refuerzos según el uso, con presupuesto por partidas.' },
      { titulo: 'Estructura', texto: 'Perfilería a plomo, banda en el perímetro y redes por dentro.' },
      { titulo: 'Cierre', texto: 'Placas atornilladas, lana en la cámara y sellos en los encuentros.' },
      { titulo: 'Acabado y entrega', texto: 'Cinta, masilla, lijado y pintura. La garantía queda por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'drywall-1', alt: 'Espacio interior dividido con muros en placa durante la obra, antes del masillado', caption: 'Muros en placa antes del masillado.' },
    { archivo: 'drywall-2', alt: 'Escalera con muro en placas de fibrocemento ya instaladas', caption: 'Placas instaladas siguiendo la escalera.' },
    { archivo: 'drywall-3', alt: 'Estructura metálica liviana de una construcción en una ladera del Oriente antioqueño', caption: 'Estructura liviana en el Oriente antioqueño.' },
  ],
  proyectos: [
    { nombre: 'Hotel Heiss', detalle: 'Cielos y muros en drywall', href: '/proyectos/hotel-heiss/' },
    { nombre: 'Calle Flora Hotel', detalle: 'Muros y cielos', href: '/proyectos/calle-flora-hotel/' },
  ],
  faq: [
    { q: '¿Un muro en drywall aísla el ruido?', a: 'Depende de cómo se componga. Con una placa por cara y sin lana la voz alta llega apagada al otro lado. Con doble placa y lana mineral se alcanzan índices de laboratorio iguales o superiores a los de un ladrillo revocado, siempre que el muro quede sellado en su perímetro.' },
    { q: '¿Qué es mejor, drywall o ladrillo?', a: 'En remodelación, el drywall pesa menos, se instala en menos tiempo, genera menos escombro y deja pasar redes por dentro. El ladrillo aporta masa y resistencia a golpes sin refuerzos. Para dividir espacios interiores solemos recomendar drywall bien compuesto.' },
    { q: '¿Se puede colgar un televisor en un muro en drywall?', a: 'Sí, con un refuerzo interno de madera o perfil en el punto exacto, que se instala antes de cerrar el muro. Si el muro ya existe, se usan anclajes de expansión para cargas moderadas o se abre para reforzar.' },
    { q: '¿Qué diferencia hay entre drywall y superboard?', a: 'El drywall tiene núcleo de yeso y es para interiores. El superboard es fibrocemento: resiste agua e intemperie, y se usa en fachadas y zonas húmedas.' },
    { q: '¿Cuánto se demora un muro en drywall?', a: 'Un muro divisorio de un apartamento suele construirse en dos o tres días, sin contar el tiempo de secado de la masilla ni la pintura. El tiempo aumenta con doble placa o sellos acústicos.' },
    { q: '¿Se puede usar drywall en un baño?', a: 'Sí, con placa resistente a la humedad y, en las zonas de ducha, con impermeabilización o superboard bajo el enchape.' },
  ],
  relacionados: [
    { titulo: 'Cielo raso en drywall y PVC', href: '/servicios/cielo-raso/' },
    { titulo: 'Estuco para muros', href: '/servicios/estuco/' },
    { titulo: 'Pintura de interiores', href: '/servicios/pintura/' },
  ],
  blog: [{ titulo: 'Guía para remodelar un apartamento en Medellín', href: '/blog/guia-remodelacion-apartamentos-medellin/' }],
  waTexto: 'Hola Arkava, quiero cotizar un muro en drywall',
};
