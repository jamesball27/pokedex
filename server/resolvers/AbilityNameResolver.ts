import { Resolver } from 'type-graphql';

import AbilityName from '../entities/AbilityName';

@Resolver((of) => AbilityName)
class AbilityNameResolver {}

export default AbilityNameResolver;
