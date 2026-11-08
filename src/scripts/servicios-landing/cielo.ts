export function initCielo(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-cielo-stage]');
  const dim = root.querySelector<HTMLInputElement>('[data-cielo-dim]');
  const sw = root.querySelector<HTMLButtonElement>('[data-cielo-sw]');
  const texto = root.querySelector<HTMLElement>('[data-cielo-d]');
  if (!stage || !dim || !sw || !texto) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const aplicarLuz = () => {
    const v = Number(dim.value) / 100;
    stage.style.setProperty('--luz', String(v));
    sw.setAttribute('aria-checked', String(v > 0));
  };
  dim.addEventListener('input', aplicarLuz);

  let raf = 0;
  sw.addEventListener('click', () => {
    cancelAnimationFrame(raf);
    const desde = Number(dim.value);
    const hasta = desde > 0 ? 0 : 100;
    const t0 = performance.now();
    const paso = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / 1100);
      dim.value = String(desde + (hasta - desde) * p * p * (3 - 2 * p));
      aplicarLuz();
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
  });

  root.querySelectorAll<HTMLInputElement>('input[name="cielo-temp"]').forEach((i) =>
    i.addEventListener('change', () => {
      stage.dataset.temp = i.value;
    }),
  );

  const capas = [...root.querySelectorAll<HTMLElement>('[data-cielo-capa]')];
  root.querySelectorAll<HTMLInputElement>('input[name="cielo-etapa"]').forEach((i) =>
    i.addEventListener('change', () => {
      capas.forEach((c) => c.classList.toggle('is-on', c.dataset.cieloCapa === i.value));
      texto.textContent = i.dataset.d ?? '';
    }),
  );

  // La lente se pasea sola por el techo hasta que alguien la mueve
  let manual = false;
  let visible = false;
  const mover = (x: number, y: number) => {
    stage.style.setProperty('--x', `${x}px`);
    stage.style.setProperty('--y', `${y}px`);
  };
  const seguir = (e: PointerEvent) => {
    manual = true;
    stage.classList.add('is-used');
    const r = stage.getBoundingClientRect();
    mover(e.clientX - r.left, e.clientY - r.top);
  };
  stage.addEventListener('pointermove', seguir);
  stage.addEventListener('pointerdown', seguir);
  stage.addEventListener('pointerleave', () => {
    manual = false;
  });

  if (reduce) return;
  new IntersectionObserver((e) => {
    visible = e.some((x) => x.isIntersecting);
  }).observe(stage);
  let t = 0;
  const pasear = () => {
    if (visible && !manual) {
      t += 0.006;
      const r = stage.getBoundingClientRect();
      mover(r.width * (0.46 + 0.26 * Math.sin(t)), r.height * (0.22 + 0.07 * Math.cos(t * 1.6)));
    }
    requestAnimationFrame(pasear);
  };
  pasear();
}
