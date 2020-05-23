import { Resolver } from 'type-graphql';

import PokemonHabitatName from '../../types/PokemonHabitatName';

@Resolver(() => PokemonHabitatName)
class PokemonHabitatNameResolver {}

export default PokemonHabitatNameResolver;
