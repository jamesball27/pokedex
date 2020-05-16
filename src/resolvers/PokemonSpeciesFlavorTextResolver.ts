import { Resolver } from 'type-graphql';

import createFlavorTextFieldResolver from './base/createFlavorTextFieldResolver';
import PokemonSpeciesFlavorText from '../entities/PokemonSpeciesFlavorText';

const BaseResolver = createFlavorTextFieldResolver<PokemonSpeciesFlavorText>(
  PokemonSpeciesFlavorText,
);

@Resolver((of) => PokemonSpeciesFlavorText)
class PokemonSpeciesFlavorTextResolver extends BaseResolver {}

export default PokemonSpeciesFlavorTextResolver;
