import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// Utilidad: mapea un valor desde un rango a otro
function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

const CARD_W = 320; // ancho de cada tarjeta
const CARD_PAD = 1; // separación interna
const RING_PX = 10;  // grosor de separación blanca visible (ring ~10-15px)

export default function TeamCarousel({ images }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0); // 0..1
  const [radii, setRadii] = useState({ rx: 520, ry: 120, rz: 210 });

  // Actualiza radios según el ancho del contenedor
  useEffect(() => {
    function updateRadii() {
      const w = containerRef.current?.clientWidth || 1200;
      // rx calculado para que la tarjeta extrema toque el borde del viewport,
      // considerando el ring blanco exterior
      const rx = Math.max(280, (w / 2) - ((CARD_W + RING_PX * 2) / 2) - 1);
      setRadii({ rx, ry: 120, rz: 210 });
    }
    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  // Movimiento continuo (usar delta para velocidad constante)
  useAnimationFrame((t, delta) => {
    const speed = 0.000005; // aún más lento
    setOffset(prev => (prev + speed * delta) % 1);
  });

  const N = images.length;
  // Calcular segmentos en función del arco necesario para evitar solapamientos
  const GAP = 15; // px de separación visible objetivo (constante)
  const sPx = CARD_W + GAP; // ancho efectivo entre centros (borde a borde + gap)
  // Usar fórmula de cuerda: c = 2 * r * sin(Δθ/2) -> Δθ = 2 * asin(c / (2r))
  const segAngle = (radii.rx > 0)
    ? 2 * Math.asin(Math.min(0.999, sPx / (2 * radii.rx)))
    : 0.25;
  const SEGMENTS = Math.max(
    N,
    Math.floor((Math.PI * 2) / Math.max(0.01, segAngle))
  );

  return (
    <div className="relative w-[calc(100vw+500px)] left-1/2 -translate-x-1/2 py-20 overflow-hidden">
      <div
        ref={containerRef}
        className="relative mx-auto w-full rounded-[56px] overflow-hidden"
        style={{
          height: 700,
          perspective: "1400px",
          perspectiveOrigin: "center center",
        }}
      >
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const img = images[i % N];
          // Ángulo alrededor del anillo (centro pequeño cuando cos= -1)
          const theta = ((i / SEGMENTS) + offset) * Math.PI * 2;
          const { rx, ry, rz } = radii;

          // Proyección elíptica
          const x = rx * Math.sin(theta);
          const z = rz * Math.cos(theta);
          // Centrado vertical simétrico (ligero arco alrededor del centro)
          const yAmp = 40; // amplitud total del arco vertical
          const y = mapRange(Math.cos(theta), -1, 1, -yAmp / 2, yAmp / 2);

          // Escala/opacity según profundidad
          const zNorm = (z + rz) / (2 * rz); // 0 (fondo) .. 1 (frente)
          const scale = mapRange(zNorm, 0, 1, 0.62, 1.30);
          // Mantener totalmente visibles las tarjetas de la mitad trasera
          // y desvanecer solo en una zona pequeña al acercarse al frente
          const fadeStart = 0.48; // comienza a desvanecer muy cerca del frente
          const fadeEnd = 0.52;   // invisible exactamente en el frente
          let opacity = 1;
          if (zNorm >= fadeStart) {
            const t = Math.min(1, Math.max(0, (zNorm - fadeStart) / (fadeEnd - fadeStart)));
            opacity = 1 - t; // 1 -> 0
          }
          // Inward fuerte: los lados miran claramente hacia el centro (más vertical)
          const rotateY = mapRange(Math.sin(theta), -1, 1, 72, -72);
          const rotateZ = 0; // mantener vertical

          return (
            <motion.div
              key={`${i}-${img}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] aspect-[3/4]"
              style={{ transformStyle: "preserve-3d", zIndex: Math.round(10 + zNorm * 100) }}
              animate={{
                // translate3d desde el centro
                x,
                y,
                z,
                rotateY,
                rotateZ,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 28,
                mass: 0.6,
              }}
            >
              <motion.div
                className="w-full h-full overflow-hidden rounded-[28px] shadow-2xl bg-white"
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 90, damping: 28, mass: 0.6 }}
              >
                <img src={img} alt={`team-${i}`} className="w-full h-full object-cover rounded-[22px]" style={{ padding: CARD_PAD }} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Faders laterales suaves (no recortan, solo suavizan) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#f5efe6] via-[#f5efe6]/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#f5efe6] via-[#f5efe6]/60 to-transparent" />
        {/* Faders superior e inferior para recorte vertical suave */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f5efe6] via-[#f5efe6]/70 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5efe6] via-[#f5efe6]/70 to-transparent" />
        {/* Esquinas borrosas para simular el glow del mock */}
        <div className="pointer-events-none absolute -left-24 -top-24 w-[42vw] h-[42vh] bg-[radial-gradient(ellipse_at_top_left,rgba(245,239,230,0.9),rgba(245,239,230,0.6),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-24 w-[42vw] h-[42vh] bg-[radial-gradient(ellipse_at_top_right,rgba(245,239,230,0.9),rgba(245,239,230,0.6),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 w-[42vw] h-[42vh] bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,239,230,0.9),rgba(245,239,230,0.6),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 w-[42vw] h-[42vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,239,230,0.9),rgba(245,239,230,0.6),transparent_60%)] blur-3xl" />
      </div>
    </div>
  );
}
