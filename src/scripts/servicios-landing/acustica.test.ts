import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BANDAS_HZ, COMPOSICIONES, PISTAS } from '../../lib/servicios/drywall-composiciones.ts';
import { calcularCtr, calcularRw, filtroDelMuro, nivelAlOtroLado, perdidaEn } from './acustica.ts';

const respuesta = (h: Float32Array, f: number, sr: number) => {
  let re = 0;
  let im = 0;
  for (let i = 0; i < h.length; i++) {
    re += h[i] * Math.cos((2 * Math.PI * f * i) / sr);
    im -= h[i] * Math.sin((2 * Math.PI * f * i) / sr);
  }
  return 20 * Math.log10(Math.hypot(re, im));
};

// La norma admite hasta 32 dB de déficit total: la curva sube 2 dB (2 × 16 bandas)
test('Rw de la curva de referencia ISO 717-1 es 54', () => {
  const ref = [33, 36, 39, 42, 45, 48, 51, 52, 53, 54, 55, 56, 56, 56, 56, 56];
  assert.equal(calcularRw([0, 0, 0, ...ref, 0, 0, 0]), 54);
});

test('los índices Rw de cada muro son los esperados', () => {
  const rw = Object.fromEntries(COMPOSICIONES.map((c) => [c.id, calcularRw(c.tl)]));
  assert.deepEqual(rw, { ladrillo: 45, sencillo: 39, lana16: 46, lana: 43, unlado: 48, doble: 52 });
});

test('la corrección Ctr de los muros ensayados baja el índice para sonidos graves', () => {
  for (const c of COMPOSICIONES.filter((x) => !x.estimado)) {
    const ctr = calcularCtr(c.tl);
    assert.ok(ctr <= -10 && ctr >= -15, `${c.id}: ${ctr}`);
  }
});

test('la lana sube el índice 7 dB con la misma placa', () => {
  const rw = (id: string) => calcularRw(COMPOSICIONES.find((c) => c.id === id)!.tl);
  assert.equal(rw('lana16') - rw('sencillo'), 7);
});

test('el filtro de audio reproduce la curva medida', () => {
  const sr = 48000;
  for (const c of COMPOSICIONES) {
    const h = filtroDelMuro(BANDAS_HZ, c.tl, sr);
    for (const f of [160, 250, 500, 1000, 2000, 4000]) {
      const esperado = -perdidaEn(f, BANDAS_HZ, c.tl);
      assert.ok(Math.abs(respuesta(h, f, sr) - esperado) < 1.5, `${c.id} a ${f} Hz`);
    }
  }
});

test('el nivel que llega baja cuando el muro aísla más', () => {
  const nivel = (id: string) => nivelAlOtroLado(COMPOSICIONES.find((c) => c.id === id)!.tl, PISTAS[0].espectro, 80);
  assert.ok(nivel('sencillo') > nivel('lana'));
  assert.ok(nivel('lana') > nivel('unlado'));
  assert.ok(nivel('unlado') > nivel('doble'));
});
