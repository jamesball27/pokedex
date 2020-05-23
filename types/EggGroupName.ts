import { ObjectType, Field } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Name from './base/Name';
import EggGroup from './EggGroup';

@ObjectType()
@Entity('egggroupname')
class EggGroupName extends Name {
  @Field(() => EggGroup, { nullable: true })
  @ManyToOne(() => EggGroup, 'names')
  eggGroup: EggGroup;
}

export default EggGroupName;
