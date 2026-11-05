# Imágenes disponibles para las landings de servicios

**Creado:** 2026-11-04
**Para qué:** inventario de imágenes para construir las landings internas de cada servicio (Pilar B del plan 2027).

## 1. Fotos de servicios en Hygraph (estaban en `/servicios` antes del rediseño)

Son las que mostraba `ServiciosRenderer` en `/servicios`. **Siguen publicadas** en Hygraph y se ven en cada landing actual (`src/pages/servicios/*.astro`). Al rediseñar `/servicios` solo dejaron de mostrarse en el hub; no se borró nada.

Antes de usarlas en una landing nueva:
- Confirmar con Arkava que son de obras propias (si son reales, son la mejor prueba de experiencia: E-E-A-T).
- Descargarlas en resolución original y revisar tamaño y calidad.
- Reescribir el `alt` con descripción concreta (espacio, material, zona). Los `alt` actuales son genéricos.

| Servicio | URL de la imagen | Alt actual |
|---|---|---|
| Argamasa | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi9de1c00c5s06pe97knt0rn | Aplicación de Argamasa en muros - Arkava Medellín |
| Argamasa | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi41ppzm3t8d07pczxk37nl0 | Argamasa y revoque - acabado arquitectónico Arkava |
| Estuco | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi41wacv3t4c07pjpuxrjmov | Aplicación de Estuco en interiores - Arkava Medellín |
| Estuco | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi41wacp3t4707pjmslocuya | Detalle de Estuco en pared - acabado premium Arkava |
| Pintura | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi42nymt3tpp07pjym6wwphk | Servicio de Pintura - trabajo ejecutado por Arkava en Medellín |
| Pintura | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi42o9v43u3007pc11bkt9i1 | Detalle de Pintura profesional - Arkava Medellín |
| Pintura | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi42o9v63tqp07pj5k1arhz4 | Acabado de Pintura de alta calidad - proyecto Arkava |
| Enchape | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi42u70o3u8b07pcocrdjgqn | Detalle de Enchape en piso - Arkava Medellín |
| Enchape | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi42u71m3tv807pjcy91kgt3 | Servicio de Enchape profesional - proyecto Arkava |
| Cielo raso | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi432aru3ufe07pca3vcg9gp | Instalación de Cielo Raso en madera - Arkava Medellín |
| Cielo raso | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi432arl3u1p07pj6gwzudxy | Cielo Raso terminado - proyecto residencial Arkava |
| Cielo raso | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi432arm3uf907pchal61lr5 | Detalle de Cielo Raso con drywall - acabado Arkava |
| Muros drywall | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi9dljfe0cc906peezjvuvyc | Instalación de Muros - Arkava Medellín |
| Muros drywall | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi9dq4af0cf807piy2vh3sgt | Muros terminado - proyecto ejecutado por Arkava |
| Muros drywall | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43apma3up707pc0p5524a5 | Estructura de Muros en Superboard - Arkava |
| Muros decorativos | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43gg143uwq07pcnaqgqpgj | Muros Decorativos - microcemento y venecianos Arkava Medellín |
| Muros decorativos | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43gg0x3uwj07pcop82rtt1 | Acabado de Muros Decorativos artesanal - proyecto Arkava |
| Muros decorativos | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43gg113uia07pjvyyjwtmq | Muros Decorativos con porcelanato líquido - Arkava |
| Muros decorativos | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43gg163uif07pj6hxte28w | Muros Decorativos imitación mármol - acabado premium Arkava Medellín |
| Carpintería | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43nowq3us307pjiuclbneh | Servicio de Carpinteria a medida - Arkava Medellín |
| Carpintería | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43nov03v5r07pc6f4u9cp0 | Carpinteria en madera - proyecto ejecutado por Arkava |
| Carpintería | https://ap-south-1.graphassets.com/cmfmk8v4y0lwm07o84vsb7id6/cmi43nov63v5w07pcu7hs5w53 | Detalle de Carpinteria arquitectónica - Arkava |

## 2. Imágenes del hero (generadas con IA)

En `src/assets/servicios-hero/` (originales en `~/Downloads/hero-servicios-arkava/`). Sirven en las landings como ilustración del **proceso** (antes/después, etapas), pero **no se presentan como proyectos reales de Arkava**.

| Servicio | Archivos (en orden de obra) |
|---|---|
| Remodelación integral | 04-integral-obra-gris → 03-integral-obra-blanca → 02-integral-terminado |
| Diseño | 07-diseno-plano → 06-diseno-volumen → 05-diseno-real |
| Pintura | 09c-fachada-cerca-argamasa → 08c-fachada-cerca-pintada (+ 10c-rodillo.png) |
| Argamasa | 10-fachada-ladrillo → 09-fachada-argamasa → 08-fachada-pintada |
| Enchape | 12-enchape-antes → 12b-enchape-pegante → 11b-enchape-sin-muebles → 11-enchape-despues |
| Muros decorativos | 14-decorativos-antes → 13-decorativos-despues |
| Cielo raso | 17-cielo-losa → 16b-cielo-placas → 16-cielo-apagado → 15-cielo-encendido |
| Muros drywall | 19-drywall-antes → 18b-drywall-placas → 18-drywall-despues |
| Estuco | 21-estuco-antes → 20-estuco-despues |
| Carpintería | 23-carpinteria-antes → 22-carpinteria-despues |

Idea para las landings: un bloque "Así lo hacemos" con la secuencia de cada servicio (o un deslizador antes/después), y las fotos reales de Hygraph en la galería de proyectos.
