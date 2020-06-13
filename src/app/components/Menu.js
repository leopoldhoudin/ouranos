import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { capitalize } from 'utils';
import { Button, Tooltip, Text } from 'ui';

const buttonsIcons = {
  engine: 'function',
  bodies: 'system',
  physics: 'sigma',
  graphics: 'palette',
  interface: 'window',
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  & > ${Button}, & > ${Tooltip}:not(:last-child) {
    margin-bottom: ${({ theme: {sizes}}) => sizes.large.pixels};
  }
`;

const MenuTooltip = styled(({className, children}) => (
  <div className={className}><Text>{children}</Text></div>
))`
  height: ${({ theme: { sizes }}) => sizes.medium.pixels};
  padding: ${({ theme: { sizes }}) => sizes.medium.pixels};
`;

const MenuButton = ({name, windows, onAction}) => {
  const isActive = windows[name];

  return isActive
    ? <Button large primary icon={buttonsIcons[name]} onClick={onAction(name)} />
    : (
      <Tooltip
        anchor={
          <Button large icon={buttonsIcons[name]} onClick={onAction(name)} />
        }>
        <MenuTooltip>{capitalize(name)}</MenuTooltip>
      </Tooltip>
    );
};

const Menu = ({isExpanded, windows, onAction}) => {
  const dispatchAction = action => () => onAction && onAction(action);

  return (
    <Layout>
        <Button
          large
          icon={isExpanded ? 'minimize' : 'maximize'}
          onClick={dispatchAction('toggleView')} />
        {
          isExpanded && (
            <>
              <MenuButton name='engine' windows={windows} onAction={dispatchAction} />
              <MenuButton name='bodies' windows={windows} onAction={dispatchAction} />
              <MenuButton name='physics' windows={windows} onAction={dispatchAction} />
              <MenuButton name='graphics' windows={windows} onAction={dispatchAction} />
              <MenuButton name='interface' windows={windows} onAction={dispatchAction} />
            </>
          )
        }
    </Layout>
  );
};

export default Menu;
