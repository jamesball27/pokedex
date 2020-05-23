import { Resolver } from 'type-graphql';

import PokemonShapeName from '../../types/PokemonShapeName';

@Resolver(() => PokemonShapeName)
class PokemonShapeNameResolver {}

export default PokemonShapeNameResolver;
