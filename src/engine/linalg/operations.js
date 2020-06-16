import vector from './vector';

export const addVV = (x, y) => vector.create(x.dim, i => x.get(i) + y.get(i));

export const subVV = (x, y) => vector.create(x.dim, i => x.get(i) - y.get(i));

export const mulSV = (a, x) => vector.create(x.dim, i => a * x.get(i));

export const addMM = (X, Y) => null;

export const subMM = (X, Y) => null;

export const mulMM = (X, Y) => null;

export const mulMV = (X, y) => null;

export const hadamard = (x, y) => null;
