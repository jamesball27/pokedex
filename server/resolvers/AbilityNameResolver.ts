import { Resolver } from 'type-graphql';

import AbilityName from '../../types/AbilityName';

@Resolver(() => AbilityName)
class AbilityNameResolver {}

export default AbilityNameResolver;
