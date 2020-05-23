import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import Pokedex from './Pokedex';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('pokemondexnumber')
class PokemonEntry {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'pokedex_number' })
  entryNumber: number;

  @Field(() => PokemonSpecies, { nullable: true })
  @ManyToOne(() => PokemonSpecies, 'pokedex', { eager: true })
  @JoinColumn({ name: 'pokemon_species_id' })
  species: PokemonSpecies;

  @ManyToOne(() => Pokedex, 'pokedex')
  pokedex: Pokedex;
}

export default PokemonEntry;
