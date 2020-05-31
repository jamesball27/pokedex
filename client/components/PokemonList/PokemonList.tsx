import React, { useState, useRef } from 'react';
import { ApolloError } from 'apollo-boost';
import { List, BackTop, Button, Menu } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

import { ContainerProps } from './PokemonListContainer';
import Spinner from '../Spinner';
import PokemonListItem from './PokemonListItem';
import PokemonEntry from '../../../types/PokemonEntry';

interface Props {
  data?: PokemonEntry[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  error?: ApolloError;
}

const StyledMenuItem = styled(Menu.Item)`
  height: auto !important;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${(props: { collapsed: 1 | 0 }) => (props.collapsed ? '0 !important' : 'inherit')};
`;

const PokemonList: React.FC<Props & ContainerProps> = ({
  data,
  collapsed,
  loadMore,
  hasMore,
  loading,
  error,
  onSelect,
}) => {
  const parentRef = useRef(null);

  if (loading || !data) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div style={{ overflow: 'auto', height: '100%' }} ref={parentRef}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={loadMore}
        hasMore={!loading && hasMore}
        useWindow={false}
        loader={
          <List.Item key="loader" style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner size={collapsed ? 'small' : 'default'} />
          </List.Item>
        }
      >
        <Menu
          theme="dark"
          onSelect={(p) => {
            // MenuItem key is species.id as a string
            onSelect(Number(p.key));
          }}
        >
          {data.map((p) => (
            <StyledMenuItem
              collapsed={collapsed ? 1 : 0}
              title={p.species.localeName}
              key={p.species.id}
            >
              <PokemonListItem
                collapsed={collapsed}
                name={p.species.localeName}
                sprite={p.species.pokemon[0].images.sprite}
              />
            </StyledMenuItem>
          ))}
        </Menu>
      </InfiniteScroll>

      <BackTop target={() => parentRef.current || window}>
        <Button type="primary">Back to Top</Button>
      </BackTop>
    </div>
  );
};

export default PokemonList;
