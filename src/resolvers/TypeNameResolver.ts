import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import TypeName from '../entities/TypeName';
import Language from '../entities/Language';

@Resolver((of) => TypeName)
class TypeNameResolver {
  constructor(
    @InjectRepository(TypeName)
    private readonly typeNameRepository: Repository<TypeName>,
  ) {}

  @FieldResolver(() => Language)
  async language(@Root() typeName: TypeName): Promise<Language> {
    return this.typeNameRepository
      .findOneOrFail(typeName.id, { relations: ['language'] })
      .then((an) => an.language);
  }
}

export default TypeNameResolver;
