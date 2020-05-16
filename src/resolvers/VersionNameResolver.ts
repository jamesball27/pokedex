import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import VersionName from '../entities/VersionName';

const BaseResolver = createLanguageFieldResolver<VersionName>(VersionName);

@Resolver((of) => VersionName)
class VersionNameResolver extends BaseResolver {}

export default VersionNameResolver;
