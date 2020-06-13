import React from 'react';
import styled, { css } from 'styled-components';

import { scale } from 'theme';

import Icon from './Icon';
import { getHeight } from './common';

const getWidth = (full) => (full && '100%') || 'fit-content';
const getMinWidth = ({sizes}, large) => (
  (large && scale(sizes.large, 2).pixels)
  || sizes.large.pixels
);

const getMargin = ({sizes}, large) => (
  (large && sizes.small.pixels)
  || sizes.tiny.pixels
);

const IconBox = styled.div`
  display: flex;
  height: 100%;

  align-items: center;
  margin: 0 ${({theme, large}) => getMargin(theme, large)};
`;

const TextBox = styled.div`
  display: flex;
  ${({ full }) => full && css`flex: 1;`}

  height: 100%;
  align-items: center;
  justify-content: center;

  margin: 0 ${({theme, large}) => getMargin(theme, large)};
`;

const Button = ({ className, text, icon, ghost, full, small, large, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {
        icon && (
          <IconBox large={large}>
            <Icon name={icon} small={small} large={large} color={ghost && 'auto'} />
          </IconBox>
        )
      }
      { text && <TextBox full={full}>{ text }</TextBox> }
    </div>
  );
}

export default styled(Button)`
  display: flex;

  width: ${({ full }) => getWidth(full)};
  min-width: ${({ theme, large }) => getMinWidth(theme, large)};

  height: ${({ theme, large }) => getHeight(theme, large)};
  box-sizing: border-box;

  font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
  line-height: ${({ theme, large }) => getHeight(theme, large)};

  color: ${({ theme: { colors } }) => colors.standard.effect.fore};
  background: ${({ theme: { colors } }) => colors.standard.effect.back};

  &:hover {
    color: ${({ theme: { colors } }) => colors.standard.effect.foreHover};
    background: ${({ theme: { colors } }) => colors.standard.effect.backHover};
  }

  &:active {
    color: ${({ theme: { colors } }) => colors.standard.effect.foreActive};
    background: ${({ theme: { colors } }) => colors.standard.effect.backActive};
  }

  ${({ solid }) => solid && css`
    color: ${({ theme: { colors } }) => colors.standard.solid.fore};
    background: ${({ theme: { colors } }) => colors.standard.solid.back};

    &:hover {
      color: ${({ theme: { colors } }) => colors.standard.solid.foreHover};
      background: ${({ theme: { colors } }) => colors.standard.solid.backHover};
    }

    &:active {
      color: ${({ theme: { colors } }) => colors.standard.solid.foreActive};
      background: ${({ theme: { colors } }) => colors.standard.solid.backActive};
    }
  `}

  ${({ primary }) => primary && css`
    color: ${({ theme: { colors } }) => colors.primary.effect.fore};
    background: ${({ theme: { colors } }) => colors.primary.effect.back};

    &:hover {
      color: ${({ theme: { colors } }) => colors.primary.effect.foreHover};
      background: ${({ theme: { colors } }) => colors.primary.effect.backHover};
    }

    &:active {
      color: ${({ theme: { colors } }) => colors.primary.effect.foreActive};
      background: ${({ theme: { colors } }) => colors.primary.effect.backActive};
    }
  `}

  ${({ validate }) => validate && css`
    color: ${({ theme: { colors } }) => colors.success.effect.fore};
    background: ${({ theme: { colors } }) => colors.success.effect.back};

    &:hover {
      color: ${({ theme: { colors } }) => colors.success.effect.foreHover};
      background: ${({ theme: { colors } }) => colors.success.effect.backHover};
    }

    &:active {
      color: ${({ theme: { colors } }) => colors.success.effect.foreActive};
      background: ${({ theme: { colors } }) => colors.success.effect.backActive};
    }
  `}

  ${({ cancel }) => cancel && css`
    color: ${({ theme: { colors } }) => colors.standard.effect.fore};
    background: ${({ theme: { colors } }) => colors.standard.effect.back};

    &:hover {
      color: ${({ theme: { colors } }) => colors.alert.effect.foreHover};
      background: ${({ theme: { colors } }) => colors.alert.effect.backHover};
    }

    &:active {
      color: ${({ theme: { colors } }) => colors.alert.effect.foreActive};
      background: ${({ theme: { colors } }) => colors.alert.effect.backActive};
    }
  `}

  ${({ primary, solid }) => primary && solid && css`
    color: ${({ theme: { colors } }) => colors.primary.solid.fore};
    background: ${({ theme: { colors } }) => colors.primary.solid.back};

    &:hover {
      color: ${({ theme: { colors } }) => colors.primary.solid.foreHover};
      background: ${({ theme: { colors } }) => colors.primary.solid.backHover};
    }

    &:active {
      color: ${({ theme: { colors } }) => colors.primary.solid.foreActive};
      background: ${({ theme: { colors } }) => colors.primary.solid.backActive};
    }
  `}

  ${({ ghost }) => ghost && css`
    color: ${({ theme: { colors } }) => colors.standard.solid.fore};
    background: none;

    ${Icon} path {
      fill: ${({ theme: { colors } }) => colors.standard.solid.fore};
    }

    &:hover {
      color: ${({ theme: { colors } }) => colors.standard.solid.backHover};
      background: none;

      ${Icon} path {
        fill: ${({ theme: { colors } }) => colors.standard.solid.backHover};
      }
    }

    &:active {
      color: ${({ theme: { colors } }) => colors.standard.solid.backActive};
      background: none;
    }
  `}

  cursor: pointer;
  user-select: none;
`;
