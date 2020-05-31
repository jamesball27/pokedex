import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Empty, Card, Typography, Avatar, Row, Col } from 'antd';

import PokemonSpecies from '../../../types/PokemonSpecies';
import Spinner from '../Spinner';
import { CLOUD_STORAGE_BASE_ASSETS_PATH } from '../../config';

interface Query {
  species: PokemonSpecies;
}
const SPECIES_QUERY = gql`
  query($id: Int!, $lang: String, $defaultPokemon: Boolean) {
    species(id: $id) {
      id
      localeName(lang: $lang)
      flavorText(lang: $lang)
      pokemon(default: $defaultPokemon) {
        images {
          artwork
        }
      }
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
  const { loading, error, data } = useQuery<Query>(SPECIES_QUERY, {
    variables: { id, lang: 'en', defaultPokemon: true },
  });

  if (loading || !data) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  const { species } = data;
  const pokemon = species.pokemon[0];

  return (
    <Card>
      <Row>
        <Col span={8}>
          <Card>
            <img
              src={`${CLOUD_STORAGE_BASE_ASSETS_PATH}${pokemon.images.artwork}`}
              style={{ width: '100%', height: '100%' }}
            />
          </Card>
        </Col>
        <Col span={12} offset={2}>
          <Typography.Title>{species.localeName}</Typography.Title>
          <Typography.Paragraph>{species.flavorText}</Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  );
};

export default PokemonDetail;
