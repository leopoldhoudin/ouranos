import React from 'react';
import styled, { css } from 'styled-components';

const Scroll = ({className, children}) => (
  <div className={className}>
    {children}
  </div>
);

export default styled(Scroll)`
  ${({ height }) => height && css`height: ${height.pixels};`}
  ${({ width }) => width && css`width: ${width.pixels};`}

  ${({ vertical }) => vertical && css`overflow-y: auto;`}
  ${({ horizontal }) => horizontal && css`overflow-x: scroll;`}

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme: { colors }}) => colors.standard.solid.back};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme: { colors }}) => colors.standard.solid.backHover};
  }
`;
