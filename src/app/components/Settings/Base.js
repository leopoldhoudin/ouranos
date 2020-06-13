import React from 'react';

import { Window } from 'ui';

const Base = ({icon, title, onClose, children}) => <Window
  icon={icon}
  title={title}
  onClose={onClose}
  defaultPosition={{x: 60, y: 60}}>
    {children}
  </Window>;

export default Base;
