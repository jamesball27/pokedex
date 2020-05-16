import { Resolver, ClassType, Root, FieldResolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Language from '../../entities/Language';
import Description from '../../entities/base/Description';
import Name from '../../entities/base/Name';
import FlavorText from '../../entities/base/FlavorText';

function createLanguageFieldResolver<T extends Description | Name | FlavorText>(
  TypeClass: ClassType<T>,
) {
  @Resolver(() => TypeClass)
  abstract class BaseResolver {
    @InjectRepository(TypeClass)
    protected readonly parentTypeRepository: Repository<T>;

    @FieldResolver(() => Language)
    async language(@Root() parent: T): Promise<Language> {
      return parent.language;
      // return this.parentTypeRepository
      //   .findOneOrFail(parent.id, { relations: ['language'] })
      //   .then((p) => p.language);
    }
  }

  return BaseResolver;
}

export default createLanguageFieldResolver;
