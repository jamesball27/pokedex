import { Resolver } from 'type-graphql';

import GrowthRateDescription from '../entities/GrowthRateDescription';

@Resolver((of) => GrowthRateDescription)
class GrowthRateDescriptionResolver {}

export default GrowthRateDescriptionResolver;
