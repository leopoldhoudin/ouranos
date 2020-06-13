export const makeSize = (value) => ({ value, pixels: `${value}px` });

export const scale = (size, scale) => ({
  value: scale * size.value,
  pixels: `${scale * size.value}px`,
});

export default {
  tiny: makeSize(3),
  small: makeSize(5),
  medium: makeSize(10),
  large: makeSize(20),
  huge: makeSize(50),

  font: {
    medium: makeSize(12),
  },
};;
