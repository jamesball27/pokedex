import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import Pokemon from './Pokemon';
import GrowthRate from './GrowthRate';
import EggGroup from './EggGroup';
import PokemonColor from './PokemonColor';
import PokemonShape from './PokemonShape';
import PokemonHabitat from './PokemonHabitat';

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

  @Field((type) => EggGroup, { nullable: true })
  @ManyToMany(() => EggGroup, 'pokemonSpecies')
  @JoinTable({
    name: 'pokemonegggroup',
    joinColumn: { name: 'egg_group_id' },
    inverseJoinColumn: { name: 'pokemon_species_id' },
  })
  eggGroups: EggGroup[];

  @Field((type) => PokemonColor, { nullable: true })
  @ManyToOne(() => PokemonColor, 'pokemonSpecies')
  @JoinColumn({ name: 'pokemon_color_id' })
  color: PokemonColor;

  @Field((type) => PokemonShape, { nullable: true })
  @ManyToOne(() => PokemonShape, 'pokemonSpecies')
  @JoinColumn({ name: 'pokemon_shape_id' })
  shape: PokemonShape;

  @Field((type) => PokemonHabitat, { nullable: true })
  @ManyToOne(() => PokemonHabitat, 'pokemonSpecies')
  @JoinColumn({ name: 'pokemon_habitat_id' })
  habitat: PokemonHabitat;

  // pokedex_numbers
  // evolves_from_species
  // evolution_chain
  // generation
  // names
  // pal_park_encounters
  // flavor_text_entries
  // form_descriptions
  // genera
  // varieties
}

export default PokemonSpecies;
