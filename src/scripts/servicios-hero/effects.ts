import { gsap } from 'gsap';

// Cada escena registra cómo se anima y cómo vuelve a su estado inicial. El
// reset corre al montar la capa y al cerrarla, así abrirla de nuevo repite la
// animación desde el "antes".
export type Effect = {
  run: (layer: HTMLElement, motion: boolean) => gsap.core.Timeline;
  reset: (layer: HTMLElement) => void;
};

export const EFFECTS: Record<string, Effect> = {};

export function resetLayer(layer: HTMLElement) {
  EFFECTS[layer.dataset.effect ?? '']?.reset(layer);
}
