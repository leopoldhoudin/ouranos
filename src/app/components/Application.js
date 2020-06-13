import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { StateManager } from 'state';
import theme from 'theme';

import Interface from './Interface';
import Scene from './Scene';

const Application = () => {
  return (
    <ThemeProvider theme={theme}>
      <StateManager>
        <Interface />
        <Scene />
      </StateManager>
    </ThemeProvider>
  );
};

export default Application;
