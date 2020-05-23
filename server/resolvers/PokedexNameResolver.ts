import { Resolver } from 'type-graphql';

import PokedexName from '../../types/PokedexName';

@Resolver(() => PokedexName)
class PokedexNameResolver {}

export default PokedexNameResolver;
