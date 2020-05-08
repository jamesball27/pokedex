import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import AbilityName from '../entities/AbilityName';

const BaseResolver = createLanguageFieldResolver<AbilityName>(AbilityName);

@Resolver((of) => AbilityName)
class AbilityNameResolver extends BaseResolver {}

export default AbilityNameResolver;
