import 'reflect-metadata';

import { setupDB } from './src/db';
import { setupServer } from './src/server';

async function run(): Promise<void> {
  await setupDB();
  await setupServer();
}

run();
