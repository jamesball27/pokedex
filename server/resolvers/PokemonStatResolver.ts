import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonStat from '../../types/PokemonStat';
import Stat from '../../types/Stat';
import resolveManyToOne from './base/resolveManyToOne';

@Resolver(() => PokemonStat)
class PokemonStatResolver {
  constructor(
    @InjectRepository(PokemonStat)
    private readonly pokemonStatRepository: Repository<PokemonStat>,
  ) {}

  @FieldResolver(() => Stat)
  async stat(@Root() pokemonStat: PokemonStat): Promise<Stat> {
    return resolveManyToOne<PokemonStat, Stat>({
      repository: this.pokemonStatRepository,
      relation: 'stat',
      parentId: pokemonStat.id,
    });
  }
}

export default PokemonStatResolver;
