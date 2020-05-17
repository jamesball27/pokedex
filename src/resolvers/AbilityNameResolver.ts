import { Resolver } from 'type-graphql';

import AbilityName from '../entities/AbilityName';

@Resolver(() => AbilityName)
class AbilityNameResolver {}

export default AbilityNameResolver;
