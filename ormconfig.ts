// for dev only, in prod these are read in from ENV vars
export = {
  // type: 'sqlite',
  // database: '/db.sqlite3',
  type: 'postgres',
  host: 'db',
  username: 'root',
  password: 'admin',
  database: 'pokemon',
  entityPrefix: 'pokemon_v2_',
  synchronize: false,
  logging: true,
  migrations: ['db/migrations/*.ts'],
  entities: ['server/entities/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
  },
};
