import { Resolver } from 'type-graphql';

import PokemonEntry from '../entities/PokemonEntry';

@Resolver(() => PokemonEntry)
class PokemonEntryResolver {}

export default PokemonEntryResolver;
