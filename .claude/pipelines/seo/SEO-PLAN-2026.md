# Plan SEO 2026 — arkava.com.co
**Elaborado:** 2026-05-31
**Basado en:** Datos reales GSC (90 días) + Análisis competidores Medellín
**Score actual:** 28/100 → **Meta a 3 meses:** 65/100

---

## DIAGNÓSTICO EJECUTIVO

### El problema central no es posicionamiento — es conversión de impresiones

Arkava ya rankea en posición 1-3 para varias keywords con potencial real. El sitio tiene 1.114 impresiones en solo 3 meses, lo cual es prometedor para un dominio nuevo.

**El problema:** 1.114 impresiones → solo 12 clicks → CTR 1.08% cuando debería ser 4-8%.

**Causa raíz:** Los snippets (title + meta description) no persuaden al usuario para hacer click. El 95% de las impresiones se desperdician antes de que el usuario llegue al sitio.

**Con las mismas posiciones actuales**, optimizando únicamente los snippets de las 5 páginas con más impresiones, el sitio puede pasar de 12 a 60-80 clicks mensuales en 2-4 semanas.

---

## SECCIÓN 1: QUICK WINS (Semanas 1-2)

Estas acciones tienen impacto inmediato sin crear nuevo contenido.

### QW1 — Meta descriptions únicas para las 5 páginas críticas

**Páginas a intervenir (orden por impacto):**

#### `/blog/tipos-cielo-raso-hogar` (322 impr, 0 clicks — MÁXIMA PRIORIDAD)
```
Title actual: desconocido (posiblemente genérico)
Title propuesto: Tipos de Cielo Raso para el Hogar: Guía Completa 2026 | Arkava Medellín
Meta description propuesta: ¿No sabes qué tipo de cielo raso elegir? Comparamos drywall, PVC, fibra mineral y madera con precios reales. Instalación profesional en Medellín.
```
*Objetivo: pasar de 0% a 3-5% CTR. Con 322 impr = 10-16 clicks adicionales por mes.*

#### `/blog/cuanto-cuesta-enchape-medellin` (338 impr, 0.59% CTR)
```
Title propuesto: ¿Cuánto Cuesta Enchapar un Baño en Medellín? Precios Reales 2026
Meta description propuesta: Precios de enchape por m²: materiales, mano de obra y acabados en Medellín. Sin letra pequeña. Arkava — remodeladores certificados con póliza de cumplimiento.
```
*Objetivo: pasar de 0.59% a 3-4% CTR. Con 338 impr = 10-13 clicks adicionales.*

#### `/blog/guia-remodelacion-apartamentos-medellin` (199 impr, 2.01% CTR)
```
Title propuesto: Remodelación de Apartamentos en Medellín: Costos Reales y Etapas 2026
Meta description propuesta: ¿Cuánto cuesta remodelar tu apartamento en Medellín? Guía con precios por m², etapas, tiempos y consejos de expertos. Más de 50 proyectos entregados.
```
*Objetivo: pasar de 2.01% a 4-5% CTR.*

#### `/` (homepage — 51 impr, 1.96% CTR)
```
Title propuesto: Arkava | Remodelación y Acabados Arquitectónicos Premium en Medellín
Meta description propuesta: Empresa de remodelación integral en Medellín. Enchapes, carpintería, drywall y diseño interior. Contratos legales, pólizas de cumplimiento. Solicita cotización.
```

#### `/servicios` (74 impr, pos 16 — necesita subir)
```
Title propuesto: Servicios de Remodelación en Medellín | Arkava — Acabados de Lujo
Meta description propuesta: Remodelación integral, enchapes, cielo raso, carpintería a medida y más. Servicio llave en mano con diseño + ejecución en Medellín y área metropolitana.
```

**Implementación técnica:** Editar `src/layouts/BaseLayout.astro` (ya identificado como archivo clave) + páginas individuales que pasen meta description como prop.

---

### QW2 — Corregir canonical URLs (astro.config.mjs)

**Issue crítico:** Sin `site:` en astro.config.mjs, las canonical URLs están rotas. Google puede estar indexando versiones duplicadas.

```js
// astro.config.mjs — agregar:
export default defineConfig({
  site: 'https://www.arkava.com.co',
  // ... resto de config
})
```

**Impacto:** Inmediato en la próxima re-crawl de Googlebot.

---

### QW3 — robots.txt y sitemap

**robots.txt básico** en `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://www.arkava.com.co/sitemap-index.xml
```

**Sitemap:** Activar `@astrojs/sitemap` en astro.config.mjs (si no está activo):
```js
import sitemap from '@astrojs/sitemap';
// integrations: [sitemap(), ...]
```

---

### QW4 — Schema LocalBusiness completo en homepage

Mover el schema (actualmente solo en `/contacto`) a `BaseLayout.astro` para que esté en todas las páginas:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Arkava",
  "description": "Empresa de remodelación integral y acabados arquitectónicos premium en Medellín",
  "url": "https://www.arkava.com.co",
  "telephone": "[teléfono]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia",
    "addressCountry": "CO"
  },
  "areaServed": ["Medellín", "Envigado", "Itagüí", "Sabaneta", "Bello"],
  "priceRange": "$$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de remodelación y acabados"
  }
}
```

---

### QW5 — FAQ Schema en artículo de cielo raso

Este artículo rankea #1-2 pero con 0 clicks. Añadir FAQ schema con las preguntas reales del GSC:

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "¿Cuáles son los tipos de cielo raso?", "acceptedAnswer": {"@type": "Answer", "text": "..."}},
    {"@type": "Question", "name": "¿Cuál es el mejor material para cielo raso?", "acceptedAnswer": {"@type": "Answer", "text": "..."}}
  ]
}
```
*Esto puede aumentar el espacio visual del snippet y generar clicks desde posición 1.*

---

## SECCIÓN 2: TOP 20 KEYWORDS DE OPORTUNIDAD

Ordenadas por potencial ROI (volumen × intención × dificultad de Arkava).

| # | Keyword | Vol/mes est. | Dificultad | Intención | URL objetivo | Estado |
|---|---|---|---|---|---|---|
| 1 | tipos de cielo raso | 800-2,000 | Media | Informacional | `/blog/tipos-cielo-raso-hogar` | Existe — optimizar snippet |
| 2 | cuanto cuesta enchapar un baño Colombia/Medellín | 400-900 | Media | Comercial | `/blog/cuanto-cuesta-enchape-medellin` | Existe — optimizar |
| 3 | remodelación de apartamentos Medellín | 300-800 | Alta | Comercial | Homepage + blog | Parcial |
| 4 | obra blanca Medellín | 500-1,000 | Media | Comercial | Nueva página de servicio | No existe |
| 5 | remodelación de baños Medellín | 400-900 | Media-alta | Comercial | Nueva landing | No existe |
| 6 | remodelación de cocinas Medellín | 300-800 | Media-alta | Comercial | Nueva landing | No existe |
| 7 | cielo raso drywall Medellín | 200-500 | Baja | Comercial | `/servicios/cielo-raso` | Existe — expandir |
| 8 | enchape de pisos Medellín | 200-500 | Baja-media | Comercial | Nueva landing | No existe |
| 9 | carpintería a medida Medellín | 200-500 | Baja | Comercial | `/servicios/carpinteria` (si existe) | Verificar |
| 10 | presupuesto remodelación Medellín | 300-700 | Media | Comercial | Blog o landing | No existe |
| 11 | acabados arquitectónicos Medellín | 100-300 | Baja | Comercial premium | Homepage + nueva página | No existe |
| 12 | empresa remodelación Medellín confiable | 200-500 | Media | Comercial | Sobre nosotros + homepage | No existe |
| 13 | microcemento paredes Medellín | 200-400 | Baja | Comercial | Nueva landing o blog | Parcial (blog) |
| 14 | muros decorativos Medellín | 100-300 | Baja | Comercial | Nueva landing | No existe |
| 15 | remodelación hoteles Medellín | 50-150 | Muy baja | Comercial B2B | Nueva página sectorial | No existe |
| 16 | diseño interior Medellín remodelación | 150-400 | Media | Comercial | Homepage / servicios | No existe |
| 17 | pintura estuco Medellín | 200-500 | Baja | Comercial | Nueva landing | No existe |
| 18 | cuanto cuesta remodelar apartamento Medellín | 400-800 | Media | Informacional+comercial | Blog existente + expandir | Parcial |
| 19 | cielo raso PVC Medellín | 200-500 | Baja | Comercial | Blog o landing | No existe |
| 20 | contratista remodelación Medellín | 100-300 | Baja | Comercial | Homepage / contacto | No existe |

---

## SECCIÓN 3: PÁGINAS A CREAR / OPTIMIZAR

### TIER 1 — Optimizar páginas existentes (impacto inmediato)

| Página | Acción | KW objetivo | Prioridad |
|---|---|---|---|
| `/blog/tipos-cielo-raso-hogar` | Nuevo title + meta desc + FAQ schema + ampliar contenido con precios | tipos de cielo raso | 🔴 URGENTE |
| `/blog/cuanto-cuesta-enchape-medellin` | Nuevo title + meta desc + precios actualizados 2026 | cuanto cuesta enchape Medellín | 🔴 URGENTE |
| `/blog/guia-remodelacion-apartamentos-medellin` | Mejorar snippet + añadir calculadora básica | remodelación apartamentos Medellín | 🟡 ALTA |
| `/` homepage | Title + meta desc + H1 revisado + schema LocalBusiness | Arkava remodelación Medellín | 🔴 URGENTE |
| `/servicios` | Expandir contenido, añadir H2s por servicio, meta desc | servicios remodelación Medellín | 🟡 ALTA |
| `/sobre-nosotros` | Corregir H2 placeholder "subtitle about us", añadir E-E-A-T signals | empresa remodelación Medellín | 🟡 ALTA |

### TIER 2 — Nuevas landing pages de servicio (mes 1-2)

| Página a crear | KW objetivo | Volumen | Prioridad |
|---|---|---|---|
| `/servicios/remodelacion-banos-medellin` | remodelación de baños Medellín | 400-900 | 🔴 ALTA |
| `/servicios/remodelacion-cocinas-medellin` | remodelación de cocinas Medellín | 300-800 | 🔴 ALTA |
| `/servicios/obra-blanca-medellin` | obra blanca Medellín | 500-1,000 | 🔴 ALTA |
| `/servicios/enchape-pisos-medellin` | enchape pisos Medellín | 200-500 | 🟡 MEDIA |
| `/servicios/muros-decorativos-medellin` | muros decorativos Medellín | 100-300 | 🟡 MEDIA |

### TIER 3 — Nuevos artículos de blog (mes 2-3)

| Artículo | KW objetivo | Intención | Prioridad |
|---|---|---|---|
| "Cielo raso PVC vs Drywall: precios y cuál elegir en Medellín 2026" | cielo raso PVC Medellín | Informacional+comercial | 🔴 ALTA |
| "¿Cuánto cuesta remodelar un baño en Medellín? Precios reales 2026" | cuanto cuesta remodelar baño Medellín | Comercial | 🔴 ALTA |
| "¿Cuánto cuesta remodelar una cocina en Medellín? Guía 2026" | cuanto cuesta remodelar cocina Medellín | Comercial | 🟡 ALTA |
| "Obra blanca en Medellín: qué incluye y cuánto cuesta" | obra blanca Medellín | Comercial | 🟡 ALTA |
| "Empresa de remodelación en Medellín: cómo elegir bien (sin arriesgar)" | empresa remodelación confiable Medellín | Comercial | 🟡 MEDIA |
| "Remodelación de hoteles en Medellín: caso Hunters, Heiss y Nakua" | remodelación hoteles Medellín | Comercial B2B | 🟢 DIFERENCIADOR |

---

## SECCIÓN 4: ESTRATEGIA DE CONTENIDO

### Pilares de Contenido

**Pilar 1 — Precios y costos** (intención comercial alta, ningún competidor cubre bien)
- Usuarios que buscan precios están listos para contratar
- Arkava ya tiene ventaja: publicó precios reales en blog
- Expandir a: baños, cocinas, cielo raso, enchape, pintura, drywall
- Estructura: tabla de precios por servicio + variables que afectan el precio + CTA

**Pilar 2 — Guías técnicas de acabados** (intención informacional que convierte)
- Posiciona a Arkava como experto técnico
- El artículo de cielo raso ya rankea #1-2 — demostración del potencial
- Expandir a: tipos de enchape, tipos de pintura, tipos de drywall, etc.

**Pilar 3 — Proyectos y casos de estudio** (diferenciador único)
- Ningún competidor tiene case studies de hospitalidad
- Formato: antes/después + reto técnico + solución + resultado
- Objetivo: convertir visitas de `/proyectos` (ya tiene 4.65% CTR) en leads

**Pilar 4 — Guías de decisión de compra** (captura intención media)
- "Cómo elegir empresa de remodelación en Medellín"
- "Qué preguntas hacerle a un contratista antes de contratar"
- Estos artículos posicionan a Arkava como asesor de confianza

### Formato estándar para artículos de blog (para máximo CTR y posicionamiento)

```
- Longitud mínima: 1,200 palabras (MOFU) / 1,800 palabras (BOFU)
- H1: incluir keyword principal + "Medellín" + año
- H2s: cubrir variantes semánticas del GSC
- Tabla de precios si aplica: aumenta CTR y tiempo en página
- FAQ al final: 3-5 preguntas del GSC → activar rich snippet
- CTA al final: WhatsApp con mensaje pre-cargado específico al tema
- Imágenes: con alt text geolocalizado ("enchape baños Medellín [nombre proyecto]")
- Schema: Article + FAQPage en todos los artículos
```

---

## SECCIÓN 5: ESTRATEGIA CTR — Recomendaciones On-Page

### Fórmulas para title tags (probadas para servicios locales en Colombia)

**Para landing pages de servicio:**
`[Servicio] en Medellín | [Diferenciador] | Arkava`
Ejemplo: `Remodelación de Baños en Medellín | Póliza de Cumplimiento | Arkava`

**Para artículos de blog con precio:**
`¿Cuánto Cuesta [Servicio] en Medellín? Precios Reales [Año]`
→ El signo de pregunta + "precios reales" + año incrementa CTR ~25-35%

**Para artículos informativos:**
`[N] Tipos de [Tema] para tu Hogar: Guía Completa [Año] | Arkava`
→ Número en el título + "guía completa" + año

### Fórmulas para meta descriptions (máx 155 caracteres)

**Para servicios:**
`[Beneficio principal]. [Diferenciador de Arkava]. Presupuesto sin costo en [ciudad]. [Social proof breve].`
Ejemplo: `Remodelamos tu baño con enchapes premium y carpintería a medida. Contrato legal, póliza de cumplimiento. Más de 50 proyectos en Medellín.`

**Para artículos de precio:**
`Precios actualizados [año]: [rango de precio]. [Qué incluye]. [CTA].`
Ejemplo: `Precios enchape 2026: desde $85.000/m². Materiales, mano de obra y acabados. Sin costos ocultos. Cotiza gratis.`

### Señales de CTR para incluir en snippets

- Año actual (2026) — señal de contenido fresco
- Precio o rango de precio — filtra y atrae a usuarios con intención de compra
- Medellín explícito — confirma relevancia local
- Diferenciadores únicos de Arkava: "póliza", "contrato legal", "sin costos ocultos"
- Número de proyectos/años de experiencia cuando aplique

---

## SECCIÓN 6: PLAN A 3 MESES

### Mes 1 (Junio 2026) — Base técnica + Quick Wins

**Semana 1-2:**
- [ ] Agregar `site:` a astro.config.mjs → canonical URLs
- [ ] Activar `@astrojs/sitemap`
- [ ] Crear `public/robots.txt`
- [ ] Escribir meta descriptions para las 5 páginas con más impresiones (QW1)
- [ ] Mover schema LocalBusiness a BaseLayout.astro
- [ ] Corregir H2 placeholder en `/sobre-nosotros`
- [ ] Corregir alt texts hardcodeados en componentes de servicios

**Semana 3-4:**
- [ ] Añadir FAQ schema al artículo de cielo raso
- [ ] Crear landing `/servicios/remodelacion-banos-medellin` (1,500 palabras + schema Service)
- [ ] Crear landing `/servicios/remodelacion-cocinas-medellin` (1,500 palabras)
- [ ] Actualizar artículo de enchape con tabla de precios 2026

**Meta mes 1:**
- Impresiones: mantener ~1,100/mes
- Clicks: pasar de 12 a 35-50 clicks
- CTR: pasar de 1.08% a 3-4%
- Score SEO: 28 → 45/100

---

### Mes 2 (Julio 2026) — Contenido + Nuevas landing pages

- [ ] Crear landing `/servicios/obra-blanca-medellin`
- [ ] Publicar artículo: "Cielo raso PVC vs Drywall: precios Medellín 2026"
- [ ] Publicar artículo: "¿Cuánto cuesta remodelar un baño en Medellín? 2026"
- [ ] Ampliar contenido del artículo de cielo raso (añadir sección de precios Medellín)
- [ ] Añadir breadcrumb schema en todas las páginas
- [ ] Optimizar `/proyectos` con schema ItemList + mejorar meta description
- [ ] Crear página de hospitalidad: `/sectores/hoteles-y-hospitalidad`
- [ ] Internal linking: conectar artículos del blog con landing pages de servicios

**Meta mes 2:**
- Clicks: 80-120/mes
- Nuevas keywords en pos 1-10: +5 keywords
- Impresiones: 2,000-3,000/mes
- Score SEO: 45 → 58/100

---

### Mes 3 (Agosto 2026) — Autoridad + Blog escalado

- [ ] Publicar artículo: "¿Cuánto cuesta remodelar una cocina en Medellín? 2026"
- [ ] Publicar artículo: "Obra blanca en Medellín: qué incluye y costos"
- [ ] Publicar case study: "Remodelación Hotel Hunters: antes, proceso y resultado"
- [ ] Publicar artículo: "Cómo elegir empresa de remodelación en Medellín"
- [ ] Revisar GSC: qué nuevas queries aparecieron → generar 2 briefs adicionales
- [ ] Optimizar imágenes del sitio (formato WebP, alt texts completos)
- [ ] Validar Core Web Vitals (LCP para videos autoplay)
- [ ] Implementar OG Image real para compartir en redes

**Meta mes 3:**
- Clicks: 200-300/mes
- Impresiones: 5,000-8,000/mes
- Posición promedio: mejorar de 6.7 a 5.5
- Keywords en top 3: 5-8 keywords transaccionales
- Score SEO: 58 → 65/100

---

## SECCIÓN 7: METAS MEDIBLES A 3 MESES

| Métrica | Hoy (mayo 2026) | Meta junio | Meta julio | Meta agosto |
|---|---|---|---|---|
| Clicks/mes | 12 | 40-50 | 80-120 | 200-300 |
| Impresiones/mes | 1,114 | 1,500 | 2,500-3,500 | 5,000-8,000 |
| CTR global | 1.08% | 3-4% | 4-5% | 4-6% |
| Posición promedio | 6.7 | 6.0 | 5.5 | 5.0 |
| Keywords en pos 1-10 | ~8 | 12 | 18 | 25+ |
| Artículos en blog | ~5 | 7 | 10 | 14 |
| Landing pages servicio | ~8 | 10 | 12 | 15 |
| Score SEO técnico | 28/100 | 50/100 | 60/100 | 65/100 |

---

## SECCIÓN 8: MÉTRICAS DE SEGUIMIENTO MENSUAL

Ejecutar mensualmente con `/seo-gsc dashboard` + `/seo-gsc oportunidades`:

1. **CTR por página** — ¿Las meta descriptions nuevas mejoraron el CTR?
2. **Queries nuevas** — ¿Qué nuevas keywords aparecen tras publicar contenido?
3. **Posición cluster cielo raso** — ¿Sigue en posición 1-3? ¿Hay clicks?
4. **Cluster enchape** — ¿Sube de posición 6 a posición 3-5?
5. **Cluster remodelación Medellín** — ¿Pasa de posición 10 a posición 5-7?
6. **Nuevas páginas indexadas** — ¿Google indexó las nuevas landings?

---

## APÉNDICE: Hallazgos Adicionales Accionables

### Oportunidad de audiencia internacional (no explotada)
El GSC muestra queries en inglés: `contractor near me` (pos 1), `home renovation` (pos 2), `interior fitting` (pos 6), `renovation` (pos 3.5). Esto sugiere que Google muestra Arkava a búsquedas de expats/digital nomads en Medellín.

**Acción recomendada:** Crear una sección o página `/en/` en inglés para esta audiencia premium (expats que buscan remodeladores de confianza en Medellín). AE&M Colombia ya lo hace. Arkava tiene mejor portafolio y puede competir.

### Canibalización de marca
La query `arkava` activa múltiples páginas (homepage + sobre-nosotros + otras). Consolidar con canonical explícito en `/sobre-nosotros` apuntando a homepage para queries de marca.

### El blog es el motor de crecimiento
De las 1,114 impresiones, ~965 (86%) provienen del blog. Las páginas de servicios generan solo ~150 impresiones. Esto confirma que la estrategia de blog está funcionando y debe acelerarse.
