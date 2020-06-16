import vector from './vector';
import { addVV, subVV, mulSV } from './operations';

describe('addVV', () => {
  test('works', () => {
    const x = vector.create([1, 2, 3]);
    const y = vector.create([4, -5, 8]);

    const r = addVV(x, y);

    expect(r.get(0)).toBe(5);
    expect(r.get(1)).toBe(-3);
    expect(r.get(2)).toBe(11);
  });
});

describe('subVV', () => {
  test('works', () => {
    const x = vector.create([1, 2, 3]);
    const y = vector.create([4, -5, 8]);

    const r = subVV(x, y);

    expect(r.get(0)).toBe(-3);
    expect(r.get(1)).toBe(7);
    expect(r.get(2)).toBe(-5);
  });
});

describe('mulSV', () => {
  test('works', () => {
    const x = vector.create([1, -2, 3]);
    const r = mulSV(2, x);

    expect(r.get(0)).toBe(2);
    expect(r.get(1)).toBe(-4);
    expect(r.get(2)).toBe(6);
  });
});
