import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonHabitat from '../entities/PokemonHabitat';
import PokemonHabitatName from '../entities/PokemonHabitatName';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver((of) => PokemonHabitat)
class PokemonHabitatResolver {
  constructor(
    @InjectRepository(PokemonHabitatName)
    private readonly nameRepository: Repository<PokemonHabitatName>,
  ) {}

  @FieldResolver(() => PokemonHabitatName)
  async names(@Root() habitat: PokemonHabitat): Promise<PokemonHabitatName[]> {
    return resolveOneToMany<PokemonHabitat, PokemonHabitatName>({
      repository: this.nameRepository,
      relation: 'habitat',
      parentId: habitat.id,
    });
  }
}

export default PokemonHabitatResolver;
