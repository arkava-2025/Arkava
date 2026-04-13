# Auditoría SEO Completa — Arkava
**Fecha:** 12 de abril de 2026
**Dominio:** arkava.com.co
**Tipo de negocio:** Servicio local B2C/B2B — Acabados arquitectónicos y remodelación premium
**Mercado:** Medellín y área metropolitana (Antioquia, Colombia)

---

## Resumen Ejecutivo

### SEO Health Score: **62 / 100**

| Categoría | Peso | Puntuación | Impacto |
|-----------|------|------------|---------|
| SEO Técnico | 25% | 72/100 | Alto |
| Calidad de Contenido | 25% | 58/100 | Alto |
| On-Page SEO | 20% | 55/100 | Alto |
| Schema / Datos estructurados | 10% | 78/100 | Medio |
| Rendimiento (CWV) | 10% | 60/100 | Medio |
| Imágenes | 5% | 50/100 | Bajo |
| AI Search Readiness (GEO) | 5% | 45/100 | Alto |

> Nota: La puntuación anterior era 28/100. La implementación de `site:`, `robots.txt`, `sitemap`, `meta description` global, `OG tags`, y `LocalBusiness schema` en el BaseLayout elevó el score significativamente. Los problemas restantes son de contenido, on-page y GEO.

---

## Top 5 Issues Críticos

1. **Páginas de servicios sin H2s** — Las 8 páginas de servicios (enchape, pintura, estuco, etc.) tienen H1 pero sin estructura H2. Esto impide que Google entienda la profundidad del contenido y bloquea la posibilidad de aparecer en AI Overviews.

2. **Meta descriptions ausentes en páginas internas** — `/sobre-nosotros`, `/proyectos`, `/contacto` y las páginas de servicios individuales no tienen meta description personalizada. El campo `SEO_DESCRIPTION` existe en el código pero puede no estar siendo pasado al `<BaseLayout>`.

3. **Blog sin schema `BlogPosting` / `Article` completo** — Solo el artículo de guía tiene schema parcial. No hay `FAQPage` schema en las entradas de blog que tienen preguntas frecuentes, ni `BreadcrumbList` schema explícito.

4. **Páginas de servicios con contenido muy delgado** — ~500–700 palabras por página de servicio, sin FAQs, sin precios orientativos, sin casos de uso. Competidores con páginas de 1,500+ palabras los superarán en rankings de cola larga.

5. **Señales GEO/AI insuficientes** — Sin secciones tipo "¿Qué es X?", sin respuestas directas a preguntas conversacionales, sin estadísticas citables, sin menciones externas de autoridad. Esto reduce la probabilidad de aparecer en AI Overviews de Google.

---

## Top 5 Quick Wins (implementables en 1-2 días)

1. Agregar `<meta name="description">` personalizada a cada página de servicio pasando `description={SEO_DESCRIPTION}` al `<ConditionalLayout>`.
2. Agregar `FAQPage` schema a los 3 artículos de blog que tienen secciones de preguntas frecuentes.
3. Optimizar el `<title>` de `/proyectos` — actualmente sin keyword principal ("Remodelación" debe aparecer primero).
4. Añadir `BreadcrumbList` schema a todas las páginas internas.
5. Agregar H2s a las páginas de servicio con subsecciones de contenido.

---

## 1. SEO Técnico (72/100)

### Crawlability e Indexabilidad — BIEN
- `robots.txt` correctamente configurado: permite todo, bloquea `/404`, `/draft/`, `/_astro/`
- Sitemap en `https://arkava.com.co/sitemap-index.xml` → `sitemap-0.xml` con 26 URLs
- `site:` configurado en `astro.config.mjs` → canonicals generan correctamente
- `@astrojs/sitemap` integrado y generando sitemap automáticamente

### Problemas identificados

| Problema | Severidad | Detalle |
|----------|-----------|---------|
| Todas las URLs en sitemap con misma prioridad (0.7) | Media | Homepage debería ser 1.0, servicios 0.9, blog 0.7, proyectos 0.6 |
| `changefreq: weekly` para todas las páginas | Baja | Proyectos y servicios raramente cambian — usar `monthly` |
| Sin sitemap separado por tipo (blog, servicios) | Baja | Mejor organización para large sites |
| Dos emails activos (contacto@ y remodelacionaca.vamos@gmail) | Alta | El schema y la página de contacto muestran ambos. El Gmail erosiona confianza y E-E-A-T |
| Sin dirección física completa (calle, número) | Alta | Perjudica Local SEO y Google Business Profile signals |
| Sin `hreflang` | Baja | Solo español, sitio monoidioma — no urgente |

### Core Web Vitals (estimado — sin medición directa)
- Videos autoplay en hero sin poster declarado → impacto en LCP
- Fuentes OTF/TTF preloadadas → bien para FID/CLS
- Imágenes de Cloudinary con `.webp` → bien optimizadas
- Framer Motion + GSAP + React → bundle puede impactar INP si no hay lazy loading

---

## 2. Calidad de Contenido / E-E-A-T (58/100)

### Homepage
- H1 fuerte con keyword + ciudad: "Expertos en Construcción y Remodelación de Espacios en Medellín"
- FAQs en homepage (6 preguntas) → bien para E-E-A-T y AI Overviews
- AggregateRating schema con 3 testimonios → buen trust signal
- **Gap:** No se mencionan años de experiencia, número de proyectos completados, ni métricas de negocio (volumen, certificaciones, garantías)

### Blog (3 artículos existentes)
| Artículo | Keywords Target | Fortalezas | Gaps |
|----------|----------------|------------|------|
| Guía remodelación apartamentos Medellín | "remodelar apartamento Medellín", "costo remodelación Medellín" | 2,100 palabras, tablas de precios, H2s, schema Article | Sin links a servicios específicos (/servicios/enchape, /servicios/pintura), sin autor con bio |
| Microcemento vs pintura paredes | "microcemento Medellín", "pintura vs microcemento" | Tabla comparativa, precios 2026 | Sin CTA intermedio, sin link a /servicios/muros-decorativos |
| Tipos de cielo raso | "cielo raso Medellín", "tipos cielo raso" | Tabla de materiales, precios 2026 | Sin link a /servicios/cielo-raso, sin schema FAQ |

### Páginas de Servicios
- Contenido muy delgado (~500-700 palabras)
- Sin H2s — solo H1 con nombre del servicio
- Sin FAQs, precios orientativos, casos de uso por zona de Medellín
- Sin links internos entre servicios relacionados (ej: enchape → argamasa)
- Sin testimonios o reseñas específicas del servicio

### Sobre Nosotros
- H1 genérico: "Sobre Nosotros"
- Buenos H2s (misión, visión, propósito)
- **Gap crítico anterior resuelto:** ya no tiene H2 placeholder "subtitle about us"
- Alt texts de fotos del equipo genéricos ("Equipo Arkava 1", "Equipo Arkava 2"...)

---

## 3. On-Page SEO (55/100)

### Títulos de página

| Página | Title actual | Estado | Recomendación |
|--------|-------------|--------|---------------|
| Homepage | "Arkava \| Acabados Arquitectónicos y Remodelación en Medellín" | Bien | Considerar poner keyword primero |
| Blog index | "Blog \| Consejos de Remodelación y Acabados en Medellín — Arkava" | Bien | OK |
| /sobre-nosotros | "Arkava \| Quiénes Somos — Empresa de Remodelación en Medellín" | Bien | OK |
| /proyectos | "Proyectos de Remodelación y Acabados \| Arkava Medellín" | Bien | OK |
| /servicios/enchape | Estimado: "Enchape en Medellín \| Acabados Arkava" | Revisar | Agregar keyword específica: "Enchape y Cerámica" |
| /servicios/pintura | Estimado: "Pintura en Medellín \| Acabados Arkava" | Revisar | "Pintura de Interiores y Exteriores" |
| /contacto | No confirmado | Sin confirmar | "Contacto \| Solicita Presupuesto — Arkava Medellín" |
| /blog/guia-remodelacion | "Guía completa para remodelar un apartamento en Medellín..." | Excelente | Mantener |

### Meta Descriptions
- Homepage: Tiene descripción (`description` prop del CMS Hygraph)
- Blog index: **Sin meta description**
- /sobre-nosotros: **Sin meta description** (no se está pasando al layout)
- /proyectos: **Sin meta description**
- /contacto: **Sin meta description**
- Páginas de servicios: `SEO_DESCRIPTION` definida en código pero necesita verificar que se pase correctamente a `ConditionalLayout`
- Artículos de blog: Tienen meta description en frontmatter → bien

### Estructura de Encabezados
- Homepage: H1 + 4 H2s → bien estructurado
- Servicios individuales: H1 solo → **falta jerarquía H2**
- Blog artículos: H1 + múltiples H2s bien estructurados → excelente
- /proyectos: H1 "Nuestros Proyectos" → sin H2s de categorías

### Internal Linking
- Blog no enlaza a páginas de servicios específicas
- Páginas de servicios no se enlazan entre sí (enchape ↔ argamasa, pintura ↔ estuco)
- No hay breadcrumbs visibles en páginas de servicios

---

## 4. Schema / Datos Estructurados (78/100)

### Implementado correctamente
- `LocalBusiness` en todas las páginas (BaseLayout) con: nombre, descripción, teléfono, email, dirección (parcial), areaServed, hasOfferCatalog
- `Service` schema en cada página de servicio individual
- `AggregateRating` en homepage con testimonios
- `Article` schema en artículo de guía de remodelación
- Schema sitio: `https://schema.org`

### Gaps de Schema

| Schema faltante | Dónde | Impacto |
|----------------|-------|---------|
| `FAQPage` | Homepage FAQs (6 preguntas), blog artículos | Alto — rich snippets en SERPs |
| `BreadcrumbList` | Páginas de servicio, blog | Medio — navegación en SERPs |
| `BlogPosting` completo | 2 artículos de blog (microcemento, cielo raso) | Medio |
| `HowTo` | Proceso de 5 etapas en homepage | Medio — rich results |
| `Review` / `Testimonial` | Proyectos individuales | Bajo |
| `ImageObject` | Portafolio de proyectos | Bajo |
| `LocalBusiness.geo` (coordenadas) | BaseLayout | Alto para Local SEO — dirección exacta + lat/lng |
| `LocalBusiness.openingHours` | BaseLayout | Medio |
| `LocalBusiness.streetAddress` | BaseLayout | Alto — solo tiene city/region |

### Prioridad: agregar dirección física completa al schema LocalBusiness
```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "[Calle, número]",
  "addressLocality": "Medellín",
  "addressRegion": "Antioquia",
  "postalCode": "[Código postal]",
  "addressCountry": "CO"
},
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 6.2476,
  "longitude": -75.5658
}
```

---

## 5. Rendimiento / Core Web Vitals (60/100)

### Señales positivas
- Imágenes en formato `.webp` desde Cloudinary y Vercel Blob
- Fuentes críticas con `rel="preload"` en BaseLayout
- Vercel Speed Insights integrado (monitoreo continuo)
- Astro genera HTML estático — excelente TTFB

### Riesgos identificados
- Videos autoplay en hero section sin atributo `poster` → el navegador no sabe qué mostrar mientras carga → LCP alto
- `Framer Motion` + `GSAP` + `React` → carga de JS pesada si no se usa `client:visible` correctamente
- Fuentes en formato OTF/TTF en lugar de WOFF2 → mayor tamaño de archivo
- Imágenes del portafolio de proyectos: sin `loading="lazy"` explícito verificado

---

## 6. Imágenes (50/100)

| Problema | Detalle | Severidad |
|----------|---------|-----------|
| Alt texts genéricos en /sobre-nosotros | "Equipo Arkava 1" ... "Equipo Arkava 9" | Media |
| OG image hardcodeada a URL externa (Vercel Blob) | Funcional pero no branded | Baja |
| Sin `srcset` verificado en portafolio | Cloudinary puede generar automáticamente | Media |
| Imágenes de proyectos sin alt descriptivo del proyecto | Afecta Google Images y accesibilidad | Media |

---

## 7. AI Search Readiness / GEO (45/100)

### Contexto
Google AI Overviews, ChatGPT Search y Perplexity priorizan páginas con:
1. Respuestas directas a preguntas concretas (formato pregunta → respuesta en 1-2 párrafos)
2. Datos citables: precios, estadísticas, comparativas
3. Autoridad de marca mencionada externamente
4. Estructura clara: H2 como pregunta, respuesta inmediata debajo
5. Schema `FAQPage` y `HowTo`

### Estado actual de Arkava para GEO

| Signal GEO | Estado | Detalle |
|-----------|--------|---------|
| Respuestas directas en contenido | Parcial | Los artículos de blog tienen buena estructura pero las páginas de servicio no |
| Precios y datos numéricos | Bien (blog) | Artículos con tablas de precios 2026 — citables por AI |
| Schema FAQ | Ausente | 6 FAQs en homepage sin FAQPage schema |
| Menciones externas | Desconocido | Sin datos de backlinks |
| "¿Qué es X?" definitional content | Ausente | Ninguna página define claramente los servicios desde cero |
| Casos de estudio citables | Parcial | 10 proyectos pero sin métricas de resultado |
| Autoridad de autor | Ausente | "Equipo Arkava" sin bio, sin LinkedIn, sin credenciales |

---

## Páginas rastreadas: 26
## URLs con errores: 0 detectados
## Redirects: ninguno identificado

---

*Reporte generado: 12 de abril de 2026 — Arkava SEO Agent*
