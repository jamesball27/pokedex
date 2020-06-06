import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import PokemonAbility from './PokemonAbility';
import PokemonType from './PokemonType';
import PokemonSpecies from './PokemonSpecies';
import PokemonImage from './PokemonImage';
import Type from './Type';
import PokemonStat from './PokemonStat';
import PokemonMove from './PokemonMove';
import Move from './Move';

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

  @OneToMany(() => PokemonType, 'pokemon')
  pokemonTypes: PokemonType[];

  @Field(() => Type, { nullable: true })
  types: Type[];

  @Field(() => PokemonSpecies, { nullable: true })
  @ManyToOne(() => PokemonSpecies, 'pokemon')
  @JoinColumn({ name: 'pokemon_species_id' })
  species: PokemonSpecies;

  @Field(() => PokemonImage, { nullable: true })
  images: PokemonImage;

  @Field(() => PokemonStat, { nullable: true })
  @OneToMany(() => PokemonStat, 'pokemon')
  stats: PokemonStat[];

  @OneToMany(() => PokemonMove, 'pokemon')
  pokemonMoves: PokemonMove[];

  @Field(() => Move, { nullable: true })
  moves: Move[];

  // location_area_encounters:
  // forms:
  // game_indices
  // held_items
}

export default Pokemon;
