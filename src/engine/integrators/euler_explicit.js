import { makeIntegrator } from './factory';

const compute = (params, state) => state;

makeIntegrator('euler-explicit', compute);
