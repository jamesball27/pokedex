import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import Pokedex from './Pokedex';

const client = new ApolloClient();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Pokedex />
    </ApolloProvider>
  );
};

export default App;
