import React from 'react';
import { Card, Typography, Collapse, Row, Col, Statistic } from 'antd';

import TypeTag from './TypeTag';
import Pokemon from '../../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
}

const Moves: React.FC<Props> = ({ pokemon }) => (
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
);

export default Moves;
