import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Type from '../entities/Type';
import TypeName from '../entities/TypeName';
import PokemonType from '../entities/PokemonType';

@Resolver((of) => Type)
class TypeResolver {
  constructor(
    @InjectRepository(TypeName)
    private readonly typeNameRepository: Repository<TypeName>,
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
  ) {}

  @FieldResolver(() => TypeName)
  async names(@Root() type: Type): Promise<TypeName[]> {
    return this.typeNameRepository.find({
      relations: ['type'],
      where: { type: { id: type.id } },
    });
  }

  @FieldResolver(() => PokemonType)
  async pokemon(@Root() type: Type): Promise<PokemonType[]> {
    return this.pokemonTypeRepository.find({
      relations: ['type'],
      where: { ability: { id: type.id } },
    });
  }
}

export default TypeResolver;
