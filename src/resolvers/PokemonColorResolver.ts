import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonColor from '../entities/PokemonColor';
import PokemonColorName from '../entities/PokemonColorName';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver(() => PokemonColor)
class PokemonColorResolver {
  constructor(
    @InjectRepository(PokemonColorName)
    private readonly nameRepository: Repository<PokemonColorName>,
  ) {}
  @FieldResolver(() => PokemonColorName)
  async names(@Root() color: PokemonColor): Promise<PokemonColorName[]> {
    return resolveOneToMany<PokemonColor, PokemonColorName>({
      repository: this.nameRepository,
      relation: 'color',
      parentId: color.id,
    });
  }
}

export default PokemonColorResolver;
