import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Empty, Card, Typography, Row, Col, Space, Statistic, Collapse, Steps, Avatar } from 'antd';
import { Radar } from '@ant-design/charts';
import { geekblue } from '@ant-design/colors';

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
            artwork
          }
          types {
            name
            localeName(lang: $lang)
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

const PokemonDetail: React.FC<Props> = ({ id, setSelectedPokemon }) => {
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
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row>
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
                      <TypeTag key={t.id} name={t.name} localeName={t.localeName} />
                    ))}
                  </Row>
                </Space>

                <Space direction="vertical" size="small">
                  <Typography.Text strong>{species.localeGenus}</Typography.Text>
                  <Typography.Paragraph>{species.flavorText}</Typography.Paragraph>

                  <Space size="large">
                    {/* height given in decimetres */}
                    <Statistic
                      title="Height"
                      value={pokemon.height * 10}
                      suffix={'cm'}
                      precision={0}
                    />
                    {/* weight given in hectograms */}
                    <Statistic
                      title="Weight"
                      value={pokemon.weight / 10}
                      suffix={'kg'}
                      precision={2}
                    />
                  </Space>
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row gutter={[24, { xs: 24, sm: 24, md: 24, lg: 0 }]}>
        <Col span={24} lg={12}>
          <Card style={{ height: '100%' }}>
            <Typography.Title level={3}>Statistics</Typography.Title>

            <Radar
              responsive
              angleField="name"
              radiusField="stat"
              data={pokemon.stats.map((s) => ({ name: s.stat.localeName, stat: s.baseStat }))}
              radiusAxis={{
                grid: {
                  alternateColor: ['', geekblue[0]],
                },
                tickInterval: 15,
              }}
              tooltip={{ visible: false }}
            />
          </Card>
        </Col>

        <Col span={24} lg={12}>
          <Card style={{ height: '100%', maxHeight: '600px', overflow: 'scroll' }}>
            <Typography.Title level={3}>Moves</Typography.Title>

            <Collapse accordion defaultActiveKey="0">
              {pokemon.moves.map((m, i) => (
                <Collapse.Panel
                  key={i === 0 ? i : m.id}
                  header={m.localeName}
                  extra={<TypeTag name={m.type.name} localeName={m.type.localeName} />}
                >
                  <Row align="middle" gutter={16} justify="space-between">
                    <Col span={12}>
                      <Typography.Text>{m.flavorText}</Typography.Text>
                    </Col>

                    <Col span={12}>
                      <Row justify="space-around">
                        <Statistic
                          title="Accuracy"
                          formatter={(v) => (v === null ? 'n/a' : v)}
                          value={m.accuracy}
                          suffix={m.accuracy === null ? '' : '%'}
                          precision={0}
                        />
                        <Statistic
                          title="Power"
                          formatter={(v) => (v === null ? 'n/a' : v)}
                          value={m.power}
                          precision={0}
                        />
                      </Row>
                    </Col>
                  </Row>
                </Collapse.Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>

      <Row>
        <Card style={{ width: '100%' }}>
          <Typography.Title level={3}>Evolution</Typography.Title>

          <Steps
            progressDot
            current={species.evolution.map((s) => s.id).indexOf(species.id)}
            onChange={(current) => setSelectedPokemon(species.evolution[current].id)}
          >
            {species.evolution.map((s) => (
              <Steps.Step
                key={s.id}
                title={
                  <Avatar
                    src={`${CLOUD_STORAGE_BASE_ASSETS_PATH}${s.pokemon[0].images.sprite}`}
                    shape="square"
                    size={60}
                  />
                }
                subTitle={s.localeName}
              />
            ))}
          </Steps>
        </Card>
      </Row>
    </Space>
  );
};

export default PokemonDetail;
