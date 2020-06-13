import { scale } from 'theme';

export const getHeight = ({sizes}, large) => (
  (large && scale(sizes.large, 2).pixels)
  || sizes.large.pixels
);
