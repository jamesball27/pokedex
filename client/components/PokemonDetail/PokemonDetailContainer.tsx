import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Empty } from 'antd';

import PokemonSpecies from '../../../types/PokemonSpecies';
import PokemonDetail from './PokemonDetail';

interface Query {
  species: PokemonSpecies;
}

const SPECIES_QUERY = gql`
  query($id: Int!, $lang: String, $defaultPokemon: Boolean) {
    species(id: $id) {
      id
      localeName(lang: $lang)
      localeGenus(lang: $lang)
      flavorText(lang: $lang)
      pokemon(default: $defaultPokemon) {
        height
        weight
        images {
          artwork
        }
        types {
          name
          localeName(lang: $lang)
        }
        stats {
          baseStat
          stat {
            localeName(lang: $lang)
          }
        }
        moves {
          id
          accuracy
          power
          flavorText(lang: $lang)
          localeName(lang: $lang)
          type {
            name
            localeName(lang: $lang)
          }
        }
      }
      evolution {
        id
        localeName
        pokemon(default: $defaultPokemon) {
          images {
            sprite
          }
        }
      }
    }
  }
`;

interface Props {
  id?: number;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonDetailContainer: React.FC<Props> = ({ id, setSelectedPokemon }) => {
  if (!id) {
    return <Empty />;
  }

  const { loading, error, data } = useQuery<Query>(SPECIES_QUERY, {
    variables: { id, lang: 'en', defaultPokemon: true },
  });

  return (
    <PokemonDetail
      setSelectedPokemon={setSelectedPokemon}
      loading={loading}
      error={error}
      data={data}
    />
  );
};

export default PokemonDetailContainer;
