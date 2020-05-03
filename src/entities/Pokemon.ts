import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import PokemonAbility from './PokemonAbility';
import PokemonType from './PokemonType';

@ObjectType()
@Entity('pokemon')
class Pokemon {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  baseExperience: number;

  @Field(() => Int)
  @Column()
  height: number;

  @Field()
  @Column()
  isDefault: boolean;

  @Field(() => Int)
  @Column()
  order: number;

  @Field(() => Int)
  @Column()
  weight: number;

  @Field((type) => PokemonAbility, { nullable: true })
  @OneToMany(() => PokemonAbility, 'pokemon')
  abilities: PokemonAbility[];

  @Field((type) => PokemonType, { nullable: true })
  @OneToMany(() => PokemonType, 'pokemon')
  types: PokemonType[];

  // location_area_encounters:
  // forms:
  // game_indices
  // held_items
  // moves
  // sprites
  // species
  // stats
  // types
}

export default Pokemon;
