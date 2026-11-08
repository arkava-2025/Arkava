import { gsap } from 'gsap';
import { EFFECTS, resetLayer } from './effects';

// Acercamiento continuo: el edificio avanza hacia el punto y, mientras sigue
// avanzando, la escena del servicio aparece desde ese mismo punto. Las dos
// capas se mueven en la misma dirección, así se lee como entrar por la ventana.
const PUSH = { scale: 2.6, duration: 1.5, fadeAt: 0.55, fadeDuration: 0.95, fromScale: 0.42 };

// Tiempo que se alcanza a ver el edificio antes de entrar por un enlace directo (ms)
const DEEP_LINK_PAUSE = 200;

// ready: la primera imagen de la escena, suficiente para mover la cámara.
// todas: el resto de pasos, que el efecto necesita antes de empezar.
type Mounted = { layer: HTMLElement; ready: Promise<void>; todas: Promise<void> };

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
  // Al entrar por un enlace nadie ha interactuado: no se mueve el foco
  let llegoPorEnlace = false;
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
    const [primera, ...resto] = [...layer.querySelectorAll('img')];
    // Si bajan a la vez se reparten la conexión y la primera tarda como todas:
    // el resto no tiene dirección hasta que la primera termina.
    const primerGrupo = primera.closest('picture') ?? primera;
    const diferidos = [...layer.querySelectorAll('source, img')]
      .filter((el) => !primerGrupo.contains(el))
      .map((el) => {
        const attrs = { srcset: el.getAttribute('srcset'), src: el.getAttribute('src') };
        el.removeAttribute('srcset');
        el.removeAttribute('src');
        return { el, attrs };
      });
    stage!.insertBefore(layer, back);
    resetLayer(layer);
    const ready = primera.decode().catch(() => {});
    const todas = ready.then(async () => {
      diferidos.forEach(({ el, attrs }) => {
        if (attrs.srcset) el.setAttribute('srcset', attrs.srcset);
        if (attrs.src) el.setAttribute('src', attrs.src);
      });
      await Promise.all(resto.map((img) => img.decode().catch(() => {})));
    });
    const m = { layer, ready, todas };
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
    if (hint && !hint.hidden) gsap.to(hint, { autoAlpha: 0, duration: 0.3, onComplete: () => {
        hint.hidden = true;
      } });
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
    // En móvil el título va fuera de la foto: solo se oculta en escritorio
    if (desktop.matches) tl.to(chrome, { autoAlpha: 0, duration: 0.45, ease: 'power1.out' }, 0);

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
      // Arranca un momento después de llegar a la escena, para que el
      // "antes" se alcance a leer antes de que empiece la obra.
      tl.call(() => {
        void m.todas.then(() => {
          if (active === id) effect?.play();
        });
      }, undefined, motion ? ui + 0.4 : '+=0.1');
    }

    await tl.then();
    if (active === id && !llegoPorEnlace) back?.focus({ preventScroll: true });
    llegoPorEnlace = false;
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

    // Al volver al edificio, recargar no debe reabrir la escena del enlace
    if (!switching && location.hash) history.replaceState(null, '', location.pathname + location.search);

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

  // Enlace directo (/servicios/#pintura), por ejemplo desde el home: se ve el
  // edificio un momento y la cámara entra sola a la escena de ese servicio.
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    return cards.has(id) ? id : null;
  };
  const openFromHash = (id: string) => {
    trigger = spots.find((s) => s.dataset.svhSpot === id) ?? null;
    llegoPorEnlace = true;
    run(() => open(id));
  };
  window.addEventListener('hashchange', () => {
    const id = fromHash();
    if (id) openFromHash(id);
  });

  const inicial = fromHash();
  if (inicial) {
    prefetch(inicial);
    const edificio = canvas.querySelector('img');
    void Promise.resolve(edificio?.decode())
      .catch(() => {})
      .then(() => window.setTimeout(() => openFromHash(inicial), reduce.matches ? 0 : DEEP_LINK_PAUSE));
  } else if (!reduce.matches) {
    gsap.from(spots, { autoAlpha: 0, scale: 0.4, duration: 0.5, stagger: 0.06, delay: 0.4, ease: 'back.out(2)' });
  }
}
