import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min } from 'class-validator';

import Pokemon from '../../types/Pokemon';
import PokemonAbility from '../../types/PokemonAbility';
import PokemonType from '../../types/PokemonType';
import PokemonSpecies from '../../types/PokemonSpecies';
import resolveOneToMany from './base/resolveOneToMany';
import resolveManyToOne from './base/resolveManyToOne';

@ArgsType()
class PokemonArgs {
  @Field(() => Int, { nullable: false })
  @Min(1)
  id: number;
}

@Resolver(() => Pokemon)
class PokemonResolver {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
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
    return resolveOneToMany<Pokemon, PokemonAbility>({
      repository: this.pokemonAbilityRepository,
      relation: 'pokemon',
      parentId: pokemon.id,
    });
  }

  @FieldResolver(() => PokemonType)
  async types(@Root() pokemon: Pokemon): Promise<PokemonType[]> {
    return resolveOneToMany<Pokemon, PokemonType>({
      repository: this.pokemonTypeRepository,
      relation: 'pokemon',
      parentId: pokemon.id,
    });
  }

  @FieldResolver(() => PokemonSpecies)
  async species(@Root() pokemon: Pokemon): Promise<PokemonSpecies> {
    return resolveManyToOne<Pokemon, PokemonSpecies>({
      repository: this.pokemonRepository,
      relation: 'species',
      parentId: pokemon.id,
    });
  }
}

export default PokemonResolver;
