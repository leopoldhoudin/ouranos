import React from 'react';
import styled from 'styled-components';

import { scale } from 'theme';
import { startViewer, stopViewer } from 'graphics';

const getSize = theme => scale(theme.sizes.huge, 3).pixels;

const Container = styled.div`
  width: ${({ theme}) => getSize(theme)};
  height: ${({ theme}) => getSize(theme)};
  box-sizing: border-box;

  background: black;

  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme: { colors } }) => colors.standard.solid.back};
`;

const View = styled.div`
  width: 100%;
  height: 100%;
`;

const Viewer = ({body, requestOnStop}) => {
  const stop = () => {
    stopViewer();
  }

  const setRef = ref => {
    if (ref) {
      startViewer(ref, body);
      requestOnStop(stop);
    }
  };

  return (
    <Container>
      <View ref={setRef} />
    </Container>
  );
};

export default Viewer;
