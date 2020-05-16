import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';

import AbilityName from './AbilityName';
import TypeName from './TypeName';
import EggGroupName from './EggGroupName';

@ObjectType()
@Entity('language')
class Language {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  official: boolean;

  @Field()
  @Column()
  iso639: string;

  @Field()
  @Column()
  iso3166: string;

  // language_names

  @OneToMany('AbilityName', 'language', { nullable: true })
  abilityNames: AbilityName[];

  @OneToMany('TypeName', 'language', { nullable: true })
  typeNames: TypeName[];

  @OneToMany('EggGroupName', 'language', { nullable: true })
  eggGroupNames: EggGroupName[];
}

export default Language;
