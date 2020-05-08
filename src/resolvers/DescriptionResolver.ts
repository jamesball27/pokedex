import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Description from '../entities/base/Description';
import Language from '../entities/Language';

@Resolver((of) => Description)
class DescriptionResolver {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}
}

export default DescriptionResolver;
