import { Resolver, Query } from 'type-graphql';
import { Repository, In } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Language, { SupportedLanguageNames } from '../../types/Language';

@Resolver(() => Language)
class LanguageResolver {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  @Query(() => [Language])
  async languages(): Promise<Language[]> {
    return this.languageRepository.find({ where: { name: In([...SupportedLanguageNames]) } });
  }
}

export default LanguageResolver;
