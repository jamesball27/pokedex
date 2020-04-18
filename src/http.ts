import axios, { AxiosResponse } from 'axios';
import camelize from 'camelcase-keys';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

const axiosInstance = axios.create({
  baseURL: POKE_API_BASE_URL,
});

export function get<T>(url: string): Promise<T> {
  return axiosInstance.get(url).then((res: AxiosResponse<T>) => camelize(res.data, { deep: true }));
}
