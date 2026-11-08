import type { Landing } from './tipos';

export const CIELO_RASO: Landing = {
  slug: 'cielo-raso',
  nombre: 'Cielo raso',
  serviceType: 'Instalación de cielo raso',
  seoTitle: 'Cielo raso en drywall y PVC en Medellín, instalado | Arkava',
  seoDescription: 'Cielo raso en drywall instalado en Medellín desde $70.000/m². Luz indirecta, placas RH y RF, y redes coordinadas antes de cerrar. Precios 2026.',
  kicker: 'Cielo raso · Medellín y Valle de Aburrá',
  h1: 'Cielo raso en drywall y PVC instalado en Medellín',
  lead: 'Enciende la luz indirecta y mira qué se esconde detrás del cielo. Lo que no se ve es lo que hace que un cielo raso se conserve bien.',
  datos: [
    { label: 'Drywall instalado', value: '$70.000 a $95.000/m²' },
    { label: 'Placas', value: 'Estándar, RH, RF y superboard' },
    { label: 'Luz', value: 'Dilataciones para LED' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  priceFrom: 70000,
  ogFoto: 'cielo-3',
  bloques: [
    {
      id: 'tipos',
      kicker: 'Tipos de cielo',
      titulo: 'Qué cielo raso conviene en cada espacio',
      parrafos: [
        'La mayoría de los cielos de vivienda en Medellín se hace en drywall, porque deja una superficie continua y permite dilataciones para luz. Pero no es la única opción, y en algunos espacios no es la mejor.',
      ],
      tabla: {
        caption: 'Tipos de cielo raso, precio de referencia y uso recomendado',
        columnas: ['Material', 'Precio instalado por m²', 'Dónde conviene'],
        filas: [
          ['Drywall estándar', '$70.000 a $95.000', 'Salas, alcobas y corredores'],
          ['Drywall RH', 'Se cotiza por proyecto', 'Baños y zonas con humedad'],
          ['Drywall RF', 'Se cotiza por proyecto', 'Rutas de evacuación y exigencias de fuego'],
          ['PVC', '$65.000 a $90.000', 'Balcones, zonas de ropas y espacios húmedos'],
          ['Fibra mineral', '$90.000 a $120.000', 'Oficinas, con acceso fácil a las redes'],
          ['Madera o MDF', '$160.000 a $240.000', 'Acentos en zonas sociales y hoteles'],
        ],
      },
    },
    {
      id: 'luz',
      kicker: 'Luz indirecta',
      titulo: 'Cómo se diseña un cielo con luz indirecta',
      parrafos: [
        'La luz indirecta no se soluciona con la cinta LED sino con la geometría del cielo. La dilatación necesita altura y profundidad suficientes para que la cinta quede oculta desde cualquier punto del espacio, y una distancia al muro que evite ver los puntos de luz reflejados.',
        'También hay que dejar acceso a la fuente de poder. Es el componente que primero falla, y si queda sellada dentro del cielo habrá que romper para cambiarla. Lo resolvemos con un registro o ubicándola en un punto accesible. Para vivienda solemos recomendar 3000 K, y 4000 K para cocinas de trabajo y oficinas.',
      ],
    },
    {
      id: 'antes-de-cerrar',
      kicker: 'Antes de cerrar',
      titulo: 'Lo que se revisa antes de poner la última placa',
      parrafos: [
        'Una vez cerrado, cualquier cambio cuesta el doble. Por eso, antes de la placa, se revisan las redes eléctricas y sanitarias, se definen los puntos de luz y se dejan registros donde haya válvulas o cajas de paso.',
      ],
      lista: [
        { titulo: 'Perfilería nivelada', texto: 'Si la estructura no está a nivel, ninguna masilla lo corrige. Se nota en la línea de la pared.' },
        { titulo: 'Juntas con cinta', texto: 'La cinta y la masilla en varias pasadas evitan que la unión de las placas se marque con el tiempo.' },
        { titulo: 'Aislamiento', texto: 'Con lana sobre la perfilería el cielo también reduce el ruido del piso de arriba.' },
        { titulo: 'Dilatación perimetral', texto: 'Una pequeña separación contra el muro permite que el cielo se mueva sin fisurarse en la esquina.' },
      ],
    },
  ],
  proceso: {
    titulo: 'Cómo instalamos un cielo raso',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Medimos altura libre y revisamos redes y humedad en la losa.' },
      { titulo: 'Diseño y presupuesto', texto: 'Definimos niveles, puntos de luz, registros y placa para cada zona.' },
      { titulo: 'Estructura', texto: 'Perfilería a nivel, redes revisadas y aislamiento si se requiere.' },
      { titulo: 'Placas y masillado', texto: 'Atornillado, cinta, masilla en varias pasadas y lijado.' },
      { titulo: 'Acabado y entrega', texto: 'Sellador, pintura, instalación de la luz y garantía por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'cielo-3', alt: 'Cielo raso en drywall con placas masilladas y dilataciones para luz durante la obra', caption: 'Placas masilladas y dilataciones listas para la luz.' },
    { archivo: 'cielo-1', alt: 'Cielo raso en listones de madera con ritmo de vacíos para luz', caption: 'Cielo en listones de madera como acento.' },
    { archivo: 'cielo-2', alt: 'Técnico instalando aislamiento sobre la perfilería de un cielo raso', caption: 'Aislamiento instalado antes de cerrar.' },
  ],
  proyectos: [
    { nombre: 'Hotel Heiss', detalle: 'Cielos y muros en drywall', href: '/proyectos/hotel-heiss/' },
    { nombre: 'Calle Flora Hotel', detalle: 'Muros y cielos', href: '/proyectos/calle-flora-hotel/' },
  ],
  faq: [
    { q: '¿Cuánto cuesta el metro cuadrado de cielo raso en drywall en Medellín?', a: 'Instalado, con estructura, placa, masillado y pintura de terminación, está entre $70.000 y $95.000 por m². Los cielos con varios niveles o dilataciones para luz se cotizan por diseño.' },
    { q: '¿Qué diferencia hay entre drywall RH y RF?', a: 'La placa RH resiste la humedad y se usa en baños y zonas húmedas. La RF resiste el fuego y se especifica donde el diseño lo exige, como rutas de evacuación. La placa estándar sirve para zonas secas.' },
    { q: '¿Qué es mejor, drywall o PVC?', a: 'El drywall da una superficie continua, se pinta y permite luz indirecta, y por eso es lo más usado en zonas sociales. El PVC tolera mejor la humedad y no se pinta, y conviene en balcones o zonas de ropas.' },
    { q: '¿Cuánta altura se pierde con un cielo raso?', a: 'Un cielo plano suele bajar entre 8 y 12 cm. Con dilataciones para luz o aparatos de aire acondicionado la altura perdida aumenta. Se mide antes de diseñar, para no dejar el espacio bajo.' },
    { q: '¿El cielo raso aísla el ruido del piso de arriba?', a: 'La placa sola aporta poco. Con lana mineral sobre la perfilería mejora de forma notable el ruido aéreo, como voces y televisión. Los golpes y pasos son más difíciles de atenuar desde abajo.' },
    { q: '¿Por qué se fisura un cielo raso?', a: 'Casi siempre por juntas sin cinta, placas mal apoyadas o falta de dilatación contra los muros. Con la perfilería a nivel y un masillado correcto, las uniones no se marcan con el tiempo.' },
  ],
  relacionados: [
    { titulo: 'Muros en drywall y superboard', href: '/servicios/muros-drywall/' },
    { titulo: 'Pintura de interiores', href: '/servicios/pintura/' },
    { titulo: 'Carpintería arquitectónica', href: '/servicios/carpinteria/' },
  ],
  blog: [{ titulo: 'Tipos de cielo raso para tu hogar', href: '/blog/tipos-cielo-raso-hogar/' }],
  waTexto: 'Hola Arkava, quiero cotizar un cielo raso',
};
