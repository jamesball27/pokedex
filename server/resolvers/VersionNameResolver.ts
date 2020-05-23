import { Resolver } from 'type-graphql';

import VersionName from '../../types/VersionName';

@Resolver(() => VersionName)
class VersionNameResolver {}

export default VersionNameResolver;
