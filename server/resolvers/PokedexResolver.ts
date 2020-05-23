import { Resolver, Query, FieldResolver, Root, Args, ArgsType, Field, Int } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Min, Max } from 'class-validator';

import Pokedex from '../../types/Pokedex';
import PokemonEntry from '../../types/PokemonEntry';

@ArgsType()
class EntryArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(() => Int, { defaultValue: 25 })
  @Min(0)
  @Max(100)
  take: number;
}

@Resolver(() => Pokedex)
class PokedexResolver {
  constructor(
    @InjectRepository(Pokedex)
    private readonly pokedexRepository: Repository<Pokedex>,
    @InjectRepository(PokemonEntry)
    private readonly pokemonEntryRepository: Repository<PokemonEntry>,
  ) {}

  @Query(() => Pokedex)
  async pokedex(): Promise<Pokedex> {
    // the 'national' pokedex contains entries for all pokemon
    const nationalDexId = 1;
    return this.pokedexRepository.findOneOrFail(nationalDexId);
  }

  @FieldResolver(() => PokemonEntry)
  async pokemonEntries(
    @Root() pokedex: Pokedex,
    @Args() { skip, take }: EntryArgs,
  ): Promise<PokemonEntry[]> {
    return this.pokemonEntryRepository.find({
      relations: ['pokedex'],
      where: { pokedex: { id: pokedex.id } },
      order: { entryNumber: 'ASC' },
      skip,
      take,
    });
  }
}

export default PokedexResolver;
