import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import EggGroupName from '../entities/EggGroupName';

const BaseResolver = createLanguageFieldResolver<EggGroupName>(EggGroupName);

@Resolver((of) => EggGroupName)
class EggGroupNameResolver extends BaseResolver {}

export default EggGroupNameResolver;
