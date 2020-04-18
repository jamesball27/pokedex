import { Resolver, Query, Field, Int, ArgsType, Args } from 'type-graphql';
import { Min, Max } from 'class-validator';

import Pokemon from '../types/Pokemon';
import PokemonService from '../services/PokemonService';
import PokemonType from '../types/Pokemon';

@ArgsType()
class PokemonArgs {
  @Field(() => Int, { nullable: false })
  @Min(1)
  @Max(151)
  id: number;
}

@Resolver()
class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [Pokemon])
  async allPokemon(): Promise<PokemonType[]> {
    return this.pokemonService.getAll();
  }

  @Query(() => Pokemon)
  async pokemon(@Args() { id }: PokemonArgs): Promise<PokemonType> {
    return this.pokemonService.get(id);
  }
}

export default PokemonResolver;
