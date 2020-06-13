import React, { useContext, cloneElement } from 'react';
import Draggable from 'react-draggable';
import styled, { css, ThemeContext } from 'styled-components';

import Icon from './Icon';

const Container = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 600px;
  box-sizing: border-box;
  position: absolute;
`;

const Header = {
  Container: styled.div`
    display: flex;
    height: ${({ theme: { sizes }}) => sizes.large.pixels};

    align-items: center;

    color: ${({ theme: { colors } }) => colors.standard.effect.fore};
    background: ${({ theme: { colors } }) => colors.standard.effect.back};

    border-radius: ${({ theme }) => theme.radius};

    user-select: none;
    cursor: move;
  `,

  Icon: styled.div`
    margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};
  `,

  Title: styled.div`
    flex: 1;
    margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};

    font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
    font-weight: bold;
    line-height: ${({ theme: { sizes }}) => sizes.large.pixels};

    user-select: none;
  `,

  Action: styled.div`
    display: flex;
    width: ${({ theme: { sizes }}) => sizes.large.pixels};
    height: ${({ theme: { sizes }}) => sizes.large.pixels};
    margin-left: ${({ theme: { sizes }}) => sizes.tiny.pixels};

    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover, &:active {
      color: ${({ theme: { colors } }) => colors.standard.solid.foreHover};
      background: ${({ theme: { colors } }) => colors.standard.solid.backHover};
    }
  `,
};

const HeaderCloseAction = styled(Header.Action)`
  &:hover {
    color: ${({ theme: { colors } }) => colors.alert.solid.foreHover};
    background: ${({ theme: { colors } }) => colors.alert.solid.backHover};
  }

  &:active {
    color: ${({ theme: { colors } }) => colors.alert.solid.foreActive};
    background: ${({ theme: { colors } }) => colors.alert.solid.backActive};
  }
`;

const Body = {
  Container: styled.div`
    box-sizing: border-box;
    padding: ${({ theme: { sizes }}) => sizes.medium.pixels};

    backdrop-filter: blur(2px);

    border-style: solid;
    border-width: 0 2px 2px;
    border-color: ${({ theme: { colors } }) => colors.standard.solid.back};
  `,
  Layout: styled.div``
};

const Window = ({ icon, title, actions, defaultPosition, children, onClose }) => {
  const theme = useContext(ThemeContext);

  const handleDrag = e => {
    e.stopPropagation();
    e.preventDefault();
  };
  const windowActions = actions ? actions.map((action, index) => cloneElement(action, {
    key: index,
  })) : [];

  if (onClose !== undefined) {
    windowActions.push(
      <HeaderCloseAction key={(actions && actions.length) || 0} onClick={onClose}>
        <Icon small name='cross' color={theme.colors.alert.solid.fore} />
      </HeaderCloseAction>
    );
  }

  return (
    <Draggable
      handle='.ouranos-window-header'
      bounds='parent'
      onDrag={handleDrag}
      defaultPosition={defaultPosition}>
      <Container>
        <Header.Container className='ouranos-window-header'>
          { icon && <Header.Icon><Icon name={icon} /></Header.Icon>}
          <Header.Title>{ title.toUpperCase() }</Header.Title>
          { windowActions }
        </Header.Container>
        <Body.Container>
          <Body.Layout>
            { children }
          </Body.Layout>
        </Body.Container>
      </Container>
    </Draggable>
  );
};

Window.Action = ({ icon, onClick }) => (
  <Header.Action onClick={onClick}>
    <Icon small name={icon} />
  </Header.Action>
);

export default Window;
