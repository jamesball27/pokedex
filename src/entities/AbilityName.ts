import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import Ability from './Ability';
import Language from './Language';

@ObjectType()
@Entity('abilityname')
class AbilityName {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => Ability, { nullable: true })
  @ManyToOne((type) => Ability, 'names')
  ability: Ability;

  @Field((type) => Language, { nullable: true })
  @OneToMany((type) => Language, 'abilityName')
  languages: Language[];
}

export default AbilityName;
