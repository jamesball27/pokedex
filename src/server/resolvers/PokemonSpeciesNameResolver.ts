import { Resolver } from 'type-graphql';

import PokemonSpeciesName from '../../types/PokemonSpeciesName';

@Resolver(() => PokemonSpeciesName)
class PokemonSpeciesNameResolver {}

export default PokemonSpeciesNameResolver;
