import { gsap } from 'gsap';
import { bands, gridCells, insetClip, polygonClip, trowelMask, trowelStrokes, type Rect } from './geometry';
import { SCENES } from './scenes';

// Cada escena registra cómo se anima y cómo vuelve a su estado inicial. El
// reset corre al montar la capa y al cerrarla, así abrirla de nuevo repite la
// animación desde el "antes".
export type Effect = {
  run: (layer: HTMLElement, motion: boolean) => gsap.core.Timeline;
  reset: (layer: HTMLElement) => void;
};

const step = (layer: HTMLElement, i: number) =>
  layer.querySelector<HTMLElement>(`[data-svh-step="${i}"]`)!;
const steps = (layer: HTMLElement) => [...layer.querySelectorAll<HTMLElement>('[data-svh-step]')];
const scene = (layer: HTMLElement) => SCENES[layer.dataset.scene ?? ''] ?? {};

// Piezas: copias de una etapa recortadas a un rectángulo. Así una placa, una
// pieza de enchape o un piso aparecen solos sobre el "antes". Van justo
// después de su etapa, debajo de las siguientes (en enchape el baño con
// muebles tiene que quedar encima de las piezas).
function pieces(layer: HTMLElement, from: number, rects: Rect[]) {
  const src = step(layer, from);
  const next = src.nextSibling;
  return rects.map((r) => {
    const el = src.cloneNode(true) as HTMLElement;
    el.removeAttribute('data-svh-step');
    el.classList.add('svh-piece');
    el.style.clipPath = insetClip(r);
    el.style.opacity = '0';
    layer.insertBefore(el, next);
    return el;
  });
}
const clearPieces = (layer: HTMLElement) => layer.querySelectorAll('.svh-piece').forEach((el) => el.remove());

// Sin movimiento: las etapas aparecen con fundidos, sin máscaras
function fades(layer: HTMLElement) {
  const tl = gsap.timeline();
  steps(layer)
    .slice(1)
    .forEach((el, i) => {
      el.style.webkitMaskImage = el.style.maskImage = 'none';
      tl.to(el, { opacity: 1, duration: 0.5 }, i ? '+=0.5' : 0);
    });
  return tl;
}

// Cielo raso: sobre la losa (0) las placas con cinta y masilla (1) bajan de
// arriba abajo solo en el techo; luego el cielo se pinta (2) y al final la
// luz indirecta (3) se enciende desde la cornisa y se extiende por el espacio.
const ceiling: Effect = {
  run(layer, motion) {
    const boardsEl = step(layer, 1);
    const painted = step(layer, 2);
    const lit = step(layer, 3);
    const tl = gsap.timeline();
    if (!motion) {
      tl.set(boardsEl, { '--svh-p': '112%' });
      tl.to(boardsEl, { opacity: 1, duration: 0.5 });
      tl.to(painted, { opacity: 1, duration: 0.5 }, '+=0.4');
      return tl.to(lit, { opacity: 1, '--svh-r': '200%', duration: 0.6 }, '+=0.4');
    }
    tl.set(boardsEl, { opacity: 1 });
    tl.to(boardsEl, { '--svh-p': '112%', duration: 1.8, ease: 'power2.inOut' });
    tl.to(painted, { opacity: 1, duration: 1, ease: 'power1.inOut' }, '+=0.45');
    tl.set(lit, { opacity: 1 }, '+=0.35');
    tl.to(lit, { '--svh-r': '190%', duration: 1.9, ease: 'power2.inOut' });
    return tl;
  },
  reset(layer) {
    const boardsEl = step(layer, 1);
    const painted = step(layer, 2);
    const lit = step(layer, 3);
    const geo = scene(layer);
    if (geo.poly) boardsEl.style.clipPath = painted.style.clipPath = polygonClip(geo.poly);
    if (geo.light) {
      lit.style.setProperty('--svh-lx', `${geo.light[0]}%`);
      lit.style.setProperty('--svh-ly', `${geo.light[1]}%`);
    }
    boardsEl.classList.add('svh-mask-down');
    lit.classList.add('svh-mask-light');
    gsap.set(boardsEl, { opacity: 0, '--svh-p': '-12%' });
    gsap.set(painted, { opacity: 0 });
    gsap.set(lit, { opacity: 0, '--svh-r': '0%' });
  },
};

// Etapas: cada etapa barre en diagonal sobre la anterior, con una pausa para
// leer cada momento (obra gris → obra blanca → terminado; plano → maqueta → real).
const stages: Effect = {
  run(layer, motion) {
    if (!motion) return fades(layer);
    const tl = gsap.timeline();
    steps(layer)
      .slice(1)
      .forEach((el, i) => {
        tl.set(el, { opacity: 1 }, i ? '+=0.45' : 0);
        tl.to(el, { '--svh-p': '130%', duration: 1.7, ease: 'power2.inOut' });
      });
    return tl;
  },
  reset(layer) {
    const geo = scene(layer);
    steps(layer)
      .slice(1)
      .forEach((el) => {
        if (geo.poly) el.style.clipPath = polygonClip(geo.poly);
        el.classList.add('svh-mask-wipe');
        el.style.removeProperty('mask-image');
        el.style.removeProperty('-webkit-mask-image');
        gsap.set(el, { opacity: 0, '--svh-p': '-20%' });
      });
  },
};

// Argamasa: el revoque se aplica por pasadas horizontales de abajo arriba,
// como con la regla; cada pasada avanza de izquierda a derecha con borde
// irregular, entra más oscura (húmeda) y se aclara al fraguar.
const PASSES = 6;
const wipeUp: Effect = {
  run(layer, motion) {
    const wall = scene(layer).area!;
    const h = (wall.y1 - wall.y0) / PASSES;
    const rows = Array.from({ length: PASSES }, (_, i) => ({ x0: wall.x0, x1: wall.x1, y1: wall.y1 - i * h, y0: wall.y1 - (i + 1) * h }));
    const els = pieces(layer, 1, rows);
    const tl = gsap.timeline();
    if (!motion) return tl.to(els, { opacity: 1, duration: 0.6 });
    els.forEach((el, i) => {
      const r = rows[i];
      const st = { p: 0 };
      // Borde de avance vertical e irregular, del alto de la pasada
      const render = () => {
        const x = r.x0 + st.p * (r.x1 - r.x0 + 4);
        const jag = [0, 0.6, -0.5, 0.8, -0.3, 0];
        const edge = jag.map((o, k): [number, number] => [Math.min(x + o, r.x1), r.y0 + ((r.y1 - r.y0) * k) / (jag.length - 1)]);
        el.style.clipPath = polygonClip([[r.x0, r.y0], ...edge, [r.x0, r.y1]]);
      };
      render();
      const at = i * 0.5;
      tl.set(el, { opacity: 1, filter: 'brightness(0.86) saturate(0.9)' }, at);
      tl.to(st, { p: 1, duration: 0.65, ease: 'power1.inOut', onUpdate: render }, at);
      tl.to(el, { filter: 'brightness(1) saturate(1)', duration: 1.4, ease: 'power1.out' }, at + 0.55);
    });
    return tl;
  },
  reset: clearPieces,
};

// Pintura con rodillo: el rodillo recorre el muro en franjas verticales del
// ancho de su felpa, bajando y subiendo, de derecha a izquierda (la tarjeta
// tapa la izquierda, así esa parte se pinta al final). Cada franja queda un
// momento más brillante, como pintura húmeda, y se asienta al secar.
const STRIPS = 8;
const EMPTY_CLIP = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)';
// Centro de la felpa dentro de la imagen del rodillo (10c-rodillo.png)
const ROLLER_ANCHOR = { x: -49.4, y: -10.8 };
// Borde de avance irregular, como deja la felpa (offsets en % de alto)
const EDGE = [0, 0.7, -0.4, 0.9, -0.2, 0.5, 0];

const roller: Effect = {
  run(layer, motion) {
    const paint = step(layer, 1);
    const tool = layer.querySelector<HTMLElement>('[data-svh-roller]')!;
    const wall = scene(layer).area!;
    const tl = gsap.timeline();
    if (!motion) {
      paint.style.clipPath = insetClip(wall);
      return tl.to(paint, { opacity: 1, duration: 0.6 });
    }

    const w = (wall.x1 - wall.x0) / STRIPS;
    const strip = (i: number) => ({ x0: wall.x1 - (i + 1) * w, x1: wall.x1 - i * w });
    const wet = pieces(layer, 1, Array.from({ length: STRIPS }, (_, i) => ({ ...strip(i), y0: wall.y0, y1: wall.y1 })));
    wet.forEach((el) => {
      el.style.filter = 'brightness(1.07) saturate(1.12) contrast(1.04)';
    });

    const st = { i: 0, p: 0, shift: 0 };
    const yAt = (down: boolean, p: number) => (down ? wall.y0 + p * (wall.y1 - wall.y0) : wall.y1 - p * (wall.y1 - wall.y0));
    // Borde de avance de la franja i, de derecha a izquierda, irregular
    const edge = (i: number, p: number): [number, number][] => {
      const { x0, x1 } = strip(i);
      const down = i % 2 === 0;
      const y = yAt(down, p);
      return EDGE.map((o, k) => [x1 - ((x1 - x0) * k) / (EDGE.length - 1), y + (down ? o : -o)]);
    };
    const render = () => {
      const { i, p } = st;
      const { x0, x1 } = strip(i);
      const down = i % 2 === 0;
      const e = edge(i, p);
      // Franjas ya pintadas completas + la franja actual hasta el rodillo
      const done: [number, number][] = [[x1, wall.y0], [wall.x1, wall.y0], [wall.x1, wall.y1], [x1, wall.y1]];
      paint.style.clipPath = polygonClip(
        down ? [...done, ...e, [x0, wall.y0]] : [...done, [x0, wall.y1], ...e.slice().reverse()],
      );
      wet[i].style.clipPath = polygonClip(down ? [[x1, wall.y0], ...e, [x0, wall.y0]] : [[x1, wall.y1], ...e, [x0, wall.y1]]);
      gsap.set(tool, {
        left: `${x1 - w / 2 - st.shift * w}%`,
        top: `${yAt(down, p)}%`,
        rotation: (down ? 2 : -2) + Math.sin(p * Math.PI * 5) * 1.2,
      });
    };

    gsap.set(paint, { opacity: 1 });
    gsap.set(tool, { xPercent: ROLLER_ANCHOR.x, yPercent: ROLLER_ANCHOR.y });
    render();
    tl.fromTo(tool, { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
    const PASS = 0.5;
    const MOVE = 0.14;
    let t = 0.5;
    for (let i = 0; i < STRIPS; i++) {
      tl.call(
        () => {
          st.i = i;
          st.p = 0;
          st.shift = 0;
          gsap.set(wet[i], { opacity: 1 });
          render();
        },
        undefined,
        t,
      );
      tl.to(st, { p: 1, duration: PASS, ease: 'sine.inOut', onUpdate: render }, t);
      // La franja húmeda se asienta mientras el rodillo sigue con la siguiente
      tl.to(wet[i], { opacity: 0, duration: 1.3, ease: 'power1.out' }, t + PASS);
      if (i < STRIPS - 1) tl.to(st, { shift: 1, duration: MOVE, ease: 'sine.inOut', onUpdate: render }, t + PASS);
      else tl.to(tool, { autoAlpha: 0, y: 120, duration: 0.5, ease: 'power2.in' }, t + PASS);
      t += PASS + MOVE;
    }
    tl.call(() => {
      paint.style.clipPath = insetClip(wall);
    });
    return tl;
  },
  reset(layer) {
    const paint = step(layer, 1);
    const tool = layer.querySelector<HTMLElement>('[data-svh-roller]');
    clearPieces(layer);
    paint.style.clipPath = EMPTY_CLIP;
    gsap.set(paint, { opacity: 0 });
    if (tool) gsap.set(tool, { autoAlpha: 0, clearProps: 'y' });
  },
};

// Enchape: sobre el mortero (0) se peina el pegante (1) de izquierda a
// derecha; luego las piezas aparecen una a una siguiendo las juntas reales
// (2), se completa el enchape del piso y el muro lateral, y al final aparece
// el baño con muebles (3).
const tiles: Effect = {
  run(layer, motion) {
    const geo = scene(layer);
    const glue = step(layer, 1);
    const tilesEls = pieces(layer, 2, gridCells(geo.xEdges!, geo.yEdges!, 'cols'));
    const tl = gsap.timeline();
    if (!motion) {
      tl.set(glue, { '--svh-p': '130%' });
      tl.to(glue, { opacity: 1, duration: 0.5 });
      tl.to(tilesEls, { opacity: 1, duration: 0.5 }, '+=0.4');
    } else {
      tl.set(glue, { opacity: 1 });
      tl.to(glue, { '--svh-p': '130%', duration: 1.4, ease: 'power1.inOut' });
      tl.fromTo(
        tilesEls,
        { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.32, ease: 'power2.out', stagger: 0.075 },
        '+=0.3',
      );
    }
    tl.to(step(layer, 2), { opacity: 1, duration: 0.6 }, motion ? '-=0.1' : '+=0.3');
    tl.to(step(layer, 3), { opacity: 1, duration: 1, ease: 'power1.inOut' }, '+=0.4');
    return tl;
  },
  reset(layer) {
    clearPieces(layer);
    const glue = step(layer, 1);
    glue.classList.add('svh-mask-wipe');
    gsap.set(glue, { opacity: 0, '--svh-p': '-20%' });
    gsap.set([step(layer, 2), step(layer, 3)], { opacity: 0 });
  },
};

// Llana: el acabado aparece en trazos curvos que se abren uno tras otro, como
// se aplica a mano. Al terminar se quita la máscara para que quede completo.
const STROKES = 14;
const trowel: Effect = {
  run(layer, motion) {
    const el = step(layer, 1);
    const geo = scene(layer);
    const strokes = trowelStrokes(geo.area!, STROKES, layer.dataset.scene === 'estuco' ? 5 : 11);
    const tl = gsap.timeline();
    const done = () => {
      el.style.webkitMaskImage = el.style.maskImage = 'none';
    };
    if (!motion) {
      done();
      return tl.to(el, { opacity: 1, duration: 0.6 });
    }
    tl.set(el, { opacity: 1 });
    strokes.forEach((s, i) => {
      tl.to(
        el,
        { [`--svh-rx${i}`]: `${s.rx}%`, [`--svh-ry${i}`]: `${s.ry}%`, duration: 0.6, ease: 'power2.out' },
        i * 0.2,
      );
    });
    tl.call(done);
    if (layer.dataset.scene === 'decorativos') {
      tl.fromTo(el, { filter: 'brightness(0.82)' }, { filter: 'brightness(1)', duration: 0.9 }, '-=0.2');
    }
    return tl;
  },
  reset(layer) {
    const el = step(layer, 1);
    const geo = scene(layer);
    const strokes = trowelStrokes(geo.area!, STROKES, layer.dataset.scene === 'estuco' ? 5 : 11);
    el.style.clipPath = insetClip(geo.area!);
    el.style.webkitMaskImage = el.style.maskImage = trowelMask(STROKES);
    strokes.forEach((s, i) => {
      el.style.setProperty(`--svh-cx${i}`, `${s.cx}%`);
      el.style.setProperty(`--svh-cy${i}`, `${s.cy}%`);
      el.style.setProperty(`--svh-rx${i}`, '0%');
      el.style.setProperty(`--svh-ry${i}`, '0%');
    });
    gsap.set(el, { opacity: 0, clearProps: 'filter' });
  },
};

// Drywall: sobre la estructura (0) se instalan las placas una a una, con
// cinta y masilla en las juntas (1); al final el muro se pinta (2), solo en
// la zona del muro.
const boards: Effect = {
  run(layer, motion) {
    const geo = scene(layer);
    const area = geo.area!;
    const rects = bands('x', geo.xEdges!, [area.y0, area.y1]);
    if (geo.header) rects.push(geo.header);
    const els = pieces(layer, 1, rects);
    const painted = step(layer, 2);
    painted.style.clipPath = insetClip(area);
    const tl = gsap.timeline();
    if (!motion) {
      tl.to(els, { opacity: 1, duration: 0.6 });
      return tl.to(painted, { opacity: 1, duration: 0.6 }, '+=0.5');
    }
    tl.fromTo(
      els,
      { opacity: 0, yPercent: 1.5 },
      { opacity: 1, yPercent: 0, duration: 0.5, ease: 'power2.out', stagger: 0.38 },
    );
    tl.to(painted, { opacity: 1, duration: 1.1, ease: 'power1.inOut' }, '+=0.55');
    return tl;
  },
  reset(layer) {
    clearPieces(layer);
    gsap.set(step(layer, 2), { opacity: 0 });
  },
};

// Carpintería: las tablillas se instalan por grupos de izquierda a derecha y
// al final la puerta pivotante gira desde su eje y queda en su lugar.
const panels: Effect = {
  run(layer, motion) {
    const geo = scene(layer);
    const area = geo.area!;
    const els = pieces(layer, 1, bands('x', geo.xEdges!, [area.y0, area.y1]));
    const [door] = pieces(layer, 1, [geo.door!]);
    const tl = gsap.timeline();
    if (!motion) return tl.to([...els, door], { opacity: 1, duration: 0.6 });
    tl.fromTo(
      els,
      { opacity: 0, yPercent: -1 },
      { opacity: 1, yPercent: 0, duration: 0.3, ease: 'power2.out', stagger: 0.075 },
    );
    tl.fromTo(
      door,
      { opacity: 0, scaleX: 0.12, transformOrigin: `${geo.door!.x0}% 50%` },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: 'back.out(1.4)' },
      '+=0.15',
    );
    return tl;
  },
  reset: clearPieces,
};

export const EFFECTS: Record<string, Effect> = {
  ceiling,
  stages,
  design: stages,
  wipeUp,
  roller,
  tiles,
  trowel,
  boards,
  panels,
};

export function resetLayer(layer: HTMLElement) {
  EFFECTS[layer.dataset.effect ?? '']?.reset(layer);
}
