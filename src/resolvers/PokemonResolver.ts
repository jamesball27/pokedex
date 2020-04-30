import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min, Max } from 'class-validator';

import Pokemon from '../entities/Pokemon';
import PokemonAbility from '../entities/PokemonAbility';

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
    @InjectRepository(PokemonAbility) private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
  ) {}

  @Query(() => [Pokemon])
  async allPokemon(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  @Query(() => Pokemon)
  async pokemon(@Args() { id }: PokemonArgs): Promise<Pokemon> {
    return this.pokemonRepository.findOneOrFail(id);
  }

  @FieldResolver(() => PokemonAbility)
  async abilities(@Root() pokemon: Pokemon): Promise<PokemonAbility[]> {
    return this.pokemonAbilityRepository.find({ relations: ['pokemon'], where: { pokemon: { id: pokemon.id } } });
  }
}

export default PokemonResolver;
