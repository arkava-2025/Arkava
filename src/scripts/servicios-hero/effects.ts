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
// pieza de enchape o un piso aparecen solos sobre el "antes".
function pieces(layer: HTMLElement, from: number, rects: Rect[]) {
  const src = step(layer, from);
  return rects.map((r) => {
    const el = src.cloneNode(true) as HTMLElement;
    el.removeAttribute('data-svh-step');
    el.classList.add('svh-piece');
    el.style.clipPath = insetClip(r);
    el.style.opacity = '0';
    layer.appendChild(el);
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

// Cielo raso: sobre la losa (0) el cielo instalado y apagado (1) baja de
// arriba abajo solo en el techo; después la luz indirecta (2) se enciende
// desde la cornisa y se extiende por todo el espacio.
const ceiling: Effect = {
  run(layer, motion) {
    const installed = step(layer, 1);
    const lit = step(layer, 2);
    const tl = gsap.timeline();
    if (!motion) {
      tl.set(installed, { '--svh-p': '112%' });
      tl.to(installed, { opacity: 1, duration: 0.5 });
      return tl.to(lit, { opacity: 1, '--svh-r': '200%', duration: 0.6 }, '+=0.4');
    }
    tl.set(installed, { opacity: 1 });
    tl.to(installed, { '--svh-p': '112%', duration: 1.8, ease: 'power2.inOut' });
    tl.set(lit, { opacity: 1 }, '+=0.35');
    tl.to(lit, { '--svh-r': '190%', duration: 1.9, ease: 'power2.inOut' });
    return tl;
  },
  reset(layer) {
    const installed = step(layer, 1);
    const lit = step(layer, 2);
    const geo = scene(layer);
    if (geo.poly) installed.style.clipPath = polygonClip(geo.poly);
    if (geo.light) {
      lit.style.setProperty('--svh-lx', `${geo.light[0]}%`);
      lit.style.setProperty('--svh-ly', `${geo.light[1]}%`);
    }
    installed.classList.add('svh-mask-down');
    lit.classList.add('svh-mask-light');
    gsap.set(installed, { opacity: 0, '--svh-p': '-12%' });
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

// Argamasa: el revoque sube sobre el ladrillo, de abajo arriba, solo en el muro
const wipeUp: Effect = {
  run(layer, motion) {
    if (!motion) return fades(layer);
    const el = step(layer, 1);
    return gsap
      .timeline()
      .set(el, { opacity: 1 })
      .to(el, { '--svh-p': '118%', duration: 2.2, ease: 'power2.inOut' });
  },
  reset(layer) {
    const el = step(layer, 1);
    const geo = scene(layer);
    if (geo.area) el.style.clipPath = insetClip(geo.area);
    el.classList.add('svh-mask-up');
    el.style.removeProperty('mask-image');
    el.style.removeProperty('-webkit-mask-image');
    gsap.set(el, { opacity: 0, '--svh-p': '-18%' });
  },
};

// Pintura de fachada: la pintura baja piso por piso, de arriba abajo, como
// el andamio colgante. El borde fresco brilla un poco y se asienta.
const floors: Effect = {
  run(layer, motion) {
    const geo = scene(layer);
    const area = geo.area!;
    const floorsEls = pieces(layer, 1, bands('y', geo.yEdges!, [area.x0, area.x1]));
    const tl = gsap.timeline();
    if (!motion) return tl.to(floorsEls, { opacity: 1, duration: 0.6 });
    floorsEls.forEach((el, i) => {
      el.classList.add('svh-mask-down');
      gsap.set(el, { '--svh-p': '-10%', filter: 'brightness(1.08)' });
      const at = i * 0.42;
      tl.set(el, { opacity: 1 }, at);
      tl.to(el, { '--svh-p': '112%', duration: 0.6, ease: 'power1.inOut' }, at);
      tl.to(el, { filter: 'brightness(1)', duration: 0.7, ease: 'power1.out' }, at + 0.45);
    });
    return tl;
  },
  reset: clearPieces,
};

// Enchape: las piezas aparecen una a una siguiendo las juntas reales, luego
// el resto del baño enchapado (piso y muro lateral) y al final los muebles.
const tiles: Effect = {
  run(layer, motion) {
    const geo = scene(layer);
    const tilesEls = pieces(layer, 1, gridCells(geo.xEdges!, geo.yEdges!, 'cols'));
    const tl = gsap.timeline();
    if (!motion) {
      tl.to(tilesEls, { opacity: 1, duration: 0.5 });
    } else {
      tl.fromTo(
        tilesEls,
        { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, duration: 0.32, ease: 'power2.out', stagger: 0.075 },
      );
    }
    tl.to(step(layer, 1), { opacity: 1, duration: 0.6 }, motion ? '-=0.1' : '+=0.3');
    tl.to(step(layer, 2), { opacity: 1, duration: 0.8 }, '+=0.3');
    return tl;
  },
  reset(layer) {
    clearPieces(layer);
    gsap.set([step(layer, 1), step(layer, 2)], { opacity: 0 });
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

// Drywall: las placas se instalan una a una de izquierda a derecha, en
// franjas del ancho de una placa, y al final el refuerzo sobre el vano.
const boards: Effect = {
  run(layer, motion) {
    const geo = scene(layer);
    const area = geo.area!;
    const rects = bands('x', geo.xEdges!, [area.y0, area.y1]);
    if (geo.header) rects.push(geo.header);
    const els = pieces(layer, 1, rects);
    const tl = gsap.timeline();
    if (!motion) return tl.to(els, { opacity: 1, duration: 0.6 });
    tl.fromTo(
      els,
      { opacity: 0, yPercent: 1.2 },
      { opacity: 1, yPercent: 0, duration: 0.34, ease: 'power2.out', stagger: 0.17 },
    );
    return tl;
  },
  reset: clearPieces,
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
  floors,
  tiles,
  trowel,
  boards,
  panels,
};

export function resetLayer(layer: HTMLElement) {
  EFFECTS[layer.dataset.effect ?? '']?.reset(layer);
}
