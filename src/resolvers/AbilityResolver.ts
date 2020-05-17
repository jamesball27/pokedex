import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import resolveOneToMany from './base/resolveOneToMany';
import Ability from '../entities/Ability';
import AbilityName from '../entities/AbilityName';
import PokemonAbility from '../entities/PokemonAbility';

@Resolver(() => Ability)
class AbilityResolver {
  constructor(
    @InjectRepository(AbilityName)
    private readonly abilityNameRepository: Repository<AbilityName>,
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
  ) {}

  @FieldResolver(() => AbilityName)
  async names(@Root() ability: Ability): Promise<AbilityName[]> {
    return resolveOneToMany<Ability, AbilityName>({
      repository: this.abilityNameRepository,
      relation: 'ability',
      parentId: ability.id,
    });
  }

  @FieldResolver(() => PokemonAbility)
  async pokemon(@Root() ability: Ability): Promise<PokemonAbility[]> {
    return resolveOneToMany<Ability, PokemonAbility>({
      repository: this.pokemonAbilityRepository,
      relation: 'ability',
      parentId: ability.id,
    });
  }
}

export default AbilityResolver;
