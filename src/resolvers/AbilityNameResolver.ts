import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import AbilityName from '../entities/AbilityName';
import Language from '../entities/Language';

@Resolver((of) => AbilityName)
class AbilityNameResolver {
  constructor(@InjectRepository(AbilityName) private readonly abilityNameRepository: Repository<AbilityName>) {}

  @FieldResolver(() => Language)
  async language(@Root() abilityName: AbilityName): Promise<Language> {
    return this.abilityNameRepository
      .findOneOrFail(abilityName.id, { relations: ['language'] })
      .then((an) => an.language);
  }
}

export default AbilityNameResolver;
