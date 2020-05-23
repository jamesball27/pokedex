import { Resolver } from 'type-graphql';

import PokemonEntry from '../../types/PokemonEntry';

@Resolver(() => PokemonEntry)
class PokemonEntryResolver {}

export default PokemonEntryResolver;
