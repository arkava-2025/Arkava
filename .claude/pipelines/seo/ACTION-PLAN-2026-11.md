# Plan de acción SEO (2026-11-08)

Detalle en `FULL-AUDIT-REPORT-2026-11.md`.

## Search Console: hoy

1. Verificar la propiedad `https://www.arkava.com.co/` con la cuenta dueña (archivo HTML ya publicado).
2. Enviar `https://www.arkava.com.co/sitemap-index.xml`.
3. Solicitar indexación del día 1 (Google limita las solicitudes diarias).

**Día 1:** `/`, `/servicios/`, `/servicios/pintura/`, `/servicios/enchape/`, `/servicios/cielo-raso/`, `/servicios/muros-drywall/`, `/servicios/muros-decorativos/`, `/servicios/estuco/`, `/servicios/carpinteria/`, `/servicios/argamasa/`.

**Día 2, con los enlaces rotos corregidos:** `/blog/guia-remodelacion-apartamentos-medellin/`, `/blog/tipos-cielo-raso-hogar/`, `/blog/cuanto-cuesta-enchape-medellin/`, `/blog/microcemento-vs-pintura-paredes/`, `/blog/cuanto-cuesta-remodelar-bano-medellin/`.

**No solicitar:** direcciones con `#`, proyectos y `/contacto/` hasta enriquecerlos. Siguen en el sitemap.

**Medir:** línea base al verificar, revisión a las 2, 4 y 8 semanas (Páginas indexadas, impresiones y consultas de `/servicios/`).

## Prioridad

### Crítico
- [ ] Verificar Search Console (usuario).

### Alto
- [ ] Crear landings: remodelación de apartamentos, obra blanca, baños y hoteles.
- [ ] Reducir LCP móvil del home (video) y del hub.
- [ ] Confirmar reseñas reales o retirar `AggregateRating` y `Review` del schema.
- [ ] Publicar dirección completa, horario y ampliar `/contacto/` (requiere datos de Arkava).
- [ ] Enlazar landings desde el home sin perder la animación.
- [ ] Enriquecer proyectos: ubicación, alcance y enlaces a sus servicios.
- [ ] Optimizar Google Business Profile y pedir reseñas.

### Medio
- [ ] Corregir o retirar los 2 enlaces rotos del blog.
- [ ] `lastmod` real en todo el sitemap.
- [ ] Redirección 308 de `arkava.com.co` a `www` en Vercel.
- [ ] Enlazar a servicios desde los 3 artículos que no lo hacen.
- [ ] Alinear H1 y título del home.
- [ ] Corregir salto H1 → H3 en `/proyectos/`.

### Bajo
- [ ] Acortar descripciones y títulos largos.
- [ ] Subir contraste de textos pequeños.
- [ ] Dimensiones en imágenes de blog y proyectos.
- [ ] Agregar `Content-Security-Policy`.
