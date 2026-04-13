# Plan de Acción SEO — Arkava
**Fecha:** 12 de abril de 2026
**Score actual:** 62/100
**Score objetivo:** 82/100 en 90 días

---

## CRÍTICO — Implementar esta semana

### C1. Meta descriptions en páginas sin descripción
**Afecta:** /sobre-nosotros, /proyectos, /contacto, /blog (index)
**Impacto:** Alto — Google genera snippets genéricos que reducen CTR

Las páginas usan `ConditionalLayout` o `BaseLayout` pero no pasan `description`. Verificar y añadir en cada página:
```astro
<BaseLayout description="Texto aquí" ...>
```

Páginas de servicios: verificar que `SEO_DESCRIPTION` se pasa como prop `description` al layout.

---

### C2. FAQPage schema en homepage
**Afecta:** Homepage (6 preguntas frecuentes visibles)
**Impacto:** Muy alto — Rich snippets de FAQ aparecen directamente en SERPs

Agregar al `schema` prop del BaseLayout en `index.astro`:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta una remodelación en Medellín?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[respuesta de la FAQ]"
      }
    }
    // ... 5 preguntas más
  ]
}
```

---

### C3. Dirección física completa en LocalBusiness schema
**Afecta:** Todas las páginas (BaseLayout)
**Impacto:** Alto — sin streetAddress, Google Maps y Local SEO no funcionan correctamente

En `BaseLayout.astro`, actualizar el schema con:
- `streetAddress` completa
- `postalCode`
- `geo.latitude` y `geo.longitude`
- `openingHours` (ej: `Mo-Fr 08:00-18:00`)

---

### C4. H2s en páginas de servicios
**Afecta:** 8 páginas (/servicios/enchape, /pintura, /estuco, etc.)
**Impacto:** Alto — sin H2s Google no puede extraer subtemas para AI Overviews

Cada página de servicio debe tener al menos:
- H2: "¿Qué incluye el servicio de [X] en Medellín?"
- H2: "¿Cuánto cuesta [X] en Medellín? Precios 2026"
- H2: "Preguntas frecuentes sobre [X]"

---

## ALTO — Implementar en 2 semanas

### A1. Internal linking: blog → servicios
**Afecta:** 3 artículos de blog
**Impacto:** Alto — distribución de PageRank y mejora de conversión

- Artículo "Guía remodelación" → agregar links a `/servicios/enchape`, `/servicios/pintura`, `/servicios/estuco`
- Artículo "Microcemento vs pintura" → link a `/servicios/muros-decorativos`
- Artículo "Tipos cielo raso" → link a `/servicios/cielo-raso`

---

### A2. FAQPage schema en artículos de blog
**Afecta:** 3 artículos (todos tienen sección "Preguntas frecuentes")
**Impacto:** Alto — FAQ rich snippets en SERPs + AI citation readiness

Agregar schema `FAQPage` al frontmatter o al componente de blog post.

---

### A3. BreadcrumbList schema
**Afecta:** Páginas de servicios, blog, proyectos
**Impacto:** Medio — mejora visualización en SERPs y navegación

Ejemplo para página de servicio:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://arkava.com.co" },
    { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://arkava.com.co/servicios" },
    { "@type": "ListItem", "position": 3, "name": "Enchape", "item": "https://arkava.com.co/servicios/enchape" }
  ]
}
```

---

### A4. Prioridades de sitemap diferenciadas
**Afecta:** `astro.config.mjs`
**Impacto:** Medio — señales de rastreo para Googlebot

```js
sitemap({
  customPages: [...],
  serialize(item) {
    if (item.url === 'https://arkava.com.co/') item.priority = 1.0;
    if (item.url.includes('/servicios/')) item.priority = 0.9;
    if (item.url.includes('/blog/')) item.priority = 0.7;
    if (item.url.includes('/proyectos/')) item.priority = 0.6;
    return item;
  }
})
```

---

### A5. Consolidar email de contacto
**Afecta:** Schema LocalBusiness, página /contacto, schema de servicios
**Impacto:** Medio-alto — E-E-A-T y profesionalismo de marca

Usar únicamente `contacto@arkava.com.co`. Eliminar `remodelacionaca.vamos@gmail.com` de toda la web.

---

## MEDIO — Implementar en 1 mes

### M1. Contenido adicional en páginas de servicios
Cada página de servicio debería alcanzar 1,200–1,500 palabras con:
- Descripción del proceso paso a paso
- Tipos/variantes del servicio
- Tabla de precios orientativa (rangos)
- Zona de Medellín donde se aplica más
- Galería con fotos del portafolio específico del servicio
- 3-5 FAQs específicas del servicio

**Priorizar por volumen de búsqueda:**
1. `/servicios/enchape` — alto volumen ("enchape de baños Medellín")
2. `/servicios/pintura` — alto volumen ("pintura de apartamentos Medellín")
3. `/servicios/estuco` — volumen medio-alto

---

### M2. Primer artículo de blog nuevo (ver recomendaciones GEO abajo)
Tema 1: **"¿Cuánto cuesta remodelar un baño en Medellín? Precios 2026"**
Tema 2: **"Empresa de remodelación en Medellín: cómo elegir (sin cometer errores)"**

---

### M3. Alt texts descriptivos en /sobre-nosotros
Cambiar "Equipo Arkava 1-9" por descripciones como:
"Maestro de obra Arkava en proyecto residencial El Poblado, Medellín"
"Director de proyectos Arkava supervisando acabados en enchape de baño"

---

### M4. HowTo schema para proceso de 5 etapas
En homepage, el proceso de 5 etapas puede ser marcado como `HowTo` para aparecer en rich results:
```json
{
  "@type": "HowTo",
  "name": "Cómo funciona una remodelación con Arkava",
  "step": [
    { "@type": "HowToStep", "name": "Evaluación técnica", "text": "..." },
    ...
  ]
}
```

---

### M5. Fuentes en formato WOFF2
Convertir `/public/fonts/` de OTF/TTF a WOFF2 para reducir peso (~30-40% más ligero).

---

## BAJO — Backlog

### B1. Poster en videos autoplay del hero
Agregar atributo `poster="[imagen-preview]"` a los elementos `<video>` para mejorar LCP.

### B2. Página de zona geográfica (SEO local avanzado)
Crear páginas tipo `/remodelacion-el-poblado`, `/remodelacion-laureles`, `/remodelacion-envigado` para capturar búsquedas por barrio.

### B3. Google Business Profile
Verificar y optimizar el perfil GBP con: fotos del portafolio, horario, servicios, respuesta a reseñas, área de servicio definida.

### B4. Página de testimonios/reseñas
Agregar página `/resenas` o sección dedicada en homepage con `Review` schema y 10+ testimonios de clientes.

### B5. Autor con bio en artículos de blog
Crear página de autor `/autor/equipo-arkava` con credenciales, años de experiencia, servicios. Mejora E-E-A-T.

---

## Cronograma sugerido

| Semana | Tareas |
|--------|--------|
| 1 | C1 (meta descriptions), C2 (FAQ schema homepage), C3 (dirección schema) |
| 2 | C4 (H2s servicios), A5 (email), A1 (internal linking blog) |
| 3 | A2 (FAQ schema blog), A3 (breadcrumb schema), A4 (sitemap prioridades) |
| 4 | M1 inicio (enchape + pintura) |
| 5-6 | M2 (artículo blog #4), M3 (alt texts), M4 (HowTo schema) |
| 7-8 | M1 continúa (estuco + drywall) |
| 9-12 | B1-B5 según prioridad de negocio |

---

*Plan generado: 12 de abril de 2026 — Arkava SEO Agent*
