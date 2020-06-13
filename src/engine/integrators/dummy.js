import { copyArray } from 'utils';

import { makeIntegrator } from './factory';

const compute = (params, {timestamp, masses, positions, rotations}) => {
  const state = {
    timestamp: timestamp + 60,

    masses: copyArray(masses),

    positions: copyArray(positions),
    rotations: copyArray(rotations),
  };

  state.positions[3] = 50 * Math.cos(0.001 * state.timestamp); // moon pos-x
  state.positions[5] = - 50 * Math.sin(0.001 * state.timestamp); // moon pos-z

  state.rotations[1] += 0.001 // earth rot-y

  return state;
};

makeIntegrator('dummy', compute);
