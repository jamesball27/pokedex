import { ObjectType, Field } from 'type-graphql';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

import Name from './base/Name';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('pokemonspeciesname')
class PokemonSpeciesName extends Name {
  @Field({ nullable: true })
  @Column()
  genus: string;

  @ManyToOne(() => PokemonSpecies, 'names')
  @JoinColumn({ name: 'pokemon_species_id' })
  species: PokemonSpecies;
}

export default PokemonSpeciesName;
