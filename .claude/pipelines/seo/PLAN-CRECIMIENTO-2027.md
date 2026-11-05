# Plan de crecimiento digital y posicionamiento orgánico 2027 — Arkava

**Elaborado:** 2026-11-03
**Estado:** Borrador para trabajar por fases. Este documento **no se ejecuta tal cual**: cada pilar se profundiza en una sesión propia antes de tocar código o publicar contenido.
**Documentos relacionados:** `SEO-PLAN-2026.md`, `FULL-AUDIT-REPORT-2026-10.md`, `ACTION-PLAN-2026-10.md`, `COMPETITOR-ANALYSIS.md`, `GSC-ANALYSIS.md`

---

## 0. Objetivo 2027

Que Arkava aparezca en el top 3 de Google (y sea citada en AI Overviews / ChatGPT / Perplexity) para búsquedas comerciales de remodelación y acabados en el Valle de Aburrá, por servicio y por zona.

Ejemplos de búsquedas que queremos ganar:

- "remodelación de apartamentos en Medellín"
- "empresa de remodelación en El Poblado"
- "pintura de apartamento en Sabaneta"
- "enchape de baño en Envigado"
- "cielo raso en drywall Itagüí"
- "obra blanca apartamento nuevo Sabaneta"

Tres palancas:

1. **Hub de servicios** (`/servicios`) rediseñado como página pilar.
2. **Landing por servicio**: cada servicio con su propia página profunda, con fotos reales, precios de referencia, proceso, FAQ y proyectos.
3. **SEO programático por zona**: páginas por municipio/sector del Valle de Aburrá, y combinaciones servicio × zona donde haya demanda.

Y una base: **corregir lo que hoy frena el posicionamiento** (sección 5).

La validación de quién ocupa hoy los primeros lugares está en la **sección 10**; la alianza con Comfort Design en la **11** y las keywords priorizadas en la **12**.

---

## 1. Contexto del negocio (lo que el sitio debe transmitir)

### Quiénes son
Arkava es una empresa de acabados arquitectónicos de alto nivel y remodelación integral con sede en Medellín. Trabaja proyectos residenciales, comerciales y de hospitalidad. Se presenta como aliado "llave en mano": desde la evaluación técnica hasta la entrega.

### Diferenciadores (argumentos de confianza)
- Presupuestos transparentes, sin costos ocultos
- Contratos legales, pagos por etapas y pólizas de cumplimiento
- Asesoría de diseño de interiores antes de ejecutar
- Experiencia en hoteles: Hunters, Heiss, Nakua, Calle Flora
- Metodología de 5 etapas: evaluación técnica → planeación y presupuesto → ejecución → supervisión y control → entrega final

### Servicios que existen hoy en el sitio (8 páginas)
| Servicio | URL | Qué dice hoy |
|---|---|---|
| Argamasa | `/servicios/argamasa/` | Base de nivelación (revoestuco, revolis, pañete) |
| Estuco | `/servicios/estuco/` | Estucos en polvo, plásticos, acrílicos; filetes y ranuras |
| Pintura | `/servicios/pintura/` | Muros, fachadas, metálicas, pisos, epóxicos, poliuretanos |
| Enchape | `/servicios/enchape/` | Pisos, paredes, piscinas, fachadas; cerámica, porcelanato, laminado |
| Cielo raso | `/servicios/cielo-raso/` | Drywall estándar, RH, RF, superboard, PVC, alistonados |
| Muros drywall | `/servicios/muros-drywall/` | Drywall, superboard, mixtos, cortafuego, termoacústicos |
| Muros decorativos | `/servicios/muros-decorativos/` | Microcemento, veneciano, porcelanato líquido, Corev, graniacril, esgrafiado, imitación roca |
| Carpintería | `/servicios/carpinteria/` | Mobiliario fijo, closets, cocinas, puertas, repisas (se queda en Arkava, ángulo arquitectónico: ver sección 11) |

### Servicios que el negocio ofrece pero **no tienen página**
- Remodelación integral (casas, apartamentos, locales)
- Obra blanca (mencionada en el intro de `/servicios`, sin página)
- Mantenimiento de planta física (obras civiles, plomería, electricidad)
- Diseño arquitectónico / diseño de interiores
- Iluminación decorativa (mencionada en el intro de `/servicios`)

### Proyectos publicados (11)
Vesubio (apartamento Medellín), Hotel Nakua, Apto Los Angeles, Finca 13, Loma del Bosque, Hashtag 98, Casa El Pomar, Hunters Hotel, Casa Noah, Hotel Heiss, Calle Flora Hotel.
Cada proyecto tiene ~160–180 palabras y no registra ubicación, año, área, duración ni servicios aplicados como datos estructurados.

### Contenido de apoyo existente
- **Blog (7 artículos):** costo de enchape, costo de remodelar baño, guía remodelación de apartamentos, microcemento vs pintura, remodelación de cocina, tipos de cielo raso, cómo contratar expertos.
- **FAQs (8)** y **testimonios (3)** en content collections.

### Restricciones de copy ya acordadas
- Tono profesional, elegante, confiable. Español de Colombia.
- **No ofrecer "visita gratuita / sin costo / gratis"** en ningún contenido.
- Todo texto que se publique pasa por `humanizer`.

---

## 2. Pilar A — Página hub `/servicios`

### Situación actual
- H1 genérico ("Conoce Nuestros Servicios"), ~340 palabras.
- Renderiza **los 8 componentes de servicio completos** dentro de la página: el mismo texto e imágenes aparecen en `/servicios` y en cada `/servicios/x/` → contenido duplicado y canibalización.
- **No enlaza a ninguna página individual de servicio.** Las 8 landings solo se descubren por el sitemap. Para Google son páginas casi huérfanas.
- El home tampoco enlaza a servicios individuales (sus tarjetas apuntan a `/servicios/`).
- H2 roto en drywall: "Muros" + "EN DRYWALL Y SUPERBOARD" como dos H2.

### Hacia dónde ir
La página debe funcionar como pilar: explica qué hace Arkava y **reparte autoridad** a cada servicio y a cada zona.

Estructura propuesta (a validar):
1. H1 con keyword: "Servicios de remodelación y acabados en Medellín"
2. Intro corta con propuesta de valor llave en mano
3. **Bloque "Por tipo de proyecto"** (lo que la gente busca): remodelación integral, apartamentos, baños, cocinas, obra blanca, locales comerciales, hoteles
4. **Bloque "Por especialidad"** (lo que Arkava ejecuta): estuco, pintura, enchape, cielo raso, drywall, muros decorativos, carpintería, argamasa, mantenimiento
5. Cada tarjeta: foto real, 2 líneas, "desde $X/m²" cuando aplique, enlace a la landing
6. Metodología 5 etapas (resumen, enlace a sobre-nosotros)
7. Proyectos destacados por tipo
8. Bloque "Dónde trabajamos" → enlaces a páginas de zona (Pilar C)
9. FAQ general de servicios + `FAQPage` schema
10. CTA de cotización

Hero interactivo (puntos + zoom por servicio, técnica tomada de Comfort Design): contexto completo en `CONTEXTO-HERO-SERVICIOS.md` y diseño aprobado en `docs/superpowers/specs/2026-11-04-hero-servicios-design.md`. Se adelanta: es lo primero que se construye del Pilar A (decisión 2026-11-04).

> **Pendiente:** el hero tiene puntos de **remodelación integral** y **diseño arquitectónico / interiores**, que todavía no tienen página. Mientras tanto enlazan a `/contacto/`. Hay que crear sus landings (Pilar B, familia 1) y cambiar los enlaces del hero cuando existan.

### Preguntas para la sesión de profundización
- ¿Separamos "tipo de proyecto" y "especialidad" en dos niveles de URL o todo bajo `/servicios/`?
- ¿Qué servicios nuevos se crean primero (obra blanca, remodelación integral, baños, cocinas)?
- ¿El contenido se maneja en Hygraph o migramos servicios a content collections de Astro (más control SEO, versionado en git)?
- ¿Qué precios de referencia está dispuesto el negocio a publicar?

---

## 3. Pilar B — Mini landing profesional por servicio

### Situación actual
Cada página de servicio tiene **~69 palabras**: un título, un párrafo y 3 imágenes. No hay proceso, precios, FAQ, proyectos relacionados, ni enlaces al blog. Con eso es muy difícil rankear para nada comercial.

### Arquitectura de servicios propuesta

La demanda de búsqueda está en **tipos de proyecto**, no en técnicas. Nadie busca "argamasa Medellín" en volumen; sí buscan "remodelación de baño Medellín". Por eso proponemos dos familias:

**Familia 1 — Servicios por proyecto (alta demanda, nuevas páginas)**
| Página | Keyword principal (hipótesis) |
|---|---|
| Remodelación integral | remodelación de casas / apartamentos Medellín |
| Remodelación de apartamentos | remodelación de apartamentos Medellín |
| Remodelación de baños | remodelación de baños Medellín |
| Remodelación de cocinas | remodelación de cocinas Medellín |
| Obra blanca | obra blanca Medellín / apartamento nuevo |
| Remodelación de locales comerciales | remodelación de locales Medellín |
| Remodelación de hoteles y hospitality | remodelación de hoteles Medellín (B2B, poca competencia, mucho portafolio) |
| Mantenimiento de planta física | mantenimiento locativo Medellín |
| Diseño de interiores y arquitectónico | diseño de interiores Medellín |

**Familia 2 — Especialidades (páginas actuales, a profundizar)**
Estuco, pintura, enchape, cielo raso, muros drywall, muros decorativos (+ posible subpágina microcemento), carpintería a medida, argamasa.

> Argamasa probablemente no justifica landing propia por demanda; evaluar fusionarla con estuco ("estuco y argamasa") o mantenerla como página técnica de soporte.

### Plantilla de landing (esqueleto a validar)
Cada landing debe responder todo lo que el cliente pregunta antes de cotizar:

1. **Hero**: H1 con servicio + Medellín, subtítulo con beneficio, CTA (WhatsApp + formulario), foto real
2. **Qué es / qué incluye** el servicio (alcance concreto)
3. **Cuándo conviene** y casos típicos (apartamento nuevo, renovación, local, hotel)
4. **Tipos / materiales / opciones** con pros y contras (ej. cielo raso: drywall RH, PVC, alistonado)
5. **Precio de referencia por m² en Medellín** y qué lo hace variar (tabla)
6. **Proceso Arkava en 5 etapas** aplicado a ese servicio
7. **Tiempos estimados** por tamaño de obra
8. **Galería de proyectos reales** con ese servicio (enlazados a `/proyectos/x/`)
9. **Garantías y confianza**: contrato, pólizas, pagos por etapas
10. **FAQ (5–8)** con preguntas reales (GSC + "People also ask") + `FAQPage` schema
11. **Enlaces internos**: artículos del blog del tema, servicios complementarios, zonas donde se ofrece
12. **CTA final**

Objetivo de extensión: 900–1.500 palabras útiles, no relleno.
Schema por página: `Service` + `BreadcrumbList` + `FAQPage`, con `provider` apuntando al `@id` del negocio.

### Fotos
Cada landing necesita **mínimo 6–10 fotos reales** de obra (antes/después si hay), con `alt` descriptivo, WebP/AVIF y dimensiones definidas. Sin fotos propias la página pierde fuerza frente a competidores.

### Preguntas para la sesión de profundización
- ¿Qué fotos reales hay por servicio? Hay que hacer inventario.
- ¿Qué proyectos usan cada servicio? (mapear proyecto → servicios)
- Priorización: ¿qué 3 landings se escriben primero? Propuesta inicial: remodelación de apartamentos, remodelación de baños, obra blanca.
- ¿Precios de referencia por servicio validados por el equipo de obra?
- Diseño visual de la plantilla (componente reutilizable en Astro).

---

## 4. Pilar C — SEO programático por zonas del Valle de Aburrá

### La idea
Crear páginas que respondan a búsquedas con ubicación ("pintura de apartamento en Sabaneta", "remodelación en El Poblado"). Es un modelo probado en servicios locales, **siempre que cada página tenga contenido propio y útil**. Si se generan cientos de páginas iguales cambiando solo el nombre del municipio, Google las trata como *doorway pages* y pueden perjudicar todo el dominio.

### Zonas candidatas
**Medellín por sectores** (donde está el público premium): El Poblado, Laureles–Estadio, Belén, Envigado (municipio), Sabaneta, Itagüí, La Estrella, Bello, Caldas, Copacabana.
**Oriente cercano** (fincas, casas de campo, ya hay proyecto en El Retiro): Rionegro, Llanogrande, El Retiro, La Ceja.

> Priorizar por: (1) dónde ya hay proyectos ejecutados, (2) perfil socioeconómico afín al servicio premium, (3) demanda en GSC/Keyword Planner.

### Estructura en tres capas (escalonada)

```
/servicios/                          ← hub (Pilar A)
/servicios/pintura/                  ← landing servicio (Pilar B)
/zonas/sabaneta/                     ← hub de zona (capa 1)
/zonas/sabaneta/pintura/             ← servicio × zona (capa 2, solo combinaciones con demanda)
```
(La estructura de URL exacta se decide en la sesión: `/zonas/x/`, `/remodelacion-sabaneta/`, o `/servicios/pintura/sabaneta/`.)

**Capa 1 — Hub de zona (10–14 páginas):** "Remodelación y acabados en Sabaneta". Contenido propio:
- Tipología de vivienda de la zona (ej. Sabaneta: muchos apartamentos nuevos entregados en obra gris/blanca → obra blanca, enchapes, cielo raso; El Poblado: apartamentos de los 90–2000 para renovación integral; Oriente: casas campestres y fincas)
- Proyectos ejecutados en esa zona (con fotos)
- Logística real: reglamentos de propiedad horizontal, horarios de obra, permisos de administración
- Servicios más pedidos en la zona → enlaces
- Testimonio de cliente de la zona (si existe)
- Mapa / área atendida, schema `Service` con `areaServed` específico

**Capa 2 — Servicio × zona (crecimiento gradual):** solo para combinaciones con demanda validada. Arrancar con ~20–30, no con 150.
Contenido mínimo para publicar (quality gate):
- ≥ 40% de texto único frente a otras páginas de la misma plantilla
- Al menos un dato local real (proyecto, tipología, precio ajustado, caso)
- FAQ local
- Fotos (idealmente de la zona)
- Enlaces a landing del servicio y al hub de la zona

**Capa 3 — Casos por barrio/edificio:** los proyectos (`/proyectos/x/`) enriquecidos con ubicación alimentan las capas 1 y 2. Cada obra nueva = más contenido local.

### Implementación técnica (a decidir)
- Fuente de datos: un archivo/colección `zonas` (Astro content collection o modelo en Hygraph) con campos propios por zona (intro, tipología, barrios, proyectos relacionados, FAQ).
- Rutas dinámicas con `getStaticPaths()` que solo generan páginas que pasan el quality gate (campo `publicar: true`).
- Sitemap y enlazado interno automático (zona ↔ servicio ↔ proyecto).

### Preguntas para la sesión de profundización
- Lista final de zonas y orden de lanzamiento.
- ¿En qué zonas hay proyectos reales que se puedan mostrar?
- Estructura de URL definitiva.
- Datos de demanda: necesitamos GSC restaurado + Keyword Planner/Ahrefs para validar combinaciones.
- ¿Quién aporta conocimiento local (tipologías, reglamentos, precios por zona)?

---

## 5. Lo que hoy NO sirve o está mal para este posicionamiento

### Crítico
| # | Problema | Por qué afecta |
|---|---|---|
| 1 | Páginas de servicio con ~69 palabras | Contenido insuficiente; no compiten en ninguna búsqueda comercial |
| 2 | `/servicios` no enlaza a las páginas individuales; el home tampoco | Las landings no reciben autoridad interna; casi huérfanas |
| 3 | `/servicios` renderiza el contenido completo de las 8 páginas | Duplicado interno; Google no sabe qué URL posicionar |
| 4 | Faltan las páginas de mayor demanda (remodelación de apartamentos, baños, cocinas, obra blanca) | La demanda principal no tiene página destino |
| 5 | GSC sin acceso (propiedad "sin verificar", oct 2026) | Sin datos no se puede priorizar ni medir el plan |

### Alto
| # | Problema | Por qué afecta |
|---|---|---|
| 6 | Proyectos sin ubicación, año, área, duración, servicios aplicados | Pierden valor como prueba local (clave para Pilar C y E-E-A-T) |
| 7 | Proyecto Calle Flora existe en sitemap pero no aparece en el listado `/proyectos` | Inconsistencia; posible proyecto oculto o no publicado |
| 8 | Componente de servicio compartido entre sección y página (`ConditionalLayout`) | Obliga a que la landing sea igual a la tarjeta; impide crecer el contenido. Hay que separar "tarjeta" de "landing" |
| 9 | Encabezados rotos (drywall con dos H2; H1 de servicio pegado al subtítulo) | Señales on-page confusas |
| 10 | `/contacto` con ~68 palabras, sin dirección ni zona de cobertura | Página débil para SEO local |
| 11 | Schema `Service` con `areaServed: "Medellín, Colombia"` genérico y `provider` sin `@id` | No conecta con la entidad del negocio ni con zonas |
| 12 | Testimonios: verificar que sean clientes reales y con autorización; los nombres de archivo (`sarah-jenkins.md`, etc.) no coinciden con el contenido | Testimonios no verificables restan confianza y riesgo reputacional |

### Medio
| # | Problema |
|---|---|
| 13 | Blog sin publicar desde mayo 2026; sin enlaces cruzados blog ↔ servicio ↔ proyecto |
| 14 | Google Business Profile sin evidencia de optimización (fotos, servicios, zonas, reseñas) |
| 15 | Sin estrategia de reseñas en Google (clave para el paquete local de Maps) |
| 16 | Sin enlaces externos / menciones: hoteles del portafolio, proveedores, directorios locales |

> Varios ítems técnicos del `ACTION-PLAN-2026-10.md` (canonical, robots, sitemap, fuentes, llms.txt) ya se aplicaron. Antes de cada fase, revalidar el estado contra el sitio en producción.

---

## 6. Pilares de soporte (necesarios para que lo anterior funcione)

- **Google Business Profile**: categorías, servicios, zonas, fotos semanales, publicaciones, respuesta a reseñas. El paquete local de Maps es la mitad del tráfico en búsquedas "cerca de mí".
- **Reseñas**: proceso post-entrega para pedir reseña en Google a cada cliente.
- **Proyectos como casos de estudio**: plantilla con ubicación, alcance, servicios, antes/después, testimonio.
- **Blog como soporte de clusters**: cada artículo enlaza a su landing de servicio y viceversa. Cadencia sugerida: 2 artículos/mes.
- **Autoridad externa**: menciones de hoteles del portafolio, perfiles en directorios de construcción, alianzas con arquitectos/inmobiliarias.
- **GEO (buscadores con IA)**: respuestas directas, datos concretos (precios, tiempos), FAQ, entidad del negocio consistente, `llms.txt` actualizado con nuevas páginas.

---

## 7. Hoja de ruta 2027 (tentativa)

| Trimestre | Foco | Entregables |
|---|---|---|
| **Nov–Dic 2026** (preparación) | Base y datos | GSC restaurado; investigación de keywords por servicio y zona; inventario de fotos y proyectos con ubicación; decisión Hygraph vs content collections; diseño de plantilla de landing |
| **Q1 2027** | Pilar A + B (fase 1) | Nuevo hub `/servicios`; separar tarjeta de landing; 3–4 landings nuevas de alta demanda (apartamentos, baños, obra blanca, cocinas); reescritura de 2–3 especialidades |
| **Q2 2027** | Pilar B (fase 2) + Pilar C (capa 1) | Resto de especialidades reescritas; landing hoteles/hospitality; 5–6 hubs de zona priorizados; proyectos enriquecidos con ubicación |
| **Q3 2027** | Pilar C (capa 2) | Primeras 20–30 páginas servicio × zona con quality gate; resto de hubs de zona; campaña de reseñas |
| **Q4 2027** | Escalar y optimizar | Ampliar combinaciones con datos de GSC; podar o fusionar páginas sin impresiones; actualizar precios; reporte anual |

---

## 8. Cómo vamos a medir

| KPI | Fuente | Meta a definir en sesión |
|---|---|---|
| Impresiones y clics orgánicos totales | GSC | — |
| Posición promedio de keywords comerciales por servicio | GSC | top 3 en Medellín para servicios prioritarios |
| Páginas de zona con impresiones / clics | GSC | — |
| Leads (formulario + WhatsApp) atribuidos a orgánico | Vercel Analytics + eventos | — |
| Visibilidad en paquete local (Maps) | GBP Insights | — |
| Reseñas en Google | GBP | — |
| Citas en AI Overviews / ChatGPT / Perplexity | Revisión manual mensual | — |

Línea base: tomarla apenas se restaure GSC (dic 2026).

---

## 9. Orden de las sesiones de trabajo

Cada punto se trabaja en una sesión dedicada, en este orden sugerido:

1. **Datos y base**: restaurar GSC, investigación de keywords por servicio y zona, inventario de fotos/proyectos.
2. **Arquitectura de servicios y URLs**: lista final de servicios (familia 1 y 2), estructura de rutas, fuente de datos (Hygraph vs Astro).
3. **Plantilla de landing de servicio**: diseño, componentes, schema. Se prueba con un servicio piloto.
4. **Contenido de las landings** (una por una, con `seo-writer` + `humanizer`).
5. **Hub `/servicios`** rediseñado.
6. **Modelo de datos de zonas y quality gate**.
7. **Hubs de zona** (piloto con 2 zonas, medir, luego escalar).
8. **Servicio × zona** (piloto con 5 combinaciones, medir, luego escalar).
9. **Soporte**: GBP, reseñas, proyectos como casos, enlaces externos.

---

## 10. Validación de competencia en Google (SERP real, nov 2026)

**Fecha de captura:** 2026-11-03 · Google Colombia (`gl=co`, `hl=es`, sin personalización) · top 8 orgánico.
**Limitaciones:** foto de un solo día; no incluye volumen de búsqueda ni el paquete de Maps; la ubicación exacta del buscador influye. Validar con GSC y una herramienta de keywords (Keyword Planner / Ahrefs) antes de priorizar.

> **Nota:** comfortdesign.com.co aparece marcado como **(aliado)**. Comfort Design y Arkava son empresas aliadas: no se cuentan como competencia. La meta es posicionar ambas (ver sección 11).

### 10.1 Quién está #1 por keyword

**Remodelación general**
| Keyword | #1 | #2–#5 | Arkava |
|---|---|---|---|
| remodelaciones medellin | remodelacionesmedellin.com (home) | remodelacionesjc.com · Instagram Remodelaciones Luján · properestudio.com · konkretus (blog) | #7 (artículo del blog) |
| remodelacion de apartamentos medellin | remodelacionesmedellin.com (home) | Instagram @remodelados_oficial · **arkava blog guía** · remodelacionesjc.com | **#3** (blog, no landing) |
| empresa de remodelacion medellin | remodelacionesjc.com (home) | remodelacionesmedellin.com · Instagram @remodelados_oficial · **arkava blog guía** | **#4** (blog) |
| remodelacion de casas medellin | remodelacionesmedellin.com | remodelacionesjc.com · Instagram @remodelados_oficial · aemcolombia.com · konkretus | No aparece |
| remodelacion de baños medellin | remodelacionesjc.com/remodelacion-de-banos | comfortdesign.com.co (muebles de baño) **(aliado)** · pisende.com · arregla.co/medellin/… · aemcolombia.com | No aparece |
| remodelacion de cocinas medellin | comfortdesign.com.co/servicios/cocinas-a-medida/medellin **(aliado)** | remodelacionesmedellin.com/cocinas · Instagram cocinasyensambles · cocinasyreformas.com · coloredesign.com.co | No aparece |
| obra blanca medellin | Instagram @acabados_creativos | remodelacionesmedellin.com/acabados · andaco.com.co/obra-blanca… · estucosypinturas.com.co/obra-blanca | No aparece |
| acabados arquitectonicos medellin | iarquitectonico.com | estucosypinturas.com.co (blog) · arquitecturavisual.com.co · Instagram idearteacabados · arquedeco.com | **#6** (`/servicios`) |

**Zonas (SEO programático)**
| Keyword | #1 | #2–#5 | Arkava |
|---|---|---|---|
| remodelaciones envigado | aluzinaa.com/remodelaciones-envigado | arregla.co/envigado/… · comfortdesign.com.co/…/envigado **(aliado)** · Instagram kaizen_reformas · remodevalle.com/remodelaciones-envigado (#6) | No aparece |
| remodelaciones sabaneta | arregla.co/sabaneta/… | remodevalle.com/remodelaciones-sabaneta · comfortdesign.com.co/…/sabaneta **(aliado)** · posts de Instagram | No aparece |
| remodelaciones el poblado | remodelacionesmedellin.co/remodelaciones-el-poblado (**hoy devuelve 404**) | aluzinaa.com/diseno-interior-el-poblado · remodelados.co · remodelacionesmedellin.com | No aparece |
| remodelaciones laureles medellin | remodelacionesmedellin.co/remodelaciones-laureles | comfortdesign.com.co/…/laureles **(aliado)** · Instagram remodelados · remodelados.co · reformasmedellin.com.co | No aparece |
| remodelaciones itagui | Instagram remodelacionesdelsur | comfortdesign.com.co/…/itagui **(aliado)** · remodelacionesjc.com · remodevalle.com/remodelaciones-itagui · arregla.co | No aparece |
| remodelaciones bello | remodelacionesjc.com | espaciosyremodelaciones.com · Instagram domoremodelaciones · turemodelacionmedellin.com/remodelacion-en-bello · arregla.co | No aparece |

**Especialidades**
| Keyword | #1 | #2–#5 | Arkava |
|---|---|---|---|
| pintura de apartamentos medellin | pintufresh.com | estucosypinturas.com.co/pintores… · tupintormedellin.com · Instagram pintoresenmedellin · pintamos.com.co | No aparece |
| pintura de apartamento sabaneta | arregla.co/sabaneta/pintores… | tupintormedellin.com/pintor-en-sabaneta · destapando.com/sabaneta/… · pintamos.com.co · estucosypinturas.com.co (blog) | No aparece |
| enchape medellin | pisende.com (tienda) | degrescolombia.com · Instagram petrea_concreto · petreaconcreto.com · remodelacionesjc.com/instalacion-de-enchapes… | No aparece |
| enchape de baños medellin | pisende.com (tienda) | degrescolombia.com · corona.co · remodelacionesjc.com/instalacion… · gruposolupisos.com | No aparece |
| cielo raso medellin | pavilac.com/cielo-raso-pvc (fabricante) | Instagram importpvcmedellin · jmgespaciosenpvc.com · homecenter.com.co · gruposanpio.com | **#7** (`/servicios/cielo-raso`) |

**Pendientes por validar** (Google limitó las consultas automáticas): muros en drywall, estuco, microcemento, carpintería a medida, closets a medida, remodelación de hoteles, remodelación de locales, diseño de interiores, "cuánto cuesta remodelar un apartamento", enchape Envigado, cielo raso Sabaneta, remodelación Rionegro. Revisarlas a mano o en GSC en la sesión 1.

### 10.2 Cómo son las páginas que ganan

| Página #1–#3 | Tipo | Palabras | Schema | Elementos que se repiten |
|---|---|---|---|---|
| remodelacionesmedellin.com | Home con dominio exacto | ~870 | FAQPage, OfferCatalog, GeoCoordinates, OpeningHours | Reseñas, servicios, cómo planificar, FAQ, "Valle de Aburrá", CTA de cotización |
| remodelacionesjc.com/remodelacion-de-banos | Landing de servicio | ~730 | Service, BreadcrumbList, Offer | H1 con servicio + ciudad, proceso por pasos, contacto |
| remodevalle.com/remodelaciones-sabaneta | Página de zona | ~1.340 | HomeAndConstructionBusiness, AdministrativeArea, FAQPage, Breadcrumb | Necesidades del cliente, servicios en la zona, proceso, ideas, "trabajamos en Sabaneta y conectamos el valle", FAQ local, CTA local |
| arregla.co/sabaneta/remodelacion-de-apartamentos… | Servicio × zona (16 municipios) | ~1.170 | LocalBusiness, City, FAQPage, Breadcrumb | Qué incluye, cómo trabajamos, otros servicios en la zona, cifra de trabajos ("2.000 reparaciones"), FAQ |
| comfortdesign.com.co/…/remodelacion-apartamento/envigado (**aliado**, referencia interna) | Servicio × zona | ~1.050 | LocalBusiness, AggregateOffer, FAQPage, AdministrativeArea | **Precio en el title** ("Desde $18M"), tabla de precios, barrios atendidos, testimonios de la zona, otras zonas, FAQ |
| tupintormedellin.com/pintor-en-sabaneta | Servicio × zona | ~1.300 | AggregateRating, FAQPage, AdministrativeArea | Garantía escrita en el title, proceso en 4 pasos, "+7 trabajos en Sabaneta", barrios atendidos, FAQ |
| aluzinaa.com/remodelaciones-envigado | Página de zona | ~490 | LocalBusiness, GeoCoordinates | Permisos de obra, barrios de Envigado, otras zonas |

### 10.3 Qué nos dice esto

1. **El SEO programático por zona ya funciona en este mercado.** En todas las búsquedas por municipio, los primeros lugares son páginas de zona o de servicio × zona (arregla.co, remodevalle.com, tupintormedellin.com y la aliada Comfort Design). El Pilar C queda validado.
2. **La competencia es floja.** Perfiles de Instagram aparecen en el top 5 de casi todas las búsquedas, una página #1 (remodelaciones El Poblado) devuelve 404 y casi ninguna landing pasa de 1.300 palabras. Una página con proyectos reales, fotos propias y datos concretos puede competir.
3. **Arkava ya rankea #3–#4 en búsquedas principales, pero con un artículo del blog.** "remodelación de apartamentos Medellín" y "empresa de remodelación Medellín" se ganan creando la landing de servicio y enlazándola desde ese artículo. Es la oportunidad más rápida del plan.
4. **Las búsquedas de material son de tiendas.** "enchape medellín" y "cielo raso medellín" las dominan pisende, degres, corona, pavilac y homecenter (intención de compra de producto). Arkava debe apuntar a la variante de servicio: "instalación de enchape", "enchape de baño precio", "cielo raso en drywall instalado", "remodelación de baño".
5. **Pintura es un nicho de especialistas** (pintufresh, tupintormedellin, pintamos, estucosypinturas) con páginas por zona. Se compite con páginas servicio × zona, no solo con la landing general.
6. **Hoy los que ganan usan precio y garantía en el title** ("Desde $18M", "Cotización y garantía escrita"). Eso sube el CTR.
7. **El patrón de URL que gana es corto y con la zona al final**: `/remodelaciones-sabaneta`, `/pintor-en-sabaneta`, `/servicio/zona`. Sirve para decidir la estructura de URL (sesión 2).

### 10.4 Lo mínimo para competir por el #1 (checklist de cada página)

Basado en lo que comparten las páginas que hoy están arriba, y lo que les falta:

- [ ] H1 y title con servicio + zona; precio "desde" o garantía en el title
- [ ] 1.200–1.600 palabras útiles (por encima del techo actual de la competencia)
- [ ] Qué incluye el servicio, proceso por pasos, precios de referencia en tabla
- [ ] Barrios/sectores atendidos en la zona
- [ ] **Proyectos reales con fotos propias** en la zona o del servicio (casi ningún competidor lo tiene: es la ventaja de Arkava)
- [ ] Testimonio o reseña local
- [ ] FAQ local (5–8) + `FAQPage`
- [ ] `Service` + `BreadcrumbList` + `areaServed` con `AdministrativeArea`/`City` de la zona
- [ ] Bloques "otros servicios en esta zona" y "este servicio en otras zonas" (enlazado interno en malla)
- [ ] CTA local (WhatsApp + formulario)
- [ ] Reseñas en Google Business Profile (el paquete de Maps no se midió aquí, pero en búsquedas locales aparece arriba de los orgánicos)

### 10.5 Competidores a seguir

| Competidor | Por qué vigilarlo |
|---|---|
| remodelacionesmedellin.com / .co | Dominio exacto; #1 en búsquedas principales; páginas por barrio (El Poblado, Laureles) |
| remodelacionesjc.com | #1 en "empresa de remodelación", baños y Bello; landings por servicio |
| arregla.co | Programático en 16 municipios × servicios; el modelo más escalado |
| remodevalle.com | Páginas de zona de 1.300+ palabras con FAQ y schema completos |
| tupintormedellin.com / pintufresh.com | Referentes en pintura por zona |
| aluzinaa.com | Diseño interior + permisos de obra en Envigado y El Poblado (segmento cercano al de Arkava) |

### 10.6 Búsquedas que faltaban (complemento, nov 2026)

**Fuente:** búsqueda web extendida (no es el SERP exacto de Google Colombia; el orden es aproximado). Sirve para saber **quién compite**; la posición exacta se confirma en GSC.

| Keyword | Quién aparece | Lectura |
|---|---|---|
| muros en drywall medellin | arregla.co/medellin/drywall… · tudrywallmedellin.com · tecniedificazmedellin.com · estucosypinturas.com.co (5 posts de 2018–2019) · destapando.com | Competencia débil: blogs viejos y técnicos independientes. arregla.co publica precio ($60.000–90.000/m²) |
| estuco y pintura medellin | estucosypinturas.com.co (estucadores, obra blanca) · pintamos.com.co/estuco · remodelacionesmedellin.com/acabados · tupintormedellin.com | Nicho de especialistas en pintura |
| microcemento medellin | jydacabados.com/microcemento-medellin (+ posts por cocina y baño) · estucosypinturas.com.co/microcemento · microcemento-medellin.ueniweb.com · versacrete.co · ppbingenieria.com | Pocas empresas de acabados premium. Encaja con muros decorativos de Arkava |
| carpintería / closets a medida medellin | carpinteriajj.org · sequoiacarpinteria.com · tucarpinteromedellin.com · carpinteria.com.co · arregla.co · Comfort Design (aliado) | Lo cubre Comfort Design (ver sección 11) |
| remodelación de hoteles medellin | Ninguna empresa especializada: aparecen remodeladoras generales (remodelacionesjc, reformasintegrales, grupoarkco, artesiaconstrucciones) | **Nadie lo cubre bien.** Arkava tiene 4 hoteles en portafolio. Único competidor de nicho: aluzinaa.com (guías de hoteles boutique, glamping, renta corta) |
| remodelación de locales comerciales medellin | reformasintegrales.com.co/medellin/remodelacion-de-locales… · concivilaceros.com · grupoarkco.com · artesiaconstrucciones.com · properestudio.com | Páginas viejas (2+ años), sin proyectos reales |
| diseño de interiores medellin | arquitecturaeinteriorismomedellin.com · coloredesign.com.co · Comfort Design (aliado, home, proyectos y blog con precios) · estucosypinturas.com.co | Lo lidera Comfort; Arkava no debería competir de frente |
| cuánto cuesta remodelar un apartamento en medellín | blog.urbansa.co · presucosto.com · turemodelacionmedellin.com (precios por tamaño) · tupintormedellin.com · inspirame.corona.co · onegrupo.co | Búsqueda informativa con precios. Arkava ya tiene la guía en el blog: actualizarla con tabla por tamaño y gama |
| enchape baños envigado | corona.co · ayda.com.co · remodelacionesjc.com/instalacion-de-enchapes… · presupuestalo.com.co · blogs de material | Sin página local dedicada en Envigado: oportunidad servicio × zona |
| cielo raso drywall sabaneta | techos.com.co · pinturasyyesos.com · guías técnicas genéricas | Sin página local dedicada en Sabaneta: oportunidad servicio × zona |
| remodelación rionegro / llanogrande | hjmconstructora.com · Páginas Amarillas · inmobiliarias · aluzinaa.com (diseño de lujo Rionegro, interiorismo Llanogrande) | **Casi vacío.** Segmento de casas campestres premium, encaja con el perfil de Arkava |
| mantenimiento locativo medellín | solucionesymantenimiento.com · solucionesazur.com · soluman.co · smd.com.co · ofertas de empleo | B2B (oficinas, retail, edificios). Hoteles como caso de entrada |

### 10.7 Tamaño de la competencia (sitemaps públicos, nov 2026)

| Sitio | Páginas de servicio | Páginas de zona | Blog | Modelo |
|---|---|---|---|---|
| arregla.co | ~21 servicios | 21 zonas (municipios + barrios como Manrique, Aranjuez, Guayabal) × ~21 servicios ≈ 440 páginas | 60 | Marketplace programático a escala |
| tupintormedellin.com | 6 (apartamentos, casas, fachadas, epóxica, locales, oficinas) | 15 municipios (incluye Oriente) | 7 | Nicho pintura + zonas |
| remodevalle.com | 5 (apartamentos, baños, cocinas, obra blanca, locales) | 4 (Envigado, Itagüí, La Estrella, Sabaneta) | — | Servicios + zonas, páginas de 1.300 palabras |
| remodelacionesmedellin.co | — | 6 (Belén, El Poblado, Envigado, Itagüí, Laureles, Sabaneta) | sí | Solo zonas (algunas en 404) |
| remodelacionesmedellin.com | 7 (acabados, baños, casas-apartamentos, cocinas, drywall, locales-oficinas, pintura-estuco) | — | 3 | Dominio exacto + servicios |
| remodelacionesjc.com | 11 (incluye plomería y electricidad) | — (zonas en el H1 del home) | — | Servicios |
| aluzinaa.com | Diseño interior + guías por nicho (hoteles boutique, glampings, renta corta, restaurantes, clínicas) | 4 (El Poblado, Envigado, Sabaneta-Laureles, Rionegro/Llanogrande) | sí | Nicho premium y hospitality |
| estucosypinturas.com.co | ~40 servicios | posts por zona | ~385 posts | Volumen de contenido (mucho viejo) |
| **arkava.com.co** | **8 (de ~69 palabras)** | **0** | **7** | — |

**Lectura:** nadie combina las tres cosas que Arkava puede tener: **landings profundas por servicio + páginas por zona + proyectos reales premium (hoteles)**. arregla.co gana por volumen, pero es un marketplace de reparaciones sin portafolio. Esa es la brecha a ocupar.

---

## 11. Alianza Arkava + Comfort Design

Arkava y Comfort Design son empresas aliadas (familia) y trabajan juntas. **No son competencia: el objetivo es que las dos ocupen los primeros lugares** y que entre ambas lleguen a más clientes. Dos resultados aliados en el top 10 de la misma búsqueda significan más participación total.

### Fortalezas actuales de cada una en Google (según la sección 10)
| | Comfort Design | Arkava |
|---|---|---|
| Ya rankea en | cocinas a medida, muebles de baño, diseño de interiores, remodelación de apartamento × zona (Envigado, Sabaneta, Itagüí, Laureles, Bello) | remodelación de apartamentos (blog #3), empresa de remodelación (blog #4), acabados arquitectónicos (#6), cielo raso (#7) |
| Especialidad natural | Mobiliario a medida, cocinas, closets, diseño interior | Obra y acabados: obra blanca, estuco, pintura, enchape, drywall, cielo raso, muros decorativos/microcemento, hospitality, locales, mantenimiento |

### Reparto
- **Arkava se enfoca en la "obra"**: acabados, obra blanca, especialidades técnicas, **carpintería arquitectónica**, remodelación integral, hoteles, locales comerciales, mantenimiento de planta física.
- **Comfort se enfoca en "mobiliario y diseño"**: cocinas, closets, muebles de baño, diseño de interiores.
- **Terreno compartido** (remodelación de apartamentos, baños, cocinas): las dos pueden tener página, pero con ángulos distintos para no copiarse (Arkava: obra y acabados; Comfort: diseño y mobiliario). Contenido 100% diferente entre sitios.
- **Zonas**: coordinar el orden de lanzamiento para que cada zona tenga presencia de ambas marcas con servicios distintos.
- **Enlaces cruzados naturales** donde ayuden al cliente (ej. Arkava "remodelación de cocina" → Comfort para el mobiliario; Comfort "remodelación de baño" → Arkava para enchape). Pocos, contextuales, nunca en footer de todas las páginas.

### Decisiones (2026-11-03)
- **La carpintería se queda en Arkava** como servicio propio. Para no competir con Comfort en la misma página, el ángulo de Arkava es **carpintería arquitectónica dentro de la obra**: puertas, revestimientos en madera, mobiliario fijo y carpintería para hoteles y locales. Comfort mantiene el ángulo de mobiliario a medida y diseño (cocinas, closets, muebles de baño). Las dos páginas deben tener textos, fotos y keywords principales distintas.
- **Cuando las dos marcas aparecen en la misma búsqueda, se refuerzan.** Las dos pueden apuntar a remodelación integral, de apartamentos, de baños y de cocinas. La meta es ocupar dos posiciones del top 10, cada una con su ángulo. Regla: nunca duplicar textos entre sitios ni publicar páginas casi iguales.
- **Proyectos compartidos: solo algunos.** Los proyectos donde trabajaron juntas se publican como caso en ambos sitios cuando aplique, con enfoque distinto (Arkava: obra y acabados; Comfort: diseño y mobiliario), fotos distintas cuando sea posible y un enlace al caso de la otra marca. No todos los proyectos se comparten; se decide caso por caso.

---

## 12. Keywords priorizadas para ganar posiciones

Prioridad según: intención comercial · debilidad de la competencia · activos que Arkava ya tiene (rankings actuales, proyectos, hoteles). **Sin volúmenes todavía**: se completan con GSC + Keyword Planner en la sesión 1 y se reordenan si hace falta.

### Prioridad 1: ganables rápido (Arkava ya aparece o la competencia es floja)
| Keyword principal | Variantes | Página destino | Por qué |
|---|---|---|---|
| remodelación de apartamentos medellín | remodelación integral apartamento, remodelar apartamento medellín | Nueva landing "Remodelación de apartamentos" | Arkava #3 con el blog; la landing + enlace desde la guía puede subir al top 1–2 |
| empresa de remodelación medellín | empresa de remodelaciones, contratista de remodelación | Home + landing de remodelación integral | Arkava #4 con el blog |
| acabados arquitectónicos medellín | acabados de lujo medellín, acabados premium | Hub `/servicios` / home | Arkava #6; es la identidad de marca |
| obra blanca medellín | acabados obra blanca, obra blanca apartamento nuevo | Nueva landing "Obra blanca" | El #1 es un perfil de Instagram |
| remodelación de hoteles medellín | remodelación hotelera, acabados para hoteles, hospitality | Nueva landing "Hoteles y hospitality" | Nadie especializado; Arkava tiene Hunters, Heiss, Nakua, Calle Flora |
| cielo raso en drywall medellín | instalación cielo raso drywall, cielo raso RH | Landing cielo raso (reescrita) | Arkava #7 en la búsqueda general; la variante de instalación no la dominan tiendas |

### Prioridad 2: especialidades con competencia media
| Keyword principal | Variantes | Página destino |
|---|---|---|
| remodelación de baños medellín | enchape de baño precio, remodelar baño pequeño | Nueva landing "Remodelación de baños" |
| muros en drywall medellín | instalación drywall, divisiones en drywall, superboard | Landing drywall (reescrita) |
| estuco y pintura medellín | estucadores medellín, pintura de interiores | Landings estuco y pintura (reescritas) |
| microcemento medellín | microcemento baños, microcemento pisos | Landing muros decorativos o subpágina microcemento |
| instalación de enchapes medellín | enchape porcelanato, enchape gran formato | Landing enchape (reescrita, ángulo instalación, no producto) |
| remodelación de locales comerciales medellín | adecuación de locales, remodelación de oficinas | Nueva landing "Locales comerciales" |
| mantenimiento locativo medellín | mantenimiento de planta física, reparaciones locativas | Nueva landing "Mantenimiento" (B2B) |
| cuánto cuesta remodelar un apartamento en medellín | precio m² remodelación, presupuesto remodelación | Guía del blog actualizada (tabla por tamaño y gama) |
| muros decorativos medellín | estuco veneciano, porcelanato líquido | Landing muros decorativos (reescrita) |

### Prioridad 3: zonas (Pilar C), orden sugerido
| Zona | Keyword | Por qué en este orden |
|---|---|---|
| El Poblado | remodelaciones el poblado | El #1 actual da 404; zona premium, perfil exacto de Arkava |
| Rionegro / Llanogrande / El Retiro | remodelación casas campestres rionegro, llanogrande | Casi vacío; proyecto existente en El Retiro |
| Envigado | remodelaciones envigado | Alta demanda; competencia de páginas medianas (~500–1.300 palabras) |
| Sabaneta | remodelaciones sabaneta, obra blanca sabaneta | Apartamentos nuevos → obra blanca |
| Laureles | remodelaciones laureles | Casas y apartamentos de renovación |
| Itagüí, La Estrella, Belén, Bello | remodelaciones {zona} | Segunda ola |

**Servicio × zona (primeras combinaciones a validar):** obra blanca Sabaneta · enchape Envigado · cielo raso Sabaneta · pintura de apartamento El Poblado · remodelación de apartamentos El Poblado · remodelación de casas Llanogrande.

### No perseguir de frente (por ahora)
| Keyword | Motivo | Alternativa |
|---|---|---|
| enchape medellín / enchape de baños medellín | Dominado por tiendas (Pisende, Degres, Corona): intención de comprar material | "instalación de enchapes", "enchape de baño precio" |
| cielo raso medellín (sin más) | Fabricantes de PVC y Homecenter | "cielo raso en drywall instalado" |
| pintura de apartamentos medellín (general) | Nicho de especialistas en pintura muy activos | Páginas pintura × zona y pintura dentro de remodelación integral |
| diseño de interiores medellín, closets / cocinas a medida | Terreno principal de Comfort Design (aliado) | Arkava ataca "carpintería arquitectónica medellín" y "carpintería para hoteles"; enlaza a Comfort donde aplique |
