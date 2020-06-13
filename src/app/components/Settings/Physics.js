import React from 'react';
import styled from 'styled-components';

import Base from './Base'

const Layout = styled.div``;

const Physics = ({...rest}) => (
  <Base icon='sigma' title='Physics' {...rest}>
    <Layout />
  </Base>
);

export default Physics;
