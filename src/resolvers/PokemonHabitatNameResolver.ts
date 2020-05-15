import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import PokemonHabitatName from '../entities/PokemonHabitatName';

const BaseResolver = createLanguageFieldResolver<PokemonHabitatName>(PokemonHabitatName);

@Resolver((of) => PokemonHabitatName)
class PokemonHabitatNameResolver extends BaseResolver {}

export default PokemonHabitatNameResolver;
