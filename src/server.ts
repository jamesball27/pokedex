import 'reflect-metadata';
import express from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

async function main(): Promise<void> {
  const app = express();
  const port = process.env.PORT || 3000;

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
    container: Container,
  });

  app.use(
    '/graphql',
    expressGraphQL({
      schema,
      graphiql: true,
    }),
  );

  app.listen(port, (): void => console.log(`Example app listening at http://localhost:${port}`));
}

main();
