import { Resolver } from 'type-graphql';

import GrowthRateDescription from '../entities/GrowthRateDescription';

@Resolver(() => GrowthRateDescription)
class GrowthRateDescriptionResolver {}

export default GrowthRateDescriptionResolver;
