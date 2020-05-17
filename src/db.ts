import { createConnection, useContainer, getConnectionOptions, Connection } from 'typeorm';
import { Container } from 'typedi';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const setupDB = async (): Promise<Connection> => {
  useContainer(Container);
  const connectionOptions = await getConnectionOptions();

  return await createConnection({
    ...connectionOptions,
    entities: [__dirname + '/entities/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
  });
};
