import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout } from 'antd';

import PokemonList from './PokemonList';

const { Sider, Content } = Layout;

const POKEDEX_QUERY = gql`
  {
    pokedex {
      pokemonEntries {
        species {
          id
          name
        }
      }
    }
  }
`;

const Pokedex = () => {
  const { loading, error, data } = useQuery(POKEDEX_QUERY);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider width="40%">
        <PokemonList pokemon={data.pokedex.pokemonEntries} />
      </Sider>
      <Content>Content</Content>
    </Layout>
  );
};

export default Pokedex;
