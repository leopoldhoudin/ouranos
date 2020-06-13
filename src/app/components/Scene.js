import React from 'react';
import styled from 'styled-components';

import engine from 'engine';
import graphics from 'graphics';

const Container = styled.div`
  z-index: 1;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: black;
`;

const Scene = () => {
  const setRef = ref => {
    if (ref) {
      engine.init();
      graphics.init(ref);

      setTimeout(() => {
        engine.start();
        graphics.start();
      }, 10);
    }
  };

  return (
    <Container ref={setRef} />
  );
};

export default Scene;
