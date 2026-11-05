# Diseño: hero interactivo de `/servicios` (Arkava)

**Fecha:** 2026-11-04
**Rama:** `seo/crecimiento-2027`
**Estado:** Borrador para aprobación. No hay código escrito.
**Base técnica:** `.claude/pipelines/seo/CONTEXTO-HERO-SERVICIOS.md` (técnica portada de Comfort Design)
**Plan general:** `.claude/pipelines/seo/PLAN-CRECIMIENTO-2027.md` → Pilar A

---

## 1. Intención

La página `/servicios` de Arkava se rediseña empezando por el hero. Hoy la página es texto plano con los 8 servicios renderizados completos. El hero debe:

- Mostrar en una sola imagen que Arkava hace **todo el edificio, por fuera y por dentro** (la idea de "llave en mano").
- Dejar que el visitante explore cada servicio de forma visual: toca un punto del edificio, la cámara entra al espacio donde se hace ese servicio, ve cómo se hace y lee de qué se trata.
- Llevar a cada landing de servicio con enlaces reales (autoridad interna para SEO).
- Ser rápido. **El rendimiento es la prioridad sobre el efecto visual.**

## 2. Objetivos, no objetivos y anti-objetivos

**Objetivos**
- Hero con un edificio exterior en Medellín y 10 puntos de servicio.
- Cada punto abre una escena interior o de fachada con animación GSAP y una tarjeta con texto y enlace.
- Textos y enlaces en el HTML (indexables), pestañas accesibles por teclado.
- Set de prompts de Gemini, ordenado y controlado, para producir todas las imágenes.

**No objetivos (por ahora)**
- Las secciones de la página debajo del hero (se diseñan después).
- Las landings internas de cada servicio (Pilar B, más adelante).
- Reescribir el contenido de los servicios existentes.

**Anti-objetivos (sería un fracaso aunque funcione)**
- Que el LCP de `/servicios` empeore. Meta: LCP < 2,5 s en móvil, y que el LCP sea la foto del edificio.
- Que se vea igual al hero de Comfort Design (mismo look, mismas fotos o textos).
- Que el hero reemplace el H1 o el contenido de texto de la página: el hero es una entrada visual, no el contenido SEO.
- Que las imágenes de IA se presenten como proyectos reales de Arkava.
- Escenas con inconsistencias visibles de IA (manos, textos, letreros, ventanas deformes, perspectivas imposibles).

## 3. Restricciones

- Stack actual: Astro 5, Tailwind v4, GSAP `^3.13.0` (ya instalado, solo núcleo, sin plugins pagos).
- Imágenes con `astro:assets` (AVIF/WebP en build), servidas desde el mismo dominio.
- Sin video en la carga inicial. El video, si se usa, se carga solo al montar la capa (ver 6.3).
- Todo texto nuevo pasa por `humanizer`. Tono profesional y elegante. Sin "visita gratuita".
- Imágenes generadas con Gemini por el usuario, con los prompts que se entregan en el paso de producción.

## 4. Lo decidido por el usuario

1. **Escena:** un edificio mixto en Medellín, visto desde afuera. Se eligió exterior porque varios servicios son de fachada.
2. **Puntos:** van **todos los servicios** en el hero: los 8 actuales + **diseño** + **remodelación integral** = 10.
3. **Al hacer clic:** la cámara "entra" al edificio, al espacio donde se trabaja ese servicio, se muestra cómo se hace con animación y aparece una tarjeta con el detalle del servicio y un enlace a su página interna.
4. **Medios:** imágenes (una o varias por servicio) animadas con GSAP como base. Video solo en algunas partes y solo si no afecta el rendimiento.
5. **Estilo visual:** alineado a la marca actual de Arkava.
6. **Alcance:** solo el hero en esta etapa.
7. **Imágenes:** con Gemini. Se entregan prompts por imagen, en orden, con nombre de archivo y con el contexto/referencias que hay que pasarle a Gemini para que no se desvíe.

## 5. La escena principal

**Edificio:** mixto, 6–7 pisos, arquitectura contemporánea de Medellín (ladrillo a la vista combinado con concreto y vidrio, balcones con vegetación). Primer piso con un local comercial y un lobby de acceso con aire de hotel boutique. Pisos superiores de apartamentos; último piso tipo penthouse con terraza.

**Encuadre:** el edificio en ángulo de tres cuartos, desde la acera de enfrente, a la altura de los ojos o levemente elevado. Calle arborizada, montañas del Valle de Aburrá al fondo. El edificio ocupa del 35 % al 75 % del ancho, dejando aire a los lados para el recorte de móvil y para el título.

**Luz:** atardecer (hora dorada tardía). Algunas ventanas encendidas con interior cálido visible, otras apagadas. Las ventanas encendidas son las de los servicios interiores: invitan al clic.

**Formato:** 16:9 exacto. Original maestro en **4K (3840 × 2160)**; si Gemini entrega menos, se escala con una herramienta de upscaling (no se le pide a Gemini "la misma en 4K", porque la regenera). La web sirve hasta 2560 px. `--svh-ratio: 1.7778`. Todas las imágenes del hero (principal y capas) se entregan en este mismo formato.

**Cómo se muestra (usuario, 2026-11-04):** el hero ocupa **todo el ancho de la pantalla en 16:9** y se ve completo al entrar al sitio.
- Escritorio y tablet: ancho 100 %, alto `min(56.25vw, 100svh - header)`. Si la pantalla es muy ancha y baja, se recorta un poco arriba y abajo (por eso la imagen deja aire sobre el techo y bajo la acera).
- Móvil (< 768 px): 16:9 completo mediría ~211 px de alto, demasiado para 10 puntos. El escenario se hace más alto (~110vw) y se recortan los lados. Por eso **el edificio va centrado y los 10 puntos deben caer en el 50 % central del ancho** de la imagen. (Propuesta pendiente de confirmar por el usuario.)

**Imagen 01 aprobada (2026-11-04):** `hero-arkava-finished-v2.jpeg` (en `~/Downloads/hero-servicios-arkava/`), **2752 × 1536**, proporción **1.7917** (no 16:9 exacto; se usa tal cual: `--svh-ratio: 1.7917`). Todas las capas se producen en 2752 × 1536. El edificio ocupa ~23 %–86 % del ancho (no centrado): en móvil el recorte se centra en x ≈ 54,5 % con escenario de ~80vw de alto, que muestra ~19,5 %–89,5 % del ancho e incluye los 10 puntos. Upscale a 4K (3840 × 2143) como original maestro.

**La imagen 01 es la más importante del proyecto:** define el estilo de todas las demás y es el LCP. Se le dedica el prompt más detallado y no se avanza hasta tenerla perfecta.

**Zona libre:** abajo a la izquierda, donde va la tarjeta en escritorio, no debe haber puntos ni elementos clave. Arriba a la izquierda queda espacio para el título del hero.

## 6. Los 10 servicios

### 6.1 Ubicación y escena de cada punto

| # | Servicio | Punto en el edificio | La cámara entra a… | Efecto |
|---|---|---|---|---|
| 1 | Remodelación integral | Ventana de un apartamento en piso medio (la más grande) | Sala-comedor de un apartamento | `stages`: obra gris → obra blanca → terminado (3 imágenes, mismo encuadre) |
| 2 | Diseño arquitectónico e interiores | Ventana de piso alto | Un espacio en planos | `design`: plano en línea → volumen blanco → espacio real (3 imágenes) |
| 3 | Pintura (exterior) | Culata (muro lateral) del edificio, parte alta | Primer plano del muro de fachada | `floors` (nuevo): la pintura avanza **piso por piso de arriba abajo**, siguiendo las juntas de cada piso (como el andamio colgante), con un borde de pintura fresca con leve brillo. Sin rodillo: a la escala de la fachada (~380 px por piso) un rodillo real mediría ~30 px y uno visible sería irreal |
| 4 | Enchape | Ventana esmerilada del baño | Baño de apartamento | `tiles` (nuevo): 12 → 11b → 11. Las piezas del muro de fondo aparecen una a una siguiendo las juntas reales (máscaras por pieza); piso y muro lateral (en perspectiva) entran con barrido; al final, fundido de muebles, espejo y vidrio (11) |
| 5 | Muros decorativos | Lobby de entrada (primer piso) | Muro principal del lobby | `trowel` (nuevo): el microcemento aparece en trazos curvos de llana (máscaras radiales/elípticas que crecen en secuencia), luego se encienden las luces del piso |
| 6 | Cielo raso | Ventana de un piso alto | Techo de una sala | Base 17 → `wipe` de arriba abajo **solo en la zona del techo** con la 16 → `lights`: fundido completo a la 15 desde la cornisa (los muros de la 16 nunca se muestran) |
| 7 | Muros drywall | Ventana de piso medio | Habitación en obra | `boards` (nuevo): las placas se instalan una a una en franjas verticales del ancho de una placa (incluye la franja del refuerzo sobre el vano) |
| 8 | Estuco | Ventana de apartamento | Muro de habitación | `trowel`: pañete rústico → estuco liso en trazos de llana, limitado al rectángulo del muro |
| 9 | Argamasa (exterior) | Culata del edificio, parte baja | El mismo muro de fachada que pintura | `wipe`: ladrillo a la vista → argamasa nivelada |
| 10 | Carpintería arquitectónica | Penthouse | Hall del penthouse | `panels` (nuevo): tablillas de roble que aparecen una a una + puerta pivotante |

**Exteriores:** pintura, argamasa y muros decorativos (lobby). Es lo que justifica que la escena sea el edificio por fuera.

**Regla (decidida 2026-11-04, tras ver la primera versión de la 01):** la imagen principal muestra el edificio **100 % terminado**: es el resultado que vende Arkava. El proceso (ladrillo → argamasa → pintura, perfiles de drywall, losa a la vista, etc.) se muestra **solo dentro de las capas animadas** de cada servicio. Los puntos de argamasa y pintura van sobre la culata ya terminada.

**Mi decisión (ajustable):** argamasa → pintura usan **el mismo muro de fachada** en secuencia (ladrillo → argamasa → pintura). Son dos puntos distintos, pero la imagen "después" de argamasa es la "antes" de pintura. Se ahorra una imagen y la consistencia es total.

**Regla de animación:** cada efecto se limita al rectángulo (o polígono) de la superficie que cambia. Gemini redibujó levemente plantas y paisajes entre pares; fuera de la máscara siempre se muestra una sola imagen, así esas diferencias nunca se ven.

### 6.2 Tarjeta de cada servicio
- Título, 2–3 líneas de texto y botón.
- Texto: el contenido actual del servicio (hoy viene de Hygraph), resumido. Para remodelación integral y diseño se escribe texto nuevo (pasa por `humanizer`).
- Enlace: la landing actual (`/servicios/pintura/`, etc.). **Mi decisión:** remodelación integral y diseño no tienen página, así que su botón va a `/contacto/` ("Cotizar proyecto") hasta que existan sus landings.

### 6.3 Medios y rendimiento
- Base: imágenes antes/después animadas con máscaras y variables CSS (sin canvas ni WebGL).
- Video: opcional, solo para 1–2 servicios donde la imagen no alcance (candidatos: carpintería, remodelación integral). Máximo 3 s, sin audio, < 300 KB en webm, `preload="none"`, y con respaldo de imágenes si no carga en 1,5 s. **No se produce video en la primera versión**: se evalúa después de ver el hero con imágenes.
- Carga inicial: solo la foto del edificio (`fetchpriority="high"`). Las capas se montan desde `<template>` al pasar el mouse o enfocar el punto.
- Imágenes de capas: AVIF + WebP, anchos [960, 1600, 2560], `quality: 72`.
- **Las imágenes viven en el proyecto** (`src/assets/servicios-hero/`, 25 archivos, 8,9 MB en JPEG de alta calidad) y se sirven desde el mismo dominio con `astro:assets`. Se descartó Cloudinary (decisión 2026-11-04): agrega una conexión a otro dominio antes del LCP, otra cuenta y otro punto de falla, sin beneficio para imágenes fijas.

## 7. Estilo visual (marca Arkava)

- Puntos: círculo crema (`#F9F6E7`) con anillo que pulsa en naranja (`#E35205`). Etiqueta en `PP Supply Mono`, mayúsculas pequeñas.
- Tarjeta: fondo verde Arkava (`#2E483E`) con texto crema, o crema con texto verde (definir en el mockup). Botón en naranja.
- Pestañas: tipografía `PP Supply Sans`, estado activo en verde con subrayado naranja.
- Botón Volver: crema sobre la imagen, con sombra suave.
- Título del hero: H1 de la página, legible sobre la foto (degradado oscuro en la zona del título).
- Diferenciación con Comfort: otra escena (edificio vs. apartamento), otra paleta, otras fuentes y otra forma de punto.

**Pendiente:** validar con un mockup antes de implementar.

## 8. SEO y GEO del hero

- El `<h1>` es el de la página ("Servicios de remodelación y acabados en Medellín" o el que se defina) y está en el HTML del hero.
- Las 10 tarjetas están en el HTML con `hidden`, no se generan con JS.
- Los botones de tarjeta y las pestañas son `<a href>` reales.
- La foto principal tiene `alt` descriptivo (edificio, Medellín, servicios). Las capas son decorativas (`alt=""`, `aria-hidden`).
- No se agrega schema en el hero: el schema del hub (`Service`/`OfferCatalog`, `FAQPage`, `BreadcrumbList`) se define con las secciones de abajo.
- Si las imágenes son de IA, ningún texto del hero las presenta como proyectos reales.

## 9. Producción de imágenes con Gemini (cómo se controla)

### 9.1 Reglas para que Gemini no alucine
1. **Biblia de estilo**: un bloque de texto fijo (materiales, luz, lente, paleta, prohibiciones) que se pega al inicio de **todos** los prompts.
2. **Imagen maestra primero**: el edificio exterior (`01`). Ninguna otra imagen se genera hasta aprobarla.
3. **Siempre "después" primero, luego "antes" por edición**: se genera la escena terminada y se le pide a Gemini que la **edite** cambiando solo el material. Nunca se generan antes y después por separado (la cámara cambiaría).
4. **Una conversación de Gemini por escena**, con las imágenes de referencia adjuntas (la maestra para el estilo, la "después" para la edición).
5. **Prohibiciones fijas**: sin personas, sin texto, letreros, logos ni marcas de agua, sin herramientas flotando, sin distorsiones.
6. **Revisión después de cada imagen** con un checklist (formato 16:9, cámara igual a su par, sin artefactos). Si falla dos veces, se reinicia la conversación en vez de seguir corrigiendo (la deriva aumenta con cada iteración).
7. Exportar en la máxima resolución que dé Gemini y recortar/escalar a 2560 × 1440.

### 9.2 Imágenes finales (todas aprobadas el 2026-11-04)

Todas en 2752 × 1536 (proporción 1.7917) salvo el rodillo. Originales en `~/Downloads/hero-servicios-arkava/`; versiones comprimidas en `src/assets/servicios-hero/`. Cada par antes/después pasó una superposición píxel a píxel (cámara sin desplazamiento).

| Archivo | Escena | Uso en la animación |
|---|---|---|
| `01-edificio.jpg` | Edificio exterior | Foto principal (LCP), puntos y zoom |
| `02-integral-terminado.jpg` | Sala con biblioteca | Estado final de remodelación integral |
| `03-integral-obra-blanca.jpg` | Misma sala | Etapa intermedia |
| `04-integral-obra-gris.jpg` | Misma sala | Estado inicial |
| `05-diseno-real.jpg` | Cocina-comedor | Estado final de diseño |
| `06-diseno-volumen.jpg` | Misma vista en maqueta blanca | Etapa intermedia |
| `07-diseno-plano.jpg` | Misma vista en dibujo de líneas | Estado inicial |
| `08-fachada-pintada.jpg` | Culata de cerca | Final de pintura |
| `09-fachada-argamasa.jpg` | Mismo muro | Final de argamasa = inicio de pintura |
| `10-fachada-ladrillo.jpg` | Mismo muro | Inicio de argamasa |
| `10b-rodillo.png` | Rodillo sin fondo, colores neutralizados | **No se usa** con la opción A de pintura; se conserva por si una escena interior lo necesita |
| `11-enchape-despues.jpg` | Baño terminado | Final de enchape (muebles) |
| `11b-enchape-sin-muebles.jpg` | Mismo baño enchapado sin muebles | Intermedia: destino de las piezas |
| `12-enchape-antes.jpg` | Mismo baño en mortero | Inicio de enchape |
| `13-decorativos-despues.jpg` | Lobby con microcemento | Final de muros decorativos |
| `14-decorativos-antes.jpg` | Mismo lobby, muro liso | Inicio |
| `15-cielo-encendido.jpg` | Sala con cielo y cornisa encendida | Final de cielo raso |
| `16-cielo-apagado.jpg` | Mismo cielo apagado | Intermedia (solo la zona del techo) |
| `17-cielo-losa.jpg` | Misma sala con losa y tuberías | Inicio |
| `18-drywall-despues.jpg` | Muro terminado con vano | Final de drywall |
| `19-drywall-antes.jpg` | Perfiles + placas por una cara + lana mineral | Inicio |
| `20-estuco-despues.jpg` | Muro estucado | Final de estuco |
| `21-estuco-antes.jpg` | Mismo muro en pañete | Inicio |
| `22-carpinteria-despues.jpg` | Hall con tablillas de roble y puerta pivotante | Final de carpintería |
| `23-carpinteria-antes.jpg` | Mismo hall, muro liso con vano | Inicio |

**Por qué en las ediciones se adjuntó la "después" y no la anterior:** todas las variantes de una escena salen de la misma imagen base, así el error no se acumula de una edición a otra.

### 9.2b Coordenadas preliminares de los puntos (sobre la 01 aprobada)
Medidas a ojo sobre la imagen; se ajustan en el navegador al implementar.

| # | Servicio | x % | y % | Dónde |
|---|---|---|---|---|
| 1 | Remodelación integral | 61 | 58 | Sala grande con biblioteca, 2.º nivel de balcones, derecha |
| 2 | Diseño | 66,5 | 35 | Estudio con maqueta, nivel alto, derecha |
| 3 | Pintura | 79 | 27 | Culata, parte alta |
| 4 | Enchape | 47,5 | 56,5 | Ventana esmerilada del baño |
| 5 | Muros decorativos | 65 | 78 | Muro de microcemento del lobby |
| 6 | Cielo raso | 56,5 | 31 | Ventana con cielo y luz indirecta, nivel alto |
| 7 | Muros drywall | 56,5 | 46 | Sala del 3.er nivel, izquierda del bloque derecho |
| 8 | Estuco | 31,5 | 71 | Muro con cuadro, 1.er nivel, izquierda |
| 9 | Argamasa | 79 | 55 | Culata, parte media |
| 10 | Carpintería | 56 | 20 | Penthouse, revestimiento y puerta en madera |

### 9.3 Después de producir
- Medir en `01` las coordenadas de los 10 puntos (en %).
- Medir en cada escena las zonas de animación (muro del rodillo, cuadrícula del enchape, centro de la luz).
- Guardar las imágenes en `src/assets/servicios-hero/` con los nombres de la tabla.

## 10. Implementación (resumen para el plan)

- `src/components/organisms/ServiciosHero.astro` + `src/scripts/servicios-hero.ts` (portados de Comfort; prefijo `svh-` u otro si choca).
- Efectos: `wipe`, `lights`, `design` (portados de Comfort) y `stages`, `floors`, `tiles`, `trowel`, `boards` y `panels` (nuevos, con el mismo patrón de variable CSS + máscara). `roller` no se usa.
- `src/pages/servicios/index.astro`: el hero entra arriba. El resto de la página se mantiene como está por ahora (se rediseña después).
- Móvil: ver 10.1.

### 10.1 Versión móvil (aprobada: "la mejor versión usable posible")
Con 10 puntos en una pantalla de 375 px, los puntos solos no alcanzan. En móvil:
- **Escenario:** la foto ocupa ~`80vw` de alto con recorte lateral centrado en x ≈ 54,5 % de la 01 (el edificio no está centrado en la imagen), así se ven los 10 puntos. Las capas usan el recorte centrado; en drywall el vano queda parcialmente cortado en móvil (aceptado: el muro animado se ve completo).
- **Puntos:** punto de 12 px dentro de un área táctil de 32 × 32 px en móvil (WCAG 2.2 pide mínimo 24 px; 44 px en escritorio), sin etiqueta, con un número pequeño (1–10) que coincide con la pestaña. Separación mínima de 28 px entre centros en móvil (con escenario de 300 px de alto: 1 % de y ≈ 3 px, 1 % de x ≈ 5,4 px). Con 10 puntos en el edificio, 44 px de separación no es posible en móvil; por eso los chips son la navegación principal.
- **Pestañas:** debajo de la foto, una fila de chips desplazable horizontalmente (`scroll-snap`), con número + nombre del servicio. Son la navegación principal. El chip activo se centra solo al abrir un servicio.
- **Pista inicial:** una línea bajo el H1, "Toca un punto del edificio o elige un servicio", que desaparece después de la primera interacción.
- **Tarjeta:** en móvil va **debajo** del escenario, no encima de la imagen, para no tapar la animación. Después de abrir, scroll suave hasta la tarjeta (`block: 'nearest'`).
- **Volver:** botón fijo arriba a la izquierda del escenario, 44 px de alto. También cierra tocar la foto.
- **Cambiar de servicio** desde los chips sin tener que volver primero (la cola cierra el actual y abre el nuevo).
- **Rendimiento en móvil:** el `blur` del zoom se reduce (máx. 4 px) y con `prefers-reduced-motion` solo hay fundidos.

En escritorio: puntos con etiqueta al hover/foco, pestañas flotando abajo, tarjeta abajo a la izquierda sobre la imagen.
- Pruebas: móvil y escritorio, teclado (Tab, Enter, Escape), `prefers-reduced-motion`, red lenta, cambio de servicio sin cerrar, Lighthouse (LCP).

## 11. Lo que queda al criterio del implementador
- Duraciones y curvas exactas de cada efecto.
- Estructura interna del script (puede seguir la de Comfort).
- Nombres de clases CSS.

## 12. Decisiones (revisadas con el usuario el 2026-11-04)
1. Edificio mixto de 6–7 pisos, atardecer, formato 16:9 a 2560 × 1440. (mía)
2. Argamasa y pintura son exteriores y comparten el muro de culata en secuencia (ladrillo → argamasa → pintura). Estuco queda interior. (mía, el usuario la dejó a mi criterio)
3. Remodelación integral y diseño enlazan a `/contacto/` mientras se crean sus landings. **Se crearán páginas para los dos** (registrado en el plan, Pilar B). (usuario)
4. Sin video en la primera versión. (aprobada)
5. Colores y tipografía del sitio actual: puntos crema con anillo naranja, tarjeta en verde Arkava. (usuario: "acordes al website")
6. Efecto `tiles` nuevo para enchape y `stages` nuevo para remodelación integral. (aprobada)
7. Móvil según 10.1. (usuario: "la mejor versión usable posible")
8. Imágenes locales en `src/assets/servicios-hero/`, no Cloudinary. (usuario, tras recomendación)
9. Pintura: opción A, piso por piso de arriba abajo, sin rodillo (el rodillo no tiene escala creíble en la fachada). (usuario)
10. Decorativos y estuco con trazos de llana (`trowel`); drywall con placas una a una (`boards`); enchape con imagen intermedia 11b. (aprobadas)
