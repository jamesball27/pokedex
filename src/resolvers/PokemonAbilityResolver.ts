import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../entities/Pokemon';
import PokemonAbility from '../entities/PokemonAbility';
import Ability from '../entities/Ability';

@Resolver((of) => PokemonAbility)
class PokemonAbilityResolver {
  constructor(
    @InjectRepository(PokemonAbility) private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
  ) {}

  @FieldResolver(() => Ability)
  async ability(@Root() pokemonAbility: PokemonAbility): Promise<Ability> {
    return this.pokemonAbilityRepository
      .findOneOrFail(pokemonAbility.id, { relations: ['ability'] })
      .then((pa) => pa.ability);
  }

  @FieldResolver(() => Pokemon)
  async pokemon(@Root() pokemonAbility: PokemonAbility): Promise<Pokemon> {
    return this.pokemonAbilityRepository
      .findOneOrFail(pokemonAbility.id, { relations: ['pokemon'] })
      .then((pa) => pa.pokemon);
  }
}

export default PokemonAbilityResolver;
