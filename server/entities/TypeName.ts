import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';

import Name from './base/Name';
import Type from './Type';

@ObjectType()
@Entity('typename')
class TypeName extends Name {
  @ManyToOne((type) => Type, 'names')
  @JoinColumn()
  type: Type;
}

export default TypeName;
