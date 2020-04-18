import { Service } from 'typedi';
import { get as redisGet, set as redisSet } from '../redis';
import { get as httpGet } from '../http';

@Service()
class DataService {
  async get<T>(key: string): Promise<T> {
    const value = await redisGet(key);
    if (value) {
      console.log('VALUE IN REDIS');
      return new Promise<T>((res) => res(JSON.parse(value)));
    }

    console.log('VALUE NOT IN REDIS <HTTP>');
    return await httpGet<T>(key).then((v: T) => {
      console.log('RECEIVED RESPONSE FROM HTTP');
      redisSet(key, JSON.stringify(v));

      return v;
    });
  }

  async set(key: string) {}
}

export default DataService;
