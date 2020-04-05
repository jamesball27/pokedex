import { Service } from 'typedi';

import PokemonType from '../types/Pokemon';
import { get } from '../http';

interface PokemonIndexResult {
  name: string;
  url: string;
}

interface PokemonIndex {
  results: PokemonIndexResult[];
}

@Service()
class PokemonService {
  async getAll(): Promise<PokemonType[]> {
    const url = '/pokemon?limit=151'; // Limit to first 151 for now
    return await get<PokemonIndex>(url).then(
      async (res) => await Promise.all(res.results.map((pokemon: PokemonIndexResult) => get<PokemonType>(pokemon.url))),
    );
  }

  async get(id: number): Promise<PokemonType> {
    return await get<PokemonType>(`/pokemon/${id}`);
  }
}

export default PokemonService;
