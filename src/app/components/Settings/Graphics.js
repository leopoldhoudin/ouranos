import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import state from 'state';
import { Button, Scroll, CheckBox, Input } from 'ui';
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

    & > *:not(:first-child) {
      margin-top: ${({ theme: { sizes }}) => sizes.small.pixels};
    }
  `,
};

const Footer = styled.div`
  display: flex;
  width: 100%;

  & > ${Button}:not(:last-child) {
    margin-right: ${({ theme: { sizes }}) => sizes.medium.pixels};
  }
`;

const Graphics = ({onClose, ...rest}) => {
  const [graphics, setGraphics] = state.use('graphics');
  const [edited, setEdited] = useState(clone(graphics));
  const [errors, setErrors] = useState(new Object());

  const theme = useContext(ThemeContext);

  const handleChange = name => (value, error) => {
    setEdited({...edited, ...{[name]: value}});
    setErrors({...errors, ...{[name]: error}});
  };

  const handleCancel = () => setEdited(clone(graphics));
  const handleSave = () => {
    setGraphics({slice: edited});
    onClose();
  };

  const hasErrors = Object.values(errors).filter(error => error != null).length > 0;
  return (
    <Base icon='palette' title='Graphics' onClose={onClose} {...rest}>
      <Layout>
        <Body.Container>
          <Scroll vertical height={makeSize(400 + 2 * theme.sizes.large.value)}>
            <Body.Layout>
              <CheckBox
                label='Show axes'
                value={edited.axes}
                onChange={handleChange('axes')} />
              <CheckBox
                label='Bodies texture'
                value={edited.useTexture}
                onChange={handleChange('useTexture')} />
              <Input
                type='number'
                label='Texture segments count'
                value={edited.textureSegmentsCount}
                onChange={handleChange('textureSegmentsCount')} />
              <Input
                type='number'
                label='Bodies scale'
                value={edited.scale}
                onChange={handleChange('scale')} />
            </Body.Layout>
          </Scroll>
        </Body.Container>
        <Footer>
            <Button
              large
              full
              cancel
              text='Cancel'
              onClick={handleCancel} />
            <Button
              large
              full
              validate
              disabled={compare(graphics, edited) || hasErrors}
              text='Save'
              onClick={handleSave} />
        </Footer>
      </Layout>
    </Base>
  );
};

export default Graphics;
