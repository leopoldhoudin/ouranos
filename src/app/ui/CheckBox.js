import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { getHeight } from './common';
import Icon from './Icon';

const IconElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ theme: { sizes }}) => sizes.large.pixels};
  height: ${({ theme: { sizes }}) => sizes.large.pixels};

  background: ${({ theme: { colors }}) => colors.standard.solid.back};
`;

const Label = styled.div`
  display: flex;
  align-items: center;

  margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};

  height: ${({ theme, large }) => getHeight(theme, large)};

  font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
  line-height: ${({ theme, large }) => getHeight(theme, large)};

  user-select: none;
`;

const CheckBox = ({className, label, value, onChange}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={className} onClick={() => onChange(!value)}>
      <IconElement>
        {value && <Icon name='check' color={theme.colors.primary.solid.back} />}
      </IconElement>
      <Label>{label}</Label>
    </div>
  );
};

export default styled(CheckBox)`
  display: flex;

  color: ${({ theme: { colors }}) => colors.standard.solid.fore};

  &:hover {
    color: ${({ theme: { colors }}) => colors.primary.solid.backHover};
  }

  cursor: pointer;
`;
