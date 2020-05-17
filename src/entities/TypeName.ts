import { ObjectType } from 'type-graphql';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import Name from './base/Name';
import Type from './Type';

@ObjectType()
@Entity('typename')
class TypeName extends Name {
  @ManyToOne(() => Type, 'names')
  @JoinColumn()
  type: Type;
}

export default TypeName;
