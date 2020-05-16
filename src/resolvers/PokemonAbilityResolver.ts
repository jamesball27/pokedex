import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../entities/Pokemon';
import PokemonAbility from '../entities/PokemonAbility';
import Ability from '../entities/Ability';
import resolveManyToOne from './base/resolveManyToOne';

@Resolver((of) => PokemonAbility)
class PokemonAbilityResolver {
  constructor(
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
  ) {}

  @FieldResolver(() => Ability)
  async ability(@Root() pokemonAbility: PokemonAbility): Promise<Ability> {
    return resolveManyToOne<PokemonAbility, Ability>({
      repository: this.pokemonAbilityRepository,
      relation: 'ability',
      parentId: pokemonAbility.id,
    });
  }

  @FieldResolver(() => Pokemon)
  async pokemon(@Root() pokemonAbility: PokemonAbility): Promise<Pokemon> {
    return resolveManyToOne<PokemonAbility, Pokemon>({
      repository: this.pokemonAbilityRepository,
      relation: 'pokemon',
      parentId: pokemonAbility.id,
    });
  }
}

export default PokemonAbilityResolver;
