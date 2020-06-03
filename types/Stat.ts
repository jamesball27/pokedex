import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

import PokemonStat from './PokemonStat';
import StatName from './StatName';

@ObjectType()
@Entity('stat')
class Stat {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => StatName, { nullable: true })
  @OneToMany(() => StatName, 'stat', { eager: true })
  names: StatName[];

  localeName: string;

  @Field(() => PokemonStat, { nullable: true })
  @OneToMany(() => PokemonStat, 'stat')
  pokemonStats: PokemonStat[];

  // is_battle_only
  // game_index
  // move_damage_class_id
}

export default Stat;
