import { Resolver, Query, Field, Int, ArgsType, Args, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import GrowthRate from '../entities/GrowthRate';
import GrowthRateDescription from '../entities/GrowthRateDescription';

@Resolver((of) => GrowthRate)
class GrowthRateResolver {
  constructor(
    @InjectRepository(GrowthRateDescription)
    private readonly descriptionRepository: Repository<GrowthRateDescription>,
  ) {}

  @FieldResolver(() => GrowthRateDescription)
  async descriptions(@Root() growthRate: GrowthRate): Promise<GrowthRateDescription[]> {
    return this.descriptionRepository.find({
      relations: ['growthRate'],
      where: { growthRate: { id: growthRate.id } },
    });
  }
}

export default GrowthRateResolver;
