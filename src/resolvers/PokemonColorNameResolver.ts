import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import PokemonColorName from '../entities/PokemonColorName';

const BaseResolver = createLanguageFieldResolver<PokemonColorName>(PokemonColorName);

@Resolver((of) => PokemonColorName)
class PokemonColorNameResolver extends BaseResolver {}

export default PokemonColorNameResolver;
