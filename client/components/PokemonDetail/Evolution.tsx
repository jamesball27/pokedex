import React from 'react';
import { Card, Typography, Steps, Avatar } from 'antd';
import PokemonSpecies from '../../../types/PokemonSpecies';

import { CLOUD_STORAGE_BASE_ASSETS_PATH } from '../../config';

interface Props {
  species: PokemonSpecies;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
}

const Evolution: React.FC<Props> = ({ species, setSelectedPokemon }) => (
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
);

export default Evolution;
