import { Resolver } from 'type-graphql';

import PokemonColorName from '../entities/PokemonColorName';

@Resolver(() => PokemonColorName)
class PokemonColorNameResolver {}

export default PokemonColorNameResolver;
