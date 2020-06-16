const create = (opts, initializer) => {
  const optsArray = (typeof opts == 'object' && Array.isArray(opts));
  const dim = optsArray ? opts.length : opts;

  const data = optsArray ? Float64Array.from(opts) : new Float64Array(dim);

  if (initializer) {
    for (let i = 0; i < dim; i++) {
      data[i] = initializer(i);
    }
  }

  const get = i => data[i];
  const set = (i, v) => data[i] = v;
  const norm = () => {
    let sos = 0.0;
    for (let i = 0; i < dim; i++) {
      sos += data[i] * data[i];
    }
    return Math.sqrt(sos);
  };

  const debug = () => console.log(data);

  return {
    type: 'vector',
    dim,
    get,
    set,
    norm,

    debug,
  };
};

export default {
  create,
};
