import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import PokemonAbility from './PokemonAbility';
import PokemonType from './PokemonType';
import PokemonSpecies from './PokemonSpecies';
import PokemonSprite from './PokemonSprite';

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

  @Field(() => PokemonAbility, { nullable: true })
  @OneToMany(() => PokemonAbility, 'pokemon')
  abilities: PokemonAbility[];

  @Field(() => PokemonType, { nullable: true })
  @OneToMany(() => PokemonType, 'pokemon')
  types: PokemonType[];

  @Field(() => PokemonSpecies, { nullable: true })
  @ManyToOne(() => PokemonSpecies, 'pokemon')
  @JoinColumn({ name: 'pokemon_species_id' })
  species: PokemonSpecies;

  @Field(() => PokemonSprite, { nullable: true })
  sprites: PokemonSprite;

  // location_area_encounters:
  // forms:
  // game_indices
  // held_items
  // moves
  // stats
}

export default Pokemon;
