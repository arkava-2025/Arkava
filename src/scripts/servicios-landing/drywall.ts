import { BANDAS_HZ, type Composicion, type Pista } from '@/lib/servicios/drywall-composiciones';
import { calcularRw, filtroDelMuro, nivelAlOtroLado, resumenMuro } from './acustica';

// Supuesto del cálculo: música fuerte en una sala
const NIVEL_MUSICA = 80;

const NOMBRES = { placa: 'Placa de yeso', camara: 'Cámara vacía', lana: 'Lana mineral', ladrillo: 'Ladrillo', revoque: 'Revoque' };
const ESCALA = 1.15;

function dibujar(c: Composicion) {
  const total = c.capas.reduce((s, x) => s + x.mm, 0) * ESCALA;
  let x = 360 - total / 2;
  const top = 96;
  const alto = 244;
  let capas = '';
  let etiquetas = '';
  const vistos = new Set<string>();
  c.capas.forEach((capa) => {
    const w = capa.mm * ESCALA;
    if (capa.tipo === 'placa') capas += `<rect x="${x}" y="${top}" width="${w}" height="${alto}" fill="#e4dfd0" stroke="#2e483e"/>`;
    if (capa.tipo === 'revoque') capas += `<rect x="${x}" y="${top}" width="${w}" height="${alto}" fill="#c9c3b2"/>`;
    if (capa.tipo === 'ladrillo') {
      capas += `<rect x="${x}" y="${top}" width="${w}" height="${alto}" fill="#b5613f"/>`;
      for (let y = top + 40; y < top + alto; y += 40) capas += `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="#f1ecd9" stroke-width="2.5"/>`;
    }
    if (capa.tipo === 'camara' || capa.tipo === 'lana') {
      if (capa.tipo === 'lana') {
        capas += `<rect x="${x}" y="${top}" width="${w}" height="${alto}" fill="#e2bd6c"/>`;
        let d = '';
        for (let y = top + 20; y < top + alto - 20; y += 18) d += `M${x + 3} ${y}q${w * 0.25} 18 ${(w - 6) / 2} 0t${(w - 6) / 2} 0`;
        capas += `<path d="${d}" fill="none" stroke="#a9842f" stroke-width="1.6"/>`;
      }
      for (const y of [top + 30, top + alto / 2, top + alto - 30]) capas += `<rect x="${x}" y="${y - 4}" width="${w}" height="8" fill="#7a8a84"/>`;
    }
    if (!vistos.has(capa.tipo)) {
      vistos.add(capa.tipo);
      const cx = x + w / 2;
      const ty = 30 + (vistos.size - 1) * 17;
      etiquetas += `<line x1="${cx}" y1="${ty + 4}" x2="${cx}" y2="${top}" stroke="#2e483e" stroke-opacity=".45"/>`;
      etiquetas += `<text x="${cx}" y="${ty}" text-anchor="middle" font-size="12.5" fill="#2e483e" font-family="var(--font-helvetica)">${NOMBRES[capa.tipo]}</text>`;
    }
    x += w;
  });
  const izq = 360 - total / 2;
  const der = 360 + total / 2;
  const n = Math.max(1, Math.round((60 - calcularRw(c.tl)) / 5));
  const arco = (cx: number, r: number, dir: number, color: string, op: number, cls: string, d: number) =>
    `<path class="${cls}" style="animation-delay:${d}s" d="M${cx + dir * r * 0.5} ${218 - r}Q${cx + dir * r * 1.3} 218 ${cx + dir * r * 0.5} ${218 + r}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="${op}"/>`;
  let ondas = '';
  for (let i = 0; i < 4; i++) ondas += arco(izq - 30 - i * 30, 26 + i * 16, -1, '#e35205', 1 - i * 0.2, 'dw-wave', i * 0.12);
  for (let i = 0; i < n; i++) ondas += arco(der + 30 + i * 30, 26 + i * 16, 1, '#2e483e', 0.75 - i * 0.12, 'dw-wave', 0.3 + i * 0.12);
  return `
    <text x="30" y="372" font-size="13" fill="#2e483e" font-family="var(--font-pp-mono)" letter-spacing="1.5">HABITACIÓN CON RUIDO</text>
    <text x="690" y="372" text-anchor="end" font-size="13" fill="#2e483e" font-family="var(--font-pp-mono)" letter-spacing="1.5">AL OTRO LADO</text>
    ${ondas}<g class="dw-layer">${capas}</g>${etiquetas}`;
}

// Grabación real que pasa por un filtro con la curva medida de cada muro. El
// refuerzo de la pista es igual para todos los muros: lo que cambia entre uno y
// otro es exactamente el dato de laboratorio.
class Sonido {
  ctx = new AudioContext();
  buffers = new Map<string, AudioBuffer>();
  filtros = new Map<string, AudioBuffer>();
  fuente: AudioBufferSourceNode | null = null;
  entrada = this.ctx.createGain();
  salida = this.ctx.createGain();
  actual: { conv: ConvolverNode; gain: GainNode } | null = null;

  constructor() {
    this.salida.connect(this.ctx.destination);
  }

  async cargar(p: Pista) {
    const guardado = this.buffers.get(p.id);
    if (guardado) return guardado;
    const r = await fetch(p.archivo);
    const b = await this.ctx.decodeAudioData(await r.arrayBuffer());
    this.buffers.set(p.id, b);
    return b;
  }

  arrancar(buffer: AudioBuffer, refuerzo: number) {
    this.parar();
    this.salida.gain.value = 10 ** (refuerzo / 20);
    const f = this.ctx.createBufferSource();
    f.buffer = buffer;
    f.loop = true;
    f.connect(this.entrada);
    f.start();
    this.fuente = f;
  }

  muro(c: Composicion) {
    const t = this.ctx.currentTime;
    if (!this.filtros.has(c.id)) {
      const h = filtroDelMuro(BANDAS_HZ, c.tl, this.ctx.sampleRate);
      const b = this.ctx.createBuffer(1, h.length, this.ctx.sampleRate);
      b.getChannelData(0).set(h);
      this.filtros.set(c.id, b);
    }
    const conv = this.ctx.createConvolver();
    conv.normalize = false;
    conv.buffer = this.filtros.get(c.id)!;
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(1, t, 0.06);
    this.entrada.connect(conv);
    conv.connect(gain);
    gain.connect(this.salida);
    const previo = this.actual;
    if (previo) {
      previo.gain.gain.setTargetAtTime(0, t, 0.06);
      window.setTimeout(() => {
        this.entrada.disconnect(previo.conv);
        previo.gain.disconnect();
      }, 500);
    }
    this.actual = { conv, gain };
  }

  parar() {
    this.fuente?.stop();
    this.fuente = null;
  }
}

export function initDrywall(root: HTMLElement) {
  const svg = root.querySelector<SVGElement>('[data-dw-svg]');
  const play = root.querySelector<HTMLButtonElement>('[data-dw-play]');
  if (!svg || !play) return;
  const datos: Composicion[] = JSON.parse(root.dataset.composiciones!);
  const pistas: Pista[] = JSON.parse(root.dataset.pistas!);
  const comps = [...root.querySelectorAll<HTMLInputElement>('input[name="dw-comp"]')];
  const radiosPista = [...root.querySelectorAll<HTMLInputElement>('input[name="dw-pista"]')];
  const q = (s: string) => root.querySelector<HTMLElement>(`[data-dw-${s}]`)!;
  const actual = () => datos[Number(comps.find((c) => c.checked)?.value ?? 1)];
  const pista = () => pistas[Number(radiosPista.find((r) => r.checked)?.value ?? 0)];
  const TEXTO_PLAY = play.textContent ?? '';
  let sonido: Sonido | null = null;
  let sonando = false;
  let intento = 0;

  const pintar = () => {
    const c = actual();
    svg.innerHTML = dibujar(c);
    const { rw, obra, bajos } = resumenMuro(c);
    const nivel = Math.round(nivelAlOtroLado(c.tl, pista().espectro, NIVEL_MUSICA));
    q('rw').textContent = String(rw);
    q('bar').style.width = `${Math.min(100, ((rw - 25) / 35) * 100)}%`;
    q('nivel').textContent = `${nivel} dB(A)`;
    q('rw-label').textContent = c.estimado ? 'Índice Rw estimado' : 'Índice Rw de laboratorio';
    q('rango').textContent = c.rangoEnsayos;
    q('obra').textContent = obra;
    q('bajos').textContent = bajos;
    q('fuente').textContent = c.fuente;
    q('texto').textContent = c.texto;
    q('esp').textContent = c.espesor;
    q('uso').textContent = c.uso;
  };
  pintar();
  comps.forEach((c) =>
    c.addEventListener('change', () => {
      pintar();
      if (sonando) sonido?.muro(actual());
    }),
  );

  const detener = () => {
    intento++;
    sonando = false;
    sonido?.parar();
    root.classList.remove('is-playing');
    play.textContent = TEXTO_PLAY;
    play.setAttribute('aria-pressed', 'false');
  };

  const reproducir = async () => {
    const este = ++intento;
    // El contexto se crea dentro del clic: los navegadores lo exigen para sonar
    sonido ??= new Sonido();
    void sonido.ctx.resume();
    sonando = true;
    play.textContent = 'Cargando música…';
    const p = pista();
    const buffer = await sonido.cargar(p);
    if (este !== intento) return;
    sonido.muro(actual());
    sonido.arrancar(buffer, p.refuerzo);
    root.classList.add('is-playing');
    play.textContent = 'Detener música';
    play.setAttribute('aria-pressed', 'true');
  };

  play.addEventListener('click', () => {
    if (sonando) detener();
    else void reproducir().catch(detener);
  });

  radiosPista.forEach((r) =>
    r.addEventListener('change', () => {
      pintar();
      if (sonando) void reproducir().catch(detener);
    }),
  );

  // Nunca seguir sonando fuera de la vista
  new IntersectionObserver((e) => {
    if (sonando && !e.some((x) => x.isIntersecting)) detener();
  }).observe(root);
}
