import React, { useState } from 'react';
import styled from 'styled-components';

import { Scroll, TextInput, DropDown, Text, Icon } from 'ui';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: ${({ theme: { sizes }}) => sizes.small.pixels};
  }
`;

const Space = styled.div`
  width: ${({ theme: { sizes }}) => sizes.small.pixels};
`;

const General = ({body, onChange}) => {
  return (
    <Container>
      <Scroll>
        <Layout>
          <TextInput
            full
            label='Name'
            value={body.name}
            onChange={name => onChange({name})} />
          <DropDown
            label='Type'
            value={body.type}
            onChange={type => onChange({type})}>
            <DropDown.Item name='planet'>
              <Icon name='planet' /><Space /><Text>Planet</Text>
            </DropDown.Item>
            <DropDown.Item name='star'>
              <Icon name='star' /><Space /><Text>Star</Text>
            </DropDown.Item>
          </DropDown>
        </Layout>
      </Scroll>
    </Container>
  );
};

export default General;
