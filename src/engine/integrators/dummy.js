import { clone } from 'utils';

import { makeIntegrator } from './factory';

const compute = (self, {timestamp, masses, positions, rotations}) => {
  const state = {
    timestamp: timestamp + 60,

    masses: clone(masses),

    positions: clone(positions),
    rotations: clone(rotations),
  };

  state.positions[3] = 50 * Math.cos(0.001 * state.timestamp); // moon pos-x
  state.positions[5] = - 50 * Math.sin(0.001 * state.timestamp); // moon pos-z

  state.rotations[1] += 0.001 // earth rot-y

  return state;
};

makeIntegrator('dummy', {compute});
