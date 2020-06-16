export matrix from './matrix';
export vector from './vector';

export {
  addVV,
  subVV,
  mulSV,
} from './operations';

// const hadamard = (x, y) => {
//   if (x.type != 'matrix' || y.type != 'matrix') throw new Exception('Must be matrices.');
//   if (x.dim != y.dim) throw Exception('Matrices must have same dimension.');
//
//   const z = square(x.dim);
//   // May be worthwile to be optimized! In orther to use the underlying structure
//   // of the matrices :p
//   for (let i = 0; i < x.dim; i++) {
//     for (let j = 0; j < x.dim; j++) {
//       z.set(i, j, x.get(i, j) * y.get(i, j));
//     }
//   }
//
//   return z;
// };
