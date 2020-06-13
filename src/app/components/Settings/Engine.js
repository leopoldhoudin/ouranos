import React from 'react';
import styled from 'styled-components';

import Base from './Base'

const Layout = styled.div``;

const Engine = ({...rest}) => (
  <Base icon='function' title='Engine' {...rest}>
    <Layout />
  </Base>
);

export default Engine;
