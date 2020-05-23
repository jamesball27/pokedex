import 'reflect-metadata';

import setupServer from './src/server';

async function run(): Promise<void> {
  await setupServer();
}

run();
