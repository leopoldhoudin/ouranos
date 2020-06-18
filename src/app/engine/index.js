import types from 'types';
import state from 'state';
import { dampen } from 'utils';

import buffer from './buffer';

const self = {
  status: null,
  worker: null,
  requested_frames_count: 0,
  prevFrame: null,
  nextFrame: null,
};

const MAIN_LOOP_COOLDOWN = 10;
const FRAMES_PER_REQUEST = 200;
const MIN_BUFFER_SIZE_FOR_REQUEST = 100;
const MAX_REQUESTED_FRAMES = 10;

const setStatus = status => state.set('status', 'engine', status);

const clearStatus = status => (status == state.get('status').engine) && state.set('status', 'engine', null);

const init = () => {
  setStatus('initializing');
  self.worker = new Worker('engine.js');
  self.worker.onmessage = event => handleMessage(event.data);
  clearStatus('initializing');
};

const start = () => {
  setStatus('starting');
  clearRequests();
  initEngine(
    state.get('engine'),
    state.get('simulation').timestamp,
    state.get('bodies'),
    state.get('physics'),
  );
  setTimeout(main, 2 * MAIN_LOOP_COOLDOWN);
};

const main = () => {
  clearStatus('starting');
  if (buffer.size() < MIN_BUFFER_SIZE_FOR_REQUEST) {
    dampen(
      'engine:main:request-frames',
      1000,
      () => requestFrames(FRAMES_PER_REQUEST)
    );
  }

  setTimeout(main, MAIN_LOOP_COOLDOWN);
};

const initEngine = (params, timestamp, bodies, physics) => {
  self.prevFrame = null;
  self.nextFrame = null;
  sendMessage(types.init, {params, timestamp, bodies, physics});
};

const clearRequests = () => {
  sendMessage(types.clear_requests);
  self.requested_frames_count = 0;
}

const requestFrames = count => {
  if (self.requested_frames_count + count > MAX_REQUESTED_FRAMES) {
    count -= self.requested_frames_count;
  }

  if (count > 0) {
      self.requested_frames_count += count;
      sendMessage(types.frames_request, {count});
  }
};

const sendMessage = (type, data) => {
  self.worker.postMessage({...data, type});
}

const handleMessage = event => {
  if (event.type) {
    switch (event.type) {
      case types.frame_response:
        handleFrame(event.data);
        break;
    }
  }
};

const handleFrame = data => {
  self.requested_frames_count--;

  const packed = new Float64Array(data);
  const frame = {
    timestamp: packed[0],
    bodies: new Array(),
  };

  for (let i = 0; i < (packed.length - 1) / 6; i++) {
    frame.bodies.push({
      position: {
        x: packed[1 + (i * 6)],
        y: packed[2 + (i * 6)],
        z: packed[3 + (i * 6)],
      },
      rotation: {
        x: packed[4 + (i * 6)],
        y: packed[5 + (i * 6)],
        z: packed[6 + (i * 6)],
      },
    });
  }

  // console.log(frame);
  if (buffer.push(frame) > MIN_BUFFER_SIZE_FOR_REQUEST) {
    clearStatus('buffering');
  }
};

const getFrameAt = timestamp => {
  if (self.prevFrame == null && self.nextFrame == null) {
    if (buffer.size() < 2) {
      return null ;
    } else {
      self.prevFrame = buffer.pop();
      self.nextFrame = buffer.pop();
    }
  }

  while (self.nextFrame.timestamp < timestamp) {
    const checkFrame = buffer.pop();
    if (checkFrame) {
      // there is a next available frame
      self.prevFrame = self.nextFrame;
      self.nextFrame = checkFrame;
    } else {
      setStatus('buffering');
      return null;
    }
  }

  const frame = {
    timestamp,
    bodies: new Array(),
  }

  const bodies = state.get('bodies');

  for (let i = 0; i < self.prevFrame.bodies.length; i++) {
    frame.bodies.push({
      uuid: bodies[i].uuid,
      position: {
        x: linearInterpol(timestamp, self.prevFrame, self.nextFrame, i, 'position.x'),
        y: linearInterpol(timestamp, self.prevFrame, self.nextFrame, i, 'position.y'),
        z: linearInterpol(timestamp, self.prevFrame, self.nextFrame, i, 'position.z'),
      },
      rotation: {
        x: linearInterpol(timestamp, self.prevFrame, self.nextFrame, i, 'rotation.x'),
        y: linearInterpol(timestamp, self.prevFrame, self.nextFrame, i, 'rotation.y'),
        z: linearInterpol(timestamp, self.prevFrame, self.nextFrame, i, 'rotation.z'),
      },
    })
  }

  return frame;
};

const linearInterpol = (timestamp, prevFrame, nextFrame, bodyIndex, path) => {
  const parts = path.split('.');
  const prevT = prevFrame.timestamp;
  const nextT = nextFrame.timestamp;
  const prevX = prevFrame.bodies[bodyIndex][parts[0]][parts[1]];
  const nextX = nextFrame.bodies[bodyIndex][parts[0]][parts[1]];
  return  prevX + (((timestamp - prevT) / (nextT - prevT)) * (nextX - prevX));
};

export default {
  init,
  start,
  getFrameAt,
};;
