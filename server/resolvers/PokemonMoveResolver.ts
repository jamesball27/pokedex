import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonMove from '../../types/PokemonMove';
import Move from '../../types/Move';
import resolveManyToOne from './base/resolveManyToOne';

@Resolver(() => PokemonMove)
class PokemonMoveResolver {
  constructor(
    @InjectRepository(PokemonMove)
    private readonly pokemonMoveRepository: Repository<PokemonMove>,
  ) {}

  @FieldResolver(() => Move)
  async move(@Root() pokemonMove: PokemonMove): Promise<Move> {
    return resolveManyToOne<PokemonMove, Move>({
      repository: this.pokemonMoveRepository,
      relation: 'move',
      parentId: pokemonMove.id,
    });
  }
}

export default PokemonMoveResolver;
