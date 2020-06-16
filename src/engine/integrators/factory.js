const integrators = new Array();

const get = params => {
  const self = new Object();
  const name = params.integrator;

  const integrator = integrators.find(int => int.name == name);
  const methods = integrator.methods;

  return {
    name,
    init: methods.init ? bodies => methods.init(self, params, bodies) : () => {},
    compute: state => methods.compute(self, params, state),
  };
};

export const makeIntegrator = (name, methods) => {
  integrators.push({
    name,
    methods,
  });
};

export default {
  get,
};
