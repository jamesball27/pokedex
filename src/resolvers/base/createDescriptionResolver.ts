import { Resolver, ClassType, Root, FieldResolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Language from '../../entities/Language';
import Description from '../../entities/base/Description';

function createDescriptionResovler<T extends Description>(TypeClass: ClassType<T>) {
  @Resolver(() => TypeClass)
  abstract class BaseResolver {
    @InjectRepository(TypeClass)
    private readonly parentTypeRepository: Repository<T>;

    @FieldResolver(() => Language)
    async language(@Root() parent: T): Promise<Language> {
      console.log(this.parentTypeRepository.target);
      return this.parentTypeRepository
        .findOneOrFail(parent.id, { relations: ['language'] })
        .then((p) => p.language);
    }
  }

  return BaseResolver;
}

export default createDescriptionResovler;
