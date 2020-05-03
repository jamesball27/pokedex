import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Type from '../entities/Type';
import PokemonType from '../entities/PokemonType';

@Resolver((of) => Type)
class TypeResolver {
  constructor(@InjectRepository(PokemonType) private readonly PokemonTypeRepository: Repository<PokemonType>) {}

  @FieldResolver(() => PokemonType)
  async pokemon(@Root() type: Type): Promise<PokemonType[]> {
    return this.PokemonTypeRepository.find({ relations: ['type'], where: { ability: { id: type.id } } });
  }
}

export default TypeResolver;
