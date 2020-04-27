import 'reflect-metadata';

import { setupDB } from './db';
import { setupServer } from './server';

async function run(): Promise<void> {
  await setupDB();
  await setupServer();
}

run();
