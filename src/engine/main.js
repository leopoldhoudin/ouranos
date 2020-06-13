import types from 'types';
import serializer from 'serializer';
import integrators from 'integrators';

const MAIN_LOOP_COOLDOWN = 10;

const self = {
  requested_frames_count: 0,
  integrator: null,
  lastState: null,
};

const main = () => {
  if (self.requested_frames_count > 0) {
    const newState = self.integrator.compute(self.lastState);
    self.lastState = newState;

    const data = serializer.serializeState(newState);
    postMessage(
      {type: types.frame_response, data: data.buffer},
      [data.buffer],
    );
    self.requested_frames_count--;

    setTimeout(main, 1); // Avoid call stack size exceeded
  } else {
    setTimeout(main, MAIN_LOOP_COOLDOWN);
  }
};

const init = ({params, timestamp, bodies}) => {
  self.integrator = integrators.get(params);

  const state = {
    timestamp,

    masses: new Array(),
    positions: new Array(),
    rotations: new Array(),
  };

  bodies.forEach(body => {
    state.masses.push(body.mass);

    state.positions.push(body.initialConditions.position.x);
    state.positions.push(body.initialConditions.position.y);
    state.positions.push(body.initialConditions.position.z);

    state.rotations.push(body.initialConditions.rotation.x);
    state.rotations.push(body.initialConditions.rotation.y);
    state.rotations.push(body.initialConditions.rotation.z);
  });

  self.lastState = state;
};

const handleMessage = event => {
  if (event.type) {
    switch (event.type) {
      case types.init:
        console.debug('back-engine:init', event.params, event.timestamp, event.bodies);
        init(event);
        break;

      case types.clear_requests:
        console.debug('back-engine:clear-requests');
        self.requested_frames_count = 0;
        break;

      case types.frames_request:
        console.debug('back-engine:frames-request', event.count);
        self.requested_frames_count += event.count;
        break;

      default:
        // NOP
    }
  }
};

onmessage = event => handleMessage(event.data);

main();
