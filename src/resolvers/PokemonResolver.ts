import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min, Max } from 'class-validator';

import Pokemon from '../entities/Pokemon';
import Ability from '../entities/Ability';

@ArgsType()
class PokemonArgs {
  @Field(() => Int, { nullable: false })
  @Min(1)
  id: number;
}

@Resolver((of) => Pokemon)
class PokemonResolver {
  constructor(
    @InjectRepository(Pokemon) private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Ability) private readonly abilityRepository: Repository<Ability>,
  ) {}

  @Query(() => [Pokemon])
  async allPokemon(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  @Query(() => Pokemon)
  async pokemon(@Args() { id }: PokemonArgs): Promise<Pokemon> {
    return this.pokemonRepository.findOneOrFail(id);
  }

  @FieldResolver(() => Ability)
  async abilities(@Root() ability: Ability): Promise<Ability[]> {
    return this.abilityRepository.find({ id: ability.id });
  }
}

export default PokemonResolver;
