import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Version from '../entities/Version';
import VersionName from '../entities/VersionName';
import resolveOneToMany from './base/resolveOneToMany';

@Resolver(() => Version)
class VersionResolver {
  constructor(
    @InjectRepository(VersionName)
    private readonly nameRepository: Repository<VersionName>,
  ) {}

  @FieldResolver(() => VersionName)
  async names(@Root() version: Version): Promise<VersionName[]> {
    return resolveOneToMany<Version, VersionName>({
      repository: this.nameRepository,
      relation: 'version',
      parentId: version.id,
    });
  }
}

export default VersionResolver;
