import React from 'react';
import styled from 'styled-components';

import Base from './Base'

const Layout = styled.div``;

const Graphics = ({...rest}) => (
  <Base icon='palette' title='Graphics' {...rest}>
    <Layout />
  </Base>
);

export default Graphics;
