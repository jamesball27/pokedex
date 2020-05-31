import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Empty, Card, Typography, Row, Col, Space, Statistic } from 'antd';

import PokemonSpecies from '../../../types/PokemonSpecies';
import Spinner from '../Spinner';
import TypeTag from './TypeTag';
import { CLOUD_STORAGE_BASE_ASSETS_PATH } from '../../config';

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
          <Space direction="vertical" size="large">
            <Space direction="vertical">
              <Typography.Title level={1} style={{ marginBottom: '0' }}>
                {species.localeName}
              </Typography.Title>

              <Row>
                {pokemon.types.map((t) => (
                  <TypeTag key={t.id} name={t.name} localeName={t.localeName} />
                ))}
              </Row>
            </Space>

            <Space direction="vertical" size="small">
              <Typography.Text strong>{species.localeGenus}</Typography.Text>
              <Typography.Paragraph>{species.flavorText}</Typography.Paragraph>

              <Space size="large">
                {/* height given in decimetres */}
                <Statistic title="Height" value={pokemon.height * 10} suffix={'cm'} precision={0} />
                {/* weight given in hectograms */}
                <Statistic title="Weight" value={pokemon.weight / 10} suffix={'kg'} precision={2} />
              </Space>
            </Space>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default PokemonDetail;
