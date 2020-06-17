import React from 'react';
import styled from 'styled-components';

import { CheckBox, Icon, Text } from 'ui';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  & > *:not(:first-child) {
    margin-top: ${({ theme: { sizes }}) => sizes.small.pixels};
  }
`;

const ForwardEuler = ({params, onChange}) => {
  const handleChange = name => value => onChange({...params, ...{[name]: value}});

  return (
    <Layout>
      <CheckBox
        label='Use acceleration to correct position (not implemented)'
        value={params ? params.order2 : false}
        onChange={handleChange('order2')} />
    </Layout>
  );
};

export default ForwardEuler;
