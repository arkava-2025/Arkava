// Comportamiento común de las landings: menú, entradas al hacer scroll,
// parallax de la portada e índice lateral.
export function initLanding(root: HTMLElement) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector<HTMLElement>('#header, body > header');
  const setHeader = () => {
    if (header) root.style.setProperty('--lnd-header', `${header.offsetHeight}px`);
  };
  setHeader();
  window.addEventListener('resize', setHeader, { passive: true });

  if (!reduce && 'IntersectionObserver' in window) {
    root.classList.add('js-lnd');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  }

  const parallax = root.querySelector<HTMLElement>('[data-lnd-parallax]');
  if (parallax && !reduce) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = Math.min(window.scrollY, window.innerHeight);
      parallax.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true },
    );
  }

  const links = [...root.querySelectorAll<HTMLAnchorElement>('.lnd-toc a')];
  if (links.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.setAttribute('aria-current', String(a.hash === `#${e.target.id}`)));
        });
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    links.forEach((a) => {
      const target = root.querySelector(a.hash);
      if (target) spy.observe(target);
    });
  }
}
