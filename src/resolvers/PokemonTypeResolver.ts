import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../entities/Pokemon';
import PokemonType from '../entities/PokemonType';
import Type from '../entities/Type';

@Resolver((of) => PokemonType)
class PokemonTypeResolver {
  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
  ) {}

  @FieldResolver(() => Type)
  async type(@Root() pokemonType: PokemonType): Promise<Type> {
    return await this.pokemonTypeRepository
      .findOneOrFail(pokemonType.id, { relations: ['type'] })
      .then((pa) => pa.type);
  }

  @FieldResolver(() => Pokemon)
  async pokemon(@Root() pokemonType: PokemonType): Promise<Pokemon> {
    return await this.pokemonTypeRepository
      .findOneOrFail(pokemonType.id, { relations: ['pokemon'] })
      .then((pa) => pa.pokemon);
  }
}

export default PokemonTypeResolver;
