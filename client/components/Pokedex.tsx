import React, { useState } from 'react';

import { Layout, Select } from 'antd';

import PokemonList from './PokemonList/PokemonListContainer';
import PokemonDetail from './PokemonDetail/PokemonDetailContainer';
import LanguageSelect from './LanguageSelect';
import { LanguageName } from '../../types/Language';

const { Sider, Content, Header } = Layout;

const Pokedex: React.FC = () => {
  const [collapsed, toggleCollapsed] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageName>('en');

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <LanguageSelect
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </Header>
      <Layout>
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
          <PokemonList
            collapsed={collapsed}
            selectedPokemon={selectedPokemon}
            onSelect={setSelectedPokemon}
            selectedLanguage={selectedLanguage}
          />
        </Sider>

        <Content style={{ padding: '5%' }}>
          <PokemonDetail
            id={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
            selectedLanguage={selectedLanguage}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Pokedex;
