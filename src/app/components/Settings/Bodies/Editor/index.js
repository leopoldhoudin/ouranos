import React, { useState } from 'react';
import styled from 'styled-components';

import { makeSize } from 'theme';
import { Button } from 'ui';
import { capitalize, clone, uuid4, compare } from 'utils';
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

const makeNewBody = () => ({
  uuid: uuid4(),
  // General
  name: '',
  type: 'planet',
  // Physical
  mass: 1,
  radius: 1,
  // Orbital
  // Graphical
  texture: 'earth',
});

// Body has a value => editor
// Body is null => creator
const Editor = ({body, onClose}) => {
  const [bodies, setBodies] = state.use('bodies');
  const [edited, setEdited] = useState(body ? clone(body) : makeNewBody());
  const [errors, setErrors] = useState(body ? new Object() : {name: 'empty'});
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

  const handleChange = (updated, errs) => {
    setEdited({...edited, ...updated});
    setErrors({...errors, ...errs});
  };

  const handleClose = () => onClose && onClose();

  const handleSave = () => {
    const newBodies = clone(bodies);

    if (body) {
      newBodies.splice(newBodies.findIndex(b => b.uuid == body.uuid), 1);
    }
    newBodies.push({...edited});

    setBodies({slice: newBodies});

    handleClose();
  };

  const hasErrors = Object.values(errors).filter(error => error != null).length > 0;

  return (
    <Layout>
      <Body.Layout>
        <Body.Aside>
          <Viewer body={edited} />
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
        <Button
          large
          full
          validate
          text='Save'
          disabled={compare(body, edited) || hasErrors}
          onClick={handleSave} />
      </Footer>
    </Layout>
  );
};

export default Editor;
