import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../entities/Pokemon';

@Service()
class PokemonService {
  constructor(@InjectRepository(Pokemon) private readonly pokemonRepository: Repository<Pokemon>) {}

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  async find(id: number): Promise<Pokemon> {
    return await this.pokemonRepository.findOneOrFail(id);
  }
}

export default PokemonService;
