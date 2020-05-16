import { Resolver } from 'type-graphql';

import EggGroupName from '../entities/EggGroupName';

@Resolver((of) => EggGroupName)
class EggGroupNameResolver {}

export default EggGroupNameResolver;
