import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';

import Pokemon from './Pokemon';
import GrowthRate from './GrowthRate';

@ObjectType()
@Entity('pokemonspecies')
class PokemonSpecies {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  order: number;

  @Field(() => Int)
  @Column()
  genderRate: number;

  @Field(() => Int)
  @Column()
  captureRate: number;

  @Field(() => Int)
  @Column()
  baseHappiness: number;

  @Field()
  @Column()
  isBaby: boolean;

  @Field(() => Int)
  @Column()
  hatchCounter: number;

  @Field()
  @Column()
  hasGenderDifferences: boolean;

  @Field()
  @Column()
  formsSwitchable: boolean;

  @Field((type) => Pokemon, { nullable: true })
  @OneToMany(() => Pokemon, 'species')
  pokemon: Pokemon[];

  @Field((type) => GrowthRate, { nullable: true })
  @ManyToOne(() => GrowthRate, 'pokemonSpecies')
  growthRate: GrowthRate;

  // pokedex_numbers
  // egg_groups
  // color
  // shape
  // evolves_from_species
  // evolution_chain
  // habitat
  // generation
  // names
  // pal_park_encounters
  // flavor_text_entries
  // form_descriptions
  // genera
  // varieties
}

export default PokemonSpecies;
