import { ObjectType } from 'type-graphql';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import Name from './base/Name';
import Ability from './Ability';

@ObjectType()
@Entity('abilityname')
class AbilityName extends Name {
  @ManyToOne(() => Ability, 'names')
  @JoinColumn()
  ability: Ability;
}

export default AbilityName;
