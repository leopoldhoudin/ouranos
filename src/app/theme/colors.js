import palette, { darken } from './palette';

const makeBackEffect = (baseBack) => `${darken(baseBack)} linear-gradient(130deg, ${baseBack} 70%, ${darken(baseBack)} 70%)`;

const makeScheme = (fore, back, backHover) => ({
  solid: {
    fore,
    back,

    foreHover: fore,
    backHover,

    foreActive: fore,
    backActive: darken(backHover),
  },

  effect: {
    fore,
    back: makeBackEffect(back),

    foreHover: fore,
    backHover: makeBackEffect(backHover),

    foreActive: fore,
    backActive: darken(backHover),
  },
});

export default {
  standard: makeScheme(palette.light.white, palette.dark.gray, palette.light.blue),
  primary: makeScheme(palette.light.white, palette.light.blue, palette.dark.blue),
  success: makeScheme(palette.light.white, palette.light.green, palette.dark.green),
  alert: makeScheme(palette.light.white, palette.dark.gray, palette.dark.red),
};;
