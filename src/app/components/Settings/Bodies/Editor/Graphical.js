import React from 'react';
import styled from 'styled-components';

import { DropDown, Text } from 'ui';
import { getColorsNames } from 'theme';

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
        <DropDown.Item name='earth'><Text>earth</Text></DropDown.Item>
        <DropDown.Item name='moon'><Text>moon</Text></DropDown.Item>
        <DropDown.Item name='sun'><Text>sun</Text></DropDown.Item>
      </DropDown>
      <DropDown
        label='Color'
        value={body.color}
        onChange={color => onChange({color})} >
        {
          getColorsNames().map(colorName => (
            <DropDown.Item name={colorName} key={colorName}>
              <Text>{colorName}</Text>
            </DropDown.Item>
          ))
        }
      </DropDown>
    </Layout>
  </Container>
);

export default Graphical;
