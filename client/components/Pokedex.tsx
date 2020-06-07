import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';

import Title from './Title';
import PokemonList from './PokemonList/PokemonListContainer';
import PokemonDetail from './PokemonDetail/PokemonDetailContainer';
import Search from './Search';
import LanguageSelect from './LanguageSelect';
import { SupportedLanguageName } from '../../types/Language';

const { Sider, Content, Header } = Layout;

const Pokedex: React.FC = () => {
  const [collapsed, toggleCollapsed] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguageName>('en');

  return (
    <Layout style={{ height: '100%' }}>
      <Header style={{ height: 'auto', padding: '15px 50px' }}>
        <Row style={{ height: '100%' }} align="middle" justify="space-between">
          <Col span={24} md={8}>
            <Title>Pokédex</Title>
          </Col>
          <Col span={24} md={16}>
            <Row style={{ height: '100%' }} align="middle" justify="space-between">
              <Search selectedLanguage={selectedLanguage} setSelectedPokemon={setSelectedPokemon} />
              <LanguageSelect
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            </Row>
          </Col>
        </Row>
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
