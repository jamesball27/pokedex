import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import PokemonShapeName from '../entities/PokemonShapeName';

const BaseResolver = createLanguageFieldResolver<PokemonShapeName>(PokemonShapeName);

@Resolver((of) => PokemonShapeName)
class PokemonShapeNameResolver extends BaseResolver {}

export default PokemonShapeNameResolver;
