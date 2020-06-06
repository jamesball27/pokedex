import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

import PokemonMove from './PokemonMove';
import MoveName from './MoveName';
import Type from './Type';
import MoveFlavorText from './MoveFlavorText';

@ObjectType()
@Entity('move')
class Move {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int, { nullable: true })
  @Column()
  accuracy: number;

  @Field(() => Int, { nullable: true })
  @Column()
  pp: number;

  @Field(() => Int, { nullable: true })
  @Column()
  power: number;

  @Field(() => MoveName, { nullable: true })
  @OneToMany(() => MoveName, 'move', { eager: true })
  names: MoveName[];

  localeName: string;
  flavorText: string;

  @Field(() => PokemonMove, { nullable: true })
  @OneToMany(() => PokemonMove, 'move')
  pokemonMoves: PokemonMove[];

  @Field(() => Type, { nullable: true })
  @ManyToOne(() => Type, 'move')
  type: Type;

  @Field(() => MoveFlavorText, { nullable: true })
  @OneToMany(() => MoveFlavorText, 'move')
  flavorTextEntries: MoveFlavorText[];

  // effect_chance
  // pp
  // priority
  // power
  // contest_combos
  // contest_type
  // contest_effect
  // damage_class
  // effect_entries
  // effect_changes
  // flavor_text_entries
  // generation
  // machines
  // meta
  // past_values
  // stat_changes
  // super_contest_effect
  // target
}

export default Move;
