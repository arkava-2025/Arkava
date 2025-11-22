import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// Utilidad: mapea un valor desde un rango a otro
function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

export default function TeamCarousel({ images }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0); // 0..1
  const [radii, setRadii] = useState({ rx: 420, ry: 40, rz: 140 });

  // Actualiza radios según el ancho del contenedor
  useEffect(() => {
    function updateRadii() {
      const w = containerRef.current?.clientWidth || 800;
      setRadii({ rx: Math.max(280, w * 0.38), ry: 40, rz: 140 });
    }
    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  // Movimiento continuo (usar delta para velocidad constante)
  useAnimationFrame((t, delta) => {
    const speed = 0.00006; // fracción por ms (ajusta para más rápido/lento)
    setOffset(prev => (prev + speed * delta) % 1);
  });

  const N = images.length;

  return (
    <div className="w-full py-16 overflow-hidden">
      <div
        ref={containerRef}
        className="relative mx-auto w-full"
        style={{ height: 360, perspective: "1400px", perspectiveOrigin: "center center" }}
      >
        {images.map((img, i) => {
          // Ángulo alrededor del anillo (centro pequeño cuando cos= -1)
          const theta = ((i / N) + offset) * Math.PI * 2;
          const { rx, ry, rz } = radii;

          // Proyección elíptica
          const x = rx * Math.sin(theta);
          const z = rz * Math.cos(theta);
          const y = mapRange(Math.cos(theta), -1, 1, 0, ry); // arco hacia abajo

          // Escala/opacity según profundidad
          const zNorm = (z + rz) / (2 * rz); // 0 (fondo) .. 1 (frente)
          const scale = mapRange(zNorm, 0, 1, 0.6, 1.15);
          const opacity = mapRange(zNorm, 0, 1, 0.5, 0.95);
          const rotateY = mapRange(Math.sin(theta), -1, 1, -22, 22);

          return (
            <motion.div
              key={`${img}-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] shadow-2xl bg-white aspect-[3/4] w-[180px]"
              style={{ transformStyle: "preserve-3d", zIndex: Math.round(10 + zNorm * 100) }}
              animate={{
                // translate3d desde el centro
                x,
                y,
                z,
                rotateY,
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 28,
                mass: 0.6,
              }}
            >
              <img src={img} alt={`team-${i}`} className="w-full h-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
