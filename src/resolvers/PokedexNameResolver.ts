import { Resolver } from 'type-graphql';

import PokedexName from '../entities/PokedexName';

@Resolver(() => PokedexName)
class PokedexNameResolver {}

export default PokedexNameResolver;
