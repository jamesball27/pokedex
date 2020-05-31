import { Resolver, FieldResolver, Root, Args } from 'type-graphql';

import Type from '../../types/Type';
import LangArg from './LangArg';

@Resolver(() => Type)
class TypeResolver {
  @FieldResolver()
  localeName(@Root() type: Type, @Args() { lang }: LangArg): string {
    // Names are eager loaded, so filter in application
    return type.names.find((name) => name.language.name === lang)?.name || 'translation not found';
  }
}

export default TypeResolver;
