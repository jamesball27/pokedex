import React from 'react';
import { Menu } from 'antd';

import PokemonSpecies from '../../types/PokemonSpecies';

interface Props {
  pokemon: {
    species: PokemonSpecies;
  }[];
}

const PokemonList: React.FC<Props> = ({ pokemon }) => {
  return (
    <Menu theme="dark">
      {pokemon.map(({ species }) => (
        <Menu.Item key={species.id}>{species.name}</Menu.Item>
      ))}
    </Menu>
  );
};

export default PokemonList;
