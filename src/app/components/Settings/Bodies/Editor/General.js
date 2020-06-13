import React, { useState } from 'react';
import styled from 'styled-components';

import { Scroll, TextInput } from 'ui';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const General = ({body, onChange}) => {
  return (
    <Container>
      <Scroll>
        <Layout>
          <TextInput full label='Name' value={body.name} onChange={name => onChange({name})} />
        </Layout>
      </Scroll>
    </Container>
  );
};

export default General;
