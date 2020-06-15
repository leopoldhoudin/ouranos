import React, { useState } from 'react';
import styled from 'styled-components';

import state from 'state';
import { Scroll, Input, DropDown, Text, Icon } from 'ui';

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
  const [bodies, _] = state.use('bodies');
  const [errors, setErrors] = useState({name: null, type: null});

  const validateName = name => {
    if (name == '') return 'Body name should not be empty.';

    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].uuid != body.uuid
        && bodies[i].name.toUpperCase() == name.toUpperCase()) {
        return 'There is already another body with the same name.'
      }
    }

    return null;
  }

  const handleChange = attribute => (value, error) => {
    const nextErrors = {...errors, ...{[attribute]: error}};
    setErrors(nextErrors);
    onChange({[attribute]:  value}, nextErrors);
  };

  return (
    <Container>
      <Layout>
        <Input
          full
          label='Name'
          value={body.name}
          onChange={handleChange('name')}
          validator={validateName} />
        <DropDown
          label='Type'
          value={body.type}
          onChange={handleChange('type')}>
          <DropDown.Item name='planet'>
            <Icon name='planet' /><Space /><Text>Planet</Text>
          </DropDown.Item>
          <DropDown.Item name='star'>
            <Icon name='star' /><Space /><Text>Star</Text>
          </DropDown.Item>
        </DropDown>
      </Layout>
    </Container>
  );
};

export default General;
