import React, { useState } from 'react';
import styled from 'styled-components';

import state from 'state';
import { Button, Text } from 'ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsLayout = styled.div`
  display: flex;
`;

const DisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${({ theme: { sizes }}) => sizes.large.pixels};

  background: ${({ theme: { colors }}) => colors.standard.solid.back};
`;

const SpeedControls = () => {
  const [simulation, setSimulation] = state.use('simulation');
  const [prevSpeed, setPrevSpeed] = useState(simulation.speed);
  const speed = simulation.speed;

  const handleToggle = () => {
    if (speed !== null) {
      // set pause
      setSimulation({path: 'speed', value: null});
    } else {
      // resume
      setSimulation({path: 'speed', value: prevSpeed || 0});
    }
  };

  const handleScaleSpeed = factor => () => {
    const value = factor + speed;
    if (value !== null) {
      setPrevSpeed(value);
      setSimulation({path: 'speed', value});
    }
  };

  const display = (speed !== null) ? `\u00D7${Math.pow(10, speed)}` : 'paused';

  return (
    <Container>
      <ButtonsLayout>
        <Button solid icon='double-left' onClick={handleScaleSpeed(-2)} />
        <Button solid icon='left' onClick={handleScaleSpeed(-1)} />
        <Button
          solid
          icon={(speed !== null) ? 'pause' : 'play'}
          onClick={handleToggle} />
        <Button solid icon='right' onClick={handleScaleSpeed(1)} />
        <Button solid icon='double-right' onClick={handleScaleSpeed(2)} />
      </ButtonsLayout>
      <DisplayContainer>
        <Text>{display}</Text>
      </DisplayContainer>
    </Container>
  );
};

export default SpeedControls;
