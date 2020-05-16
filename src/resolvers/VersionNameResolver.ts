import { Resolver } from 'type-graphql';

import VersionName from '../entities/VersionName';

@Resolver((of) => VersionName)
class VersionNameResolver {}

export default VersionNameResolver;
