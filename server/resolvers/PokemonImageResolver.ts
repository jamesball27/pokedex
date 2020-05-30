import { Resolver } from 'type-graphql';

import PokemonImage from '../../types/PokemonImage';

@Resolver(() => PokemonImage)
class PokemonImageResolver {}

export default PokemonImageResolver;
