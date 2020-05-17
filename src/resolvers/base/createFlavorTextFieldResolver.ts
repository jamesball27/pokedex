import { Resolver, ClassType, Root, FieldResolver } from 'type-graphql';

import FlavorText from '../../entities/base/FlavorText';
import Version from '../../entities/Version';
import createLanguageFieldResolver from './createLanguageFieldResolver';

function createFlavorTextFieldResolver<T extends FlavorText>(TypeClass: ClassType<T>): ClassType {
  @Resolver(() => TypeClass)
  class BaseResolver extends createLanguageFieldResolver<T>(TypeClass) {
    @FieldResolver(() => Version)
    async version(@Root() parent: T): Promise<Version> {
      return this.parentTypeRepository
        .findOneOrFail(parent.id, { relations: ['version'] })
        .then((p) => p.version);
    }
  }

  return BaseResolver;
}

export default createFlavorTextFieldResolver;
