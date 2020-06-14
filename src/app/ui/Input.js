import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { uuid4 } from 'utils';
import { darken } from 'theme';

import { getHeight } from './common';

const validators = {
  text: value => true,
  number: value => /^[+-]?(\d+([.]\d*)?([eE][+-]?\d+)?|[.]\d+([eE][+-]?\d+)?)$/.test(value),
};

const InputElement = styled.input`
  width: 100%;
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

  ${({ valid }) => valid && css`
    &:focus {
      border-bottom: 2px solid ${({ theme: { colors }}) => colors.primary.solid.back};
    }
  `}

  ${({ valid }) => !valid && css`
    border-bottom: 2px solid ${({ theme: { colors }}) => colors.alert.solid.backActive};
  `}
`;

const Input = ({className, type, label, large, value, onChange}) => {
  const validator = validators[type || 'text'];

  const [uuid, setUuid] = useState(uuid4());
  const [valid, setValid] = useState(validator(value));
  const ref = useRef();

  const handleClick = () => ref.current && ref.current.focus();
  const handleChange = event => {
    const value = event.target.value;
    if (onChange) {
      onChange(value, validator(value));
    }
  };

  useEffect(() => {
    setValid(validator(value));
  }, [value]);

  return (
    <div className={className} onClick={handleClick}>
      <InputElement
        name={uuid}
        large={large}
        valid={valid}
        type='text'
        ref={ref}
        value={value}
        onChange={handleChange} />
      {label && <label htmlFor={uuid}>{label}</label>}
    </div>
  );
};

export default styled(Input)`
    ${({ label }) => label && css`
      display: flex;
      flex-direction: column-reverse;
    `}
    ${({ full }) => full && css`width: 100%;`}

    & > label {
      margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};

      height: ${({ theme, large }) => getHeight(theme, large)};

      font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
      line-height: ${({ theme, large }) => getHeight(theme, large)};
      color: ${({ theme: { colors }}) => colors.standard.solid.fore};
    }

    & ${InputElement}:focus + label {
      color: ${({ theme: { colors }}) => colors.primary.solid.back};
    }
`;
