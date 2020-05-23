import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import setupDB from '../db';

export default async (): Promise<void> => {
  await setupDB();

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
    container: Container,
  });

  const server = new ApolloServer({ schema });
  const port = process.env.PORT ?? 3000;
  await server.listen(port);
  console.log(`Server listening on port: ${port}`);
};
