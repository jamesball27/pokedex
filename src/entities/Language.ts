import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import Ability from './Ability';
import AbilityName from './AbilityName';

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

  @Field(() => AbilityName, { nullable: true })
  @OneToMany((type) => AbilityName, 'language', { nullable: true })
  abilityNames: AbilityName[];
}

export default Language;
