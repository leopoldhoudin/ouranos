import React from 'react';
import styled from 'styled-components';

import SpeedControls from './SpeedControls';
import TimestampDisplay from './TimestampDisplay';

const Layout = styled.div`
  display: flex;
`;

const Player = () => (
  <Layout>
    <SpeedControls />
    <TimestampDisplay />
  </Layout>
);

export default Player;
