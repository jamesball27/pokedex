import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import EggGroup from '../../types/EggGroup';
import EggGroupName from '../../types/EggGroupName';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver(() => EggGroup)
class EggGroupResolver {
  constructor(
    @InjectRepository(EggGroupName)
    private readonly nameRepository: Repository<EggGroupName>,
  ) {}

  @FieldResolver(() => EggGroupName)
  async names(@Root() eggGroup: EggGroup): Promise<EggGroupName[]> {
    return resolveOneToMany<EggGroup, EggGroupName>({
      repository: this.nameRepository,
      relation: 'eggGroup',
      parentId: eggGroup.id,
    });
  }
}

export default EggGroupResolver;
