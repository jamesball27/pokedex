import { ObjectType, Field, Int } from 'type-graphql';
import { Column, PrimaryColumn, ManyToOne } from 'typeorm';

import Language from '../Language';
import Version from '../Version';

@ObjectType()
class FlavorText {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  flavorText: string;

  @Field((type) => Language, { nullable: true })
  @ManyToOne(() => Language, 'flavorText', { eager: true })
  language: Language;

  @Field((type) => Version, { nullable: true })
  @ManyToOne(() => Version, 'flavorText', { eager: true })
  version: Version;
}

export default FlavorText;
