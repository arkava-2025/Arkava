import { gsap } from 'gsap';
import { polygonClip } from './geometry';
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
const scene = (layer: HTMLElement) => SCENES[layer.dataset.scene ?? ''] ?? {};

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

export const EFFECTS: Record<string, Effect> = { ceiling };

export function resetLayer(layer: HTMLElement) {
  EFFECTS[layer.dataset.effect ?? '']?.reset(layer);
}
