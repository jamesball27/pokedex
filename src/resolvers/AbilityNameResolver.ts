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

@Resolver((of) => AbilityName)
class AbilityNameResolver {
  constructor(
    @InjectRepository(AbilityName) private readonly abilityNameRepository: Repository<AbilityName>,
    @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
  ) {}

  @Query(() => [AbilityName])
  async allAbilityNames(): Promise<AbilityName[]> {
    return this.abilityNameRepository.find();
  }

  @Query(() => AbilityName)
  async abilityName(@Args() { id }: AbilityArgs): Promise<AbilityName> {
    return this.abilityNameRepository.findOneOrFail(id);
  }

  @FieldResolver(() => Language)
  async languages(@Root() abilityName: AbilityName): Promise<Language[]> {
    return await this.languageRepository.find({ id: abilityName.id });
  }
}

export default AbilityNameResolver;
