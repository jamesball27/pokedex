import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { List, Spin, BackTop, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Pokedex from '../../types/Pokedex';

interface Query {
  pokedex: Pokedex;
}

const POKEDEX_QUERY = gql`
  query($skip: Int!) {
    pokedex {
      pokemonEntries(skip: $skip) {
        species {
          id
          name
        }
      }
    }
  }
`;

const PokemonList: React.FC = () => {
  const { loading, error, data, fetchMore } = useQuery<Query>(POKEDEX_QUERY, {
    variables: {
      skip: 0,
    },
  });
  const [hasMore, setHasMore] = useState(true);
  const parentRef = useRef(null);

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div style={{ overflow: 'auto', height: '100%' }} ref={parentRef}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={() => {
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
        }}
        hasMore={!loading && hasMore}
        useWindow={false}
        loader={
          <List.Item key="loader" style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </List.Item>
        }
      >
        <List
          dataSource={data?.pokedex.pokemonEntries}
          size="large"
          renderItem={(item) => <List.Item key={item.species.id}>{item.species.name}</List.Item>}
        >
          <BackTop target={() => parentRef.current || window}>
            <Button type="primary">Back to Top</Button>
          </BackTop>
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
