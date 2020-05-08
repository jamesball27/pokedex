import createDescriptionResolver from './base/createDescriptionResolver';
import GrowthRateDescription from '../entities/GrowthRateDescription';
import { Resolver } from 'type-graphql';

const BaseResolver = createDescriptionResolver<GrowthRateDescription>(GrowthRateDescription);

@Resolver((of) => GrowthRateDescription)
class GrowthRateDescriptionResolver extends BaseResolver {}

export default GrowthRateDescriptionResolver;
