import { Resolver } from 'type-graphql';

import PokemonHabitatName from '../entities/PokemonHabitatName';

@Resolver(() => PokemonHabitatName)
class PokemonHabitatNameResolver {}

export default PokemonHabitatNameResolver;
