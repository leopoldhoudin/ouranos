const serializeState = state => {
  const serialized = new Float64Array(1 + (2 * state.positions.length));

  serialized[0] = state.timestamp;

  state.positions.forEach(
    (val, pos) => serialized[1 + (6 * Math.floor(pos / 3)) + (pos % 3)] = val
  );
  state.rotations.forEach(
    (val, pos) => serialized[4 + (6 * Math.floor(pos / 3)) + (pos % 3)] = val
  );

  return serialized;
};

export default {
  serializeState,
};
