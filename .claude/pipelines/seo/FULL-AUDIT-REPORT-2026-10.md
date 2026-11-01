# Auditoría SEO + GEO — arkava.com.co
**Fecha:** 2026-10-31 · **Páginas rastreadas:** 32 (100% del sitemap, todas 200) · **Tipo de negocio:** servicio local premium (remodelación y acabados, Medellín)

## Resumen ejecutivo

**SEO Health Score: 51/100** (abril 2026: 28/100)

| Categoría | Peso | Score |
|---|---|---|
| SEO técnico | 25% | 45 |
| Calidad de contenido | 25% | 50 |
| On-page | 20% | 55 |
| Schema | 10% | 45 |
| Performance | 10% | 60 (estimado, sin datos de campo) |
| Imágenes | 5% | 70 |
| Preparación para IA (GEO) | 5% | 40 |

Avances desde abril: meta descriptions presentes en todo el sitio, robots.txt y sitemap activos, blog con 7 artículos con precios y FAQ, `lang="es-CO"`, poster en videos del hero, Lighthouse SEO 100 / Best Practices 100 / Accesibilidad 94.

### Top 5 problemas críticos
1. **GSC sin acceso.** La propiedad `https://www.arkava.com.co/` figura "Sin verificar" para bryanvillamilacevedo@gmail.com y la service account (`siteUnverifiedUser`). Sin datos de rendimiento desde el 31-may. El archivo `google21dbef902e6f00c8.html` sigue publicado (200), así que el token pertenece a otra cuenta o se perdió el propietario.
2. **Canonical apunta a URL que redirige.** `astro.config.mjs` usa `site: 'https://arkava.com.co'` → canonical, og:url, sitemap y schema usan el apex, pero el apex responde **307 (temporal)** hacia `www`. Señales de canonicalización contradictorias en las 32 páginas.
3. **8 páginas de servicio prácticamente vacías.** 54–80 palabras renderizadas, una sola frase de contenido, sin H2. Son las páginas con intención comercial ("enchape Medellín", "estuco Medellín"…) y no pueden competir.
4. **robots.txt bloquea `/_astro/`.** Ahí viven el CSS y JS del sitio. Googlebot no puede cargar los recursos de renderizado.
5. **Link de WhatsApp roto en el home.** `https://wa.me/3207672761` (sin el 57). Es el CTA "Iniciemos juntos". Abre otro número o falla.

### Top 5 quick wins
1. Cambiar `site` a `https://www.arkava.com.co` en `astro.config.mjs` (1 línea, arregla canonical + sitemap + og:url).
2. Quitar `Disallow: /_astro/` de `public/robots.txt` y apuntar el sitemap a `www`.
3. Title del home: hoy es solo **"Arkava"** (6 caracteres). Propuesta: `Remodelación y acabados de lujo en Medellín | Arkava`.
4. Corregir el wa.me a `573207672761`.
5. Retirar "visita técnica gratuita/sin costo" en 5 lugares (instrucción del cliente): `contacto.astro:22`, `blog/[slug].astro:193`, `microcemento-vs-pintura-paredes.md:16,179`, `tipos-cielo-raso-hogar.md:166`.

---

## 1. Google Search Console

**Estado: sin acceso.** No fue posible obtener datos del período ago–oct 2026.

- API: `403 User does not have sufficient permission for site 'https://www.arkava.com.co/'`
- UI con la cuenta del usuario: "Vaya, no puedes acceder a esta propiedad" + botón "Verificar la propiedad". En el selector aparece "Sin verificar".
- Sitio en vivo: archivo HTML de verificación `google21dbef902e6f00c8.html` responde 200; no hay meta `google-site-verification`; no hay TXT de Google en el DNS del apex.

**Línea base disponible (31-may, 90 días):** 12 clics, 1.114 impresiones, CTR 1,08 %, posición 6,7. Cluster "tipos de cielo raso" en pos. 1–3 con 0 clics.

**Acción:**
1. Entrar a GSC → propiedad www → "Verificar" con método *archivo HTML*. Si el token `google21dbef902e6f00c8` lo generó esta cuenta, verifica en 1 clic. Si no, descargar el nuevo archivo, subirlo a `public/` y desplegar.
2. Mejor: crear **propiedad de dominio** `sc-domain:arkava.com.co` con TXT en DNS (cubre apex + www + http/https; no se pierde con un redeploy).
3. Volver a añadir `arkava@arkava-490622.iam.gserviceaccount.com` como usuario (lectura completa).
4. Reenviar `https://www.arkava.com.co/sitemap-index.xml`.

---

## 2. SEO técnico

| Check | Estado | Detalle |
|---|---|---|
| HTTPS / HSTS | ✅ | HSTS 2 años |
| http → https | ✅ | 308 |
| Apex → www | ⚠️ | **307 temporal**; debe ser 308/301 (Vercel → Domains → redirect permanente) |
| Canonical | ❌ | Todas apuntan a `https://arkava.com.co/...` (URL que redirige) |
| Sitemap | ⚠️ | 32 URLs correctas pero con host apex; `lastmod` = fecha de build en todas (`lastmod: new Date()`), no aporta señal |
| robots.txt | ❌ | `Disallow: /_astro/` bloquea CSS/JS; Sitemap apunta al apex |
| Trailing slash | ⚠️ | `/contacto` y `/contacto/` responden 200 ambas. Enlaces internos del blog van sin slash (`/servicios/enchape`). Configurar `trailingSlash: 'always'` o redirect |
| 404 | ✅ | Responde 404 real |
| Headers de seguridad | ⚠️ | Solo HSTS. Faltan `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/CSP |
| `lang` | ✅ | `es-CO` |
| Indexabilidad | ✅ | Sin `noindex` en ninguna página |
| Frescura | ⚠️ | Último deploy/contenido: 31-may-2026. 5 meses sin publicar |

## 3. Contenido (E-E-A-T)

| Tipo | Páginas | Palabras | Diagnóstico |
|---|---|---|---|
| Home | 1 | ~1.200 | Bien. H1 con Medellín, FAQ, proceso, testimonios |
| Servicios | 8 | **54–80** | ❌ Thin content crítico. Una frase por página, sin precios en el cuerpo (sí en la meta), sin proceso, sin FAQ, sin proyectos relacionados, sin enlaces al blog |
| Hub servicios | 1 | ~345 | Aceptable |
| Proyectos | 11 | 160–215 (Vesubio 377) | ⚠️ Delgado. Sin ubicación, año, m², alcance, materiales, duración, testimonio del cliente |
| Blog | 7 | 870–1.670 | ✅ Fuerte: precios 2026, tablas, FAQ, geo. Faltan autor y fecha de actualización |
| Sobre nosotros | 1 | ~420 | ⚠️ Sin equipo con nombre/rol, sin NIT, sin años/cifras verificables |
| Contacto | 1 | **~70** | ⚠️ Sin dirección, horarios ni mapa. H1 "Contactanos" sin tilde |

**E-E-A-T:**
- Experiencia: ✅ portafolio real con hoteles reconocidos (Hunters, Heiss, Nakua, Calle Flora). Es el activo más fuerte y está subexplotado.
- Expertise: ⚠️ artículos firmados por "Organization", sin autor con credenciales (arquitecto/ingeniero).
- Autoridad: ❌ ningún enlace a redes, Google Business Profile, Houzz, directorios. Cero `sameAs`.
- Confianza: ⚠️ email de contacto `remodelacionaca.vamos@gmail.com` (Gmail, no coincide con la marca). Sin dirección física, sin NIT. Para un público premium esto resta.

**Inconsistencias de marca:** sobre-nosotros dice "más de 10 años de experiencia" en la meta; verificar que el dato sea real y repetirlo en home y schema (`foundingDate`).

## 4. On-page

| Problema | Páginas | Fix |
|---|---|---|
| Title del home = "Arkava" | 1 | `Remodelación y acabados de lujo en Medellín \| Arkava` |
| H1 genéricos sin keyword | 8 servicios | "Enchape" → "Enchape de baños, cocinas y fachadas en Medellín". "Carpinteria" y "Muros" sin tilde/contexto |
| Title "Muros en Medellín" | /servicios/muros-drywall | "Muros en drywall y superboard en Medellín \| Arkava" |
| Titles largos (>60) | 7 blog + Vesubio | Se cortan en SERP. Quitar "\| Blog Arkava" → "\| Arkava" |
| Meta descriptions >160 | 9 (servicios, blog) | Recortar a 150–155 |
| Meta de proyectos truncada a 155 a mitad de palabra + markdown `**` visible | 11 proyectos | Generar meta propia en Hygraph (campo `seoDescription`) o limpiar markdown y cortar en límite de palabra |
| Title de Vesubio duplica "Proyecto" | 1 | "Remodelación apartamento Vesubio, Medellín \| Arkava" |
| OG image genérica (`contacto.webp`) | 13 páginas | OG por servicio con foto real del trabajo |
| og:title del home = "Arkava" | 1 | Igualar al nuevo title |
| Enlazado interno | servicios ↔ blog | Servicios no enlazan a ningún artículo. Cada servicio debe enlazar su guía de precios y 2–3 proyectos |
| Headings | home | Salto H2 → H4 en tarjetas de proyecto |

## 5. Schema / datos estructurados

Actual: `LocalBusiness` en todas las páginas, `Service` en servicios, `Article` + `FAQPage` en 5 de 7 artículos.

Problemas:
- **Dos `LocalBusiness` separados en el home** sin `@id` común (uno con datos, otro solo con reviews). Google los ve como entidades distintas.
- **Reviews auto-publicadas** (`aggregateRating` 5/5 con 3 testimonios propios). Google no muestra estrellas para reviews de la propia empresa sobre sí misma y puede considerarse markup engañoso. Quitar `aggregateRating`/`review` del schema o reemplazar con reviews reales de GBP sin marcado.
- `LocalBusiness` incompleto: sin `streetAddress`, `geo`, `openingHoursSpecification`, `image`, `logo`, `sameAs`, `@id`, `foundingDate`. Tipo genérico: usar `HomeAndConstructionBusiness` (o `GeneralContractor`).
- `url` usa apex; `mainEntityOfPage` del Article sin slash final (no coincide con canonical).
- `Article.author` = Organization. Añadir `Person` con nombre y rol; añadir `dateModified`.
- Faltan: `BreadcrumbList` (todas), `WebSite` + `Organization` (home), `FAQPage` en microcemento y cocina (tienen FAQ visible), `CreativeWork`/`Project` en proyectos con `locationCreated`.
- Nota: Google limita los rich results de FAQ a sitios de gobierno/salud desde 2023; el `FAQPage` sigue sirviendo para IA y entendimiento, no para estrellitas en SERP.

## 6. Performance

PageSpeed API agotada (cuota diaria) y sin datos CrUX de campo (tráfico bajo). Lighthouse móvil sin performance. Hallazgos por inspección:

- **Helvetica.ttf de 318 KB precargada** en todas las páginas. Convertir a WOFF2 con subset latino (~30–40 KB) o usar la fuente del sistema. Mismo para `PPSupplySans-Regular.otf` (46 KB → WOFF2).
- CSS principal 127 KB (`argamasa.*.css`), JS 114 KB en el home. Revisar qué entra al bundle (GSAP + Framer Motion juntos).
- Videos hero con `preload="none"` + poster: ✅ correcto.
- Logo del header con `loading="lazy"`: debe ser eager.
- Imágenes de Hygraph (`graphassets.com`) sin transformación de tamaño/formato. Usar parámetros de resize o `<Image>` de Astro.

## 7. Imágenes

- Alt presentes en 31 de 32 páginas (1 imagen sin alt en home).
- Alt del logo "arkava" en minúscula; preferir "Arkava — remodelación y acabados en Medellín".
- Imágenes de proyectos: alts deberían incluir proyecto + material + ubicación.

## 8. GEO — Preparación para buscadores con IA

| Señal | Estado |
|---|---|
| Crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) | ✅ Permitidos (`User-agent: *`) |
| `llms.txt` | ❌ 404 |
| Contenido citable (datos, precios, tablas) | ✅ Blog fuerte: rangos de precio por m², tiempos, tablas comparativas |
| Contenido citable en servicios | ❌ Vacío. Las IA no tienen qué citar en las páginas comerciales |
| Entidad de marca (sameAs, GBP, Wikidata, directorios) | ❌ Sin perfiles enlazados; la IA no puede confirmar que Arkava existe fuera de su web |
| Menciones de terceros | ⚠️ Sin verificar. Los hoteles del portafolio son la mejor fuente de menciones/enlaces |
| Respuestas directas al inicio de cada sección | ⚠️ Parcial en blog |
| Autoría | ❌ Sin persona experta identificada |

**Score de citabilidad estimado:** blog 70/100, servicios 10/100, proyectos 30/100.

Recomendaciones GEO:
1. Crear `public/llms.txt` con descripción de la empresa, servicios, zonas, precios de referencia y enlaces a guías.
2. Cada servicio: párrafo de 40–60 palabras que responda "¿qué es / cuánto cuesta / cuánto tarda en Medellín?" en las primeras líneas.
3. Consolidar entidad: Google Business Profile, Instagram, Facebook, LinkedIn, Houzz → enlazados desde el footer y en `sameAs`.
4. Pedir a Hunters, Heiss, Nakua y Calle Flora una mención/enlace como proveedor de acabados.
5. Firmar los artículos con un profesional real (nombre, cargo, matrícula si aplica).

## 9. Accesibilidad (Lighthouse 94)

- Contraste insuficiente: botones blancos sobre `#E35205` (3,83:1) y footer `#F9F3F2` sobre `#C18778` (2,73:1).
- `aria-label="Pagina de Contacto"` no coincide con texto visible "Contáctanos".
