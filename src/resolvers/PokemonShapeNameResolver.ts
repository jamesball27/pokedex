import { Resolver } from 'type-graphql';

import PokemonShapeName from '../entities/PokemonShapeName';

@Resolver((of) => PokemonShapeName)
class PokemonShapeNameResolver {}

export default PokemonShapeNameResolver;
