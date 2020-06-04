import { ObjectType, Field, Int } from 'type-graphql';
import { Column, PrimaryColumn, ManyToOne } from 'typeorm';

import Language from '../Language';
import Version from '../Version';
import VersionGroup from '../VersionGroup';

@ObjectType()
class FlavorText {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  flavorText: string;

  @Field(() => Language, { nullable: true })
  @ManyToOne(() => Language, 'flavorText', { eager: true })
  language: Language;
}

export default FlavorText;
