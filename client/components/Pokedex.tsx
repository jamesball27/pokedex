import React, { useState } from 'react';

import { Layout } from 'antd';

import PokemonList from './PokemonList/PokemonListContainer';
import PokemonDetail from './PokemonDetail/PokemonDetail';

const { Sider, Content } = Layout;

const Pokedex: React.FC = () => {
  const [collapsed, toggleCollapsed] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState();

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        collapsed={collapsed}
        collapsible
        onCollapse={() => toggleCollapsed(!collapsed)}
        onBreakpoint={() => toggleCollapsed(!collapsed)}
        breakpoint="md"
        width="200px"
        theme="dark"
        style={{ height: '100%', overflow: 'scroll' }}
      >
        <PokemonList collapsed={collapsed} onSelect={setSelectedPokemon} />
      </Sider>

      <Content style={{ margin: '5%' }}>
        <PokemonDetail id={selectedPokemon} />
      </Content>
    </Layout>
  );
};

export default Pokedex;
