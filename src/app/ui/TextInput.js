import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { uuid4 } from 'utils';
import { darken } from 'theme';

const getHeight = ({sizes}, large) => (
  (large && scale(sizes.large, 2).pixels)
  || sizes.large.pixels
);

const Input = styled.input`
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

  &:focus {
    border-bottom: 2px solid ${({ theme: { colors }}) => colors.primary.solid.back};
  }
`;

const TextInput = ({className, label, value, onChange}) => {
  const [uuid, setUuid] = useState(uuid4());
  const [ref, setRef] = useState(null);

  const handleClick = () => ref && ref.focus();
  const handleChange = event => onChange && onChange(event.target.value);

  return (
    <div className={className} onClick={handleClick}>
      <Input name={uuid} type='text' ref={setRef} value={value} onChange={handleChange} />
      {label && <label htmlFor={uuid}>{label}</label>}
    </div>
  );
};

export default styled(TextInput)`
    ${({ label }) => label && css`
      display: flex;
      flex-direction: column-reverse;
    `}
    ${({ full }) => full && css`width: 100%;`}

    & > label {
      margin-left: ${({ theme: { sizes }}) => sizes.small.pixels};

      font-size: ${({ theme: { sizes: { font } }}) => font.medium.pixels};
      line-height: ${({ theme, large }) => getHeight(theme, large)};
      color: ${({ theme: { colors }}) => colors.standard.solid.fore};
    }

    & ${Input}:focus + label {
      color: ${({ theme: { colors }}) => colors.primary.solid.back};
    }
`;
