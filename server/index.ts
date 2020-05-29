import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import setupDB from './db';

async function run(): Promise<void> {
  await setupDB();

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
    container: Container,
  });

  const server = new ApolloServer({ schema });
  const port = process.env.PORT ?? 3000;

  const app = express();
  server.applyMiddleware({ app });

  app.use(express.static(path.resolve('client', 'dist')));
  app.use('/assets', express.static(path.resolve('assets')));

  app.get('/', (_req, res) => {
    res.sendFile(path.resolve('client', 'dist', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
}

run();
