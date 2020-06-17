import React, { useState, useContext, cloneElement } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Scroll, Button, DropDown, Text, Input } from 'ui';
import { makeSize } from 'theme';
import { clone, compare } from 'utils';
import state from 'state';

import Base from '../Base'
import Keplerian from './Keplerian';
import ForwardEuler from './ForwardEuler';
import BackwardEuler from './BackwardEuler';

const IntegratorsPanels = {
  keplerian: <Keplerian />,
  'forward-euler': <ForwardEuler />,
  'backward-euler': <BackwardEuler />,
};

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

const Engine = ({onClose, ...rest}) => {
  const [engine, setEngine] = state.use('engine');
  const [edited, setEdited] = useState(clone(engine));
  const [errors, setErrors] = useState(new Object());

  const theme = useContext(ThemeContext);

  const handleChange = name => (value, error) => {
    setEdited({...edited, ...{[name]: value}});
    setErrors({...errors, ...{[name]: error}});
  };

  const handleCancel = () => setEdited(clone(engine));
  const handleSave = () => {
    setEngine({slice: edited,});
    onClose();
  };

  const hasErrors = Object.values(errors).filter(error => error != null).length > 0;

  return (
    <Base icon='function' title='Engine' onClose={onClose} {...rest}>
      <Body.Container>
        <Scroll vertical height={makeSize(400 + 2 * theme.sizes.large.value)}>
          <Body.Layout>
            <DropDown
              label='Integrator'
              value={edited.integrator}
              onChange={handleChange('integrator')}>
                <DropDown.Item name='keplerian'><Text>Keplerian</Text></DropDown.Item>
                <DropDown.Item name='forward-euler'><Text>Forward Euler</Text></DropDown.Item>
                <DropDown.Item name='backward-euler'><Text>Backward Euler</Text></DropDown.Item>
              </DropDown>
            <Input
              type='number'
              label='Integration step'
              value={edited.step}
              onChange={handleChange('step')} />
              {
                cloneElement(
                  IntegratorsPanels[edited.integrator],
                  {
                    params: edited[edited.integrator],
                    onChange: handleChange(edited.integrator),
                  },
                )
              }
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
          disabled={compare(engine, edited) || hasErrors}
          text='Save'
          onClick={handleSave} />
      </Footer>
    </Base>
  );
};

export default Engine;
