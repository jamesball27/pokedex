import React from 'react';
import { Card, Typography } from 'antd';
import { Radar } from '@ant-design/charts';
import { geekblue } from '@ant-design/colors';

import Pokemon from '../../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
}

const Statistics: React.FC<Props> = ({ pokemon }) => (
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
);

export default Statistics;
