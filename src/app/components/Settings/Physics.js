import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import state from 'state';
import { Button, Scroll, Input } from 'ui';
import { makeSize } from 'theme';
import { clone, compare } from 'utils';

import Base from './Base'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = {
  Container:  styled.div`
    height: ${({ theme: { sizes }}) => makeSize(400 + 2 * sizes.large.value).pixels};
  `,

  Layout: styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,
};

const Footer = styled.div`
  display: flex;

  width: 100%;
`;

const Physics = ({...rest}) => {
  const theme = useContext(ThemeContext);

  const [physics, setPhysics] = state.use('physics');
  const [edited, setEdited] = useState(clone(physics));

  const handleChange = name => value => setEdited({...edited, ...{[name]: value}});

  const handleSave = () => setPhysics({slice: edited});

  return (
    <Base icon='sigma' title='Physics' {...rest}>
      <Layout>
        <Body.Container>
          <Scroll vertical height={makeSize(400 + 2 * theme.sizes.large.value)}>
            <Body.Layout>
              <Input
                type='number'
                full
                label='G (universal constant of gravitation)'
                value={edited.G}
                onChange={handleChange('G')} />
            </Body.Layout>
          </Scroll>
        </Body.Container>
        <Footer>
          <Button
            large
            full
            validate
            disabled={compare(physics, edited)}
            text='Save'
            onClick={handleSave} />
        </Footer>
      </Layout>
    </Base>
  );
};

export default Physics;
