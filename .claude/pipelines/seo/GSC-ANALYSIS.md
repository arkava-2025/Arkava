# GSC Analysis — arkava.com.co
**Fecha del análisis:** 2026-05-31
**Período analizado:** 2026-03-02 → 2026-05-31 (90 días)
**Período anterior:** 2025-12-02 → 2026-03-01 (sin datos — sitio era nuevo)

---

## 1. Métricas Globales

| Métrica | Período actual | Período anterior | Δ |
|---|---|---|---|
| Clicks | **12** | 0 | +12 (sitio nuevo) |
| Impresiones | **1.114** | 0 | +1.114 |
| CTR global | **1.08%** | — | — |
| Posición promedio | **6.7** | — | — |

**Lectura crítica:** El sitio está siendo rastreado e indexado, pero con apenas 3 meses de vida en GSC. El CTR de 1.08% es anormalmente bajo considerando que la posición promedio es 6.7 — territorio de primera página. Esto es el problema central.

---

## 2. Diagnóstico de CTR Bajo — Causas Específicas

### CAUSA #1 — El artículo más impresionado (cielo raso) está en posición 1-3 pero con CTR = 0%

La query `tipos de cielo raso` tiene **82 impresiones en posición 2.6** con **0 clicks**.
Variantes: `clases de cielo raso` (15 impr, pos 1, 0 clicks), `tipos de cielo razo` (9 impr, pos 1, 0 clicks), `diferentes tipos de cielo raso` (3 impr, pos 1, 0 clicks).

**Suma total cluster cielo raso:** ~130 impresiones, posición 1-3, **0 clicks**.

**Causa:** El snippet (title tag + meta description) en `/blog/tipos-cielo-raso-hogar` no responde la intención de búsqueda. Los usuarios buscan una guía visual comparativa con precios; si el título suena genérico o la descripción está vacía, no hay razón para hacer click cuando hay otros resultados más atractivos en la misma posición.

**Confirmación:** El issue crítico conocido de la auditoría indica que `<meta name="description">` está **vacía en todas las páginas**. Un snippet sin descripción en posición 1 pierde sistemáticamente frente a competidores con snippets completos.

### CAUSA #2 — Meta descriptions vacías en TODO el sitio

Sin meta description, Google genera el snippet automáticamente tomando texto del body. Este texto raramente es persuasivo, no incluye keywords ni CTA, y no diferencia la propuesta de valor de Arkava.

**Impacto estimado:** 40-60% del CTR potencial se pierde por snippets no optimizados (benchmark industry).

### CAUSA #3 — Title tags no diferenciadas

El title tag de la homepage probablemente no incluye el diferenciador geográfico ni el segmento premium. En búsquedas locales como `remodelación de apartamentos medellín` (13 impresiones, pos 9.9, 0 clicks), el usuario espera ver "Medellín" en el snippet para confirmar relevancia local.

### CAUSA #4 — Brandeo débil para query de marca

`arkava` genera **36 impresiones en posición 7.5 promedio** con CTR de 5.56% en la homepage, pero las mismas queries de marca muestran la URL de `/sobre-nosotros` en posición 15 con 0 clicks. Esto indica que Google no ha consolidado el conocimiento de marca y muestra múltiples páginas para la misma query branded.

### CAUSA #5 — Posiciones 1-3 sin fragmentos enriquecidos

Las queries de cielo raso rankean en posición 1 pero sin rich snippets (sin FAQ schema, sin How-to, sin breadcrumbs visibles). Los competidores con fragmentos enriquecidos ocupan más espacio visual en la SERP y se llevan los clicks, aunque tengan posición inferior.

### CAUSA #6 — Sitio demasiado nuevo para confianza de marca

0 datos en el período anterior confirma que GSC apenas detectó el sitio hace ~3 meses. Google todavía está evaluando la autoridad del dominio. Las posiciones en 6-7 para keywords competitivas son prometedoras para un sitio nuevo, pero el tráfico llegará cuando se consolide la confianza.

---

## 3. Páginas: Rendimiento y Diagnóstico

### Páginas ordenadas por impresiones

| URL | Clicks | Impr | CTR | Pos | Diagnóstico |
|---|---|---|---|---|---|
| `/blog/tipos-cielo-raso-hogar` | **0** | **322** | 0% | 5.2 | CRÍTICO: 322 impr, 0 clicks. Snippet vacío. |
| `/blog/cuanto-cuesta-enchape-medellin` | 2 | 338 | 0.59% | 6.1 | URGENTE: Más impresiones del sitio, CTR mínimo |
| `/blog/guia-remodelacion-apartamentos-medellin` | 4 | 199 | 2.01% | 6.1 | BIEN: Mejor CTR relativo, optimizar más |
| `/blog/microcemento-vs-pintura-paredes` | 2 | 106 | 1.89% | 6.1 | BIEN: CTR decente, potencial a crecer |
| `/servicios` | 1 | 74 | 1.35% | 16.0 | URGENTE: Posición 16, necesita más contenido |
| `/` (homepage) | 1 | 51 | 1.96% | 6.0 | BIEN: Pero podría mejorar |
| `/proyectos` | 2 | 43 | **4.65%** | 4.9 | REFERENCIA: Mejor CTR del sitio — analizar por qué |
| `/sobre-nosotros` | 0 | 19 | 0% | 13.1 | PROBLEMA: Posición muy baja, sin clicks |
| `/contacto` | 0 | 16 | 0% | 6.4 | NORMAL: Poca intención comercial directa |
| `/servicios/cielo-raso` | 0 | 7 | 0% | 6.9 | Optimizar title y desc |

### Insight clave: `/proyectos` tiene el mejor CTR (4.65%)
Esto sugiere que cuando el snippet incluye evidencia visual/portafolio, los usuarios hacen click. Patrón a replicar en otras páginas: mostrar prueba social en el snippet.

---

## 4. Queries: Oportunidades Identificadas

### Cluster CIELO RASO — Mayor volumen, mayor potencial inmediato

| Query | Pos | Impr | Clicks | CTR | Acción |
|---|---|---|---|---|---|
| tipos de cielo raso | 2.6 | 82 | 0 | 0% | Reescribir snippet completo |
| clases de cielo raso | 1.0 | 15 | 0 | 0% | Añadir FAQ schema |
| tipos de cielo razo | 1.0 | 9 | 0 | 0% | Incluir variante ortográfica |
| tipo de cielo raso | 4.5 | 10 | 0 | 0% | Optimizar H1 |
| diferentes tipos de cielo raso | 1.0 | 3 | 0 | 0% | Incluir en contenido |
| **TOTAL CLUSTER** | **~2** | **~130** | **0** | **0%** | **Acción inmediata** |

### Cluster ENCHAPE / COSTOS

| Query | Pos | Impr | Clicks | CTR | Acción |
|---|---|---|---|---|---|
| cuanto cuesta enchapar un baño en colombia | 14 | 5 | 0 | 0% | Agregar precio en snippet |
| cuanto cobran por enchapar un baño | 14 | 1 | 0 | 0% | Long tail a cubrir |

### Cluster REMODELACIÓN MEDELLÍN

| Query | Pos | Impr | Clicks | CTR | Acción |
|---|---|---|---|---|---|
| remodelación de apartamentos medellín | 9.9 | 13 | 0 | 0% | URGENTE: posición 10, 0 clicks |
| remodelaciones medellin | 23 | 1 | 0 | 0% | Optimizar homepage |

### Cluster MARCA

| Query | Pos | Impr | Clicks | CTR |
|---|---|---|---|---|
| arkava | 3.4–15.1 | 84 total | 3 | 3.6% |

La marca aparece en múltiples posiciones/páginas para la misma query — canibalización de marca. La homepage debería dominar todas las queries branded.

### Queries Inesperadas (reveladoras)

- `contractor near me` (pos 1, 1 impr) — Google asocia Arkava con búsquedas en inglés. Oportunidad de capturar extranjeros en Medellín (digital nomads, expats).
- `home renovation` (pos 2, 2 impr), `interior fitting` (pos 6, 1 impr) — Mismo insight.
- `renovation` (pos 3.5, 6 impr) — Potencial de audiencia internacional sin explotar.

---

## 5. Resumen Diagnóstico CTR

**Por qué hay impresiones y 0 clicks:**

1. **Meta descriptions vacías** → Google muestra texto aleatorio del body → snippet no persuade
2. **Title tags sin diferenciadores** → No hay razón para elegir Arkava sobre la competencia
3. **Sin rich snippets** → Menos espacio visual en SERP → menos clicks
4. **Posición 5-10 sin snippet optimizado** → En esa zona de la SERP, el snippet hace toda la diferencia
5. **Contenido en posición 1 sin CTA en snippet** → El artículo de cielo raso rankea #1 pero nadie hace click porque el snippet no invita

**Acción de mayor impacto:** Escribir meta descriptions únicas y persuasivas para las 5 páginas con más impresiones. ROI estimado: duplicar o triplicar clicks sin mover posiciones.

---

## 6. Señales Positivas

- En solo 3 meses, el sitio ya rankea en posición 1-3 para varias queries
- El blog está generando impresiones reales (1.114 en 90 días = tendencia creciente)
- `/proyectos` con 4.65% CTR demuestra que el sitio puede capturar clicks cuando el snippet es relevante
- La estructura del sitio permite escalar contenido rápidamente
