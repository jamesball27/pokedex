import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import Pokemon from './Pokemon';
import Move from './Move';

@ObjectType()
@Entity('pokemonmove')
class PokemonMove {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field(() => Move, { nullable: true })
  @ManyToOne(() => Move, 'pokemon', { eager: true })
  @JoinColumn()
  move: Move;

  // Not actually using these relations, used to order and filter
  @Column()
  versionGroupId: number;
  @Column()
  moveLearnMethodId: number;

  @ManyToOne(() => Pokemon, 'stats')
  @JoinColumn()
  pokemon: Pokemon;
}

export default PokemonMove;
