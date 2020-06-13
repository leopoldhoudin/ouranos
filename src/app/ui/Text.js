import React from 'react';
import styled, { css } from 'styled-components';

const Text = ({className, children}) => <div className={className}>{children}</div>;

export default styled(Text)`
  display: flex;
  height: ${({ theme: { sizes } }) => sizes.medium.pixels};

  font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
  line-height: ${({ theme: { sizes } }) => sizes.medium.pixels};
  font-weight: ${({ bold }) => bold ? css`bold` : css`normal`};

  color: ${({ theme: { colors } }) => colors.standard.effect.fore};
  ${({ primary }) => primary && css`
    color: ${({ theme: { colors } }) => colors.primary.effect.fore};
  `};

  user-select: none;
`;
