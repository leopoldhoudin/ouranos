import React from 'react';
import styled from 'styled-components';

import { makeSize } from 'theme';
import { DropDown, Text, Button } from 'ui';
import state from 'state';

const NO_BODY_NAME = 'ouranos:none';
const NO_BODY_TEXT = 'None';

const Container = styled.div`
  display: flex;

  height: ${({ theme: { sizes }}) => sizes.large.pixels};
  width: 200px;

  background: ${({ theme: { colors }}) => colors.standard.effect.back};

  & > ${DropDown} {
    flex: 1;
  }
`;

const Focus = () => {
  const [bodies, _] = state.use('bodies');
  const [simulation, setSimulation] = state.use('simulation');

  const selectables = new Array();
  selectables.push({name: NO_BODY_NAME, text: NO_BODY_TEXT});
  bodies.forEach(body => selectables.push({name: body.uuid, text: body.name}));

  const handleLockedChange = () => {
    setSimulation({path: 'locked', value: !simulation.locked});
  };

  const handleBodyChange = uuid => {
    if (uuid == NO_BODY_NAME) {
      setSimulation({path: 'focus', value: null});
    } else {
      setSimulation({path: 'focus', value: uuid});
    }
  };

  const focus = bodies.find(body => body.uuid == simulation.focus);

  return (
    <Container>
      <Button
        solid
        icon={simulation.locked ? 'locked' : 'unlocked'}
        onClick={handleLockedChange} />
      <DropDown
        value={focus ? focus.uuid : NO_BODY_NAME}
        onChange={handleBodyChange}>
        {
          selectables.map(selectable => (
            <DropDown.Item key={selectable.name} name={selectable.name}>
              <Text>{selectable.text}</Text>
            </DropDown.Item>
          ))
        }
      </DropDown>
    </Container>
  );
};

export default Focus;
