import { Resolver, FieldResolver, Root, Args } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Move from '../../types/Move';
import MoveFlavorText from '../../types/MoveFlavorText';
import LangArg from './LangArg';
import Type from '../../types/Type';
import resolveManyToOne from './base/resolveManyToOne';

@Resolver(() => Move)
class MoveResolver {
  constructor(
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>,
    @InjectRepository(MoveFlavorText)
    private readonly flavorTextRepository: Repository<MoveFlavorText>,
  ) {}

  @FieldResolver()
  localeName(@Root() move: Move, @Args() { lang }: LangArg): string {
    // Names are eager loaded, so filter in application
    return move.names.find((name) => name.language.name === lang)?.name || 'translation not found';
  }

  @FieldResolver(() => String)
  async flavorText(@Root() move: Move, @Args() { lang }: LangArg): Promise<string> {
    return this.flavorTextRepository
      .find({
        where: { move: { id: move.id } },
        order: { versionGroup: 'ASC' },
      })
      .then((f) => {
        // language is eager-loaded so filter in application
        const text =
          // flavortext has random newlines in db
          f.find((f) => f.language.name === lang)?.flavorText.replace('\n', ' ') ||
          'translation not found';
        return text;
      });
  }

  @FieldResolver(() => Type)
  async type(@Root() move: Move): Promise<Type> {
    return resolveManyToOne<Move, Type>({
      repository: this.moveRepository,
      relation: 'type',
      parentId: move.id,
    });
  }
}

export default MoveResolver;
