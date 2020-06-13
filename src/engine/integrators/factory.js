const integrators = new Array();

const get = params => {
  const name = params.integrator;
  const integrator = integrators.find(int => int.name == name);
  return {
    name,
    compute: state => integrator.compute(params, state),
  };
};

export const makeIntegrator = (name, compute) => {
  integrators.push({
    name,
    compute,
  });
};

export default {
  get,
};
