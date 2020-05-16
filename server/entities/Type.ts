import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Transaction,
} from 'typeorm';

import TypeName from './TypeName';
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
  // moves;

  @Field(() => TypeName, { nullable: true })
  @OneToMany(() => TypeName, 'type', { eager: true })
  names: TypeName[];

  @Field(() => PokemonType, { nullable: true })
  @OneToMany(() => PokemonType, 'type')
  pokemon: PokemonType[];
}

export default Type;
