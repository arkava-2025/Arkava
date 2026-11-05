# Contexto: hero interactivo de `/servicios` (Arkava)

**Creado:** 2026-11-04
**Estado:** Solo contexto. No se ha implementado nada en Arkava.
**Relacionado:** `PLAN-CRECIMIENTO-2027.md` → Pilar A (hub `/servicios`), sesión 5 del orden de trabajo.

**Implementación de referencia (ya en producción en Comfort Design):**
- `/Users/bryanvillamil/Documents/Comfort-Design/src/components/organisms/servicios-hero.astro` (708 líneas)
- `/Users/bryanvillamil/Documents/Comfort-Design/src/scripts/servicios-hero.ts` (481 líneas)
- `/Users/bryanvillamil/Documents/Comfort-Design/src/assets/servicios-hero/` (fotos, PNG del rodillo, video)
- Commit `7058fe2 feat(servicios): hub /servicios/ con hero interactivo por servicio`

Cuando se trabaje esta página, leer primero esos dos archivos: este documento resume la técnica, pero el código es la fuente de verdad.

---

## A. Lo que hay que decidir para Arkava (antes de escribir código)

### A.1 Diferenciarlo de Comfort Design
Comfort ya usa este hero en su `/servicios/`. Arkava y Comfort son aliados (ver §11 del plan), pero **no deben verse como el mismo sitio**:
- Se reutiliza la **técnica** (script, sistema de coordenadas, carga diferida, accesibilidad).
- No se reutilizan **fotos, escenas, textos ni el mismo look**. La escena principal de Arkava muestra obra y acabados (estuco, enchape, cielo raso, muros decorativos, pintura), no mobiliario.
- Ningún texto copiado entre los dos sitios.

### A.2 Escena principal (propuesta a validar)
Una foto amplia de un espacio terminado por Arkava, idealmente de hotel o de apartamento premium, donde se vean varias especialidades a la vez. Si es una foto real de un proyecto (Hunters, Heiss, Nakua, Calle Flora, Vesubio…), mejor para la confianza. Si es imagen de IA, **no se presenta como proyecto real** (regla 7 de la sección 7).

### A.3 Puntos (hotspots) candidatos → efecto del catálogo
| Servicio Arkava | Landing | Efecto sugerido |
|---|---|---|
| Pintura | `/servicios/pintura/` | `roller` (directo) |
| Muros drywall / cielo raso | `/servicios/muros-drywall/`, `/servicios/cielo-raso/` | `wipe`; para cielo raso puede combinarse con `lights` (luz indirecta que se enciende) |
| Estuco / argamasa | `/servicios/estuco/` | `wipe` con textura (muro rústico → liso) |
| Enchape | `/servicios/enchape/` | Efecto nuevo: piezas que aparecen en cuadrícula (máscara `repeating-linear-gradient` animando una variable CSS) |
| Muros decorativos / microcemento | `/servicios/muros-decorativos/` | `wipe` o barrido radial que revela la textura |
| Carpintería arquitectónica | `/servicios/carpinteria/` | `cabinet` (puerta o revestimiento en madera; ángulo de obra, no mobiliario: ver §11) |
| Mantenimiento (electricidad) | landing futura | `lights` |
| Diseño arquitectónico | landing futura | `design` (plano → volumen → foto) |

Máximo 5–6 puntos. Los `href` dependen de las landings que existan cuando se haga el hero (Pilar B).

### A.4 Diferencias técnicas con el repo de Comfort
- `gsap` ya está en Arkava (`^3.13.0` en `package.json`): no hace falta `pnpm add gsap`.
- Arkava **no tiene** `src/scripts/` ni `src/assets/`: hay que crearlas. El alias `@/*` sí existe en `tsconfig.json`.
- Hoy `src/pages/servicios/index.astro` renderiza los 8 componentes de servicio completos (contenido duplicado, ver §5 del plan). El hero entra como parte del rediseño del hub, no encima de lo actual.
- Revisar la altura real del header de Arkava (`--svh-header`, valor por defecto 98px en Comfort) y que el selector `body > header, header` lo encuentre.
- Revisar que el prefijo `svh-` no choque con nada en Arkava.

---

## B. Base técnica (viene de Comfort Design)

### Qué es
Un hero a pantalla completa con UNA foto amplia de un espacio. Encima van puntos (hotspots) en posiciones fijas de la imagen. Al tocar un punto:
1. La "cámara" hace zoom hacia ese punto (la foto escala y se desenfoca).
2. Desde ese mismo punto aparece una capa de primer plano con su propia escena.
3. Corre una animación propia de ese servicio (rodillo pintando, luces que se prenden, cajón que se abre, etc.).
4. Sale una tarjeta corta con título, texto y un botón a la landing del servicio.
5. Hay un botón "Volver", y también se vuelve con Escape o tocando la foto. La salida hace el mismo movimiento de la entrada, al revés.

Debajo de la foto (en móvil) o flotando abajo (en escritorio) hay unas pestañas con los mismos servicios. Hacen lo mismo que los puntos y sirven para quien no encuentra los puntos o navega con teclado.

### Stack
- Astro (componente `.astro` + script en TypeScript puro; la lógica se puede llevar igual a otro framework).
- **GSAP 3.13, solo el núcleo** (`import { gsap } from 'gsap'`). Sin ScrollTrigger ni plugins pagos. Se usan `gsap.timeline`, `to`, `fromTo`, `set`, `call` y la animación de **variables CSS** (`'--svh-p': '135%'`).
- `astro:assets` (`<Picture>` + `getImage`) para generar AVIF y WebP en el build. Las imágenes salen del mismo dominio, sin CDN externo.
- CSS: container queries (`container-type: size`, unidades `cqw` y `cqh`), `mask-image` con gradientes, `clip-path: polygon()`.
- Nada de video en la carga inicial (en el home de Comfort un video llevó el LCP a 9,7 s).

### Archivos
- `organisms/servicios-hero.astro`: datos de los puntos, marcado, plantillas de capas y estilos (`is:global`, todo con el prefijo `svh-`).
- `scripts/servicios-hero.ts`: exporta `initServiciosHero(root)`, que tiene toda la lógica y los efectos.
- `assets/servicios-hero/`: la foto principal, las fotos de cada servicio, un PNG del rodillo y un video corto (webm y mp4).

### 1. Sistema de coordenadas (la base de todo)
Los puntos, el `transformOrigin` del zoom y las máscaras se miden **en % de la imagen**, no de la pantalla. Para que eso valga en cualquier tamaño, la imagen no usa `object-fit: cover` directo sobre el escenario: va dentro de una caja propia que imita a cover:

```css
.svh { --svh-ratio: 1.7917; --svh-header: 98px; }
.svh-stage {
  container-type: size; overflow: hidden; isolation: isolate;
  height: 75vw;                                   /* móvil */
  scroll-margin-top: var(--svh-header);
}
@media (min-width: 768px) {
  .svh-stage { height: max(560px, calc(100svh - var(--svh-header))); }
}
.svh-canvas, .svh-layer {
  --svh-w: max(100cqw, calc(100cqh * var(--svh-ratio)));  /* ancho/alto de la foto */
  --svh-h: max(100cqh, calc(100cqw / var(--svh-ratio)));
  position: absolute; width: var(--svh-w); height: var(--svh-h);
  left: calc((100cqw - var(--svh-w)) / 2); top: calc((100cqh - var(--svh-h)) / 2);
}
```
- `--svh-ratio` tiene que ser la proporción exacta de la foto (en Comfort, 1.7917).
- El canvas (foto principal + puntos) y cada capa de servicio usan la misma caja, así un `left: 42.5%; top: 38%` cae en el mismo píxel de la foto en todas.
- En móvil el escenario mide `75vw` de alto y la foto usa `sizes="135vw"` (recorta los lados).
- `--svh-header` se calcula en JS con la altura real del header (`header.offsetHeight`).

### 2. Datos de los puntos
Un array en el frontmatter: `{ id, label, x, y, title, text, href, cta }`, con x/y en %. Con él se generan tres cosas: los puntos, las pestañas y las tarjetas (`hidden`). Cada punto es un `<button>` de 44×44 px (área táctil) con un punto blanco, un anillo que pulsa (`@keyframes svh-spot-pulse`) y una etiqueta que aparece con hover o foco.

### 3. Carga diferida de las capas (rendimiento)
- En el HTML inicial solo va la foto principal (`loading="eager"`, `fetchpriority="high"`), que es el LCP.
- La escena de cada servicio va dentro de un `<template data-svh-tpl="id">`. El template no descarga nada.
- Con `pointerenter`, `pointerdown` o foco sobre un punto o pestaña se llama a `mount(id)`: clona el template, lo inserta en el escenario, llama a `img.decode()` en todas sus imágenes y deja una promesa `ready`. Así, cuando llega el clic, lo normal es que ya esté descargado.
- `open()` espera a `ready` antes de animar, para que la capa nunca aparezca a medio cargar.
- Si una capa tiene video: `preload="none"` en el HTML. Al montarla se cambia a `preload="auto"` + `load()` y se espera `canplay` o 1,5 s (lo que pase primero). Si no cargó a tiempo, se usan cuadros fijos (fotos) como respaldo.
- Imágenes de las capas: `getImage` en AVIF y WebP, anchos [960, 1600, 2560] (solo los que no superen el original), `quality: 72`, dentro de un `<picture>` con los mismos `sizes` que la principal. La principal usa `widths={[640, 960, 1280, 1600, 1920, 2560]}`.

### 4. La cámara: dos modos de transición
**A) "Push" (por defecto): la capa trae una escena distinta a la foto principal.**
```ts
const PUSH = { scale: 2.6, duration: 1.5, fadeAt: 0.55, fadeDuration: 0.95, fromScale: 0.42 };
// canvas: scale 1 → 2.6, blur 0 → 6px, transformOrigin = punto (x% y%)
// capa:   desde scale 0.42 + blur 8px + autoAlpha 0, mismo origin → scale 1, nítida
//         (arranca en 0.55 s, mientras el canvas sigue avanzando; ease power2.out)
```
Las dos capas se mueven en la misma dirección y desde el mismo origen, así que se lee como un solo acercamiento continuo y no como un corte.

**B) "Alineado": la capa tiene la MISMA cámara que la foto principal.**
Se activa poniendo `data-zoom="1.12"` (y opcionalmente `data-origin="50% 50%"`) en la capa. El canvas y la capa escalan juntos hasta ese zoom (1,6 s) y la capa entra en fundido (0,9 s, desde 0,2 s). La escena cambia sin cambiar de plano. En Comfort lo usan `lights` (1.12) y `design` (1.05).

Mientras tanto: los puntos y el título se ocultan (`autoAlpha 0`). Cerca del final (`ui = tl.duration() - 0.35`) entran el botón Volver y la tarjeta. El efecto del servicio arranca en `ui - 0.2` para que coincida con el final del movimiento.

### 5. Efectos por servicio (catálogo reutilizable)
Cada efecto es `(layer, motion) => gsap.core.Timeline`. Se registran en `EFFECTS[layer.dataset.effect]`, se crean pausados y se lanzan con `play()` desde la línea de tiempo principal. Todos tienen una versión sin movimiento (un fundido simple) y todos se reinician con `resetLayer()` al cerrar.

| Efecto | Técnica | Recursos |
|---|---|---|
| **roller** (pintura) | Foto antes + foto después. La "después" se revela con `clip-path: polygon()` que se recalcula en cada `onUpdate`: el rodillo (PNG) baja y sube en 6 franjas verticales, de derecha a izquierda, dentro del rectángulo `WALL` en % (`{ left: 8.9, right: 99.6, top: 21, bottom: 93 }` en Comfort). GSAP anima un objeto de estado `{i, p, shift}` y una función `render()` arma el polígono y mueve el PNG. | 2 fotos con la misma cámara + PNG transparente |
| **wipe** (drywall) | La "después" se revela con `mask-image: linear-gradient(105deg, #000 calc(var(--svh-p) - 18%), transparent var(--svh-p))`. GSAP anima `--svh-p` de -15 % a 135 % (2 s, `power2.inOut`) y al final sube el brillo de 0.88 a 1. | 2 fotos |
| **lights** (electricidad) | Destello en el punto del interruptor, parpadeo de opacidad tipo balasto (0.55 → 0.1 → 0.7 → 0) y luego `mask-image: radial-gradient(circle at X% Y%, ...)` con `--r` de 0 % a 170 %: la luz se extiende desde el interruptor. | 2 fotos (apagado/encendido) |
| **cabinet** (carpintería) | Si el video está listo: se reproduce y al final se funde sobre la foto "abierto", que es idéntica al último cuadro. Si no: 3 fotos (cerrado, semi y abierto) con máscaras por zona (cajón y puerta, `mask-composite: intersect`), un `blur` de movimiento, un `yPercent` en el cajón y un `scaleX` en la puerta, rematando con `back.out` como un cierre suave. | 3 fotos + video de 3 s con cámara fija |
| **design** (diseño) | Plano → volumen → foto real. Dos barridos diagonales con `mask-image linear-gradient(115deg)` y `--s` de -25 % a 125 %: primero se borra el plano, luego toda la capa, y debajo queda la foto principal. | plano + render en arcilla con el mismo encuadre que la principal |

Patrón clave: **animar variables CSS que alimentan un `mask-image` o un `clip-path`**. Es barato, se ve fluido y no hace falta canvas ni WebGL.

### 6. Estado, cola y accesibilidad
- Estado: `active`, `trigger` (para devolver el foco) y la línea de tiempo actual (se mata con `kill()` al cerrar).
- **Cola de promesas** `run(fn)`: las acciones nunca se pisan entre sí. Abrir otro servicio primero cierra el actual (`close(false, true)`, sin volver a mostrar los puntos).
- `aria-expanded` en los puntos, `aria-pressed` en las pestañas, `aria-controls` hacia la tarjeta (`role="region"`). Las capas van con `aria-hidden` y sus imágenes con `alt=""` (son decorativas; el `alt` descriptivo va en la foto principal).
- Al abrir, el foco pasa a Volver. Al cerrar, vuelve al punto o pestaña que lo abrió. Escape cierra.
- `prefers-reduced-motion`: sin zoom ni efectos, solo fundidos. El anillo deja de pulsar y no corre la entrada escalonada de los puntos.
- Si el escenario no está completo en pantalla al abrir, primero hace `scrollIntoView`. En móvil, después de abrir hace scroll hasta la tarjeta (`block: 'nearest'`).
- Al cargar, los puntos entran escalonados (`stagger 0.08`, `back.out(2)`).

### 7. Reglas para producir las imágenes (lo más importante al cambiar de proyecto)
1. **La misma proporción en todas** (foto principal y capas), y `--svh-ratio` igual a esa proporción. Si una difiere, los % dejan de coincidir.
2. **Para pares antes/después: la misma cámara.** Solo cambia lo que se anima. Si la cámara se movió (en Comfort el "después" de drywall quedó 18,8 % más arriba), el barrido deja ver el salto: hay que regenerar la imagen o usar un efecto que lo disimule.
3. En las capas "alineadas" (modo B), el encuadre tiene que ser igual al de la foto principal.
4. Coordenadas a medir en cada imagen nueva: la posición de cada punto, el rectángulo `WALL` del rodillo, el centro del radial de luz, las máscaras de zona del mueble y la bisagra.
5. Hay que pensar dónde va la tarjeta (abajo a la izquierda en escritorio): lo que quede tapado se anima al final o se mueve la tarjeta.
6. El video debe empezar y terminar en cuadros idénticos a las fotos. Si su proporción no coincide (16:9 contra 1.7917), se estira con `object-fit: fill`.
7. Si las imágenes son de IA, no se presentan como proyectos reales.

### 8. Trampas conocidas
- **Astro no aísla `@keyframes`**: hay que ponerles nombres únicos por componente (`svh-spot-pulse`).
- `will-change: transform, filter` en el canvas y las capas. El `blur` es caro, así que se usa poco y solo durante el zoom.
- `-webkit-mask-*` + `mask-*` juntos, y `mask-composite: intersect` junto a `-webkit-mask-composite: source-in`.
- Las capas arrancan con `visibility: hidden` y se muestran con `autoAlpha`.
- `clearProps` al cerrar, para no arrastrar estilos inline a la siguiente apertura.

### 9. Pasos para portarlo a Arkava
1. ~~`pnpm add gsap`~~ (ya instalado en Arkava).
2. Copiar el componente + el script. Cambiar el prefijo `svh-` si choca con algo.
3. Cambiar la foto principal, `--svh-ratio`, el array de puntos y los textos (copy nuevo, pasa por `humanizer`).
4. Por servicio: elegir un efecto del catálogo (o crear uno con el patrón de variable CSS + máscara), crear su `<template>`, registrarlo en `EFFECTS` y agregar su limpieza en `resetLayer`.
5. Medir de nuevo todas las coordenadas en las imágenes nuevas.
6. Probar: móvil y escritorio, teclado (Tab, Enter, Escape), movimiento reducido, red lenta (el respaldo del video), y pasar de un servicio a otro sin cerrar.
7. Medir el LCP: debe ser la foto principal y nada más.

---

## C. Requisitos SEO del hero (que no rompa el Pilar A)
- El H1 de la página sigue siendo "Servicios de remodelación y acabados en Medellín" (o el que se defina). El hero no debe reemplazarlo por un texto decorativo.
- Los textos de las tarjetas están en el HTML (`hidden`), no se generan con JS: Google los ve.
- Los enlaces de las tarjetas y pestañas son `<a href>` reales hacia cada landing: ayudan a repartir autoridad interna (problema #2 del §5).
- Debajo del hero tiene que estar el bloque de tarjetas con enlaces (Pilar A, punto 3–5). El hero no sustituye ese bloque: es una entrada visual.
- Mantener el LCP < 2,5 s en móvil.
