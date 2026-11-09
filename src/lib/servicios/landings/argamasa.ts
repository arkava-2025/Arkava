import type { Landing } from './tipos';

export const ARGAMASA: Landing = {
  slug: 'argamasa',
  nombre: 'Argamasa y revoque',
  serviceType: 'Revoque y nivelación de muros',
  seoTitle: 'Argamasa, revoque y pañete de muros en Medellín | Arkava',
  seoDescription: 'Argamasa, revoque y pañete en Medellín para nivelar muros y fachadas. Mezcla, espesor y curado controlados para que el acabado final no se fisure.',
  kicker: 'Argamasa y revoque · Medellín y Valle de Aburrá',
  h1: 'Argamasa, revoque y pañete de muros en Medellín',
  lead: 'Es la capa que nadie fotografía, y la que decide si el estuco, la pintura o el enchape se conservan bien con los años.',
  datos: [
    { label: 'Función', value: 'Nivelar y proteger' },
    { label: 'Espesor habitual', value: 'Cerca de 2 cm' },
    { label: 'Mezcla', value: 'Cemento y arena 1:4' },
    { label: 'Dónde', value: 'Interiores y fachadas' },
  ],
  ogFoto: 'argamasa-2',
  bloques: [
    {
      id: 'diferencias',
      kicker: 'Términos',
      titulo: 'Argamasa, revoque y pañete: qué es cada cosa',
      parrafos: [
        'En obra estos tres nombres se cruzan, y por eso conviene aclararlos. La argamasa es la mezcla de cemento, arena y agua. El revoque, que en Antioquia casi todos llaman así y en otras regiones pañete, es la capa que se hace con esa mezcla sobre un muro. El revoestuco es una variante más fina, que deja la superficie más cerrada.',
        'Cuando un presupuesto dice "revoque" y otro "pañete", probablemente están hablando de lo mismo. Lo que sí hay que comparar es el espesor, la mezcla y si incluye el curado.',
      ],
    },
    {
      id: 'tecnica',
      kicker: 'Técnica',
      titulo: 'Qué hace que un revoque no se fisure',
      parrafos: [
        'Las fisuras en un revoque casi siempre se explican por agua y prisa. Un estudio de la Universidad Santo Tomás atribuye las microfisuras y la pérdida de adherencia a un curado inadecuado combinado con cambios de temperatura y humedad. Holcim recomienda aplicar el material en capas sucesivas y dejar curar cada una.',
      ],
      lista: [
        { titulo: 'Muro humedecido', texto: 'Un ladrillo seco le roba el agua a la mezcla y el revoque queda débil. Se humedece antes de aplicar.' },
        { titulo: 'Guías y regla', texto: 'Se colocan maestras a plomo para que el muro quede plano de punta a punta.' },
        { titulo: 'Malla en encuentros', texto: 'Donde se unen materiales distintos, como ladrillo y concreto, se refuerza con malla.' },
        { titulo: 'Curado', texto: 'Se mantiene húmedo los primeros días. Saltarse este paso es la causa más común de fisuras.' },
      ],
    },
    {
      id: 'peso',
      kicker: 'Cuándo se usa',
      titulo: 'Cuándo un muro necesita argamasa y cuándo basta con estuco',
      parrafos: [
        'Si el muro tiene desplomes, ondulaciones que se ven a simple vista o ladrillo a la vista, necesita revoque. Si ya está plano y solo tiene poros o marcas leves, el estuco es suficiente.',
        'El espesor también pesa, literalmente. Un estudio de la Universidad Colegio Mayor de Cundinamarca calcula que cada 5 mm adicionales de revoque agregan unos 10 kg por metro cuadrado de carga muerta. Por eso, cuando un muro está muy fuera de plomo, a veces conviene corregir la mampostería o usar otro sistema en lugar de cargar mortero.',
      ],
    },
    {
      id: 'fachadas',
      kicker: 'Exteriores',
      titulo: 'Revoque de fachadas en Medellín',
      parrafos: [
        'En una fachada el revoque trabaja más. Recibe sol directo, aguaceros y cambios de temperatura en el mismo día, y por eso los descuidos se notan antes. Los remates, antepechos y dinteles son los puntos por donde el agua suele entrar primero.',
        'Se programa contando con las lluvias, porque un mortero recién aplicado no debe mojarse ni secarse demasiado rápido bajo el sol. Con andamio o trabajo en altura se cumplen los protocolos de seguridad, y en edificios se coordina con la administración.',
        'Muchas fachadas de ladrillo a la vista se revocan al cambiar de acabado. Antes de hacerlo hay que revisar el estado de las juntas, limpiar sales y resolver las filtraciones, o el mortero no se adhiere bien.',
      ],
    },
  ],
  proceso: {
    titulo: 'Cómo aplicamos un revoque',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Medimos plomo y planitud, y revisamos el estado del muro.' },
      { titulo: 'Presupuesto', texto: 'Definimos mezcla, espesor y refuerzos, con presupuesto por partidas.' },
      { titulo: 'Preparación', texto: 'Limpieza, humedecido, maestras a plomo y malla en encuentros.' },
      { titulo: 'Aplicación', texto: 'Mortero en capas, reglado y fratasado.' },
      { titulo: 'Curado y entrega', texto: 'Curado de la superficie y revisión antes de pasar al acabado.' },
    ],
  },
  fotos: [
    { archivo: 'argamasa-2', alt: 'Oficiales de Arkava aplicando revoque de argamasa sobre un muro exterior de ladrillo', caption: 'Revoque en muro exterior, sobre ladrillo.' },
    { archivo: 'estuco-2', alt: 'Muro revocado en proceso de estuco en un corredor', caption: 'Muro revocado listo para recibir estuco.' },
  ],
  proyectos: [],
  faq: [
    { q: '¿Qué es la argamasa?', a: 'Es una mezcla de cemento, arena y agua que se usa para revocar muros, nivelar pisos y pegar mampostería. Su proporción cambia según el uso.' },
    { q: '¿Qué diferencia hay entre revoque y pañete?', a: 'Son lo mismo: una capa de mortero que nivela y protege el muro. "Revoque" es más usado en Antioquia y "pañete" en otras regiones del país.' },
    { q: '¿Qué espesor debe tener un revoque?', a: 'Lo habitual es alrededor de 2 cm. Espesores mucho mayores agregan peso y aumentan el riesgo de fisuras, así que hay que aplicarlos por capas o corregir el muro antes.' },
    { q: '¿Qué proporción de cemento y arena se usa para revocar?', a: 'Es habitual una mezcla de una parte de cemento por cuatro de arena cernida, aunque la dosificación se ajusta al tipo de muro y a si es interior o exterior.' },
    { q: '¿Por qué se fisura el revoque?', a: 'Las causas más comunes son falta de curado, un muro sin humedecer, capas muy gruesas y encuentros entre materiales sin malla de refuerzo.' },
    { q: '¿Se puede revocar un muro de ladrillo a la vista?', a: 'Sí. Se limpia, se retiran las sales, se humedece y se aplica el mortero por capas. Si el ladrillo tiene un acabado liso o sellado, primero hay que preparar la superficie para que el revoque se adhiera.' },
    { q: '¿Cuánto debe secar un revoque antes de estucar?', a: 'Depende del espesor y del clima. Debe estar curado y seco antes de recibir el estuco, porque la humedad atrapada hace que el acabado se sople.' },
  ],
  relacionados: [
    { titulo: 'Obra blanca en Medellín', href: '/servicios/obra-blanca/' },
    { titulo: 'Estuco para muros', href: '/servicios/estuco/' },
    { titulo: 'Pintura de fachadas', href: '/servicios/pintura/' },
    { titulo: 'Instalación de enchapes', href: '/servicios/enchape/' },
  ],
  blog: [{ titulo: 'Guía para remodelar un apartamento en Medellín', href: '/blog/guia-remodelacion-apartamentos-medellin/' }],
  waTexto: 'Hola Arkava, quiero cotizar un revoque o nivelación de muros',
};
