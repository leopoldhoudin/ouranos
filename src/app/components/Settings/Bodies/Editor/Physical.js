import React, { useState } from 'react';
import styled from 'styled-components';

import { Input } from 'ui';

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

const Physical = ({body, onChange}) => {
  const [errors, setErrors] = useState({mass: null, radius: null});

  const handleChange = attribute => (value, error) => {
    const nextErrors = {...errors, ...{[attribute]: error}};
    setErrors(nextErrors);
    onChange({[attribute]:  value}, nextErrors);
  };

  return (
    <Container>
      <Layout>
        <Input
          type='number'
          full
          label='Mass'
          value={body.mass}
          onChange={handleChange('mass')} />
        <Input
          type='number'
          full
          label='Radius'
          value={body.radius}
          onChange={handleChange('radius')} />
      </Layout>
    </Container>
  );
};

export default Physical;
