import React, { useState } from 'react';
import styled from 'styled-components';

import Base from '../Base'
import List from './List';
import Editor from './Editor';

const Bodies = ({...rest}) => {
  const [view, setView] = useState({name: 'list'});

  const handleSelect = body => setView({name: 'editor', body});
  const handleCloseEditor = () => setView({name: 'list'});

  const title = (view.name == 'editor')
    ? `Bodies \u2023 ${view.body ? view.body.name : 'New body'}`
    : 'Bodies';

  return (
    <Base icon='system' title={title} {...rest}>
      {view.name == 'list' && <List onSelect={handleSelect} />}
      {view.name == 'editor' && <Editor body={view.body} onClose={handleCloseEditor} />}
    </Base>
  );
};

export default Bodies;
