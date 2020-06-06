import React from 'react';
import { Row, Card, Col, Space, Typography, Statistic } from 'antd';

import { CLOUD_STORAGE_BASE_ASSETS_PATH } from '../../config';
import PokemonSpecies from '../../../types/PokemonSpecies';
import Pokemon from '../../../types/Pokemon';
import TypeTag from './TypeTag';

interface Props {
  species: PokemonSpecies;
  pokemon: Pokemon;
}

const Overview: React.FC<Props> = ({ species, pokemon }) => (
  <Card style={{ width: '100%' }}>
    <Row>
      <Col span={24} sm={8} md={10} lg={12}>
        <Card bordered={false}>
          <img
            src={`${CLOUD_STORAGE_BASE_ASSETS_PATH}${pokemon.images.artwork}`}
            style={{ width: '100%', height: '100%' }}
          />
        </Card>
      </Col>
      <Col span={24} sm={16} md={14} lg={12}>
        <Space direction="vertical" size="large">
          <Space direction="vertical">
            <Typography.Title level={1} style={{ marginBottom: '0' }}>
              {species.localeName}
            </Typography.Title>

            <Row>
              {pokemon.types.map((t) => (
                <TypeTag key={t.name} name={t.name} localeName={t.localeName} />
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

export default Overview;
