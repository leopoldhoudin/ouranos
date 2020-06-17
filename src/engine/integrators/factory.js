const integrators = new Array();

const get = params => {
  const self = new Object();
  const name = params.integrator;

  const integrator = integrators.find(int => int.name == name);
  const methods = integrator.methods;

  const init = methods.init
    ? (bodies, physics) => methods.init(self, params, bodies, physics)
    : () =>  null;

  const compute = state => methods.compute(self, state);

  return {
    name,
    init,
    compute,
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
