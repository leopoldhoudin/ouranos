const buffer = new Array();

export default {
  // Gets and consumes the next frame.
  // Frame won't be in buffer anymore.
  pop: () => buffer.shift(),

  // Gets the next frame.
  // Frame will still be in buffer.
  peek: () => buffer.length > 0 ? buffer[0] : null,

  // Pushes a frame into the buffer.
  push: frame => buffer.push(frame),

  // Clears all frames in the buffer.
  clear: () => {buffer.splice(0, buffer.length)},

  size: () => buffer.length,
};;
