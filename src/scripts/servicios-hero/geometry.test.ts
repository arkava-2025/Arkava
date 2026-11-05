import { test } from 'node:test';
import assert from 'node:assert/strict';
import { insetClip, polygonClip, bands, gridCells, trowelStrokes, trowelMask } from './geometry.ts';

test('insetClip', () => {
  assert.equal(insetClip({ x0: 10, y0: 20, x1: 60, y1: 90 }), 'inset(20% 40% 10% 10%)');
});

test('polygonClip', () => {
  assert.equal(
    polygonClip([
      [0, 0],
      [50, 10],
    ]),
    'polygon(0% 0%, 50% 10%)',
  );
});

test('bands y: 4 franjas de piso', () => {
  const r = bands('y', [7, 40, 65, 89, 100], [30.5, 84.5]);
  assert.equal(r.length, 4);
  assert.deepEqual(r[0], { x0: 30.5, y0: 7, x1: 84.5, y1: 40 });
});

test('bands x: franjas verticales', () => {
  const r = bands('x', [0, 10, 30], [5, 95]);
  assert.deepEqual(r[1], { x0: 10, y0: 5, x1: 30, y1: 95 });
});

test('gridCells rows ordena por fila', () => {
  const r = gridCells([0, 50, 100], [0, 50, 100], 'rows');
  assert.equal(r.length, 4);
  assert.deepEqual(r[1], { x0: 50, y0: 0, x1: 100, y1: 50 });
});

test('gridCells cols ordena por columna', () => {
  const r = gridCells([0, 50, 100], [0, 50, 100], 'cols');
  assert.deepEqual(r[1], { x0: 0, y0: 50, x1: 50, y1: 100 });
});

test('trowelStrokes deterministas y dentro del área', () => {
  const area = { x0: 16, y0: 8, x1: 100, y1: 94 };
  const a = trowelStrokes(area, 7, 3);
  assert.deepEqual(a, trowelStrokes(area, 7, 3));
  assert.equal(a.length, 7);
  for (const s of a) {
    assert.ok(s.cx >= area.x0 && s.cx <= area.x1 && s.cy >= area.y0 && s.cy <= area.y1);
  }
});

test('trowelStrokes cubren toda el área al radio completo', () => {
  const area = { x0: 25.5, y0: 3, x1: 95.5, y1: 86.5 };
  const s = trowelStrokes(area, 9, 11);
  for (let x = area.x0; x <= area.x1; x += 2) {
    for (let y = area.y0; y <= area.y1; y += 2) {
      const covered = s.some((e) => ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2 <= 1);
      assert.ok(covered, `sin cubrir ${x},${y}`);
    }
  }
});

test('trowelMask usa variables por trazo', () => {
  const m = trowelMask(3);
  assert.equal(m.split('radial-gradient').length - 1, 3);
  assert.ok(m.includes('var(--svh-rx2)'));
});
