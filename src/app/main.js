import React from 'react';
import ReactDOM from 'react-dom';

import Application from './components/Application';

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<Application />, wrapper) : false;
