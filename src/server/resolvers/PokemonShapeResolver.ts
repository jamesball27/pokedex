import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonShape from '../../types/PokemonShape';
import PokemonShapeName from '../../types/PokemonShapeName';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver(() => PokemonShape)
class PokemonShapeResolver {
  constructor(
    @InjectRepository(PokemonShapeName)
    private readonly nameRepository: Repository<PokemonShapeName>,
  ) {}

  @FieldResolver(() => PokemonShapeName)
  async names(@Root() shape: PokemonShape): Promise<PokemonShapeName[]> {
    return resolveOneToMany<PokemonShape, PokemonShapeName>({
      repository: this.nameRepository,
      relation: 'shape',
      parentId: shape.id,
    });
  }
}

export default PokemonShapeResolver;
