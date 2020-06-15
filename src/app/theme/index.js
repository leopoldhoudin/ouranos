import palette from './palette';
import colors from './colors';
import sizes from './sizes';

const theme = {
  palette,
  colors,
  sizes,

  radius: `${sizes.small.pixels} 0 0 0`,
};

export default theme ;
export { darken, transparentize, mix } from './palette';
export { makeSize, scale } from './sizes';
