import { capitalize, clone, sort, iter } from './utils';

describe('capitalize', () => {
  test('on simple string', () => {
    expect(capitalize('toto')).toBe('Toto');
  });

  test('on already capitalized', () => {
    expect(capitalize('Toto')).toBe('Toto');
  });

  test('does not change other capitalization', () => {
    expect(capitalize('toto & Alfred')).toBe('Toto & Alfred');
  });
});

describe('clone', () => {
  test('clone array', () => {
    const a = [1, 2, 3];
    const c = clone(a);

    expect(c).not.toBe(a);
    expect(c).toEqual(a);
  });

  test('clone object', () => {
    const o = {foo: 'bar', baz: {qux: 'egg'}};
    const c = clone(o);

    expect(c).not.toBe(o);
    expect(c).toEqual(o);
  });
});

describe('sort', () => {
  test('on object', () => {
    const a = [{value: 1}, {value: 3}, {value: 2}];
    const s = sort(a, o => o.value);

    expect(s).not.toBe(a);
    expect(s).toEqual([{value: 1}, {value: 2}, {value: 3}]);
  });
});

describe('iter', () => {
  describe('range', () => {
    test('without callback', () => {
      expect(iter.range([0, 5])).toEqual([0, 1, 2, 3, 4]);
      expect(iter.range([3, 7])).toEqual([3, 4, 5, 6]);
    });

    test('without callback', () => {
      let values1 = new Array();
      expect(iter.range([0, 5], i => values1.push(i))).toBeNull();
      expect(values1).toEqual([0, 1, 2, 3, 4]);

      let values2 = new Array();
      expect(iter.range([3, 7], i => values2.push(i))).toBeNull();
      expect(values2).toEqual([3, 4, 5, 6]);
    });
  });
});
