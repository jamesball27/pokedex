import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import EggGroup from '../entities/EggGroup';
import EggGroupName from '../entities/EggGroupName';

@Resolver((of) => EggGroup)
class EggGroupResolver {
  constructor(
    @InjectRepository(EggGroupName)
    private readonly nameRepository: Repository<EggGroupName>,
  ) {}

  @FieldResolver(() => EggGroupName)
  async names(@Root() eggGroup: EggGroup): Promise<EggGroupName[]> {
    return this.nameRepository.find({
      relations: ['eggGroup'],
      where: { eggGroup: { id: eggGroup.id } },
    });
  }
}

export default EggGroupResolver;
