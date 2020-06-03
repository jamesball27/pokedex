import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

import Pokemon from './Pokemon';
import Stat from './Stat';

@ObjectType()
@Entity('pokemonstat')
class PokemonStat {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column()
  baseStat: number;

  @Field(() => Int)
  @Column()
  effort: number;

  @Field(() => Stat, { nullable: true })
  @ManyToOne(() => Stat, 'pokemonStats')
  stat: Stat;

  @ManyToOne(() => Pokemon, 'stats')
  pokemon: Pokemon;
}

export default PokemonStat;
