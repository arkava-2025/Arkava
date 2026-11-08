// Composiciones del simulador acústico de /servicios/muros-drywall/.
//
// tl es la pérdida de transmisión en dB por tercio de octava (BANDAS_HZ). Los
// muros en placa son promedios de ensayos de laboratorio del Consejo Nacional de
// Investigación de Canadá (informe IRC-IR-761), con perfil metálico de 90 mm.
// El índice Rw se calcula de esas curvas según ISO 717-1 (ver acustica.ts).
// En obra el resultado suele ser menor: el sonido también pasa por puertas,
// tomas eléctricas y los encuentros con losas y muros.

export const BANDAS_HZ = [50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300];

// Pistas del simulador. espectro va por las mismas bandas (dB relativos a la
// banda más fuerte), medido de cada archivo. refuerzo sube el volumen por igual
// en todos los muros para que se oiga en cualquier parlante: la diferencia entre
// un muro y otro no cambia. Se fija para que el muro que menos aísla no sature.
export type Pista = {
  id: string;
  nombre: string;
  archivo: string;
  refuerzo: number;
  espectro: number[];
};

export const PISTAS: Pista[] = [
  {
    id: 'clasica',
    nombre: 'Clásica',
    archivo: '/audio/bach-preludio-1.mp3',
    refuerzo: 30,
    espectro: [-37.5, -24.6, -29.9, -29.7, -28.2, -19, -16.8, -2.8, -0.9, 0, -9.7, -3.5, -9.1, -12.4, -15.8, -19.8, -24.7, -32.1, -42.5, -48.7, -58.3, -62.6],
  },
  {
    id: 'jazz',
    nombre: 'Jazz',
    archivo: '/audio/jazz-macleod.mp3',
    refuerzo: 12,
    espectro: [-8.6, -7.5, -2.5, 0, -7.5, -4.9, -3.6, -8.9, -8.6, -13.7, -14.7, -22, -20.8, -21.2, -25.5, -28.4, -27.7, -26.7, -24.9, -24.1, -20.3, -20.4],
  },
];

export type Composicion = {
  id: string;
  nombre: string;
  tl: number[];
  // true si la curva no sale de un ensayo: el ladrillo
  estimado?: boolean;
  rangoEnsayos: string;
  // Solo para los muros sin ensayo; los demás se calculan con el Rw
  enObra?: string;
  fuente: string;
  espesor: string;
  texto: string;
  uso: string;
  // Capas del dibujo, de izquierda a derecha, con su grosor en milímetros
  capas: { tipo: 'placa' | 'camara' | 'lana' | 'ladrillo' | 'revoque'; mm: number }[];
};

export const COMPOSICIONES: Composicion[] = [
  {
    id: 'ladrillo',
    nombre: 'Ladrillo revocado (estimado)',
    tl: [26.0, 28.0, 30.0, 24.0, 27.0, 30.0, 33.0, 36.0, 39.0, 42.0, 43.0, 44.0, 45.0, 46.0, 47.0, 47.0, 47.0, 47.0, 47.0, 47.0, 47.0, 47.0],
    estimado: true,
    rangoEnsayos: '42 a 51 dB (guías técnicas)',
    enObra: '40 a 43 dB si es farol de 10 cm',
    fuente: 'Estimado, sin ensayo propio. El sonido de este muro es aproximado',
    espesor: '12 a 15 cm',
    texto: 'La referencia con la que todos comparan. Aísla por masa, y el resultado cambia mucho según el ladrillo y el revoque.',
    uso: 'Muros divisorios tradicionales',
    capas: [{ tipo: 'revoque', mm: 15 }, { tipo: 'ladrillo', mm: 100 }, { tipo: 'revoque', mm: 15 }],
  },
  {
    id: 'sencillo',
    nombre: 'Placa 16 mm, sin lana',
    tl: [21.7, 17.0, 16.0, 9.8, 14.4, 22.7, 28.8, 32.3, 38.8, 43.4, 45.8, 51.3, 54.3, 56.2, 55.9, 51.0, 38.8, 39.9, 42.5, 47.2, 50.5, 54.1],
    rangoEnsayos: '39 dB (1 ensayo)',
    fuente: 'Laboratorio NRC Canadá, 1 ensayo',
    espesor: '12,2 cm',
    texto: 'Una placa por cara y la cámara vacía. La voz fuerte llega apagada al otro lado. Sirve para dividir, no para aislar.',
    uso: 'Clósets y divisiones de una misma zona',
    capas: [{ tipo: 'placa', mm: 16 }, { tipo: 'camara', mm: 90 }, { tipo: 'placa', mm: 16 }],
  },
  {
    id: 'lana16',
    nombre: 'Placa 16 mm, con lana',
    tl: [19.3, 12.6, 15.0, 14.1, 22.4, 29.6, 35.4, 42.8, 48.2, 53.7, 56.7, 60.0, 61.5, 62.8, 62.3, 59.7, 49.4, 45.2, 49.1, 52.7, 55.8, 58.8],
    rangoEnsayos: '45 a 47 dB',
    fuente: 'Laboratorio NRC Canadá, promedio de 13 ensayos',
    espesor: '12,2 cm',
    texto: 'El mismo muro con la cámara rellena gana 7 dB. La lana ayuda sobre todo entre 125 y 500 Hz, y la voz fuerte queda en un murmullo.',
    uso: 'Alcobas y estudios',
    capas: [{ tipo: 'placa', mm: 16 }, { tipo: 'lana', mm: 90 }, { tipo: 'placa', mm: 16 }],
  },
  {
    id: 'lana',
    nombre: 'Placa 13 mm, con lana',
    tl: [19.0, 12.5, 14.7, 10.9, 18.4, 25.6, 32.1, 38.3, 44.6, 51.5, 55.5, 59.0, 61.6, 63.6, 65.0, 65.5, 61.5, 49.1, 45.5, 48.0, 53.0, 56.1],
    rangoEnsayos: '41 a 45 dB',
    fuente: 'Laboratorio NRC Canadá, promedio de 7 ensayos con placas de 7 a 10 kg/m²',
    espesor: '11,6 cm',
    texto: 'Con placa de 1/2 pulgada. La voz fuerte llega como un murmullo. Una placa más liviana da un resultado menor.',
    uso: 'Alcobas dentro del mismo apartamento',
    capas: [{ tipo: 'placa', mm: 13 }, { tipo: 'lana', mm: 90 }, { tipo: 'placa', mm: 13 }],
  },
  {
    id: 'unlado',
    nombre: 'Doble placa 13 mm en un lado, con lana',
    tl: [22.0, 14.2, 16.9, 15.0, 24.0, 31.1, 37.3, 43.3, 48.5, 54.5, 57.9, 61.7, 63.7, 65.4, 66.5, 67.4, 64.2, 52.8, 50.3, 53.1, 57.6, 60.9],
    rangoEnsayos: '46 a 50 dB',
    fuente: 'Laboratorio NRC Canadá, promedio de 7 ensayos con placas de 7 a 10 kg/m²',
    espesor: '12,9 cm',
    texto: 'Una placa adicional en un lado agrega masa. Es una mejora útil cuando el muro ya existe.',
    uso: 'Mejorar un muro existente',
    capas: [{ tipo: 'placa', mm: 13 }, { tipo: 'placa', mm: 13 }, { tipo: 'lana', mm: 90 }, { tipo: 'placa', mm: 13 }],
  },
  {
    id: 'doble',
    nombre: 'Doble placa 13 mm por cara, con lana',
    tl: [22.6, 14.7, 18.6, 19.3, 27.9, 35.0, 41.3, 46.6, 51.6, 56.9, 59.3, 62.9, 65.2, 66.2, 67.1, 68.7, 66.3, 55.4, 54.2, 57.4, 61.7, 64.9],
    rangoEnsayos: '49 a 53 dB',
    fuente: 'Laboratorio NRC Canadá, promedio de 7 ensayos con placas de 7 a 10 kg/m²',
    espesor: '14,2 cm',
    texto: 'Dos placas por cara. La voz deja de oírse en condiciones normales. La música todavía pasa, sobre todo los graves.',
    uso: 'Oficinas, consultorios y habitaciones de hotel',
    capas: [{ tipo: 'placa', mm: 13 }, { tipo: 'placa', mm: 13 }, { tipo: 'lana', mm: 90 }, { tipo: 'placa', mm: 13 }, { tipo: 'placa', mm: 13 }],
  },
];
