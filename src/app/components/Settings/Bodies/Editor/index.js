import React, { useState } from 'react';
import styled from 'styled-components';

import { makeSize } from 'theme';
import { Button } from 'ui';
import { capitalize, clone } from 'utils';
import state from 'state';

import Viewer from './Viewer';
import General from './General';
import Physical from './Physical';
import Orbital from './Orbital';
import Graphical from './Graphical';

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

    padding-left: ${({ theme: { sizes }}) => sizes.medium.pixels};
  `,
};

const Footer = styled.div`
  display: flex;

  width: 100%;

  & > ${Button}:not(:last-child) {
    margin-right: ${({ theme: { sizes }}) => sizes.medium.pixels};
  }
`;

// Body has a value => editor
// Body is null => creator
const Editor = ({body, onClose}) => {
  const [bodies, setBodies] = state.use('bodies');
  const [edited, setEdited] = useState(clone(body));
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

  const handleChange = updated => setEdited({...edited, ...updated});

  const handleClose = () => onClose && onClose();

  const handleSave = () => {
    const newBodies = clone(bodies);
    newBodies.splice(newBodies.findIndex(b => b.name == body.name), 1);
    newBodies.push(edited);

    setBodies({slice: newBodies});

    handleClose();
  };

  return (
    <Layout>
      <Body.Layout>
        <Body.Aside>
          <Viewer body={body} />
          <MenuButton name='general' />
          <MenuButton name='physical' />
          <MenuButton name='orbital' />
          <MenuButton name='graphical' />
        </Body.Aside>
        <Body.Content>
          {view == 'general' && <General body={edited} onChange={handleChange} />}
          {view == 'physical' && <Physical body={edited} onChange={handleChange} />}
          {view == 'orbital' && <Orbital body={edited} onChange={handleChange} />}
          {view == 'graphical' && <Graphical body={edited} onChange={handleChange} />}
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
