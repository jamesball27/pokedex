import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

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

  // location_area_encounters:
  // abilities:
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
