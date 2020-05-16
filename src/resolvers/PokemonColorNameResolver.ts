import { Resolver } from 'type-graphql';

import PokemonColorName from '../entities/PokemonColorName';

@Resolver((of) => PokemonColorName)
class PokemonColorNameResolver {}

export default PokemonColorNameResolver;
