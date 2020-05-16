import { Resolver } from 'type-graphql';

import PokemonSpeciesFlavorText from '../entities/PokemonSpeciesFlavorText';

@Resolver((of) => PokemonSpeciesFlavorText)
class PokemonSpeciesFlavorTextResolver {}

export default PokemonSpeciesFlavorTextResolver;
