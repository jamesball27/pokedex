import { Resolver } from 'type-graphql';

import PokemonEntry from '../entities/PokemonEntry';

@Resolver((of) => PokemonEntry)
class PokemonEntryResolver {}

export default PokemonEntryResolver;
