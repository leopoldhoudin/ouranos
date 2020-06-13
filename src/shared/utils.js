export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const dampenRegister = new Object();
export const dampen = (key, delay, callback) => {
  const currTimestamp = new Date();
  const lastTimestamp = (key in dampenRegister) ? dampenRegister[key] : new Date(0);

  if (currTimestamp - lastTimestamp > delay) {
    dampenRegister[key] = currTimestamp;
    callback(currTimestamp);
  }
};

export const copyArray = array => array && array.map(val => val);
