import { ObjectType, Field, Int } from 'type-graphql';
import { Column, PrimaryColumn, ManyToOne } from 'typeorm';

import Language from '../Language';

@ObjectType()
class Description {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field(() => Language, { nullable: true })
  @ManyToOne(() => Language, 'description', { eager: true })
  language: Language;
}

export default Description;
