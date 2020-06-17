import palette, { darken, mix } from './palette';

const makeBackEffect = (baseBack) => `${darken(baseBack)} linear-gradient(130deg, ${baseBack} 70%, ${darken(baseBack)} 70%)`;

const makeScheme = (fore, back, backHover) => ({
  solid: {
    fore,
    back,

    foreHover: fore,
    backHover,

    foreActive: fore,
    backActive: darken(backHover),

    foreDisabled: mix(fore, palette.dark.gray),
    backDisabled: mix(backHover, palette.dark.gray),
  },

  effect: {
    fore,
    back: makeBackEffect(back),

    foreHover: fore,
    backHover: makeBackEffect(backHover),

    foreActive: fore,
    backActive: darken(backHover),

    foreDisabled: mix(fore, palette.dark.gray),
    backDisabled: makeBackEffect(mix(
      backHover,
      palette.dark.gray,
    )),
  },
});

export default {
  standard: makeScheme(palette.light.white, palette.dark.gray, palette.light.blue),
  primary: makeScheme(palette.light.white, palette.light.blue, palette.dark.blue),
  success: makeScheme(palette.light.white, palette.light.green, palette.dark.green),
  alert: makeScheme(palette.light.white, palette.dark.gray, palette.dark.red),
};;
