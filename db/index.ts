import { createConnection, useContainer, getConnectionOptions } from 'typeorm';
import { Container } from 'typedi';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default async () => {
  useContainer(Container);
  const connectionOptions = await getConnectionOptions();

  const conn = await createConnection({
    ...connectionOptions,
    namingStrategy: new SnakeNamingStrategy(),
  });

  await conn.runMigrations();
};
