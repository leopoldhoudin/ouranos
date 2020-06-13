import React, { useState, cloneElement } from 'react';
import styled from 'styled-components';

import { scale } from 'theme';
import { Button, Text, Window } from 'ui';

import Menu from './Menu';
import Player from './Player';
import Focus from './Focus';
import StatusBar from './StatusBar';

import EngineSettings from './Settings/Engine';
import BodiesSettings from './Settings/Bodies';
import PhysicsSettings from './Settings/Physics';
import GraphicsSettings from './Settings/Graphics';
import InterfaceSettings from './Settings/Interface';

const Container = styled.div`
  z-index: 2;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const MainLayout = styled.div`
  z-index: 3;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  height: 100%;
`;

const TopLayout = styled.div`
  display: flex;
  flex: 1;

  & > div {
    margin-top: ${({ theme: {sizes}}) => sizes.large.pixels};
    margin-left: ${({ theme: {sizes}}) => sizes.large.pixels};
  }
`;

const WindowsLayout = styled.div`
  position: absolute;
  top: ${({ theme: {sizes}}) => sizes.large.pixels};
  left: ${({ theme: {sizes}}) => sizes.large.pixels};
  width: calc(100% - ${({ theme: {sizes}}) => scale(sizes.large, 2).pixels});
  height: calc(100% - ${({ theme: {sizes}}) => scale(sizes.large, 2).pixels});
`;

const SettingsWindows = [
  { name: 'engine', component: <EngineSettings /> },
  { name: 'bodies', component: <BodiesSettings /> },
  { name: 'physics', component: <PhysicsSettings /> },
  { name: 'graphics', component: <GraphicsSettings /> },
  { name: 'interface', component: <InterfaceSettings /> },
];

const Interface = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [windows, setWindows] = useState({
    engine: false,
    bodies: true,
    physics: false,
    graphics: false,
    interface: false,
  });

  const handleMenuAction = action => {
    if (action == 'toggleView') {
      setIsExpanded(!isExpanded);
      setWindows({});
    } else {
      setWindows({...windows, [action]: !windows[action]});
    }
  };

  const handleSettingsClose = window => () => setWindows({...windows, [window]: false});

  return (
    <Container>
      <WindowsLayout>
      {
        SettingsWindows.map((window, key) => windows[window.name] && cloneElement(window.component, {key, onClose: handleSettingsClose(window.name)}))
      }
      </WindowsLayout>
      <MainLayout>
        <TopLayout>
          <Menu isExpanded={isExpanded} windows={windows} onAction={handleMenuAction} />
          {
            isExpanded && (
              <>
                <Player />
                <Focus />
              </>
            )
          }
        </TopLayout>
        <StatusBar />
      </MainLayout>
    </Container>
  );
};

export default Interface;
