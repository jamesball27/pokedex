import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import PokemonSpeciesName from '../entities/PokemonSpeciesName';

const BaseResolver = createLanguageFieldResolver<PokemonSpeciesName>(PokemonSpeciesName);

@Resolver((of) => PokemonSpeciesName)
class PokemonSpeciesNameResolver extends BaseResolver {}

export default PokemonSpeciesNameResolver;
