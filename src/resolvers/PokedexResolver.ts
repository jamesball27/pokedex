import { Resolver, Query, FieldResolver, Root, Args, ArgsType, Field, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min, Max } from 'class-validator';

import Pokedex from '../entities/Pokedex';
import PokemonEntry from '../entities/PokemonEntry';
import Pokemon from '../entities/Pokemon';

@ArgsType()
class EntryArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(() => Int, { defaultValue: 25 })
  @Min(0)
  @Max(100)
  take: number;

  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}

@Resolver((of) => Pokedex)
class PokedexResolver {
  constructor(
    @InjectRepository(Pokedex)
    private readonly pokedexRepository: Repository<Pokedex>,
  ) {}

  @Query(() => Pokedex)
  async nationalPokedex(): Promise<Pokedex> {
    // the 'national' pokedex contains entries for all pokemon
    const nationalDexId = 1;
    return this.pokedexRepository.findOneOrFail(nationalDexId);
  }

  @FieldResolver(() => PokemonEntry)
  async pokemonEntries(
    @Root() pokedex: Pokedex,
    @Args() { startIndex, endIndex }: EntryArgs,
  ): Promise<PokemonEntry[]> {
    return pokedex.pokemonEntries.sort((e) => e.entryNumber).slice(startIndex, endIndex);
  }
}

export default PokedexResolver;
