import { Resolver } from 'type-graphql';

import PokemonSpeciesName from '../entities/PokemonSpeciesName';

@Resolver((of) => PokemonSpeciesName)
class PokemonSpeciesNameResolver {}

export default PokemonSpeciesNameResolver;
