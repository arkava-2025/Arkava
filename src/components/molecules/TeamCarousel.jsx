import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// Utilidad: mapea un valor desde un rango a otro
function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

const CARD_W = 220; // ancho de cada tarjeta
const CARD_PAD = 1; // separación interna
const RING_PX = 10;  // grosor de separación blanca visible (ring ~10-15px)
const SCALE_FRONT = 1; // escala máxima segura al frente (evita solaparse)
const ANIM_SPEED = 0.000008; // fracción de vuelta por ms
const EDGE_FADE_LEAD_SEC = 2; // ocultar 1s antes de llegar a los lados

export default function TeamCarousel({ images }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0); // 0..1
  const [radii, setRadii] = useState({ rx: 520, ry: 120, rz: 210 });

  // Actualiza radios según el ancho del contenedor
  useEffect(() => {
    function updateRadii() {
      const w = containerRef.current?.clientWidth || 1200;
      // rx calculado para que la tarjeta extrema toque el borde del viewport
      const rx = Math.max(280, (w / 2) - (CARD_W / 2) - 1);
      setRadii({ rx, ry: 120, rz: 210 });
    }
    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  // Movimiento continuo (usar delta para velocidad constante)
  useAnimationFrame((t, delta) => {
    setOffset(prev => (prev + ANIM_SPEED * delta) % 1);
  });

  const N = images.length;
  // Calcular segmentos en función del arco necesario para evitar solapamientos
  const GAP = 10; // px de separación visible objetivo (constante)
  const sPx = CARD_W * SCALE_FRONT + 2 * RING_PX + GAP; // incluir ring en espaciamiento
  // Usar fórmula de cuerda: c = 2 * r * sin(Δθ/2) -> Δθ = 2 * asin(c / (2r))
  const segAngle = (radii.rx > 0)
    ? 2 * Math.asin(Math.min(0.999, sPx / (2 * radii.rx)))
    : 0.25;
  const SEGMENTS = Math.max(
    N,
    Math.floor((Math.PI * 2) / Math.max(0.01, segAngle))
  );

  return (
    <div className="relative w-[calc(100vw+200px)] left-1/2 -translate-x-1/2 py-20">
      <div
        ref={containerRef}
        className="relative mx-auto w-full rounded-[56px] overflow-visible"
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

          // Corrección de separación visual en pantalla (compensa la perspectiva)
          const k = 0.3; // junta más el centro sin solapar
          const xAdj = x * (1 - k * (z / rz));

          // Escala/opacity según profundidad + ángulo: centro (atrás) más pequeño, lados más grandes
          const zNorm = (z + rz) / (2 * rz); // 0 (fondo) .. 1 (frente)
          const sideFactor = Math.abs(Math.sin(theta)); // 0 centro, 1 laterales
          const minS = 0.42; // centro más pequeño
          const scaleZ = mapRange(zNorm, 0, 1, minS, SCALE_FRONT);
          const scaleX = minS + sideFactor * (SCALE_FRONT - minS);
          const scale = Math.min(SCALE_FRONT, scaleZ * 0.5 + scaleX * 0.5);
          // Multiplicador adicional: centro más grande y vecinas ligeramente más grandes
          const dFront = Math.abs(Math.atan2(Math.sin(theta), Math.cos(theta))); // 0 en el frente
          const isCenter = dFront < 0.18; // ~10.3°
          const isNeighbor = !isCenter && dFront < 0.35; // ~20°
          const featuredScale = isCenter ? 1.14 : (isNeighbor ? 1.07 : 1);
          // Mantener totalmente visibles las tarjetas traseras y desvanecer cerca del frente
          const fadeStart = 0.48; // comienza a desvanecer cerca del frente
          const fadeEnd = 0.49;   // invisible exactamente en el frente
          let opacity = 1;
          if (zNorm >= fadeStart) {
            const t = Math.min(1, Math.max(0, (zNorm - fadeStart) / (fadeEnd - fadeStart)));
            opacity = 1 - t; // 1 -> 0
          }

          // Fading adicional en los laterales: ocultar 1s antes de llegar a ±π/2
          const anglePerMs = ANIM_SPEED * Math.PI * 2; // rad/ms
          const leadAngleEdge = anglePerMs * 1000 * EDGE_FADE_LEAD_SEC; // rad
          const dLeft = Math.abs(Math.atan2(Math.sin(theta - Math.PI / 2), Math.cos(theta - Math.PI / 2)));
          const dRight = Math.abs(Math.atan2(Math.sin(theta + Math.PI / 2), Math.cos(theta + Math.PI / 2)));
          const edgeDist = Math.min(dLeft, dRight);
          if (edgeDist <= leadAngleEdge) {
            const e = Math.max(0, edgeDist / leadAngleEdge);
            opacity *= e; // multiplica la opacidad para desaparecer antes del borde
          }
          // Inward fuerte: los lados miran claramente hacia el centro (más vertical)
          const maxAngle = 88; // grados
          const rotateY = -(x / rx) * maxAngle; // signos opuestos en lados, más vertical
          const rotateZ = 0; // mantener vertical

          return (
            <motion.div
              key={`${i}-${img}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] aspect-[3/4]"
              style={{ transformStyle: "preserve-3d", zIndex: Math.round(10 + zNorm * 100) }}
              animate={{
                // translate3d desde el centro
                x: xAdj,
                y,
                z,
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
                className="w-full h-full overflow-hidden rounded-[28px] shadow-2xl bg-white ring-[10px] ring-white"
                style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                animate={{ scale: scale * featuredScale, rotateY, rotateZ }}
                transition={{ type: "spring", stiffness: 90, damping: 28, mass: 0.6 }}
              >
                <img src={img} alt={`team-${i}`} className="w-full h-full object-cover rounded-[22px]" style={{ padding: CARD_PAD }} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_80%)]" />
              </motion.div>
            </motion.div>
          );
        })}

      </div>
      {/* Overlays por encima de TODO el carrusel */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-white via-white/90 to-transparent z-[9999]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-56 bg-gradient-to-l from-white via-white/90 to-transparent z-[9999]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-white via-white/80 to-transparent z-[9999]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent z-[9999]" />
      {/* Niebla blanca en esquinas para ocultación suave */}
      <div className="pointer-events-none absolute -left-16 -top-16 w-[38vw] h-[38vh] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.95),rgba(255,255,255,0.8),transparent_60%)] blur-[90px] z-[9999]" />
      <div className="pointer-events-none absolute -right-16 -top-16 w-[38vw] h-[38vh] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.95),rgba(255,255,255,0.8),transparent_60%)] blur-[90px] z-[9999]" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 w-[38vw] h-[38vh] bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.95),rgba(255,255,255,0.8),transparent_60%)] blur-[90px] z-[9999]" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 w-[38vw] h-[38vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.95),rgba(255,255,255,0.8),transparent_60%)] blur-[90px] z-[9999]" />
    </div>
  );
}
