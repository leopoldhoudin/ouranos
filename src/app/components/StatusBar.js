import React from 'react';
import styled, { keyframes } from 'styled-components';

import state from 'state';
import { capitalize } from 'utils';
import { Text } from 'ui';

const shine = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 300px;
  height: ${({ theme: { sizes }}) => sizes.large.pixels};
  padding-left: ${({ theme: { sizes }}) => sizes.large.pixels};
  border-radius: 0 ${({ theme: { sizes } }) => sizes.small.pixels} 0 0;

  background: ${({ theme: { colors } }) => colors.primary.effect.back};

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.0) 0%,
      rgba(255, 255, 255, 0.0) 25%,
      rgba(255, 255, 255, 0.1) 35%,
      rgba(255, 255, 255, 0.05) 45%,
      rgba(255, 255, 255, 0.0) 75%,
      rgba(255, 255, 255, 0.0) 100%
    );
    background-size: 200% 100%;

    animation: ${shine} 1.5s linear infinite;
  }
`;

const StatusBar = () => {
  const [status, setStatus] = state.use('status');
  return status.engine && <Container><Text primary>{capitalize(status.engine)}...</Text></Container>;
}

export default StatusBar;
