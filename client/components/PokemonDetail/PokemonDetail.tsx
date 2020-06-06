import React from 'react';
import { ApolloError } from 'apollo-boost';
import { Row, Col, Space } from 'antd';

import Spinner from '../Spinner';
import Overview from './Overview';
import Statistics from './Statistics';
import Moves from './Moves';
import Evolution from './Evolution';
import PokemonSpecies from '../../../types/PokemonSpecies';

interface Props {
  id?: number;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  error?: ApolloError;
  data?: {
    species: PokemonSpecies;
  };
}

const PokemonDetail: React.FC<Props> = ({ setSelectedPokemon, loading, data, error }) => {
  if (loading || !data) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  const { species } = data;
  const pokemon = species.pokemon[0];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row>
        <Overview species={species} pokemon={pokemon} />
      </Row>

      <Row gutter={[24, { xs: 24, sm: 24, md: 24, lg: 0 }]}>
        <Col span={24} lg={12}>
          <Statistics pokemon={pokemon} />
        </Col>

        <Col span={24} lg={12}>
          <Moves pokemon={pokemon} />
        </Col>
      </Row>

      <Row>
        <Evolution species={species} setSelectedPokemon={setSelectedPokemon} />
      </Row>
    </Space>
  );
};

export default PokemonDetail;
