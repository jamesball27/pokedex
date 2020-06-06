import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import TypeName from './TypeName';
import PokemonType from './PokemonType';
import Move from './Move';

export type Name =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'shadow'
  | 'steel'
  | 'water'
  | 'unknown';

@ObjectType()
@Entity('type')
class Type {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: Name;

  // damage_relations;
  // game_indices;
  // generation;
  // move_damage_class;
  // moves;

  @Field(() => TypeName, { nullable: true })
  @OneToMany(() => TypeName, 'type', { eager: true })
  names: TypeName[];

  localeName: string;

  @Field(() => PokemonType, { nullable: true })
  @OneToMany(() => PokemonType, 'type')
  pokemon: PokemonType[];

  @Field(() => Move, { nullable: true })
  @OneToMany(() => Move, 'type')
  moves: Move[];
}

export default Type;
