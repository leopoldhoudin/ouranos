import React, { useState } from 'react';
import styled from 'styled-components';

import { makeSize } from 'theme';
import { Button } from 'ui';
import { capitalize } from 'utils';

import Viewer from './Viewer';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: ${({ theme: { sizes }}) => makeSize(4 * (100 + sizes.large.value)).pixels};
`;

const Body = {
  Layout: styled.div`
    display: flex;

    flex: 1;
    width: 100%;
  `,

  Aside: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Content: styled.div`
    flex: 1;
  `,
};

const Footer = styled.div`
  display: flex;

  width: 100%;

  & > ${Button}:not(:last-child) {
    margin-right: ${({ theme: { sizes }}) => sizes.medium.pixels};
  }
`;

let callbacks = new Array();

// Body has a value => editor
// Body is null => creator
const Editor = ({body, onClose}) => {
  const [view, setView] = useState('general');

  const MenuButton = ({name}) => (
    <Button
      full
      large
      solid
      primary={view == name}
      text={capitalize(name)}
      onClick={() => setView(name)} />
  );

  const requestOnStop = callback => {
    console.log('here');
    callbacks.push(callback);
  };

  const handleClose = () => {
    callbacks.forEach(callback => callback());
    callbacks.splice(0, callbacks.length);
    onClose();
  };

  const handleSave = () => {
    // Save body specs here
    handleClose();
  };

  return (
    <Layout>
      <Body.Layout>
        <Body.Aside>
          <Viewer body={body} requestOnStop={requestOnStop} />
          <MenuButton name='general' />
          <MenuButton name='physical' />
          <MenuButton name='orbital' />
        </Body.Aside>
        <Body.Content>
        </Body.Content>
      </Body.Layout>
      <Footer>
        <Button large full cancel text='Cancel' onClick={handleClose} />
        <Button large full validate text='Save' onClick={handleSave} />
      </Footer>
    </Layout>
  );
};

export default Editor;
