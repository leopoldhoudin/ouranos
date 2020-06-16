import vector from './vector';

describe('create', () => {
  test('initialize with dimension', () => {
    const v = vector.create(3);

    expect(v).not.toBeNull();
    expect(v.dim).toBe(3);
  });

  test('set & get', () => {
    const v = vector.create(3);

    expect(v.get(1, 1)).toBe(0);

    v.set(1, 3);
    expect(v.get(1)).toBe(3);
  });

  test('initialize with array', () => {
    const v = vector.create([1, 2, 3]);

    expect(v.get(0)).toBe(1);
    expect(v.get(1)).toBe(2);
    expect(v.get(2)).toBe(3);
  });

  test('initialize with initializer', () => {
    const v = vector.create(4, i => i * i);

    expect(v.get(0)).toBe(0);
    expect(v.get(1)).toBe(1);
    expect(v.get(2)).toBe(4);
    expect(v.get(3)).toBe(9);
  });
});
