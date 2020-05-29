import React from 'react';

import { Layout } from 'antd';

import PokemonList from './PokemonList';

const { Sider, Content } = Layout;

const Pokedex: React.FC = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Sider width="25%" theme="dark" style={{ height: '100%', overflow: 'scroll' }}>
        <PokemonList />
      </Sider>
      <Content>Content</Content>
    </Layout>
  );
};

export default Pokedex;
