import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import state from 'state';
import { scale } from 'theme';
import { Text } from 'ui';

const format2 = value => value.toString().padStart(2, '0');

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: ${({ theme: { sizes }}) => scale(sizes.large, 2).pixels};

  background: ${({ theme: { colors }}) => colors.standard.effect.back};
`;

const Layout = styled.div`
  display: flex;

  height: ${({ theme: { sizes }}) => sizes.large.pixels};
`;

const Label = styled(({className, text}) => (
  <div className={className}>
    <Text>{text}</Text>
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ theme: { sizes }}) => sizes.huge.pixels};
`;

const Test = styled(({className, text}) => (
  <div className={className}>
    <Text>{text}</Text>
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
`;

const TimestampDisplay = () => {
  const [simulation, setSimulation] = state.use('simulation');
  const dt = DateTime.fromSeconds(simulation.timestamp);

  return (
    <Container>
      <Layout>
        <Label text='Year' />
        <Label text='Month' />
        <Label text='Day' />
        <Label text='Hour' />
        <Label text='Min' />
        <Label text='Sec' />
      </Layout>
      <Layout>
        <Label text={dt.year} />
        <Label text={format2(dt.month)} />
        <Label text={format2(dt.day)} />
        <Label text={format2(dt.hour)} />
        <Label text={format2(dt.minute)} />
        <Label text={format2(dt.second)} />
      </Layout>
    </Container>
  );
};

export default TimestampDisplay;
