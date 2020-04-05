import { Resolver, Query, Arg } from 'type-graphql';

import Pokemon from '../types/Pokemon';
import PokemonService from '../services/PokemonService';
import PokemonType from '../types/Pokemon';

@Resolver()
class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [Pokemon])
  async allPokemon(): Promise<PokemonType[]> {
    return this.pokemonService.getAll();
  }

  @Query(() => Pokemon)
  async pokemon(@Arg('id', { nullable: false }) id: number): Promise<PokemonType> {
    return this.pokemonService.get(id);
  }
}

export default PokemonResolver;
