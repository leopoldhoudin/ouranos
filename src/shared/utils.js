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

export const clone = obj => {
  if (obj instanceof Array) return obj.map(val => val);
  if (obj instanceof Object) return JSON.parse(JSON.stringify(obj));
};

export const sort = (array, getter) => [...array].sort((a, b) => getter(a) > getter(b) ? 1 : -1);

export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });;
};
