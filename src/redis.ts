import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', () => console.log('Successfully connected to redis!'));
client.on('error', () => console.log('Error connection to redis. Did you run `redis-server`?'));

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
