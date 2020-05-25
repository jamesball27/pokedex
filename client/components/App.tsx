import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

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
