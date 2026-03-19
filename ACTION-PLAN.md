# PLAN DE ACCIÓN SEO — ARKAVA
**Fecha:** 18 de marzo de 2026
**Score inicial:** 64/100
**Score objetivo a 90 días:** 78/100

---

## PRIORIDAD CRÍTICA — Implementar esta semana

### [C-1] Agregar `poster` a los videos del Hero y cambiar `preload`
**Archivo:** `src/components/organisms/Hero.astro`
**Impacto:** LCP, CWV, experiencia mobile
**Esfuerzo:** 30 min

Acciones:
1. Exportar frame del video mobile como `/public/images/hero-poster-mobile.webp` (1080x1920px)
2. Exportar frame del video desktop como `/public/images/hero-poster-desktop.webp` (1920x1080px)
3. Cambiar `preload="auto"` por `preload="none"` en ambos videos (autoplay lo activa igual)
4. Agregar `poster="/images/hero-poster-mobile.webp"` al video mobile
5. Agregar `poster="/images/hero-poster-desktop.webp"` al video desktop

```html
<!-- Resultado esperado en Hero.astro -->
<video
  src="..."
  autoplay muted loop playsinline
  preload="none"
  poster="/images/hero-poster-mobile.webp"
  class="flex md:hidden w-full h-full object-cover">
</video>
```

---

### [C-2] Corregir NAP en `contacto.astro` — teléfono inconsistente
**Archivo:** `src/pages/contacto.astro:127`
**Impacto:** SEO local, confianza Google Business
**Esfuerzo:** 5 min

Reemplazar el placeholder en la microdata:
```html
<!-- ANTES (línea 127) -->
<meta itemprop="telephone" content={'+57 312 222 22 22'} />

<!-- DESPUÉS — usar el número real visible en la UI -->
<meta itemprop="telephone" content={'+57 3207672761'} />
```

También corregir `itemprop="name"` en línea 121:
```html
<!-- ANTES -->
<meta itemprop="name" content={'Contactanos'} />

<!-- DESPUÉS -->
<meta itemprop="name" content={'Arkava'} />
```

---

### [C-3] Agregar `loading="lazy"` a imágenes de servicios
**Archivos:** Todos los archivos en `src/pages/servicios/*.astro`
**Impacto:** LCP, peso inicial de página
**Esfuerzo:** 20 min

En cada `<img>` de los 8 archivos de servicios, agregar `loading="lazy"`. Las imágenes están below-the-fold. También agregar `width` y `height` aproximados para evitar CLS:

```html
<!-- ANTES (ejemplo pintura.astro:77) -->
<img src={imageService?.[0]?.url} alt="..." class="..." />

<!-- DESPUÉS -->
<img src={imageService?.[0]?.url} alt="..." class="..." loading="lazy" width="800" height="600" />
```

Archivos a modificar:
- `src/pages/servicios/pintura.astro` (3 imágenes)
- `src/pages/servicios/enchape.astro` (2 imágenes)
- `src/pages/servicios/estuco.astro` (2 imágenes)
- `src/pages/servicios/cielo-raso.astro` (3 imágenes)
- `src/pages/servicios/carpinteria.astro` (3 imágenes)
- `src/pages/servicios/muros-drywall.astro` (3 imágenes)
- `src/pages/servicios/muros-decorativos.astro` (4 imágenes)
- `src/pages/servicios/argamasa.astro` (2 imágenes)

---

### [C-4] Corregir H1 oculto en páginas de servicio standalone
**Archivos:** Todos los archivos en `src/pages/servicios/*.astro`
**Impacto:** On-page SEO, señal semántica de keyword
**Esfuerzo:** 45 min

El H1 está oculto con `sr-only` y el H2 visible es solo el nombre del servicio. Solución: Convertir el H2 visible en H1 con keyword enriquecido cuando la página es standalone.

```astro
<!-- ANTES (ejemplo pintura.astro:52-56) -->
<h2 class="text-5xl md:text-6xl font-bold uppercase font-pp-sans tracking-[0.6rem] leading-none mb-6">
  {title}
</h2>

<!-- DESPUÉS — Solo cuando isStandalone -->
{isStandalone ? (
  <h1 class="text-5xl md:text-6xl font-bold uppercase font-pp-sans tracking-[0.6rem] leading-none mb-6">
    {title}
  </h1>
) : (
  <h2 class="text-5xl md:text-6xl font-bold uppercase font-pp-sans tracking-[0.6rem] leading-none mb-6">
    {title}
  </h2>
)}
```

Y eliminar el `<h1 class="sr-only">` actual que queda redundante.

---

### [C-5] Agregar `description` explícita en `index.astro`
**Archivo:** `src/pages/index.astro`
**Impacto:** CTR desde SERP, control de snippet
**Esfuerzo:** 10 min

```astro
<!-- ANTES -->
<BaseLayout title={page?.title ?? 'Arkava'}>

<!-- DESPUÉS -->
<BaseLayout
  title={page?.title ?? 'Arkava | Acabados Arquitectónicos y Remodelación en Medellín'}
  description={page?.description ?? 'Empresa especializada en acabados arquitectónicos de alto nivel y remodelación integral en Medellín. Enchapes, pintura, estuco, cielo rasos, drywall y carpintería a medida.'}
>
```

---

## PRIORIDAD ALTA — Implementar en los próximos 15 días

### [A-1] Crear imagen OG branded 1200x630px
**Archivo a crear:** `public/og-image.jpg`
**Impacto:** CTR desde redes sociales, presentación de marca
**Esfuerzo:** 2-4 horas (diseño)

Requisitos de la imagen:
- Dimensiones: 1200x630px
- Formato: JPG (o WebP con fallback)
- Contenido: Logo Arkava + foto de proyecto real + tagline
- Colores corporativos (verde primario, terracota)

Actualizar en `BaseLayout.astro:23`:
```astro
const OG_FALLBACK = '/og-image.jpg'; // imagen local, no blob storage
```

---

### [A-2] Agregar BreadcrumbList schema en servicios y proyectos
**Archivos:** `src/layouts/ConditionalLayout.astro`, `src/pages/proyectos/[slug].astro`
**Impacto:** Rich snippets en SERP, navegación semántica
**Esfuerzo:** 1 hora

En `ConditionalLayout.astro`, cuando `enabled = true`, generar automáticamente el schema:

```astro
---
// En ConditionalLayout.astro
const breadcrumbSchema = enabled ? JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://arkava.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://arkava.com.co/servicios' },
    { '@type': 'ListItem', position: 3, name: title, item: Astro.url.href },
  ],
}) : null;
---

{breadcrumbSchema && <script type="application/ld+json" set:html={breadcrumbSchema} />}
```

Para proyectos en `src/pages/proyectos/[slug].astro`, agregar schema similar con: Inicio > Proyectos > {title}.

---

### [A-3] Completar LocalBusiness schema con campos faltantes
**Archivo:** `src/layouts/BaseLayout.astro:37-71`
**Impacto:** SEO local, Google Business, Knowledge Panel
**Esfuerzo:** 30 min

Campos a agregar al schema existente:
```json
{
  "@id": "https://arkava.com.co/#business",
  "image": "https://arkava.com.co/og-image.jpg",
  "sameAs": [
    "https://www.instagram.com/arkava_remodelacion/"
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "6.2705734",
    "longitude": "-75.5762646"
  },
  "hasMap": "https://maps.google.com/?q=6.2705734,-75.5762646",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "currenciesAccepted": "COP",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer"
}
```

Nota: Verificar horarios reales con el equipo de Arkava antes de publicar.

---

### [A-4] Nombrar los hoteles del portfolio en la página Sobre Nosotros
**Archivo:** `src/components/organisms/OurHistory.astro`
**Impacto:** E-E-A-T, credibilidad, menciones verificables
**Esfuerzo:** 30 min (solo copy)

En la entrada de 2025 ("Expansión"), agregar referencias específicas:
```
"...Durante nuestra experiencia ejecutando proyectos hoteleros de referencia en Medellín —
incluyendo hoteles como Hunters, Heiss, Nakua y Calle Flora — identificamos la necesidad..."
```

Esto crea citas verificables que mejoran el E-E-A-T ante Google y modelos de IA.

---

### [A-5] Mover zonas de servicio de microdata oculta a contenido visible
**Archivo:** `src/pages/contacto.astro:114-145`
**Impacto:** SEO local, cobertura de área de servicio
**Esfuerzo:** 1 hora

La sección `aria-hidden="true"` con LocalBusiness microdata no aporta valor de contenido indexable. Las zonas de servicio deben aparecer en el texto visible de la página. Ejemplo: añadir una sección visible en contacto.astro:

```html
<div class="text-center mt-8">
  <h3 class="text-lg font-semibold text-gray-800">Zonas de Servicio</h3>
  <p class="text-gray-600 mt-2">
    Medellín, El Poblado, Laureles, Belén, Envigado, Itagüí, Sabaneta y Bello.
  </p>
</div>
```

---

### [A-6] Cambiar `client:load` por `client:visible` en TeamCarousel
**Archivo:** `src/pages/sobre-nosotros.astro:44`
**Impacto:** TBT (Total Blocking Time), Framer Motion no bloquea el hilo principal
**Esfuerzo:** 5 min

```astro
<!-- ANTES -->
<TeamCarousel images={imgs} client:load />

<!-- DESPUÉS -->
<TeamCarousel images={imgs} client:visible />
```

---

### [A-7] Añadir `hreflang` explícito en BaseLayout
**Archivo:** `src/layouts/BaseLayout.astro`
**Impacto:** Señal de idioma/región para Google
**Esfuerzo:** 10 min

```html
<!-- Agregar en el <head> después del canonical -->
<link rel="alternate" hreflang="es-CO" href={canonicalURL} />
<link rel="alternate" hreflang="es" href={canonicalURL} />
<link rel="alternate" hreflang="x-default" href={canonicalURL} />
```

---

## PRIORIDAD MEDIA — Implementar en los próximos 30 días

### [M-1] Agregar contenido textual sustancial a páginas de servicio
**Archivos:** Todos los servicios en `src/pages/servicios/*.astro`
**Impacto:** E-E-A-T, thin content, long-tail keywords
**Esfuerzo:** 4-8 horas (redacción)

Cada página de servicio necesita secciones adicionales:
1. **Beneficios del servicio** — Lista de 4-5 bullets
2. **Materiales y técnicas usadas** — 2-3 párrafos
3. **FAQ específica del servicio** — 3 preguntas con schema FAQPage
4. **Proyectos relacionados** — Links a 2-3 proyectos del portafolio
5. **CTA** — "Solicitar presupuesto sin costo"

Estimado de palabras por página: mínimo 400 palabras de texto real.

Ejemplo para `/servicios/pintura`:
- Tipos de pintura que usan (vinilo, esmalte, látex, estuco líquido)
- Proceso de preparación de muros antes de pintar
- FAQ: ¿Cuántas manos de pintura aplican?, ¿Qué diferencia hay entre pintura interior y exterior?, ¿Cuánto tarda pintar un apartamento de 80m²?

---

### [M-2] Crear FAQs específicas por servicio con schema
**Archivos:** `src/content/faqs/` + cada servicio
**Impacto:** AI Search, featured snippets, long-tail keywords
**Esfuerzo:** 3 horas

Estructura sugerida: crear subdirectorio `src/content/faqs/servicios/` con archivos por servicio.

Preguntas prioritarias por crear:
- **Pintura:** Precio m², duración del proceso, tipos de pintura
- **Enchape:** Diferencia cerámica vs porcelana, precio instalación, tiempo de secado
- **Estuco:** Tipos de estuco, proceso de aplicación, diferencia vs pintura
- **Carpintería:** Maderas disponibles, tiempo de fabricación, garantía
- **Drywall:** Ventajas vs mampostería, precio m², resistencia al agua

---

### [M-3] Reemplazar imágenes de stock en OurHistory por fotos reales de proyectos
**Archivo:** `src/components/organisms/OurHistory.astro:7-30`
**Impacto:** E-E-A-T, autenticidad, engagement
**Esfuerzo:** 2 horas (selección y optimización de fotos)

Las 4 URLs de Unsplash (foto de personas en oficina, reuniones) deben ser reemplazadas por fotos reales del portafolio de Arkava: obras en ejecución, equipo en campo, proyectos terminados.

---

### [M-4] Implementar internal linking entre servicios
**Archivos:** Todos los servicios
**Impacto:** Distribución de PageRank, crawl budget, engagement
**Esfuerzo:** 1 hora

Agregar en cada página de servicio una sección "Servicios relacionados" con links a 2-3 servicios complementarios:

Ejemplos de relaciones:
- Pintura ↔ Estuco ↔ Muros Decorativos
- Enchape ↔ Argamasa
- Drywall ↔ Cielo Raso ↔ Carpintería

---

### [M-5] Breadcrumb visual en todas las páginas internas
**Archivos:** `src/layouts/BaseLayout.astro` o componentes individuales
**Impacto:** UX, señal semántica, schema
**Esfuerzo:** 2 horas

Implementar un componente `<Breadcrumb>` reutilizable que se muestre en:
- `/servicios` → Inicio > Servicios
- `/servicios/pintura` → Inicio > Servicios > Pintura
- `/proyectos` → Inicio > Proyectos
- `/proyectos/[slug]` → Inicio > Proyectos > {Nombre del proyecto}
- `/sobre-nosotros` → Inicio > Quiénes Somos
- `/contacto` → Inicio > Contacto

---

### [M-6] Optimizar fuentes: Convertir OTF/TTF a WOFF2
**Archivos:** `public/fonts/`, `src/styles/fonts.css`
**Impacto:** Tamaño de transferencia de fuentes (~30-40% reducción)
**Esfuerzo:** 2 horas

1. Convertir archivos `.otf` y `.ttf` a `.woff2` usando herramienta online (fontsquirrel.com o glyphhanger)
2. Actualizar `fonts.css` para referenciar los nuevos archivos WOFF2
3. Mantener OTF/TTF como fallback con `format()` stacking

```css
@font-face {
  font-family: 'PP Supply Sans';
  src: url('/fonts/PP-Supply/PPSupplySans-Regular.woff2') format('woff2'),
       url('/fonts/PP-Supply/PPSupplySans-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

---

### [M-7] Corregir inconsistencia años de experiencia
**Archivos:** `src/pages/sobre-nosotros.astro`, CMS Hygraph
**Impacto:** E-E-A-T, credibilidad
**Esfuerzo:** 30 min

Verificar y alinear:
1. La descripción en `sobre-nosotros.astro` dice "más de 10 años de experiencia"
2. La historia muestra fundación en 2020 (6 años a 2026)
3. El campo `anosExperiencia` en el CMS

Opciones: Actualizar el copy a "más de 5 años de experiencia" o aclarar que los fundadores tienen 10+ años en el sector pero Arkava como empresa tiene 6.

---

### [M-8] Añadir dirección física visible en footer o contacto
**Archivo:** `src/components/organisms/Footer.astro`
**Impacto:** NAP completo, confianza, SEO local
**Esfuerzo:** 15 min

Agregar la dirección física de Arkava en el footer (o al menos la ciudad/barrio):
```html
<address class="not-italic text-sm text-white/70 text-center">
  Medellín, Antioquia, Colombia<br>
  contacto@arkava.com.co · +57 320 767 2761
</address>
```

---

## PRIORIDAD BAJA — Implementar en los próximos 60-90 días

### [B-1] Evaluar reemplazar GSAP por IntersectionObserver nativo
**Archivo:** `src/components/organisms/Experiencia.astro`, `src/lib/gsap-stats-animation`
**Impacto:** Bundle size (~70KB menor)
**Esfuerzo:** 3 horas

Si GSAP se usa solo para la animación de contadores, puede reemplazarse con una implementación vanilla JavaScript de ~20 líneas usando `IntersectionObserver`.

---

### [B-2] Agregar `meta name="robots"` explícito
**Archivo:** `src/layouts/BaseLayout.astro`
**Impacto:** Control explícito de indexación
**Esfuerzo:** 5 min

```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
```

---

### [B-3] Agregar parámetros de calidad a URLs de imágenes Cloudinary/Hygraph
**Archivos:** Todos los archivos que usen `imageService?.[n]?.url`
**Impacto:** Peso de imágenes, performance
**Esfuerzo:** 2 horas

Cloudinary admite transformaciones en URL. Crear una función helper:
```typescript
// src/lib/utils/imageOptimizer.ts
export function optimizeCloudinaryUrl(url: string, width = 800, quality = 80): string {
  if (!url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/w_${width},q_${quality},f_webp/`);
}
```

---

### [B-4] Crear página `/servicios/remodelacion-integral`
**Impacto:** Keyword principal "remodelación en Medellín" sin página dedicada
**Esfuerzo:** 4 horas

El keyword de mayor volumen para Arkava es "remodelación en Medellín" / "empresa de remodelación Medellín". Actualmente no hay una página dedicada a este servicio agregado. La homepage y servicios/index mencionan remodelación pero no hay una landing page optimizada para este keyword.

Estructura sugerida:
- Title: "Remodelación Integral en Medellín | Arkava — Llave en Mano"
- H1: "Remodelación Integral en Medellín"
- Secciones: ¿Qué incluye?, Proceso, Garantías, Testimonios, FAQ, CTA

---

### [B-5] Implementar `og:type: "LocalBusiness"` en páginas de contacto
**Archivo:** `src/pages/contacto.astro`
**Impacto:** OG semántico para redes sociales
**Esfuerzo:** 10 min

Pasar un `ogType` personalizado desde la página de contacto:
```astro
<BaseLayout ogType="business.business" ...>
```

---

### [B-6] Agregar schema `Organization` junto con `LocalBusiness`
**Archivo:** `src/layouts/BaseLayout.astro`
**Impacto:** Knowledge Panel, brand signals
**Esfuerzo:** 30 min

Para empresas, Google recomienda combinar `LocalBusiness` y `Organization` schemas:
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "legalName": "Arkava S.A.S",
  "foundingDate": "2020",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "25" }
}
```

---

## MÉTRICAS DE ÉXITO A 90 DÍAS

| Métrica | Actual (estimado) | Objetivo |
|---|---|---|
| Score SEO | 64/100 | 78/100 |
| LCP Homepage | >4s | <2.5s |
| LCP Páginas servicio | >3s | <2.5s |
| Páginas indexadas (GSC) | Desconocido | 20+ |
| Keywords posicionados top 10 | Desconocido | 15+ |
| Schema errors (Rich Results Test) | 3+ | 0 |
| NAP consistency | 40% | 100% |

---

## ORDEN DE EJECUCIÓN RECOMENDADO

```
Semana 1:
  [C-1] Poster en videos Hero
  [C-2] Corregir NAP teléfono contacto.astro
  [C-3] loading="lazy" en imágenes servicios
  [C-5] Description explícita en index.astro

Semana 2:
  [C-4] Corregir H1 oculto en servicios
  [A-2] BreadcrumbList schema
  [A-3] Completar LocalBusiness schema
  [A-7] hreflang en BaseLayout

Semana 3:
  [A-1] OG image branded 1200x630px
  [A-4] Nombrar hoteles en OurHistory
  [A-5] Zonas servicio en contenido visible
  [A-6] client:visible en TeamCarousel

Semana 4-6:
  [M-1] Contenido sustancial en páginas de servicio
  [M-2] FAQs específicas por servicio
  [M-4] Internal linking entre servicios
  [M-7] Corregir inconsistencia años de experiencia
  [M-8] Dirección física en footer

Semana 7-12:
  [M-3] Reemplazar fotos Unsplash en historia
  [M-5] Breadcrumb visual
  [M-6] Convertir fuentes a WOFF2
  [B-4] Nueva página remodelacion-integral
  [B-1] Evaluar reemplazar GSAP
  Resto de prioridad baja
```

---

*Plan de acción generado el 18 de marzo de 2026 — Agente SEO Arkava*
