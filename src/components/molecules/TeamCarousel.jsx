import React, { useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";

export default function CarouselFramer07({ items }) {
  const raf = useRef(null);
  const [sliderRef, sliderInstance] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: "auto", spacing: 32 },
    created(s) {
      animate(s);
    },
    updated(s) {
      animate(s);
    },
    slideChanged(s) {
      animate(s);
    },
  });

  function animate(s) {
    cancelAnimationFrame(raf.current);
    const slides = s.slides;
    const container = s.container;
    const center = container.clientWidth / 2;

    function frame() {
      slides.forEach((slide) => {
        if (!slide || !slide.node) return;

        const el = slide.node;
        const rect = el.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const dist = (slideCenter - center) / center;
        const clamp = Math.max(-1, Math.min(1, dist));

        // Valores calibrados: centro MUY pequeño, lados más grandes
        const abs = Math.abs(clamp);
        // centro ~0.6, extremos ~1.2
        const scale = 0.6 + abs * 0.6;
        // mantiene buena visibilidad en todos los slides
        const opacity = 0.7 + abs * 0.3;
        const translateX = clamp * -10; // ligera corrección horizontal
        const rotateY = clamp * 20; // rotación en eje Y para efecto "curvo"

        el.style.transform = `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`;
        el.style.opacity = opacity;
      });
      raf.current = requestAnimationFrame(frame);
    }

    frame();
  }

  useEffect(() => {
    const slider = sliderInstance && sliderInstance.current;

    if (!slider || typeof slider.next !== "function") return;

    const interval = setInterval(() => {
      slider.next();
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [sliderInstance]);

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);


  return (
    <div className="relative py-12">
      {/* Gradientes laterales para simular el fade del diseño */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f5efe6] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f5efe6] to-transparent z-10" />

      <div
        ref={sliderRef}
        className="keen-slider overflow-visible flex items-center"
        style={{ perspective: "1200px" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="keen-slider__slide flex justify-center items-center"
            style={{ width: "230px" }}
          >
            <motion.div
              className="relative w-[210px] h-[320px] rounded-3xl shadow-xl bg-neutral-900/40 overflow-hidden border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <img
                src={item}
                alt={"Team member " + (i + 1)}
                className="h-full w-full object-cover"
              />

              {/* overlay suave para dar profundidad similar al ejemplo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
