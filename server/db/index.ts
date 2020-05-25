import { createConnection, useContainer, getConnectionOptions, Connection } from 'typeorm';
import { Container } from 'typedi';
import path from 'path';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default async (): Promise<Connection> => {
  useContainer(Container);
  const connectionOptions = await getConnectionOptions();

  return await createConnection({
    ...connectionOptions,
    entities: [path.resolve('types/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),
  });
};
