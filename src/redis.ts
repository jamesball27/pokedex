import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? '6379'),
});

client.on('connect', () => console.log('Successfully connected to redis!'));
client.on('error', () => console.log('Error connecting to redis'));

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
