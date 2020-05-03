import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import PokemonType from './PokemonType';

@ObjectType()
@Entity('type')
class Type {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // damage_relations;
  // game_indices;
  // generation;
  // move_damage_class;
  // names;
  // moves;

  @Field(() => PokemonType, { nullable: true })
  @OneToMany(() => PokemonType, 'type')
  pokemon: PokemonType[];
}

export default Type;
