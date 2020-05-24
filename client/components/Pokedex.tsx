import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout } from 'antd';

const POKEDEX_QUERY = gql`
  {
    pokedex {
      pokemonEntries {
        species {
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
    <Layout>
      <Layout.Sider>Side</Layout.Sider>
      <Layout.Content>Content</Layout.Content>
    </Layout>
  );
};

export default Pokedex;
