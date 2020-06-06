import { Resolver } from 'type-graphql';

import StatName from '../../types/StatName';

@Resolver(() => StatName)
class StatNameResolver {}

export default StatNameResolver;
