import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Name from './base/Name';
import Stat from './Stat';

@ObjectType()
@Entity('statname')
class StatName extends Name {
  @ManyToOne(() => Stat, 'names')
  stat: Stat;
}

export default StatName;
