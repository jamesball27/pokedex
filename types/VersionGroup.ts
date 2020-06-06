import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('versiongroup')
class VersionGroup {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;
}

export default VersionGroup;
