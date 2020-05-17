import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../entities/Pokemon';
import PokemonType from '../entities/PokemonType';
import Type from '../entities/Type';
import resolveManyToOne from './base/resolveManyToOne';

@Resolver(() => PokemonType)
class PokemonTypeResolver {
  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
  ) {}

  @FieldResolver(() => Type)
  async type(@Root() pokemonType: PokemonType): Promise<Type> {
    return resolveManyToOne<PokemonType, Type>({
      repository: this.pokemonTypeRepository,
      relation: 'type',
      parentId: pokemonType.id,
    });
  }

  @FieldResolver(() => Pokemon)
  async pokemon(@Root() pokemonType: PokemonType): Promise<Pokemon> {
    return resolveManyToOne<PokemonType, Pokemon>({
      repository: this.pokemonTypeRepository,
      relation: 'pokemon',
      parentId: pokemonType.id,
    });
  }
}

export default PokemonTypeResolver;
