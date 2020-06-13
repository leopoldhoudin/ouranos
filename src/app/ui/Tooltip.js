import React, { useState, createRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import styled, { ThemeContext } from 'styled-components';

import { makeSize, darken } from 'theme';

const Position = styled.div`
  z-index: 100;

  position: absolute;
  top: ${({ top }) => top && top.pixels};
  left: ${({ left }) => left && left.pixels};
`;

const Container = styled.div`;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme: { colors }}) => colors.standard.solid.back};

  &:after {
    position: absolute;
    left: 0;

    width: ${({ theme: { sizes }}) => sizes.medium.pixels};
    height: ${({ theme: { sizes }}) => sizes.medium.pixels};

    content: "";
    background: ${({ theme: { colors }}) => colors.standard.solid.back};

    transform: rotate(45deg);
    margin-left: -${({ theme: { sizes }}) => sizes.small.pixels};
  }
`

const Portal = ({anchor, children}) => {
  const [ref, setRef] = useState();
  const theme = useContext(ThemeContext);

  const rect = anchor && anchor.getBoundingClientRect();
  const top = rect && ref && makeSize(
    rect.y + (rect.height - ref.getBoundingClientRect().height) / 2
  );
  const left = rect && ref && makeSize(
    rect.x + rect.width + theme.sizes.medium.value
  );

  return createPortal(
    anchor && (
      <Position ref={setRef} top={top} left={left}>
        <Container>{children}</Container>
      </Position>
    ),
    document.body,
  );
};

const Tooltip = ({className, anchor, children}) => {
  const [ref, setRef] = useState();
  const [hidden, setHidden] = useState(true);

  return (
    <div
      ref={setRef}
      className={className}
      onMouseOver={() => setHidden(false)}
      onMouseOut={() => setHidden(true)}>
      {!hidden && <Portal anchor={ref}>{children}</Portal>}
      {anchor}
    </div>
  );
};

export default styled(Tooltip)``;
