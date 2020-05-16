import { Resolver } from 'type-graphql';

import PokemonHabitatName from '../entities/PokemonHabitatName';

@Resolver((of) => PokemonHabitatName)
class PokemonHabitatNameResolver {}

export default PokemonHabitatNameResolver;
