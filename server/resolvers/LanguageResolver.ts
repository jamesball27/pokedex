import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { Repository, In } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Language, { SupportedLanguageName } from '../../types/Language';

// Languages that have translations for all used fields
const SUPPORTED_LANGUAGES: SupportedLanguageName[] = [
  'ja-Hrkt',
  'ko',
  'en',
  'fr',
  'de',
  'es',
  'it',
];

@Resolver(() => Language)
class LanguageResolver {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  @Query(() => [Language])
  async languages(): Promise<Language[]> {
    return this.languageRepository.find({ where: { name: In(SUPPORTED_LANGUAGES) } });
  }
}

export default LanguageResolver;
