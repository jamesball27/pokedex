import { Resolver, FieldResolver, Root, Args } from 'type-graphql';

import Stat from '../../types/Stat';
import LangArg from './LangArg';

@Resolver(() => Stat)
class StatResolver {
  @FieldResolver()
  localeName(@Root() stat: Stat, @Args() { lang }: LangArg): string {
    // Names are eager loaded, so filter in application
    return stat.names.find((name) => name.language.name === lang)?.name || 'translation not found';
  }
}

export default StatResolver;
