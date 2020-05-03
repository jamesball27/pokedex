import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min } from 'class-validator';

import Ability from '../entities/Ability';
import AbilityName from '../entities/AbilityName';
import PokemonAbility from '../entities/PokemonAbility';

@ArgsType()
class AbilityArgs {
  @Field(() => Int, { nullable: false })
  @Min(1)
  id: number;
}

@Resolver((of) => Ability)
class AbilityResolver {
  constructor(
    @InjectRepository(AbilityName)
    private readonly abilityNameRepository: Repository<AbilityName>,
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
  ) {}

  @FieldResolver(() => AbilityName)
  async names(@Root() ability: Ability): Promise<AbilityName[]> {
    return this.abilityNameRepository.find({ id: ability.id });
  }

  @FieldResolver(() => PokemonAbility)
  async pokemon(@Root() ability: Ability): Promise<PokemonAbility[]> {
    return this.pokemonAbilityRepository.find({
      relations: ['ability'],
      where: { ability: { id: ability.id } },
    });
  }
}

export default AbilityResolver;
