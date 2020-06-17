import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';

import { uuid4 } from 'utils';
import { darken } from 'theme';

import { getHeight } from './common';
import Tooltip from './Tooltip';
import Icon from './Icon';
import Text from './Text';

const validators = {
  text: value => null,
  number: value => /^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/.test(value)
      ? null
      : `'${value}' is not valid number.`,
};

const ElementLayout = styled.div`
  display: flex;
  width: 100%;
`;

const InputElement = styled.input`
  flex: 1;
  height: ${({ theme, large}) => getHeight(theme, large)};
  box-sizing: border-box;

  margin: 0;
  padding: 0 0 0 ${({ theme: { sizes }}) => sizes.small.pixels};
  border: none;
  border-bottom: 2px solid transparent;
  outline: none;

  color: ${({ theme: { colors }}) => colors.standard.solid.fore};
  background: ${({ theme: { colors }}) => darken(colors.standard.solid.back)};
  caret-color: ${({ theme: { colors }}) => colors.primary.solid.back};

  ${({ error }) => (error == null) && css`
    &:focus {
      border-bottom: 2px solid ${({ theme: { colors }}) => colors.primary.solid.back};
    }
  `}

  ${({ error }) => error && css`
    border-bottom: 2px solid ${({ theme: { colors }}) => colors.alert.solid.backActive};
  `}
`;

const ErrorBox = styled(({className}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={className}>
      <Icon name='warning' color={theme.colors.standard.solid.fore} />
    </div>
  );
})`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ theme: { sizes }}) => sizes.large.pixels};
  height: ${({ theme: { sizes }}) => sizes.large.pixels};

  background: ${({ theme: { colors }}) => colors.alert.solid.backActive};
`;

const ErrorTooltip = styled(({className, error}) => (
  <div className={className}>
    <Text>{error}</Text>
  </div>
))`
  height: ${({ theme: { sizes }}) => sizes.medium.pixels};
  padding: ${({ theme: { sizes }}) => sizes.medium.pixels};
`;

const Label = styled.label`
  margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};

  height: ${({ theme, large }) => getHeight(theme, large)};

  font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
  line-height: ${({ theme, large }) => getHeight(theme, large)};
  color: ${({ theme: { colors }}) => colors.standard.solid.fore};

  ${({ hasFocus }) => hasFocus && css`
    color: ${({ theme: { colors }}) => colors.primary.solid.back};
  `}
`;

const Input = ({className, type, label, large, value, onChange, validator}) => {
  const validate = value => (
    validators[type || 'text'](value) || (validator && validator(value))
  );

  const [uuid, setUuid] = useState(uuid4());
  const [error, setError] = useState(validate(value));
  const [hasFocus, setHasFocus] = useState(false);
  const ref = useRef();

  const handleClick = () => ref.current && ref.current.focus();
  const handleChange = event => {
    const value = event.target.value;
    if (onChange) {
      const validation = validate(value);
      onChange(
        validation == null && type == 'number' ? parseFloat(value) : value,
        validation,
      );
    }
  };

  useEffect(() => {
    setError(validate(value));
  }, [value]);

  return (
    <div className={className} onClick={handleClick}>
      <ElementLayout>
        <InputElement
          name={uuid}
          large={large}
          error={error}
          type='text'
          ref={ref}
          value={value}
          onChange={handleChange}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)} />
        {
          error && (
            <Tooltip anchor={<ErrorBox />}>
              <ErrorTooltip error={error} />
            </Tooltip>
          )
        }
      </ElementLayout>
      {label && <Label hasFocus={hasFocus} htmlFor={uuid}>{label}</Label>}
    </div>
  );
};

export default styled(Input)`
    ${({ label }) => label && css`
      display: flex;
      flex-direction: column-reverse;
    `}
    ${({ full }) => full && css`width: 100%;`}
`;
