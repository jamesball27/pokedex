import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min } from 'class-validator';

import Ability from '../entities/Ability';
import AbilityName from '../entities/AbilityName';
import Language from '../entities/Language';

@ArgsType()
class AbilityArgs {
  @Field(() => Int, { nullable: false })
  @Min(1)
  id: number;
}

@Resolver((of) => Ability)
class AbilityResolver {
  constructor(
    @InjectRepository(Ability) private readonly abilityRepository: Repository<Ability>,
    @InjectRepository(AbilityName) private readonly abilityNameRepository: Repository<AbilityName>,
  ) {}

  @Query(() => [Ability])
  async allAbilities(): Promise<Ability[]> {
    return this.abilityRepository.find();
  }

  @Query(() => Ability)
  async ability(@Args() { id }: AbilityArgs): Promise<Ability> {
    return this.abilityRepository.findOneOrFail(id);
  }

  @FieldResolver(() => AbilityName)
  async names(@Root() ability: Ability): Promise<AbilityName[]> {
    return this.abilityNameRepository.find({ id: ability.id });
  }
}

export default AbilityResolver;
