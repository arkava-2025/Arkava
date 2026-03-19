import { useEffect, useState, useMemo } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const SPEED      = 0.00016; // slots/ms
const VISUAL_GAP = 36;      // px de gap visual constante entre bordes de tarjetas

/** Escala de una tarjeta en el slot s */
function scaleAt(s) {
  return Math.max(0.40, 1 - Math.abs(s) * 0.20);
}

/**
 * Construye una tabla de posición X para slots enteros.
 * El gap entre bordes de tarjetas adyacentes siempre es VISUAL_GAP.
 *   step(s → s+1) = halfWidth(s) + gap + halfWidth(s+1)
 */
function buildXTable(cardW, gap, maxSlot = 5) {
  const half = s => (cardW * scaleAt(s)) / 2;
  const tbl  = { 0: 0 };
  for (let s = 0; s < maxSlot; s++) {
    const step     = half(s) + gap + half(s + 1);
    tbl[s + 1]     = tbl[s] + step;
    tbl[-(s + 1)]  = -tbl[s + 1];
  }
  return tbl;
}

/** Interpolación lineal entre slots enteros */
function slotToX(slot, tbl) {
  const lo = Math.floor(slot);
  const hi = lo + 1;
  const t  = slot - lo;
  const x0 = tbl[lo] ?? (lo < 0 ? -99999 : 99999);
  const x1 = tbl[hi] ?? (hi < 0 ? -99999 : 99999);
  return x0 + (x1 - x0) * t;
}

export default function TeamCarousel({ images }) {
  const N = images.length;

  const [pos, setPos]       = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useAnimationFrame((_t, delta) => {
    setPos(p => p + SPEED * delta);
  });

  const CARD_W = mobile ? 200 : 360;
  const CARD_H = mobile ? 268 : 480;

  // Tabla recalculada sólo cuando cambia el tamaño de tarjeta
  const xTable = useMemo(
    () => buildXTable(CARD_W, VISUAL_GAP),
    [CARD_W]
  );

  return (
    <div
      className="relative w-full py-14 overflow-hidden"
      style={{
        perspective:       mobile ? "800px" : "1300px",
        perspectiveOrigin: "center center",
      }}
    >
      <div className="relative mx-auto" style={{ height: CARD_H + 60 }}>
        {images.map((img, i) => {
          // Slot fraccionario en (-N/2, N/2]
          const raw  = ((i - pos % N) % N + N) % N;
          const slot = raw > N / 2 ? raw - N : raw;
          const abs  = Math.abs(slot);

          const x       = slotToX(slot, xTable);   // posición con gap constante
          const scale   = scaleAt(slot);
          const rotateY = -slot * 28;
          const opacity = abs > 2.1 ? Math.max(0, 1 - (abs - 2.1) / 0.35) : 1;
          const zIndex  = Math.round(100 - abs * 18);

          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                width:          CARD_W,
                height:         CARD_H,
                marginLeft:     -CARD_W / 2,
                marginTop:      -CARD_H / 2,
                x,
                scale,
                rotateY,
                opacity,
                zIndex,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl shadow-2xl ring-[10px] ring-white bg-white">
                <img
                  src={img}
                  alt={`Equipo Arkava ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent rounded-2xl" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fades laterales y verticales */}
      <div className="pointer-events-none absolute inset-y-0 left-0  w-40 md:w-56 bg-gradient-to-r from-white via-white/90 to-transparent z-[9999]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 md:w-56 bg-gradient-to-l from-white via-white/90 to-transparent z-[9999]" />
      <div className="pointer-events-none absolute top-0    inset-x-0 h-12 bg-gradient-to-b from-white to-transparent z-[9999]" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent z-[9999]" />
    </div>
  );
}
