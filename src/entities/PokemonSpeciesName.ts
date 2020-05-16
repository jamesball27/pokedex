import { ObjectType, Field } from 'type-graphql';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import Name from './base/Name';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('pokemonspeciesname')
class PokemonSpeciesName extends Name {
  @Field((type) => PokemonSpecies, { nullable: true })
  @ManyToOne(() => PokemonSpecies, 'names')
  @JoinColumn({ name: 'pokemon_species_id' })
  species: PokemonSpecies;
}

export default PokemonSpeciesName;
