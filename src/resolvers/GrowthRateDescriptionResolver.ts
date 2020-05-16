import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import GrowthRateDescription from '../entities/GrowthRateDescription';
import { Resolver } from 'type-graphql';

const BaseResolver = createLanguageFieldResolver<GrowthRateDescription>(GrowthRateDescription);

@Resolver((of) => GrowthRateDescription)
class GrowthRateDescriptionResolver extends BaseResolver {}

export default GrowthRateDescriptionResolver;
