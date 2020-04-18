import { Service } from 'typedi';

import PokemonType from '../types/Pokemon';
import DataService from './DataService';

interface PokemonIndexResult {
  name: string;
  url: string;
}

interface PokemonIndex {
  results: PokemonIndexResult[];
}

@Service()
class PokemonService {
  constructor(private readonly dataService: DataService) {}

  async getAll(): Promise<PokemonType[]> {
    const url = '/pokemon?limit=151'; // Limit to first 151 for now
    return await this.dataService
      .get<PokemonIndex>(url)
      .then(
        async (res) =>
          await Promise.all(
            res.results.map((pokemon: PokemonIndexResult) => this.dataService.get<PokemonType>(pokemon.url)),
          ),
      );
  }

  async get(id: number): Promise<PokemonType> {
    const url = `/pokemon/${id}`;
    return await this.dataService.get<PokemonType>(url);
  }
}

export default PokemonService;
