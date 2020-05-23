import { Resolver } from 'type-graphql';

import PokemonColorName from '../../types/PokemonColorName';

@Resolver(() => PokemonColorName)
class PokemonColorNameResolver {}

export default PokemonColorNameResolver;
