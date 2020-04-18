import { Service } from 'typedi';
import { get as redisGet, set as redisSet } from '../redis';
import { get as httpGet } from '../http';

@Service()
class DataService {
  async get<T>(key: string): Promise<T> {
    const value = await redisGet(key);
    if (value) {
      return new Promise<T>((res) => res(JSON.parse(value)));
    }

    return await httpGet<T>(key).then((resp: T) => {
      this.set<T>(key, resp);

      return resp;
    });
  }

  set<T>(k: string, v: T) {
    redisSet(k, JSON.stringify(v));
  }
}

export default DataService;
