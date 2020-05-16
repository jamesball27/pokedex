import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonSpecies from '../entities/PokemonSpecies';
import GrowthRate from '../entities/GrowthRate';
import PokemonColor from '../entities/PokemonColor';
import PokemonShape from '../entities/PokemonShape';
import PokemonHabitat from '../entities/PokemonHabitat';
import EggGroup from '../entities/EggGroup';
import PokemonSpeciesName from '../entities/PokemonSpeciesName';
import PokemonSpeciesFlavorText from '../entities/PokemonSpeciesFlavorText';
import resolveManyToOne from './base/resolveManyToOne';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver((of) => PokemonSpecies)
class PokemonSpeciesResolver {
  constructor(
    @InjectRepository(PokemonSpecies)
    private readonly pokemonSpeciesRepository: Repository<PokemonSpecies>,
    @InjectRepository(EggGroup)
    private readonly eggGroupRepository: Repository<EggGroup>,
    @InjectRepository(PokemonSpeciesName)
    private readonly nameRepository: Repository<PokemonSpeciesName>,
    @InjectRepository(PokemonSpeciesFlavorText)
    private readonly flavorTextRepository: Repository<PokemonSpeciesFlavorText>,
  ) {}

  @FieldResolver(() => GrowthRate)
  async growthRate(@Root() pokemonSpecies: PokemonSpecies): Promise<GrowthRate> {
    return resolveManyToOne<PokemonSpecies, GrowthRate>({
      repository: this.pokemonSpeciesRepository,
      relation: 'growthRate',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => PokemonColor)
  async color(@Root() pokemonSpecies: PokemonSpecies): Promise<PokemonColor> {
    return resolveManyToOne<PokemonSpecies, PokemonColor>({
      repository: this.pokemonSpeciesRepository,
      relation: 'color',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => PokemonShape)
  async shape(@Root() pokemonSpecies: PokemonSpecies): Promise<PokemonShape> {
    return resolveManyToOne<PokemonSpecies, PokemonShape>({
      repository: this.pokemonSpeciesRepository,
      relation: 'shape',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => PokemonHabitat)
  async habitat(@Root() pokemonSpecies: PokemonSpecies): Promise<PokemonHabitat> {
    return resolveManyToOne<PokemonSpecies, PokemonHabitat>({
      repository: this.pokemonSpeciesRepository,
      relation: 'habitat',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => EggGroup)
  async eggGroups(@Root() pokemonSpecies: PokemonSpecies): Promise<EggGroup[]> {
    // TODO: extract ManyToMany into helper function
    return this.eggGroupRepository.find({
      relations: ['pokemonSpecies'],
      where: { pokemonSpecies: { id: pokemonSpecies.id } },
    });
  }

  @FieldResolver(() => PokemonSpeciesFlavorText)
  async flavorTextEntries(@Root() species: PokemonSpecies): Promise<PokemonSpeciesFlavorText[]> {
    return resolveOneToMany<PokemonSpecies, PokemonSpeciesFlavorText>({
      repository: this.flavorTextRepository,
      relation: 'pokemonSpecies',
      parentId: species.id,
    });
  }
}

export default PokemonSpeciesResolver;
