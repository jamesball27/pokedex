import { Resolver } from 'type-graphql';

import PokemonSpeciesName from '../entities/PokemonSpeciesName';

@Resolver(() => PokemonSpeciesName)
class PokemonSpeciesNameResolver {}

export default PokemonSpeciesNameResolver;
