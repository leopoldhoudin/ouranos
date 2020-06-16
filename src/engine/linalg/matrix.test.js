import matrix from './matrix';

describe('square', () => {
  test('initialize with dimension', () => {
    const m = matrix.square(3);

    expect(m).not.toBeNull();
    expect(m.dim).toBe(3);
  });

  test('set & get', () => {
    const m = matrix.square(3);

    expect(m.get(1, 1)).toBe(0);

    m.set(1, 1, 3);
    expect(m.get(1, 1)).toBe(3);
  });

  test('initialize with multi-array', () => {
    const m = matrix.square([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(m.get(0, 0)).toBe(1);
    expect(m.get(0, 1)).toBe(2);
    expect(m.get(0, 2)).toBe(3);
    expect(m.get(1, 0)).toBe(4);
    expect(m.get(1, 1)).toBe(5);
    expect(m.get(1, 2)).toBe(6);
    expect(m.get(2, 0)).toBe(7);
    expect(m.get(2, 1)).toBe(8);
    expect(m.get(2, 2)).toBe(9);
  });

  test('initialize with initializer', () => {
    const m = matrix.square(2, (i, j) => i * (j + 1));

    expect(m.get(0, 0)).toBe(0);
    expect(m.get(0, 1)).toBe(0);
    expect(m.get(1, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(2);
  });
});
