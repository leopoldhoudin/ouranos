import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  color: yellow;
`;

const BackwardEuler = ({params, onChange}) => {
  return (
    <Layout>
      BACKWARD EULER
    </Layout>
  );
};

export default BackwardEuler;
