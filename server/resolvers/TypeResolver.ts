import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Type from '../../types/Type';
import TypeName from '../../types/TypeName';
import PokemonType from '../../types/PokemonType';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver(() => Type)
class TypeResolver {
  constructor(
    @InjectRepository(TypeName)
    private readonly typeNameRepository: Repository<TypeName>,
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
  ) {}

  @FieldResolver(() => TypeName)
  async names(@Root() type: Type): Promise<TypeName[]> {
    return resolveOneToMany<Type, TypeName>({
      repository: this.typeNameRepository,
      relation: 'type',
      parentId: type.id,
    });
  }

  @FieldResolver(() => PokemonType)
  async pokemon(@Root() type: Type): Promise<PokemonType[]> {
    return resolveOneToMany<Type, PokemonType>({
      repository: this.pokemonTypeRepository,
      relation: 'type',
      parentId: type.id,
    });
  }
}

export default TypeResolver;
