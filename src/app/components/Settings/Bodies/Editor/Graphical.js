import React from 'react';
import styled from 'styled-components';

import { DropDown, Text } from 'ui';

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

const Graphical = ({body, onChange}) => (
  <Container>
    <Layout>
      <DropDown
        label='Texture'
        value={body.texture}
        onChange={texture => onChange({texture})} >
        <DropDown.Item name='earth'><Text>Earth</Text></DropDown.Item>
        <DropDown.Item name='moon'><Text>Moon</Text></DropDown.Item>
        <DropDown.Item name='sun'><Text>Sun</Text></DropDown.Item>
      </DropDown>
    </Layout>
  </Container>
);

export default Graphical;
