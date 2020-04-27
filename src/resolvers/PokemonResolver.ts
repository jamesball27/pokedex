import { Resolver, Query, Field, Int, ArgsType, Args } from 'type-graphql';
import { Min, Max } from 'class-validator';

import Pokemon from '../entities/Pokemon';
import PokemonService from '../services/PokemonService';

@ArgsType()
class PokemonArgs {
  @Field(() => Int, { nullable: false })
  @Min(1)
  id: number;
}

@Resolver()
class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [Pokemon])
  async allPokemon(): Promise<Pokemon[]> {
    return await this.pokemonService.findAll();
  }

  @Query(() => Pokemon)
  async pokemon(@Args() { id }: PokemonArgs): Promise<Pokemon> {
    return this.pokemonService.find(id);
  }
}

export default PokemonResolver;
