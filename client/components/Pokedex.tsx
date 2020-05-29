import React, { useState } from 'react';

import { Layout } from 'antd';

import PokemonList from './PokemonList';

const { Sider, Content } = Layout;

const Pokedex: React.FC = () => {
  const [collapsed, toggleCollapsed] = useState(false);
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
        <PokemonList collapsed={collapsed} />
      </Sider>
      <Content>Content</Content>
    </Layout>
  );
};

export default Pokedex;
