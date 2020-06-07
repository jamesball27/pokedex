import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Pokedex from '../../../types/Pokedex';
import PokemonList from './PokemonList';
import { LanguageName } from '../../../types/Language';

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

export interface ContainerProps {
  collapsed: boolean;
  selectedPokemon: number;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
  selectedLanguage: LanguageName;
}

const PokemonListContainer: React.FC<ContainerProps> = ({
  collapsed,
  selectedPokemon,
  onSelect,
  selectedLanguage,
}) => {
  const { loading, error, data, fetchMore } = useQuery<Query>(POKEDEX_QUERY, {
    variables: {
      skip: 0,
      lang: selectedLanguage,
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
      selectedPokemon={selectedPokemon}
      onSelect={onSelect}
      selectedLanguage={selectedLanguage}
    />
  );
};

export default PokemonListContainer;
