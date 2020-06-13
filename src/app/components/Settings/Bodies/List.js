import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { capitalize } from 'utils';
import state from 'state';
import { Button, Text, Icon, Scroll } from 'ui';
import { makeSize, scale, transparentize } from 'theme';

const getSortIcon = (name, sort) => {
  if (sort && sort.name == name) {
    return sort.asc ? 'sort-asc' : 'sort-desc';
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

  Cell: styled(({className, name, sort, onClick}) => (
    <div className={className}>
      <Button
        ghost
        icon={getSortIcon(name, sort)}
        onClick={() => onClick(name)} />
      <Text primary bold>{capitalize(name)}</Text>
    </div>
  ))`
    ${CellStyle}

    height: ${({ theme: { sizes }}) => scale(sizes.large, 2).pixels};
  `,
};

const Body = {
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

const sortBodies = (bodies, sort) => {
  if (sort) {
    const sorted = [...bodies].sort((a, b) => a[sort.name] - b[sort.name]);
    return sort.desc ? sorted.reverse() : sorted;
  }

  return bodies;
};

const List = ({onSelect}) => {
  const [sort, setSort] = useState(null);
  const [bodies, setBodies] = state.use('bodies');

  const handleSortClick = name => {
    if (sort && sort.name == name) {
      if (sort.asc) {
        setSort({name, desc: true});
      } else {
        setSort(null);
      }
    } else {
      setSort({name, asc: true});
    }
  };

  return (
    <Layout>
      <Header.Layout>
        <Header.Cell size='huge' name='type' sort={sort} onClick={handleSortClick} />
        <Header.Cell name='name' sort={sort} onClick={handleSortClick} />
        <Header.Cell name='mass' sort={sort} onClick={handleSortClick} />
        <Header.Cell name='radius' sort={sort} onClick={handleSortClick} />
      </Header.Layout>
      <Scroll vertical height={makeSize(400)}>
        <Body.Layout>
        {
          sortBodies(bodies, sort).map((body, index) => (
            <Body.Row key={index} onClick={() => onSelect(body)}>
              <Body.Cell size='huge'><Icon name={body.type} /></Body.Cell>
              <Body.Cell><Text primary>{body.name}</Text></Body.Cell>
              <Body.Cell><Text primary>{body.mass}</Text></Body.Cell>
              <Body.Cell><Text primary>{body.radius}</Text></Body.Cell>
            </Body.Row>
          ))
        }
        </Body.Layout>
      </Scroll>
      <Footer>
        <Button large full primary text='New body' onClick={() => onSelect(null)} />
      </Footer>
    </Layout>
  );
};

export default List;
