import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';

import Name from './base/Name';
import Ability from './Ability';

@ObjectType()
@Entity('abilityname')
class AbilityName extends Name {
  @Field((type) => Ability, { nullable: true })
  @ManyToOne((type) => Ability, 'names')
  @JoinColumn()
  ability: Ability;
}

export default AbilityName;
