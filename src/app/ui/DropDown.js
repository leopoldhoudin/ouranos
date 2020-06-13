import React, { useState, useRef, useEffect, useContext, cloneElement, Children } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, ThemeContext } from 'styled-components';

import { makeSize, darken } from 'theme';

import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Scroll from './Scroll';
import { getHeight } from './common';

const Label = styled(Text)`
  margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};

  height: ${({ theme, large }) => getHeight(theme, large)};

  font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
  line-height: ${({ theme, large }) => getHeight(theme, large)};
  color: ${({ theme: { colors }}) => colors.standard.solid.fore};

  ${({ open }) => open && css`
    color: ${({ theme: { colors }}) => colors.primary.solid.back};
  `}
`;

const Selector = {
  Layout: styled.div`
    display: flex;

    width: 100%;
    height: ${({ theme, large}) => getHeight(theme, large)};

    background: ${({ theme: { colors }}) => colors.standard.solid.back};

    &:hover {
      background: ${({ theme: { colors }}) => colors.standard.solid.backHover};

      & ${Button} {
        background: ${({ theme: { colors }}) => colors.standard.effect.backHover};
      }
    }

    cursor: pointer;
  `,

  Value: styled(({className, children}) => (
    <div className={className}>
      {children}
    </div>
  ))`
    display: flex;
    flex: 1;
    align-items: center;

    box-sizing: border-box;
    padding-left: ${({ theme: { sizes }}) => sizes.medium.pixels};
  `,

  Icon: ({large, open}) => (
    <Button large={large} icon={open ? 'close' : 'open'} />
  ),
};

const Panel = {
  Container: styled.div`
    z-index: 200;

    position: absolute;
    top: ${({ top }) => top.pixels};
    left: ${({ left }) => left.pixels};

    box-sizing: border-box;
    width: ${({ width }) => width.pixels};
    min-height: ${({ offset, theme: { sizes }}) => makeSize(sizes.large.value).pixels};
    max-height: ${({ offset, theme: { sizes }}) => makeSize(5 * sizes.large.value).pixels};
  `,

  Body: styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: ${({ theme: { sizes }}) => sizes.large.pixels};
    box-sizing: border-box;
    padding-left: ${({ theme: { sizes }}) => sizes.medium.pixels};

    background: ${({ theme: { colors }}) => darken(colors.standard.solid.back)};

    cursor: pointer;

    &:hover {
      background: ${({ theme: { colors }}) => colors.standard.solid.backHover};
    }
  `,
};

const Portal = ({anchor, elements, setOpen, onChange}) => {
  const rect = anchor.current.getBoundingClientRect();
  const top = makeSize(rect.y + rect.height);
  const left = makeSize(rect.x);
  const width = makeSize(rect.width);
  const theme = useContext(ThemeContext);

  const ref = useRef();
  useEffect(() => {
    const handleClick = event => {
      console.log(
        ref.current,
        ref.current.contains(event.target),
        anchor.current,
        anchor.current.contains(event.target),
      );
      if (ref.current
        && !ref.current.contains(event.target)
        && anchor.current
        && !anchor.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref]);

  return createPortal(
    (
      <Panel.Container
        ref={ref}
        top={top}
        left={left}
        width={width} >
        <Scroll vertical height={makeSize(5 * theme.sizes.large.value)}>
          <Panel.Body>
            {
              Children.map(elements, element => (
                <Panel.Item onClick={() => onChange(element.props.name)}>
                  {element}
                </Panel.Item>
              ))
            }
          </Panel.Body>
        </Scroll>
      </Panel.Container>
    ),
    document.body,
  );
};

const DropDown = ({className, children, label, large, value, onChange}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const selectedChild = children.find(child => child.props.name == value);
  const toggleOpen = () => setOpen(!open);
  const handleChange = value => {
    setOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={className}>
      {label && <Label open={open}>{label}</Label>}
      <Selector.Layout ref={ref} large={large} onClick={toggleOpen}>
        <Selector.Value>
          {cloneElement(selectedChild)}
        </Selector.Value>
        <Selector.Icon open={open} large={large} />
      </Selector.Layout>
      {
        open && (
          <Portal
            anchor={ref}
            elements={children}
            setOpen={setOpen}
            onChange={handleChange} />
        )
      }
    </div>
  );
};

const DropDownItem = styled(
  ({className, key, children}) => <div className={className} key={key}>{children}</div>
)`
  display: flex;
  align-items: center;

  width: 100%;
`;

DropDown.Item = DropDownItem;

export default styled(DropDown)`
  ${({ full }) => full && css`width: 100%;`}
`;
