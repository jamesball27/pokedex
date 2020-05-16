import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import AbilityName from './AbilityName';
import PokemonAbility from './PokemonAbility';

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

  @Field(() => AbilityName, { nullable: true })
  @OneToMany(() => AbilityName, 'ability', { eager: true })
  names: AbilityName[];

  // generation;
  // names;
  // effect_entries;
  // effect_changes;
  // flavor_text_entries;
  @Field((type) => PokemonAbility, { nullable: true })
  @OneToMany(() => PokemonAbility, 'ability')
  pokemon: PokemonAbility[];
}

export default Ability;
