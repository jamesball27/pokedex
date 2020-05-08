import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonSpecies from '../entities/PokemonSpecies';
import GrowthRate from '../entities/GrowthRate';
import EggGroup from '../entities/EggGroup';

@Resolver((of) => PokemonSpecies)
class PokemonSpeciesResolver {
  constructor(
    @InjectRepository(PokemonSpecies)
    private readonly pokemonSpeciesRepository: Repository<PokemonSpecies>,
    @InjectRepository(EggGroup)
    private readonly eggGroupRepository: Repository<EggGroup>,
  ) {}

  @FieldResolver(() => GrowthRate)
  async growthRate(@Root() pokemonSpecies: PokemonSpecies): Promise<GrowthRate> {
    return this.pokemonSpeciesRepository
      .findOneOrFail(pokemonSpecies.id, { relations: ['growthRate'] })
      .then((ps) => ps.growthRate);
  }

  @FieldResolver(() => EggGroup)
  async eggGroups(@Root() pokemonSpecies: PokemonSpecies): Promise<EggGroup[]> {
    return this.eggGroupRepository.find({
      relations: ['pokemonSpecies'],
      where: { pokemonSpecies: { id: pokemonSpecies.id } },
    });
  }
}

export default PokemonSpeciesResolver;
