import type { Landing } from './tipos';

export const ESTUCO: Landing = {
  slug: 'estuco',
  nombre: 'Estuco',
  serviceType: 'Estuco de muros y cielos',
  seoTitle: 'Estuco para muros en Medellín: precios 2026 | Arkava',
  seoDescription: 'Estuco de muros en Medellín desde $25.000/m²: plástico, acrílico y texturizado. Aplicación por capas, lijado con luz rasante y garantía escrita.',
  kicker: 'Estuco · Medellín y Valle de Aburrá',
  h1: 'Estuco para muros en Medellín',
  lead: 'Un muro bien estucado no se nota. Se nota el que quedó con ondas cuando le da la luz de la tarde.',
  datos: [
    { label: 'Estuco y pintura', value: '$25.000 a $60.000/m²' },
    { label: 'Aplicación', value: 'Dos o tres manos' },
    { label: 'Acabados', value: 'Liso, labrado y texturizado' },
    { label: 'Respaldo', value: 'Contrato y garantía escrita' },
  ],
  priceFrom: 25000,
  ogFoto: 'estuco-2',
  bloques: [
    {
      id: 'que-es',
      kicker: 'Para qué sirve',
      titulo: 'Qué hace el estuco y cuándo hace falta',
      parrafos: [
        'El estuco es la capa fina que deja el muro plano y liso para recibir pintura. Se aplica sobre revoque o concreto, y corrige lo que esas superficies traen: poros, ondulaciones suaves y marcas de la llana. No está hecho para corregir desplomes grandes. Si el muro está torcido, primero va una argamasa.',
        'Se justifica sobre todo donde entra luz lateral, como corredores y muros junto a ventanales. Esa luz rasante delata cualquier ondulación, y la pintura por sí sola no la disimula.',
      ],
    },
    {
      id: 'tipos',
      kicker: 'Tipos de estuco',
      titulo: 'Estuco plástico, en polvo y acrílico',
      parrafos: [
        'El nombre comercial cambia entre marcas, y en Colombia "plástico" y "acrílico" muchas veces se refieren al mismo tipo de producto: una masilla con resinas, lista para usar. La diferencia que importa es dónde va y cómo responde.',
      ],
      tabla: {
        caption: 'Tipos de estuco y su uso recomendado',
        columnas: ['Tipo', 'Dónde va', 'Cómo se comporta'],
        filas: [
          ['En polvo', 'Interiores secos', 'Se prepara en obra. Lija bien y da un acabado muy fino.'],
          ['Plástico', 'Interiores', 'Listo para usar, con buena adherencia. Es el más común en remodelación.'],
          ['Acrílico exterior', 'Fachadas y zonas expuestas', 'Más flexible y resistente al agua.'],
          ['Texturizado', 'Muros de acento', 'Se aplica con llana o rodillo para dejar un relieve visible.'],
        ],
      },
    },
    {
      id: 'errores',
      kicker: 'Errores frecuentes',
      titulo: 'Por qué se fisura o se desprende un estuco',
      parrafos: [
        'Fabricantes como Sika advierten que estos productos no deben aplicarse sobre fisuras mayores a 0,5 mm. Una fisura de ese tamaño hay que abrirla y tratarla antes de estucar, porque vuelve a aparecer.',
      ],
      lista: [
        { titulo: 'Revoque sin curar', texto: 'Si el revoque aún tiene humedad, el estuco se sopla. Hay que esperar a que esté seco.' },
        { titulo: 'Capas muy gruesas', texto: 'Una mano gruesa se fisura al secar. Es mejor aplicar varias manos delgadas.' },
        { titulo: 'Base con polvo', texto: 'Sin limpiar ni imprimar, el estuco se adhiere al polvo y no al muro.' },
        { titulo: 'Pintar sin sellar', texto: 'El estuco absorbe mucho y deja manchas de brillo en la pintura.' },
      ],
    },
  ],
  precios: {
    titulo: 'Cuánto cuesta estucar en Medellín',
    caption: 'Precios de referencia de estuco en Medellín, con mano de obra',
    columnas: ['Trabajo', 'Rango de referencia', 'Qué lo hace variar'],
    filas: [
      ['Estuco y pintura de muros', '$25.000 a $60.000 por m²', 'Estado del muro y número de manos'],
      ['Texturizados y acentos', 'Según diseño', 'Herramienta, relieve y área'],
    ],
    nota: 'Valores con mano de obra. Un muro que necesita nivelación previa se cotiza con argamasa aparte.',
  },
  proceso: {
    titulo: 'Cómo trabajamos un muro estucado',
    pasos: [
      { titulo: 'Evaluación técnica', texto: 'Revisamos planitud, humedad y fisuras con luz rasante.' },
      { titulo: 'Presupuesto', texto: 'Definimos producto, manos y acabado, con presupuesto por partidas.' },
      { titulo: 'Aplicación', texto: 'Tratamos fisuras y aplicamos dos o tres manos delgadas.' },
      { titulo: 'Control', texto: 'Lijado y revisión con lámpara rasante antes de sellar.' },
      { titulo: 'Entrega', texto: 'Sello y pintura, limpieza y garantía por escrito.' },
    ],
  },
  fotos: [
    { archivo: 'estuco-2', alt: 'Oficiales de Arkava estucando un muro largo en un corredor de hotel', caption: 'Primera mano de estuco en un muro largo.' },
    { archivo: 'estuco-1', alt: 'Corredor de hotel con muros estucados y apliques de luz, durante la etapa final de obra', caption: 'Corredor con muros listos para pintura, iluminados con luz rasante.' },
  ],
  proyectos: [
    { nombre: 'Hotel Nakua', detalle: 'Estuco y pintura', href: '/proyectos/hotel-nakua/' },
    { nombre: 'Hunters Hotel', detalle: 'Estuco y pintura', href: '/proyectos/hunters-hotel/' },
  ],
  faq: [
    { q: '¿Cuánto cuesta estucar un muro en Medellín?', a: 'El estuco con pintura está entre $25.000 y $60.000 por m², con mano de obra. El rango depende de cuánto haya que corregir y de cuántas manos necesite el muro.' },
    { q: '¿Cuántas manos de estuco necesita un muro?', a: 'Entre dos y tres manos delgadas, según la planitud de la base. La segunda se aplica en sentido contrario a la primera, y la última se lija.' },
    { q: '¿Qué diferencia hay entre estuco y revoque?', a: 'El revoque, también llamado pañete, es la capa gruesa de mortero que nivela el muro. El estuco es la capa fina que va encima y deja la superficie lista para pintar.' },
    { q: '¿Se puede estucar sobre pintura vieja?', a: 'Sí, si la pintura está firme. Se lija para abrir poro, se limpia y se aplica un puente de adherencia. Si la pintura se desprende, hay que retirarla primero.' },
    { q: '¿Cuánto debe secar el estuco antes de pintar?', a: 'Depende del producto, el espesor y el clima, y lo indica cada ficha técnica. Se lija cuando está completamente seco, y antes de pintar se aplica sellador.' },
    { q: '¿El estuco sirve para fachadas?', a: 'Sí, siempre que sea un producto para exterior. Los estucos de interior no resisten el agua y se desprenden en poco tiempo.' },
  ],
  relacionados: [
    { titulo: 'Obra blanca en Medellín', href: '/servicios/obra-blanca/' },
    { titulo: 'Argamasa y revoque', href: '/servicios/argamasa/' },
    { titulo: 'Pintura de interiores y fachadas', href: '/servicios/pintura/' },
    { titulo: 'Microcemento y muros decorativos', href: '/servicios/muros-decorativos/' },
  ],
  blog: [{ titulo: 'Microcemento, pintura o estuco: comparación', href: '/blog/microcemento-vs-pintura-paredes/' }],
  waTexto: 'Hola Arkava, quiero cotizar estuco para mis muros',
};
