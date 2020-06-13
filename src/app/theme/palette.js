import {
  darken as pdarken,
  transparentize as ptransparentize,
  lighten
} from 'polished';

export const darken = color => pdarken(0.05, color);

export const transparentize = color => ptransparentize(0.5, color);

// https://paletton.com/#uid=73F210knBJje7+Jk1VpoPtikFej
const BASE_RED = '#e94234';
const BASE_GREEN = '#28b340'
const BASE_BLUE = '#447ccf';
const BASE_YELLOW = '#000';

export default {
  light: {
    black: '',
    gray: '#c3c3c3',
    white: '#f9f9f9',
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
