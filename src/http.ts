import axios, { AxiosResponse } from 'axios';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

const axiosInstance = axios.create({
  baseURL: POKE_API_BASE_URL,
});

// axiosInstance.interceptors.response.use((response) => {
//   return response.data;
// });

export function get<T>(url: string): Promise<T> {
  return axiosInstance.get(url).then((res: AxiosResponse<T>) => res.data);
}
