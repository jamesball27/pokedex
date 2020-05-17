import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Name from './base/Name';
import Version from './Version';

@ObjectType()
@Entity('versionname')
class VersionName extends Name {
  @ManyToOne(() => Version, 'names')
  version: Version;
}

export default VersionName;
