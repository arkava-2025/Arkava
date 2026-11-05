import { gsap } from 'gsap';
import { EFFECTS, resetLayer } from './effects';

// Acercamiento continuo: el edificio avanza hacia el punto y, mientras sigue
// avanzando, la escena del servicio aparece desde ese mismo punto. Las dos
// capas se mueven en la misma dirección, así se lee como entrar por la ventana.
const PUSH = { scale: 2.6, duration: 1.5, fadeAt: 0.55, fadeDuration: 0.95, fromScale: 0.42 };

type Mounted = { layer: HTMLElement; ready: Promise<void> };

export function initServiciosHero(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-svh-stage]');
  const canvas = root.querySelector<HTMLElement>('[data-svh-canvas]');
  if (!stage || !canvas) return;

  const spots = [...root.querySelectorAll<HTMLButtonElement>('[data-svh-spot]')];
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-svh-tab]')];
  const back = root.querySelector<HTMLButtonElement>('[data-svh-close]');
  const hint = root.querySelector<HTMLElement>('[data-svh-hint]');
  const chrome = [...root.querySelectorAll<HTMLElement>('[data-svh-intro], [data-svh-veil]')];
  const cards = new Map(
    [...root.querySelectorAll<HTMLElement>('[data-svh-card]')].map((c) => [c.dataset.svhCard!, c]),
  );
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 768px)');
  const mounted = new Map<string, Mounted>();

  // El escenario se ajusta a la pantalla debajo del menú fijo
  const header = document.querySelector<HTMLElement>('#header, body > header');
  const setHeader = () => {
    if (header) root.style.setProperty('--svh-header', `${header.offsetHeight}px`);
  };
  setHeader();
  window.addEventListener('resize', setHeader, { passive: true });

  let active: string | null = null;
  let trigger: HTMLElement | null = null;
  let effect: gsap.core.Timeline | null = null;
  let queue: Promise<void> = Promise.resolve();

  const run = (fn: () => Promise<void>) => {
    queue = queue.then(fn).catch(() => {});
  };

  function mount(id: string): Mounted | null {
    const existing = mounted.get(id);
    if (existing) return existing;
    const tpl = root.querySelector<HTMLTemplateElement>(`template[data-svh-tpl="${id}"]`);
    const source = tpl?.content.firstElementChild;
    if (!source) return null;

    const layer = source.cloneNode(true) as HTMLElement;
    stage!.insertBefore(layer, back);
    resetLayer(layer);
    const imgs = [...layer.querySelectorAll('img')];
    const ready = Promise.all(imgs.map((img) => img.decode().catch(() => {}))).then(() => {});
    const m = { layer, ready };
    mounted.set(id, m);
    return m;
  }

  function setState(id: string | null) {
    spots.forEach((s) => s.setAttribute('aria-expanded', String(s.dataset.svhSpot === id)));
    tabs.forEach((t) => {
      if (t.dataset.svhTab === id) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
    });
  }

  function dismissHint() {
    if (hint && !hint.hidden) gsap.to(hint, { autoAlpha: 0, duration: 0.3, onComplete: () => (hint.hidden = true) });
  }

  async function open(id: string) {
    if (active === id) return;
    if (active) await close(false, true);

    const spot = spots.find((s) => s.dataset.svhSpot === id);
    const card = cards.get(id);
    if (!spot || !card) return;

    active = id;
    setState(id);
    dismissHint();
    const motion = !reduce.matches;
    const m = mount(id);
    const origin = `${spot.dataset.x}% ${spot.dataset.y}%`;
    const blur = desktop.matches ? 6 : 4;

    tabs.find((t) => t.dataset.svhTab === id)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: motion ? 'smooth' : 'auto' });

    const box = stage!.getBoundingClientRect();
    if (box.top < -1 || box.bottom > window.innerHeight + 1) {
      stage!.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'start' });
    }

    // Con el hover la escena ya se precargó; si no, se espera antes de mover la cámara
    if (m) await m.ready;
    if (active !== id) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    tl.to(spots, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, 0);
    tl.to(chrome, { autoAlpha: 0, duration: 0.45, ease: 'power1.out' }, 0);

    if (motion) {
      tl.to(
        canvas,
        {
          scale: m ? PUSH.scale : 1.6,
          transformOrigin: origin,
          filter: m ? `blur(${blur}px)` : 'blur(0px)',
          duration: PUSH.duration,
        },
        0,
      );
      if (m) {
        tl.fromTo(
          m.layer,
          { autoAlpha: 0, scale: PUSH.fromScale, transformOrigin: origin, filter: `blur(${blur + 2}px)` },
          { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: PUSH.fadeDuration, ease: 'power2.out' },
          PUSH.fadeAt,
        );
      }
    } else if (m) {
      tl.fromTo(m.layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0);
    }

    const ui = tl.duration() - 0.35;
    if (back) tl.fromTo(back, { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' }, ui);
    card.hidden = false;
    tl.fromTo(card, { autoAlpha: 0, y: motion ? 18 : 0 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, ui);

    const fx = m ? EFFECTS[m.layer.dataset.effect ?? ''] : undefined;
    if (fx && m) {
      effect = fx.run(m.layer, motion).pause();
      // Arranca cuando la escena ya casi terminó de aparecer: el movimiento
      // empalma con el acercamiento.
      tl.call(() => effect?.play(), undefined, motion ? Math.max(0, ui - 0.2) : '+=0.1');
    }

    await tl.then();
    if (active === id) back?.focus({ preventScroll: true });
    if (!desktop.matches && active === id) card.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'nearest' });
  }

  async function close(restoreFocus = true, switching = false) {
    if (!active) return;
    const id = active;
    active = null;
    setState(null);
    effect?.kill();
    effect = null;

    const card = cards.get(id)!;
    const m = mounted.get(id);
    const motion = !reduce.matches;

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    tl.to(card, { autoAlpha: 0, y: motion ? 12 : 0, duration: 0.3, ease: 'power1.in' }, 0);
    if (back) tl.to(back, { autoAlpha: 0, duration: 0.25 }, 0);

    // Al volver, la escena se aleja hacia su ventana y el edificio retrocede
    // detrás: el mismo movimiento de entrada, al revés.
    if (m) {
      tl.to(
        m.layer,
        {
          autoAlpha: 0,
          scale: motion ? PUSH.fromScale : 1,
          filter: motion ? 'blur(8px)' : 'blur(0px)',
          duration: motion ? 0.9 : 0.3,
        },
        0.1,
      );
    }
    tl.to(canvas, { scale: 1, filter: 'blur(0px)', duration: motion ? 1.3 : 0 }, 0.1);
    if (!switching) {
      tl.to(chrome, { autoAlpha: 1, duration: 0.5 }, '-=0.45');
      tl.to(spots, { autoAlpha: 1, duration: 0.35, stagger: 0.04 }, '-=0.35');
    }
    await tl.then();

    card.hidden = true;
    if (m) {
      gsap.set(m.layer, { clearProps: 'scale,filter,transform' });
      resetLayer(m.layer);
    }
    if (restoreFocus) trigger?.focus({ preventScroll: true });
  }

  const prefetch = (id: string | undefined) => {
    if (id) mount(id);
  };

  const intent = (el: HTMLElement, id: string) => {
    el.addEventListener('pointerenter', () => prefetch(id));
    el.addEventListener('pointerdown', () => prefetch(id));
    el.addEventListener('focus', () => prefetch(id));
  };

  spots.forEach((s) => {
    const id = s.dataset.svhSpot!;
    s.addEventListener('click', (e) => {
      e.stopPropagation();
      trigger = s;
      run(() => open(id));
    });
    intent(s, id);
  });

  // Las pestañas son enlaces reales a cada servicio; con JS abren la escena
  tabs.forEach((t) => {
    const id = t.dataset.svhTab!;
    t.addEventListener('click', (e) => {
      e.preventDefault();
      trigger = t;
      run(() => (active === id ? close() : open(id)));
    });
    intent(t, id);
  });

  back?.addEventListener('click', (e) => {
    e.stopPropagation();
    run(() => close());
  });

  // Tocar la escena mientras está abierta vuelve al edificio
  stage.addEventListener('click', () => {
    if (active) run(() => close());
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && active) run(() => close());
  });

  if (!reduce.matches) {
    gsap.from(spots, { autoAlpha: 0, scale: 0.4, duration: 0.5, stagger: 0.06, delay: 0.4, ease: 'back.out(2)' });
  }
}
