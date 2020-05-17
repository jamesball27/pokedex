import { Resolver } from 'type-graphql';

import EggGroupName from '../entities/EggGroupName';

@Resolver(() => EggGroupName)
class EggGroupNameResolver {}

export default EggGroupNameResolver;
