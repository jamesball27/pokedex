import { createConnection, useContainer, Connection } from 'typeorm';
import { Container } from 'typedi';
import path from 'path';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default async (): Promise<Connection> => {
  useContainer(Container);

  return await createConnection({
    type: 'sqlite',
    synchronize: false,
    logging: true,
    entityPrefix: 'pokemon_v2_',
    database: path.resolve('db/db.sqlite3'),
    entities: [path.resolve('types/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),
  });
};
