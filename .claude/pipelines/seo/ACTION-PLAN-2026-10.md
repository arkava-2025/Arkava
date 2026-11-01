# Plan de acción SEO + GEO — arkava.com.co
**Base:** FULL-AUDIT-REPORT-2026-10.md · Score actual 51/100 · Meta 75/100

## 🔴 Crítico (esta semana)

| # | Acción | Dónde | Esfuerzo |
|---|---|---|---|
| 1 | Recuperar acceso a GSC: verificar propiedad www (archivo HTML) o crear propiedad de dominio por DNS TXT; re-añadir service account; reenviar sitemap | GSC + DNS | 30 min |
| 2 | `site: 'https://www.arkava.com.co'` | `astro.config.mjs` | 5 min |
| 3 | Apex → www con redirect permanente (308) en lugar de 307 | Vercel → Domains | 5 min |
| 4 | Quitar `Disallow: /_astro/`; sitemap a `https://www.arkava.com.co/sitemap-index.xml` | `public/robots.txt` | 5 min |
| 5 | Corregir `wa.me/3207672761` → `wa.me/573207672761` | componente del CTA "Iniciemos juntos" | 5 min |
| 6 | Retirar "visita técnica gratuita / sin costo / gratis" | `contacto.astro:22`, `blog/[slug].astro:193`, `microcemento-vs-pintura-paredes.md:16,179`, `tipos-cielo-raso-hogar.md:166` | 15 min |

## 🟠 Alto (próximas 2 semanas)

| # | Acción | Esfuerzo |
|---|---|---|
| 7 | Reescribir las 8 páginas de servicio a 700–1.000 palabras: qué es, cuándo conviene, rango de precio por m² en Medellín, proceso en 5 etapas, materiales, tiempos, 2–3 proyectos reales, FAQ (4–6), enlace a la guía del blog. Pasar por `humanizer` | 2–3 días |
| 8 | Title del home: `Remodelación y acabados de lujo en Medellín \| Arkava` (+ og:title) | 5 min |
| 9 | H1 y titles de servicios con keyword + Medellín ("Enchape de baños, cocinas y fachadas en Medellín") | 1 h |
| 10 | Unificar schema: un solo `HomeAndConstructionBusiness` con `@id`, dirección, `geo`, horarios, logo, `sameAs`; quitar `aggregateRating`/`review` auto-publicados | 2 h |
| 11 | Añadir `BreadcrumbList` global y `WebSite` + `Organization` en home | 1 h |
| 12 | Perfiles de marca: Google Business Profile (verificado, con fotos de proyectos), Instagram, LinkedIn; enlazar desde footer | 1 día |
| 13 | Email de dominio propio (contacto@arkava.com.co) en sitio y schema | 1 h |

## 🟡 Medio (este mes)

| # | Acción |
|---|---|
| 14 | Proyectos: añadir ubicación, año, área, alcance, materiales, duración y cita del cliente (campos en Hygraph). Meta description propia sin markdown |
| 15 | Fuentes a WOFF2 con subset; dejar de precargar Helvetica.ttf de 318 KB |
| 16 | Autor `Person` en artículos (nombre, cargo, foto, bio) + `dateModified` |
| 17 | `FAQPage` en microcemento y cocina |
| 18 | Enlazado interno servicio ↔ guía ↔ proyecto; enlaces internos con slash final; `trailingSlash: 'always'` |
| 19 | Titles del blog ≤ 60 caracteres (cambiar "\| Blog Arkava" por "\| Arkava"); metas ≤ 155 |
| 20 | `public/llms.txt` |
| 21 | Contacto: dirección/zona de atención, horario, mapa, 150+ palabras |
| 22 | OG image por servicio y por artículo |
| 23 | Sitemap: `lastmod` real por página en lugar de `new Date()` |

## 🟢 Bajo (backlog)

- Headers de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) vía `vercel.json`
- Contraste de botones naranja y footer (accesibilidad 94 → 100)
- Logo del header sin `lazy`
- Corregir salto H2→H4 en tarjetas del home
- Retomar publicación: 2 artículos/mes (último: mayo). Candidatos del plan 2026: drywall precios, carpintería/closets a medida, estuco vs. pintura, remodelación locales comerciales, remodelación para Airbnb/rentas cortas (ya hay proyecto Apto Los Angeles como caso)
- Páginas por zona (El Poblado, Envigado, Laureles, Sabaneta) cuando los servicios ya tengan contenido sólido
- Outreach a hoteles del portafolio para mención/enlace como proveedor

## Cómo medir
Con GSC restaurado: comparar a 30/60/90 días impresiones, CTR y posición de queries comerciales ("enchape medellín", "remodelación apartamentos medellín", "cielo raso medellín") y del cluster de blog.
