// Cálculos acústicos del simulador de drywall: índice Rw (ISO 717-1), nivel que
// llega al otro lado del muro y filtro de audio con la curva medida de cada muro.

// Curva de referencia ISO 717-1, de 100 a 3150 Hz en tercios de octava
const REFERENCIA = [33, 36, 39, 42, 45, 48, 51, 52, 53, 54, 55, 56, 56, 56, 56, 56];
// Ponderación A de cada banda de 50 a 6300 Hz
const PESO_A = [-30.2, -26.2, -22.5, -19.1, -16.1, -13.4, -10.9, -8.6, -6.6, -4.8, -3.2, -1.9, -0.8, 0, 0.6, 1, 1.2, 1.3, 1.2, 1, 0.5, -0.1];
const INDICE_100HZ = 3;

export function calcularRw(tl: number[]): number {
  const medida = tl.slice(INDICE_100HZ, INDICE_100HZ + REFERENCIA.length);
  let desplazamiento = -60;
  while (true) {
    const siguiente = desplazamiento + 1;
    const desfavorable = REFERENCIA.reduce((s, r, i) => s + Math.max(0, r + siguiente - medida[i]), 0);
    if (desfavorable > 32) return 52 + desplazamiento;
    desplazamiento = siguiente;
  }
}

// Espectro de ruido de tráfico de ISO 717-1, de 100 a 3150 Hz: mide cuánto rinde
// el muro con sonidos de muchos graves, como la música con bajos
const ESPECTRO_CTR = [-20, -20, -18, -16, -15, -14, -13, -12, -11, -9, -8, -9, -10, -11, -13, -15];

export function calcularCtr(tl: number[]): number {
  const medida = tl.slice(INDICE_100HZ, INDICE_100HZ + ESPECTRO_CTR.length);
  const x = -10 * Math.log10(ESPECTRO_CTR.reduce((s, l, i) => s + 10 ** ((l - medida[i]) / 10), 0));
  return Math.round(x - calcularRw(tl));
}

// En obra un muro suele rendir de 3 a 10 dB menos que en laboratorio: el sonido
// también pasa por puertas, tomas, juntas y los encuentros con losas y muros.
const CAIDA_OBRA_MIN = 3;
const CAIDA_OBRA_MAX = 10;

export function resumenMuro(c: { tl: number[]; estimado?: boolean; enObra?: string }) {
  const rw = calcularRw(c.tl);
  return {
    rw,
    obra: c.enObra ?? `${rw - CAIDA_OBRA_MAX} a ${rw - CAIDA_OBRA_MIN} dB`,
    bajos: c.estimado ? 'Sin dato' : `Cerca de ${rw + calcularCtr(c.tl)} dB`,
  };
}

// Nivel en dB(A) al otro lado para música con ese espectro a nivelFuente dB(A).
// Supone que el área del muro y la absorción de la habitación son parecidas (S ≈ A).
export function nivelAlOtroLado(tl: number[], espectro: number[], nivelFuente: number): number {
  const suma = (valores: number[]) => 10 * Math.log10(valores.reduce((s, v) => s + 10 ** (v / 10), 0));
  const referencia = suma(espectro.map((e, i) => e + PESO_A[i]));
  const ajuste = nivelFuente - referencia;
  return suma(espectro.map((e, i) => e + ajuste + PESO_A[i] - tl[i]));
}

// Pérdida del muro a cualquier frecuencia, interpolada en escala logarítmica
export function perdidaEn(f: number, bandas: number[], tl: number[]): number {
  if (f <= bandas[0]) return tl[0];
  const ultima = bandas.length - 1;
  if (f >= bandas[ultima]) return tl[ultima];
  const i = bandas.findIndex((b) => b > f) - 1;
  const t = Math.log(f / bandas[i]) / Math.log(bandas[i + 1] / bandas[i]);
  return tl[i] + (tl[i + 1] - tl[i]) * t;
}

function fft(re: Float64Array, im: Float64Array) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (2 * Math.PI) / len;
    for (let i = 0; i < n; i += len) {
      for (let k = 0; k < len / 2; k++) {
        const c = Math.cos(ang * k);
        const s = Math.sin(ang * k);
        const p = i + k;
        const q = p + len / 2;
        const tr = re[q] * c - im[q] * s;
        const ti = re[q] * s + im[q] * c;
        re[q] = re[p] - tr;
        im[q] = im[p] - ti;
        re[p] += tr;
        im[p] += ti;
      }
    }
  }
}

// Respuesta al impulso de fase lineal cuya magnitud es la curva del muro
export function filtroDelMuro(bandas: number[], tl: number[], sampleRate: number, n = 8192): Float32Array {
  const re = new Float64Array(n);
  const im = new Float64Array(n);
  for (let k = 0; k <= n / 2; k++) {
    const g = 10 ** (-perdidaEn((k * sampleRate) / n, bandas, tl) / 20);
    re[k] = g;
    if (k > 0 && k < n / 2) re[n - k] = g;
  }
  fft(re, im);
  const h = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const hann = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1));
    h[i] = (re[(i + n / 2) % n] / n) * hann;
  }
  return h;
}
