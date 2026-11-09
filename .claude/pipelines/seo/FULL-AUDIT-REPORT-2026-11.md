# Auditoría SEO: arkava.com.co (2026-11-08)

Revisión tras publicar el hub `/servicios` y las 8 landings internas. Negocio: servicio local (remodelación y acabados, Medellín).

**Método:** rastreo de las 32 URLs del sitemap, Lighthouse móvil en `/servicios/pintura/`, medición móvil con Slow 4G y CPU 4× en `/`, `/servicios/` y `/servicios/pintura/`.
**Sin datos de:** Search Console (propiedad sin verificar: `siteUnverifiedUser`, 403), PageSpeed Insights (cuota agotada), CrUX (sin datos de campo), backlinks y paquete de Maps.

## Puntaje: 76/100 (octubre: 51)

| Categoría | Peso | Puntaje |
|---|---|---|
| SEO técnico | 25 % | 88 |
| Contenido | 25 % | 70 |
| On-page | 20 % | 76 |
| Datos estructurados | 10 % | 72 |
| Rendimiento | 10 % | 62 |
| Imágenes | 5 % | 85 |
| Búsqueda con IA | 5 % | 78 |

El puntaje mide el sitio. No incluye autoridad externa, reseñas ni Google Business Profile, que pesan mucho en búsquedas locales.

## Lo que está bien

- 32/32 URLs responden 200, con canonical correcto, un solo H1, `lang=es-CO` y `<main>`.
- Sin títulos ni descripciones duplicados. Sin imágenes sin `alt`.
- `robots.txt` y sitemap correctos. `llms.txt` publicado.
- HSTS, `X-Frame-Options`, `X-Content-Type-Options` y `Referrer-Policy` activos.
- Landings con 976 a 1.570 palabras en HTML inicial, frente a ~69 antes.
- Lighthouse móvil en pintura: SEO 100, buenas prácticas 100, accesibilidad 97.
- JSON-LD válido en todas las páginas.

## Hallazgos

### Crítico

1. **Search Console sin verificar.** No se puede pedir indexación ni medir. El archivo `google21dbef902e6f00c8.html` responde 200.

### Alto

2. **Las búsquedas de mayor demanda no tienen página.** Remodelación de apartamentos, baños, obra blanca, cocinas, locales y hoteles. Sus tarjetas del hub van al blog, a `/contacto/` o a `/proyectos/`.
3. **LCP móvil lento en páginas principales.** Home 6,3 s (elemento `VIDEO`), hub 3,9 s, pintura 1,86 s, con Slow 4G y CPU 4×. CLS 0 en las tres.
4. **Reseñas en schema sin verificar.** `AggregateRating` 5/5 con 3 reseñas en `LocalBusiness`, tomadas de testimonios del propio sitio. Los archivos conservan nombres de ejemplo (`sarah-jenkins.md`) con otro nombre adentro. Google no muestra reseñas autopublicadas, y si no son reales es un riesgo de política.
5. **Señales locales débiles.** La dirección no tiene calle, `/contacto/` tiene 66 palabras y el schema no declara horario.
6. **El home no enlaza a ninguna landing.** Los boxes apuntan a `/servicios/#id`, que Google trata como `/servicios/`.
7. **Proyectos delgados y aislados.** 11 proyectos con 161 a 372 palabras, ninguno enlaza a un servicio y varios reciben un solo enlace interno.

### Medio

8. Dos enlaces internos rotos (404): `/blog/instalacion-cielo-raso-drywall-medellin-precios/` desde `cuanto-cuesta-enchape-medellin` y `tipos-cielo-raso-hogar`; `/blog/costos-remodelacion-integral-medellin-2026/` desde `guia-remodelacion-apartamentos-medellin` y `tipos-cielo-raso-hogar`.
9. Sitemap sin `lastmod` en landings, hub, home y proyectos, y `priority` 0,7 en todo.
10. `arkava.com.co` redirige a `www` con 307 temporal. Conviene 308 o 301.
11. Tres artículos del blog no enlazan a ningún servicio: contratar expertos, remodelar baño y remodelar cocina.
12. Sin `Content-Security-Policy`.
13. El H1 del home ("Expertos en Construcción y Remodelación...") y el título ("acabados de lujo") apuntan a términos distintos.
14. `/proyectos/` salta de H1 a H3.

### Bajo

15. Descripciones largas: home 172, sobre nosotros 192. Títulos largos: blog 63, Vesubio 67.
16. Contraste bajo en textos pequeños de las landings (3,5 a 4,1:1).
17. Imágenes sin dimensiones en blog y proyectos (riesgo de CLS).

## Expectativas

- El `FAQPage` no dará resultados enriquecidos: Google los limita a sitios de gobierno y salud. Sigue siendo útil para buscadores con IA.
- Falta autoridad externa. El plan 2027 la cubre en soporte: reseñas, GBP y menciones.
