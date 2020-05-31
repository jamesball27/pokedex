import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Empty, Card } from 'antd';

import PokemonSpecies from '../../../types/PokemonSpecies';

interface Query {
  species: PokemonSpecies;
}
const SPECIES_QUERY = gql`
  query($id: Int!) {
    species(id: $id) {
      id
      name
    }
  }
`;

interface Props {
  id?: number;
}

const PokemonDetail: React.FC<Props> = ({ id }) => {
  if (!id) {
    return <Empty />;
  }

  const { loading, error, data, fetchMore } = useQuery<Query>(SPECIES_QUERY, {
    variables: {
      id,
    },
  });
  return (
    <Card title={data?.species.name}>
      <h1>{data?.species.name}</h1>
    </Card>
  );
};

export default PokemonDetail;
