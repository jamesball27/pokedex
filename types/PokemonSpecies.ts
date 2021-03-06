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
import PokemonSpeciesName from './PokemonSpeciesName';
import PokemonSpeciesFlavorText from './PokemonSpeciesFlavorText';

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

  @Field(() => Pokemon, { nullable: true })
  @OneToMany(() => Pokemon, 'species', { eager: true })
  pokemon: Pokemon[];

  @Field(() => GrowthRate, { nullable: true })
  @ManyToOne(() => GrowthRate, 'pokemonSpecies')
  growthRate: GrowthRate;

  @Field(() => EggGroup, { nullable: true })
  @ManyToMany(() => EggGroup, 'pokemonSpecies')
  @JoinTable({
    name: 'pokemonegggroup',
    joinColumn: { name: 'egg_group_id' },
    inverseJoinColumn: { name: 'pokemon_species_id' },
  })
  eggGroups: EggGroup[];

  @Field(() => PokemonColor, { nullable: true })
  @ManyToOne(() => PokemonColor, 'pokemonSpecies')
  @JoinColumn({ name: 'pokemon_color_id' })
  color: PokemonColor;

  @Field(() => PokemonShape, { nullable: true })
  @ManyToOne(() => PokemonShape, 'pokemonSpecies')
  @JoinColumn({ name: 'pokemon_shape_id' })
  shape: PokemonShape;

  @Field(() => PokemonHabitat, { nullable: true })
  @ManyToOne(() => PokemonHabitat, 'pokemonSpecies')
  @JoinColumn({ name: 'pokemon_habitat_id' })
  habitat: PokemonHabitat;

  @Field(() => PokemonSpeciesName, { nullable: true })
  @OneToMany(() => PokemonSpeciesName, 'species', { eager: true })
  names: PokemonSpeciesName[];

  @Field(() => PokemonSpeciesFlavorText, { nullable: true })
  @OneToMany(() => PokemonSpeciesFlavorText, 'pokemonSpecies')
  flavorTextEntries: PokemonSpeciesFlavorText[];

  localeName: string;
  localeGenus: string;
  flavorText: string;

  @Column()
  evolutionChainId: number;

  @Column()
  evolvesFromSpeciesId: number;

  @Field(() => PokemonSpecies)
  evolution: PokemonSpecies[];
  // pokedex_numbers
  // evolves_from_species
  // evolution_chain
  // generation
  // pal_park_encounters
  // form_descriptions
}

export default PokemonSpecies;
