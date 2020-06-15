import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { capitalize, sort, clone } from 'utils';
import state from 'state';
import { Button, Text, Icon, Scroll } from 'ui';
import { makeSize, scale, transparentize } from 'theme';

const getSortingIcon = (name, sorting) => {
  if (sorting && sorting.name == name) {
    return sorting.asc ? 'sort-asc' : 'sort-desc';
  } else {
    return 'sort-all';
  }
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const CellStyle = css`
  display: flex;
  align-items: center;

  ${({ size }) => size
    ? css`width: ${({ theme: { sizes }}) => sizes[size].pixels}`
    : css`flex: 1`
  };
`;

const Header = {
  Layout: styled.div`
    display: flex;

    width: 100%;
  `,

  Cell: styled(({className, name, sorting, onClick}) => (
    <div className={className}>
      {
        sorting && (
          <Button
            ghost
            icon={getSortingIcon(name, sorting)}
            onClick={() => onClick(name)} />
        )
      }
      <Text primary bold>{capitalize(name)}</Text>
    </div>
  ))`
    ${CellStyle}

    height: ${({ theme: { sizes }}) => scale(sizes.large, 2).pixels};
  `,
};

const Body = {
  Container: styled.div`
    height: 400px;
  `,

  Layout: styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,

  Row: styled.div`
    display: flex;

    width: 100%;

    &:hover {
      background: ${({ theme: { colors }}) => transparentize(colors.standard.solid.backHover)};
    }

    cursor: pointer;
  `,

  Cell: styled(({className, children}) => (
    <div className={className}>{children}</div>
  ))`
    ${CellStyle}

    height: ${({ theme: { sizes }}) => scale(sizes.large, 2).pixels};

    box-sizing: border-box;
    padding-left: 22px;
  `,
};

const Footer = styled.div`
  display: flex;

  width: 100%;
`;

const sortBodies = (bodies, sorting) => {
  if (sorting && sorting != 'none') {
    const sorted = sort(bodies, body => body[sorting.name]);
    return sorting.desc ? sorted.reverse() : sorted;
  }

  return sort(bodies, body => body.name);
};

const List = ({onSelect}) => {
  const [sorting, setSorting] = useState('none');
  const [bodies, setBodies] = state.use('bodies');

  const handleSortingClick = name => {
    if (sorting && sorting.name == name) {
      if (sorting.asc) {
        setSorting({name, desc: true});
      } else {
        setSorting('none');
      }
    } else {
      setSorting({name, asc: true});
    }
  };

  const handleDeleteClick = body => {
    const newBodies = clone(bodies);
    newBodies.splice(newBodies.findIndex(b => b.uuid == body.uuid), 1);
    setBodies({slice: newBodies});
  };

  return (
    <Layout>
      <Header.Layout>
        <Header.Cell size='huge' name='type' sorting={sorting} onClick={handleSortingClick} />
        <Header.Cell name='name' sorting={sorting} onClick={handleSortingClick} />
        <Header.Cell name='mass' sorting={sorting} onClick={handleSortingClick} />
        <Header.Cell name='radius' sorting={sorting} onClick={handleSortingClick} />
        <Header.Cell size='huge' name='' />
      </Header.Layout>
      <Body.Container>
        <Scroll vertical height={makeSize(400)}>
          <Body.Layout>
          {
            sortBodies(bodies, sorting).map((body, index) => (
              <Body.Row key={index} onClick={() => onSelect(body)}>
                <Body.Cell size='huge'><Icon name={body.type} /></Body.Cell>
                <Body.Cell><Text primary>{body.name}</Text></Body.Cell>
                <Body.Cell><Text primary>{body.mass}</Text></Body.Cell>
                <Body.Cell><Text primary>{body.radius}</Text></Body.Cell>
                <Body.Cell size='huge'>
                  <Button icon='trash' cancel onClick={() => handleDeleteClick(body)} />
                </Body.Cell>
              </Body.Row>
            ))
          }
          </Body.Layout>
        </Scroll>
      </Body.Container>
      <Footer>
        <Button large full primary text='New body' onClick={() => onSelect(null)} />
      </Footer>
    </Layout>
  );
};

export default List;
