import React, { useState } from 'react';

import { Layout } from 'antd';

import PokemonList from './PokemonList/PokemonListContainer';
import PokemonDetail from './PokemonDetail/PokemonDetail';

const { Sider, Content } = Layout;

const Pokedex: React.FC = () => {
  const [collapsed, toggleCollapsed] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        defaultCollapsed={collapsed}
        collapsed={collapsed}
        collapsible
        onCollapse={(isCollapsed) => toggleCollapsed(isCollapsed)}
        breakpoint="lg"
        width="200px"
        theme="dark"
        style={{ height: '100%', overflow: 'scroll' }}
      >
        <PokemonList collapsed={collapsed} onSelect={setSelectedPokemon} />
      </Sider>

      <Content style={{ padding: '5%' }}>
        <PokemonDetail id={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
      </Content>
    </Layout>
  );
};

export default Pokedex;
