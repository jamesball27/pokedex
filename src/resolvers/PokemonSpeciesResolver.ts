import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonSpecies from '../entities/PokemonSpecies';
import GrowthRate from '../entities/GrowthRate';

@Resolver((of) => PokemonSpecies)
class PokemonSpeciesResolver {
  constructor(
    @InjectRepository(PokemonSpecies)
    private readonly pokemonSpeciesRepository: Repository<PokemonSpecies>,
  ) {}

  @FieldResolver(() => GrowthRate)
  async growthRate(@Root() pokemonSpecies: PokemonSpecies): Promise<GrowthRate> {
    return this.pokemonSpeciesRepository
      .findOneOrFail(pokemonSpecies.id, { relations: ['growthRate'] })
      .then((ps) => ps.growthRate);
  }
}

export default PokemonSpeciesResolver;
