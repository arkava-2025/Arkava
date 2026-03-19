# AUDITORÍA SEO COMPLETA — ARKAVA
**Fecha:** 18 de marzo de 2026
**Sitio:** https://arkava.com.co
**Framework:** Astro 5 + React + Hygraph CMS
**Auditor:** Agente SEO Arkava

---

## SCORE GENERAL: 64 / 100

| Pilar | Peso | Score | Puntos |
|---|---|---|---|
| 1. Técnico | 25% | 78/100 | 19.5 |
| 2. On-Page SEO | 20% | 65/100 | 13.0 |
| 3. Contenido / E-E-A-T | 25% | 58/100 | 14.5 |
| 4. Schema / Datos Estructurados | 10% | 72/100 | 7.2 |
| 5. Performance / CWV | 10% | 50/100 | 5.0 |
| 6. Imágenes | 5% | 55/100 | 2.75 |
| 7. AI Search Readiness | 5% | 70/100 | 3.5 |
| 8. SEO Local (bonus) | — | 62/100 | — |
| **TOTAL** | | | **65.45 ≈ 64** |

---

## TOP 5 ISSUES CRÍTICOS (bloquean posicionamiento)

### CRÍTICO-1: Videos del Hero sin `poster` — CWV bloqueado
**Archivo:** `src/components/organisms/Hero.astro:9-25`
Dos videos con `autoplay`, `preload="auto"` y **sin atributo `poster`**. El navegador descarga ambos videos completos desde el servidor al cargar la página, incluso el que está oculto (`hidden md:flex`). Esto dispara el LCP (Largest Contentful Paint) en segundos. Google penaliza fuertemente cuando LCP supera 2.5s. El video móvil y el de escritorio se descargan simultáneamente en ambos breakpoints.

### CRÍTICO-2: H1 invisible en servicios — señal semántica perdida
**Archivos:** Todos los servicios (`pintura.astro:39`, `enchape.astro:39`, `estuco.astro:39`, `cielo-raso.astro:39`, `carpinteria.astro:43`, `muros-drywall.astro:46`, `muros-decorativos.astro:39`, `argamasa.astro:42`)
En modo standalone (acceso directo a `/servicios/pintura`, etc.), el H1 está con clase `sr-only` — invisible para el usuario, visible solo para lectores de pantalla. En los componentes de layout del servicio, el título principal se renderiza como **H2** (no H1). Google usa el H1 visible como señal on-page principal. Tener el H1 oculto con sr-only cuando hay un H2 visible con el mismo keyword es una mala práctica que diluye la señal.

### CRÍTICO-3: Número de teléfono inconsistente en `contacto.astro`
**Archivo:** `src/pages/contacto.astro:61,127`
- Visible en UI: `3207672761` (sin prefijo +57)
- En microdata LocalBusiness oculto: `+57 312 222 22 22` (número diferente, claramente placeholder)
- En `BaseLayout.astro`: teléfono dinámico desde Hygraph CMS

Esto crea inconsistencia NAP (Name, Address, Phone) — factor de ranking local crítico. Google y GMB detectan la discrepancia entre el número visible y el del schema.

### CRÍTICO-4: Imágenes de servicios sin `loading="lazy"` ni formato moderno
**Archivos:** Todos los archivos en `src/pages/servicios/*.astro`
Las imágenes usan etiquetas `<img>` nativas (no el componente `<Image>` de Astro) y **ninguna tiene atributo `loading`**. Por defecto el navegador las carga como `eager`. En páginas de servicio con 3+ imágenes grandes de Hygraph/Cloudinary sin optimizar, esto genera un Core Web Vitals deficiente. Tampoco hay conversión a WebP/AVIF via Astro Image.

### CRÍTICO-5: Homepage sin meta description explícita ni title personalizado desde CMS
**Archivo:** `src/pages/index.astro:26`
```astro
<BaseLayout title={page?.title ?? 'Arkava'}>
```
El title se toma de `page?.title` del CMS (Hygraph) sin pasar `description`. Si el campo `title` del CMS está vacío o es genérico, Google renderiza solo "Arkava" como title. No se pasa `description` al BaseLayout desde index, lo que fuerza el fallback del BaseLayout (que sí tiene uno por defecto), pero sin control explícito por página desde el código.

---

## TOP 5 QUICK WINS (implementación rápida)

### QW-1: Agregar `poster` a los videos del Hero (30 min)
Exportar un frame del video como JPG/WebP y agregar `poster="/images/hero-poster-mobile.webp"` y `poster="/images/hero-poster-desktop.webp"`. Esto mejora el LCP inmediatamente y evita el flash de pantalla en blanco.

### QW-2: Agregar `loading="lazy"` a todas las imágenes de servicios (20 min)
En cada `<img>` dentro de los 8 archivos de servicios, agregar `loading="lazy"`. Las imágenes están below-the-fold (debajo del header). Esto reduce el peso inicial de carga.

### QW-3: Corregir número de teléfono en `contacto.astro` (5 min)
Reemplazar `+57 312 222 22 22` en la microdata de `contacto.astro:127` por el número real consistente con el CMS y la UI visible.

### QW-4: Agregar BreadcrumbList schema en páginas de servicio (45 min)
Implementar `BreadcrumbList` en `ConditionalLayout.astro` cuando está en modo standalone. Ejemplo: Inicio > Servicios > Pintura. Esto mejora los snippets en SERP.

### QW-5: Añadir `<link rel="preload">` para el video hero (15 min)
Agregar en `BaseLayout.astro` (o en `Hero.astro` via `<head>`) un preload condicional para el video crítico arriba del fold, reduciendo el tiempo hasta que el LCP es visible.

---

## HALLAZGOS DETALLADOS POR PILAR

---

### PILAR 1: TÉCNICO (Score: 78/100)

#### Lo que funciona bien
- **`robots.txt`** existe en `/public/robots.txt` y es correcto: permite todo, bloquea `/404`, `/draft/`, `/_astro/`. El sitemap referenciado apunta a `https://arkava.com.co/sitemap-index.xml`. ✓
- **`site:` en astro.config.mjs** configurado correctamente como `https://arkava.com.co`. ✓
- **Sitemap automático** generado via `@astrojs/sitemap` con `i18n: { defaultLocale: 'es', locales: { es: 'es-CO' } }`. Filtra `/404` y `/draft`. ✓
- **Canonical URL** configurado en `BaseLayout.astro:94` con `Astro.url.href` por defecto. ✓
- **`<html lang="es-CO">`** configurado correctamente. ✓
- **Open Graph completo:** `og:type`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`, `og:locale` (es_CO). ✓
- **Twitter Card** configurado con `summary_large_image`. ✓
- **Favicons:** ico + png presentes. ✓
- **Preload de fuentes críticas** en BaseLayout para PPSupplySans y Helvetica. ✓
- **`font-display: swap`** en todos los @font-face de `fonts.css`. ✓
- **Google Search Console verification** file presente: `public/google21dbef902e6f00c8.html`. ✓

#### Problemas encontrados

**T-1 (ALTO): Sin `hreflang` explícito en el `<head>`**
Aunque el sitemap tiene `i18n` configurado, no hay etiquetas `<link rel="alternate" hreflang="es-CO">` en el `<head>` del HTML. Para un sitio monoidioma en Colombia esto es menor, pero Google recomienda la implementación explícita para mercados locales.

**T-2 (MEDIO): OG image usa URL de blob storage externa, no imagen branded**
`BaseLayout.astro:23`: El fallback OG usa `https://jbmqxuofkzwe1rde.public.blob.vercel-storage.com/contacto.webp`. No existe `/public/og-image.jpg` branded de 1200x630px. El propio código lo indica en el comentario `// Imagen OG por defecto — reemplazar con imagen branded`. Esto afecta la apariencia en redes sociales y CTR desde compartidos.

**T-3 (BAJO): Sin `meta name="robots"` explícito**
No hay `<meta name="robots" content="index, follow">` en el head. Si bien Google indexa por defecto, es buena práctica declararlo explícitamente para evitar herencias incorrectas en páginas dinámicas.

**T-4 (BAJO): Fuentes en formato OTF/TTF, no WOFF2**
Los archivos de fuente en `/public/fonts/` son `.otf` y `.ttf`. WOFF2 tiene mejor compresión (30-40% menor) y es soportado por el 97%+ de navegadores modernos. Esto afecta el tiempo de carga de fuentes.

---

### PILAR 2: ON-PAGE SEO (Score: 65/100)

#### Análisis de Titles

| Página | Title actual | Chars | Evaluación |
|---|---|---|---|
| Homepage | `{page?.title}` desde CMS | Desconocido | ⚠ Sin control en código |
| Sobre nosotros | `Arkava | Quiénes Somos — Empresa de Remodelación en Medellín` | 57 | ✓ OK |
| Contacto | `Contacta a Arkava | Remodelación y Acabados en Medellín` | 56 | ✓ OK |
| Servicios (index) | `Servicios de Remodelación y Acabados | Arkava Medellín` | 53 | ✓ OK |
| Servicios/pintura | `{title} en Medellín | Acabados Arkava` | ~40 chars | ⚠ Corto, depende del CMS |
| Proyectos index | `{metaTitle}` desde CMS o fallback | Variable | ⚠ Sin control en código |
| Proyectos [slug] | `{title} | Proyecto Arkava Medellín` | Variable | ✓ OK patrón |

**Problema principal:** Los titles de servicios son dinámicos: `${title} en Medellín | Acabados Arkava`. Si el CMS devuelve "Pintura" el title sería "Pintura en Medellín | Acabados Arkava" (37 chars) — demasiado corto. Debería ser "Servicio de Pintura de Interiores en Medellín | Arkava" para maximizar keywords.

#### Análisis de Meta Descriptions

| Página | Situación |
|---|---|
| Homepage | Usa fallback del BaseLayout (168 chars) — OK en longitud, pero no hay descripción específica desde index.astro |
| Sobre nosotros | Explícita y buena (167 chars, tiene CTA implícito) ✓ |
| Contacto | Explícita y excelente — tiene CTA "agenda una visita técnica sin costo" ✓ |
| Cada servicio | Hardcoded en cada archivo con ~150 chars ✓ |
| Proyectos [slug] | Dinámica: `relatedProject.description.slice(0, 155)` — puede ser cruda/no optimizada |

#### Análisis de H1

**P-1 (CRÍTICO): Servicios standalone — H1 visible es un H2**

En `pintura.astro` y todos los demás servicios:
- Línea 39: `<h1 class="sr-only">{title} — Servicio de Acabados Arkava Medellín</h1>` — oculto
- Línea 52-55 (dentro del Section): `<h2 class="text-5xl...">PINTURA</h2>` — visible

El H2 visible es solo el nombre del servicio en mayúsculas sin keyword local. El H1 correcto está oculto. Google puede percibir esto como keyword stuffing oculto.

**P-2 (MEDIO): Homepage — H1 viene del CMS sin control en código**

El H1 de la homepage viene del componente `Hero.astro:40-44` que renderiza `data?.title` desde Hygraph. No hay fallback hardcodeado ni validación en el código si el CMS lo devuelve vacío.

**P-3 (BAJO): Sobre Nosotros — H2 mal jerarquizado**

`sobre-nosotros.astro:31`: `<h2 class="...">Acabados arquitectónicos de alto nivel en Medellín</h2>` — Este subtítulo semánticamente debería ser un `<p>` o mantenerse como H2, pero luego los tres cards usan texto sin heading, lo cual está bien.

#### Análisis de URLs

Todas las URLs son descriptivas en español:
- `/servicios/pintura`, `/servicios/enchape`, `/servicios/cielo-raso`, etc. ✓
- `/proyectos/[slug]` — dinámico desde CMS ✓
- `/sobre-nosotros`, `/contacto` ✓

**P-4 (MEDIO): No hay internal linking entre páginas de servicio**

Ningún archivo de servicio individual enlaza a otros servicios relacionados. Un usuario en `/servicios/pintura` no ve links a `/servicios/estuco` o `/servicios/muros-decorativos`. Esto limita la distribución de PageRank interno y el crawling.

**P-5 (MEDIO): Proyectos no tienen breadcrumb visible**

Las páginas `/proyectos/[slug]` no tienen ni breadcrumb visual ni schema BreadcrumbList.

---

### PILAR 3: CONTENIDO / E-E-A-T (Score: 58/100)

#### Problemas de contenido thin

**C-1 (ALTO): Páginas de servicio son mayoritariamente visuales con poco texto**

Cada página de servicio (`/servicios/pintura`, etc.) contiene:
- Un H2 con el nombre del servicio
- Un párrafo de descripción proveniente del CMS (longitud desconocida — puede ser 50-100 palabras)
- 2-3 imágenes

El contenido textual total es mínimo. Google clasifica estas páginas como "thin content" si el texto no supera las 300 palabras. No hay beneficios del servicio listados, no hay proceso explicado, no hay preguntas frecuentes específicas por servicio, no hay llamadas de materiales o técnicas.

**C-2 (ALTO): Hoteles nombrados en CLAUDE.md pero ausentes del sitio**

La propuesta de valor de Arkava menciona "Hoteles Hunters, Heiss, Nakua, Calle Flora" como portfolio de hospitalidad. En el código del sitio, ninguno de estos hoteles aparece mencionado por nombre en ninguna página o componente. La sección de historia solo dice "proyectos hoteleros en Medellín" de forma genérica. Esto es E-E-A-T perdido — citar proyectos verificables con nombre es señal de autoridad real.

**C-3 (MEDIO): Años de experiencia inconsistentes**

- `OurHistory.astro`: La historia arranca en 2020 (fundación). A 2026 son 6 años.
- `BaseLayout.astro` meta description: "más de 10 años de experiencia" en la page de Sobre Nosotros.
- `Experiencia.astro`: `data.anosExperiencia` viene dinámico del CMS — no podemos validar.

Si el CMS dice "10 años" pero la historia del sitio muestra fundación en 2020, hay una contradicción que dañará la credibilidad (E-E-A-T) ante Google y ante usuarios.

**C-4 (MEDIO): Imágenes de historia usan Unsplash genéricas**

`OurHistory.astro:8,14,21,28`: Las 4 imágenes de la timeline son de Unsplash (fotos de stock de personas en oficinas y reuniones). No muestran proyectos reales de Arkava. Para E-E-A-T, las imágenes de obra real tienen mucho más peso que stock genérico.

**C-5 (BAJO): Testimonios tienen nombres que suenan internacionales**

Los testimonios en el CMS de content incluyen "Marcus Chen" y "Sarah Jenkins" — nombres que no corresponden al mercado colombiano. Si bien el contenido en español es adecuado, los nombres pueden generar desconfianza en un usuario de Medellín. El testimonio de "Carolina Gómez" y otros locales sí son creíbles.

#### Lo que funciona bien en E-E-A-T

- Historia real de la empresa (2020-2025) con datos concretos: 25 empleados directos, 15 indirectos. ✓
- FAQs con respuestas específicas sobre contratos, pólizas, pagos por etapas. ✓
- Metodología de 5 etapas bien documentada. ✓
- Testimonios mencionan barrios reales: El Poblado, Laureles. ✓
- Misión y visión presentes en Sobre Nosotros. ✓

#### Menciones geográficas

El sitio menciona Medellín consistentemente pero hay poca granularidad de barrios/zonas en las páginas principales. Solo los testimonios mencionan El Poblado y Laureles. La página de contacto menciona "Medellín, Envigado, Itagüí, Sabaneta, Bello" en la microdata oculta pero no en contenido visible indexable.

---

### PILAR 4: SCHEMA / DATOS ESTRUCTURADOS (Score: 72/100)

#### Lo que funciona bien

**LocalBusiness Schema** — `BaseLayout.astro:37-71`
Presente en todas las páginas. Incluye:
- `@type: LocalBusiness`
- `name`, `description`, `url`
- `telephone` (dinámico desde CMS)
- `email` (dinámico desde CMS)
- `address` con `PostalAddress` (Medellín, Antioquia, CO)
- `areaServed` con City y AdministrativeArea
- `priceRange: "$$"`
- `hasOfferCatalog` con 8 servicios listados ✓

**Service Schema** — Todos los servicios individuales
Cada página de servicio genera un schema `Service` con: `name`, `description`, `provider` (LocalBusiness), `areaServed`, `serviceType`. ✓

**FAQPage Schema** — `FaqHome.astro:10`
Implementado correctamente con microdata (`itemscope`, `itemtype`, `itemprop`). Tiene 8 preguntas reales. ✓

**AggregateRating / Review Schema** — `TestimonialsHome.astro:21-37`
Implementado en JSON-LD con `LocalBusiness`, `aggregateRating` (5/5), y reviews individuales. ✓

#### Problemas encontrados

**S-1 (ALTO): Sin BreadcrumbList schema**
No existe en ninguna página. Las páginas de servicio (`/servicios/pintura`) y de proyectos (`/proyectos/[slug]`) deberían tener BreadcrumbList. Esto mejora el snippet en SERP mostrando la ruta de navegación.

**S-2 (ALTO): LocalBusiness incompleto — falta `@id`, `image`, `openingHours`**
El schema LocalBusiness en BaseLayout carece de:
- `@id` (URL canónica del negocio, ej: `https://arkava.com.co/#business`)
- `image` (logo o foto del negocio)
- `openingHoursSpecification`
- `sameAs` (links a Instagram, Google Business)
- `geo` (coordenadas — están en la microdata de contacto pero no en el JSON-LD principal)

**S-3 (MEDIO): FAQPage solo está en la homepage**
El schema FAQPage está en `FaqHome.astro` que se renderiza en la homepage. Las páginas de servicio individuales no tienen FAQs propias ni schema FAQPage. Cada servicio debería tener 2-3 preguntas específicas (ej: "¿Cuánto dura la aplicación de pintura?", "¿Qué tipos de pintura usan en Arkava?").

**S-4 (MEDIO): `itemprop="name"` en contacto.astro apunta a "Contactanos"**
`src/pages/contacto.astro:121`: `<meta itemprop="name" content={'Contactanos'} />`. El nombre del negocio debería ser "Arkava", no "Contactanos".

**S-5 (BAJO): AggregateRating con `reviewCount` dinámico pero sin verificación mínima**
Si el CMS de testimonials devuelve 0 testimonios, el schema genera `reviewCount: "0"` lo que puede causar errores de validación en Google Rich Results Test.

---

### PILAR 5: PERFORMANCE / CORE WEB VITALS (Score: 50/100)

#### Problemas críticos de performance

**PF-1 (CRÍTICO): Videos con `preload="auto"` sin `poster`**
`Hero.astro:9-25`:
```html
<video src="...mobile..." autoplay muted loop playsinline preload="auto" class="flex md:hidden ...">
<video src="...desktop..." autoplay muted loop playsinline preload="auto" class="hidden md:flex ...">
```

Problemas:
1. `preload="auto"` descarga el video completo al cargar la página
2. Sin `poster`, hay un flash de pantalla en blanco antes de que el video cargue
3. En mobile, ambos videos intentan descargarse (CSS `hidden` no previene la descarga de red)
4. Videos en Cloudinary sin parámetros de calidad/resolución adaptativa

Impacto estimado: LCP > 5s en conexiones móviles, TBT elevado por el peso del video.

**PF-2 (ALTO): Imágenes de servicio sin optimización Astro**
Las imágenes en servicios usan `<img src={url}>` nativo. No usan `<Image>` de Astro que aplicaría:
- Conversión automática a WebP
- Compresión y resize
- Generación de srcset
- Width/height para evitar CLS (Cumulative Layout Shift)

Las URLs de Cloudinary tienen parámetros de transformación disponibles pero no se usan.

**PF-3 (ALTO): GSAP importado para animación de números**
`Experiencia.astro:67`: `import '@/lib/gsap-stats-animation'`. GSAP es una librería pesada (~70KB gzipped). Para una animación de contadores numéricos, IntersectionObserver nativo + CSS animations sería suficiente sin el peso adicional.

**PF-4 (ALTO): Framer Motion + React para carousel de equipos**
`sobre-nosotros.astro:44`: `<TeamCarousel client:load />`. Esto hidrata React + Framer Motion en el cliente inmediatamente al cargar. Un carousel de imágenes podría implementarse con CSS puro o un componente más ligero. `client:visible` en lugar de `client:load` reduciría el TBT.

**PF-5 (MEDIO): `client:only="react"` en ProjectsCarousel**
`ProyectosHome.astro:46`: `<ProjectsCarousel projects={projects} client:only="react" />`. Con `client:only`, no hay SSR del componente — la sección de proyectos en la homepage no se renderiza en el servidor, afectando el FCP y el contenido indexable por Google (aunque Googlebot procesa JavaScript, no es inmediato).

**PF-6 (MEDIO): Fuentes en OTF/TTF, no WOFF2**
Los archivos en `/public/fonts/` son `.otf` (PP Supply) y `.ttf` (Helvetica). WOFF2 comprime entre 25-40% mejor. El preload en BaseLayout carga los formatos más pesados.

#### Lo que funciona bien en Performance
- `font-display: swap` en todas las fuentes ✓
- Preload de fuentes críticas en BaseLayout ✓
- Vercel Analytics + Speed Insights para monitoreo ✓
- `loading="lazy"` en logo del header/footer ✓
- Astro genera HTML estático en build time (SSG) ✓

---

### PILAR 6: IMÁGENES (Score: 55/100)

#### Alt texts

**I-1 (ALTO): Imágenes de la historia en `OurHistory.astro` con alt text solo el título del año**
`OurHistory.astro:78`: `alt={item.title}` — Los alts son "Fundación", "Crecimiento", "Impacto", "Expansión". Deberían ser descriptivos con keyword: "Equipo Arkava en proyecto de remodelación - Medellín 2020".

**I-2 (MEDIO): Imagen de portada de proyectos en `proyectos/index.astro:105`**
`alt={project.title}` — El alt es solo el título del proyecto. Debería incluir el tipo de servicio y ubicación cuando esté disponible.

**I-3 (MEDIO): Imagen de contacto con alt genérico**
`contacto.astro:89`: `alt={'Contactanos'}`. Debería ser descriptivo: "Oficina de Arkava — Empresa de acabados arquitectónicos en Medellín".

#### Lo que funciona bien en Imágenes
- Servicios tienen alts descriptivos con keyword y marca: `alt={Servicio de ${title} - trabajo ejecutado por Arkava en Medellín}` ✓
- Misión/Visión en sobre-nosotros tiene alts con keyword ✓
- Footer e Header usan el componente `<Image>` de Astro con `format="webp"` y `decoding="async"` ✓

#### Problemas de formato y peso
- Imágenes de Framer (sobre-nosotros carousel) son JPEGs desde `framerusercontent.com` sin parámetros de optimización local
- Las imágenes del CMS (Hygraph/Cloudinary) no tienen transformaciones de calidad aplicadas (`?quality=80&format=webp`)

---

### PILAR 7: AI SEARCH READINESS (Score: 70/100)

#### Lo que funciona bien
- **FAQPage con 8 preguntas reales** y respuestas sustanciales. Los temas cubiertos son relevantes: precio m², tiempo de ejecución, seguridad del dinero (contratos/pólizas), trabajos comerciales, garantía de calidad. ✓
- **Metodología de 5 etapas** en `HowWeWorks.astro` — responde directamente "¿cómo funciona el proceso?". ✓
- **Información de contacto accesible:** teléfono, email, Instagram, mapa en `/contacto`. ✓
- **Schema FAQPage** en homepage para que los motores de IA puedan extraer respuestas estructuradas. ✓

#### Problemas encontrados

**AI-1 (MEDIO): FAQs no están en páginas de servicio individual**
Un usuario buscando "¿cuánto cuesta instalar enchapes en Medellín?" llega a `/servicios/enchape` que no tiene ninguna FAQ. La respuesta está en la homepage. Las FAQs deben estar cerca del contenido relevante.

**AI-2 (MEDIO): Sin citas verificables de dirección física**
El sitio no menciona una dirección física en contenido visible indexable. Solo hay coordenadas en el mapa de Leaflet y en la microdata oculta. ChatGPT, Perplexity y Google AI Overviews priorizan negocios con NAP completo y verificable en el contenido visible.

**AI-3 (BAJO): Sin sección "¿Por qué elegir Arkava?"**
Las plataformas de AI buscan comparativas y diferenciadores claros. No hay una sección con bullets de diferenciadores: presupuestos transparentes, contratos legales, pagos por etapas, pólizas de cumplimiento.

---

### PILAR 8: SEO LOCAL (Score: 62/100)

#### NAP (Name, Address, Phone) — Análisis de consistencia

| Campo | BaseLayout (JSON-LD) | contacto.astro visible | contacto.astro microdata |
|---|---|---|---|
| Name | Arkava | — | "Contactanos" ❌ |
| Teléfono | Dinámico CMS | 3207672761 | +57 312 222 22 22 ❌ |
| Email | Dinámico CMS | contacto@arkava.com.co | contacto@arkava.com.co ✓ |
| Dirección | Medellín, Antioquia, CO | — (solo mapa) | Coordenadas ✓ |

**NAP inconsistente en tres puntos diferentes** — Issue crítico para SEO local.

#### Zonas de Medellín mencionadas

| Zona | Dónde |
|---|---|
| Medellín | Todas las páginas ✓ |
| Antioquia | Schema BaseLayout ✓ |
| El Poblado | Testimonial (sarah-jenkins.md) ✓ |
| Laureles | Testimonial (marcus-chen.md) ✓ |
| El Retiro | Testimonial (elena-rodriguez.md) ✓ |
| Envigado, Itagüí, Sabaneta, Bello | Solo microdata oculta de contacto ❌ |

**Problema:** Las zonas de servicio (Envigado, Itagüí, etc.) solo están en contenido oculto (`aria-hidden="true"`). Google no las indexa como contenido de valor.

#### Schema LocalBusiness — Campos faltantes

El schema actual no incluye:
- `@id` — identificador único del negocio
- `image` — foto o logo del negocio
- `openingHoursSpecification` — horario de atención
- `sameAs` — Instagram, Google Business Profile
- `geo` con `GeoCoordinates` (lat/long están en microdata de contacto pero no en JSON-LD principal)
- `hasMap` — URL de Google Maps
- `currenciesAccepted` — COP
- `paymentAccepted`

#### Lo que funciona bien en SEO Local
- `areaServed` con `City: Medellín` y `AdministrativeArea: Antioquia` ✓
- `priceRange: "$$"` ✓
- `addressCountry: "CO"` ✓
- Mapa de Leaflet con coordenadas reales en /contacto ✓
- Link de Instagram en footer ✓
- Google Search Console verificado ✓

---

## PLAN DE ACCIÓN PRIORIZADO

Ver `ACTION-PLAN.md` para el plan completo.

---

*Reporte generado el 18 de marzo de 2026 — Agente SEO Arkava*
