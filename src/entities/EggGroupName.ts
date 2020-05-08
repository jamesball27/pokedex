import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';

import Name from './base/Name';
import EggGroup from './EggGroup';

@ObjectType()
@Entity('egggroupname')
class EggGroupName extends Name {
  @Field((type) => EggGroup, { nullable: true })
  @ManyToOne(() => EggGroup, 'names')
  eggGroup: EggGroup;
}

export default EggGroupName;
