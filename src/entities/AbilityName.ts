import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';
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
  @JoinColumn()
  ability: Ability;

  @Field((type) => Language, { nullable: true })
  @ManyToOne((type) => Language, 'abilityNames')
  @JoinColumn()
  language: Language;
}

export default AbilityName;
