import { Resolver } from 'type-graphql';

import PokedexName from '../entities/PokedexName';

@Resolver((of) => PokedexName)
class PokedexNameResolver {}

export default PokedexNameResolver;
