import { Resolver } from 'type-graphql';

import VersionName from '../entities/VersionName';

@Resolver(() => VersionName)
class VersionNameResolver {}

export default VersionNameResolver;
