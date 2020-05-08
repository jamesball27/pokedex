import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import AbilityName from '../entities/AbilityName';
import { Resolver } from 'type-graphql';

const BaseResolver = createLanguageFieldResolver<AbilityName>(AbilityName);

@Resolver((of) => AbilityName)
class AbilityNameResolver extends BaseResolver {}

export default AbilityNameResolver;
