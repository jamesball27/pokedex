import { ObjectType, Field, Int } from 'type-graphql';
import { Column, PrimaryColumn, ManyToOne } from 'typeorm';

import Language from '../Language';

@ObjectType()
class Name {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Language, { nullable: true })
  @ManyToOne(() => Language, 'name', { eager: true })
  language: Language;
}

export default Name;
