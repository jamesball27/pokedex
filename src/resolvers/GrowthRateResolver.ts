import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import GrowthRate from '../entities/GrowthRate';
import GrowthRateDescription from '../entities/GrowthRateDescription';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver((of) => GrowthRate)
class GrowthRateResolver {
  constructor(
    @InjectRepository(GrowthRateDescription)
    private readonly descriptionRepository: Repository<GrowthRateDescription>,
  ) {}

  @FieldResolver(() => GrowthRateDescription)
  async descriptions(@Root() growthRate: GrowthRate): Promise<GrowthRateDescription[]> {
    return resolveOneToMany<GrowthRate, GrowthRateDescription>({
      repository: this.descriptionRepository,
      relation: 'growthRate',
      parentId: growthRate.id,
    });
  }
}

export default GrowthRateResolver;
