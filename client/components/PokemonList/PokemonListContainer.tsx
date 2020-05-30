import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Pokedex from '../../../types/Pokedex';
import PokemonList from './PokemonList';

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

const PokemonListContainer: React.FC<Props> = ({ collapsed }) => {
  const { loading, error, data, fetchMore } = useQuery<Query>(POKEDEX_QUERY, {
    variables: {
      skip: 0,
      lang: 'en',
      defaultPokemon: true,
    },
  });
  const [hasMore, setHasMore] = useState(true);

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
    <PokemonList
      data={data?.pokedex.pokemonEntries}
      loading={loading}
      error={error}
      loadMore={loadMore}
      hasMore={hasMore}
      collapsed={collapsed}
    />
  );
};

export default PokemonListContainer;
