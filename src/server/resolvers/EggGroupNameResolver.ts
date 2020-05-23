import { Resolver } from 'type-graphql';

import EggGroupName from '../../types/EggGroupName';

@Resolver(() => EggGroupName)
class EggGroupNameResolver {}

export default EggGroupNameResolver;
