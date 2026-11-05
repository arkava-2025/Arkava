# Hero interactivo de /servicios — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el hero de `/servicios`: el edificio de Arkava con 10 puntos; cada clic hace zoom hacia el punto, entra a la escena del servicio y corre su animación antes/después, con tarjeta, pestañas, teclado y móvil.

**Architecture:** Se porta el hero de Comfort Design (`Comfort-Design/src/components/organisms/servicios-hero.astro` + `src/scripts/servicios-hero.ts`): caja que imita `object-fit: cover` con coordenadas en % de la imagen, escenas en `<template>` montadas al hover/foco, cámara "push" con GSAP y cola de acciones. Cada efecto es una función `(layer, motion) => gsap.core.Timeline` que revela la imagen "después" por piezas (elementos con `clip-path: inset()`) o por máscaras CSS animadas. La geometría de cada escena (rectángulos, juntas, trazos) vive en funciones puras con pruebas.

**Tech Stack:** Astro 5, GSAP 3.13 (solo núcleo, ya instalado), `astro:assets` (`<Picture>`/`getImage`, AVIF+WebP), Tailwind v4, TypeScript. Pruebas de geometría con `node --test --experimental-strip-types` (Node 22.12, sin dependencias nuevas). Verificación visual con Chrome DevTools MCP.

**Spec:** `docs/superpowers/specs/2026-11-04-hero-servicios-design.md`

## Global Constraints

- Imagen principal `src/assets/servicios-hero/01-edificio.jpg`, 2752 × 1536, `--svh-ratio: 1.7917`. Todas las escenas usan la misma proporción.
- La foto principal es el LCP: `loading="eager"`, `fetchpriority="high"`, `widths={[640, 960, 1280, 1600, 1920, 2560]}`. Nada más se descarga en la carga inicial (escenas en `<template>`).
- Escenas: `getImage` AVIF + WebP, anchos `[960, 1600, 2560]`, `quality: 72`.
- GSAP solo núcleo (`import { gsap } from 'gsap'`). Sin canvas, WebGL ni video.
- Prefijo CSS `svh-` en todo, estilos `is:global`; `@keyframes svh-spot-pulse` (nombre único).
- Colores: crema `#F9F6E7`, naranja `#E35205`, verde `#2E483E` (tokens `--color-secondary`, `--color-tertiary`, `--color-primary`). Fuentes `PP Supply Sans`, `PP Supply Mono`, `Helvetica Web`.
- Un solo `<h1>` en la página, dentro del hero: "Servicios de remodelación y acabados en Medellín". El `titlePage` de Hygraph pasa a `<h2>`.
- Textos de tarjeta provisionales (se escriben después): título = nombre del servicio, una línea neutra, CTA "Ver servicio". Remodelación integral y Diseño → `/contacto/` con CTA "Cotizar proyecto".
- Cada efecto se limita a la superficie que cambia; fuera de la máscara se ve una sola imagen.
- `prefers-reduced-motion`: sin zoom ni efectos, solo fundidos; el anillo no pulsa.
- Móvil (< 768 px): escenario ~80vw de alto, recorte centrado en x ≈ 54,5 % para la foto principal; tarjeta debajo del escenario; chips numerados desplazables como navegación principal; área táctil de punto 32 px.
- Commits sin `Co-Authored-By` ni menciones a Claude/IA.

## Review Focus

1. **Clics rápidos o cambio de servicio a mitad de animación** (punto A y enseguida chip B): debe cerrar A y abrir B sin capas huérfanas ni estilos inline residuales. → Task 3, paso de verificación "cambio rápido".
2. **Red lenta** (escena sin descargar al hacer clic): la cámara no se mueve hasta que la escena esté decodificada; no aparece a medio cargar. → Task 3, verificación con throttling "Slow 4G".
3. **Redimensionar o rotar el móvil con una escena abierta:** puntos, máscaras y piezas siguen alineados (todo en %), la tarjeta no queda fuera de pantalla. → Task 9.
4. **Teclado:** Tab llega a puntos y chips, Enter abre, Escape cierra y el foco vuelve al disparador; el foco nunca queda dentro de una capa `aria-hidden`. → Task 9.
5. **Volver a abrir la misma escena** después de cerrarla: la animación corre de nuevo desde el "antes" (reset completo). → Task 3 y cada task de efectos, paso "abrir dos veces".

---

### Task 1: Geometría pura con pruebas

**Files:**
- Create: `src/scripts/servicios-hero/geometry.ts`
- Create: `src/scripts/servicios-hero/geometry.test.ts`
- Modify: `package.json` (script `"test": "node --test --experimental-strip-types src/scripts/servicios-hero/*.test.ts"`)

**Interfaces:**
- Produces:
  - `type Rect = { x0: number; y0: number; x1: number; y1: number }` (todo en % de la imagen)
  - `insetClip(r: Rect): string` → `inset(${y0}% ${100 - x1}% ${100 - y1}% ${x0}%)`
  - `polygonClip(points: [number, number][]): string` → `polygon(x% y%, …)`
  - `bands(axis: 'x' | 'y', edges: number[], cross: [number, number]): Rect[]` — franjas entre bordes consecutivos; `cross` es el rango del otro eje.
  - `gridCells(xEdges: number[], yEdges: number[], order: 'rows' | 'cols'): Rect[]`
  - `trowelStrokes(area: Rect, count: number, seed: number): { cx: number; cy: number; rx: number; ry: number }[]` — elipses deterministas (PRNG mulberry32 con `seed`) que en conjunto cubren `area` al 100 % de radio.
  - `trowelMask(n: number): string` → `n` `radial-gradient(ellipse var(--svh-rx${i}) var(--svh-ry${i}) at var(--svh-cx${i}) var(--svh-cy${i}), #000 98%, transparent 100%)` separados por coma.

- [ ] **Step 1: Escribir las pruebas**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { insetClip, polygonClip, bands, gridCells, trowelStrokes, trowelMask } from './geometry.ts';

test('insetClip', () => {
  assert.equal(insetClip({ x0: 10, y0: 20, x1: 60, y1: 90 }), 'inset(20% 40% 10% 10%)');
});
test('polygonClip', () => {
  assert.equal(polygonClip([[0, 0], [50, 10]]), 'polygon(0% 0%, 50% 10%)');
});
test('bands y: 4 franjas de piso', () => {
  const r = bands('y', [7, 40, 65, 89, 100], [30.5, 84.5]);
  assert.equal(r.length, 4);
  assert.deepEqual(r[0], { x0: 30.5, y0: 7, x1: 84.5, y1: 40 });
});
test('gridCells rows ordena por fila', () => {
  const r = gridCells([0, 50, 100], [0, 50, 100], 'rows');
  assert.equal(r.length, 4);
  assert.deepEqual(r[1], { x0: 50, y0: 0, x1: 100, y1: 50 });
});
test('trowelStrokes deterministas y dentro del área', () => {
  const area = { x0: 16, y0: 8, x1: 100, y1: 94 };
  const a = trowelStrokes(area, 7, 3);
  assert.deepEqual(a, trowelStrokes(area, 7, 3));
  assert.equal(a.length, 7);
  for (const s of a) {
    assert.ok(s.cx >= area.x0 && s.cx <= area.x1 && s.cy >= area.y0 && s.cy <= area.y1);
  }
});
test('trowelMask usa variables por trazo', () => {
  const m = trowelMask(3);
  assert.equal(m.split('radial-gradient').length - 1, 3);
  assert.ok(m.includes('var(--svh-rx2)'));
});
```

- [ ] **Step 2: Correr y ver que fallan** — `pnpm test` → FAIL (módulo no existe).
- [ ] **Step 3: Implementar `geometry.ts`** con las firmas de arriba. `trowelStrokes`: centros en una rejilla irregular dentro de `area` (filas × columnas ≈ `count`, desplazados con el PRNG); `rx`/`ry` = 0.75 × paso de la rejilla, para que al 100 % se solapen y cubran todo.
- [ ] **Step 4: Correr** — `pnpm test` → PASS (6 pruebas).
- [ ] **Step 5: Commit** — `git commit -m "feat(servicios-hero): geometría de máscaras y piezas"`

---

### Task 2: Escenario, puntos, pestañas, tarjetas y cámara sin escenas

**Files:**
- Create: `src/lib/servicios-hero/spots.ts`
- Create: `src/components/organisms/ServiciosHero.astro`
- Create: `src/scripts/servicios-hero/index.ts`
- Modify: `src/pages/servicios/index.astro` (hero arriba; `<h1>{titlePage}</h1>` → `<h2>`)

**Interfaces:**
- Produces:
  - `type SpotId = 'integral' | 'diseno' | 'pintura' | 'enchape' | 'decorativos' | 'cielo' | 'drywall' | 'estuco' | 'argamasa' | 'carpinteria'`
  - `type Spot = { id: SpotId; n: number; label: string; x: number; y: number; title: string; text: string; href: string; cta: string }`
  - `export const SPOTS: Spot[]` en orden 1–10 de la spec §9.2b. Coordenadas: integral 61/58, diseno 66.5/35, pintura 79/27, enchape 47.5/56.5, decorativos 65/78, cielo 56.5/31, drywall 56.5/46, estuco 31.5/71, argamasa 79/55, carpinteria 56/20. `href`: `/servicios/pintura/`, `/servicios/enchape/`, `/servicios/muros-decorativos/`, `/servicios/cielo-raso/`, `/servicios/muros-drywall/`, `/servicios/estuco/`, `/servicios/argamasa/`, `/servicios/carpinteria/`; integral y diseno → `/contacto/`.
  - `initServiciosHero(root: HTMLElement): void` (export de `index.ts`), con `open(id)`, `close(restoreFocus?, switching?)`, `run(fn)` y `mount(id)` internos como en Comfort.
  - Las pestañas son `HTMLAnchorElement` (no `button`): en `index.ts`, `tabs` se tipa como `HTMLAnchorElement[]` y el clic llama `e.preventDefault()`. El estado activo se marca con `aria-current="true"` (no `aria-pressed`, que es de botones).
  - Atributos DOM: `[data-svh]`, `[data-svh-stage]`, `[data-svh-canvas]`, `[data-svh-spot]` (+ `data-x`, `data-y`), `[data-svh-tab]`, `[data-svh-card]`, `[data-svh-close]`, `[data-svh-intro]`, `template[data-svh-tpl]`.

- [ ] **Step 1: `spots.ts`** con `SPOTS` (textos provisionales según Global Constraints).
- [ ] **Step 2: `ServiciosHero.astro`**: estructura y CSS de Comfort (`svh-stage`, `svh-canvas`, `svh-layer`, `svh-spot`, `svh-tabs`, `svh-cards`, `svh-back`) con `--svh-ratio: 1.7917`, colores y fuentes Arkava; punto crema con anillo naranja y número `n`; H1 en `[data-svh-intro]` arriba a la izquierda sobre degradado oscuro; botón "Volver al edificio"; pestañas como `<a href={s.href} data-svh-tab>` (enlace real para SEO; el script hace `preventDefault` y abre la escena; con JS desactivado navegan a la landing); `alt` de la 01: "Edificio residencial y comercial en Medellín con acabados de Arkava: fachada en ladrillo, lobby con muro decorativo, cielos con luz indirecta y penthouse con carpintería en roble"; `<script>` que llama `initServiciosHero(document.querySelector('[data-svh]'))`. Sin `<template>` todavía.
- [ ] **Step 3: `index.ts`**: portar `initServiciosHero` de Comfort sin `EFFECTS`, `roller`, `cabinet` ni video. Sin escena montada, `open` hace el zoom a `1.6` como en Comfort.
- [ ] **Step 4: Integrar en la página** — `<ServiciosHero />` antes de la sección actual; `titlePage` como `<h2>`.
- [ ] **Step 5: Verificar** — `pnpm dev`; en 1440×900: foto completa a todo el ancho, 10 puntos sobre sus ventanas, hover muestra etiqueta, clic hace zoom y muestra tarjeta + Volver; Escape y clic en la foto cierran; `document.querySelectorAll('h1').length === 1`. `pnpm build` sin errores.
- [ ] **Step 6: Commit** — `git commit -m "feat(servicios): hero con edificio, puntos, pestañas y tarjetas"`

---

### Task 3: Escenas en template + cielo raso completo (checkpoint con el usuario)

**Files:**
- Modify: `src/components/organisms/ServiciosHero.astro` (función `responsive()` de Comfort, `<template data-svh-tpl="cielo">`)
- Create: `src/scripts/servicios-hero/scenes.ts`
- Create: `src/scripts/servicios-hero/effects.ts`
- Modify: `src/scripts/servicios-hero/index.ts` (montar capas, `EFFECTS`, `resetLayer`)

**Interfaces:**
- Consumes: `Rect`, `polygonClip` (Task 1); `initServiciosHero` (Task 2).
- Produces:
  - `scenes.ts`: `export const SCENES: Record<SpotId, SceneGeometry>`, con `type SceneGeometry = { area?: Rect; poly?: [number, number][]; xEdges?: number[]; yEdges?: number[]; door?: Rect; light?: [number, number] }`. Valores preliminares (se ajustan midiendo en el navegador con DevTools sobre la capa): cielo `poly` = techo hasta la línea superior de muros (y ≈ 51 %), `light` = centro de la cornisa (50, 30).
  - `effects.ts`: `type Effect = (layer: HTMLElement, motion: boolean) => gsap.core.Timeline`; `export const EFFECTS: Record<string, Effect>`; `export function resetLayer(layer: HTMLElement): void`.
  - Marcado de capa: `<div class="svh-layer" data-effect="…" data-scene="<SpotId>">` con `<picture data-svh-base>` (antes) y `<picture data-svh-step="1">`, `data-svh-step="2"` (etapas siguientes).
  - Efecto `ceiling`: base 17; step1 = 16 recortada con `polygonClip(SCENES.cielo.poly)` y revelada de arriba abajo (variable `--svh-p` en `mask-image: linear-gradient(180deg, #000 var(--svh-p), transparent calc(var(--svh-p) + 12%))`); step2 = 15 a pantalla completa con máscara radial desde `light` (`--svh-r` 0 % → 170 %).

- [ ] **Step 1: Escribir `responsive()`** igual a Comfort y el template `cielo` con 17/16/15.
- [ ] **Step 2: Portar `mount`/`ready`/`resetLayer`/cámara push** de Comfort a `index.ts` usando `EFFECTS` de `effects.ts`.
- [ ] **Step 3: Implementar `ceiling`** y su reset (variables a `-12%` y `0%`, `clearProps`).
- [ ] **Step 4: Medir `poly` del techo** en la capa abierta (overlay temporal con `outline`) y fijarlo en `SCENES.cielo`.
- [ ] **Step 5: Verificar**
  - Clic en cielo: zoom con desenfoque → aparece la losa → el cielo baja de arriba abajo solo en el techo → la luz se enciende desde la cornisa → tarjeta.
  - **Abrir dos veces:** cerrar y abrir de nuevo, la animación repite desde la losa.
  - **Cambio rápido:** abrir cielo y a los 0,5 s hacer clic en otro chip: se cierra y abre sin restos (`[data-svh-layer]` sin `style` residual tras cerrar).
  - **Red lenta:** DevTools "Slow 4G", clic sin hover previo: la cámara espera a la escena.
  - Captura de pantalla de 4 momentos para el usuario.
- [ ] **Step 6: Commit** — `git commit -m "feat(servicios-hero): escenas en template y animación de cielo raso"`
- [ ] **Step 7: CHECKPOINT** — mostrar al usuario (capturas o GIF) y ajustar estilo/tiempos antes de seguir.

---

### Task 4: Remodelación integral (`stages`) y diseño (`design`)

**Files:** Modify `ServiciosHero.astro` (templates `integral`, `diseno`), `effects.ts`, `scenes.ts`.

**Interfaces:**
- Consumes: `EFFECTS`, `resetLayer`, `SCENES`, `polygonClip`.
- Produces: efectos `stages` y `design` registrados en `EFFECTS`.
  - `stages`: base 04; step1 = 03; step2 = 02. Ambos recortados a `SCENES.integral.poly` (la sala sin el vidrio del ventanal) y revelados con barrido diagonal (`linear-gradient(105deg, …)` sobre `--svh-p`), con una pausa de 0,4 s entre etapas.
  - `design`: base 07 (plano); step1 = 06 (maqueta); step2 = 05 (real), a pantalla completa, barridos de 115°, como Comfort pero terminando en la 05.

- [ ] **Step 1:** Templates `integral` y `diseno`.
- [ ] **Step 2:** Implementar `stages` y `design` con su reset.
- [ ] **Step 3:** Medir `SCENES.integral.poly` (todo menos el vidrio del ventanal, x ≈ 0–43 %).
- [ ] **Step 4: Verificar** — las dos escenas de punta a punta; abrir dos veces; fuera del polígono de integral no cambia nada (las palmeras no "saltan").
- [ ] **Step 5: Commit** — `git commit -m "feat(servicios-hero): escenas de remodelación integral y diseño"`

---

### Task 5: Fachada — argamasa (`wipe` vertical) y pintura (`floors`)

**Files:** Modify `ServiciosHero.astro` (templates `argamasa`, `pintura`), `effects.ts`, `scenes.ts`.

**Interfaces:**
- Consumes: `bands`, `insetClip`, `SCENES`.
- Produces:
  - `SCENES.argamasa.area` = `SCENES.pintura.area` = muro de culata `{ x0: 30.5, y0: 7, x1: 84.5, y1: 100 }` (incluye la franja de la esquina) y `SCENES.pintura.yEdges = [7, 40, 65, 89, 100]` (juntas de piso; se ajustan midiendo).
  - `wipeUp` (argamasa): base 10, step1 = 09 recortada a `area`, revelada de abajo arriba.
  - `floors` (pintura): base 09; por cada `bands('y', yEdges, [x0, x1])` un `<picture>` clonado de la 08 con `insetClip`; cada franja se revela de arriba abajo en orden (piso alto primero) con un borde `linear-gradient` de 6 % y un brillo leve (`filter: brightness(1.06)` → `1`) al pasar.

- [ ] **Step 1:** Templates (las piezas de `floors` se crean en el efecto clonando `[data-svh-step="1"]`, no en el HTML).
- [ ] **Step 2:** Implementar `wipeUp` y `floors` con reset (eliminar clones al resetear).
- [ ] **Step 3:** Medir `area` y `yEdges` sobre la 08.
- [ ] **Step 4: Verificar** — argamasa: ladrillo → gris de abajo arriba; pintura: piso por piso de arriba abajo, el borde coincide con las juntas; abrir dos veces; sin rodillo.
- [ ] **Step 5: Commit** — `git commit -m "feat(servicios-hero): escenas de argamasa y pintura de fachada"`

---

### Task 6: Enchape (`tiles`)

**Files:** Modify `ServiciosHero.astro` (template `enchape`), `effects.ts`, `scenes.ts`.

**Interfaces:**
- Consumes: `gridCells`, `insetClip`, `polygonClip`, `SCENES`.
- Produces: `SCENES.enchape` con `xEdges = [18.75, 25.75, 37.85, 50, 62.15, 74.25, 81, 88]`, `yEdges = [6.7, 49.3, 91.4]` (juntas del muro de fondo, medidas sobre 11b; se verifican) y `poly` del piso + muro lateral. Efecto `tiles`: base 12; piezas = `gridCells(xEdges, yEdges, 'cols')` clonadas de la 11b, cada una entra con `opacity` 0→1 y `scale` 0.96→1 en secuencia (stagger 0,07 s); luego `poly` (piso y lateral) con barrido; al final la 11 completa en fundido de 0,6 s.

- [ ] **Step 1:** Template con 12, 11b, 11.
- [ ] **Step 2:** Implementar `tiles` + reset.
- [ ] **Step 3:** Verificar juntas con overlay contra la 11b y ajustar `xEdges`/`yEdges`.
- [ ] **Step 4: Verificar** — piezas sobre las juntas reales, sin pedazos de espejo durante la entrada de piezas; muebles al final; abrir dos veces.
- [ ] **Step 5: Commit** — `git commit -m "feat(servicios-hero): escena de enchape pieza por pieza"`

---

### Task 7: Llana — muros decorativos y estuco (`trowel`)

**Files:** Modify `ServiciosHero.astro` (templates `decorativos`, `estuco`), `effects.ts`, `scenes.ts`.

**Interfaces:**
- Consumes: `trowelStrokes`, `trowelMask`, `SCENES`.
- Produces: `SCENES.decorativos.area = { x0: 25.5, y0: 3, x1: 95.5, y1: 86.5 }`, `SCENES.estuco.area = { x0: 16, y0: 8, x1: 100, y1: 94 }`. Efecto `trowel`: step1 recortado a `area`, `mask-image: trowelMask(n)` con `n = 9`; GSAP anima `--svh-rx{i}`/`--svh-ry{i}` de 0 % al radio de cada trazo en secuencia (0,35 s cada uno, solapados 50 %). En decorativos, al terminar, las luces del piso: `filter: brightness(0.85)` → `1` en 0,8 s.

- [ ] **Step 1:** Templates (14/13 y 21/20).
- [ ] **Step 2:** Implementar `trowel` + reset; registrar las variables CSS con `@property` (`<length-percentage>`) para que GSAP las interpole.
- [ ] **Step 3: Verificar** — trazos curvos que cubren todo el muro sin huecos al final (en el último cuadro, `--svh-*` al máximo = 13 visible completa); nada cambia fuera del muro; abrir dos veces.
- [ ] **Step 4: Commit** — `git commit -m "feat(servicios-hero): escenas de muros decorativos y estuco con llana"`

---

### Task 8: Drywall (`boards`) y carpintería (`panels` + puerta)

**Files:** Modify `ServiciosHero.astro` (templates `drywall`, `carpinteria`), `effects.ts`, `scenes.ts`.

**Interfaces:**
- Consumes: `bands`, `insetClip`, `SCENES`.
- Produces:
  - `SCENES.drywall`: `area = { x0: 27, y0: 15, x1: 92, y1: 87.5 }` (incluye el refuerzo sobre el vano), `xEdges` = 8 franjas iguales entre 27 y 76 + una franja del refuerzo `{ x0: 76, y0: 15, x1: 92, y1: 21 }`. Efecto `boards`: base 19; cada franja clonada de la 18 entra de izquierda a derecha con `yPercent` 2→0 y `opacity` 0→1 (0,22 s, stagger 0,12 s).
  - `SCENES.carpinteria`: `area = { x0: 19, y0: 16.5, x1: 87, y1: 86 }`, `door = { x0: 66.3, y0: 18, x1: 82.7, y1: 86 }`, `xEdges` = 14 grupos de tablillas entre 19 y 66.3 + entre 82.7 y 87 + muro del fondo a la derecha. Efecto `panels`: base 23; grupos de la 22 de izquierda a derecha (stagger 0,06 s); al final la puerta (`insetClip(door)` de la 22) entra con `scaleX` 0.15→1 desde el borde izquierdo (`transformOrigin: 'left center'`), `back.out(1.6)`, 0,7 s.

- [ ] **Step 1:** Templates.
- [ ] **Step 2:** Implementar `boards` y `panels` + reset.
- [ ] **Step 3:** Medir bordes reales (franjas de placa = separación de perfiles de la 19; grupos de tablillas alineados a ranuras de la 22).
- [ ] **Step 4: Verificar** — placas una a una; tablillas sin cortar una tablilla por la mitad; puerta gira y queda en su lugar exacto; abrir dos veces.
- [ ] **Step 5: Commit** — `git commit -m "feat(servicios-hero): escenas de drywall y carpintería"`

---

### Task 9: Móvil, teclado y movimiento reducido

**Files:** Modify `ServiciosHero.astro` (CSS móvil, chips), `index.ts`.

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: `--svh-focus-x` (CSS, `54.5%` en la canvas de la 01, `50%` en las capas) usado en `left` de la caja cover: `left: calc((100cqw - var(--svh-w)) * var(--svh-focus-x) / 100%)`.

- [ ] **Step 1:** CSS móvil según spec §10.1: escenario `80vw`, puntos 12 px con área 32 px y número, chips `scroll-snap` con número + nombre, pista "Toca un punto del edificio o elige un servicio" que se oculta tras la primera interacción, tarjeta bajo el escenario, Volver 44 px, `blur` máx. 4 px.
- [ ] **Step 2:** En `open`, centrar el chip activo (`scrollIntoView({ inline: 'center', block: 'nearest' })`).
- [ ] **Step 3: Verificar** en 390×844 y 1440×900:
  - Los 10 puntos visibles en móvil; separación ≥ 28 px.
  - **Rotar/redimensionar** con escena abierta: piezas y máscaras siguen alineadas.
  - **Teclado:** Tab recorre puntos y chips; Enter abre; foco en Volver; Escape cierra y el foco vuelve al disparador; ningún elemento enfocable dentro de capas.
  - `prefers-reduced-motion: reduce` (DevTools Rendering): sin zoom, solo fundidos, anillo quieto.
- [ ] **Step 4: Commit** — `git commit -m "feat(servicios-hero): versión móvil, teclado y movimiento reducido"`

---

### Task 10: Rendimiento y cierre

**Files:** Ajustes donde haga falta.

- [ ] **Step 1:** `pnpm build` y `pnpm preview`; Lighthouse móvil sobre `/servicios/` (Chrome DevTools MCP): LCP < 2,5 s y el elemento LCP es la foto del edificio; la carga inicial no pide ninguna imagen de escena (pestaña Network).
- [ ] **Step 2:** `pnpm lint` y `pnpm test` en verde.
- [ ] **Step 3:** Recorrido final de las 10 escenas en escritorio y móvil, con capturas o GIF para el usuario.
- [ ] **Step 4: Commit** — `git commit -m "perf(servicios-hero): verificación de LCP y ajustes finales"`
