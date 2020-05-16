import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import PokedexName from '../entities/PokedexName';

const BaseResolver = createLanguageFieldResolver<PokedexName>(PokedexName);

@Resolver((of) => PokedexName)
class PokedexNameResolver extends BaseResolver {}

export default PokedexNameResolver;
