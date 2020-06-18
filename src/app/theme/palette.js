import {
  darken as pdarken,
  transparentize as ptransparentize,
  mix as pmix,
  lighten
} from 'polished';

// https://paletton.com/#uid=73F210knBJje7+Jk1VpoPtikFej
const BASE_WHITE = '#f9f9f9';
const BASE_RED = '#e94234';
const BASE_GREEN = '#28b340'
const BASE_BLUE = '#447ccf';
const BASE_YELLOW = '#FFBA43';

export const darken = color => pdarken(0.05, color);

export const transparentize = color => ptransparentize(0.5, color);

export const mix = (firstColor, secondColor) => pmix(0.4, firstColor, secondColor);

export const getColorsNames = () => ([
  'white',
  'red',
  'green',
  'blue',
  'yellow',
]);

export const colorNameToColor = str => {
  switch (str) {
    case 'red':
      return BASE_RED;

    case 'green':
      return BASE_GREEN;

    case 'blue':
      return BASE_BLUE;

    case 'yellow':
      return BASE_YELLOW;

    case 'white':
    default:
      return BASE_WHITE;
  }
};

export default {
  light: {
    black: '',
    gray: '#c3c3c3',
    white: BASE_WHITE,
    red: BASE_RED,
    green: BASE_GREEN,
    blue: BASE_BLUE,
  },

  dark: {
    black: '',
    gray: '#212121',
    white: '',
    red: darken(BASE_RED),
    green: darken(BASE_GREEN),
    blue: darken(BASE_BLUE),
  }
};;

// const LIGHT_GRAY = '#c3c3c3';
// const DARK_GRAY = '#212121';
//
// const LIGHT_BLUE = '#447ccf';
// const DARK_BLUE = softDarken(LIGHT_BLUE);
//
// const LIGHT_RED = '#df5555';
// const DARK_RED = darken(0.1, LIGHT_RED);
