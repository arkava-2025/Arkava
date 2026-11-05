# Prompts de Gemini: hero de `/servicios` (Arkava)

**Diseño:** `docs/superpowers/specs/2026-11-04-hero-servicios-design.md` (§5 escena, §6 servicios, §9 producción)
**Herramienta:** Gemini (plan Plus) → "Crear imagen".
**Estado:** Imagen 01 lista para generar. Las demás se escriben cuando la 01 esté aprobada, porque dependen de ella.

---

## Cómo usar este archivo

1. Los prompts van **en inglés**: Gemini sigue mejor las instrucciones de fotografía y arquitectura en inglés. La explicación de cada uno está en español.
2. **Imagen 01 en un chat nuevo.** Pega el prompt completo tal cual. Cada prompt de este archivo ya trae la biblia de estilo incluida al inicio: no hay que unir nada.
3. Si sale bien pero con un detalle a corregir, pide **un solo cambio por mensaje** ("Keep everything identical, only change X").
4. Si después de 2 correcciones empeora o cambia cosas que no pediste, **abre un chat nuevo** y vuelve a pegar el prompt completo. Corregir muchas veces hace que Gemini se desvíe.
5. Descarga siempre la imagen en la resolución más alta que ofrezca.
6. Nombre del archivo al guardar: el de cada sección (`01-hero-edificio.png`, etc.).

---

## Biblia de estilo (va al inicio de TODOS los prompts)

```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.
```

---

## Imagen 01 — `01-hero-edificio.png` (imagen maestra)

**Qué es:** el edificio por fuera. De esta imagen salen los 10 puntos y el estilo de todas las demás. Es la que carga primero en la web.

**Qué tiene que contar** (de izquierda a derecha y de abajo arriba):
- Primer piso: un **local comercial** con vitrina (enchape, locales) y un **lobby** de doble altura con un muro decorativo de textura visible a través del vidrio (muros decorativos).
- Pisos 2 a 6: apartamentos. Algunas ventanas encendidas dejan ver interiores terminados: una sala grande (remodelación integral), un **cielo raso con luz indirecta** (cielo raso), un muro liso de color cálido (estuco), una habitación en obra con perfiles metálicos de drywall (muros drywall), una ventana pequeña de baño, y un piso con planos y maqueta junto a la ventana (diseño).
- Piso 7: **penthouse** con terraza, pérgola y revestimiento de madera visible adentro (carpintería).
- **Muro lateral (culata)**, visible a la derecha: abajo ladrillo a la vista, en el medio argamasa gris nivelada y arriba pintado y terminado. Cuenta en una sola imagen el paso ladrillo → argamasa → pintura (argamasa y pintura).

**Composición pensada para la web:**
- Edificio **centrado**, ocupando más o menos el 50 % central del ancho, completo de la acera al techo.
- Aire de cielo sobre el techo (~12 %) y de acera abajo (~10 %): en pantallas muy anchas se recorta un poco arriba y abajo.
- Arriba a la izquierda, cielo tranquilo (ahí va el título). Abajo a la izquierda, calle y árboles tranquilos (ahí va la tarjeta en escritorio). Nada importante en esas dos zonas.
- En móvil se recortan los lados: todo lo importante debe quedar en el centro.

### Prompt (copiar completo: ya incluye la biblia de estilo)

```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

IMAGE 01 — MASTER SHOT. This image defines the style of a whole series, so maximum quality and realism.

SUBJECT: A contemporary 7-story mixed-use building in El Poblado, Medellín, recently and beautifully renovated by a high-end architectural finishes company. Elegant, warm, timeless architecture: terracotta exposed brick combined with light board-formed concrete bands at each slab, floor-to-ceiling windows with slim dark bronze frames, balconies with built-in planters full of tropical plants.

CAMERA AND FRAMING: Three-quarter view from the opposite sidewalk of a quiet tree-lined street, camera at about 1.7 m height, slightly looking up but with perfectly vertical lines (tilt-shift corrected). The main facade faces the camera and occupies the center-left of the building; the right side wall (party wall) is visible at an angle on the right. The whole building is visible from the sidewalk to the roof, CENTERED in the frame, occupying roughly the central 50% of the image width. Leave calm sky above the roof (about 12% of image height) and some sidewalk and street below (about 10%). The left and right thirds of the image show only calm context: trees, a bit of street, distant lower buildings and the green mountains. The upper-left area must be calm sky, and the lower-left area must be calm street and trees, with no important details.

GROUND FLOOR (left to right):
- A commercial space with a large glass storefront, warm interior lighting, empty and elegant inside, with a beautiful large-format porcelain tile floor visible through the glass. No signs, no text.
- A double-height lobby entrance with tall glass and a solid oak door. Inside the lobby, clearly visible through the glass, a striking decorative feature wall in warm grey micro-cement / Venetian plaster with soft texture, washed by a warm wall light.

APARTMENT FLOORS (2 to 6): most windows have sheer curtains and are softly dark, but SOME windows are warmly lit from inside and show glimpses of interiors:
- Floor 3, the largest window: a spacious finished living-dining room with warm lights.
- Floor 5, one window: a white drywall ceiling with a recessed indirect LED light cove glowing warm.
- Floor 4, one window: a room still under construction, with visible light-grey metal drywall studs and bare gypsum boards, lit by a single work light.
- Floor 2, one window: a smooth warm off-white plastered wall with a framed artwork.
- Floor 6, one window: an architect's studio corner with a white architectural scale model and rolled plans on a large table near the window.
- One small frosted bathroom window on floor 3, softly lit.

TOP FLOOR (7): a penthouse with a terrace, a slim wooden pergola and plants. Through its glass, warm natural oak wood wall paneling and a tall oak door are visible inside.

RIGHT SIDE WALL (party wall), visible at an angle: it tells a story of finishing in three horizontal bands — the lower third is raw exposed red clay brick with mortar joints, the middle third is a freshly applied smooth grey cement render (mortar leveling coat), and the upper third is perfectly painted in warm off-white, finished. Clean, sharp transitions between bands, no scaffolding, no workers, no tools.

CONTEXT: tall green trees (guayacán with some yellow flowers, palms) along the sidewalk, but they must NOT cover the windows or the side wall. In the background, the green Andean mountains of the Aburrá Valley with a few distant residential towers, slightly hazy. Clean sidewalk, no cars in front of the building.

MOOD: premium, trustworthy, warm, aspirational, quiet. A building you would want to live in.

OUTPUT: 16:9 landscape, highest possible resolution, photorealistic, extremely detailed, sharp.
```

### Versión 1 generada (2026-11-04) → ajustes por edición
Primera versión muy buena: buena luz y materiales, se ven todos los servicios, el lobby y el penthouse están excelentes. Decisión: **el edificio de la imagen principal debe verse 100 % terminado** (el proceso se ve solo en las animaciones). La composición no se toca (no está centrada como pedía el prompt, pero se resuelve en CSS con un punto focal en móvil). Se corrige por edición, en el mismo chat, un mensaje por cambio y en este orden:

1. `Keep absolutely everything identical: camera, framing, light, sky, trees, street and the whole front facade. Only change the tall right side wall: the grey cement band in the middle must become fully finished, smooth and painted in exactly the same warm off-white as the upper part of that wall, with no visible seams, so the wall reads as one clean finished surface. Keep the exposed red brick at the bottom of that wall as it is, clean and finished.`
2. `Keep absolutely everything identical. Only change the room behind the windows on the right side of the third balcony level from the bottom (the room with visible metal drywall studs and a work light): make it a finished, softly lit room with smooth white walls, warm lights and elegant furniture. No studs, no boards, no work light.`
3. `Keep absolutely everything identical. Only change the two rooms on the right side of the second balcony level from the bottom: they look empty and unfinished; make them finished, warmly lit living spaces with elegant furniture and plants.`
4. `Keep absolutely everything identical. Only remove the small road sign on the left sidewalk.`

Si una edición mueve la cámara o cambia cosas que no se pidieron, se descarta y se repite el mensaje desde la versión anterior.

### Checklist para aprobar la 01
Revisa todo antes de pasar a la siguiente imagen:
- [ ] Formato horizontal 16:9.
- [ ] Parece una foto real, no un render.
- [ ] Edificio completo (acera a techo) y centrado; los lados son solo contexto.
- [ ] Líneas verticales rectas, ventanas sin deformar, pisos que se pueden contar (7).
- [ ] Sin personas, texto, letreros, logos ni marcas de agua (revisa vitrinas y ventanas con zoom).
- [ ] Se distinguen: local con piso enchapado, lobby con muro decorativo, sala grande encendida, cielo con luz indirecta, cuarto con perfiles de drywall, muro liso, estudio con maqueta, ventana de baño, penthouse con madera.
- [ ] La culata se ve terminada (pintura cálida arriba, ladrillo limpio abajo). Sin zonas en obra en ninguna parte del edificio.
- [ ] Arriba a la izquierda cielo tranquilo; abajo a la izquierda calle tranquila.
- [ ] Los árboles no tapan ventanas ni la culata.
- [ ] Luz de atardecer cálida que viene de la izquierda.

**Correcciones típicas** (un mensaje por cambio):
- `Keep everything identical, only make the building smaller and centered so the left and right thirds show only trees, street and mountains.`
- `Keep everything identical, only remove any text, signs or logos from the storefront.`
- `Keep everything identical, only make the three bands on the right side wall clearer: raw red brick at the bottom, smooth grey cement render in the middle, painted off-white at the top.`
- `Keep everything identical, only make the trees lower so they don't cover any window.`

### Cuando la 01 esté aprobada
1. Descárgala en la máxima resolución y dime qué medidas tiene (ancho × alto).
2. Si mide menos de 3840 px de ancho, la escalamos a 4K con una herramienta de upscaling. No le pidas a Gemini "la misma en 4K".
3. Pásamela: mido las coordenadas de los 10 puntos y escribo los prompts 02–23, que usan la 01 como referencia de estilo.

---

## ✅ Imagen 01 aprobada

`hero-arkava-finished-v2.jpeg` (2752 × 1536). Edificio 100 % terminado, cámara intacta respecto a la v1, señal eliminada. **Todas las imágenes siguientes deben salir en el mismo tamaño (2752 × 1536).** Si Gemini entrega otro tamaño, avisar antes de seguir.

---

## Cómo se trabaja cada escena (02 en adelante)

- **Un chat nuevo de Gemini por escena** (remodelación integral, diseño, pintura+argamasa, enchape, decorativos, cielo raso, drywall, estuco, carpintería).
- **Primer mensaje del chat:** adjuntar `hero-arkava-finished-v2.jpeg` + pegar el prompt del "después". La imagen adjunta es solo **referencia de estilo** (luz, materiales, color); la escena es otra.
- **Mensajes siguientes del mismo chat:** las variantes "antes", siempre editando la imagen "después" (no la anterior variante). Si Gemini toma la variante equivocada, adjuntar de nuevo la "después".
- Checklist de cada "después": parece foto real, 2752 × 1536, sin personas/texto/logos, zona abajo a la izquierda tranquila (ahí va la tarjeta), la superficie del servicio se ve grande y clara.
- Checklist de cada "antes": **cámara idéntica** a la "después" (superponerlas: ventanas, esquinas y piso deben coincidir), solo cambia lo pedido.

---

## Imagen 02 — `02-integral-terminado.jpeg` (remodelación integral, "después")

**Qué es:** la sala-comedor grande que se ve en el 2.º nivel de balcones, a la derecha de la 01 (la de la biblioteca y los cuadros). Es el estado final de la secuencia obra gris → obra blanca → terminado. Las imágenes 03 y 04 salen de editar esta.

**Qué tiene que tener:** piso, muros y techo bien visibles (son lo que cambia en las otras dos), una ventana grande con la vista de Medellín al atardecer, biblioteca empotrada, muebles elegantes pero no demasiados (se quitan en las otras versiones).

**Adjuntar:** `hero-arkava-finished-v2.jpeg`.

```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it ONLY as the reference for style, light, color grading and materials. Do not reproduce the exterior.

IMAGE 02 — INTERIOR: the finished living-dining room of one of the apartments of that building (the large warm room with built-in bookshelves seen through the windows of the second balcony level).

SPACE: a spacious open living-dining room, about 6 x 9 meters, ceiling height 2.6 m, completely renovated to a high-end standard. Smooth warm off-white plastered walls, a flat white drywall ceiling with a few recessed warm downlights, large-format light beige porcelain tile floor with almost invisible joints. One full wall of built-in natural oak bookshelves with some books and ceramics. A floor-to-ceiling window wall with slim dark bronze frames on the LEFT side of the frame, showing the green mountains and towers of Medellín at golden hour, with warm sunlight entering and drawing long soft shadows on the floor.

FURNITURE (few, elegant, low, so walls, floor and ceiling stay clearly visible): a linen sofa, two armchairs, a low oak coffee table, a round dining table with four chairs, a large green plant, one framed abstract artwork in earth tones, a warm floor lamp.

CAMERA AND FRAMING: eye level 1.5 m, standing at one corner of the room looking diagonally across it, so we see the floor, at least two walls, the ceiling and the window wall at the same time. Perfectly vertical lines. The lower-left area of the image must be calm (floor and a bit of the window light), with no important objects. The space should look generous and luminous.

MOOD: premium, warm, calm, the result of a complete turnkey renovation. A space you would want to live in.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

**Checklist 02:** foto real · piso, techo y dos muros visibles · ventana a la izquierda con vista a Medellín · biblioteca en roble · pocos muebles · abajo a la izquierda tranquilo · sin texto en los libros (si salen letras en los lomos, pedir: `Keep everything identical, only make the book spines plain without any letters`).

---

## Mapa completo: 10 clics, 9 escenas, 23 imágenes nuevas

Cada clic hace lo mismo: zoom de la cámara hacia el punto del edificio → aparece la escena del servicio → corre su animación → sale la tarjeta. Lo que cambia es la escena y la animación:

| Clic | Servicio | Escena (chat de Gemini) | Animación al hacer clic | Imágenes que usa |
|---|---|---|---|---|
| 1 | Remodelación integral | A · Sala-comedor | `stages`: la sala pasa de obra gris → obra blanca → terminada, con dos barridos suaves | 04 → 03 → 02 |
| 2 | Diseño | B · Estudio-sala | `design`: el dibujo en líneas se convierte en volumen blanco y luego en el espacio real | 07 → 06 → 05 |
| 3 | Pintura | C · Muro de fachada | `roller`: el rodillo pinta el muro en franjas verticales | 09 → 08 + 10b |
| 4 | Enchape | D · Baño | `tiles`: las piezas aparecen una a una en cuadrícula sobre el mortero | 12 → 11 |
| 5 | Muros decorativos | E · Lobby | `wipe` diagonal + la luz rasante se enciende y revela la textura | 14 → 13 |
| 6 | Cielo raso | F · Sala con cielo | `wipe` de arriba abajo: losa → cielo instalado; luego `lights`: la luz indirecta se enciende desde la cornisa | 17 → 16 → 15 |
| 7 | Muros drywall | G · Habitación | `wipe`: los perfiles metálicos se cubren y queda el muro terminado | 19 → 18 |
| 8 | Estuco | H · Muro interior | `wipe` lateral con luz rasante: pañete rugoso → estuco liso | 21 → 20 |
| 9 | Argamasa | C · Muro de fachada (el mismo de pintura) | `wipe` de abajo arriba: ladrillo → argamasa nivelada | 10 → 09 |
| 10 | Carpintería | I · Hall del penthouse | `panels`: las tablillas de roble aparecen de una en una de izquierda a derecha y al final aparece la puerta | 23 → 22 |

**Orden de producción** (de menor a mayor riesgo, para aprender el método con lo fácil):
1. Escena H · Estuco (20, 21): muro frontal, la más fácil. Sirve para probar el método después/antes.
2. Escena C · Fachada (08, 09, 10, 10b): pintura + argamasa.
3. Escena G · Drywall (18, 19).
4. Escena E · Lobby (13, 14).
5. Escena D · Baño (11, 12).
6. Escena I · Carpintería (22, 23).
7. Escena F · Cielo raso (15, 16, 17).
8. Escena A · Remodelación integral (02, 03, 04).
9. Escena B · Diseño (05, 06, 07): la más difícil (dibujo y volumen con el mismo encuadre).

> Si ya empezaste la 02, no pasa nada: termina la escena A y sigue con este orden.

## Reglas para todas las escenas

1. **Un chat nuevo por escena.** Primer mensaje: adjuntar `hero-arkava-finished-v2.jpeg` + pegar el prompt del "después" (ya trae la biblia de estilo).
2. **Las variantes "antes" se piden en el mismo chat**, siempre sobre la imagen "después". Si el chat ya tiene varias imágenes, adjunta otra vez la "después" para que Gemini edite la correcta.
3. **Tamaño:** 2752 × 1536 en todas. Si sale otro, avisa antes de seguir.
4. **La ventana va a la izquierda y el sol entra por la izquierda** en todos los interiores (igual que en la 01).
5. **Abajo a la izquierda, zona tranquila**: ahí va la tarjeta en escritorio.
6. **Encuadre frontal** cuando la animación es de muro (estuco, fachada, drywall, lobby, baño, carpintería): la cámara mira el muro de frente, así la máscara de la animación es un rectángulo limpio.
7. **Revisión del "antes":** me la pasas junto con la "después" y yo superpongo las dos para confirmar que la cámara no se movió. Si se movió, se repite.
8. Guarda cada archivo con el nombre exacto de la tabla en `~/Downloads/hero-servicios-arkava/`.

---

## Escena H · Estuco (imágenes 20 y 21)

**Animación:** la cámara entra por la ventana del muro con cuadro (primer nivel, izquierda). Se ve un muro con pañete rugoso; una luz rasante lo recorre de izquierda a derecha y detrás queda el estuco liso, perfecto.

### 20 — `20-estuco-despues.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it ONLY as the reference for style, light, color grading and materials. Do not reproduce the exterior.

IMAGE 20 — INTERIOR: a bedroom wall in one of the apartments, finished with a perfect smooth plaster (estuco) in warm off-white.

SPACE AND FRAMING: frontal view, camera facing the wall straight on at 1.5 m height, one-point perspective. The wall fills about 80% of the frame. On the LEFT edge, part of a floor-to-ceiling window with dark bronze frame lets in warm low golden-hour sunlight that grazes the wall from the left, showing how perfectly flat and smooth the plaster is. A strip of light oak floor at the bottom and a strip of flat white ceiling at the top. No furniture against the wall, no artwork, no switches, no sockets. Only, at the far right edge, a small part of a linen bed and a plant.

MOOD: calm, precise, premium craftsmanship.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

✅ **20 aprobada (2026-11-04):** 2752 × 1536, frontal, muro de x ≈ 16 % a 100 % y de y ≈ 8 % a 94 %.

### 21 — `21-estuco-antes.jpeg` (en el mismo chat, sobre la 20)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, lens, light direction, window, view outside, floor, baseboard, ceiling, bed and plant, and the warm sunlight patches on the wall in exactly the same position and shape. Only change the wall surface: instead of smooth plaster, it is now a rough grey sand-and-cement render (pañete), slightly uneven, with visible trowel marks and sandy texture, as it looks right before plastering. Same wall edges, same size. Same output size.
```

✅ **21 aprobada (2026-11-04):** superposición con la 20 sin desplazamiento (ventana, piso, techo y bordes del muro coinciden). La planta se regeneró levemente: la animación se limita al rectángulo del muro. **Escena H completa.**

---

## Escena C · Muro de fachada: pintura + argamasa (imágenes 08, 09, 10 y 10b)

**Animación argamasa (clic 9):** la cámara entra a la parte media de la culata. Se ve ladrillo a la vista; un barrido de abajo arriba lo cubre con argamasa gris nivelada.
**Animación pintura (clic 3):** la cámara entra a la parte alta de la culata. Se ve el muro en argamasa; un rodillo lo recorre en franjas verticales y lo deja pintado en blanco cálido.

### 08 — `08-fachada-pintada.jpeg`

> v1 (2026-11-04) descartada: se veía como una caja aislada, sin relación con el edificio. Prompt reescrito: esquina con la fachada de ladrillo a la izquierda, textura real de pintura y sombra de hojas. Se genera en **chat nuevo** (no por edición: el encuadre cambia demasiado).
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it as the reference for style, light, color and materials. The tall right side wall (party wall) of that building, painted in warm off-white, is the subject of this image.

IMAGE 08 — EXTERIOR CLOSE-UP of that same tall side wall, as seen from the neighboring building at the height of the 4th floor, freshly and perfectly painted in warm off-white exterior paint. It must clearly read as part of THAT building, not as an isolated box.

FRAMING: camera facing the side wall straight on, frontal, one-point perspective, perfectly vertical lines. The painted side wall fills about 65% of the frame, from the center to the right. On the LEFT third of the frame, seen edge-on at the corner of the building, the front facade of the same building: terracotta exposed brick, the light board-formed concrete slab edges at each floor, and the planters overflowing with tropical plants, exactly as in the reference. At the top, the clean thin edge of the roof parapet and a strip of warm sky. On the far right edge, a thin strip of green trees and mountains in the distance.

WALL SURFACE: real exterior paint on cement render, with a very fine, slightly textured matte finish (not a flat digital color), subtle and realistic. Thin horizontal construction joints at each floor level. The warm low golden-hour sunlight comes from the left and creates a soft natural gradient across the wall, plus the soft shadow of a few palm leaves on the lower-left part of the painted wall. Nothing else on the wall: no windows, no pipes, no cables, no signs, no stains.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 09 — `09-fachada-argamasa.jpeg` (mismo chat, sobre la 08)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, wall edges, parapet, sky, mountains and light. Only change the wall surface: it is now a freshly applied smooth grey cement mortar render (leveling coat, argamasa), flat and even but unpainted, with a slightly matte, mineral grey texture and very subtle trowel marks. Same output size.
```

### 10 — `10-fachada-ladrillo.jpeg` (mismo chat, adjuntar otra vez la 08)
```
Edit the attached painted wall image. Keep absolutely identical: camera, framing, perspective, wall edges, parapet, sky, mountains and light. Only change the wall surface: it is now raw exposed red clay brick (typical Medellín brick) with grey mortar joints, before any render was applied, slightly irregular but clean. Same output size.
```

### 10b — `10b-rodillo.png` (chat nuevo, sin adjuntos)
```
Product photo of a professional paint roller with a medium extension pole, photographed straight on from the front: the roller cylinder is horizontal at the top of the image and the pole goes straight down to the bottom edge. The roller cover is slightly wet with warm off-white paint. Realistic, sharp, soft studio light from the left. Isolated on a pure flat solid #00FF00 green background, no shadow on the background, no text, no logo, no hands. 1:1 square.
```
Después se le quita el fondo: en Mac, clic derecho sobre el archivo → **Acciones rápidas → Eliminar fondo**. Guardar como PNG.

---

## Escena G · Muros drywall (imágenes 18 y 19)

**Animación:** la cámara entra por la ventana del tercer nivel. Se ve la perfilería metálica de un muro nuevo; un barrido diagonal la cubre y queda el muro terminado y pintado.

### 18 — `18-drywall-despues.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it ONLY as the reference for style, light, color grading and materials. Do not reproduce the exterior.

IMAGE 18 — INTERIOR: a new partition wall that divides a living area from a home office, in one of the apartments. The wall is finished: perfectly flat, painted warm white, with a clean recessed opening (no door) on its right third that shows a glimpse of a warm-lit office with an oak desk behind.

FRAMING: frontal view, camera facing the new wall straight on at 1.5 m height. The wall fills about 75% of the frame. On the LEFT, part of the window wall with dark bronze frames; warm golden-hour light enters from the left. Light oak floor and flat white ceiling visible. No furniture in front of the wall, no artwork, no switches.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 19 — `19-drywall-antes.jpeg` (mismo chat, sobre la 18)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, window, floor, ceiling, light, the opening and the office seen behind. Only change the partition wall: it is now under construction, only the light-grey galvanized metal drywall frame is installed (vertical studs every 40 cm and horizontal tracks at floor and ceiling), with no gypsum boards yet, so the room behind is visible through the studs. Clean, orderly, no tools, no workers. Same output size.
```

---

## Escena E · Muros decorativos, lobby (imágenes 13 y 14)

**Animación:** la cámara entra al lobby. Se ve un muro liso y apagado; un barrido diagonal lo transforma en microcemento y las luces de piso se encienden, revelando la textura.

### 13 — `13-decorativos-despues.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it as the reference for style, light, color and materials. The double-height lobby with the textured feature wall seen at the ground floor is the subject of this image.

IMAGE 13 — INTERIOR: the double-height lobby of the building. The main feature wall is finished in warm grey micro-cement / Venetian plaster with a soft, cloudy, hand-troweled texture, washed from below by warm in-floor uplights.

FRAMING: frontal view of the feature wall, camera at 1.5 m height. The wall fills about 70% of the frame and its full height is visible. On the LEFT, the tall glass facade with dark bronze frames and the solid oak entrance door, with warm golden-hour light entering. Light stone floor. On the right edge, the first steps of a minimal staircase. A large plant in a ceramic pot. No reception desk, no signs, no letters on the wall.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 14 — `14-decorativos-antes.jpeg` (mismo chat, sobre la 13)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, glass facade, door, floor, staircase, plant and daylight. Only change the feature wall: it is now a plain smooth wall in flat light grey primer, with no texture at all, and the in-floor uplights are switched off. Same output size.
```

---

## Escena D · Enchape, baño (imágenes 11 y 12)

**Animación:** la cámara entra por la ventana esmerilada del baño. Se ve el baño en mortero; las piezas de porcelanato aparecen una a una siguiendo la cuadrícula hasta completar el baño.

### 11 — `11-enchape-despues.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it ONLY as the reference for style, light, color grading and materials. Do not reproduce the exterior.

IMAGE 11 — INTERIOR: a finished high-end bathroom in one of the apartments. The back wall and the floor are covered with large-format porcelain tiles (60 x 120 cm on the wall, vertical, warm light-beige stone look) with very thin, perfectly aligned joints forming a clean regular grid.

FRAMING: frontal view, camera facing the back wall straight on at 1.4 m height, one-point perspective, so the tile grid on the wall is perfectly horizontal and vertical. The tiled back wall fills about 70% of the frame. A floating oak vanity with a white stone sink and a round mirror without frame, a walk-in shower with clear glass on the right. On the LEFT, a frosted window lets in soft warm light. Recessed warm light at the ceiling. No towels with patterns, no bottles with labels, no text.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 12 — `12-enchape-antes.jpeg` (mismo chat, sobre la 11)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, window, ceiling light and room size. Change only the finishes: the back wall and the floor are now bare grey cement mortar render, flat and ready to be tiled; remove the vanity, the sink, the mirror and the shower glass, leaving only capped plumbing pipes at the wall. Clean, no tools, no workers, no debris. Same output size.
```

---

## Escena I · Carpintería arquitectónica, hall del penthouse (imágenes 22 y 23)

**Animación:** la cámara entra al penthouse. Se ve un muro liso con un vano; las tablillas de roble se instalan una a una de izquierda a derecha y al final aparece la puerta pivotante.

### 22 — `22-carpinteria-despues.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it as the reference for style, light, color and materials. The penthouse with warm oak wall paneling and a tall oak door, seen at the top floor, is the subject of this image.

IMAGE 22 — INTERIOR: the entrance hall of the penthouse. The main wall is fully clad in natural oak vertical slat paneling (slats about 4 cm wide with 1 cm gaps, floor to ceiling), with a tall flush oak pivot door integrated into the paneling, almost invisible.

FRAMING: frontal view, camera facing the paneled wall straight on at 1.5 m height. The wall fills about 75% of the frame, full height visible. On the LEFT, part of a glass door to the terrace with plants and warm golden-hour light entering. Light stone floor, flat white ceiling with a warm linear light along the paneling. A small oak bench. No handles with logos, no text.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 23 — `23-carpinteria-antes.jpeg` (mismo chat, sobre la 22)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, terrace door, floor, ceiling, light and bench. Only change the wall: remove all the oak paneling and the door, the wall is now a plain smooth warm-white plastered wall with an empty rectangular door opening (same position and size as the door) showing a softly lit corridor behind. Same output size.
```

---

## Escena F · Cielo raso (imágenes 15, 16 y 17)

**Animación:** la cámara entra por la ventana con luz indirecta. Se ve la losa de concreto con tuberías; un barrido de arriba abajo la cubre con el cielo en drywall (luz apagada) y después la luz indirecta se enciende desde la cornisa.

### 15 — `15-cielo-encendido.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it as the reference for style, light, color and materials. The room with a white ceiling and a glowing indirect light cove, seen on an upper floor, is the subject of this image.

IMAGE 15 — INTERIOR: a living room whose star is the ceiling: a flat white drywall ceiling with a perimeter recessed cove that glows with warm indirect LED light, and a central lowered drywall panel with a few recessed downlights.

FRAMING: camera at 1.3 m height, looking straight towards the back wall with a slight upward tilt corrected so verticals stay vertical; the ceiling occupies the upper 50% of the frame. On the LEFT, the window wall with dark bronze frames; dusk light outside, slightly darker than in other images so the indirect light is clearly visible. Few low furniture pieces (a low sofa, a rug). Warm off-white walls.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 16 — `16-cielo-apagado.jpeg` (mismo chat, sobre la 15)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, ceiling shapes, walls, window, furniture and outside light. Only switch off all the artificial lights: the cove LED and the downlights are off, the room is lit only by the dusk light from the window. Same output size.
```

### 17 — `17-cielo-losa.jpeg` (mismo chat, adjuntar otra vez la 15)
```
Edit the attached image. Keep absolutely identical: camera, framing, perspective, walls, window, furniture and outside light. Only change the ceiling: remove the drywall ceiling and the cove completely; we now see the raw grey concrete slab above with exposed electrical conduits and a few pipes, neatly installed, before the ceiling is built. All artificial lights off. Same output size.
```

---

## Escena A · Remodelación integral (imágenes 02, 03 y 04)

**Animación:** la cámara entra por la ventana de la sala con biblioteca. Se ve la sala en obra gris; un barrido la lleva a obra blanca y otro la deja terminada, con muebles y luz cálida.

### 02 — `02-integral-terminado.jpeg`
El prompt está arriba, en la sección "Imagen 02".

### 03 — `03-integral-obra-blanca.jpeg` (mismo chat, sobre la 02)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective, room shape, window, bookshelf wall position, ceiling and daylight. Change the stage of the work: the room is now in "obra blanca" — walls and ceiling plastered and painted white, porcelain floor installed, but the room is empty: no furniture, no bookshelves (only the empty wall where they will go), no artwork, no plants, no lamps, downlights not installed (only holes). Clean, no tools, no workers. Same output size.
```

### 04 — `04-integral-obra-gris.jpeg` (mismo chat, adjuntar otra vez la 02)
```
Edit the attached finished room image. Keep absolutely identical: camera, framing, perspective, room shape, window frames and daylight. Change the stage of the work: the room is now in "obra gris" — walls in exposed red brick and grey mortar, raw grey concrete ceiling slab with exposed conduits, raw cement floor screed, empty room. No furniture, no finishes. Clean, no tools, no workers, no debris. Same output size.
```

---

## Escena B · Diseño (imágenes 05, 06 y 07)

**Animación:** la cámara entra al estudio con la maqueta. Se ve el espacio dibujado en líneas, como un plano; un barrido lo convierte en volumen blanco (maqueta) y otro en el espacio real terminado.

### 05 — `05-diseno-real.jpeg`
Adjuntar: `hero-arkava-finished-v2.jpeg`.
```
STYLE BIBLE — keep identical across every image of this series:
- Photorealistic architectural photography, as if shot by a professional architecture photographer for a premium design magazine. Not a 3D render, not illustration, not CGI look.
- Location: Medellín, Colombia (El Poblado area). Tropical Andean city: lush green vegetation, guayacán and palm trees, green mountains of the Aburrá Valley.
- Light: late golden hour, around 5:45 pm. Warm, low sunlight coming from the left side of the frame. Soft long shadows. Sky clear with a few soft clouds, warm peach to pale blue gradient.
- Materials palette: warm terracotta exposed brick (typical of Medellín), light board-formed concrete, dark bronze aluminum window frames, natural oak wood, warm off-white plaster, deep green plants.
- Color grading: natural, elegant, slightly warm, muted. No oversaturation, no HDR halo, no teal-orange filter.
- Camera: full-frame camera, 24 mm tilt-shift lens, all vertical lines perfectly vertical (no converging verticals), sharp focus everywhere, high detail.
- Aspect ratio: 16:9 landscape, horizontal, same output size as the attached reference image.
- STRICTLY FORBIDDEN: people, faces, hands, animals, cars in the foreground, any text, letters, numbers, signs, logos, brand names, watermarks, banners, graffiti, construction workers, floating tools, distorted or melted geometry, warped windows, impossible perspective.

The attached image is the exterior of the building. Use it ONLY as the reference for style, light, color grading and materials. Do not reproduce the exterior.

IMAGE 05 — INTERIOR: a finished open kitchen and dining space designed by an architecture and interior design studio: a long island in light stone, natural oak cabinetry, a dining table with six chairs, a sculptural pendant lamp, warm off-white walls, light oak floor.

FRAMING: camera at 1.5 m height, two-point perspective with very clear, simple geometry (clean lines, big planes), because this same view will later be shown as a line drawing and as a white clay model. On the LEFT, the window wall with dark bronze frames and warm golden-hour light. Few objects, nothing small or cluttered.

OUTPUT: 16:9 landscape, same size as the reference, photorealistic, extremely detailed, sharp.
```

### 06 — `06-diseno-volumen.jpeg` (mismo chat, sobre la 05)
```
Edit the last image. Keep absolutely identical: camera, framing, perspective and every shape and object position. Change only the rendering style: the whole scene becomes a white matte clay architectural model render — all surfaces, furniture and objects in uniform white clay material, no colors, no textures, soft ambient light with gentle shadows, the window shows only soft white light. Same output size.
```

### 07 — `07-diseno-plano.jpeg` (mismo chat, adjuntar otra vez la 05)
```
Edit the attached image. Keep absolutely identical: camera, framing, perspective and every shape and object position. Change only the rendering style: the whole scene becomes an architectural perspective line drawing — thin precise dark grey lines on a warm off-white paper background, like a hand-finished architect's sketch, no shading, no colors, no text, no dimensions, no title block. Same output size.
```
