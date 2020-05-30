import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { List, Spin, BackTop, Button, Avatar, Menu, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';

import PokemonListItem from './PokemonListItem';
import Pokedex from '../../types/Pokedex';

interface Query {
  pokedex: Pokedex;
}

const POKEDEX_QUERY = gql`
  query($skip: Int!, $lang: String, $defaultPokemon: Boolean) {
    pokedex {
      pokemonEntries(skip: $skip) {
        entryNumber
        species {
          id
          localeName(lang: $lang)
          pokemon(default: $defaultPokemon) {
            images {
              sprite
            }
          }
        }
      }
    }
  }
`;

interface Props {
  collapsed: boolean;
}

const StyledMenuItem = styled(Menu.Item)`
  height: auto !important;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${(props: { collapsed: 1 | 0 }) => (props.collapsed ? '0 !important' : 'inherit')};
`;

const PokemonList: React.FC<Props> = ({ collapsed }) => {
  const { loading, error, data, fetchMore } = useQuery<Query>(POKEDEX_QUERY, {
    variables: {
      skip: 0,
      lang: 'en',
      defaultPokemon: true,
    },
  });
  const [hasMore, setHasMore] = useState(true);
  const parentRef = useRef(null);

  if (loading) {
    return (
      <div
        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        skip: data?.pokedex.pokemonEntries.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.pokedex.pokemonEntries.length === 0) {
          setHasMore(false);
          return prev;
        }

        return {
          pokedex: {
            ...prev.pokedex,
            pokemonEntries: [
              ...prev.pokedex.pokemonEntries,
              ...fetchMoreResult.pokedex.pokemonEntries,
            ],
          },
        };
      },
    });
  };

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
            <Spin />
          </List.Item>
        }
      >
        <Menu theme="dark">
          {data?.pokedex.pokemonEntries.map((p) => (
            <StyledMenuItem
              collapsed={collapsed ? 1 : 0}
              title={p.species.localeName}
              key={p.entryNumber}
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
