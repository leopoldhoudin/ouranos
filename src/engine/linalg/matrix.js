const square = (opts, initializer) => {
  const optsArray = (typeof opts == 'object' && Array.isArray(opts));
  const dim = optsArray ? opts.length : opts;

  const data = optsArray
    ? Float64Array.from(opts.flat())
    : new Float64Array(dim * dim);

  if (initializer) {
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        data[i * dim + j] = initializer(i, j);
      }
    }
  }

  const get = (i, j) => data[i * dim + j];
  const set = (i, j, v) => data[i * dim + j] = v;

  const debug = () => console.log(data);

  return {
    type: 'matrix',
    dim,
    get,
    set,

    debug,
  };
};

export default {
  square,
};
