import React from 'react';
import styled from 'styled-components';

import Base from './Base'

const Layout = styled.div``;

const Interface = ({...rest}) => (
  <Base icon='window' title='Interface' {...rest}>
    <Layout />
  </Base>
);

export default Interface;
