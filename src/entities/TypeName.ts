import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';

import Type from './Type';
import Language from './Language';

@ObjectType()
@Entity('typename')
class TypeName {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => Type, { nullable: true })
  @ManyToOne((type) => Type, 'names')
  @JoinColumn()
  type: Type;

  @Field((type) => Language, { nullable: true })
  @ManyToOne((type) => Language, 'typeNames')
  @JoinColumn()
  language: Language;
}

export default TypeName;
