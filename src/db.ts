import { createConnection, useContainer, getConnectionOptions } from 'typeorm';
import { Container } from 'typedi';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const setupDB = async () => {
  useContainer(Container);
  const connectionOptions = await getConnectionOptions();

  return await createConnection({
    ...connectionOptions,
    entities: [__dirname + '/entities/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
  });
};
