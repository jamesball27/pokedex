import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import AbilityName from './AbilityName';
import Pokemon from './Pokemon';

@ObjectType()
@Entity('ability')
class Ability {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  isMainSeries: boolean;

  @Field((type) => AbilityName, { nullable: true })
  @OneToMany((type) => AbilityName, 'ability')
  names: AbilityName[];

  // generation;
  // names;
  // effect_entries;
  // effect_changes;
  // flavor_text_entries;
  @Field((type) => Pokemon, { nullable: true })
  @ManyToMany(() => Ability, 'ability')
  @JoinTable()
  pokemon: Pokemon[];
}

export default Ability;
