import { Resolver } from 'type-graphql';

import PokemonShapeName from '../entities/PokemonShapeName';

@Resolver(() => PokemonShapeName)
class PokemonShapeNameResolver {}

export default PokemonShapeNameResolver;
