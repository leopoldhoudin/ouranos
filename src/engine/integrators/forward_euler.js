import { clone } from 'utils';
import { matrix, vector, addVV, subVV, mulSV } from 'linalg';

import { makeIntegrator } from './factory';

const init = (self, params, bodies, physics) => {
  self.velocities = new Array();

  for (let body of bodies) {
    self.velocities.push(body.initialConditions.velocity.x);
    self.velocities.push(body.initialConditions.velocity.y);
    self.velocities.push(body.initialConditions.velocity.z);
  }

  self.G = physics.G;
};

const compute = (self, params, {timestamp, masses, positions, rotations}) => {
  const dt = 0.1;

  const state = {
    timestamp: timestamp + dt, // Should be a parameter of the engine.

    masses: clone(masses),

    positions: clone(positions),
    rotations: clone(rotations),
  };

  const N = masses.length;

  // Brute force, no optim, no numerical consideration.
  // Check the last division, bad conditioning => problems.
  // Should need only triangular "matrix".
  // Optim on computation of element?
  // Instead of vectors & matrices => tensors?? more abstract, more generic, but what about perf?
  const Fx = matrix.square(N);
  const Fy = matrix.square(N);
  const Fz = matrix.square(N);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i == j) {
        Fx.set(i, i, 0.0);
        Fy.set(i, i, 0.0);
        Fz.set(i, i, 0.0);
      } else {
        const dx = subVV(
          vector.create([
            positions[3 * j + 0],
            positions[3 * j + 1],
            positions[3 * j + 2],
          ]),
          vector.create([
            positions[3 * i + 0],
            positions[3 * i + 1],
            positions[3 * i + 2],
          ]),
        );

        // console.log(dx.norm()); // Shows radius is increasing => accumulates error really quickly!

        const d = mulSV(masses[j] / Math.pow(dx.norm(), 3), dx); // Potentially numerically unstable.
        Fx.set(i, j, d.get(0));
        Fy.set(i, j, d.get(1));
        Fz.set(i, j, d.get(2));
      }
    }
  }

  for (let i = 0; i < N; i++) {
    let a = vector.create(3);
    for (let j = 0; j < N; j++) {
      a = addVV(mulSV(self.G, a), vector.create([Fx.get(i, j), Fy.get(i, j), Fz.get(i, j)]));
    }

    state.positions[3 * i + 0] += self.velocities[3 * i + 0] * dt;
    state.positions[3 * i + 1] += self.velocities[3 * i + 1] * dt;
    state.positions[3 * i + 2] += self.velocities[3 * i + 2] * dt;

    self.velocities[3 * i + 0] += a.get(0) * dt;
    self.velocities[3 * i + 1] += a.get(1) * dt;
    self.velocities[3 * i + 2] += a.get(2) * dt;
  }

  // console.log('x',state.positions);
  // console.log('v', self.velocities);

  return state;
};

makeIntegrator('forward-euler', {init, compute});
